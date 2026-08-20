import { ModuleData } from '../../types';

export const tikModules: ModuleData[] = [
  // =========================================================================
  // BAB 1: INFORMATIKA DAN PERANNYA DALAM KEHIDUPAN
  // =========================================================================
  {
    id: 'TIK-1',
    elementId: 'TIK',
    elementName: 'Teknologi Informasi dan Komunikasi',
    moduleNumber: 1,
    bab: 'BAB 1 — Informatika dan Perannya dalam Kehidupan',
    pertemuan: 1,
    fase: 'Fase E (Kelas X SMK)',
    title: 'Informatika dan Perannya dalam Kehidupan Modern dan Dunia Industri',
    estimatedTimeMinutes: 90,
    difficulty: 'Pemula',
    competencies: [
      'Memahami esensi ilmu Informatika serta perbedaannya dengan TIK, ilmu komputer, dan teknologi digital',
      'Menganalisis 8 pilar ruang lingkup Informatika dalam Kurikulum Merdeka Fase E',
      'Mengidentifikasi peran strategis Informatika dalam kehidupan sehari-hari, dunia pendidikan, dunia kerja, dan industri kreatif',
      'Memetakan keterkaitan Informatika secara spesifik pada program keahlian DKV (Desain Komunikasi Visual) dan APHP (Agribisnis Pengolahan Hasil Pertanian)',
      'Mengenal ragam profesi masa depan di bidang informatika dan menumbuhkan kesadaran etika digital berlandaskan Profil Pelajar Pancasila'
    ],
    objectives: [
      'Siswa mampu mendefinisikan Informatika dan membedakannya secara konseptual dari sekadar penggunaan alat TIK atau perangkat komputer',
      'Siswa dapat menguraikan 8 pilar ruang lingkup Informatika (BK, TIK, SK, JKI, AD, AP, DSI, PLB) dan relevansinya di SMK',
      'Siswa mampu memberikan contoh nyata penerapan Informatika pada bidang keahlian DKV dan APHP di sekolah dan industri',
      'Siswa dapat menganalisis transformasi digital dan evolusi generasi komputer dari masa ke masa',
      'Siswa mampu merumuskan komitmen etika penggunaan teknologi secara aman, bijak, dan bertanggung jawab'
    ],
    summary: 'Eksplorasi komprehensif mengenai hakikat Informatika, ruang lingkup 8 pilar Fase E, evolusi teknologi digital, serta perannya yang transformatif dalam kehidupan sehari-hari, kejuruan SMK (DKV & APHP), dan dunia kerja global.',
    infographicHighlights: [
      { label: 'Hakikat Informatika', text: 'Studi komprehensif tentang struktur data, algoritma, sistem komputasi, dan dampak sosialnya.', icon: 'Brain' },
      { label: '8 Pilar Kurikulum', text: 'BK, TIK, SK, JKI, AD, AP, DSI, dan PLB membentuk fondasi kompetensi digital siswa SMK.', icon: 'Layers' },
      { label: 'Konteks Kejuruan', text: 'Mendorong efisiensi produksi pangan APHP dan keunggulan visual industri kreatif DKV.', icon: 'Briefcase' },
      { label: 'Etika & Integritas', text: 'Pemanfaatan teknologi secara bijak, patuh regulasi UU ITE, dan menghormati hak cipta.', icon: 'ShieldCheck' }
    ],
    pertanyaanPemantik: [
      'Apakah seseorang yang mahir mengetik di Microsoft Word atau bermain media sosial sudah bisa disebut sebagai pakar Informatika?',
      'Bagaimana sebuah perkebunan kopi atau studio desain grafis dapat meningkatkan omzet ratusan persen hanya dengan memanfaatkan teknologi Informatika?',
      'Di tengah perkembangan kecerdasan buatan (AI) yang begitu pesat, kemampuan manusia apa yang tetap tidak bisa tergantikan di dunia kerja?'
    ],
    pendahuluan: `Selamat datang di mata pelajaran Informatika Kelas X SMK! Kita hidup di era Revolusi Industri 4.0 dan Society 5.0, di mana teknologi bukan lagi sekadar pelengkap, melainkan tulang punggung seluruh sektor kehidupan.

Banyak orang menyamakan "Informatika" hanya dengan "belajar komputer" atau "mengetik dokumen". Pemahaman ini sangat sempit. Informatika adalah cabang ilmu sains dan rekayasa yang mempelajari bagaimana data, informasi, dan proses komputasi dirancang, diproses secara sistematis melalui algoritma, disimpan dalam arsitektur perangkat keras, ditransmisikan melalui jaringan global, serta bagaimana teknologi tersebut memengaruhi peradaban manusia.

Bagi siswa Sekolah Menengah Kejuruan (SMK) di era kurikulum merdeka (Keputusan Kepala BSKAP No 046/H/KR/2025), penguasaan Informatika adalah kunci untuk menjadi profesional yang adaptif, inovatif, dan berdaya saing tinggi di dunia usaha dan dunia industri (DUDI).`,
    konsepInti: `1. **Informatika vs TIK vs Komputer vs Teknologi Digital**: Informatika adalah disiplin ilmunya; TIK adalah pemanfaatannya; komputer adalah mesin pemrosesnya; dan teknologi digital adalah wujud sistemiknya.
2. **8 Elemen Informatika Fase E**: Berpikir Komputasional (BK), TIK, Sistem Komputer (SK), Jaringan Komputer & Internet (JKI), Analisis Data (AD), Algoritma & Pemrograman (AP), Dampak Sosial Informatika (DSI), dan Praktik Lintas Bidang (PLB).
3. **Konteks SMK DKV & APHP**: Informatika memberdayakan otomatisasi alur desain & color science pada DKV, serta digital traceability & formulasi mutu pada APHP.
4. **Etika Penggunaan Teknologi**: Kepatuhan hukum (UU ITE & UU PDP), integritas akademis, dan tanggung jawab sosial digital.`,
    contentMarkdown: `# BAB 1 — Informatika dan Perannya dalam Kehidupan

## 1. Pengertian Informatika & Konsep Fundamental

**Informatika (*Informatics*)** adalah bidang ilmu yang mencakup struktur, sifat, dan interaksi dari beberapa sistem yang dipakai untuk mengumpulkan data, memproses dan menyimpan hasil pemrosesan data, serta menampilkannya dalam bentuk informasi yang bermanfaat.

\`\`\`text
+-------------------------------------------------------------------------------+
|                            PETA KONSEP INFORMATIKA                            |
+-------------------------------------------------------------------------------+
|                                 DATA MENTAH                                   |
|                (Teks, Angka, Citra Sensor, Vektor, Suara)                     |
|                                     │                                         |
|                                     ▼                                         |
|                         PROSES KOMPUTASI & LOGIKA                             |
|               (Algoritma, Pemrograman, Struktur Kontrol)                      |
|                                     │                                         |
|                                     ▼                                         |
|                                 INFORMASI                                     |
|             (Keputusan Bisnis, Karya Desain, Kualitas Produk)                 |
+-------------------------------------------------------------------------------+
\`\`\`

### Membedakan Istilah Penting:
1. **Informatika (*Informatics/Computer Science*)**: Disiplin ilmu murni dan terapan yang mempelajari teori komputasi, algoritma, perancangan perangkat lunak, sistem komputasi, dan dampaknya pada masyarakat.
2. **TIK (*Information and Communication Technology / ICT*)**: Aspek teknis dan praktis dalam penggunaan perangkat lunak dan keras untuk mengolah dan mendistribusikan informasi (misalnya penggunaan word processor, spreadsheet, email).
3. **Komputer (*Computer*)**: Perangkat fisik (*electronic hardware*) yang menerima input, memproses data melalui sirkuit aritmatika-logika, dan menghasilkan output.
4. **Teknologi Digital**: Sistem diskrit berbasis biner (0 dan 1) yang menggantikan sistem transmisi dan pencatatan analog manual.

---

## 2. Ruang Lingkup Informatika (8 Elemen Fase E SMK)

Dalam Capaian Pembelajaran Kurikulum Merdeka Fase E Kelas X SMK, Informatika terdiri atas **8 pilar utama**:

| No | Elemen | Kode | Fokus Pembelajaran Utama |
|---|---|---|---|
| 1 | **Berpikir Komputasional** | BK | 4 pilar problem solving: Dekomposisi, Pengenalan Pola, Abstraksi, dan Algoritma |
| 2 | **Teknologi Informasi & Komunikasi** | TIK | Integrasi aplikasi perkantoran, kolaborasi cloud, dan etika komunikasi profesional |
| 3 | **Sistem Komputer** | SK | Arsitektur perangkat keras (CPU, RAM, SSD), sistem operasi, BIOS, dan troubleshooting |
| 4 | **Jaringan Komputer & Internet** | JKI | Protokol IP address, DNS, HTTP/HTTPS, topologi LAN/WAN, dan keamanan jaringan siber |
| 5 | **Analisis Data** | AD | Siklus pengolahan data, statistik deskriptif, visualisasi grafik, dan privasi data |
| 6 | **Algoritma & Pemrograman** | AP | Logika alur program, flowchart, pseudocode, tipe data, perulangan, dan coding |
| 7 | **Dampak Sosial Informatika** | DSI | Hukum siber (UU ITE & UU PDP), jejak digital, disrupsi pekerjaan, dan kecerdasan artifisial (AI) |
| 8 | **Praktik Lintas Bidang** | PLB | Kolaborasi proyek terpadu pemecahan masalah nyata kejuruan (DKV, APHP, dan bisnis) |

---

## 3. Informatika dalam Berbagai Sektor Kehidupan

### A. Kehidupan Sehari-hari
* **Navigasi & Transportasi**: Algoritma pencarian rute tercepat (*Dijkstra/A\**) pada Google Maps dan aplikasi ojek daring.
* **Fintech & Transaksi**: Pembayaran nontunai menggunakan standar nasional QRIS, perbankan digital, dan e-wallet.
* **Smart Home & IoT**: Pengatur suhu ruangan, lampu pintar berbasis Wi-Fi, dan CCTV yang dapat dipantau jarak jauh via smartphone.

### B. Dunia Pendidikan
* **Platform Pembelajaran Terbuka**: LMS (Learning Management System), ruang kelas virtual, modul interaktif, dan repositori riset digital.
* **Asesmen Berbasis Komputer**: Ujian online adaptif yang mencegah kecurangan dan memberikan nilai secara *real-time*.

### C. Dunia Kerja & Transformasi Industri
* **Otomasi Proses Bisnis**: Penggantian input data berulang dengan *Robotic Process Automation* (RPA) dan integrasi ERP (*Enterprise Resource Planning*).
* **Kolaborasi Tanpa Batas**: Rapat virtual video conference, penyimpanan awan (*Cloud Storage*), dan manajemen proyek berbasis Kanban board (Trello/Notion).

---

## 4. Informatika pada Bidang Keahlian SMK

\`\`\`text
+-------------------------------------------------------------------------------+
|                      INFORMATIKA UNTUK KEJURUAN SMK                           |
+------------------------------------+------------------------------------------+
|       BIDANG DKV (DESAIN GRAFIS)   |      BIDANG APHP (PENGOLAHAN PANGAN)     |
+------------------------------------+------------------------------------------+
| • Digital Raster & Vector Science  | • Formulasi Spreadsheet Resep & HPP      |
| • Color Profiling (RGB vs CMYK)    | • Digital Quality Control & Sensor Suhu  |
| • Cloud Asset Library & Versioning | • Traceability Produk & Label QR Code    |
| • AI Prompting & Graphic Workflow  | • Digital Marketing & E-Commerce UMKM    |
+------------------------------------+------------------------------------------+
\`\`\`

### A. Informatika pada Bidang DKV (Desain Komunikasi Visual)
Bagi siswa DKV, informatika bukan sekadar menginstal software Adobe atau Figma. Konsep komputasi mendasari:
* **Matematika Representasi Citra**: Memahami perbedaan matematis antara pixel (raster) dan kurva Bezier vektor (SVG) agar desain tidak pecah saat dicetak di billboard ukuran raksasa.
* **Color Management System**: Translasi matematis antara ruang warna layar monitor (RGB/sRGB/DCI-P3) ke ruang warna tinta cetak (CMYK) dan profil ICC.
* **Digital Asset Management (DAM)**: Manajemen penamaan file terstruktur, penyimpanan cloud repository, dan workflow rendering GPU berkecepatan tinggi.

### B. Informatika pada Bidang APHP (Agribisnis Pengolahan Hasil Pertanian)
Bagi siswa APHP, informatika menggerakkan agroindustri modern:
* **Kalkulasi Cepat Formulasi & HPP**: Spreadsheet otomatis untuk menghitung persentase bahan pengawet, kadar gula brix, konversi rendemen bahan baku, hingga Harga Pokok Produksi (HPP).
* **Digital Traceability & Smart Packaging**: Pembuatan QR Code dinamis pada label botol sari buah atau kripik lokal yang merekam tanggal kedaluwarsa, nomor sertifikat P-IRT, dan nomor registrasi Halal BPJPH.
* **Smart Monitoring Mutu**: Pemanfaatan sensor suhu dan kelembaban IoT untuk memonitor ruang fermentasi tape atau ruang pendingin bahan pangan secara otomatis.

---

## 5. Perkembangan Teknologi & Generasi Komputer

Evolusi komputer membuktikan bagaimana inovasi komputasi mengubah dunia:

\`\`\`text
Gen 1 (1940-1956) Tabung Hampa Udara (Vacuum Tube) -> Ukuran sebesar ruangan (ENIAC)
Gen 2 (1956-1963) Transistor -> Lebih kecil, lebih hemat daya, bahasa assembly
Gen 3 (1964-1971) Integrated Circuit (IC) -> Ratusan transistor dalam satu chip silikon
Gen 4 (1971-Sekarang) Mikroprosesor (VLSI/LSI) -> Jutaan transistor dalam 1 CPU (Intel, AMD, ARM)
Gen 5 (Masa Depan) Kecerdasan Buatan (AI) & Komputasi Kuantum -> Pemrosesan paralel masif
\`\`\`

---

## 6. Profesi Masa Depan di Bidang Informatika

1. **Software Engineer & Web Developer**: Mengembangkan aplikasi web dan mobile untuk solusi bisnis.
2. **UI/UX Designer**: Merancang tata letak dan pengalaman interaksi pengguna yang intuitif (sangat cocok untuk siswa DKV).
3. **Data Analyst & Data Scientist**: Mengolah data mentah perusahaan menjadi wawasan keputusan bisnis.
4. **Network & Cloud Administrator**: Mengelola keamanan jaringan, server, dan infrastruktur cloud.
5. **Cybersecurity Specialist**: Melindungi data dan aset digital dari ancaman hacker dan ransomware.
6. **Agro-Tech Digital Specialist**: Mengintegrasikan teknologi digital dalam rantai pasok dan kontrol mutu pangan (peluang emas lulusan APHP).

---

## 7. Etika, Regulasi, dan Tanggung Jawab Digital

Menguasai informatika harus diimbangi dengan akhlak mulia dan kesadaran hukum:
* **Patuhi UU ITE & UU PDP**: Menghindari penyebaran konten hoaks, ujaran kebencian, pencemaran nama baik, dan kebocoran data pribadi orang lain.
* **Hormati Hak Cipta (HAKI)**: Tidak membajak perangkat lunak berbayar dan selalu mencantumkan atribusi lisensi karya visual/musik yang diunduh dari internet.
* **Keamanan Akun**: Menerapkan kata sandi kuat dan mengaktifkan otentikasi dua langkah (2FA).`,
    contohPenerapan: `1. **Contoh di Sekolah SMK**: Penggunaan sistem presensi kode QR harian dan rapor online yang mengintegrasikan data nilai dari puluhan guru mata pelajaran secara real-time.
2. **Contoh di Studio DKV**: Penerapan penyimpanan cloud Google Drive Workspace untuk kolaborasi tim desain, di mana desainer mengunggah aset vektor dan video editor langsung mengambilnya tanpa saling kirim flashdisk manual.
3. **Contoh di Unit Produksi APHP**: Pembuatan lembar kerja Excel otomatis untuk menghitung rendemen selai pisang: memasukkan berat pisang mentah, otomatis keluar biaya gula, kemasan cup, label stiker, dan estimasi laba bersih per botol.`,
    studiKasus: `**Studi Kasus: Transformasi Digital UMKM Keripik Singkong "Berkah Sari"**

Sebuah UMKM olahan pangan di dekat lingkungan SMK masih mencatat pesanan harian di buku tulis kertas. Masalah yang sering terjadi:
1. Catatan basah terkena minyak dan hilang, menyebabkan pesanan pelanggan tidak terkirim.
2. Stok singkong mentah sering membusuk karena pemilik tidak mengetahui sisa persediaan di gudang secara akurat.
3. Kemasan produk hanya memakai plastik polos tanpa informasi tanggal kedaluwarsa atau label gizi, sehingga toko oleh-oleh menolak menjualnya.

**Analisis Masalah**:
Siswa diminta merumuskan bagaimana 3 pilar Informatika (TIK/Spreadsheet, Analisis Data, dan Desain Grafis DKV) dapat diterapkan secara nyata untuk menyelamatkan dan melipatgandakan keuntungan UMKM tersebut!`,
    aktivitasSiswa: `**Aktivitas Diskusi Kelompok (Informatika Discovery Lab)**:
1. Bentuk kelompok beranggotakan 3-4 orang.
2. Pilih salah satu bidang yang paling kamu minati (DKV, APHP, atau Bisnis Digital).
3. Buatlah sebuah bagan alur (*mind map*) di buku catatan atau aplikasi presentasi yang menggambarkan bagaimana Informatika digunakan dalam proses produksi dari awal (bahan mentah/brief) hingga produk sampai ke tangan konsumen.
4. Presentasikan hasil diskusimu di depan kelas selama 3 menit!`,
    tipsPraktis: [
      'Jangan memandang Informatika hanya sebagai hafalan teori, tetapi latih pola pikir logis dalam menyelesaikan masalah sehari-hari.',
      'Eksplorasi aplikasi gratis dan open-source yang mendukung keahlianmu, seperti Inkscape/GIMP untuk desain atau Google Sheets untuk pencatatan data.',
      'Biasakan menyimpan dokumen dengan sistem penamaan folder yang rapi dan terstruktur sejak hari pertama sekolah.'
    ],
    kesalahanUmum: [
      'Menganggap Informatika sama persis dengan sekadar kursus mengetik Microsoft Word.',
      'Merasa bahwa siswa non-TIK (seperti APHP atau Kuliner) tidak membutuhkan keahlian informatika.',
      'Menggunakan teknologi tanpa memperhatikan jejak digital dan etika hukum UU ITE.'
    ],
    rangkuman: `• Informatika adalah disiplin ilmu komprehensif yang mempelajari struktur data, algoritma pemrosesan, sistem perangkat keras/lunak, jaringan komunikasi, dan dampaknya bagi peradaban.
• Dalam Kurikulum Merdeka Fase E, Informatika mencakup 8 pilar: BK, TIK, SK, JKI, AD, AP, DSI, dan PLB.
• Informatika memiliki keterkaitan langsung dengan jurusan SMK: pada DKV mendasari sains visual digital, dan pada APHP mengotomasi formulasi produksi, kontrol mutu, serta pemasaran digital.
• Penguasaan keterampilan digital wajib diimbangi dengan etika, perlindungan privasi data, dan kepatuhan hukum siber.`,
    refleksi: [
      'Dari 8 pilar Informatika, elemen manakah yang menurutmu paling menarik dan paling ingin kamu kuasai secara mendalam?',
      'Bagaimana kamu akan memanfaatkan keterampilan informatika untuk memajukan jurusan keahlianmu di SMK?',
      'Apakah selama ini kamu sudah menggunakan gawai (*smartphone*) secara etis dan produktif?'
    ],
    latihanPemahaman: [
      '1. Jelaskan perbedaan mendasar antara Informatika, TIK, dan Komputer dengan menggunakan bahasamu sendiri!',
      '2. Sebutkan 8 pilar utama Informatika dalam Kurikulum Merdeka Fase E beserta contoh kegiatannya di sekolah!',
      '3. Berikan 2 contoh konkret penerapan informatika pada jurusan DKV dan 2 contoh pada jurusan APHP!',
      '4. Mengapa etika dan pemahaman UU ITE sangat penting dimiliki oleh siswa SMK di era digital saat ini?'
    ],
    tugasPraktik: `**Tugas Portofolio Awal: Lembar Rencana Kompetensi Digital Siswa**
Buatlah sebuah dokumen mini (1 halaman) menggunakan aplikasi pengolah kata yang memuat:
1. Profil diri (Nama, NIS, Jurusan, Cita-cita profesi).
2. Tiga target keterampilan digital yang ingin kamu kuasai selama belajar Informatika di Kelas X.
3. Contoh satu masalah di sekitar tempat tinggalmu yang ingin kamu selesaikan menggunakan bantuan teknologi informatika.
4. Simpan dalam format PDF dengan format nama: \`TUGAS1_NAMA_KELAS.pdf\` lalu kumpulkan ke portal tugas.`,
    asesmen: [
      {
        question: 'Perbedaan utama antara Informatika dan TIK yang paling tepat adalah...',
        options: [
          'Informatika adalah disiplin ilmu komputasi dan pemecahan masalah sistematis, sedangkan TIK lebih berfokus pada teknik pemanfaatan perangkat lunak dan komunikasinya',
          'Informatika hanya mempelajari perangkat keras, sedangkan TIK hanya mempelajari jaringan internet',
          'Informatika tidak menggunakan komputer sama sekali, sedangkan TIK wajib menggunakan komputer super',
          'Informatika khusus untuk programer profesional, sedangkan TIK khusus untuk perkantoran dan mengetik'
        ],
        answerIndex: 0,
        explanation: 'Informatika adalah induk disiplin ilmunya (meliputi struktur data, algoritma, sistem komputasi), sedangkan TIK adalah aplikasi praktis perangkat untuk berkomunikasi dan mengolah data.'
      },
      {
        question: 'Elemen Informatika yang berfokus pada teknik memecahkan masalah kompleks melalui 4 pilar (Dekomposisi, Pola, Abstraksi, Algoritma) adalah...',
        options: [
          'Jaringan Komputer dan Internet (JKI)',
          'Berpikir Komputasional (BK)',
          'Sistem Komputer (SK)',
          'Dampak Sosial Informatika (DSI)'
        ],
        answerIndex: 1,
        explanation: 'Berpikir Komputasional (BK) merupakan metode berpikir pemecahan masalah terstruktur dengan 4 pilar utama.'
      },
      {
        question: 'Penerapan teknologi Informatika yang paling relevan bagi siswa jurusan Desain Komunikasi Visual (DKV) adalah...',
        options: [
          'Manajemen profil warna RGB/CMYK, kurva vektor matematis, dan kolaborasi cloud aset grafis',
          'Perakitan kabel power supply tegangan tinggi',
          'Penanaman bibit jagung secara hidroponik tanpa sensor',
          'Pencatatan nota kas manual di buku kwitansi'
        ],
        answerIndex: 0,
        explanation: 'Siswa DKV memanfaatkan pemahaman komputasi grafis (vektor, pixel, color profile, cloud storage asset).'
      },
      {
        question: 'Manakah contoh pemanfaatan Informatika yang tepat pada bidang Agribisnis Pengolahan Hasil Pertanian (APHP)?',
        options: [
          'Membuat spreadsheet formulasi bahan resep, otomatisasi kalkulasi HPP, dan label kemasan ber-QR Code',
          'Memprogram video game console 3D tanpa data pertanian',
          'Membeli bahan baku tanpa mencatat stok barang',
          'Mencetak poster desain tanpa memperhitungkan biaya produksi'
        ],
        answerIndex: 0,
        explanation: 'APHP mengandalkan spreadsheet untuk formulasi bahan, HPP, monitoring mutu digital, serta QR Code pada label kemasan.'
      },
      {
        question: 'Generasi komputer yang ditandai dengan ditemukannya mikroprosesor (jutaan transistor dalam satu keping chip silikon) adalah generasi ke...',
        options: [
          'Generasi Pertama (1)',
          'Generasi Kedua (2)',
          'Generasi Ketiga (3)',
          'Generasi Keempat (4)'
        ],
        answerIndex: 3,
        explanation: 'Komputer generasi keempat (1971-sekarang) menggunakan mikroprosesor berbasis teknologi VLSI (Very Large Scale Integration).'
      },
      {
        question: 'Komponen utama sistem komputer yang mencakup manusia sebagai operator, pengembang, dan pengambil keputusan disebut...',
        options: ['Brainware', 'Hardware', 'Software', 'Firmware'],
        answerIndex: 0,
        explanation: 'Sistem komputer terdiri dari Hardware (perangkat keras), Software (perangkat lunak), dan Brainware (manusia pengelola).'
      },
      {
        question: 'Model layanan komputasi awan di mana pengguna langsung menggunakan aplikasi siap pakai melalui peramban web (seperti Google Docs atau Gmail) disebut...',
        options: ['SaaS (Software as a Service)', 'IaaS (Infrastructure as a Service)', 'PaaS (Platform as a Service)', 'DaaS (Desktop as a Service)'],
        answerIndex: 0,
        explanation: 'SaaS menyediakan aplikasi jadi yang diakses langsung melalui internet tanpa perlu instalasi di komputer lokal.'
      },
      {
        question: 'Elemen Informatika yang mempelajari arsitektur interaksi antara prosesor, memori, media penyimpanan, dan perangkat I/O adalah...',
        options: ['Sistem Komputer (SK)', 'Analisis Data (AD)', 'Praktik Lintas Bidang (PLB)', 'Teknologi Informasi dan Komunikasi (TIK)'],
        answerIndex: 0,
        explanation: 'Sistem Komputer (SK) membedah mekanisme kerja internal perangkat keras dan sistem operasi.'
      },
      {
        question: 'Elemen Informatika yang mengkaji pengaruh teknologi terhadap kehidupan manusia, etika digital, hukum siber, dan transformasi karier masa depan adalah...',
        options: ['Dampak Sosial Informatika (DSI)', 'Algoritma dan Pemrograman (AP)', 'Berpikir Komputasional (BK)', 'Sistem Komputer (SK)'],
        answerIndex: 0,
        explanation: 'DSI mempelajari aspek sosial, hukum, etika, dan dampak ekonomi dari revolusi teknologi digital.'
      },
      {
        question: 'Undang-Undang di Indonesia yang mengatur tentang informasi dan transaksi elektronik serta sanksi hukum terhadap kejahatan siber adalah...',
        options: ['UU ITE (Informasi dan Transaksi Elektronik)', 'UU Ketenagakerjaan', 'UU Perbankan', 'UU Pariwisata'],
        answerIndex: 0,
        explanation: 'UU ITE (UU No. 11/2008 jo UU No. 1/2024) adalah landasan hukum utama tata kelola siber dan transaksi digital di Indonesia.'
      },
      {
        question: 'Tindakan berikut yang merupakan contoh penerapan etika digital (Netiquette) yang baik di media sosial adalah...',
        options: [
          'Mencantumkan sumber/kredit saat membagikan karya cipta orang lain dan menggunakan bahasa yang santun',
          'Menyebarkan informasi provokatif tanpa memeriksa fakta (hoaks)',
          'Menghina teman sekelas di kolom komentar publik',
          'Mengunggah data pribadi orang lain tanpa izin (Doxxing)'
        ],
        answerIndex: 0,
        explanation: 'Netiquette menekankan sikap saling menghargai, atribusi karya, kejujuran, dan kesantunan dalam berinteraksi daring.'
      },
      {
        question: 'Metode otentikasi akun digital yang mewajibkan pengguna memasukkan kata sandi dan kode verifikasi OTP yang dikirim ke smartphone disebut...',
        options: ['2FA / MFA (Two-Factor Authentication)', 'Single Sign Out', 'Password Sharing', 'Caps Lock Mode'],
        answerIndex: 0,
        explanation: 'Two-Factor Authentication (2FA) memberikan lapisan keamanan ganda untuk mencegah peretasan akun.'
      },
      {
        question: 'Istilah untuk penipuan digital yang bertujuan memancing korban memasukkan kata sandi atau data perbankan melalui link palsu yang menyerupai situs resmi adalah...',
        options: ['Phishing', 'Defragmenting', 'Formatting', 'Compiling'],
        answerIndex: 0,
        explanation: 'Phishing adalah rekayasa sosial (social engineering) penipuan untuk mencuri kredensial akun pengguna.'
      },
      {
        question: 'Pola kata sandi (password) yang paling kuat dan tahan terhadap serangan peretasan Brute Force adalah...',
        options: [
          'Kombinasi minimal 12 karakter yang memadukan huruf besar, huruf kecil, angka, dan simbol unik acak',
          'Nama panggilan dan tanggal lahir',
          'Angka berurutan seperti 12345678',
          'Kata "password123"'
        ],
        answerIndex: 0,
        explanation: 'Password kuat menggunakan kombinasi panjang dan variatif tanpa memuat informasi pribadi yang mudah ditebak.'
      },
      {
        question: 'Strategi pencadangan data "Aturan 3-2-1" yang direkomendasikan dalam keamanan data berarti...',
        options: [
          'Menyimpan 3 salinan data, pada 2 jenis media penyimpanan berbeda, dengan 1 salinan disimpan di lokasi terpisah / cloud',
          'Menghapus 3 file setiap 2 jam sekali',
          'Menggunakan 3 komputer untuk 1 orang',
          'Membeli 3 flashdisk yang sama persis'
        ],
        answerIndex: 0,
        explanation: 'Aturan 3-2-1 menjamin ketersediaan data cadangan jika terjadi kerusakan perangkat keras, virus, atau bencana fisik.'
      },
      {
        question: 'Perangkat lunak yang kode sumbernya (source code) dibuka untuk umum sehingga dapat dipelajari, dimodifikasi, dan didistribusikan secara bebas disebut...',
        options: ['Open Source Software (FOSS)', 'Proprietary Software', 'Malware', 'Adware'],
        answerIndex: 0,
        explanation: 'Open Source Software memberikan kebebasan akses kode sumber untuk inovasi dan kolaborasi global (seperti Linux, Blender, GIMP).'
      },
      {
        question: 'Elemen Informatika yang menjadi wadah penerapan terpadu seluruh konsep komputasi untuk menyelesaikan masalah nyata dalam proyek lintas disiplin adalah...',
        options: ['Praktik Lintas Bidang (PLB)', 'Jaringan Komputer dan Internet (JKI)', 'Berpikir Komputasional (BK)', 'Analisis Data (AD)'],
        answerIndex: 0,
        explanation: 'Praktik Lintas Bidang (PLB) mengintegrasikan seluruh elemen Informatika dalam proyek kontekstual kejuruan SMK.'
      },
      {
        question: 'Jejak data yang tertinggal secara permanen saat kita beraktivitas di internet (seperti postingan medsos, riwayat pencarian, dan komentar) disebut...',
        options: ['Jejak Digital (Digital Footprint)', 'Digital Divide', 'Cloud Storage', 'Cache Memory'],
        answerIndex: 0,
        explanation: 'Digital Footprint mencakup seluruh rekam jejak aktivitas daring seseorang yang dapat memengaruhi reputasi profesionalnya.'
      },
      {
        question: 'Generasi pertama komputer (1940-1956) seperti ENIAC menggunakan komponen utama pengolah data berupa...',
        options: ['Tabung Hampa Udara (Vacuum Tube)', 'Transistor Silikon', 'Sirkuit Terpadu (IC)', 'Kecerdasan Buatan'],
        answerIndex: 0,
        explanation: 'Komputer generasi pertama berukuran raksasa dan mengonsumsi daya listrik besar karena berbasis tabung hampa udara.'
      },
      {
        question: 'Generasi komputer yang memperkenalkan penggunaan Sirkuit Terpadu (Integrated Circuit / IC) yang menggabungkan banyak transistor dalam keping silikon kecil adalah generasi ke...',
        options: ['Generasi Ketiga (3)', 'Generasi Pertama (1)', 'Generasi Kedua (2)', 'Generasi Keenam (6)'],
        answerIndex: 0,
        explanation: 'Generasi ketiga (1964-1971) mempopulerkan teknologi IC sehingga komputer menjadi jauh lebih cepat, kecil, dan hemat energi.'
      },
      {
        question: 'Layanan penyimpanan berbasis awan (Cloud Storage) seperti Google Drive atau OneDrive memberikan keuntungan utama berupa...',
        options: [
          'Akses berkas dari mana saja dan kapan saja selama terhubung internet, serta kemudahan kolaborasi multi-pengguna',
          'Dapat diakses tanpa memerlukan listrik sama sekali',
          'Mengubah file video menjadi teks secara otomatis tanpa aplikasi',
          'Menghapus virus di flashdisk secara fisik'
        ],
        answerIndex: 0,
        explanation: 'Cloud storage memfasilitasi sinkronisasi data antar-perangkat, pencadangan otomatis, dan kolaborasi daring secara instan.'
      },
      {
        question: 'Regulasi di Indonesia yang secara khusus melindungi hak warga negara atas kerahasiaan dan privasi data pribadi dari penyalahgunaan korporasi atau pihak ketiga adalah...',
        options: ['UU Perlindungan Data Pribadi (UU PDP No. 27/2022)', 'UU Cipta Kerja', 'UU Bea Cukai', 'UU Lalu Lintas'],
        answerIndex: 0,
        explanation: 'UU PDP mengatur kewajiban pengendali data pribadi serta sanksi tegas atas kebocoran atau penjualan data pribadi tanpa izin.'
      },
      {
        question: 'Dalam konsep komputasi, istilah "Hardware" merujuk pada...',
        options: [
          'Komponen fisik komputer yang dapat dilihat dan disentuh secara nyata (seperti monitor, motherboard, dan keyboard)',
          'Instruksi kode program biner',
          'Pengguna komputer',
          'Jaringan internet nirkabel'
        ],
        answerIndex: 0,
        explanation: 'Hardware adalah seluruh perangkat keras fisik penyusun komputer.'
      },
      {
        question: 'Perangkat lunak yang bertindak sebagai jembatan penghubung antara perangkat keras komputer dengan program aplikasi pengguna adalah...',
        options: ['Sistem Operasi (Operating System)', 'Aplikasi Web Browser', 'Game Edukasi', 'File Musik MP3'],
        answerIndex: 0,
        explanation: 'Sistem Operasi (seperti Windows, Linux, Android, macOS) mengelola sumber daya perangkat keras dan melayani eksekusi aplikasi.'
      },
      {
        question: 'Kesenjangan antara masyarakat yang memiliki akses internet dan keterampilan digital dengan masyarakat yang terisolasi dari teknologi disebut...',
        options: ['Kesenjangan Digital (Digital Divide)', 'Digital Literacy', 'Digital Native', 'Digital Immigrant'],
        answerIndex: 0,
        explanation: 'Digital Divide adalah masalah sosial terkait ketimpangan akses fasilitas dan literasi teknologi informasi.'
      },
      {
        question: 'Bentuk kejahatan siber berupa penyebaran informasi palsu dengan niat sengaja untuk menyesatkan atau menimbulkan kepanikan publik dinamakan...',
        options: ['Disinformasi / Hoaks', 'Debugging', 'Indexing', 'Rendering'],
        answerIndex: 0,
        explanation: 'Disinformasi adalah berita bohong yang disebarkan secara sengaja untuk memanipulasi opini publik.'
      },
      {
        question: 'Manakah tindakan yang melanggar Hak Kekayaan Intelektual (HAKI) dalam dunia perangkat lunak?',
        options: [
          'Mengunduh dan menggunakan software bajakan hasil crack untuk keperluan komersial',
          'Membeli lisensi resmi software dari distributor resmi',
          'Menggunakan software open source berlisensi MIT',
          'Mengembangkan aplikasi sendiri dari nol'
        ],
        answerIndex: 0,
        explanation: 'Menggunakan program bajakan (crack) melanggar undang-undang hak cipta dan membahayakan sistem dari serangan malware.'
      },
      {
        question: 'Mengapa siswa SMK kejuruan non-TIK (seperti Bisnis, Seni, atau Pertanian) tetap wajib mempelajari Informatika di Fase E?',
        options: [
          'Karena seluruh sektor industri modern saat ini telah bertransformasi digital dan menuntut tenaga kerja berkemampuan nalar komputasi serta literasi data',
          'Hanya agar ruang lab komputer sekolah terpakai',
          'Supaya siswa bisa bermain game online di sekolah',
          'Agar siswa tidak perlu belajar mata pelajaran kejuruan lagi'
        ],
        answerIndex: 0,
        explanation: 'Informatika adalah keterampilan dasar abad ke-21 (transversal skills) yang menjadi pengungkit produktivitas di seluruh bidang profesi.'
      },
      {
        question: 'Sebutan bagi generasi muda yang lahir dan tumbuh di era teknologi digital serta terbiasa menggunakan gawai dan internet sejak usia dini adalah...',
        options: ['Digital Native', 'Digital Immigrant', 'Digital Nomad', 'Digital Hacker'],
        answerIndex: 0,
        explanation: 'Digital Native adalah generasi yang tumbuh berdampingan langsung dengan ekosistem digital sejak kecil.'
      },
      {
        question: 'Kemampuan individu untuk menemukan, mengevaluasi, menggunakan, membuat, dan mengomunikasikan informasi secara kritis dan beretika menggunakan teknologi digital disebut...',
        options: ['Literasi Digital (Digital Literacy)', 'Komputasi Awan', 'Enkripsi Data', 'Overclocking'],
        answerIndex: 0,
        explanation: 'Literasi digital mencakup kecakapan teknis, berpikir kritis, keamanan, dan etika bermedia digital.'
      }
    ],
    asesmenUraian: [
      'Jelaskan mengapa pemahaman mengenai 8 pilar Informatika sangat penting bagi siswa SMK kejuruan non-TI!',
      'Uraikan analisis Anda terhadap studi kasus UMKM "Berkah Sari" dan berikan rekomendasi solusi berbasis teknologi informatika!',
      'Bagaimana pandangan Anda tentang peran etika dalam penggunaan teknologi di kalangan remaja saat ini?'
    ],
    rubrikPenilaian: [
      {
        kriteria: 'Kelengkapan Konsep',
        skor4: 'Menjelaskan konsep Informatika, TIK, dan 8 pilar secara utuh dan tepat tanpa kekeliruan.',
        skor3: 'Menjelaskan sebagian besar konsep dengan benar namun ada 1 poin yang kurang detail.',
        skor2: 'Hanya menyebutkan definisi dasar tanpa memahami perbedaan antar istilah.',
        skor1: 'Tidak mampu membedakan konsep Informatika dan TIK.'
      },
      {
        kriteria: 'Kontekstual Kejuruan',
        skor4: 'Memberikan contoh penerapan nyata yang sangat spesifik dan aplikatif pada bidang DKV/APHP.',
        skor3: 'Memberikan contoh penerapan yang relevan namun masih bersifat umum.',
        skor2: 'Contoh yang diberikan kurang relevan dengan bidang keahlian.',
        skor1: 'Tidak menyertakan contoh penerapan kejuruan sama sekali.'
      },
      {
        kriteria: 'Struktur dan Format Dokumen',
        skor4: 'Tugas disusun rapi, memenuhi struktur heading, format penamaan benar, dan diekspor ke PDF.',
        skor3: 'Tugas rapi namun ada kesalahan kecil dalam format penamaan file.',
        skor2: 'Tugas kurang rapi dan belum memenuhi struktur yang diminta.',
        skor1: 'Tidak mengumpulkan tugas dalam format yang ditentukan.'
      }
    ],
    glosarium: [
      { term: 'Informatika', definition: 'Ilmu yang mempelajari struktur, sifat, algoritma pemrosesan, dan interaksi sistem komputasi dalam mengolah data menjadi informasi.' },
      { term: 'TIK', definition: 'Teknologi Informasi dan Komunikasi; perangkat keras dan lunak untuk mengumpulkan, mengolah, dan mendistribusikan informasi.' },
      { term: 'Kurikulum Merdeka Fase E', definition: 'Tahapan capaian pembelajaran untuk siswa kelas X SMA/SMK di Indonesia.' },
      { term: 'Revolusi Industri 4.0', definition: 'Era integrasi otomatisasi, pertukaran data cerdas, IoT, cloud computing, dan AI dalam manufaktur dan bisnis.' },
      { term: 'HAKI', definition: 'Hak Atas Kekayaan Intelektual; perlindungan hukum atas karya cipta dan inovasi manusia.' }
    ],
    sumberReferensi: [
      'Keputusan Kepala BSKAP Kemendikbudristek No. 046/H/KR/2025 tentang Capaian Pembelajaran Informatika Fase E.',
      'Kemendikbudristek (2021). Buku Siswa Informatika Kelas X SMA/SMK. Pusat Kurikulum dan Perbukuan.',
      'Wing, J. M. (2006). Computational Thinking. Communications of the ACM, 49(3), 33-35.',
      'Undang-Undang Republik Indonesia Nomor 1 Tahun 2024 tentang Perubahan Kedua atas UU ITE No. 11 Tahun 2008.',
      'Undang-Undang Republik Indonesia Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP).'
    ]
  },

  // =========================================================================
  // BAB 11: PRODUKTIVITAS DIGITAL
  // =========================================================================
  {
    id: 'TIK-2',
    elementId: 'TIK',
    elementName: 'Teknologi Informasi dan Komunikasi',
    moduleNumber: 2,
    bab: 'BAB 11 — Produktivitas Digital',
    pertemuan: 11,
    fase: 'Fase E (Kelas X SMK)',
    title: 'Aplikasi Pengolah Kata, Lembar Sebar, dan Presentasi Tingkat Lanjut',
    estimatedTimeMinutes: 90,
    difficulty: 'Menengah',
    competencies: [
      'Mengoperasikan pengolah kata secara profesional dengan struktur heading bertingkat, daftar isi otomatis, nomor halaman berbeda, dan sitasi referensi',
      'Menguasai formula spreadsheet statistik (SUM, AVERAGE, MIN, MAX, COUNT) dan logika (IF tunggal & bertingkat)',
      'Mengolah dan menyajikan data melalui Sort, Filter, Conditional Formatting, dan grafik visual interaktif',
      'Merancang presentasi efektif dengan prinsip hierarki visual, kontras warna 60-30-10, tipografi terbaca, dan minim teks'
    ],
    objectives: [
      'Siswa mampu menyusun laporan resmi kejuruan dengan format rapi, penomoran halaman Romawi/Angka terpisah, dan Table of Contents otomatis',
      'Siswa dapat menyusun buku kerja spreadsheet yang secara otomatis menghitung rekap nilai, kelulusan KKM, dan grafik batang/garis',
      'Siswa mampu membuat dokumen massal via Mail Merge dan mengekspor dokumen ke format standar PDF/A',
      'Siswa mampu mendesain dan mendemonstrasikan slide presentasi proyek yang memukau audiens'
    ],
    summary: 'Panduan lengkap penguasaan aplikasi perkantoran: penyusunan dokumen terstruktur di Word/Docs, analisis formula dan visualisasi data di Excel/Sheets, serta perancangan slide presentasi profesional di PowerPoint/Slides.',
    infographicHighlights: [
      { label: 'Word Processing', text: 'Styles, Heading 1/2/3, Section Break, Sitasi & Daftar Isi otomatis.', icon: 'FileText' },
      { label: 'Spreadsheet Formula', text: 'Fungsi statistik dan logika IF untuk otomasi kalkulasi data.', icon: 'Table' },
      { label: 'Data Visual', text: 'Sort, Filter, Conditional Formatting, dan Chart interaktif.', icon: 'BarChart' },
      { label: 'Presentasi Memikat', text: 'Struktur slide bervisual kuat, aturan 60-30-10, dan animasi subtil.', icon: 'Tv' }
    ],
    pertanyaanPemantik: [
      'Mengapa membuat daftar isi secara manual dengan mengetik titik-titik selalu berantakan ketika dokumen dicetak?',
      'Bagaimana sebuah sekolah dapat menentukan predikat kelulusan ribuan siswa dalam 1 detik menggunakan spreadsheet?',
      'Apa yang membedakan presentasi seorang profesional dengan presentasi amatir yang membuat audiens bosan?'
    ],
    pendahuluan: `Kemampuan mengoperasikan perangkat lunak produktivitas (*Office Productivity Tools*) seperti Microsoft 365, Google Workspace, dan LibreOffice adalah kriteria mutlak yang dinilai oleh perusahaan saat merekrut tenaga kerja baru.

Banyak orang merasa sudah bisa mengetik di Microsoft Word atau membuat tabel di Excel, namun mereka masih melakukan semuanya secara manual: mengetik titik-titik daftar isi dengan spasi, menghitung rata-rata menggunakan kalkulator smartphone lalu mengetiknya ulang ke Excel, atau membuat slide presentasi dengan menyalin seluruh paragraf skripsi ke dalam slide.

Modul ini akan mengubah cara kerjamu menjadi seorang profesional yang efisien, terstruktur, dan menguasai otomatisasi dokumen digital.`,
    konsepInti: `1. **Pengolah Kata (Word/Docs)**: Heading Styles (H1, H2, H3), Section Breaks untuk nomor halaman ganjil/genap & Romawi-Angka, Mail Merge, dan ekspor PDF.
2. **Pengolah Angka (Excel/Sheets)**: Cell referencing (Relatif vs Absolut $), formula statistik (SUM, AVERAGE, MIN, MAX, COUNT), logika (=IF(kondisi, benar, salah)), Sort & Filter data.
3. **Presentasi Visual (PowerPoint/Slides)**: Storytelling struktur Problem-Solution-Action, prinsip tipografi, rasio warna 60-30-10, dan teknik public speaking modern.`,
    contentMarkdown: `# BAB 11 — Produktivitas Digital

## 1. Pengolah Kata (*Word Processing*) Tingkat Lanjut

Dokumen resmi seperti Laporan Praktik Kerja Lapangan (PKL), proposal bisnis, dan karya ilmiah memerlukan struktur terstandarisasi.

\`\`\`text
+-------------------------------------------------------------------------------+
|                       STRUKTUR DOKUMEN BERSIFAT RESMI                         |
+-------------------------------------------------------------------------------+
| 1. HALAMAN JUDUL & PENGANTAR   --> Nomor Halaman Romawi Kecil (i, ii, iii)    |
|    [SECTION BREAK: NEXT PAGE]                                                 |
| 2. BAB 1 S.D. BAB PENUTUP      --> Nomor Halaman Angka Arab (1, 2, 3...)      |
| 3. DAFTAR ISI OTOMATIS         --> Terhubung dengan Heading 1, 2, dan 3       |
+-------------------------------------------------------------------------------+
\`\`\`

### A. Format Teks, Paragraf, dan Heading Styles
* **Heading 1**: Untuk Judul Bab Utama (contoh: \`BAB 1 PENDAHULUAN\`).
* **Heading 2**: Untuk Sub-bab (contoh: \`1.1 Latar Belakang Masalah\`).
* **Heading 3**: Untuk Anak Sub-bab (contoh: \`1.1.1 Ruang Lingkup\`).
* **Keuntungan**: Daftar isi (*Table of Contents*) dapat digenerate dan diperbarui otomatis hanya dalam 1 klik (*Update Field*).

### B. Pemisahan Halaman (*Section Break*)
Untuk membedakan nomor halaman Romawi di kata pengantar dan nomor halaman angka di bab isi:
1. Letakkan kursor di akhir halaman Daftar Isi.
2. Pilih menu **Layout → Breaks → Section Breaks (Next Page)**.
3. Buka header/footer di Bab 1, nonaktifkan opsi **Link to Previous**.
4. Format nomor halaman menjadi angka \`1\` via menu **Page Number → Format Page Numbers → Start at 1**.

### C. Kolaborasi & Ekspor PDF
* Gunakan fitur **Review → Track Changes / Suggestion Mode** saat mengoreksi dokumen bersama rekan tim.
* Simpan dokumen akhir dalam format **PDF/A** untuk menjamin tata letak dan font tidak berubah saat dibuka di komputer lain.

---

## 2. Pengolah Angka (*Spreadsheet*) & Analisis Formula

Spreadsheet mengorganisasikan data dalam sel yang terbentuk dari pertemuan kolom (huruf A, B, C...) dan baris (angka 1, 2, 3...).

\`\`\`text
+-------+--------------------+-----------+------------+------------+---------------+
|   A   |         B          |     C     |     D      |     E      |       F       |
+-------+--------------------+-----------+------------+------------+---------------+
| 1     | NAMA SISWA         | NILAI UH1 | NILAI UH2  | RATA-RATA  | KETERANGAN    |
| 2     | Ahmad Fauzi        | 85        | 90         | =AVERAGE.. | =IF(E2>=75..  |
| 3     | Budi Pratama       | 70        | 72         | =AVERAGE.. | =IF(E3>=75..  |
+-------+--------------------+-----------+------------+------------+---------------+
\`\`\`

### A. Formula Statistik Dasar
* \`=SUM(C2:C30)\`: Menghitung total penjumlahan angka dari sel C2 sampai C30.
* \`=AVERAGE(C2:C30)\`: Menghitung nilai rata-rata (*mean*).
* \`=MIN(C2:C30)\`: Menampilkan nilai terkecil/minimum.
* \`=MAX(C2:C30)\`: Menampilkan nilai terbesar/maksimum.
* \`=COUNT(C2:C30)\`: Menghitung jumlah sel yang berisi data angka numerik.
* \`=COUNTA(B2:B30)\`: Menghitung jumlah sel yang tidak kosong (termasuk teks).

### B. Referensi Sel Relatif vs Absolut ($)
* **Relatif (\`A1\`)**: Alamat sel akan bergeser saat formula di-copy ke baris/kolom lain.
* **Absolut (\`$A$1\`)**: Alamat sel terkunci mati pada kolom A dan baris 1 (tekan tombol \`F4\` saat mengetik rumus). Sangat penting untuk perhitungan PPN atau kurs tetap.

### C. Fungsi Logika IF
* **IF Tunggal**: \`=IF(E2>=75; "TUNTAS"; "REMEDIAL")\`
* **IF Bertingkat (Nested IF)**:
  \`\`\`excel
  =IF(E2>=85; "A"; IF(E2>=75; "B"; IF(E2>=60; "C"; "D")))
  \`\`\`

### D. Fitur Sort, Filter, dan Conditional Formatting
* **Sort**: Mengurutkan data (A ke Z atau nilai tertinggi ke terendah).
* **Filter**: Menyaring data berdasarkan kriteria tertentu (misal: hanya menampilkan siswa yang "REMEDIAL").
* **Conditional Formatting**: Memberi warna otomatis (misal: warna merah muda untuk nilai di bawah KKM 75).

---

## 3. Aplikasi Presentasi (*Presentation*) Efektif

Presentasi yang memukau bertujuan menyampaikan gagasan dengan ringkas dan persuasif, bukan membaca slide teks panjang.

\`\`\`text
+-------------------------------------------------------------------------------+
|                       PRINSIP DESAIN SLIDE PROFESIONAL                        |
+---------------------+-------------------------+-------------------------------+
| 1. HIERARKI VISUAL  | 2. FORMULA WARNA 60-30-10| 3. MAKSIMAL 2 FONT            |
| Judul tebal & besar | 60% Warna Netral (Latar)| 1 Font Display untuk Judul    |
| Poin kunci singkat  | 30% Warna Sekunder (Card)| 1 Font Sans-Serif untuk Body  |
| Gunakan ikon/foto   | 10% Warna Aksen (Tombol)| Jangan gunakan font dekoratif |
+---------------------+-------------------------+-------------------------------+
\`\`\`

### Aturan Emas Presentasi:
1. **Aturan 6x6**: Maksimal 6 baris per slide dan maksimal 6 kata per baris.
2. **Kekuatan Visual**: Gantikan paragraf panjang dengan infografis, diagram alur, atau ilustrasi berkualitas tinggi.
3. **Animasi Efektif**: Gunakan transisi sederhana (*Fade* atau *Morph*). Hindari animasi teks terbang yang berputar-putar karena mengalihkan fokus audiens.`,
    contohPenerapan: `1. **Otomatisasi Sertifikat di Word**: Menggunakan Mail Merge yang menghubungkan data nilai 200 siswa dari Excel ke template sertifikat Word, mencetak 200 sertifikat unik dalam waktu 30 detik.
2. **Laporan Penjualan Produk APHP di Excel**: Membuat tabel rekapitulasi penjualan sari apel dengan conditional formatting warna hijau untuk penjualan melebihi target dan grafik pie chart untuk melihat kontributor rasa terlaris.
3. **Presentasi Pitching DKV di PowerPoint**: Membuat 5 slide presentasi konsep logo brand kopi lokal dengan layout minimalis dan rasio kontras tinggi yang sukses memikat klien.`,
    studiKasus: `**Studi Kasus: Laporan Keuangan Bazar Sekolah yang Amburadul**

Panitia bazar kewirausahaan SMK mengumpulkan data transaksi dari 8 stan dalam bentuk catatan kertas kusut. Total uang tunai yang terkumpul tidak cocok dengan jumlah barang yang terjual.
Ketua panitia meminta tim dokumentasi membuat sistem rekapitulasi digital berbasis spreadsheet yang memiliki:
1. Validasi input agar tidak ada data harga yang salah ketik.
2. Rumus otomatis penghitungan total omzet, biaya modal bahan, dan laba bersih per stan.
3. Grafik perbandingan laba antar stan.`,
    aktivitasSiswa: `**Praktik Lab Mandiri: Master Spreadsheet Nilai**
1. Buka aplikasi Google Sheets atau Microsoft Excel.
2. Buat tabel berisi 10 nama siswa dengan 3 kolom nilai (Tugas, UTS, UAS).
3. Gunakan formula \`=AVERAGE\` untuk mencari nilai akhir dengan bobot (30% Tugas + 30% UTS + 40% UAS).
4. Gunakan fungsi \`=IF\` untuk menentukan kelulusan (KKM = 75).
5. Buat grafik batang (*Column Chart*) yang menampilkan perbandingan nilai akhir seluruh siswa!`,
    tipsPraktis: [
      'Gunakan shortcut keyboard untuk efisiensi: Ctrl+C (Copy), Ctrl+V (Paste), Ctrl+Z (Undo), Ctrl+F (Find), dan F4 (Kunci Sel Absolut).',
      'Selalu atur Format Cells (misal: Currency Rp untuk uang, Percentage % untuk diskon) agar angka terbaca rapi.',
      'Saat membuat presentasi, fokuslah pada 1 pesan kunci per slide.'
    ],
    kesalahanUmum: [
      'Membuat daftar isi dengan menekan tombol titik secara manual berkali-kali.',
      'Mengetik angka hasil kalkulasi manual ke dalam spreadsheet alih-alih menggunakan formula.',
      'Menumpuk seluruh teks makalah ke dalam slide presentasi dan membacanya kata demi kata.'
    ],
    rangkuman: `• Pengolah kata tingkat lanjut memanfaatkan Heading Styles untuk otomatisasi daftar isi dan Section Break untuk nomor halaman bertingkat.
• Spreadsheet mengotomasi kalkulasi data melalui formula statistik (SUM, AVERAGE, MIN, MAX) dan logika (IF) dengan referensi sel relatif/absolut.
• Visualisasi data (chart, sort, filter, conditional formatting) mempermudah interpretasi informasi secara cepat.
• Slide presentasi yang efektif berfokus pada hierarki visual yang bersih, aturan warna 60-30-10, dan kekuatan ilustrasi ringkas.`,
    refleksi: [
      'Fitur otomatisasi apa di Word atau Excel yang paling menghemat waktumu selama ini?',
      'Bagaimana kamu akan memperbaiki cara membuat slide presentasimu agar lebih menarik di masa depan?'
    ],
    latihanPemahaman: [
      '1. Jelaskan fungsi Heading 1, 2, dan 3 dalam pembuatan dokumen resmi di Microsoft Word!',
      '2. Kapan kita wajib menggunakan tanda dolar ($) pada alamat sel formula spreadsheet? Berikan contohnya!',
      '3. Tuliskan rumus formula Excel untuk menentukan apakah seorang siswa mendapatkan predikat "LULUS" jika nilai rata-rata di sel D5 >= 75 dan "REMEDIAL" jika sebaliknya!',
      '4. Sebutkan 3 prinsip desain utama dalam membuat slide presentasi profesional!'
    ],
    tugasPraktik: `**Tugas Praktik: Rekapitulasi & Visualisasi Data Produksi**
Buatlah buku kerja spreadsheet (.xlsx) dan dokumen laporan ringkas (.pdf) yang berisi:
1. Tabel data produksi 10 produk dengan kolom (Nama Produk, Jumlah Produksi, Biaya Satuan, Harga Jual, Total Modal, Total Pendapatan, Laba Bersih).
2. Perhitungan formula otomatis (\`SUM\`, \`AVERAGE\`, dan \`IF\`).
3. Grafik batang visualisasi laba.
4. Simpan dan kumpulkan berkas spreadsheet ke portal tugas!`,
    asesmen: [
      {
        question: 'Fitur pada pengolah kata yang digunakan untuk membuat daftar isi secara otomatis berdasarkan struktur judul bab dan sub-bab adalah...',
        options: ['Table of Contents yang terhubung dengan Heading Styles', 'Mail Merge terintegrasi', 'Page Break bertingkat', 'WordArt dan SmartArt'],
        answerIndex: 0,
        explanation: 'Table of Contents membaca struktur dokumen yang telah diformat menggunakan Heading 1, Heading 2, dan Heading 3.'
      },
      {
        question: 'Formula spreadsheet yang tepat untuk menghitung nilai rata-rata dari sel C2 sampai C15 adalah...',
        options: ['=AVERAGE(C2:C15)', '=SUM(C2:C15)', '=MEAN(C2:C15)', '=COUNT(C2:C15)'],
        answerIndex: 0,
        explanation: '=AVERAGE() adalah fungsi standar spreadsheet untuk menghitung nilai rata-rata data numerik.'
      },
      {
        question: 'Tujuan penambahan simbol dolar ($) pada alamat sel seperti $A$1 adalah...',
        options: [
          'Mengunci alamat sel agar menjadi absolut dan tidak bergeser saat formula disalin ke sel lain',
          'Mengubah format angka menjadi mata uang Dollar Amerika',
          'Menghapus isi sel secara otomatis',
          'Membuat sel berkedip pada lembar kerja'
        ],
        answerIndex: 0,
        explanation: 'Simbol $ membuat referensi sel menjadi absolut (terkunci), baik pada kolom maupun baris.'
      },
      {
        question: 'Prinsip rasio warna 60-30-10 dalam desain slide presentasi yang benar adalah...',
        options: [
          '60% warna dominan netral, 30% warna sekunder pendukung, 10% warna aksen penegas',
          '60% warna merah, 30% warna hijau, 10% warna kuning',
          '60 foto, 30 paragraf, 10 judul',
          '60 menit presentasi, 30 menit tanya jawab, 10 menit istirahat'
        ],
        answerIndex: 0,
        explanation: 'Rasio 60-30-10 adalah panduan proporsi palet warna profesional: 60% warna dasar/latar, 30% warna komponen sekunder, dan 10% warna aksen untuk fokus perhatian.'
      },
      {
        question: 'Untuk menyaring data siswa yang hanya berasal dari kelas "X DKV 1", fitur spreadsheet yang digunakan adalah...',
        options: ['Filter', 'Sort Ascending', 'Conditional Formatting', 'Merge Cells'],
        answerIndex: 0,
        explanation: 'Fitur Filter digunakan untuk menampilkan baris data yang memenuhi kriteria tertentu dan menyembunyikan yang lainnya.'
      },
      {
        question: 'Fitur pada pengolah kata yang digunakan untuk membuat dokumen massal seperti surat undangan atau sertifikat dengan data nama berbeda yang diambil dari tabel Excel adalah...',
        options: ['Mail Merge', 'Track Changes', 'Drop Cap', 'Macro Visual Basic'],
        answerIndex: 0,
        explanation: 'Mail Merge menggabungkan template dokumen master dengan sumber data tabular untuk mencetak dokumen massal personal.'
      },
      {
        question: 'Fitur yang membagi dokumen menjadi beberapa bagian terpisah agar nomor halaman romawi (i, ii) dan angka (1, 2) dapat diterapkan dalam satu file yang sama adalah...',
        options: ['Section Break (Next Page)', 'Page Break Biasa', 'Line Break', 'Column Break'],
        answerIndex: 0,
        explanation: 'Section Break memutus hubungan format header/footer antar bagian dokumen sehingga format nomor halaman bisa berbeda.'
      },
      {
        question: 'Formula logika yang tepat jika siswa dinyatakan "Lulus" saat nilai di sel D5 >= 75 dan "Remedial" jika di bawah 75 adalah...',
        options: [
          '=IF(D5>=75, "Lulus", "Remedial")',
          '=IF(D5<75, "Lulus", "Remedial")',
          '=COUNTIF(D5>=75, "Lulus")',
          '=SUMIF(D5>=75, "Lulus")'
        ],
        answerIndex: 0,
        explanation: 'Sintaks fungsi IF: =IF(tes_logika, nilai_jika_benar, nilai_jika_salah).'
      },
      {
        question: 'Fungsi spreadsheet yang digunakan untuk mencari data harga barang pada tabel referensi vertikal berdasarkan kode barang adalah...',
        options: ['VLOOKUP / XLOOKUP', 'HLOOKUP', 'CONCATENATE', 'TRANSPOSE'],
        answerIndex: 0,
        explanation: 'VLOOKUP (Vertical Lookup) mencari nilai kunci di kolom paling kiri dan mengambil nilai pada kolom indeks terkait.'
      },
      {
        question: 'Fitur spreadsheet yang secara otomatis mengubah warna latar sel menjadi merah muda jika nilai siswa di bawah KKM (<75) adalah...',
        options: ['Conditional Formatting', 'Data Validation', 'Pivot Table', 'Format Painter'],
        answerIndex: 0,
        explanation: 'Conditional Formatting menerapkan gaya visual dinamis berdasarkan aturan kondisi nilai sel.'
      },
      {
        question: 'Fitur spreadsheet yang membatasi input pengguna hanya bisa memilih opsi tertentu dari daftar menu dropdown (misal: "Hadir", "Izin", "Sakit") adalah...',
        options: ['Data Validation (List)', 'Conditional Formatting', 'Consolidate', 'Goal Seek'],
        answerIndex: 0,
        explanation: 'Data Validation mencegah kesalahan ketik (human error) dengan membatasi nilai yang boleh dimasukkan ke dalam sel.'
      },
      {
        question: 'Alat bantu spreadsheet interaktif yang sangat ampuh untuk meringkas, mengelompokkan, dan menganalisis ribuan baris data transaksi penjualan secara dinamis adalah...',
        options: ['Pivot Table', 'AutoSum', 'Format Cells', 'Text to Columns'],
        answerIndex: 0,
        explanation: 'Pivot Table menyajikan rekapitulasi data multidimensi secara instan tanpa perlu menulis rumus manual yang rumit.'
      },
      {
        question: 'Perbedaan fungsi COUNT dan COUNTA dalam spreadsheet adalah...',
        options: [
          'COUNT hanya menghitung jumlah sel yang berisi angka numerik, sedangkan COUNTA menghitung semua sel yang tidak kosong (angka maupun teks)',
          'COUNT menjumlahkan nilai, sedangkan COUNTA menghitung rata-rata',
          'COUNT untuk data teks, COUNTA untuk data angka',
          'Keduanya sama persis tanpa perbedaan'
        ],
        answerIndex: 0,
        explanation: 'COUNT menghitung sel numerik, sedangkan COUNTA (Count All) menghitung setiap sel terisi karakter apa pun.'
      },
      {
        question: 'Dalam aplikasi presentasi, fitur master slide (Slide Master) digunakan untuk...',
        options: [
          'Mengatur tema, logo, jenis font, dan tata letak dasar yang akan diterapkan secara seragam ke seluruh slide presentasi',
          'Memutar video secara otomatis',
          'Merekam suara presenter',
          'Menghapus seluruh animasi'
        ],
        answerIndex: 0,
        explanation: 'Slide Master memastikan konsistensi visual di seluruh slide presentasi dengan satu kali pengaturan template induk.'
      },
      {
        question: 'Formula untuk menggabungkan teks nama depan di sel A2 dan nama belakang di sel B2 dengan spasi pemisah adalah...',
        options: ['=A2 & " " & B2 atau =CONCAT(A2, " ", B2)', '=A2 + B2', '=SUM(A2, B2)', '=MERGE(A2:B2)'],
        answerIndex: 0,
        explanation: 'Operator ampersand (&) atau fungsi CONCATENATE/CONCAT digunakan untuk menggabungkan string teks.'
      },
      {
        question: 'Fitur "Track Changes" pada aplikasi pengolah kata sangat berguna saat...',
        options: [
          'Melakukan kolaborasi penyuntingan naskah sehingga setiap perubahan, penambahan, dan penghapusan teks terekam jelas untuk disetujui atau ditolak',
          'Mencetak dokumen ke mesin printer',
          'Mengubah format font menjadi tebal',
          'Menyimpan file ke format ZIP'
        ],
        answerIndex: 0,
        explanation: 'Track Changes merekam riwayat revisi editorial antar penulis dan peninjau naskah.'
      },
      {
        question: 'Jenis grafik yang paling tepat digunakan untuk memperlihatkan tren kenaikan atau penurunan omset penjualan produk pangan setiap bulan selama 1 tahun adalah...',
        options: ['Grafik Garis (Line Chart)', 'Grafik Lingkaran (Pie Chart)', 'Grafik Radar', 'Scatter Plot'],
        answerIndex: 0,
        explanation: 'Line chart paling efektif untuk memvisualisasikan data runtun waktu (time series data) dan tren perubahan.'
      },
      {
        question: 'Jenis grafik yang paling tepat untuk memvisualisasikan persentase proporsi pangsa pasar dari 4 varian rasa produk olahan pangan adalah...',
        options: ['Grafik Lingkaran / Donat (Pie/Doughnut Chart)', 'Grafik Batang Bertingkat', 'Histogram', 'Grafik Area'],
        answerIndex: 0,
        explanation: 'Pie chart ideal untuk menunjukkan kontribusi proporsional tiap bagian terhadap total 100%.'
      },
      {
        question: 'Pesan error "#DIV/0!" pada sel formula spreadsheet mengindikasikan bahwa...',
        options: [
          'Formula mencoba membagi suatu bilangan dengan angka nol (0) atau sel yang kosong',
          'Teks formula salah ketik nama fungsinya',
          'Kolom kurang lebar untuk menampilkan angka',
          'Data yang dicari tidak ditemukan'
        ],
        answerIndex: 0,
        explanation: '#DIV/0! (Division by Zero) terjadi saat operasi matematika membagi dengan nol yang tidak terdefinisi.'
      },
      {
        question: 'Pesan tampilan "#####" pada sel spreadsheet berarti...',
        options: [
          'Lebar kolom tidak cukup untuk menampilkan format angka numerik atau tanggal secara penuh',
          'Sel terkena virus berbahaya',
          'Rumus matematika salah fatal',
          'Data di dalam sel telah terhapus permanen'
        ],
        answerIndex: 0,
        explanation: 'Simbol pagar (#####) muncul karena kolom terlalu sempit; solusinya cukup lebarkan kolom sel tersebut.'
      },
      {
        question: 'Pesan error "#N/A" pada rumus VLOOKUP mengindikasikan bahwa...',
        options: [
          'Nilai kunci pencarian (lookup value) tidak ditemukan di dalam rentang tabel referensi',
          'Komputer kehabisan memori RAM',
          'Format angka belum diubah ke rupiah',
          'File Excel belum disimpan'
        ],
        answerIndex: 0,
        explanation: '#N/A (Not Available) menandakan data yang dicari memang tidak ada di tabel rujukan.'
      },
      {
        question: 'Kombinasi tombol pintas (shortcut) keyboard standar untuk mencari dan mengganti kata (Find and Replace) pada dokumen adalah...',
        options: ['Ctrl + H', 'Ctrl + S', 'Ctrl + P', 'Ctrl + C'],
        answerIndex: 0,
        explanation: 'Ctrl + H adalah tombol pintas universal untuk membuka jendela Find and Replace di aplikasi perkantoran.'
      },
      {
        question: 'Fungsi spreadsheet yang digunakan untuk menghitung total nominal uang hanya dari transaksi dengan kategori "Makanan" adalah...',
        options: ['=SUMIF()', '=COUNTIF()', '=AVERAGE()', '=MAX()'],
        answerIndex: 0,
        explanation: '=SUMIF(range_kriteria, "Makanan", sum_range) menjumlahkan nilai numerik hanya pada baris yang memenuhi kriteria tertentu.'
      },
      {
        question: 'Format berkas standar pertukaran data tabular sederhana antar aplikasi berbasis teks dengan pemisah koma atau titik koma adalah...',
        options: ['CSV (.csv)', 'EXE (.exe)', 'MP4 (.mp4)', 'PSD (.psd)'],
        answerIndex: 0,
        explanation: 'CSV (Comma Separated Values) adalah format teks universal untuk mentransfer data tabel antar-sistem database.'
      },
      {
        question: 'Dalam integrasi dokumen, fitur OLE (Object Linking and Embedding) memungkinkan kita untuk...',
        options: [
          'Menyematkan tabel atau grafik Excel ke dalam Microsoft Word yang datanya otomatis terupdate saat file Excel diedit',
          'Mengunduh aplikasi baru dari internet',
          'Mengganti kartu grafis secara otomatis',
          'Mengirim email tanpa kuota'
        ],
        answerIndex: 0,
        explanation: 'OLE menautkan objek dari aplikasi sumber sehingga perubahan data di file sumber langsung tersinkronisasi di dokumen tujuan.'
      },
      {
        question: 'Fungsi logika spreadsheet yang mengembalikan nilai TRUE HANYA JIKA SEMUA kondisi pengujian bernilai benar adalah...',
        options: ['AND', 'OR', 'NOT', 'XOR'],
        answerIndex: 0,
        explanation: 'Fungsi AND mensyaratkan semua kriteria terpenuhi untuk menghasilkan output TRUE.'
      },
      {
        question: 'Fungsi logika spreadsheet yang mengembalikan nilai TRUE jika MINIMAL SALAH SATU kondisi pengujian bernilai benar adalah...',
        options: ['OR', 'AND', 'NOT', 'NAND'],
        answerIndex: 0,
        explanation: 'Fungsi OR menghasilkan TRUE jika salah satu saja syarat kondisi terpenuhi.'
      },
      {
        question: 'Fitur "Drop Cap" pada Microsoft Word digunakan untuk...',
        options: [
          'Membuat huruf pertama pada awal paragraf berukuran besar melingkupi 2 atau 3 baris teks layaknya artikel majalah/koran',
          'Menghapus huruf kapital',
          'Membuat tanda tangan digital',
          'Memutar teks 90 derajat'
        ],
        answerIndex: 0,
        explanation: 'Drop Cap adalah gaya tipografi klasik yang memperbesar huruf inisial paragraf pembuka.'
      },
      {
        question: 'Formula spreadsheet untuk membulatkan angka 15789.678 menjadi 2 angka desimal di belakang koma adalah...',
        options: ['=ROUND(15789.678, 2)', '=INT(15789.678)', '=FLOOR(15789.678)', '=TRUNC(15789.678, 0)'],
        answerIndex: 0,
        explanation: 'Fungsi ROUND(angka, jumlah_digit) membulatkan bilangan ke jumlah desimal yang diinginkan sesuai kaidah matematika.'
      },
      {
        question: 'Mengapa keahlian otomasi dokumen dan analisis spreadsheet tingkat lanjut menjadi modal esensial bagi calon lulusan SMK?',
        options: [
          'Karena dunia industri modern menuntut efisiensi kerja cepat, akurasi laporan keuangan bebas salah, dan kemampuan menyajikan data keputusan bisnis secara profesional',
          'Hanya agar bisa mengetik cepat saat bermain game chat',
          'Supaya tidak perlu menggunakan mouse komputer',
          'Agar printer sekolah tidak pernah rusak'
        ],
        answerIndex: 0,
        explanation: 'Penguasaan otomasi perkantoran meningkatkan daya saing kerja dan efisiensi operasional di berbagai divisi perusahaan.'
      }
    ],
    asesmenUraian: [
      'Jelaskan langkah demi langkah membuat nomor halaman romawi di lembar pengantar dan angka di bab isi pada Microsoft Word!',
      'Uraikan bagaimana perpaduan fungsi IF dan Conditional Formatting dapat mempermudah guru dalam memetakan siswa yang butuh remedial!'
    ],
    rubrikPenilaian: [
      {
        kriteria: 'Kebenaran Formula Spreadsheet',
        skor4: 'Semua formula (SUM, AVERAGE, IF, sel absolut) ditulis tepat 100% tanpa error #VALUE/#REF.',
        skor3: 'Sebagian besar formula benar, terdapat 1 kesalahan kecil pada referensi sel.',
        skor2: 'Formula dasar bekerja tetapi fungsi logika IF belum tepat.',
        skor1: 'Tidak menggunakan formula (mengetik angka hasil hitung manual).'
      },
      {
        kriteria: 'Desain Visual & Kerapian',
        skor4: 'Tabel bergaris rapi, format angka jelas (Rp/% ), dan grafik representatif serta mudah dibaca.',
        skor3: 'Tabel rapi namun format angka belum konsisten.',
        skor2: 'Tabel belum diformat dengan baik dan grafik kurang jelas.',
        skor1: 'Tampilan acak-acakan tanpa format.'
      }
    ],
    glosarium: [
      { term: 'Heading Styles', definition: 'Format bawaan pengolah kata untuk menandai hierarki judul bab dan sub-bab.' },
      { term: 'Section Break', definition: 'Pemisah bagian dokumen agar memiliki pengaturan tata letak, margin, atau nomor halaman yang berbeda.' },
      { term: 'Cell Reference', definition: 'Alamat identitas sel dalam spreadsheet yang terdiri atas nama kolom dan nomor baris.' },
      { term: 'Conditional Formatting', definition: 'Pewarnaan otomatis sel berdasarkan aturan nilai logika yang ditentukan.' }
    ],
    sumberReferensi: [
      'Microsoft Office Documentation (2024). Excel Formulas and Functions Reference.',
      'Google Workspace Learning Center (2024). Docs and Sheets Advanced Training Guides.',
      'Reynolds, G. (2012). Presentation Zen: Simple Ideas on Presentation Design and Delivery. New Riders.'
    ]
  },

  // =========================================================================
  // BAB 12: INFORMATIKA UNTUK DUNIA KERJA DAN INDUSTRI
  // =========================================================================
  {
    id: 'TIK-3',
    elementId: 'TIK',
    elementName: 'Teknologi Informasi dan Komunikasi',
    moduleNumber: 3,
    bab: 'BAB 12 — Informatika untuk Dunia Kerja dan Industri',
    pertemuan: 13,
    fase: 'Fase E (Kelas X SMK)',
    title: 'Budaya Kerja Digital, Kolaborasi Cloud, dan Personal Branding Profesional',
    estimatedTimeMinutes: 90,
    difficulty: 'Menengah',
    competencies: [
      'Menerapkan budaya kerja digital modern (prinsip 5R/5S digital, etika komunikasi profesional via email & chat)',
      'Mengorganisasikan manajemen file perusahaan dan kontrol versi dokumen berstandar industri',
      'Mengoperasikan platform kolaborasi cloud (Google Drive/OneDrive) dengan pengaturan hak akses aman',
      'Menerapkan manajemen proyek sederhana dengan papan Kanban (Trello/Notion)',
      'Merancang portofolio digital, CV ATS-friendly, dan personal branding untuk persiapan magang/PKL'
    ],
    objectives: [
      'Siswa mampu menulis email bisnis formal dengan struktur subjek, salam, isi, lampiran terkompresi, dan signature profesional',
      'Siswa dapat menyusun struktur folder perusahaan yang terstandar dengan format penamaan file konsisten',
      'Siswa mampu mengelola tugas tim menggunakan papan Kanban digital secara kolaboratif',
      'Siswa mampu membuat profil CV digital berformat ATS-Friendly dan mempublikasikan portofolio karya online'
    ],
    summary: 'Kesiapan kerja digital bagi siswa SMK: etika komunikasi email/chat kantor, manajemen file & keamanan data perusahaan, kolaborasi tim di cloud, serta perancangan CV dan portofolio digital profesional.',
    infographicHighlights: [
      { label: 'Komunikasi Profesional', text: 'Struktur email bisnis formal & etika pesan instan kerja.', icon: 'Mail' },
      { label: 'Manajemen File 5R', text: 'Standar penamaan file, folder hierarkis, dan backup 3-2-1.', icon: 'Folder' },
      { label: 'Papan Kanban', text: 'Visualisasi alur kerja tim (To Do, In Progress, Review, Done).', icon: 'Trello' },
      { label: 'CV & Portofolio', text: 'CV standar ATS-Friendly & pameran karya digital siap magang.', icon: 'UserCheck' }
    ],
    pertanyaanPemantik: [
      'Mengapa mengirim email lamaran kerja tanpa subjek dan body text langsung dihapus oleh manajer HRD perusahaan?',
      'Apa bahayanya jika seorang karyawan menyimpan dokumen rahasia perusahaan di flashdisk bajakan yang sering dicolok sembarangan?',
      'Bagaimana sebuah portofolio digital yang menarik di LinkedIn atau GitHub bisa mendatangkan tawaran pekerjaan sebelum lulus SMK?'
    ],
    pendahuluan: `Lulusan Sekolah Menengah Kejuruan (SMK) disiapkan untuk langsung terjun ke Dunia Usaha dan Dunia Industri (DUDI) atau berwirausaha mandiri. Namun, di era digital saat ini, kemampuan teknis kejuruan saja tidak cukup jika tidak dibarengi dengan **keterampilan budaya kerja digital (*digital workplace culture*)**.

Perusahaan modern tidak lagi menggunakan surat kertas manual atau papan pengumuman fisik. Mereka berkomunikasi lewat email bisnis terenkripsi, berkolaborasi real-time di cloud storage, memantau kemajuan proyek dengan Kanban board, dan merekrut karyawan melalui sistem pelacak CV digital (ATS).

Modul ini adalah jembatan emas yang mempersiapkanmu bertransformasi dari siswa sekolah menjadi tenaga kerja digital yang profesional dan beretika tinggi.`,
    konsepInti: `1. **Komunikasi Bisnis**: Anatomi email formal (Subjek jelas, Salam hormat, Body padat, Call-to-action, Signature resmi) dan netiket pesan kerja (Slack/WhatsApp Business).
2. **Manajemen Berkas 5R Digital**: Ringkas, Rapi, Resik, Rawat, Rajin dalam pengelolaan direktori komputer dan cloud storage.
3. **Standar Penamaan File**: \`[YYYYMMDD]_[KODE_PROYEK]_[NAMA_DOKUMEN]_[VERSI]\` (Hindari file bernama \`tugas_final_revisi_beneran_fix.docx\`).
4. **Keamanan Data & NDA**: Menjaga kerahasiaan data perusahaan (*Non-Disclosure Agreement*) dan hak akses kolaborasi (*Viewer, Commenter, Editor*).
5. **Personal Branding**: Pembuatan CV ATS-friendly dan website portofolio karya digital (Google Sites/GitHub/Behance).`,
    contentMarkdown: `# BAB 12 — Informatika untuk Dunia Kerja dan Industri

## 1. Komunikasi Profesional di Tempat Kerja

Komunikasi tertulis adalah cerminan profesionalisme seorang profesional.

\`\`\`text
+-------------------------------------------------------------------------------+
|                         ANATOMI EMAIL BISNIS PROFESIONAL                      |
+-------------------------------------------------------------------------------+
| KEPADA   : hrd@perusahaanmitra.co.id                                          |
| SUBJEK   : [LAMARAN PKL] Desainer Grafis - Ahmad Fauzi (SMKN Bojonggambir)    |
|                                                                               |
| SALAM    : Yth. Tim Rekrutmen PT Inovasi Digital Nusantara,                   |
| PEMBUKA  : Sehubungan dengan program PKL semester ganjil tahun 2026...        |
| ISI      : Bersama ini saya lampirkan CV dan Portofolio desain identitas...   |
| PENUTUP  : Besar harapan saya untuk dapat mendiskusikan kualifikasi saya...   |
|                                                                               |
| SIGNATURE: Hormat saya,                                                       |
|            Ahmad Fauzi | Siswa Kelas X DKV | Telp: 0812-xxxx-xxxx             |
|            Portofolio: be.net/ahmadfauzidesign                                |
+-------------------------------------------------------------------------------+
\`\`\`

### Etika Pesan Instan (WhatsApp / Slack Perusahaan):
1. **Perhatikan Waktu**: Kirim pesan pada jam kerja resmi (08.00 - 17.00 WIB).
2. **Hindari Pesan 'P' Tanpa Salam**: Selalu awali dengan salam, sebutkan nama, kelas/divisi, dan tujuan pesan secara ringkas dalam satu balon pesan utuh.
3. **Gunakan Bahasa Baku & Santun**: Hindari singkatan alay (*yg, tdk, gmn, bsk*) dalam komunikasi formal kantor.

---

## 2. Manajemen File Digital & Standar Penamaan Dokumen

Menerapkan budaya kerja industri **5R (Ringkas, Rapi, Resik, Rawat, Rajin)** pada sistem file:

\`\`\`text
D:/PROYEK_SMK/
├── 01_BRIEF_KLIEN/
│   └── 20260810_BRF_LogoKopiLokal_v1.0.pdf
├── 02_ASET_MENTAH/
│   ├── FOTO/
│   └── FONT/
├── 03_MASTER_DESIGN/
│   └── 20260815_DSN_PackagingKopi_v1.2.psd
└── 04_OUTPUT_FINAL/
    └── 20260820_FIN_PackagingKopi_PrintReady_v2.0.pdf
\`\`\`

### Rumus Standar Penamaan File:
\`[TANGGAL: YYYYMMDD]_[JENIS_DOKUMEN]_[NAMA_PROYEK]_[NOMOR_VERSI].[EKSTENSI]\`
* **Contoh Benar**: \`20260820_RPT_LaporanProduksi_v1.0.pdf\`
* **Contoh Salah**: \`laporan_baru_revisi_terbaru_final_fix_banget.pdf\`

---

## 3. Kolaborasi Cloud & Manajemen Hak Akses

Saat berbagi file di Google Drive, OneDrive, atau Dropbox, selalu atur hak akses (*Permission Level*) dengan tepat:
* **Viewer (Pelihat)**: Pengguna hanya bisa melihat dan membaca dokumen, tidak bisa mengedit atau menghapus. Cocok untuk dokumen publik/kebijakan kantor.
* **Commenter (Pemberi Komentar)**: Pengguna bisa memberikan catatan koreksi di samping teks tanpa mengubah isi asli. Cocok untuk proses review atasan.
* **Editor (Pengedit)**: Pengguna memiliki hak penuh mengubah isi file. Hanya berikan akses ini kepada rekan tim kerja langsung yang terpercaya.

---

## 4. Manajemen Proyek Tim: Papan Kanban

Kanban adalah metode visual untuk memonitor progres kerja secara transparan (digunakan di platform seperti Trello, Notion, atau Jira).

\`\`\`text
+-------------------+-------------------+-------------------+-------------------+
|    TO DO (4)      |  IN PROGRESS (2)  |   IN REVIEW (1)   |     DONE (8)      |
+-------------------+-------------------+-------------------+-------------------+
| • Riset kompetitor| • Desain label    | • Koreksi teks SOP| • Brief awal klien|
| • Beli bahan baku | • Uji lab brix    |                   | • Foto produk     |
+-------------------+-------------------+-------------------+-------------------+
\`\`\`

---

## 5. Personal Branding: CV ATS & Portofolio Digital

### A. Format CV ATS-Friendly
Sistem *Applicant Tracking System* (ATS) adalah robot perangkat lunak yang memindai ribuan CV pelamar kerja secara otomatis:
* Gunakan tata letak 1 kolom sederhana tanpa grafik tabel bertingkat yang rumit.
* Gunakan font standar yang mudah terbaca mesin (*Arial, Calibri, Helvetica*).
* Cantumkan kata kunci keahlian yang sesuai dengan kualifikasi lowongan (*hard skills & soft skills*).

### B. Portofolio Digital Karya
* **Siswa DKV**: Buat akun di Behance, Dribbble, atau Instagram profesional khusus pameran karya visual.
* **Siswa APHP/Bisnis**: Buat website mini di Google Sites atau portofolio PDF interaktif yang memuat dokumentasi produk olahan, uji rasa, dan sertifikat kompetensi.`,
    contohPenerapan: `1. **Komunikasi Magang Siswa SMK**: Siswa mengirimkan laporan mingguan PKL ke guru pembimbing melalui email resmi dengan lampiran laporan PDF terkompresi dan link folder Google Drive rekaman video kerja.
2. **Pemanfaatan Trello di Unit Produksi**: Tim siswa APHP membagi tugas produksi keripik jamur menjadi kartu-kartu tugas di Trello: pemotongan jamur, penggorengan, penirisan minyak, pengemasan, dan penempelan stiker label.
3. **Perekrutan Desainer DKV**: Seorang siswa kelas X mendapatkan tawaran proyek desain lepas (*freelance*) dari pengusaha kafe setelah melihat portofolio visualnya yang rapi di Behance.`,
    studiKasus: `**Studi Kasus: Kebocoran Data Desain Peluncuran Mobil Baru**

Seorang siswa magang di sebuah agensi periklanan mengambil foto draf desain poster mobil rahasia klien yang belum resmi diluncurkan, lalu mengunggahnya ke Instagram Story pribadinya dengan caption "Lagi ngerjain proyek keren nih!".
Dalam 1 jam, foto tersebut viral di media sosial. Klien membatalkan kontrak bernilai ratusan juta rupiah dan menuntut agensi secara hukum atas pelanggaran NDA (*Non-Disclosure Agreement*).

**Tugas Analisis**:
Jelaskan pelanggaran etika dan hukum apa yang dilakukan oleh siswa tersebut, serta bagaimana SOP pengamanan data digital seharusnya diterapkan di tempat kerja!`,
    aktivitasSiswa: `**Simulasi Dunia Kerja (Digital Career Lab)**:
1. Buat draf Curriculum Vitae (CV) ATS-Friendly pribadimu menggunakan Microsoft Word atau Google Docs (1 halaman).
2. Tuliskan satu draf email formal penawaran kerja sama jasa desain / produk olahan ke perusahaan mitra industri.
3. Tukarkan hasil draf emailmu dengan teman sebangkumu untuk saling memberikan koreksi (*peer review*)!`,
    tipsPraktis: [
      'Gunakan alamat email profesional dengan format nama asli (contoh: \`ahmad.fauzi@gmail.com\`, bukan \`ahmad_ganteng99@yahoo.com\`).',
      'Sebelum mengirim email atau membagikan link cloud, periksa kembali lampiran dan pastikan link dapat dibuka tanpa meminta login akun terbatas.',
      'Jaga reputasi jejak digital media sosialmu; banyak perusahaan mengecek riwayat postingan calon karyawan sebelum menerima magang.'
    ],
    kesalahanUmum: [
      'Menulis subjek email kosong (*no subject*) atau hanya menulis "Tugas".',
      'Menyimpan file kerja di desktop sembarangan dengan nama acak sehingga hilang saat komputer di-restart.',
      'Membagikan data rahasia proyek sekolah/industri ke media sosial publik tanpa izin tertulis.'
    ],
    rangkuman: `• Budaya kerja digital menuntut komunikasi profesional tertulis, etika pesan instan, dan kepatuhan waktu kerja.
• Manajemen file 5R dan rumus penamaan baku menjamin efisiensi penelusuran aset perusahaan.
• Pengelolaan hak akses cloud storage (Viewer, Commenter, Editor) mencegah kebocoran dan perusakan data kantor.
• Papan Kanban memvisualisasikan alur kerja tim secara transparan dan terukur.
• CV ATS-friendly dan portofolio digital adalah bekal utama membangun personal branding menuju dunia kerja.`,
    refleksi: [
      'Apakah cara komunikasimu selama ini ke guru atau teman sudah mencerminkan etika profesional?',
      'Karya apa yang sudah kamu buat dan layak dimasukkan ke dalam portofolio digital pertamamu?'
    ],
    latihanPemahaman: [
      '1. Uraikan 5 elemen utama dalam struktur penulisan email bisnis yang profesional!',
      '2. Tuliskan contoh penamaan file yang benar untuk dokumen laporan keuangan bazar sekolah revisi kedua tanggal 20 Agustus 2026!',
      '3. Apa perbedaan hak akses antara peran "Viewer", "Commenter", dan "Editor" pada Google Drive?',
      '4. Jelaskan apa yang dimaksud dengan CV ATS-Friendly dan mengapa hal tersebut penting di dunia kerja saat ini!'
    ],
    tugasPraktik: `**Tugas Praktik: Paket Lamaran Magang Digital**
Susunlah paket dokumen persiapan magang/PKL yang terdiri dari:
1. **CV Digital ATS-Friendly** (1 halaman PDF) dengan riwayat pendidikan, keahlian software, dan pengalaman organisasi/proyek.
2. **File Portofolio Karya Mini** (2-3 halaman) yang mendokumentasikan karya terbaikmu (desain logo, foto produk, olahan resep, atau laporan analisis).
3. Simpan dalam folder Google Drive, atur hak akses menjadi "Viewer", dan kirimkan linknya ke sistem LMS!`,
    asesmen: [
      {
        question: 'Penulisan subjek email lamaran magang yang paling profesional dan efektif adalah...',
        options: [
          '[LAMARAN PKL DKV] - Ahmad Fauzi - SMKN Bojonggambir',
          'Halo pak tolong dibaca ya penting banget',
          'Kirim berkas',
          'TUGAS SISWA BARU FINAL FIX'
        ],
        answerIndex: 0,
        explanation: 'Subjek email profesional harus memuat label tujuan yang jelas, nama pelamar, dan instansi pengirim agar mudah diarsipkan oleh HRD.'
      },
      {
        question: 'Format penamaan file kerja di komputer yang paling sesuai dengan standar industri 5R adalah...',
        options: [
          '20260820_DSN_LogoBrandKopi_v1.0.ai',
          'logo_baru_banget_fix.ai',
          'tugas_desain_kemarin(1).ai',
          'gambar.ai'
        ],
        answerIndex: 0,
        explanation: 'Format baku memuat tanggal (YYYYMMDD), kode jenis dokumen, nama proyek spesifik, dan versi file.'
      },
      {
        question: 'Ketika kita ingin atasan memeriksa dan memberi catatan koreksi pada dokumen kita tanpa mengubah teks asli, hak akses yang diberikan adalah...',
        options: ['Commenter', 'Viewer', 'Editor', 'Owner'],
        answerIndex: 0,
        explanation: 'Peran Commenter memungkinkan pengguna memberi catatan revisi di kolom komentar tanpa merusak teks utama.'
      },
      {
        question: 'Kolom alur kerja standar pada papan manajemen proyek Kanban adalah...',
        options: [
          'To Do → In Progress → Review → Done',
          'Start → Stop → Pause → Resume',
          'Input → Output → Storage → Power',
          'Word → Excel → PowerPoint → Access'
        ],
        answerIndex: 0,
        explanation: 'Alur kerja standar Kanban membagi tahapan menjadi rencana kerja (To Do), sedang dikerjakan (In Progress), peninjauan (Review), dan selesai (Done).'
      },
      {
        question: 'Perjanjian hukum tertulis antara karyawan/magang dan perusahaan untuk tidak membocorkan informasi rahasia ke pihak luar disebut...',
        options: [
          'NDA (Non-Disclosure Agreement)',
          'SOP (Standard Operating Procedure)',
          'CV (Curriculum Vitae)',
          'ATS (Applicant Tracking System)'
        ],
        answerIndex: 0,
        explanation: 'NDA adalah kontrak hukum kerahasiaan untuk melindungi rahasia dagang, formula, atau data privasi perusahaan.'
      },
      {
        question: 'Fungsi kolom BCC (Blind Carbon Copy) dalam pengiriman surat elektronik (email) adalah...',
        options: [
          'Mengirim salinan email ke penerima lain tanpa memperlihatkan alamat email tersebut kepada penerima utama',
          'Menghapus isi email secara otomatis setelah 24 jam',
          'Menerjemahkan email ke bahasa asing',
          'Mengirim pesan sebagai spam berulang-ulang'
        ],
        answerIndex: 0,
        explanation: 'BCC menjaga privasi daftar penerima tambahan agar tidak terlihat oleh penerima di kolom To dan CC.'
      },
      {
        question: 'Fungsi kolom CC (Carbon Copy) dalam email bisnis adalah...',
        options: [
          'Mengirim tembusan informasi kepada pihak terkait yang perlu mengetahui isi email meskipun bukan penerima tindakan utama',
          'Mengunci file lampiran dengan password',
          'Menghapus alamat email pengirim',
          'Mengganti subjek email menjadi huruf kapital'
        ],
        answerIndex: 0,
        explanation: 'CC digunakan sebagai tembusan koordinasi (FYI - For Your Information) kepada atasan atau rekan setim.'
      },
      {
        question: 'Format resume/CV yang dirancang sederhana dengan tata letak teks bersih agar mudah dipindai oleh mesin perangkat lunak penyaring kerja otomatis disebut...',
        options: ['CV ATS-Friendly', 'CV Desain 3D Animasi', 'CV Poster Infografis Penuh Warna', 'Buku Cerita Bergambar'],
        answerIndex: 0,
        explanation: 'CV ATS-Friendly menggunakan teks standar, font sistem, dan struktur jelas tanpa tabel rumit agar lolos filter ATS.'
      },
      {
        question: 'Bagian penutup email bisnis resmi yang memuat nama pengirim, jabatan/keahlian, nomor telepon kontak, dan tautan portofolio disebut...',
        options: ['Email Signature (Tanda Tangan Email)', 'Spam Filter', 'Header Dokumen', 'Lampiran Attachment'],
        answerIndex: 0,
        explanation: 'Email Signature mencerminkan kredibilitas dan identitas profesional pengirim dalam korespondensi formal.'
      },
      {
        question: 'Prinsip kerja 5R (Ringkas, Rapi, Resik, Rawat, Rajin) dalam konteks manajemen file komputer berarti...',
        options: [
          'Menghapus file sampah tak terpakai, menata direktori folder hierarkis, rutin membersihkan cache, merawat backup data, dan konsisten menaati aturan',
          'Membeli 5 harddisk eksternal setiap bulan',
          'Menginstal 5 sistem operasi sekaligus',
          'Mengganti nama pengguna komputer 5 kali sehari'
        ],
        answerIndex: 0,
        explanation: '5R digital menjaga lingkungan kerja virtual tetap bersih, teratur, cepat diakses, dan aman dari kehilangan data.'
      },
      {
        question: 'Fitur "Version History" pada Google Docs atau Microsoft 365 memungkinkan tim untuk...',
        options: [
          'Melihat riwayat perubahan dokumen dari waktu ke waktu dan mengembalikan file ke versi sebelum diedit jika terjadi kesalahan',
          'Mencetak file tanpa tinta',
          'Mengubah file Word menjadi video TikTok',
          'Mengunci laptop dari jarak jauh'
        ],
        answerIndex: 0,
        explanation: 'Version History mencatat setiap pengetikan pengguna beserta tanggal/waktu dan memungkinkan fitur restore ke versi masa lalu.'
      },
      {
        question: 'Etika pengiriman pesan instan kerja melalui WhatsApp Business atau Slack kepada pimpinan/klien yang tepat adalah...',
        options: [
          'Mengirim pesan pada jam kerja kantor, diawali salam hormat, menyebutkan identitas, dan menyampaikan maksud ringkas dalam satu balon pesan utuh',
          'Mengirim huruf "P" berkali-kali di tengah malam',
          'Mengirim stiker lelucon tanpa ada teks pesan',
          'Membuat panggilan telepon mendadak tanpa izin pesan terlebih dahulu'
        ],
        answerIndex: 0,
        explanation: 'Komunikasi profesional menghargai waktu penerima dan menyampaikan konteks secara terstruktur tanpa spam.'
      },
      {
        question: 'Hak akses Google Drive "Viewer" cocok diberikan kepada pihak yang...',
        options: [
          'Hanya perlu membaca atau mempelajari materi tanpa diberikan izin untuk mengubah atau mengomentari isi file',
          'Menjadi ketua tim proyek yang bertugas mengedit teks',
          'Supervisor yang bertugas memberikan kritik saran',
          'Pemilik akun pengelola server'
        ],
        answerIndex: 0,
        explanation: 'Viewer (Hanya Lihat) melindungi integritas dokumen master dari perubahan atau penghapusan yang tidak disengaja.'
      },
      {
        question: 'Platform media sosial profesional yang menjadi standar dunia untuk membangun personal branding, jejaring kerja karier, dan melamar lowongan kerja adalah...',
        options: ['LinkedIn', 'Snapchat', 'Roblox', 'Pinterest'],
        answerIndex: 0,
        explanation: 'LinkedIn adalah jejaring profesional nomor satu di dunia untuk portofolio karier dan rekrutmen industri.'
      },
      {
        question: 'Platform berbasis cloud yang populer digunakan oleh desainer grafis dan programmer untuk mempublikasikan portofolio karya kreatif secara online adalah...',
        options: ['Behance / GitHub', 'Steam', 'WhatsApp', 'Zoom'],
        answerIndex: 0,
        explanation: 'Behance (untuk desain/kreatif) dan GitHub (untuk kode pemrograman) adalah etalase portofolio industri terkemuka.'
      },
      {
        question: 'Konsep kerja "WFA (Work From Anywhere)" atau kerja jarak jauh berbasis digital mensyaratkan karyawan memiliki kompetensi...',
        options: [
          'Kemandirian tinggi, manajemen waktu disiplin, komunikasi asinkron yang efektif, dan penguasaan alat kolaborasi daring',
          'Kemampuan tidur sepanjang hari saat rapat daring',
          'Koneksi internet tanpa password pengaman sama sekali',
          'Menolak untuk membalas email tim'
        ],
        answerIndex: 0,
        explanation: 'Kerja jarak jauh menuntut akuntabilitas pribadi tinggi, integritas, dan penguasaan ekosistem digital terpadu.'
      },
      {
        question: 'Sistem perangkat lunak yang digunakan departemen HRD perusahaan besar untuk memindai ribuan berkas lamaran kerja secara otomatis disebut...',
        options: ['ATS (Applicant Tracking System)', 'GPS (Global Positioning System)', 'NFC (Near Field Communication)', 'BIOS System'],
        answerIndex: 0,
        explanation: 'ATS menyortir berkas pelamar secara otomatis berdasarkan kecocokan kata kunci (keywords) keterampilan pada lowongan kerja.'
      },
      {
        question: 'Tindakan berikut yang berpotensi menyebabkan kebocoran rahasia perusahaan (data breach) di tempat magang adalah...',
        options: [
          'Mengunggah foto layar komputer yang memuat database pelanggan kantor ke status Instagram pribadi',
          'Menyimpan file di cloud storage terenkripsi milik kantor',
          'Mengunci layar komputer saat beranjak dari meja kerja',
          'Menggunakan password dengan autentikasi dua faktor (2FA)'
        ],
        answerIndex: 0,
        explanation: 'Mengunggah dokumentasi internal yang memuat data pelanggan melanggar kerahasiaan data dan klausul NDA.'
      },
      {
        question: 'SOP (Standard Operating Procedure) di lingkungan industri digital bertujuan untuk...',
        options: [
          'Menetapkan pedoman langkah kerja standar baku agar proses produksi berjalan konsisten, aman, bermutu, dan efisien',
          'Membuat pekerjaan karyawan menjadi 10 kali lebih lambat',
          'Menghukum karyawan baru tanpa alasan',
          'Menghapus seluruh file komputer setiap sore'
        ],
        answerIndex: 0,
        explanation: 'SOP menjamin konsistensi mutu operasional dan meminimalkan kesalahan kerja di dunia industri.'
      },
      {
        question: 'Ketika melakukan rapat virtual (Zoom / Google Meet), etika digital yang wajib diperhatikan saat orang lain sedang berbicara adalah...',
        options: [
          'Mematikan mikrofon (Mute) untuk menghindari suara bising latar belakang dan mengaktifkan kamera dengan latar belakang rapi',
          'Berbicara keras memotong pembicaraan pemateri',
          'Memutar musik keras tanpa headset',
          'Meninggalkan rapat tanpa izin chat'
        ],
        answerIndex: 0,
        explanation: 'Mute mikrofon menjaga kejernihan audio forum rapat dan kamera aktif menunjukkan atensi profesional.'
      },
      {
        question: 'Istilah "Asynchronous Communication" (Komunikasi Asinkron) dalam lingkungan kerja modern merujuk pada...',
        options: [
          'Komunikasi di mana pengirim dan penerima tidak perlu merespons pada detik yang sama (misal: email atau pesan tugas Kanban)',
          'Komunikasi tatap muka langsung di ruang rapat',
          'Panggilan telepon darurat',
          'Sinyal morse dengan lampu senter'
        ],
        answerIndex: 0,
        explanation: 'Komunikasi asinkron memberi fleksibilitas waktu bagi anggota tim untuk membaca mendalam dan membalas secara matang.'
      },
      {
        question: 'Ukuran kapasitas maksimal lampiran berkas standar yang dapat dikirimkan langsung melalui satu pesan email Gmail adalah...',
        options: ['25 MB', '1 GB', '10 KB', '100 GB'],
        answerIndex: 0,
        explanation: 'Batas lampiran file standar Gmail adalah 25 MB; berkas lebih besar dialihkan via tautan Google Drive.'
      },
      {
        question: 'Jika kamu diminta mengirim berkas portofolio desain atau video yang berukuran 500 MB ke HRD perusahaan, cara terbaik adalah...',
        options: [
          'Mengunggahnya ke Google Drive / Dropbox, mengatur izin akses menjadi "Viewer", dan menyematkan link tautan di badan email',
          'Memaksakan lampiran email hingga error',
          'Mencetak video ke lembaran kertas HVS',
          'Mengirim file lewat SMS pulsa'
        ],
        answerIndex: 0,
        explanation: 'Tautan cloud storage dengan izin akses terbuka (Anyone with link as Viewer) adalah standar transfer file berukuran besar.'
      },
      {
        question: 'Tindakan yang harus dilakukan saat pertama kali bergabung ke dalam channel komunikasi tim kerja baru (Slack / Discord) adalah...',
        options: [
          'Memperkenalkan diri secara singkat, ramah, dan santun serta membaca dokumen pedoman tata tertib grup (rules/pinned messages)',
          'Langsung memposting meme kontroversial',
          'Mengirim pesan tag @everyone berkali-kali',
          'Keluar dari grup tanpa pamit'
        ],
        answerIndex: 0,
        explanation: 'Perkenalan diri dan memahami peraturan saluran komunikasi membangun hubungan kerja awal yang positif.'
      },
      {
        question: 'Apa fungsi utama dari ringkasan profil profesional (Professional Summary) di bagian teratas CV?',
        options: [
          'Memberikan ringkasan padat 2-3 kalimat mengenai keahlian utama, pencapaian terbaik, dan nilai tambah yang bisa diberikan pelamar kepada perusahaan',
          'Menuliskan hobi bermain game dan makanan favorit',
          'Menyebutkan seluruh nama anggota keluarga',
          'Menuliskan lirik lagu favorit'
        ],
        answerIndex: 0,
        explanation: 'Professional Summary menarik perhatian HRD dalam 6 detik pertama dengan menyorot kualifikasi kunci pelamar.'
      },
      {
        question: 'Metode manajemen waktu di mana seseorang bekerja fokus penuh selama 25 menit diselingi istirahat 5 menit untuk menjaga produktivitas disebut...',
        options: ['Teknik Pomodoro', 'Teknik Waterfall', 'Teknik Overclock', 'Teknik Multitasking'],
        answerIndex: 0,
        explanation: 'Teknik Pomodoro meningkatkan fokus kognitif dan mencegah kelelahan mental saat menyelesaikan tugas digital.'
      },
      {
        question: 'Mengapa penggunaan email dengan domain resmi sekolah/kampus/perusahaan (misal: nama@smknbojonggambir.sch.id) lebih disarankan dibanding email pribadi kasual?',
        options: [
          'Meningkatkan rasa percaya, profesionalisme, dan memastikan identitas resmi terverifikasi oleh institusi pengirim',
          'Agar kuota internet komputer tidak berkurang',
          'Supaya pesan otomatis masuk ke folder spam',
          'Agar tidak bisa menerima email balasan'
        ],
        answerIndex: 0,
        explanation: 'Email berdomain resmi instansi memberikan kredibilitas formal dan rasa aman bagi mitra bisnis industri.'
      },
      {
        question: 'Tindakan "Phishing Awareness" yang wajib dimiliki siswa saat bekerja di kantor adalah...',
        options: [
          'Selalu memverifikasi alamat email pengirim dan tidak sembarangan mengklik tautan/mengunduh lampiran yang mencurigakan',
          'Membuka semua file zip yang dikirim oleh nomor tak dikenal',
          'Memberikan password wifi kantor kepada orang asing di luar pagar',
          'Menonaktifkan antivirus komputer'
        ],
        answerIndex: 0,
        explanation: 'Kewaspadaan terhadap rekayasa sosial melindungi jaringan komputer perusahaan dari serangan ransomware.'
      },
      {
        question: 'Mengapa pembiasaan budaya kerja digital (digital workplace etiquette) sangat ditekankan sejak dini di bangku SMK?',
        options: [
          'Karena etika komunikasi, kepatuhan kerahasiaan data, dan kolaborasi tim yang matang adalah faktor penentu keberhasilan adaptasi di dunia industri modern',
          'Hanya agar siswa terbiasa mengenakan pakaian rapi di depan webcam',
          'Supaya siswa tidak perlu lagi belajar matematika',
          'Agar siswa tidak perlu berinteraksi sosial dengan manusia lain'
        ],
        answerIndex: 0,
        explanation: 'Budaya kerja digital melatih kesiapan mental vokasional, integritas profesional, dan daya saing global lulusan SMK.'
      },
      {
        question: 'Sikap yang harus diambil jika rekan tim kerja di proyek sekolah tidak sengaja menghapus teks pada dokumen kolaborasi Google Docs adalah...',
        options: [
          'Tetap tenang, membuka menu Version History, dan memulihkan (restore) versi dokumen sebelumnya dalam beberapa klik',
          'Memarahi rekan tersebut di media sosial secara terbuka',
          'Menghapus seluruh file proyek kelompok',
          'Melaporkan rekan ke pihak kepolisian'
        ],
        answerIndex: 0,
        explanation: 'Pemanfaatan fitur Version History menyelesaikan insiden human error secara teknis tanpa merusak hubungan kerja tim.'
      }
    ],
    asesmenUraian: [
      'Jelaskan bagaimana Anda akan merancang portofolio digital yang mampu meyakinkan perusahaan industri untuk menerima Anda magang!',
      'Uraikan analisis Anda terhadap risiko kebocoran data di era kerja hybrid (WFA) dan cara pencegahannya!'
    ],
    rubrikPenilaian: [
      {
        kriteria: 'Struktur CV ATS & Email',
        skor4: 'Format CV rapi, ramah mesin ATS, dan struktur email bisnis lengkap serta sangat santun.',
        skor3: 'Format CV baik namun email bisnis masih kurang pada bagian signature.',
        skor2: 'Format CV terlalu banyak elemen grafis yang membingungkan sistem ATS.',
        skor1: 'Tidak memenuhi kaidah penulisan dokumen profesional.'
      },
      {
        kriteria: 'Manajemen File & Portofolio',
        skor4: 'Portofolio menampilkan karya nyata berkualitas dengan dokumentasi proses dan penamaan file terstandar.',
        skor3: 'Portofolio menampilkan karya namun tanpa penjelasan deskripsi proses kerja.',
        skor2: 'Portofolio minim karya dan penamaan file belum baku.',
        skor1: 'Tidak menyertakan portofolio karya.'
      }
    ],
    glosarium: [
      { term: 'Applicant Tracking System (ATS)', definition: 'Sistem perangkat lunak yang memfilter dan menilai CV pelamar kerja secara otomatis berdasarkan kata kunci kualifikasi.' },
      { term: 'Non-Disclosure Agreement (NDA)', definition: 'Kontrak hukum yang mengikat pihak-pihak terkait untuk menjaga kerahasiaan informasi internal perusahaan.' },
      { term: 'Kanban Board', definition: 'Alat manajemen kerja visual untuk mengelola tugas tim melalui kartu kolom tahapan kerja.' },
      { term: 'Personal Branding', definition: 'Strategi membangun citra, reputasi, dan persepsi profesional diri di mata publik dan dunia industri.' }
    ],
    sumberReferensi: [
      'Kotler, P., & Keller, K. L. (2016). Marketing Management & Personal Branding. Pearson.',
      'Google Career Certificates (2024). Digital Workplace Foundations and Professional Communication.',
      'Project Management Institute (2021). A Guide to the Project Management Body of Knowledge (PMBOK Guide) - Agile Practices.'
    ]
  }
];
