---
template: experience
company: Kemdikti Saintek "Pemberdayaan Desa Binaan"
role: Cloud DevOps & Backend Engineer
date_range: '2025 - 2026'
order: 3
company_logo: ''
attachment_pdf: /thumbnails/simkodes_cloud_devops_automated_cicd_pipeline.pdf
catbox_url: /thumbnails/surat_pencatatan_cipta_hki_kemdikti_saintek.pdf
location: Sranak, Bojonegoro, Indonesia (Paruh Waktu)
---

Architected and implemented multi-environment cloud infrastructure, LiteSpeed Enterprise web server optimizations, automated 7-stage GitHub Actions CI/CD pipelines, and zero-data-loss release gates for the SIMKODES platform under the Kemdikti Saintek "Pemberdayaan Desa Binaan" program in Sranak, Bojonegoro.

**Key Responsibilities & Achievements:**
- **Automated CI & Test Suite Pipeline**: Engineered automated CI testing pipeline running 79 PHPUnit test suites (468 assertions) and Playwright E2E browser automation using in-memory SQLite runner, ensuring 100% reliable test-driven releases.
- **Multi-Environment Topology & Security**: Established isolated dual-environment topology (Staging on `simkodes-staging.sranak.com` & Live Production on `simkodes.sranak.com`) on LiteSpeed Enterprise Server; secured staging subdomain with dynamic OpenSSL HTTP Basic Auth to restrict public access.
- **Zero Data Loss Continuous Deployment**: Implemented automated gated production releases requiring explicit "DEPLOY" confirmation, automated pre-deployment compressed MySQL snapshots (`mysqldump .sql.gz`), and selective Rsync transfers preserving user storage (`member_files/`, `officer_files/`, `storage/`) and `.env`.
- **Hosting Workarounds & High Availability**: Bypassed shared hosting PHP symlink restrictions via Linux native shell automation (`ln -sfn`), configured SSH port 65002 with key fallbacks, and designed self-healing `.env` recovery routines and HTTP 503 maintenance mode.

**Credentials & Documents:**
- 📜 **Official HKI Copyright Certificate (Kemenkumham DJKI)**: [Surat Pencatatan Hak Cipta](/thumbnails/surat_pencatatan_cipta_hki_kemdikti_saintek.pdf) · No: `001015965` / `EC002025175705` (Digitalisasi Tata Kelola Koperasi Desa Merah Putih - Model Desa Binaan Sranak)
- 📊 **SIMKODES Cloud DevOps & Automated CI/CD Deck**: [Slide Arsitektur Multi-Environment & CI/CD Pipeline](/thumbnails/simkodes_cloud_devops_automated_cicd_pipeline.pdf)

**Skills:** GitHub Actions · CI/CD · Laravel · PHP 8.2 · PHPUnit · Playwright · LiteSpeed Enterprise · MySQL · SQLite · Rsync · Linux Shell · Bash · SSH · Zero Data Loss · OPcache
