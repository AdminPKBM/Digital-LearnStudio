import { ModuleData } from '../../types';

export const bkModules: ModuleData[] = [
  // =========================================================================
  // BAB 2: BERPIKIR KOMPUTASIONAL
  // =========================================================================
  {
    id: 'BK-1',
    elementId: 'BK',
    elementName: 'Berpikir Komputasional',
    moduleNumber: 1,
    bab: 'BAB 2 — Berpikir Komputasional',
    pertemuan: 3,
    fase: 'Fase E (Kelas X SMK)',
    title: 'Fondasi Berpikir Komputasional dan Pemecahan Masalah Sistematis',
    estimatedTimeMinutes: 90,
    difficulty: 'Pemula',
    competencies: [
      'Memahami esensi Berpikir Komputasional (Computational Thinking) sebagai metode pemecahan masalah manusia yang sistematis',
      'Mengidentifikasi dan menerapkan 4 pilar utama: Dekomposisi, Pengenalan Pola, Abstraksi, dan Perancangan Algoritma',
      'Mentransformasikan masalah kompleks menjadi sub-masalah terstruktur yang dapat diselesaikan secara efisien',
      'Menerapkan CT dalam kehidupan sehari-hari, lingkungan sekolah, dunia kerja, desain DKV, dan pengolahan data pangan APHP',
      'Menyelesaikan latihan pemecahan masalah bertingkat (mudah, sedang, hingga kompleks)'
    ],
    objectives: [
      'Siswa mampu mendefinisikan Berpikir Komputasional dan membedakannya dari sekadar kemampuan teknis pemrograman (unplugged thinking)',
      'Siswa dapat memecah masalah besar menjadi modul-modul kecil mandiri melalui teknik Dekomposisi',
      'Siswa dapat mengenali pola keteraturan dan memanfaatkan solusi masa lalu untuk masalah baru melalui Pengenalan Pola',
      'Siswa mampu menyaring informasi penting dan mengeliminasi rincian yang tidak relevan melalui teknik Abstraksi',
      'Siswa mampu menyusun urutan instruksi solusi logis yang tidak ambigu melalui Perancangan Algoritma',
      'Siswa dapat merancang solusi terstruktur untuk kasus nyata di bidang keahlian DKV dan APHP'
    ],
    summary: 'Penguasaan 4 pilar Berpikir Komputasional (Dekomposisi, Pengenalan Pola, Abstraksi, dan Algoritma) untuk mentransformasikan persoalan rumit menjadi solusi sistematis, efisien, dan aplikatif dalam kehidupan sehari-hari serta dunia industri SMK.',
    infographicHighlights: [
      { label: 'Dekomposisi', text: 'Memecah masalah raksasa menjadi sub-bagian kecil yang mudah dikelola.', icon: 'Split' },
      { label: 'Pengenalan Pola', text: 'Menemukan kesamaan tren atau aturan berulang untuk efisiensi solusi.', icon: 'Search' },
      { label: 'Abstraksi', text: 'Menyaring esensi informasi penting dan mengabaikan rincian tak relevan.', icon: 'Filter' },
      { label: 'Algoritma', text: 'Menyusun urutan instruksi terurut, logis, dan bebas ambigu.', icon: 'ListOrdered' }
    ],
    pertanyaanPemantik: [
      'Ketika kamu dihadapkan pada tugas membuat proyek pameran sekolah yang sangat besar, apa langkah pertamamu agar tidak merasa panik dan kewalahan?',
      'Mengapa seorang barista kopi atau koki restoran bintang lima bisa menghasilkan rasa minuman yang selalu konsisten bagi ribuan pelanggan?',
      'Bagaimana cara seorang desainer memecah perancangan identitas visual merek atau seorang pengolah pangan menyortir kualitas buah secara otomatis?'
    ],
    pendahuluan: `Dalam kehidupan sehari-hari maupun dunia kerja modern, kita kerap dihadapkan pada masalah yang rumit dan membingungkan. Tanpa metode berpikir yang tepat, kita mudah merasa kewalahan, mengambil keputusan coba-coba (*trial and error*) yang boros biaya, atau bahkan menyerah.

**Berpikir Komputasional (*Computational Thinking* / CT)** hadir sebagai landasan berpikir ilmiah modern. Dipopulerkan oleh **Prof. Jeannette M. Wing (2006)** dari Carnegie Mellon University, CT adalah proses mental untuk merumuskan masalah dan mencari solusi sedemikian rupa sehingga solusi tersebut dapat dieksekusi secara efektif, baik oleh manusia, komputer, maupun kombinasi keduanya.

Penting ditekankan bahwa **Berpikir Komputasional bukanlah cara berpikir seperti komputer atau robot**. Sebaliknya, ini adalah cara berpikir manusia yang sangat cerdas, terstruktur, analitis, dan logis untuk menaklukkan tantangan di berbagai bidang—mulai dari seni desain visual (DKV), pengolahan pangan (APHP), otomotif, hingga manajemen bisnis.`,
    konsepInti: `Empat Pilar Berpikir Komputasional:
1. **Dekomposisi (Decomposition)**: Memecah persoalan kompleks menjadi sub-masalah yang lebih kecil dan terisolasi.
2. **Pengenalan Pola (Pattern Recognition)**: Mengidentifikasi kesamaan, tren, atau karakteristik berulang dari masalah sebelumnya.
3. **Abstraksi (Abstraction)**: Mengabaikan detail-detail yang tidak penting dan memfokuskan perhatian pada aspek-aspek utama yang menentukan solusi.
4. **Perancangan Algoritma (Algorithm Design)**: Merumuskan langkah-langkah terurut, logis, dan berurutan untuk menyelesaikan masalah dari kondisi awal hingga tujuan akhir tercapai.`,
    contentMarkdown: `# BAB 2 — Berpikir Komputasional

## 1. Pengertian Berpikir Komputasional (*Computational Thinking*)

Berpikir Komputasional adalah keterampilan berpikir tingkat tinggi (*higher-order thinking skills*) yang melibatkan formulasi masalah dan penyusunan solusi terstruktur.

\`\`\`text
+-------------------------------------------------------------------------------+
|                       ALUR METODE BERPIKIR KOMPUTASIONAL                      |
+-------------------------------------------------------------------------------+
|                                MASALAH RUMIT                                  |
|            (Proyek Besar, Antrean Panjang, Kerusakan Produksi)                |
|                                     │                                         |
|                 ┌───────────────────┴───────────────────┐                     |
|                 ▼                                       ▼                     |
|         [ 1. DEKOMPOSISI ]                      [ 2. POLA ]                   |
|    (Pecah jadi sub-tugas)               (Temukan kesamaan tren)               |
|                 │                                       │                     |
|                 └───────────────────┬───────────────────┘                     |
|                                     │                                         |
|                 ┌───────────────────┴───────────────────┐                     |
|                 ▼                                       ▼                     |
|          [ 3. ABSTRAKSI ]                      [ 4. ALGORITMA ]               |
|    (Ambil inti, buang detail)           (Susun instruksi langkah solusi)      |
|                                     │                                         |
|                                     ▼                                         |
|                           SOLUSI TEPAT & EFISIEN                              |
+-------------------------------------------------------------------------------+
\`\`\`

---

## 2. Empat Pilar Utama Berpikir Komputasional

### A. Dekomposisi (*Decomposition*)
Dekomposisi adalah teknik memecah masalah besar, sistem rumit, atau proyek raksasa menjadi bagian-bagian yang lebih kecil, mandiri (*modular*), dan mudah dikelola.
* **Mengapa Penting?** Otak manusia memiliki kapasitas memori kerja terbatas (*cognitive load limit*). Dengan memecah masalah, kita bisa fokus menyelesaikan satu sub-masalah secara tuntas sebelum berpindah ke bagian lain.
* **Langkah Dekomposisi**:
  1. Identifikasi tujuan akhir (*main objective*).
  2. Pecah menjadi komponen-komponen pembentuk (*sub-components*).
  3. Tentukan prioritas dan ketergantungan antar komponen.

### B. Pengenalan Pola (*Pattern Recognition*)
Pengenalan Pola adalah kemampuan menemukan kesamaan karakteristik, keteraturan tren, atau repetisi dari peristiwa yang pernah terjadi sebelumnya.
* **Mengapa Penting?** Kita tidak perlu memulai dari nol (*reinvent the wheel*). Masalah yang memiliki pola serupa dapat diselesaikan menggunakan formula atau metode yang terbukti berhasil di masa lampau.
* **Langkah Pengenalan Pola**:
  1. Amati data historis atau kasus-kasus terdahulu.
  2. Temukan variabel yang selalu berulang atau memiliki relasi sebab-akibat.
  3. Rumuskan aturan umum (*general rule/template*).

### C. Abstraksi (*Abstraction*)
Abstraksi adalah proses menyaring informasi dengan memilah mana data yang **kritis (esensial)** dan mana data yang **tidak relevan (detail periferal)** terhadap pencapaian solusi.
* **Mengapa Penting?** Dunia nyata dipenuhi oleh jutaan detail yang bisa membuyarkan fokus. Abstraksi menciptakan model sederhana yang bersih dan mudah dipahami.
* **Contoh Nyata**: Peta jalur transportasi MRT/KRL hanya menampilkan nama stasiun dan garis rute (Abstraksi tinggi), tanpa menampilkan pohon, tikungan jalan raya, atau bentuk gedung di sekitarnya.

### D. Perancangan Algoritma (*Algorithm Design*)
Perancangan Algoritma adalah kemampuan merumuskan urutan langkah-langkah instruksi yang logis, presisi, berurutan, dan tidak menimbulkan makna ganda (*unambiguous*) untuk mencapai hasil yang diinginkan.
* **Karakteristik Algoritma yang Baik**:
  1. **Jelas (Definiteness)**: Setiap langkah memiliki instruksi tunggal yang pasti.
  2. **Berhingga (Finiteness)**: Proses harus memiliki kondisi berhenti (*terminating condition*).
  3. **Efektif (Effectiveness)**: Setiap instruksi dapat dieksekusi secara nyata.

---

## 3. Penerapan Berpikir Komputasional dalam Berbagai Konteks

\`\`\`text
+-------------------+-----------------------------------------------------------+
| KONTEKS           | PENERAPAN 4 PILAR BERPIKIR KOMPUTASIONAL                  |
+-------------------+-----------------------------------------------------------+
| Kehidupan Harian  | • Dekomposisi: Menyiapkan sarapan (nasi, telur, kopi)     |
|                   | • Pola: Waktu air mendidih selalu 3 menit pada api sedang |
|                   | • Abstraksi: Fokus pada takaran gula, abaikan warna cangkir|
|                   | • Algoritma: Resep langkah menyeduh kopi standar          |
+-------------------+-----------------------------------------------------------+
| Sekolah SMK       | • Dekomposisi: Pembagian seksi panitia Pentas Seni SMK    |
|                   | • Pola: Meniru rundown susunan acara tahun lalu yang sukses|
|                   | • Abstraksi: Fokus pada anggaran total & izin kepolisian  |
|                   | • Algoritma: Alur pendaftaran peserta lomba online        |
+-------------------+-----------------------------------------------------------+
| Pekerjaan Industri| • Dekomposisi: SOP perbaikan mesin cetak / mesin pendingin|
|                   | • Pola: Kerusakan bearing selalu diawali getaran tinggi   |
|                   | • Abstraksi: Catat kode error mesin, abaikan warna cat body|
|                   | • Algoritma: Diagram alur penanganan komplain pelanggan   |
+-------------------+-----------------------------------------------------------+
\`\`\`

---

## 4. Berpikir Komputasional pada Bidang Keahlian DKV dan APHP

### A. Penerapan pada Desain Komunikasi Visual (DKV)
* **Dekomposisi Proyek Branding**: Merancang identitas merek klien dipecah menjadi: Riset Target Pasar → Desain Logo Vektor → Palet Warna & Tipografi → Mockup Kemasan → Pedoman Brand (*Brand Guidelines*).
* **Pengenalan Pola Visual**: Mengamati tren poster visual Gen Z yang menyukai gaya *neo-brutalism* atau *minimalist retro*.
* **Abstraksi Hierarki Tipografi**: Menyaring informasi penting pada poster acara: Nama Acara (Ukuran Terbesar) → Tanggal & Lokasi (Ukuran Sedang) → Syarat Ketentuan (Ukuran Kecil).
* **Algoritma Alur Kerja (Workflow)**: Brief Klien → Sketsa Manual → Digital Drafting → Proofing Klien → Ekspor File Siap Cetak (CMYK 300 DPI).

### B. Penerapan pada Agribisnis Pengolahan Hasil Pertanian (APHP)
* **Dekomposisi Pembuatan Minuman Sari Buah**: Memecah proses produksi menjadi: Sortasi Buah Mentah → Pencucian & Pengupasan → Ekstraksi Jus → Pasteurisasi & Penambahan Gula → Pengemasan Botol Steril → Uji Laboratorium Mutu.
* **Pengenalan Pola Kualitas**: Mengidentifikasi bahwa buah dengan tingkat kematangan 80% selalu menghasilkan rendemen gula dan aroma terbaik.
* **Abstraksi Standar Sortir Mutu**: Menetapkan filter sortasi hanya berdasarkan: Diameter buah (min 7 cm), tingkat kekenyalan, dan ketiadaan jamur (mengabaikan bentuk tangkai daun).
* **Algoritma Kontrol Mutu (HACCP)**: Alur pengujian sampel: Ambil sampel botol ke-50 → Ukur kadar brix gula → Jika brix antara 12-14% LULUS, jika di luar rentang REJECT dan hentikan mesin pengisian.

---

## 5. Latihan Pemecahan Masalah Bertingkat

### Tingkat 1: Masalah Sederhana (Mudah)
**Kasus**: Kamu ingin mengurutkan 5 tumpukan buku pelajaran di mejamu berdasarkan ketebalannya dari yang paling tipis ke paling tebal.
* **Solusi CT**: Dekomposisi (bandingkan 2 buku sekaligus), Abstraksi (fokus pada jumlah halaman buku, abaikan gambar cover), Algoritma (Bubble Sort sederhana).

### Tingkat 2: Masalah Menengah (Sedang)
**Kasus**: Mengatur jadwal piket kebersihan lab komputer yang adil untuk 36 siswa dengan batasan: siswa yang tinggal jauh tidak boleh piket pagi, dan setiap regu harus ada minimal 2 laki-laki dan 2 perempuan.
* **Solusi CT**: Dekomposisi kelompok berdasarkan domisili dan jenis kelamin, cari pola ketersediaan waktu, susun algoritma penugasan berulang (*round-robin*).

### Tingkat 3: Masalah Kompleks (Mahir)
**Kasus**: Sebuah unit usaha pengolahan roti di SMK ingin meminimalkan sisa roti yang tidak terjual setiap sore dengan mengoptimasi jadwal memanggang berdasarkan data penjualan 30 hari terakhir.
* **Solusi CT**: Analisis data penjualan (Pengenalan Pola hari hujan vs hari cerah), Abstraksi faktor cuaca dan hari libur, Algoritma prediksi jumlah adonan harian.`,
    contohPenerapan: `1. **Navigasi Rute Pengantaran**: Kurir ekspedisi mengurai 20 alamat paket (Dekomposisi), mengelompokkan berdasarkan nama kelurahan yang sama (Pola), mengabaikan warna rumah penerima (Abstraksi), dan menyusun rute jalan searah (Algoritma).
2. **Perancangan Kemasan Produk DKV**: Desainer memecah perancangan jaring-jaring kardus kemasan (Dekomposisi), menggunakan template ukuran standar industri karton (Pola), hanya menampilkan info gizi wajib (Abstraksi), dan menyusun urutan penataan layer desain di Illustrator (Algoritma).`,
    studiKasus: `**Studi Kasus: Antrean Mengular di Kantin Sekolah Saat Jam Istirahat**

Kantin SMKN Bojonggambir hanya memiliki waktu istirahat 30 menit. Namun, siswa sering menghabiskan waktu 25 menit hanya untuk mengantre memesan dan membayar makanan, sehingga banyak siswa yang terlambat masuk kelas berikutnya.

**Analisis Berpikir Komputasional**:
1. **Dekomposisi**: Masalah antrean dipecah menjadi 3 sub-proses: (a) Melihat menu dan memilih, (b) Penyiapan makanan oleh penjual, (c) Proses pembayaran dan pengembalian uang tunai.
2. **Pengenalan Pola**: 80% siswa selalu memesan 2 menu favorit yang sama (Nasi Ayam Geprek dan Es Teh Manis).
3. **Abstraksi**: Penjual tidak perlu melayani variasi pesanan rumit pada jam istirahat; fokus hanya pada menu paket cepat saji.
4. **Algoritma Solusi Baru**:
   - Pasang banner menu paket di luar antrean agar siswa sudah memutuskan sebelum maju.
   - Sediakan paket makanan yang sudah dikemas siap ambil (*grab & go*).
   - Terapkan pembayaran non-tunai QRIS satu harga pas untuk menghilangkan waktu mencari uang kembalian.
   - Hasil: Waktu antrean per siswa terpangkas dari 3 menit menjadi 20 detik!`,
    aktivitasSiswa: `**Aktivitas Praktik: Computational Thinking Challenge (Unplugged)**
1. Bentuk kelompok beranggotakan 3 orang.
2. Pilih salah satu masalah nyata di lingkungan sekolahmu (misal: penataan tempat parkir motor, pengelolaan sampah plastik, atau alur peminjaman buku perpustakaan).
3. Gambarkan analisis 4 Pilar Berpikir Komputasional pada selembar kertas karton / kertas plano dengan tabel pembagian:
   - Kolom 1: Dekomposisi Masalah
   - Kolom 2: Pola yang Ditemukan
   - Kolom 3: Aspek yang Diabstraksikan
   - Kolom 4: Diagram Alir Algoritma Solusi
4. Tempelkan di dinding kelas untuk sesi *gallery walk* dan saling memberikan umpan balik!`,
    tipsPraktis: [
      'Jangan terburu-buru mencari solusi akhir sebelum membedah masalah melalui Dekomposisi.',
      'Gunakan catatan visual atau diagram alir (flowchart) sederhana saat merancang algoritma agar alur logika terlihat jelas.',
      'Latihlah Abstraksi dengan selalu bertanya: "Apakah detail informasi ini benar-benar memengaruhi hasil akhir?"'
    ],
    kesalahanUmum: [
      'Mencoba menyelesaikan seluruh masalah rumit sekaligus secara serentak tanpa dekomposisi.',
      'Terjebak pada detail-detail sepele yang sebenarnya tidak relevan (gagal menerapkan abstraksi).',
      'Membuat algoritma yang tidak memiliki urutan logis atau tidak memiliki batas akhir berhenti.'
    ],
    rangkuman: `• Berpikir Komputasional (CT) adalah metode kognitif manusia untuk menyelesaikan masalah secara sistematis dan efisien.
• 4 Pilar CT adalah: Dekomposisi (pemecahan masalah), Pengenalan Pola (identifikasi kesamaan), Abstraksi (penyaringan inti informasi), dan Perancangan Algoritma (penyusunan langkah solusi).
• CT dapat diterapkan secara luas tanpa komputer (*unplugged*) pada kehidupan harian, manajemen sekolah, industri kreatif DKV, maupun pengolahan pangan APHP.
• Latihan memecahkan masalah bertingkat melatih ketajaman logika dan kemandirian berpikir kritis siswa SMK.`,
    refleksi: [
      'Dari 4 pilar Berpikir Komputasional, pilar manakah yang paling sering kamu gunakan tanpa kamu sadari dalam kehidupan sehari-hari?',
      'Bagaimana cara kamu menerapkan Dekomposisi saat menghadapi tugas sekolah yang menumpuk menjelang ujian akhir semester?'
    ],
    latihanPemahaman: [
      '1. Jelaskan definisi Berpikir Komputasional menurut Prof. Jeannette Wing!',
      '2. Uraikan perbedaan mendasar antara pilar Dekomposisi dan Abstraksi beserta contohnya!',
      '3. Mengapa Pengenalan Pola sangat menghemat waktu dan biaya dalam proses produksi industri di SMK?',
      '4. Sebutkan dan jelaskan 3 karakteristik yang wajib dimiliki oleh algoritma yang baik!'
    ],
    tugasPraktik: `**Tugas Pemecahan Masalah: Algoritma Proyek Mandiri**
Pilihlah salah satu proyek kejuruan (misal: Merancang Desain Kemasan Produk Lokal untuk DKV ATAU Membuat Produk Minuman Fermentasi Herbal untuk APHP).
Susun dokumen laporan (2 halaman) yang membedah proyek tersebut menggunakan 4 Pilar Berpikir Komputasional:
1. Lembar Dekomposisi Modul Kerja.
2. Identifikasi Pola Standar Industri.
3. Lembar Abstraksi Parameter Mutu Kunci.
4. Diagram Alir Algoritma Langkah Kerja (SOP).
Simpan dalam format PDF (\`BK1_NAMA_KELAS.pdf\`) dan kumpulkan ke portal tugas.`,
    asesmen: [
      {
        question: 'Teknik memecah masalah perancangan identitas merek visual menjadi bagian riset, sketsa logo, tipografi, dan packaging disebut pilar...',
        options: ['Dekomposisi', 'Abstraksi', 'Algoritma', 'Generalisasi'],
        answerIndex: 0,
        explanation: 'Dekomposisi adalah teknik memecah masalah atau proyek besar menjadi sub-bagian kecil yang dapat dikerjakan secara mandiri.'
      },
      {
        question: 'Ketika sebuah peta rute bus kota hanya menampilkan garis jalur dan nama halte dengan mengabaikan bentuk pohon dan rumah penduduk di pinggir jalan, peta tersebut menerapkan pilar...',
        options: ['Abstraksi', 'Dekomposisi', 'Algoritma', 'Pengenalan Pola'],
        answerIndex: 0,
        explanation: 'Abstraksi adalah proses menyaring dan hanya menampilkan informasi penting yang relevan serta mengabaikan detail yang tidak perlu.'
      },
      {
        question: 'Seorang teknisi mesin APHP mengenali bahwa setiap kali suhu oven melebihi 120 derajat celcius, adonan kue kering selalu gosong di bagian bawah. Pengamatan keteraturan ini merupakan contoh pilar...',
        options: ['Pengenalan Pola (Pattern Recognition)', 'Dekomposisi', 'Abstraksi', 'Algoritma'],
        answerIndex: 0,
        explanation: 'Pengenalan Pola adalah kemampuan mengidentifikasi kesamaan atau keteraturan tren sebab-akibat dari data berulang.'
      },
      {
        question: 'Urutan instruksi langkah demi langkah yang logis, terurut, dan tidak ambigu untuk menyelesaikan masalah disebut...',
        options: ['Perancangan Algoritma', 'Dekomposisi Acak', 'Abstraksi Global', 'Trial and Error'],
        answerIndex: 0,
        explanation: 'Algoritma adalah deretan instruksi logis dan sistematis untuk memecahkan masalah.'
      },
      {
        question: 'Manakah pernyataan yang PALING TEPAT mengenai Berpikir Komputasional (Computational Thinking)?',
        options: [
          'Keterampilan memecahkan masalah manusia secara logis dan terstruktur yang dapat diterapkan dengan atau tanpa komputer',
          'Kewajiban setiap orang untuk menjadi programmer bahasa mesin',
          'Metode yang membuat manusia berpikir kaku seperti robot tanpa kreativitas',
          'Kemampuan yang hanya terbatas pada pengerjaan soal rumus matematika murni'
        ],
        answerIndex: 0,
        explanation: 'Computational Thinking adalah kerangka berpikir problem solving universal yang dapat diterapkan pada berbagai aspek kehidupan (unplugged).'
      },
      {
        question: 'Dalam merancang Standard Operating Procedure (SOP) pembuatan sari buah kemasan, urutan langkah harus jelas dan berhingga. Syarat algoritma yang berarti harus berhenti setelah sejumlah langkah terhingga disebut...',
        options: ['Finiteness (Keberhinggaan)', 'Definiteness (Kepastian)', 'Effectiveness (Ketepatan)', 'Generality (Keumuman)'],
        answerIndex: 0,
        explanation: 'Finiteness berarti algoritma harus memiliki akhir dan berhenti setelah sejumlah langkah instruksi diselesaikan.'
      },
      {
        question: 'Setiap instruksi dalam algoritma harus didefinisikan secara tepat, jelas, dan tidak menimbulkan makna ganda (ambigu). Karakteristik ini dinamakan...',
        options: ['Definiteness', 'Finiteness', 'Effectiveness', 'Redundancy'],
        answerIndex: 0,
        explanation: 'Definiteness menuntut kepastian dan kejelasan instruksi agar tidak terjadi multi-tafsir saat dieksekusi.'
      },
      {
        question: 'Simbol diagram alir (flowchart) berbentuk belah ketupat (diamond) digunakan untuk melambangkan...',
        options: ['Keputusan/Percabangan kondisi (Decision)', 'Awal atau akhir program (Terminator)', 'Proses pengolahan data (Process)', 'Masukan atau keluaran manual (Input/Output)'],
        answerIndex: 0,
        explanation: 'Belah ketupat dalam flowchart merepresentasikan evaluasi kondisi logika yang menghasilkan cabang True/False (Ya/Tidak).'
      },
      {
        question: 'Simbol diagram alir berbentuk persegi panjang (rectangle) berfungsi untuk menyatakan...',
        options: ['Proses komputasi atau tindakan operasional', 'Pengambilan keputusan bersyarat', 'Titik awal atau akhir program', 'Penghubung halaman berbeda'],
        answerIndex: 0,
        explanation: 'Persegi panjang digunakan untuk operasi penugasan, perhitungan aritmetika, atau eksekusi proses.'
      },
      {
        question: 'Simbol diagram alir berbentuk jajar genjang (parallelogram) digunakan untuk...',
        options: ['Operasi Input atau Output data', 'Proses kalkulasi internal CPU', 'Kondisi perulangan logika', 'Konektor satu halaman'],
        answerIndex: 0,
        explanation: 'Jajar genjang merepresentasikan pembacaan data masuk (input) atau penampilan hasil keluaran (output).'
      },
      {
        question: 'Seorang desainer grafis memisahkan aset visual berupa foto produk, ikon vektor, tipografi header, dan palet warna ke dalam layer terpisah. Aktivitas ini merupakan implementasi...',
        options: ['Dekomposisi', 'Algoritma rekursif', 'Enkripsi data', 'Kompresi lossless'],
        answerIndex: 0,
        explanation: 'Memisahkan elemen desain menjadi komponen modular yang berdiri sendiri merupakan bentuk dekomposisi sistem visual.'
      },
      {
        question: 'Jika proposisi P bernilai BENAR (True) dan proposisi Q bernilai SALAH (False), maka nilai kebenaran dari ekspresi logika (P AND Q) adalah...',
        options: ['SALAH (False)', 'BENAR (True)', 'Tidak Terdefinisi', 'Bisa Benar Bisa Salah'],
        answerIndex: 0,
        explanation: 'Operasi logika AND hanya menghasilkan nilai True jika kedua operan bernilai True. Karena Q bernilai False, maka hasilnya False.'
      },
      {
        question: 'Jika proposisi P bernilai SALAH (False) dan proposisi Q bernilai BENAR (True), maka nilai kebenaran dari ekspresi logika (P OR Q) adalah...',
        options: ['BENAR (True)', 'SALAH (False)', 'Null', 'Kosong'],
        answerIndex: 0,
        explanation: 'Operasi logika OR bernilai True jika salah satu atau kedua operannya bernilai True.'
      },
      {
        question: 'Operasi negasi (NOT) dari pernyataan "Semua produk pangan lolos uji kualitas" adalah...',
        options: ['Ada produk pangan yang tidak lolos uji kualitas', 'Semua produk pangan tidak lolos uji kualitas', 'Tidak ada produk pangan yang diproduksi', 'Hanya satu produk yang lolos uji kualitas'],
        answerIndex: 0,
        explanation: 'Negasi dari kalimat berkuantor universal "Semua A adalah B" adalah kalimat berkuantor eksistensial "Ada/beberapa A yang bukan B".'
      },
      {
        question: 'Sebuah resep minuman herbal menyatakan: "Aduk larutan sebanyak 50 putaran searah jarum jam". Struktur kontrol logika yang diterapkan pada instruksi tersebut adalah...',
        options: ['Perulangan (Looping/Iteration)', 'Percabangan (Selection)', 'Sekuensial Murni', 'Rekursi Tak Hingga'],
        answerIndex: 0,
        explanation: 'Mengulang instruksi yang sama sebanyak jumlah tertentu merupakan struktur iterasi/perulangan.'
      },
      {
        question: 'Struktur logika yang memilih salah satu aksi berdasarkan evaluasi kondisi ("JIKA suhu > 100°C MAKA matikan kompor, JIKA TIDAK lanjutkan pemanasan") dinamakan...',
        options: ['Percabangan / Seleksi (Branching)', 'Perulangan tanpa batas', 'Dekomposisi statis', 'Konkatenasi string'],
        answerIndex: 0,
        explanation: 'Percabangan (if-else) mengeksekusi blok instruksi berbeda bergantung pada terpenuhinya suatu kondisi logika.'
      },
      {
        question: 'Penulisan algoritma menggunakan teks yang menyerupai bahasa pemrograman tingkat tinggi tetapi ditujukan agar mudah dibaca manusia disebut...',
        options: ['Pseudocode', 'Bahasa Mesin (Assembly)', 'Flowchart Dinamis', 'Source Code Biner'],
        answerIndex: 0,
        explanation: 'Pseudocode adalah notasi deskriptif informal berstruktur mirip kode pemrograman yang ditujukan untuk mempermudah perancangan logika.'
      },
      {
        question: 'Ketika kita membuat model digital 3D kemasan botol minuman dan hanya memfokuskan pada dimensi luar tanpa memodelkan struktur atom plastiknya, kita menerapkan prinsip...',
        options: ['Abstraksi', 'Dekomposisi', 'Kompilasi', 'Interpretasi'],
        answerIndex: 0,
        explanation: 'Abstraksi menyembunyikan detail tingkat rendah yang tidak esensial untuk mempermudah pemodelan pada level konsep yang relevan.'
      },
      {
        question: 'Dalam sebuah antrian kasir kantin, sistem pelayanan "yang pertama datang akan dilayani pertama kali" menganut struktur data logika...',
        options: ['FIFO (First In First Out / Queue)', 'LIFO (Last In First Out / Stack)', 'Random Access', 'Priority Queue Terbalik'],
        answerIndex: 0,
        explanation: 'Antrian (Queue) bekerja dengan prinsip FIFO: elemen yang masuk pertama akan keluar/diproses pertama.'
      },
      {
        question: 'Sebuah tumpukan piring bersih di dapur pengolahan APHP di mana piring terakhir yang ditaruh akan diambil pertama kali menganut struktur data...',
        options: ['LIFO (Last In First Out / Stack)', 'FIFO (First In First Out)', 'Binary Tree', 'Graph Siklik'],
        answerIndex: 0,
        explanation: 'Tumpukan (Stack) beroperasi dengan prinsip LIFO: elemen yang terakhir dimasukkan adalah elemen pertama yang dikeluarkan.'
      },
      {
        question: 'Metode pencarian data dalam daftar terurut dengan cara membagi dua ruang pencarian secara berulang disebut...',
        options: ['Binary Search (Pencarian Biner)', 'Linear Search (Pencarian Berurutan)', 'Bubble Sort', 'Brute Force Search'],
        answerIndex: 0,
        explanation: 'Binary search membagi rentang data terurut menjadi dua bagian pada setiap langkah, menghasilkan kompleksitas waktu O(log n).'
      },
      {
        question: 'Metode pencarian yang memeriksa elemen satu per satu dari awal sampai akhir daftar data dinamakan...',
        options: ['Linear Search (Pencarian Sekuensial)', 'Binary Search', 'Quick Search', 'Hash Search'],
        answerIndex: 0,
        explanation: 'Linear search memeriksa setiap elemen secara berurutan dari indeks pertama hingga elemen ditemukan atau daftar habis.'
      },
      {
        question: 'Strategi pemecahan masalah dengan mencoba semua kemungkinan solusi satu per satu hingga solusi ditemukan disebut pendekatan...',
        options: ['Brute Force', 'Greedy Method', 'Dynamic Programming', 'Divide and Conquer'],
        answerIndex: 0,
        explanation: 'Brute Force adalah pendekatan langsung (exhaustive search) yang mencoba seluruh kemungkinan kombinasi solusi.'
      },
      {
        question: 'Strategi algoritma yang selalu memilih opsi terbaik atau paling menguntungkan pada setiap langkah lokal saat ini dengan harapan mencapai solusi optimal global disebut...',
        options: ['Algoritma Greedy (Tamak)', 'Algoritma Brute Force', 'Algoritma Rekursif', 'Algoritma Backtracking'],
        answerIndex: 0,
        explanation: 'Algoritma Greedy membuat keputusan optimal secara lokal pada setiap tahap tanpa memikirkan konsekuensi masa depan.'
      },
      {
        question: 'Strategi "Divide and Conquer" menyelesaikan masalah besar dengan cara...',
        options: ['Membagi masalah menjadi sub-masalah independen, menyelesaikannya, lalu menggabungkan hasilnya', 'Mencoba semua jawaban secara acak sampai berhasil', 'Mengabaikan semua kendala dan membuat asumsi baru', 'Menyerahkan proses penyelesaian ke sistem pihak ketiga'],
        answerIndex: 0,
        explanation: 'Divide and Conquer memecah persoalan besar menjadi beberapa sub-masalah serupa yang lebih kecil, menyelesaikan masing-masing, lalu menggabungkan hasilnya.'
      },
      {
        question: 'Tabel yang digunakan untuk melacak perubahan nilai variabel langkah demi langkah saat menguji algoritma secara manual disebut...',
        options: ['Trace Table (Tabel Penelusuran)', 'Tabel Kebenaran Logika', 'Tabel Distribusi Frekuensi', 'Tabel Pivot Excel'],
        answerIndex: 0,
        explanation: 'Trace table digunakan programmer dan siswa untuk melakukan dry-run menguji jalannya algoritma baris demi baris.'
      },
      {
        question: 'Istilah "Dry Run" dalam pengujian algoritma Berpikir Komputasional bermakna...',
        options: ['Menjalankan dan menguji alur logika algoritma secara manual di atas kertas tanpa komputer', 'Mengeringkan perangkat keras komputer yang terkena cairan', 'Mengompresi file proyek ke dalam format zip', 'Menghapus data sementara dari memori RAM'],
        answerIndex: 0,
        explanation: 'Dry run adalah proses mental atau manual di atas kertas untuk memeriksa kebenaran langkah algoritma sebelum dikodekan.'
      },
      {
        question: 'Manakah di bawah ini yang merupakan contoh pemikiran komputasional "Unplugged" (tanpa komputer)?',
        options: ['Menyusun diagram langkah mencuci tangan 6 langkah WHO dengan flowchart di kertas karton', 'Mengetik dokumen laporan menggunakan aplikasi pengolah kata', 'Bermain game online di smartphone', 'Mengunduh video tutorial editing di internet'],
        answerIndex: 0,
        explanation: 'Kegiatan unplugged melatih konsep dasar ilmu komputer dan logika tanpa memerlukan perangkat gawai/komputer.'
      },
      {
        question: 'Kondisi di mana sebuah perulangan tidak pernah berhenti karena kondisi keluar (stop condition) tidak pernah tercapai disebut...',
        options: ['Infinite Loop (Perulangan Tak Hingga)', 'Deadlock Logic', 'Syntax Error', 'Buffer Overflow'],
        answerIndex: 0,
        explanation: 'Infinite Loop terjadi ketika kondisi terminasi suatu iterasi selalu bernilai benar (True) sehingga program berputar selamanya.'
      },
      {
        question: 'Mengapa kemampuan Berpikir Komputasional sangat krusial bagi lulusan SMK kejuruan Desain Komunikasi Visual dan Agribisnis Pengolahan Hasil Pertanian?',
        options: [
          'Agar mampu merumuskan masalah produksi secara sistematis, merancang alur kerja yang efisien, dan beradaptasi dengan otomatisasi industri',
          'Hanya sebagai syarat kelulusan mata pelajaran umum tanpa penerapan praktis',
          'Agar semua siswa dapat beralih profesi menjadi perakit perangkat keras komputer',
          'Supaya siswa tidak perlu lagi mempelajari keahlian manual kejuruan'
        ],
        answerIndex: 0,
        explanation: 'Berpikir komputasional membekali lulusan kejuruan dengan kemampuan analisis logis, otomatisasi proses, dan problem solving kreatif di industri modern.'
      }
    ],
    asesmenUraian: [
      'Jelaskan bagaimana 4 pilar Berpikir Komputasional dapat digunakan untuk mengatasi masalah penumpukan sampah plastik di sekolah Anda!',
      'Uraikan analisis Anda mengenai pentingnya pilar Abstraksi dalam merancang antarmuka aplikasi digital (UI/UX)!'
    ],
    rubrikPenilaian: [
      {
        kriteria: 'Penerapan 4 Pilar CT',
        skor4: 'Mampu mengidentifikasi dan memetakan 4 pilar CT (Dekomposisi, Pola, Abstraksi, Algoritma) secara tepat dan logis.',
        skor3: 'Menerapkan 4 pilar namun terdapat sedikit kerancuan antara Dekomposisi dan Abstraksi.',
        skor2: 'Hanya menerapkan 2 dari 4 pilar secara tepat.',
        skor1: 'Tidak memahami konsep 4 pilar CT.'
      },
      {
        kriteria: 'Kejelasan Solusi & Algoritma',
        skor4: 'Langkah algoritma sangat runtut, jelas, realistis, dan memiliki kondisi berhenti yang pasti.',
        skor3: 'Langkah algoritma cukup jelas namun ada beberapa langkah yang ambigu.',
        skor2: 'Algoritma melompat-lompat dan belum terstruktur.',
        skor1: 'Tidak ada langkah algoritma yang dihasilkan.'
      }
    ],
    glosarium: [
      { term: 'Computational Thinking', definition: 'Metode berpikir logis dan sistematis dalam memformulasi masalah dan merancang solusi yang efisien.' },
      { term: 'Dekomposisi', definition: 'Proses memecah masalah kompleks menjadi komponen-komponen sub-masalah yang lebih sederhana.' },
      { term: 'Abstraksi', definition: 'Teknik penyaringan untuk memfokuskan perhatian hanya pada informasi esensial dan mengabaikan detail yang tidak relevan.' },
      { term: 'Algoritma', definition: 'Rangkaian instruksi terurut dan tidak ambigu untuk memecahkan persoalan atau menyelesaikan suatu pekerjaan.' }
    ],
    sumberReferensi: [
      'Wing, J. M. (2006). Computational Thinking. Communications of the ACM, 49(3), 33-35.',
      'Bebras Indonesia (2023). Panduan Tantangan Bebras dan Berpikir Komputasional.',
      'Kemendikbudristek (2021). Buku Siswa Informatika Kelas X SMA/SMK. Pusat Perbukuan.',
      'CSTA (Computer Science Teachers Association) Standards for K-12 Computer Science.'
    ]
  }
];
