import { ModuleData } from '../../types';

export const skModules: ModuleData[] = [
  // =========================================================================
  // BAB 4: SISTEM KOMPUTER
  // =========================================================================
  {
    id: 'SK-1',
    elementId: 'SK',
    elementName: 'Sistem Komputer',
    moduleNumber: 1,
    bab: 'BAB 4 — Sistem Komputer',
    pertemuan: 7,
    fase: 'Fase E (Kelas X SMK)',
    title: 'Arsitektur Perangkat Keras, Sistem Operasi, Manajemen Berkas, dan Pemeliharaan',
    estimatedTimeMinutes: 90,
    difficulty: 'Menengah',
    competencies: [
      'Memahami konsep Tritunggal Sistem Komputer (Hardware, Software, Brainware) dan siklus pemrosesan data (Input → Process → Output → Storage)',
      'Menganalisis komponen perangkat keras pemrosesan dan memori (CPU, RAM, ROM, Motherboard, GPU dedicated vs integrated)',
      'Membandingkan performa media penyimpanan (HDD mekanikal vs SSD SATA/NVMe PCIe)',
      'Menganalisis sistem operasi (Windows, Linux, macOS, Android), BIOS/UEFI, driver perangkat, dan mekanisme proses Booting (POST hingga User Space)',
      'Menerapkan manajemen file hierarkis, ekstensi format file standar industri, dan strategi proteksi data Backup 3-2-1',
      'Menerapkan prosedur perawatan berkala dan diagnosis troubleshooting dasar komputer'
    ],
    objectives: [
      'Siswa mampu menggambarkan siklus pemrosesan data komputer dan menjelaskan fungsi masing-masing komponen internal',
      'Siswa dapat membedakan karakteristik memori volatil (RAM) dan non-volatil (ROM/SSD) secara tepat',
      'Siswa mampu memilih spesifikasi komputer yang tepat untuk kebutuhan rendering desain DKV atau pengolahan data APHP',
      'Siswa mampu menguraikan tahapan proses booting komputer dari tombol power ditekan hingga desktop muncul',
      'Siswa dapat menerapkan metode pencadangan data Backup 3-2-1 dan mendiagnosis masalah umum komputer (BSOD, lambat, no display)'
    ],
    summary: 'Eksplorasi menyeluruh arsitektur sistem komputer: interaksi hardware pemrosesan (CPU/RAM/GPU/SSD), ekosistem software dan sistem operasi, alur booting UEFI/BIOS, manajemen file terstruktur, strategi backup 3-2-1, serta panduan troubleshooting industri.',
    infographicHighlights: [
      { label: 'Siklus Komputasi', text: 'Input → Process → Output → Storage (IPOS Cycle).', icon: 'Cpu' },
      { label: 'Hardware Internal', text: 'CPU Multi-Core, RAM DDR5, GPU Dedicated, dan NVMe SSD.', icon: 'HardDrive' },
      { label: 'Alur Booting', text: 'Power On → POST → UEFI/BIOS → Bootloader → Kernel OS.', icon: 'Power' },
      { label: 'Backup & Perawatan', text: 'Prinsip Backup 3-2-1, TRIM SSD, Thermal Paste, dan Troubleshooting.', icon: 'Wrench' }
    ],
    pertanyaanPemantik: [
      'Mengapa saat kita sedang mengetik tugas dan tiba-tiba listrik padam, ketikan yang belum disimpan bisa langsung hilang?',
      'Apa yang membuat komputer dengan SSD modern bisa menyala (booting) dalam 5 detik sementara komputer lama dengan HDD butuh 3 menit?',
      'Bagaimana cara seorang siswa DKV atau teknisi lab mengatasi komputer yang tiba-tiba layarnya membeku biru (*Blue Screen of Death*) saat merender video?'
    ],
    pendahuluan: `Komputer modern adalah mahakarya rekayasa sains yang telah mengubah wajah dunia. Namun, sebuah komputer bukanlah kotak ajaib yang berdiri sendiri. Komputer adalah sebuah **Sistem**—kumpulan komponen yang saling terhubung, berinteraksi, dan bergantung satu sama lain untuk mencapai tujuan pengolahan data.

Sistem Komputer dibangun di atas tiga pilar utama (*Tritunggal Komputer*):
1. **Perangkat Keras (*Hardware*)**: Komponen fisik yang dapat disentuh dan dilihat.
2. **Perangkat Lunak (*Software*)**: Program instruksi biner yang mengendalikan kerja perangkat keras.
3. **Pengguna (*Brainware*)**: Manusia cerdas yang mengoperasikan, memprogram, dan mengarahkan sistem.

Sebagai siswa SMK, memahami cara kerja internal komputer bukan hanya teori, melainkan keterampilan wajib agar kamu mampu memilih perangkat kerja yang efisien, merawat peralatan sekolah/kantor, serta memperbaiki gangguan teknis secara mandiri.`,
    konsepInti: `1. **Siklus IPOS**: Input (pemasukan data) → Process (pemrosesan CPU/RAM) → Output (penyajian hasil) → Storage (penyimpanan permanen).
2. **Arsitektur Pemrosesan**: CPU (ALU, CU, Register), Clock Speed (GHz), RAM (Volatile, DDR4/DDR5), ROM (Non-Volatile BIOS/UEFI), GPU Dedicated vs Integrated.
3. **Penyimpanan**: HDD (Mekanikal piringan magnetik, 100-150 MB/s) vs SSD NVMe PCIe (Flash NAND, 3500-7000 MB/s).
4. **Booting**: Power ON → POST (Power-On Self-Test) → BIOS/UEFI → Master Boot Record/GPT → Kernel OS Dimuat → Tampilan Login.
5. **Manajemen File & Backup 3-2-1**: Ekstensi file, hierarki folder, 3 salinan data di 2 media berbeda dengan 1 salinan di cloud.
6. **Troubleshooting**: No Display, Overheating, Blue Screen (BSOD), dan disk failure.`,
    contentMarkdown: `# BAB 4 — Sistem Komputer

## 1. Konsep Tritunggal dan Siklus Pemrosesan Data (IPOS)

Komputer bekerja dengan mengubah sinyal input menjadi informasi yang bernilai melalui siklus **IPOS (Input → Process → Output → Storage)**:

\`\`\`text
+-------------------------------------------------------------------------------+
|                      SIKLUS PEMROSESAN DATA SISTEM KOMPUTER                   |
+-------------------------------------------------------------------------------+
|                                                                               |
|    [ PERANGKAT INPUT ]                  [ PEMROSESAN (CPU & RAM) ]            |
|   • Keyboard, Mouse                     ┌───────────────────────────┐         |
|   • Drawing Tablet (DKV)  ────────────> │  CPU (Otak Komputer)      │         |
|   • Barcode Scanner (APHP)              │  • CU (Control Unit)      │         |
|                                         │  • ALU (Math Logic)       │         |
|                                         │  • Cache & Registers      │         |
|                                         └─────────────┬─────────────┘         |
|                                                       │                       |
|                 ┌─────────────────────────────────────┴──────────┐            |
|                 ▼                                                ▼            |
|       [ PERANGKAT OUTPUT ]                             [ MEDIA STORAGE ]      |
|      • Monitor sRGB / DCI-P3                          • SSD NVMe PCIe         |
|      • Printer DTF / Inkjet                           • HDD External          |
|      • Speaker Audio                                  • Cloud Storage         |
|                                                                               |
+-------------------------------------------------------------------------------+
\`\`\`

---

## 2. Perangkat Keras Pemrosesan dan Memori

### A. Central Processing Unit (CPU)
CPU adalah otak pemrosesan komputer yang mengeksekusi siklus *Fetch-Decode-Execute*:
* **Arithmetic Logic Unit (ALU)**: Menjalankan semua perhitungan matematika aritmatika dan perbandingan logika.
* **Control Unit (CU)**: Pengatur lalu lintas instruksi yang mengambil data dari memori dan mengarahkan komponen lain.
* **Registers & Cache (L1, L2, L3)**: Memori internal berkecepatan ultra-tinggi untuk menampung data instruksi sementara yang sedang diproses.

### B. Memori: RAM vs ROM
* **RAM (Random Access Memory)**:
  * Memori kerja berkecepatan tinggi tempat sistem operasi dan aplikasi yang sedang aktif dimuat.
  * Bersifat **Volatil (*Volatile*)**: Semua data yang tersimpan di RAM akan **hilang seketika** saat arus listrik terputus.
  * Generasi modern: DDR4 dan DDR5 (transfer data lebih dari 4800-6400 MT/s).
* **ROM (Read-Only Memory)**:
  * Chip memori yang menyimpan program firmware awal (BIOS/UEFI).
  * Bersifat **Non-Volatil (*Non-Volatile*)**: Data tersimpan permanen meskipun komputer dimatikan.

### C. Kartu Grafis: GPU (*Graphics Processing Unit*)
* **Integrated GPU (iGPU)**: Chip grafis menyatu di dalam prosesor, berbagi memori dengan RAM utama (hemat daya, cocok untuk perkantoran/browsing).
* **Dedicated GPU (dGPU)**: Kartu grafis terpisah dengan VRAM mandiri (NVIDIA GeForce, AMD Radeon) yang memiliki ribuan core paralel. Wajib dimiliki untuk rendering 3D, pengeditan video 4K DKV, dan komputasi AI.

---

## 3. Media Penyimpanan: HDD vs SSD

\`\`\`text
+-------------------+----------------------------+------------------------------+
| PARAMETER         | HARD DISK DRIVE (HDD)      | SOLID STATE DRIVE (SSD)      |
+-------------------+----------------------------+------------------------------+
| Teknologi         | Piringan Magnetik Berputar | Chip Flash NAND Elektronik   |
| Komponen Bergerak | Ada (Motor spindle & Head) | Tidak Ada (Solid-State)      |
| Kecepatan Baca    | 100 - 160 MB/detik         | 500 MB/s (SATA) s.d 7000 MB/s|
| Ketahanan Guncang | Rentan rusak jika terbentur| Tahan guncangan fisik        |
| Suhu & Kebisingan | Ada bunyi berputar & panas | Hening total & suhu stabil   |
| Rekomendasi       | Arsip data massal ukuran TB| Sistem Operasi & Aplikasi    |
+-------------------+----------------------------+------------------------------+
\`\`\`

---

## 4. Perangkat Lunak, BIOS/UEFI, dan Proses Booting

### Alur Proses Booting Komputer:
1. **Power On**: Arus listrik mengalir dari Power Supply Unit (PSU) ke Motherboard.
2. **POST (Power-On Self-Test)**: Firmware memeriksa apakah hardware esensial (CPU, RAM, GPU, Keyboard) terpasang normal. Jika ada kerusakan, motherboard mengeluarkan bunyi *beep code* atau lampu LED indikator menyala.
3. **Inisialisasi UEFI/BIOS**: Mencari partisi bootloader di media penyimpanan utama.
4. **Loading Bootloader & Kernel**: Kernel Sistem Operasi (Windows/Linux/macOS) disalin dari SSD ke dalam RAM.
5. **User Space**: Layar Login muncul dan sistem siap menerima perintah pengguna.

---

## 5. Manajemen File dan Prinsip Proteksi Data Backup 3-2-1

### A. Ekstensi File Standar Industri
* **Dokumen**: \`.docx\` (Word), \`.xlsx\` (Excel), \`.pptx\` (PowerPoint), \`.pdf\` (Dokumen portabel baku).
* **Desain Grafis (DKV)**: \`.psd\` (Photoshop), \`.ai\` (Illustrator), \`.svg\` (Vektor), \`.png\` (Raster transparan), \`.jpg\` (Foto terkompresi).
* **Kode Program**: \`.py\` (Python), \`.js\` (JavaScript), \`.html\`, \`.css\`.

### B. Aturan Emas Backup 3-2-1
Untuk mencegah kehilangan data skripsi, laporan PKL, atau portofolio desain:
* **3 Salinan**: Miliki minimal 3 salinan dari data pentingmu (1 data asli + 2 cadangan).
* **2 Media Berbeda**: Simpan pada 2 tipe media penyimpanan yang berbeda (misal: SSD internal laptop + Flashdisk/Harddisk External).
* **1 Lokasi Terpisah (Offsite/Cloud)**: Simpan 1 salinan cadangan di penyimpanan awan terisolasi (*Google Drive, OneDrive, atau Dropbox*).

---

## 6. Perawatan dan Panduan Troubleshooting Komputer

\`\`\`text
+-----------------------+-----------------------------+-----------------------------------+
| GEJALA KERUSAKAN      | KEMUNGKINAN PENYEBAB        | LANGKAH PENANGANAN MANDIRI        |
+-----------------------+-----------------------------+-----------------------------------+
| Komputer Mati Total   | Kabel power longgar / PSU   | Periksa stopkontak, kabel power,  |
| (Lampu tidak menyala) | rusak / saklar power mati   | dan tes PSU dengan paperclip test |
+-----------------------+-----------------------------+-----------------------------------+
| Layar No Display      | RAM kotor / slot berdebu /  | Lepas keping RAM, bersihkan pin   |
| (Kipas nyala, no pic) | kabel HDMI monitor longgar  | kuningan dengan karet penghapus   |
+-----------------------+-----------------------------+-----------------------------------+
| Layar Biru (BSOD)     | Driver crash / file corrupt | Booting ke Safe Mode, update      |
|                       | / bad sector storage        | driver GPU, atau jalankan sfc/scannow|
+-----------------------+-----------------------------+-----------------------------------+
| Komputer Sangat Lambat| CPU Overheating (panas) /   | Bersihkan debu kipas, ganti pasta |
| / Kipas Menderu Keras | RAM penuh / Thermal throttling| termal (thermal paste) prosesor |
+-----------------------+-----------------------------+-----------------------------------+
\`\`\``,
    contohPenerapan: `1. **Rekomendasi Spek PC Siswa DKV**: Memilih PC dengan prosesor minimal 6-Core, RAM 16GB-32GB DDR5, GPU Dedicated RTX 3060 12GB VRAM, dan SSD NVMe PCIe Gen 4 agar rendering 3D Blender dan editing video Premiere lancar tanpa patah-patah (*stuttering*).
2. **Pembersihan Rutin Lab Komputer SMK**: Teknisi lab sekolah melakukan pembersihan debu motherboard menggunakan blower angin dan mengganti pasta termal pendingin heatsink setiap 6 bulan sekali untuk mencegah overheating.`,
    studiKasus: `**Studi Kasus: Musibah Hilangnya File Portofolio Kelulusan**

Seorang siswa kelas XII SMK menyimpan file proyek akhir desainnya hanya di satu flashdisk tanpa backup. Satu minggu menjelang sidang kelulusan, flashdisk tersebut patah karena tersenggol saat dicolokkan ke komputer sekolah. Akibatnya, seluruh file hilang dan siswa tersebut terancam tidak bisa lulus ujian kompetensi keahlian.

**Analisis**:
Jelaskan bagaimana implementasi aturan Backup 3-2-1 dan penyimpanan cloud seharusnya diterapkan sejak awal untuk mencegah tragedi tersebut!`,
    aktivitasSiswa: `**Praktik Lab: Diagnosis Spesifikasi & Kesehatan Hardware**
1. Nyalakan komputer di lab sekolah.
2. Buka aplikasi **Task Manager** (Ctrl + Shift + Esc) dan **DirectX Diagnostic Tool** (ketik \`dxdiag\` di Run).
3. Catat spesifikasi komputer yang kamu gunakan:
   - Nama Prosesor & Jumlah Core
   - Kapasitas RAM terpasang & Kecepatannya (MHz)
   - Tipe Penyimpanan (SSD atau HDD)
   - Tipe Kartu Grafis (Integrated atau Dedicated)
4. Buat tabel laporan spesifikasi di buku catatanmu!`,
    tipsPraktis: [
      'Jangan pernah mematikan komputer dengan mencabut kabel daya secara paksa; selalu gunakan menu Shutdown resmi agar sistem operasi sempat menutup proses penulisan data di SSD.',
      'Aktifkan fitur TRIM pada SSD agar kinerja baca/tulis SSD tetap cepat dalam jangka panjang.',
      'Gunakan stabilizer atau UPS (*Uninterruptible Power Supply*) untuk melindungi komputer lab dari lonjakan voltase listrik mendadak.'
    ],
    kesalahanUmum: [
      'Menjalankan program defragmentasi pada SSD (defragmentasi hanya untuk HDD lama; pada SSD justru memperpendek umur chip flash NAND).',
      'Menyentuh pin kuningan prosesor atau RAM dengan jari tangan yang basah atau berminyak.',
      'Mengabaikan peringatan kapasitas penyimpanan drive C: yang hampir penuh (menyebabkan sistem lambat dan crash).'
    ],
    rangkuman: `• Sistem Komputer terdiri dari Tritunggal: Hardware, Software, dan Brainware yang bekerja dalam siklus IPOS (Input, Process, Output, Storage).
• CPU memproses instruksi melalui ALU, CU, dan Register; RAM adalah memori volatil berkecepatan tinggi, sedangkan ROM menyimpan BIOS/UEFI non-volatil.
• SSD menawarkan kecepatan baca/tulis ratusan kali lipat lebih cepat dan lebih tahan guncangan dibandingkan HDD mekanikal.
• Booting adalah alur inisialisasi hardware melalui POST hingga kernel OS dimuat ke RAM.
• Prinsip Backup 3-2-1 (3 salinan, 2 media, 1 cloud) menjamin keamanan data dari bahaya kehilangan total.`,
    refleksi: [
      'Apakah kamu sudah menerapkan strategi backup berkala pada file-file tugas pentingmu di sekolah?',
      'Jika kamu diberikan anggaran untuk meningkatkan performa komputermu, komponen apa yang paling mendesak untuk di-upgrade (RAM, SSD, atau GPU)?'
    ],
    latihanPemahaman: [
      '1. Jelaskan perbedaan mendasar antara memori yang bersifat Volatil (RAM) dan Non-Volatil (ROM/SSD)!',
      '2. Uraikan 4 tahapan dalam siklus pemrosesan data IPOS pada komputer!',
      '3. Mengapa SSD jauh lebih cepat dan lebih tahan lama dibandingkan HDD piringan magnetik?',
      '4. Jelaskan apa yang dimaksud dengan aturan Backup 3-2-1 dan berikan contoh penerapannya!'
    ],
    tugasPraktik: `**Tugas Analisis: Rekomendasi Spesifikasi Komputer Kejuruan**
Buatlah sebuah dokumen analisis (2 halaman) yang berisi:
1. Perbandingan spesifikasi minimal komputer untuk Jurusan DKV (berorientasi grafis/video) vs Jurusan APHP/Akuntansi (berorientasi spreadsheet/administrasi).
2. Analisis pilihan hardware (CPU, RAM, GPU, Storage SSD) beserta estimasi budget harga pasar saat ini.
3. Rencana SOP pemeliharaan rutin mingguan dan bulanan pada komputer tersebut.
Simpan dalam format PDF (\`SK1_NAMA_KELAS.pdf\`) dan kumpulkan ke LMS!`,
    asesmen: [
      {
        question: 'Komponen CPU yang bertanggung jawab langsung untuk mengeksekusi perhitungan matematika dan perbandingan logika biner adalah...',
        options: ['Arithmetic Logic Unit (ALU)', 'Control Unit (CU)', 'Power Supply Unit (PSU)', 'Random Access Memory (RAM)'],
        answerIndex: 0,
        explanation: 'ALU (Arithmetic Logic Unit) adalah bagian sirkuit pemroses di dalam CPU yang menjalankan kalkulasi matematika dan logika.'
      },
      {
        question: 'Sifat dari memori RAM (Random Access Memory) yang benar adalah...',
        options: [
          'Volatil (data akan terhapus seketika saat komputer dimatikan atau listrik padam)',
          'Non-volatil (data tersimpan permanen selamanya)',
          'Hanya bisa dibaca dan tidak bisa ditulis data baru',
          'Kecepatannya lebih lambat dibandingkan flashdisk USB'
        ],
        answerIndex: 0,
        explanation: 'RAM bersifat volatil, memerlukan daya listrik aktif untuk mempertahankan data di sel memorinya.'
      },
      {
        question: 'Proses pemeriksaan mandiri perangkat keras oleh motherboard saat pertama kali komputer dinyalakan disebut...',
        options: ['POST (Power-On Self-Test)', 'Defragmentasi Disk', 'Disk Cleanup', 'System Restore'],
        answerIndex: 0,
        explanation: 'POST (Power-On Self-Test) memeriksa kesiapan CPU, RAM, GPU, dan keyboard sebelum masuk ke tahap pemuatan sistem operasi.'
      },
      {
        question: 'Penerapan strategi Backup 3-2-1 yang benar di bawah ini adalah...',
        options: [
          'Menyimpan 3 salinan data pada 2 jenis media berbeda dan 1 salinan disimpan di tempat terpisah/cloud',
          'Menyimpan 3 file di desktop komputer yang sama',
          'Membeli 3 flashdisk dari merk yang sama dan ditaruh di saku celana',
          'Menghapus file asli setelah 3 hari'
        ],
        answerIndex: 0,
        explanation: 'Aturan 3-2-1: 3 salinan data, pada minimal 2 media penyimpanan berbeda, dengan minimal 1 salinan disimpan secara offsite/cloud.'
      },
      {
        question: 'Jika saat komputer dinyalakan lampu menyala dan kipas berputar tetapi layar monitor tetap hitam (No Display), langkah awal yang paling tepat adalah...',
        options: [
          'Memeriksa kabel monitor dan membersihkan pin kuningan RAM menggunakan penghapus karet',
          'Langsung membuang motherboard ke tempat sampah',
          'Menginstal ulang sistem operasi Windows secara paksa',
          'Menghapus semua file di harddisk'
        ],
        answerIndex: 0,
        explanation: 'Gejala No Display dengan kipas berputar sering disebabkan oleh koneksi pin RAM yang kotor/berdebu atau kabel monitor longgar.'
      },
      {
        question: 'Bagian CPU yang bertindak sebagai pengatur lalu lintas data dan penerjemah instruksi biner adalah...',
        options: ['Control Unit (CU)', 'Arithmetic Logic Unit (ALU)', 'Heat Sink Fan', 'Southbridge'],
        answerIndex: 0,
        explanation: 'Control Unit (CU) mengambil instruksi dari memori, mendekodekannya, dan mengoordinasikan sinyal kontrol ke seluruh komponen CPU.'
      },
      {
        question: 'Empat tahapan utama dalam Siklus Mesin (Machine Cycle) pemrosesan CPU adalah...',
        options: ['Fetch - Decode - Execute - Store', 'Input - Output - Print - Save', 'Read - Write - Delete - Copy', 'Boot - Load - Run - Exit'],
        answerIndex: 0,
        explanation: 'Siklus instruksi CPU terdiri dari Fetch (ambil instruksi), Decode (artikan), Execute (jalankan), dan Store (simpan hasil ke register/memori).'
      },
      {
        question: 'Perangkat lunak dasar yang tertanam pada chip ROM/Flash motherboard untuk menginisialisasi hardware dan memulai proses booting sistem operasi adalah...',
        options: ['BIOS / UEFI', 'Sistem Operasi Windows', 'Web Browser', 'Antivirus'],
        answerIndex: 0,
        explanation: 'BIOS (Basic Input/Output System) atau UEFI adalah firmware level rendah yang pertama kali dieksekusi saat komputer dinyalakan.'
      },
      {
        question: 'Manakah jenis media penyimpanan sekunder yang memiliki kecepatan transfer data (Read/Write) tertinggi untuk loading aplikasi editing video berat?',
        options: ['SSD NVMe PCIe M.2', 'SSD SATA 2.5 inch', 'Harddisk HDD 7200 RPM', 'Flashdisk USB 2.0'],
        answerIndex: 0,
        explanation: 'SSD NVMe M.2 yang memanfaatkan jalur PCI Express mampu menghasilkan kecepatan baca/tulis hingga lebih dari 3.500–7.000 MB/s.'
      },
      {
        question: 'Komponen yang berfungsi mengolah data visual, rendering grafis 3D, dan kalkulasi piksel sebelum ditampilkan ke monitor adalah...',
        options: ['GPU (Graphics Processing Unit)', 'Sound Card', 'Network Interface Card', 'Optical Disc Drive'],
        answerIndex: 0,
        explanation: 'GPU dirancang khusus dengan ribuan core pemroses paralel untuk memproses grafis dan video rendering dengan cepat.'
      },
      {
        question: 'Memori internal yang berlokasi tepat di dalam chip GPU dan didedikasikan khusus untuk menampung tekstur gambar dan frame buffer video disebut...',
        options: ['VRAM (Video RAM)', 'SRAM Cache L1', 'ROM BIOS', 'Virtual Memory'],
        answerIndex: 0,
        explanation: 'VRAM (Video Random Access Memory) menyediakan bandwidth tinggi bagi GPU untuk memproses rendering animasi dan resolusi tinggi.'
      },
      {
        question: 'Komponen penyuplai daya yang mengubah arus bolak-balik (AC) dari stopkontak dinding PLN menjadi arus searah (DC) dengan voltase stabil (12V, 5V, 3.3V) adalah...',
        options: ['Power Supply Unit (PSU)', 'Voltage Regulator (VRM)', 'Uninterruptible Power Supply (UPS)', 'Trafo Step Down'],
        answerIndex: 0,
        explanation: 'PSU (Power Supply Unit) mengonversi listrik AC 220V menjadi arus DC voltase rendah yang dibutuhkan komponen internal PC.'
      },
      {
        question: 'Fungsi dari pasta termal (Thermal Paste) yang dioleskan di antara permukaan prosesor (CPU) dan heatsink pendingin adalah...',
        options: [
          'Mengisi celah mikro udara agar perpindahan panas dari CPU ke heatsink berlangsung optimal',
          'Merekatkan CPU agar tidak lepas saat terjadi guncangan',
          'Mengalirkan arus listrik cadangan ke CPU',
          'Mendinginkan prosesor secara kimiawi tanpa bantuan kipas'
        ],
        answerIndex: 0,
        explanation: 'Thermal paste berfungsi sebagai penghantar panas yang mengisi rongga udara mikroskopis di antara logam IHS CPU dan base heatsink.'
      },
      {
        question: 'Baterai kancing (CR2032) yang terpasang di motherboard komputer berfungsi untuk...',
        options: [
          'Menjaga daya pada chip CMOS agar setelan jam/tanggal dan konfigurasi BIOS tidak reset saat listrik mati',
          'Menyalakan lampu LED RGB casing saat komputer mati',
          'Memberikan daya darurat pada CPU selama 1 jam saat pemadaman listrik',
          'Menjalankan kipas pendingin secara pasif'
        ],
        answerIndex: 0,
        explanation: 'Baterai CMOS mempertahankan daya voltase rendah untuk sirkuit Real-Time Clock (RTC) dan pengaturan BIOS saat PC terputus dari sumber listrik.'
      },
      {
        question: 'Perangkat lunak khusus yang bertindak sebagai jembatan penerjemah komunikasi antara sistem operasi dengan perangkat keras fisik (seperti printer atau drawing tablet) dinamakan...',
        options: ['Device Driver', 'Firmware ROM', 'Compiler', 'Utility Cleaner'],
        answerIndex: 0,
        explanation: 'Device Driver memungkinkan sistem operasi mengenali spesifikasi instruksi unik dari perangkat keras eksternal/internal.'
      },
      {
        question: 'Inti terdalam dari sebuah sistem operasi yang mengelola alokasi CPU, memori fisik, dan manajemen I/O secara langsung dinamakan...',
        options: ['Kernel', 'Graphical User Interface (GUI)', 'Command Line Interface (CLI)', 'Shell'],
        answerIndex: 0,
        explanation: 'Kernel adalah komponen inti OS yang bertugas menjembatani aplikasi perangkat lunak dengan perangkat keras fisik komputer.'
      },
      {
        question: 'Sistem berkas (File System) bawaan sistem operasi modern Windows yang mendukung keamanan perizinan file (permissions), enkripsi, dan ukuran file di atas 4 GB adalah...',
        options: ['NTFS', 'FAT32', 'FAT16', 'exFAT murni tanpa ACL'],
        answerIndex: 0,
        explanation: 'NTFS (New Technology File System) adalah file system standar Windows dengan fitur journaling, compression, enkripsi, dan ACL.'
      },
      {
        question: 'Manakah port konektivitas modern yang mampu mentransmisikan data kecepatan tinggi, sinyal video display resolusi 4K/8K, sekaligus pengisian daya (Power Delivery) dalam satu kabel?',
        options: ['USB Type-C / Thunderbolt', 'VGA (D-Sub)', 'PS/2 Port', 'Serial COM Port'],
        answerIndex: 0,
        explanation: 'USB-C dengan standar USB4 / Thunderbolt menggabungkan transfer data hingga 40Gbps, DisplayPort alternate mode, dan USB-PD hingga 100-240W.'
      },
      {
        question: 'Dalam bidang Desain Komunikasi Visual (DKV), monitor dengan panel IPS dan cakupan standar warna 100% sRGB / 99% DCI-P3 sangat dibutuhkan karena...',
        options: [
          'Memiliki reproduksi warna yang akurat dan konsisten dari berbagai sudut pandang',
          'Menghemat daya listrik hingga 90%',
          'Harganya paling murah di pasaran',
          'Membuat komputer bekerja 2 kali lebih cepat'
        ],
        answerIndex: 0,
        explanation: 'Panel IPS dengan color gamut luas memastikan akurasi warna karya desain cetak dan digital sesuai standar industri kreatif.'
      },
      {
        question: 'Perangkat input digital yang sangat penting bagi siswa DKV untuk menggambar ilustrasi bebas dengan sensitivitas tekanan pena (pressure sensitivity) adalah...',
        options: ['Pen Tablet / Pen Display (Drawing Tablet)', 'Optical Trackball Mouse', 'Barcode Scanner', 'Touchpad Laptop Standar'],
        answerIndex: 0,
        explanation: 'Drawing tablet memungkinkan ilustrator mengontrol ketebalan garis dan kepekatan kuas digital secara presisi melalui tekanan pena stilus.'
      },
      {
        question: 'Di laboratorium Agribisnis Pengolahan Hasil Pertanian (APHP), perangkat input yang digunakan untuk membaca kode identitas batch produk makanan kemasan secara cepat adalah...',
        options: ['Barcode / QR Code Scanner', 'Graphics Tablet', 'MIDI Controller', 'Microphone Condenser'],
        answerIndex: 0,
        explanation: 'Barcode scanner membaca kode batang optik secara instan untuk input inventaris stok dan ketertelusuran produk pangan.'
      },
      {
        question: 'Perangkat pengaman listrik yang menyediakan daya baterai cadangan instan saat listrik PLN padam mendadak sehingga komputer tidak langsung mati disebut...',
        options: ['UPS (Uninterruptible Power Supply)', 'Stavolt / Stabilizer', 'Surge Protector', 'MCB Listrik'],
        answerIndex: 0,
        explanation: 'UPS menyimpan energi baterai yang langsung menyuplai daya tanpa jeda saat listrik padam, mencegah kerusakan data dan hardware.'
      },
      {
        question: 'Bunyi "Beep" berulang-ulang dengan pola tertentu saat komputer pertama kali dinyalakan menandakan...',
        options: [
          'Kode eror (Beep Code) dari BIOS yang mengindikasikan adanya kegagalan pada komponen perangkat keras tertentu',
          'Sistem operasi telah selesai di-update',
          'Koneksi internet sedang berjalan sangat kencang',
          'Komputer sedang memutar lagu pengiring kerja'
        ],
        answerIndex: 0,
        explanation: 'Beep code adalah sinyal audio diagnostik dari speaker motherboard untuk memberitahukan kegagalan hardware (misal RAM atau VGA).'
      },
      {
        question: 'Perilaku pemeliharaan preventif (Preventive Maintenance) yang tepat untuk menjaga usia pakai komponen komputer di lab sekolah adalah...',
        options: [
          'Membersihkan debu kipas dan heatsink secara berkala dengan kuas/blower serta menjaga sirkulasi udara ruangan sejuk',
          'Menutup lubang ventilasi casing dengan kain rapat agar tidak kena debu',
          'Menyiram komponen dalam casing dengan air sabun setiap bulan',
          'Mematikan komputer selalu dengan mencabut kabel colokan dari stopkontak secara langsung'
        ],
        answerIndex: 0,
        explanation: 'Membersihkan debu rutin dan memastikan sirkulasi airflow lancar mencegah overheat (panas berlebih) dan throttling pada CPU/GPU.'
      },
      {
        question: 'Gejala ketika prosesor menurunkan kecepatan clock kerjanya secara otomatis untuk mencegah kerusakan akibat suhu panas berlebih disebut...',
        options: ['Thermal Throttling', 'Overclocking', 'Memory Leaking', 'Blue Screen of Death'],
        answerIndex: 0,
        explanation: 'Thermal throttling adalah mekanisme proteksi diri hardware untuk menurunkan frekuensi kerja saat suhu mendekati batas toleransi kritis.'
      },
      {
        question: 'Manakah konfigurasi pemasangan RAM yang menghasilkan bandwidth performa memori dua kali lipat lebih cepat pada motherboard yang mendukung?',
        options: ['Dual Channel Mode (memasang 2 keping RAM identik pada slot channel yang ditentukan)', 'Memasang 1 keping RAM kapasitas besar di slot sembarang', 'Memasang 3 keping RAM dengan merk dan kecepatan berbeda', 'Menonaktifkan memori virtual di Windows'],
        answerIndex: 0,
        explanation: 'Dual Channel menggandakan lebar jalur transfer data bus memori dari 64-bit menjadi 128-bit, meningkatkan throughput CPU.'
      },
      {
        question: 'Penyebab utama terjadinya bottleneck performa pada komputer yang memiliki prosesor generasi terbaru sangat kencang namun masih menggunakan Harddisk mekanik (HDD) sebagai sistem drive adalah...',
        options: [
          'Kecepatan transfer data HDD mekanik (IOPS rendah) jauh lebih lambat sehingga CPU harus menunggu antrian data',
          'HDD mengalirkan daya listrik terlalu besar ke CPU',
          'HDD tidak kompatibel dengan kabel motherboard',
          'HDD memancarkan gelombang magnetik yang merusak CPU'
        ],
        answerIndex: 0,
        explanation: 'Harddisk mekanik memiliki latensi mekanis dan IOPS sangat rendah dibandingkan kecepatan komputasi CPU modern.'
      },
      {
        question: 'Kombinasi tombol pintas keyboard pada Windows yang membuka antarmuka Task Manager untuk memantau penggunaan CPU, RAM, dan disk secara real-time adalah...',
        options: ['Ctrl + Shift + Esc', 'Alt + F4', 'Windows Key + L', 'Ctrl + Alt + Shift + S'],
        answerIndex: 0,
        explanation: 'Kombinasi Ctrl + Shift + Esc langsung membuka Task Manager tanpa melalui layar menu keamanan Windows.'
      },
      {
        question: 'Dalam struktur arsitektur komputer Von Neumann, data dan instruksi program sama-sama disimpan dalam...',
        options: ['Memori utama (Shared Primary Memory)', 'Kabel transmisi serat optik', 'Kartu suara eksternal', 'Monitor penampil'],
        answerIndex: 0,
        explanation: 'Arsitektur Von Neumann memiliki ciri khas di mana data dan instruksi program berbagi ruang memori utama yang sama.'
      },
      {
        question: 'Mengapa pemahaman sistem komputer sangat penting bagi siswa SMK kejuruan non-TIK seperti DKV dan APHP?',
        options: [
          'Agar mampu memilih perangkat kerja digital yang tepat sasaran, merawat aset produksi secara mandiri, dan menyelesaikan kendala teknis ringan di tempat kerja',
          'Hanya agar siswa bisa bermain game komputer dengan lancar',
          'Supaya siswa tidak perlu lagi berkonsentrasi pada mata pelajaran kejuruan utama',
          'Agar siswa bisa membuka jasa servis komputer keliling tanpa izin'
        ],
        answerIndex: 0,
        explanation: 'Literasi perangkat keras dan sistem digital memberdayakan lulusan kejuruan untuk menjaga produktivitas kerja dan merawat aset digital industri.'
      }
    ],
    asesmenUraian: [
      'Jelaskan alur perjalanan data dari saat Anda menekan tuts keyboard hingga karakter huruf tersebut tampil di layar monitor!',
      'Uraikan mengapa laptop untuk desainer grafis membutuhkan Dedicated GPU dengan VRAM besar, sedangkan untuk pengolahan data spreadsheet cukup Integrated GPU!'
    ],
    rubrikPenilaian: [
      {
        kriteria: 'Pemahaman Arsitektur Hardware',
        skor4: 'Mampu menjelaskan fungsi CPU, RAM, GPU, dan Storage secara presisi beserta interaksinya.',
        skor3: 'Menjelaskan komponen dengan benar namun penjelasan alur interaksi kurang mendalam.',
        skor2: 'Hanya menyebutkan nama hardware tanpa memahami fungsinya.',
        skor1: 'Tidak memahami komponen perangkat keras.'
      },
      {
        kriteria: 'Logika Troubleshooting & Backup',
        skor4: 'Langkah troubleshooting sistematis, logis, aman, dan strategi backup 3-2-1 diterapkan secara utuh.',
        skor3: 'Langkah troubleshooting baik namun ada 1 potensi bahaya listrik statis yang terlewat.',
        skor2: 'Langkah perbaikan kurang realistis.',
        skor1: 'Tidak memberikan solusi perbaikan yang benar.'
      }
    ],
    glosarium: [
      { term: 'CPU', definition: 'Central Processing Unit; komponen pemroses utama yang mengeksekusi instruksi program komputer.' },
      { term: 'RAM', definition: 'Random Access Memory; memori kerja berkecepatan tinggi dan bersifat volatil.' },
      { term: 'SSD', definition: 'Solid State Drive; media penyimpanan berbasis chip memori flash semikonduktor tanpa komponen mekanikal bergerak.' },
      { term: 'UEFI / BIOS', definition: 'Firmware tingkat rendah pada motherboard yang menginisialisasi hardware saat proses booting.' },
      { term: 'Backup 3-2-1', definition: 'Standar baku perlindungan data: 3 salinan, 2 media berbeda, dan 1 salinan di lokasi terpisah/cloud.' }
    ],
    sumberReferensi: [
      'Tanenbaum, A. S., & Austin, T. (2013). Structured Computer Organization (6th ed.). Pearson.',
      'Patterson, D. A., & Hennessy, J. L. (2020). Computer Organization and Design: The Hardware/Software Interface. Morgan Kaufmann.',
      'Kemendikbudristek (2021). Buku Siswa Informatika Kelas X. Pusat Perbukuan.',
      'CompTIA A+ Certification Core 1 (220-1101) Hardware Architecture Guidelines.'
    ]
  }
];
