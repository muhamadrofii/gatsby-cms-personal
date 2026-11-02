---
template: post
title: "Membangun Arsitektur Multi-Container Docker Compose dan Nginx Reverse Proxy untuk Produksi"
date: 2026-06-25T10:00
slug: docker-compose-nginx-reverse-proxy
description: "Panduan praktis orkestrasi multi-container Docker Compose (PHP-FPM, Nginx Alpine, MySQL 8.0) dengan bytecode caching OPcache untuk menekan latensi respon server."
tags:
  - DevOps
  - Docker
  - Nginx
  - Cloud
categories: Technical
thumbnail: ./thumbnails/placeholder.png
comments_off: false
---

Salah satu tantangan terbesar dalam rekayasa perangkat lunak adalah sindrom *"it works on my machine"*—kondisi di mana aplikasi berjalan sempurna di laptop pengembang namun gagal berfungsi ketika dipindahkan ke server staging atau produksi.

Pendekatan kontainerisasi menggunakan **Docker** dan **Docker Compose** memecahkan masalah ini secara elegan dengan membungkus aplikasi beserta seluruh dependensi sistem operasinya ke dalam satu unit mandiri (*isolated container*).

Artikel ini mengulas arsitektur multi-container produksi yang memisahkan web server (Nginx Alpine), runtime backend (PHP 8.2-FPM), dan basis data relasional (MySQL 8.0), lengkap dengan konfigurasi reverse proxy serta caching bytecode OPcache untuk menekan latensi respon server di bawah 45 milidetik.

---

## 1. Desain Arsitektur Multi-Container

Daripada menempatkan seluruh layanan (*service*) di dalam satu container monolitik besar, praktik standar industri mewajibkan prinsip *One Process per Container*:

```
[ Internet / Client Traffic ]
               │
               ▼ (Port 80/443)
       ┌───────────────┐
       │ Nginx Alpine  │ (Reverse Proxy & Static Asset Caching)
       └───────┬───────┘
               │ (FastCGI TCP :9000 - Internal Bridge Network)
               ▼
       ┌───────────────┐
       │  PHP 8.2-FPM  │ (Application Runtime & OPcache)
       └───────┬───────┘
               │ (TCP :3306 - Internal Bridge Network)
               ▼
       ┌───────────────┐
       │   MySQL 8.0   │ (Persistent Data Volume)
       └───────────────┘
```

Seluruh komunikasi antar container berjalan di dalam **isolated bridge network**, sehingga port MySQL (3306) dan PHP-FPM (9000) tidak pernah diekspos ke jaringan publik internet. Hanya port HTTP/HTTPS pada container Nginx yang dapat diakses oleh publik.

---

## 2. Struktur `docker-compose.yml` Teroptimasi

Berikut adalah cetak biru konfigurasi `docker-compose.yml` untuk lingkungan produksi yang stabil:

```yaml
version: '3.8'

services:
  nginx:
    image: nginx:alpine
    container_name: app_webserver
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./src:/var/www/html:ro
      - ./nginx/conf.d:/etc/nginx/conf.d:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
    networks:
      - internal_net
    depends_on:
      - app

  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: app_backend
    restart: unless-stopped
    working_dir: /var/www/html
    volumes:
      - ./src:/var/www/html
      - ./php/opcache.ini:/usr/local/etc/php/conf.d/opcache.ini:ro
    networks:
      - internal_net
    depends_on:
      - db

  db:
    image: mysql:8.0
    container_name: app_database
    restart: unless-stopped
    environment:
      MYSQL_DATABASE: production_db
      MYSQL_USER: app_user
      MYSQL_PASSWORD_FILE: /run/secrets/db_password
      MYSQL_ROOT_PASSWORD_FILE: /run/secrets/db_root_password
    volumes:
      - db_data:/var/lib/mysql
    networks:
      - internal_net

volumes:
  db_data:
    driver: local

networks:
  internal_net:
    driver: bridge
```

---

## 3. Konfigurasi Nginx Reverse Proxy & FastCGI Buffering

Konfigurasi Nginx memegang peranan krusial sebagai pintu gerbang utama. Penyetelan FastCGI buffer dan penanganan berkas statis secara langsung dapat menghemat utilisasi CPU backend secara signifikan:

```nginx
server {
    listen 80;
    server_name example.com www.example.com;
    root /var/www/html/public;
    index index.php index.html;

    # Proteksi header keamanan HTTP
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Caching berkas statis (Vite assets, CSS, JS, Image) langsung oleh Nginx
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
        access_log off;
    }

    # Pass-through request dinamis ke PHP-FPM container
    location ~ \.php$ {
        fastcgi_pass app:9000;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;

        # Tuning FastCGI Buffer untuk mencegah I/O disk bottleneck
        fastcgi_buffers 16 16k;
        fastcgi_buffer_size 32k;
        fastcgi_read_timeout 60s;
    }

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
}
```

---

## 4. Tuning Bytecode Caching dengan OPcache

Secara default, PHP mengkompilasi skrip teks menjadi bytecode setiap kali ada request masuk. Dengan mengaktifkan **Zend OPcache**, hasil kompilasi bytecode disimpan langsung di shared memory RAM:

```ini
[opcache]
opcache.enable=1
opcache.enable_cli=1
opcache.memory_consumption=128
opcache.interned_strings_buffer=16
opcache.max_accelerated_files=10000
opcache.validate_timestamps=0
opcache.save_comments=1
```

> **Catatan Produksi:** Mengatur `opcache.validate_timestamps=0` memberi instruksi kepada runtime untuk tidak pernah memeriksa perubahan berkas di disk, sehingga latensi respon server berkurang drastis (dapat mencapai < 45ms). Ketika deploy versi baru, kita cukup menjalankan `php artisan optimize:clear` atau me-reload container PHP.

---

## 5. Otomasi Siklus Rilis (CI/CD Deployment Script)

Untuk mencegah kesalahan manusia (*human error*) selama deployment manual, buat skrip bash otomasi (`deploy.sh`):

```bash
#!/bin/bash
set -e

echo "🚀 Memulai Otomasi Siklus Deployment..."

# 1. Update kode sumber dari Git branch produksi
git pull origin main

# 2. Build ulang container jika ada perubahan Dockerfile/dependensi
docker-compose build --pull app

# 3. Jalankan container secara detached
docker-compose up -d

# 4. Eksekusi dependensi, migrasi database & cache warming di dalam container
docker-compose exec -T app composer install --no-dev --optimize-autoloader
docker-compose exec -T app php artisan migrate --force
docker-compose exec -T app php artisan config:cache
docker-compose exec -T app php artisan route:cache
docker-compose exec -T app php artisan view:cache

echo "✅ Deployment selesai tanpa downtime!"
```

Dengan otomasi di atas, siklus rilis pemeliharaan dapat dipangkas hingga **75%**, meminimalkan waktu pemadaman sistem (*downtime*), dan menjamin seluruh lingkungan kerja berjalan secara identik dan terprediksi.
