---
template: experience
company: Kemdikti Saintek "Pemberdayaan Desa Binaan"
role: Maintenance & QA Automation Engineer
date_range: 'Nov 2026 - Present'
order: 1
company_logo: ''
attachment_pdf: /thumbnails/simkodes_qa_automation_system_maintenance.pdf
catbox_url: /thumbnails/surat_pencatatan_cipta_hki_kemdikti_saintek.pdf
location: Sranak, Bojonegoro, Indonesia (Paruh Waktu)
---

Architected and executed an enterprise-grade Quality Assurance automation pyramid, database query optimization, 8 modular GitHub Actions workflows, K6 stress testing benchmarks, and remote self-healing operations for the SIMKODES platform under the Kemdikti Saintek "Pemberdayaan Desa Binaan" program in Sranak, Bojonegoro.

**Key Responsibilities & Achievements:**
- **3-Layer QA Automation Pyramid & Playwright POM**: Engineered 12 automated End-to-End (E2E) browser scenarios using Playwright with Page Object Model (POM) in TypeScript across Chromium, Firefox, and WebKit (covering authentication, CRUD operations, confirmation modals, correspondence archives, and PDF reporting) and integrated 79 backend tests with PHPUnit (468 assertions) running on in-memory SQLite runner in 4.2 seconds.
- **Database Engineering & 81.8% Query Reduction**: Eliminated N+1 query bottlenecks using Eloquent eager loading with explicit column projection (Member::with(['category:id,name'])->select(...)), reducing query overhead by 81.8% from 1+N to 2 constant queries; established B-Tree composite indexing cutting point-lookup latency from 68ms to 1.2ms.
- **K6 Stress & Load Testing Benchmark**: Conducted load testing on staging environment simulating 100 concurrent Virtual Users (VUs) over 2.5 minutes, achieving 4,820 total requests with 0.00% HTTP error rate, average response time of 64.12ms, and P95 latency of 142.8ms (well within the <500ms SLA threshold).
- **8 Modular GitHub Actions Workflows**: Architected an automated continuous delivery and maintenance ecosystem (`ci.yml`, `staging.yml`, `production.yml`, `maintenance.yml`, `backup.yml`, `security.yml`, `monitoring.yml`, `diagnose-and-fix.yml`) enforcing automated branch protection, dependency CVE audits (`composer audit`, `npm audit`), and synthetic health checks every 6 hours.
- **Remote Maintenance & Disaster Recovery Operations**: Designed remote maintenance automation via SSH executing branded HTTP 503 views with bypass cookies (`php artisan down --render="errors.503" --secret="..."`), automated self-healing scripts for `.env` recovery and directory permissions, pre-deployment compressed MySQL snapshots (`mysqldump .sql.gz`), and weekly 30-day artifact retention.

**Credentials & Documents:**
- 📊 **Enterprise QA Automation, DevOps & System Maintenance Deck (15 Slides)**: [Slide Studi Kasus QA Automation, DevOps & System Maintenance](/thumbnails/simkodes_qa_automation_system_maintenance.pdf)
- 📜 **Official HKI Copyright Certificate (Kemenkumham DJKI)**: [Surat Pencatatan Hak Cipta](/thumbnails/surat_pencatatan_cipta_hki_kemdikti_saintek.pdf) · No: `001015965` / `EC002025175705` (Digitalisasi Tata Kelola Koperasi Desa Merah Putih - Model Desa Binaan Sranak)

**Skills:** Playwright · TypeScript · PHPUnit · K6 Load Testing · GitHub Actions · CI/CD · Database Tuning · N+1 Query Elimination · B-Tree Indexing · Self-Healing Operations · Disaster Recovery · Bash Scripting · Remote Maintenance · Hostinger LiteSpeed Cloud · OWASP Security
