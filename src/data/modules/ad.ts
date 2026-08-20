import { ModuleData } from '../../types';

export const adModules: ModuleData[] = [
  // =========================================================================
  // BAB 7: ANALISIS DATA DAN PENGOLAH ANGKA (SPREADSHEET)
  // =========================================================================
  {
    id: 'AD-1',
    elementId: 'AD',
    elementName: 'Analisis Data',
    moduleNumber: 1,
    bab: 'BAB 7 — Analisis Data dan Pengolah Angka (Spreadsheet)',
    pertemuan: 11,
    fase: 'Fase E (Kelas X SMK)',
    title: 'Pengolahan Angka Mahir, Formula Statistik, Lookup Relasional, dan Pivot Table',
    estimatedTimeMinutes: 90,
    difficulty: 'Menengah',
    competencies: [
      'Memahami hierarki konseptual Data → Informasi → Pengetahuan (DIKW Pyramid) dan siklus pengolahan data profesional',
      'Menguasai tipe data sel, format angka presisi, dan konsep referensi sel (Relatif A1, Absolut $A$1, Campuran $A1/A$1)',
      'Menerapkan fungsi kalkulasi statistik dasar dan bersyarat (SUM, AVERAGE, MIN, MAX, COUNTIF, SUMIFS, AVERAGEIF)',
      'Menguasai fungsi logika majemuk (IF, Nested IF, AND, OR) dan manipulasi teks (LEFT, MID, RIGHT, CONCAT, TRIM)',
      'Menerapkan fungsi pencarian dan relasi data (VLOOKUP, XLOOKUP, INDEX-MATCH)',
      'Melakukan manajemen dataset masif: Multi-level Sorting, Auto-Filter, Conditional Formatting, dan Data Validation dropdown',
      'Merancang Pivot Table dan Slicer untuk merangkum ribuan baris data penjualan/produksi dalam hitungan detik'
    ],
    objectives: [
      'Siswa mampu membedakan alamat sel relatif dan absolut untuk mencegah kesalahan pergeseran rumus kalkulasi',
      'Siswa dapat menyusun formula bersyarat majemuk untuk menentukan kelulusan siswa atau status mutu produk APHP',
      'Siswa mampu menghubungkan dua tabel terpisah menggunakan fungsi VLOOKUP dan XLOOKUP secara presisi',
      'Siswa dapat membersihkan data kotor (*data cleaning*) dengan fungsi TRIM, CLEAN, dan fitur Remove Duplicates',
      'Siswa mampu membuat laporan Pivot Table interaktif untuk menganalisis omzet penjualan unit usaha sekolah'
    ],
    summary: 'Penguasaan komprehensif pengolah angka (Excel / Google Sheets): formula statistik, logika IF bertingkat, XLOOKUP relasional, pembersihan data, conditional formatting dinamis, serta otomatisasi Pivot Table.',
    infographicHighlights: [
      { label: 'Siklus Data', text: 'Koleksi → Cleaning → Formula Analisis → Pivot Summary.', icon: 'Layers' },
      { label: 'Referensi Sel', text: 'Relatif A1, Absolut $A$1, dan Campuran untuk kestabilan rumus.', icon: 'Anchor' },
      { label: 'Lookup & Logika', text: 'XLOOKUP, VLOOKUP, INDEX-MATCH, dan Nested IF Bersyarat.', icon: 'Search' },
      { label: 'Pivot Table', text: 'Meringkas 10.000+ baris data menjadi tabel eksekutif kilat.', icon: 'Table' }
    ],
    pertanyaanPemantik: [
      'Mengapa saat sebuah rumus di spreadsheet ditarik ke bawah (auto-fill), angka hasilnya terkadang berubah menjadi error #N/A atau #VALUE!?',
      'Bagaimana sebuah minimarket modern bisa mengetahui produk mana yang paling laris terjual setiap hari Minggu sore di antara 5.000 jenis barang?',
      'Apa yang membedakan data mentah angka biasa dengan informasi strategis yang siap dipakai mengambil keputusan bisnis?'
    ],
    pendahuluan: `Di abad ke-21, ada ungkapan populer: *"Data is the new oil"* (Data adalah minyak bumi baru). Namun, seperti minyak mentah yang tidak bisa langsung dimasukkan ke tangki kendaraan, data mentah yang berantakan tidak ada gunanya sebelum diolah dan disuling menjadi informasi yang bermakna.

Aplikasi pengolah angka (*Spreadsheet*) seperti **Microsoft Excel** dan **Google Sheets** adalah perangkat lunak analisis data paling banyak digunakan di seluruh perkantoran dan industri dunia. 

Bagi siswa SMK—baik di bidang Desain Komunikasi Visual (DKV) untuk menghitung estimasi biaya produksi percetakan, maupun Agribisnis Pengolahan Hasil Pertanian (APHP) untuk menghitung formulasi rendemen bahan baku—kemampuan mengoperasikan rumus logika, lookup, dan Pivot Table adalah keterampilan bernilai tinggi yang wajib dikuasai sebelum memasuki dunia kerja.`,
    konsepInti: `1. **Hierarki Data**: Data (fakta mentah) → Informasi (data terstruktur berpola) → Pengetahuan (informasi yang dipahami konteksnya).
2. **Siklus Analisis Data**: Data Collection → Data Cleaning (TRIM, Hapus Duplikat) → Processing / Modeling → Visualization.
3. **Referensi Sel**: Relatif \`A1\` (bergeser saat disalin), Absolut \`$A$1\` (terkunci dengan tanda dollar), Campuran \`$A1\` atau \`A$1\`.
4. **Fungsi Kunci**: Statistik (\`SUM\`, \`AVERAGE\`, \`COUNTIF\`, \`SUMIFS\`), Logika (\`IF\`, \`AND\`, \`OR\`), Lookup (\`VLOOKUP\`, \`XLOOKUP\`, \`INDEX-MATCH\`), Teks (\`LEFT\`, \`MID\`, \`TRIM\`).
5. **Pivot Table & Data Tools**: Auto-Filter, Conditional Formatting warna sel, Data Validation dropdown list, dan pembuatan Pivot Table ringkasan dinamis.`,
    contentMarkdown: `# BAB 7 — Analisis Data dan Pengolah Angka (Spreadsheet)

## 1. Hierarki Data dan Siklus Pengolahan Data

\`\`\`text
+-------------------------------------------------------------------------------+
|                       PIRAMIDA DIKW (DATA KE WISDOM)                          |
+-------------------------------------------------------------------------------+
|                        [ KEBIJAKSANAAN / WISDOM ]                             |
|                        "Strategi masa depan industri"                         |
|                                     ▲                                         |
|                        [ PENGETAHUAN / KNOWLEDGE ]                            |
|                 "Paham MENGAPA penjualan roti turun di musim hujan"           |
|                                     ▲                                         |
|                        [ INFORMASI / INFORMATION ]                            |
|             "Rata-rata penjualan roti = 150 bungkus/hari (Terolah)"           |
|                                     ▲                                         |
|                              [ DATA MENTAH ]                                  |
|               "Kumpulan angka acak: 12, 150, 45, 88 (Belum diolah)"           |
+-------------------------------------------------------------------------------+
\`\`\`

---

## 2. Alamat Sel: Referensi Relatif vs Absolut ($)

Salah satu konsep paling krusial dalam spreadsheet adalah penguncian alamat sel menggunakan simbol dollar (\`$\`):

\`\`\`text
+-------------------+-------------------+---------------------------------------+
| JENIS REFERENSI   | CONTOH FORMULA    | PERILAKU SAAT DISALIN / AUTO-FILL     |
+-------------------+-------------------+---------------------------------------+
| Relatif           | =A1 * 10%         | Kolom dan baris ikut bergeser bebas   |
+-------------------+-------------------+---------------------------------------+
| Absolut Penuh     | =A1 * $E$1        | Sel E1 TERKUNCI TOTAL (tidak bergeser)|
+-------------------+-------------------+---------------------------------------+
| Campuran Kolom    | =$A1 * 5          | Kolom A terkunci, baris 1 bebas geser |
+-------------------+-------------------+---------------------------------------+
| Campuran Baris    | =A$1 * 5          | Kolom A bebas geser, baris 1 terkunci |
+-------------------+-------------------+---------------------------------------+
\`\`\`

---

## 3. Rumus dan Fungsi Esensial Spreadsheet

### A. Fungsi Statistik Dasar & Bersyarat
* \`=SUM(C2:C20)\` : Menjumlahkan total nilai angka pada rentang C2 sampai C20.
* \`=AVERAGE(D2:D50)\` : Menghitung nilai rata-rata.
* \`=COUNTIF(E2:E100, ">=75")\` : Menghitung berapa banyak siswa yang nilainya tuntas (>= 75).
* \`=SUMIFS(D2:D100, B2:B100, "DKV", C2:C100, "Lunas")\` : Menjumlahkan omzet hanya untuk jurusan DKV yang statusnya Lunas.

### B. Fungsi Logika (IF Majemuk)
\`\`\`excel
=IF(C2>=85, "A", IF(C2>=75, "B", IF(C2>=60, "C", "D")))
\`\`\`

### C. Fungsi Pencarian Cerdas (VLOOKUP & XLOOKUP)
* **VLOOKUP Tradisional**:
  \`\`\`excel
  =VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])
  Contoh: =VLOOKUP(A2, MasterBarang!$A$2:$D$100, 2, FALSE)
  \`\`\`
* **XLOOKUP Modern (Lebih Fleksibel & Cepat)**:
  \`\`\`excel
  =XLOOKUP(A2, MasterBarang!$A$2:$A$100, MasterBarang!$B$2:$B$100, "Tidak Ditemukan")
  \`\`\`

---

## 4. Pembersihan Data (*Data Cleaning*) & Validasi

Sebelum menganalisis data, lakukan tahapan sanitasi:
1. **TRIM**: Menghilangkan spasi ganda yang tidak sengaja terketik (\`=TRIM(A2)\`).
2. **PROPER / UPPER**: Menyeragamkan format huruf besar/kecil (\`=PROPER(A2)\`).
3. **Remove Duplicates**: Menghapus data transaksi ganda melalui menu *Data → Remove Duplicates*.
4. **Data Validation**: Membuat menu pilihan (*Dropdown List*) pada sel agar pengguna tidak salah ketik: *Data → Data Validation → Allow: List*.

---

## 5. Ringkasan Instan dengan Pivot Table

Pivot Table adalah fitur paling revolusioner pada spreadsheet untuk mengelompokkan, memfilter, dan merangkum ribuan baris data transaksi menjadi ringkasan matang tanpa perlu mengetik rumus satu pun!

\`\`\`text
+-------------------------------------------------------------------------------+
|                       ARSITEKTUR 4 BIDANG PIVOT TABLE                         |
+-------------------------------------------------------------------------------+
|                                                                               |
|   [ FILTERS ]                           [ COLUMNS ]                           |
|   (Filter Global: Tahun 2026)           (Kategori: Tunai vs QRIS)             |
|                                                                               |
|   [ ROWS ]                              [ VALUES ]                            |
|   (Baris: Nama Produk / Jurusan)        (Nilai: Sum of Omzet, Count of Item)  |
|                                                                               |
+-------------------------------------------------------------------------------+
\`\`\`

### Fitur Pendukung:
* **Slicer**: Tombol visual interaktif satu klik untuk menyaring data Pivot Table berdasarkan bulan, kategori, atau wilayah penjualan.`,
    contohPenerapan: `1. **Kalkulator Biaya Cetak Brosur DKV**: Siswa DKV merancang template spreadsheet dengan rumus referensi absolut \`$C$1\` (harga tinta per ml) dikalikan luas kertas untuk menghitung otomatis laba kotor percetakan.
2. **Rekap Mutu Sortir Panen APHP**: Siswa APHP menggunakan fungsi \`COUNTIFS\` dan \`AVERAGEIF\` untuk menghitung persentase buah apel grade A, B, dan reject yang masuk ke pabrik pengolahan sari buah.`,
    studiKasus: `**Studi Kasus: Selisih Kas dan Kerugian Laporan Keuangan Kantin**

Bendahara unit produksi menemukan selisih kas Rp 2.500.000 pada buku kas bulanan. Setelah dicek, ternyata kasir mengetik nama barang secara manual dan tidak konsisten (contoh: ada yang mengetik "Jus Apel", "jus apel ", "JUS APEL", dan "Jus Apell"). Akibatnya, rumus \`SUMIF\` gagal mendeteksi total penjualan.

**Solusi Perbaikan**:
1. Gunakan \`=TRIM(UPPER(A2))\` untuk menyeragamkan nama produk.
2. Terapkan fitur **Data Validation Dropdown** agar kasir hanya bisa memilih nama barang dari daftar resmi tanpa mengetik manual.
3. Hubungkan kode barcode kasir ke tabel harga menggunakan rumus \`XLOOKUP\` dengan referensi absolut.`,
    aktivitasSiswa: `**Praktik Lab Spreadsheet: Master Data & Pivot Table**
1. Buka spreadsheet baru (Excel atau Google Sheets).
2. Buat tabel transaksi penjualan kantin sekolah sebanyak 20 baris dengan kolom: Tanggal, Nama Kasir, Nama Produk, Kategori (Makanan/Minuman), Jumlah Terjual, Harga Satuan, dan Total Omzet.
3. Gunakan rumus \`=Jumlah * Harga\` dan buat kolom Diskon dengan fungsi \`IF\` (jika omzet > 50.000 diskon 10%).
4. Buatlah sebuah **Pivot Table** di sheet baru untuk menampilkan total omzet berdasarkan Kategori Produk dan Nama Kasir!`,
    tipsPraktis: [
      'Selalu tekan tombol \`F4\` pada keyboard saat menulis rumus di Excel untuk otomatis menambahkan tanda dollar ($) penguncian sel absolut.',
      'Gunakan fitur *Conditional Formatting → Color Scales* untuk memberi warna otomatis hijau pada angka tertinggi dan merah pada angka terendah.',
      'Kunci judul tabel (*Freeze Panes*) agar baris header tetap terlihat saat kamu menggulir ribuan data ke bawah.'
    ],
    kesalahanUmum: [
      'Lupa mengunci tabel master dengan tanda absolut \`$\` saat menggunakan rumus VLOOKUP sehingga tabelnya bergeser dan memicu error #N/A.',
      'Menggabungkan angka dan teks dalam satu sel (contoh: mengetik "50 kg" alih-alih angka 50 murni) sehingga sel tersebut tidak bisa dihitung oleh rumus matematika.',
      'Melakukan perhitungan persentase secara manual alih-alih memanfaatkan format sel persentase (%).'
    ],
    rangkuman: `• Data mentah bertransformasi menjadi Informasi dan Pengetahuan melalui siklus pengumpulan, pembersihan, pengolahan, dan visualisasi.
• Tanda dollar ($) mengunci referensi sel menjadi Absolut ($A$1) agar tidak bergeser saat formula disalin.
• Fungsi statistik bersyarat (COUNTIF, SUMIFS) dan logika (Nested IF) memungkinkan otomatisasi evaluasi data.
• VLOOKUP dan XLOOKUP menghubungkan data lintas tabel relasional secara presisi.
• Pivot Table dan Slicer menyederhanakan agregasi ribuan baris data transaksi dalam hitungan detik.`,
    refleksi: [
      'Formula spreadsheet manakah yang menurutmu paling powerful dan paling memudahkan pekerjaan sehari-harimu?',
      'Bagaimana pemanfaatan spreadsheet dapat membantumu mengelola keuangan saku pribadi secara disiplin?'
    ],
    latihanPemahaman: [
      '1. Jelaskan perbedaan mendasar antara alamat sel Relatif, Absolut, dan Campuran beserta contohnya!',
      '2. Tuliskan formula fungsi `IF` bertingkat untuk menentukan predikat nilai: >=90 (A), >=80 (B), >=70 (C), <70 (D)!',
      '3. Apa keunggulan fungsi `XLOOKUP` dibandingkan fungsi `VLOOKUP` tradisional?',
      '4. Jelaskan 4 bidang utama (Filter, Column, Row, Value) dalam perancangan Pivot Table!'
    ],
    tugasPraktik: `**Tugas Proyek: Laporan Keuangan Unit Usaha Siswa**
Buatlah file spreadsheet (.xlsx) lengkap yang memuat:
1. Sheet 1: Master Data Barang dengan Validasi Dropdown dan tabel harga.
2. Sheet 2: Tabel Transaksi Kasir (minimal 30 baris transaksi) menggunakan rumus \`XLOOKUP\`, \`SUMIFS\`, dan format mata uang Rupiah (Rp).
3. Sheet 3: Pivot Table ringkasan omzet per kategori produk dilengkapi Slicer filter interaktif.
Kumpulkan file spreadsheet (\`AD1_NAMA_KELAS.xlsx\`) ke Google Classroom!`,
    asesmen: [
      {
        question: 'Simbol yang digunakan untuk mengunci alamat kolom atau baris pada rumus spreadsheet agar tidak bergeser saat di-copy adalah...',
        options: ['Simbol Dollar ($)', 'Simbol Pagar (#)', 'Simbol Dan (&)', 'Simbol Persen (%)'],
        answerIndex: 0,
        explanation: 'Simbol dollar ($) digunakan untuk membuat referensi sel absolut (misal: $A$1).'
      },
      {
        question: 'Fungsi statistik yang digunakan untuk menghitung jumlah sel yang memenuhi kriteria tertentu (misal menghitung berapa siswa yang nilainya di atas 75) adalah...',
        options: ['COUNTIF', 'SUMIF', 'AVERAGE', 'MAX'],
        answerIndex: 0,
        explanation: 'COUNTIF menghitung frekuensi kemunculan data yang sesuai dengan satu syarat/kriteria tertentu.'
      },
      {
        question: 'Fungsi teks pada spreadsheet yang berguna untuk menghapus spasi ganda yang tidak sengaja terketik di awal, tengah, atau akhir kalimat adalah...',
        options: ['TRIM', 'CLEAN', 'LEN', 'CONCAT'],
        answerIndex: 0,
        explanation: 'Fungsi TRIM membersihkan seluruh spasi berlebih pada teks kecuali spasi tunggal antar kata.'
      },
      {
        question: 'Fitur pada spreadsheet yang memungkinkan pengguna membuat pilihan menu tarik-turun (dropdown) pada sel untuk mencegah salah ketik adalah...',
        options: ['Data Validation (Validasi Data)', 'Conditional Formatting', 'Remove Duplicates', 'Freeze Panes'],
        answerIndex: 0,
        explanation: 'Data Validation membatasi input pengguna dengan pilihan daftar nilai resmi (List).'
      },
      {
        question: 'Fitur spreadsheet yang paling tepat digunakan untuk meringkas, mengelompokkan, dan menganalisis ribuan baris data penjualan menjadi tabel laporan eksekutif secara instan adalah...',
        options: ['Pivot Table', 'WordArt', 'Goal Seek', 'AutoCorrect'],
        answerIndex: 0,
        explanation: 'Pivot Table adalah alat analitik spreadsheet terkuat untuk agregasi dan rekapitulasi data massal.'
      },
      {
        question: 'Pesan kesalahan `#DIV/0!` pada sel lembar kerja spreadsheet menandakan...',
        options: ['Rumus mencoba membagi suatu bilangan dengan angka 0 atau sel kosong', 'Alamat sel yang direferensikan telah terhapus', 'Teks rumus salah ketik nama fungsi', 'Kolom sel kurang lebar'],
        answerIndex: 0,
        explanation: 'Error #DIV/0! muncul saat operasi pembagian memiliki pembagi bernilai nol (0).'
      },
      {
        question: 'Pesan kesalahan `#N/A` pada fungsi pencarian `VLOOKUP` atau `XLOOKUP` terjadi karena...',
        options: ['Nilai kata kunci yang dicari tidak ditemukan dalam tabel referensi sumber', 'Komputer kehabisan memori RAM', 'Format tanggal salah', 'Huruf kapital tidak cocok'],
        answerIndex: 0,
        explanation: '#N/A (Not Available) menandakan nilai lookup yang dicari tidak ada dalam tabel rentang pencarian.'
      },
      {
        question: 'Pesan tampilan `#####` pada seluruh sel angka spreadsheet terjadi karena...',
        options: ['Lebar kolom terlalu sempit untuk menampilkan angka/tanggal secara utuh', 'Rumus mengalami error fatal', 'Data telah dienkripsi dengan password', 'Printer belum terhubung'],
        answerIndex: 0,
        explanation: 'Karakter pagar pagar (#####) menandakan kolom kurang lebar, cukup lebarkan kolom untuk melihat angkanya.'
      },
      {
        question: 'Kelebihan utama fungsi `XLOOKUP` modern dibandingkan `VLOOKUP` klasik adalah...',
        options: [
          'Dapat mencari data ke arah kiri maupun kanan tabel secara fleksibel tanpa perlu menghitung nomor urut kolom manual',
          'Hanya bisa mencari angka di bawah 100',
          'Tidak membutuhkan tanda kurung buka dan tutup',
          'Mengubah format sel secara otomatis menjadi bold'
        ],
        answerIndex: 0,
        explanation: 'XLOOKUP mengatasi keterbatasan VLOOKUP dengan mendukung pencarian dua arah (kiri/kanan) dan nilai default jika data tidak ditemukan.'
      },
      {
        question: 'Fungsi logika yang digunakan untuk menangani pesan error sehingga tampilan sel tetap rapi (misalnya menampilkan angka 0 atau teks "Data Kosong") adalah...',
        options: ['IFERROR', 'IFBLANK', 'ISNUMBER', 'ERROR.TYPE'],
        answerIndex: 0,
        explanation: 'Fungsi `IFERROR(rumus, nilai_jika_error)` menangkap dan mengganti pesan error dengan teks/nilai alternatif yang ramah.'
      },
      {
        question: 'Jika rumus di sel C1 tertulis `=$A$1 + B1` kemudian sel C1 disalin (copy-paste) ke sel C2, maka rumus di sel C2 akan menjadi...',
        options: ['=$A$1 + B2', '=$A$2 + B2', '=$A$1 + B1', '=A1 + B2'],
        answerIndex: 0,
        explanation: 'Bagian `$A$1` terkunci absolut sehingga tidak bergeser, sedangkan `B1` bersifat relatif sehingga otomatis bergeser menjadi `B2`.'
      },
      {
        question: 'Fungsi spreadsheet yang digunakan untuk menjumlahkan nilai sel dengan BANYAK kriteria secara bersamaan (multi-criteria) adalah...',
        options: ['SUMIFS', 'SUMIF', 'COUNTIFS', 'AVERAGEIF'],
        answerIndex: 0,
        explanation: 'SUMIFS mampu menjumlahkan nilai numerik dengan menerapkan lebih dari satu kriteria filter kondisi.'
      },
      {
        question: 'Fungsi teks untuk mengubah huruf pertama setiap kata menjadi huruf kapital dan sisanya huruf kecil (contoh: "agribisnis pengolahan" menjadi "Agribisnis Pengolahan") adalah...',
        options: ['PROPER', 'UPPER', 'LOWER', 'CAPITALIZE'],
        answerIndex: 0,
        explanation: 'Fungsi PROPER mengonversi teks menjadi format Title Case (huruf besar di setiap awal kata).'
      },
      {
        question: 'Fungsi teks yang digunakan untuk menggabungkan isi teks dari beberapa sel menjadi satu rangkaian teks utuh adalah...',
        options: ['CONCATENATE / TEXTJOIN (atau operator &)', 'SPLIT', 'SUBSTITUTE', 'FIND'],
        answerIndex: 0,
        explanation: 'Fungsi CONCATENATE, TEXTJOIN, atau simbol operator `&` menggabungkan beberapa string teks menjadi satu.'
      },
      {
        question: 'Fungsi untuk mengambil 4 karakter paling kiri dari teks kode produk "PROD-2026-X" di sel A1 adalah...',
        options: ['=LEFT(A1, 4)', '=RIGHT(A1, 4)', '=MID(A1, 1, 4)', '=LEN(A1)'],
        answerIndex: 0,
        explanation: 'Fungsi `LEFT(teks, jumlah_karakter)` mengekstrak karakter dari posisi awal paling kiri.'
      },
      {
        question: 'Fungsi untuk menghitung jumlah total karakter (termasuk spasi dan tanda baca) pada sebuah sel teks adalah...',
        options: ['LEN', 'COUNT', 'CHAR', 'EXACT'],
        answerIndex: 0,
        explanation: 'Fungsi LEN (Length) menghitung panjang total karakter string pada sel yang dipilih.'
      },
      {
        question: 'Fitur spreadsheet yang memberi warna latar sel secara otomatis jika memenuhi kondisi tertentu (misal mewarnai merah sel nilai < 75) dinamakan...',
        options: ['Conditional Formatting', 'AutoFormat', 'Cell Styler', 'Highlighter Brush'],
        answerIndex: 0,
        explanation: 'Conditional Formatting memformat tampilan sel secara dinamis berdasarkan nilai atau rumus evaluasi logika.'
      },
      {
        question: 'Fitur pada spreadsheet yang digunakan untuk mengunci baris judul kolom di bagian paling atas agar tetap terlihat saat lembar kerja digulir ke bawah adalah...',
        options: ['Freeze Panes (Freeze Top Row)', 'Split Window', 'Hide Rows', 'Lock Worksheet'],
        answerIndex: 0,
        explanation: 'Freeze Panes mengunci baris atau kolom tertentu agar posisinya tetap statis saat bernavigasi menelusuri ribuan baris data.'
      },
      {
        question: 'Fungsi statistik yang digunakan untuk mencari nilai data yang paling sering muncul (modus) dalam sekelompok angka adalah...',
        options: ['MODE', 'MEDIAN', 'AVERAGE', 'STDEV'],
        answerIndex: 0,
        explanation: 'Fungsi MODE mengembalikan nilai yang memiliki frekuensi kemunculan paling tinggi dalam dataset.'
      },
      {
        question: 'Fungsi untuk mencari nilai median (nilai tengah dari data yang telah diurutkan) adalah...',
        options: ['MEDIAN', 'AVERAGE', 'MODE', 'QUARTILE'],
        answerIndex: 0,
        explanation: 'Fungsi MEDIAN menghitung titik nilai tengah dari kumpulan data berurutan.'
      },
      {
        question: 'Kombinasi rumus pencarian lanjutan dua arah yang sangat andal dan fleksibel sebagai alternatif VLOOKUP adalah kombinasi fungsi...',
        options: ['INDEX dan MATCH', 'FIND dan SEARCH', 'OFFSET dan SUM', 'CHOOSE dan IF'],
        answerIndex: 0,
        explanation: 'Kombinasi INDEX (mengambil nilai posisi) dan MATCH (mencari nomor baris/kolom) sangat fleksibel untuk lookup multidimensi.'
      },
      {
        question: 'Fitur visual pada Pivot Table yang menyediakan tombol-tombol filter interaktif sekali-klik untuk menyaring data laporan dinamakan...',
        options: ['Slicer', 'Timeline', 'Sparkline', 'Macro'],
        answerIndex: 0,
        explanation: 'Slicer menyajikan tombol filter grafis intuitif yang memudahkan pemilahan data pada Pivot Table dan Dashboard.'
      },
      {
        question: 'Tahapan proses pembersihan data mentah (Data Cleaning) sebelum dianalisis mencakup tindakan berikut, KECUALI...',
        options: ['Menghapus duplikasi baris, memperbaiki spasi liar, dan menyeragamkan format tanggal', 'Mengganti semua data yang tidak disukai dengan angka karangan sendiri', 'Memvalidasi tipe data angka agar tidak terbaca sebagai teks', 'Menangani nilai kosong atau hilang (missing values) secara sistematis'],
        answerIndex: 1,
        explanation: 'Memanipulasi data dengan angka karangan melanggar etika integritas data dan membuat hasil analisis menjadi salah fatal.'
      },
      {
        question: 'Dalam manajemen data lab APHP, jika sel A1 berisi kadar air "14.5%" dan sel B1 berisi batas standar "15.0%", rumus logika untuk menghasilkan status "Lolos" atau "Afkir" adalah...',
        options: ['=IF(A1 <= B1, "Lolos", "Afkir")', '=IF(A1 > B1, "Lolos", "Afkir")', '=COUNTIF(A1, "Lolos")', '=VLOOKUP(A1, B1, 1)'],
        answerIndex: 0,
        explanation: 'Karena kadar air di bawah batas standar adalah kondisi yang diinginkan, maka `IF(A1 <= B1, "Lolos", "Afkir")` adalah rumus yang benar.'
      },
      {
        question: 'Untuk menghitung rata-rata pendapatan penjualan kaos jurusan DKV pada bulan Agustus saja dari tabel transaksi tahunan, fungsi yang paling tepat digunakan adalah...',
        options: ['AVERAGEIF', 'AVERAGE', 'COUNTIF', 'SUM'],
        answerIndex: 0,
        explanation: 'Fungsi AVERAGEIF menghitung nilai mean hanya untuk baris-baris data yang memenuhi kriteria bulan "Agustus".'
      },
      {
        question: 'Kombinasi tombol pintas pada keyboard Windows untuk mengaktifkan filter otomatis (AutoFilter) pada tabel data spreadsheet dengan cepat adalah...',
        options: ['Ctrl + Shift + L', 'Ctrl + F', 'Ctrl + Alt + V', 'Alt + F4'],
        answerIndex: 0,
        explanation: 'Ctrl + Shift + L mengaktifkan atau menonaktifkan tombol dropdown filter pada baris header tabel data.'
      },
      {
        question: 'Fungsi spreadsheet yang digunakan untuk menghasilkan tanggal hari ini secara otomatis yang selalu ter-update setiap kali file dibuka adalah...',
        options: ['=TODAY()', '=NOW()', '=DATE()', '=DAY()'],
        answerIndex: 0,
        explanation: 'Fungsi `TODAY()` mengembalikan tanggal sistem hari ini tanpa komponen jam, sedangkan `NOW()` menyertakan jam/menit/detik.'
      },
      {
        question: 'Perbedaan mendasar antara format sel `Currency` dan `Accounting` pada angka nominal uang di spreadsheet adalah...',
        options: [
          'Format Accounting menyejajarkan simbol mata uang (Rp) rata kiri dan angka rata kanan secara rapi serta menampilkan angka nol sebagai tanda strip (-)',
          'Format Currency tidak bisa menggunakan lambang Rp',
          'Format Accounting hanya berlaku untuk mata uang Dolar',
          'Kedua format memiliki tampilan yang sama persis'
        ],
        answerIndex: 0,
        explanation: 'Format Accounting mengunci simbol mata uang di sisi paling kiri kolom sel dan menampilkan saldo 0 sebagai tanda hubung (-).'
      },
      {
        question: 'Fungsi `COUNTA` berbeda dengan fungsi `COUNT` biasa karena `COUNTA` berfungsi untuk...',
        options: ['Menghitung semua sel yang tidak kosong (berisi angka, teks, maupun simbol)', 'Hanya menghitung sel yang berisi angka numerik', 'Menghitung sel yang berwarna merah', 'Menghitung rata-rata nilai siswa'],
        answerIndex: 0,
        explanation: 'COUNT hanya menghitung sel bernilai numerik, sedangkan COUNTA menghitung seluruh sel non-kosong terlepas dari tipe datanya.'
      },
      {
        question: 'Mengapa keterampilan analisis data menggunakan spreadsheet merupakan kompetensi inti wajib bagi seluruh lulusan SMK?',
        options: [
          'Karena efisiensi pencatatan transaksi, kalkulasi biaya produksi, dan pengambilan keputusan berbasis data di dunia industri modern bergantung pada spreadsheet',
          'Hanya agar siswa bisa mengisi waktu luang di lab komputer',
          'Supaya siswa tidak perlu lagi belajar matematika dasar',
          'Agar siswa bisa mencetak tabel kosong di kertas'
        ],
        answerIndex: 0,
        explanation: 'Literasi data spreadsheet merupakan keterampilan universal yang mutlak diperlukan untuk administrasi, kontrol mutu, dan operasional bisnis.'
      }
    ],
    asesmenUraian: [
      'Jelaskan mengapa data harus dibersihkan (Data Cleaning) terlebih dahulu sebelum dilakukan pembuatan rumus analisis dan grafik!',
      'Uraikan perbedaan fungsi antara SUMIF (satu kriteria) dan SUMIFS (banyak kriteria) beserta contoh studi kasusnya!'
    ],
    rubrikPenilaian: [
      {
        kriteria: 'Ketepatan Rumus & Formula',
        skor4: 'Seluruh rumus (Lookup, Logika IF, Statistik) menggunakan sintaks dan referensi absolut ($) yang 100% benar.',
        skor3: 'Rumus benar namun ada 1 kesalahan penempatan tanda kurung atau pemisah koma.',
        skor2: 'Sebagian besar rumus menghasilkan error #N/A atau #VALUE!.',
        skor1: 'Tidak menggunakan rumus formula spreadsheet.'
      },
      {
        kriteria: 'Desain Pivot Table & Validasi',
        skor4: 'Pivot table tertata sangat rapi, menggunakan slicer interaktif, dan format mata uang/angka konsisten.',
        skor3: 'Pivot table berhasil dibuat namun belum dilengkapi filter slicer.',
        skor2: 'Desain tabel berantakan dan data validation belum aktif.',
        skor1: 'Tidak mengumpulkan lembar kerja Pivot Table.'
      }
    ],
    glosarium: [
      { term: 'Spreadsheet', definition: 'Aplikasi lembar kerja elektronik berbasis baris dan kolom untuk pengolahan angka dan data.' },
      { term: 'Cell Reference', definition: 'Alamat penunjuk lokasi sel (misal: B5) yang digunakan dalam perhitungan rumus.' },
      { term: 'VLOOKUP / XLOOKUP', definition: 'Fungsi pencarian vertikal untuk mengambil data dari tabel referensi lain berdasarkan kunci pencarian tertentu.' },
      { term: 'Data Cleaning', definition: 'Proses mendeteksi dan mengoreksi data yang rusak, tidak akurat, atau duplikat dari dataset.' },
      { term: 'Pivot Table', definition: 'Tabel interaktif yang merangkum data dalam jumlah besar dengan opsi rotasi baris dan kolom.' }
    ],
    sumberReferensi: [
      'Walkenbach, J. (2015). Microsoft Excel 2019 Bible. Wiley.',
      'Alexander, M., & Kusleika, D. (2019). Excel Data Analysis: Your Visual Blueprint for Creating and Analyzing Data, Charts and PivotTables. Visual.',
      'Kemendikbudristek (2021). Buku Siswa Informatika Kelas X. Pusat Perbukuan.',
      'Microsoft Support (2024). Excel Functions and Formulas Documentation Guide.'
    ]
  },

  // =========================================================================
  // BAB 8: VISUALISASI DATA DAN PENGAMBILAN KEPUTUSAN
  // =========================================================================
  {
    id: 'AD-2',
    elementId: 'AD',
    elementName: 'Analisis Data',
    moduleNumber: 2,
    bab: 'BAB 8 — Visualisasi Data dan Pengambilan Keputusan',
    pertemuan: 13,
    fase: 'Fase E (Kelas X SMK)',
    title: 'Visualisasi Data Grafis, Desain Dashboard Interaktif, dan Pengambilan Keputusan Berbasis Data',
    estimatedTimeMinutes: 90,
    difficulty: 'Menengah',
    competencies: [
      'Memahami esensi visualisasi data dalam mentransformasikan data tabular menjadi wawasan visual (*insights*) yang mudah dipahami',
      'Menerapkan prinsip visualisasi efektif: akurasi skala sumbu, kontras hierarki warna, dan eliminasi elemen pengganggu (*chartjunk*)',
      'Memilih tipe grafik yang tepat: Bar/Column Chart, Line Chart (tren waktu), Pie/Donut Chart (komposisi proporsi), Scatter Plot (korelasi), dan Histogram (distribusi)',
      'Merancang anatomi grafik profesional: judul informatif, label sumbu X/Y bersatuan, legenda jelas, dan data labels',
      'Membangun Dashboard Interaktif sederhana pada spreadsheet dengan Scorecards/KPI Cards dan Slicer interaktif',
      'Menerapkan seni bercerita berbasis data (*Storytelling with Data*) untuk mempresentasikan rekomendasi solusi bisnis/sekolah'
    ],
    objectives: [
      'Siswa mampu memilih tipe grafik yang paling tepat untuk menyajikan data sesuai dengan matriks pemilihan chart',
      'Siswa dapat merancang grafik yang mematuhi prinsip etika visualisasi tanpa memotong skala sumbu (*misleading graph*)',
      'Siswa mampu membangun dashboard 1 halaman (*one-page executive dashboard*) pada spreadsheet',
      'Siswa dapat menyusun narasi presentasi temuan data (*Storytelling with Data*) yang menonjolkan poin kritis',
      'Siswa mampu mengambil keputusan berbasis bukti data (*Data-Driven Decision Making*) untuk memecahkan masalah kejuruan'
    ],
    summary: 'Seni visualisasi dan storytelling data: pemilihan matriks chart tepat, perancangan anatomi grafik bebas bias, pembuatan dashboard KPI interaktif, serta implementasi pengambilan keputusan berbasis bukti data empiris.',
    infographicHighlights: [
      { label: 'Chart Chooser', text: 'Bar (Komparasi), Line (Tren Waktu), Pie (Proporsi), Scatter (Korelasi).', icon: 'BarChart3' },
      { label: 'Anatomi Visual', text: 'Skala sumbu presisi, kontras warna, dan bebas distorsi chartjunk.', icon: 'PieChart' },
      { label: 'Dashboard Interaktif', text: 'Kartu KPI ringkasan, multi-chart, dan slicer penyaring instan.', icon: 'LayoutDashboard' },
      { label: 'Storytelling Data', text: 'Mengubah angka menjadi narasi insight & rekomendasi strategis.', icon: 'Presentation' }
    ],
    pertanyaanPemantik: [
      'Mengapa deretan 500 baris angka di tabel spreadsheet terasa membosankan, tetapi ketika diubah menjadi grafik garis berwarna langsung membuat pimpinan paham arah tren penjualan?',
      'Kapan sebuah diagram lingkaran (Pie Chart) menjadi pilihan yang buruk dan menyesatkan bagi pembaca?',
      'Bagaimana sebuah grafik visual bisa dimanipulasi oleh pihak tidak bertanggung jawab untuk menyebarkan berita bohong (*misleading chart*)?'
    ],
    pendahuluan: `Otak manusia dirancang untuk memproses visual 60.000 kali lebih cepat dibandingkan teks atau angka mentah. Ketika kita melihat deretan ribuan baris spreadsheet, mata kita cepat lelah. Namun, ketika data tersebut divisualisasikan dengan tepat, pola tersembunyi, anomali, dan tren masa depan seketika terlihat dengan sangat gamblang.

**Visualisasi Data (*Data Visualization*)** adalah jembatan antara analisis angka kuantitatif dengan pengambilan keputusan kualitatif manusia. Visualisasi yang buruk akan membingungkan atau bahkan menyesatkan (*misleading*). Sebaliknya, visualisasi yang dirancang dengan prinsip estetika desain DKV dan ketepatan data ilmiah akan menjadi alat komunikasi yang sangat persuasif.

Modul ini membekali siswa SMK untuk menguasai seni memilih grafik yang tepat, merancang dasbor eksekutif interaktif, dan menyajikan cerita berbasis data (*Storytelling with Data*) untuk meyakinkan audiens.`,
    konsepInti: `1. **Matriks Pemilihan Grafik (Chart Chooser)**:
   - *Komparasi*: Bar / Column Chart.
   - *Tren Waktu*: Line Chart / Area Chart.
   - *Proporsi Bagian*: Pie / Donut Chart (Maksimal 5-7 irisan).
   - *Korelasi Hubungan*: Scatter Plot (Titik sebar).
   - *Distribusi Frekuensi*: Histogram.
2. **Prinsip Anti-Misleading**: Sumbu Y wajib dimulai dari angka 0 (nol) untuk grafik batang; hindari efek 3D berlebihan yang mendistorsi perspektif ukuran.
3. **Anatomi Grafik**: Judul Berita (*Headline Title*), Sumbu X & Y dengan satuan unit, Data Label penting, dan Palet Warna Kontras.
4. **Dashboard Eksekutif**: KPI Metric Cards + Multi-Chart + Filter Slicer Interaktif dalam 1 layar pandang.
5. **Data Storytelling**: Konteks Masalah → Temuan Titik Kritis → Bukti Data Visual → Rekomendasi Solusi Nyata.`,
    contentMarkdown: `# BAB 8 — Visualisasi Data dan Pengambilan Keputusan

## 1. Matriks Pemilihan Grafik Sesuai Tujuan Komunikasi

\`\`\`text
+-------------------------------------------------------------------------------+
|                       MATRIKS PEMILIHAN GRAFIK (CHART CHOOSER)                |
+---------------------+-------------------------+-------------------------------+
| TUJUAN KOMUNIKASI   | JENIS GRAFIK REKOMENDASI| CONTOH KASUS PENERAPAN        |
+---------------------+-------------------------+-------------------------------+
| 1. Perbandingan     | Column Chart /          | Membandingkan omzet penjualan |
|    Antar Kategori   | Bar Chart Horizontal    | 5 produk olahan pangan APHP   |
+---------------------+-------------------------+-------------------------------+
| 2. Perubahan Tren   | Line Chart              | Grafik fluktuasi suhu mesin   |
|    dari Waktu       | (Diagram Garis)         | pengering selama 24 jam       |
+---------------------+-------------------------+-------------------------------+
| 3. Komposisi /      | Donut Chart /           | Persentase pangsa pasar (max  |
|    Bagian dari 100% | Pie Chart 2D            | 5 irisan proporsional)        |
+---------------------+-------------------------+-------------------------------+
| 4. Korelasi Antara  | Scatter Plot            | Hubungan antara biaya iklan   |
|    Dua Variabel     | (Diagram Titik Tebar)   | medsos dengan jumlah followers|
+---------------------+-------------------------+-------------------------------+
| 5. Distribusi Nilai | Histogram               | Sebaran rentang nilai ujian   |
|                     |                         | siswa (0-50, 51-75, 76-100)   |
+---------------------+-------------------------+-------------------------------+
\`\`\`

---

## 2. Prinsip Desain Visualisasi yang Baik vs Menyesatkan (*Misleading*)

\`\`\`text
+------------------------------------+------------------------------------------+
| PRAKTIK TERBAIK (GOOD DESIGN)      | BAHAYA MISLEADING (HINDARI!)             |
+------------------------------------+------------------------------------------+
| • Sumbu Y mulai dari angka 0       | • Memotong sumbu Y (misal mulai dari 80) |
|   untuk perbandingan jujur.        |   sehingga perbedaan kecil tampak masif. |
| • Gunakan desain 2D datar bersih.  | • Menggunakan efek 3D miring yang        |
|                                    |   mendistorsi ukuran irisan pie chart.   |
| • Warna kontras hanya untuk fokus. | • Menggunakan terlalu banyak warna warni |
|                                    |   pelangi yang membingungkan mata.       |
| • Batasi Pie Chart max 5-7 irisan. | • Membuat Pie Chart dengan 20 irisan tipis|
+------------------------------------+------------------------------------------+
\`\`\`

---

## 3. Anatomi Lengkap Grafik Standar Profesional

\`\`\`text
+-------------------------------------------------------------------------------+
| Tren Pertumbuhan Penjualan Jus Kemasan Semester I 2026   <-- Judul Informatif |
| (Dalam Ribuan Botol)                                     <-- Satuan Unit Sumbu|
|                                                                               |
| 100 ┼                                              ● 92.5k  <-- Data Label    |
|     │                                         /                               |
|  75 ┼                                  ● 68k                                  |
|     │                            /                                            |
|  50 ┼                     ● 45k                                               |
|     │               /                                                         |
|  25 ┼         ● 20k                                                           |
|     │    /                                                                    |
|   0 └───┴───────────┴───────────┴───────────┴───────────>                     |
|        Jan         Feb         Mar         Apr            <-- Sumbu X (Waktu) |
+-------------------------------------------------------------------------------+
\`\`\`

---

## 4. Membangun Dashboard Interaktif 1 Halaman (*One-Page Dashboard*)

Dashboard adalah kumpulan visualisasi data terkonsentrasi yang memungkinkan pemangku kepentingan (*stakeholders*) memantau indikator kinerja utama (*Key Performance Indicators / KPI*) secara cepat.

### Komponen Utama Dashboard:
1. **Kartu Skor KPI (*Scorecards*)**: Kotak ringkasan angka besar di bagian atas (contoh: *Total Omzet: Rp 125.000.000*, *Total Unit Terjual: 4.500 botol*, *Tingkat Kepuasan: 98%*).
2. **Area Grafik Utama**: 2 atau 3 grafik yang saling melengkapi (Grafik Tren Garis + Grafik Batang Kategori).
3. **Panel Kontrol Slicer**: Tombol filter interaktif yang jika diklik akan otomatis mengubah seluruh tampilan grafik dashboard secara serentak.

---

## 5. Bercerita dengan Data (*Storytelling with Data*) & Pengambilan Keputusan

Angka dan grafik yang indah tidak akan menghasilkan tindakan nyata tanpa narasi yang kuat. Gunakan struktur 4 babak:

1. **Konteks & Latar Belakang**: Apa masalah nyata yang sedang dihadapi sekolah atau industri?
2. **Temuan Kritis (*The Climax*)**: Bagian data mana yang menunjukkan anomali atau penurunan kinerja drastis?
3. **Analisis Akar Masalah**: Mengapa hal tersebut bisa terjadi berdasarkan korelasi data?
4. **Rekomendasi Keputusan (*Actionable Next Step*)**: Keputusan konkret apa yang harus segera diambil pimpinan besok pagi?`,
    contohPenerapan: `1. **Dashboard Penjualan Merchandise DKV**: Tim kreatif DKV membuat dashboard Google Sheets yang memantau penjualan kaos sablon, gantungan kunci, dan tote bag lengkap dengan slicer filter per bulan.
2. **Grafik Kendali Mutu Fermentasi APHP**: Laboratorium APHP menggunakan Line Chart harian untuk memantau suhu dan tingkat keasaman (pH) selama proses fermentasi tempe agar tidak terjadi kegagalan batch.`,
    studiKasus: `**Studi Kasus: Menyelamatkan Produk Minuman yang Merugi**

Unit produksi pangan APHP SMK memproduksi 3 varian minuman sari buah: Sari Apel, Sari Nanas, dan Sari Jambu. Manajemen sekolah berencana menutup seluruh lini produksi minuman karena total laba unit menurun.
Namun, siswa Informatika melakukan visualisasi data penjualan 6 bulan:
- **Grafik Batang Kategori**: Sari Apel dan Sari Nanas menghasilkan margin laba 45% dan selalu habis terjual.
- **Grafik Tren Garis**: Sari Jambu menyumbang 80% dari total biaya operasional tetapi hanya terjual 5% karena kemasan mudah bocor.

**Keputusan Berbasis Data**:
Sekolah tidak jadi menutup seluruh lini produksi, melainkan hanya menghentikan varian Sari Jambu dan melipatgandakan produksi Sari Apel. Hasilnya, laba bersih unit produksi melonjak 120% pada bulan berikutnya!`,
    aktivitasSiswa: `**Praktik Lab Visualisasi: Data Storytelling Challenge**
1. Buka dataset hasil penjualan atau nilai siswa dari tugas Bab 7 sebelumnya.
2. Buatlah 3 jenis grafik yang tepat:
   - 1 Grafik Batang (Column Chart) untuk perbandingan kategori.
   - 1 Grafik Garis (Line Chart) untuk tren waktu.
   - 1 Donut Chart untuk proporsi pangsa pasar.
3. Susun ketiganya dalam 1 lembar dashboard rapi dengan menambahkan 2 Kartu Skor KPI di bagian atas.
4. Tuliskan 2 paragraf rekomendasi keputusan bisnis berdasarkan grafik yang kamu buat!`,
    tipsPraktis: [
      'Gunakan warna abu-abu netral untuk batang grafik biasa, dan gunakan 1 warna cerah (seperti biru atau merah) hanya untuk menyorot kategori data yang ingin kamu tekankan.',
      'Beri judul grafik berupa kalimat kesimpulan (contoh: *"Penjualan Jus Apel Melonjak 40% di Bulan Mei"*, bukan sekadar *"Grafik Penjualan"*).',
      'Hindari penggunaan Pie Chart jika memiliki lebih dari 7 kategori atau jika perbedaan antar persentase sangat tipis.'
    ],
    kesalahanUmum: [
      'Memilih grafik 3D yang membuat sudut pandang terdistorsi dan sulit dibaca secara akurat.',
      'Tidak mencantumkan label satuan pada sumbu X atau sumbu Y sehingga pembaca tidak tahu apakah angka tersebut dalam satuan Kilogram, Ribuan Rupiah, atau Persen.',
      'Menampilkan terlalu banyak grafik dalam satu halaman sehingga dashboard menjadi padat dan membingungkan (*cognitive overload*).'
    ],
    rangkuman: `• Visualisasi data mentransformasikan angka tabel menjadi insight visual yang cepat dicerna otak manusia.
• Matriks chart memilih: Bar (komparasi), Line (tren waktu), Pie/Donut (proporsi 100%), Scatter (korelasi), dan Histogram (distribusi).
• Grafik yang etis wajib menjaga akurasi skala sumbu dan menghindari manipulasi 3D.
• Dashboard interaktif menggabungkan Kartu Skor KPI, visualisasi grafis, dan Slicer satu klik.
• Data Storytelling menghubungkan temuan visual dengan rekomendasi keputusan bisnis empiris (*Data-Driven Decision Making*).`,
    refleksi: [
      'Pernahkah kamu melihat grafik di televisi atau media sosial yang tampak sengaja dibuat untuk melebih-lebihkan suatu berita?',
      'Bagaimana keterampilan mendesain dashboard data dapat membantumu saat bekerja di kantor atau menjalankan bisnis wirausaha mandiri?'
    ],
    latihanPemahaman: [
      '1. Kapan kita sebaiknya menggunakan Line Chart dan kapan sebaiknya menggunakan Column Chart?',
      '2. Mengapa grafik batang 3D miring dan pemotongan sumbu Y dari angka non-nol dianggap sebagai praktik visualisasi yang buruk (misleading)?',
      '3. Sebutkan 3 komponen wajib dalam perancangan sebuah Dashboard Eksekutif satu halaman!',
      '4. Jelaskan 4 tahapan alur dalam menyajikan narasi presentasi Storytelling with Data!'
    ],
    tugasPraktik: `**Tugas Desain: Executive Business Dashboard**
Buatlah sebuah dashboard analitik 1 halaman (.xlsx / Google Sheets) berdasarkan data riil unit produksi sekolah yang memuat:
1. Tiga Kartu Metrik KPI utama di baris paling atas.
2. Minimal 2 grafik visualisasi berbeda (Bar Chart dan Line Chart) yang dirancang bersih, profesional, dan berestetika tinggi.
3. Fitur Slicer interaktif yang berfungsi aktif memfilter data.
4. Satu kotak teks ringkasan eksekutif (*Storytelling Insight*) yang memuat rekomendasi tindakan bisnis.
Kumpulkan file spreadsheet (\`AD2_NAMA_KELAS.xlsx\`) ke portal LMS!`,
    asesmen: [
      {
        question: 'Jenis grafik yang paling tepat digunakan untuk menampilkan tren fluktuasi perubahan harga atau suhu dari waktu ke waktu secara berkesinambungan adalah...',
        options: ['Line Chart (Diagram Garis)', 'Pie Chart (Diagram Lingkaran)', 'Donut Chart', 'Treemap'],
        answerIndex: 0,
        explanation: 'Line chart paling efektif menghubungkan titik-titik data runtun waktu (time-series) untuk melihat tren naik/turun.'
      },
      {
        question: 'Praktik desain grafik batang yang dapat menyesatkan persepsi pembaca (Misleading Chart) adalah...',
        options: [
          'Memulai skala nilai sumbu Y dari angka non-nol (misal mulai dari 95) untuk memperbesar perbedaan visual secara berlebihan',
          'Memulai sumbu Y tepat dari angka 0',
          'Memberikan label nama sumbu yang jelas',
          'Menggunakan judul grafik yang informatif'
        ],
        answerIndex: 0,
        explanation: 'Memotong titik awal sumbu Y membuat selisih angka kecil tampak seperti perbedaan raksasa yang mendistorsi fakta.'
      },
      {
        question: 'Batasan maksimal jumlah kategori irisan yang disarankan pada diagram lingkaran (Pie Chart) agar tetap mudah dibaca adalah...',
        options: ['Maksimal 5 sampai 7 irisan', 'Bebas minimal 50 irisan', 'Harus selalu 100 irisan', 'Tidak boleh lebih dari 1 irisan'],
        answerIndex: 0,
        explanation: 'Pie chart dengan lebih dari 5-7 irisan membuat sudut irisan menjadi terlalu tipis dan membingungkan pembaca.'
      },
      {
        question: 'Komponen visual pada bagian atas dashboard yang menampilkan angka metrik utama secara besar dan ringkas disebut...',
        options: ['Scorecards / KPI Metric Cards', 'Footer baris', 'Gridlines sekunder', 'Scrollbar'],
        answerIndex: 0,
        explanation: 'Scorecards/KPI cards menyajikan angka indikator kinerja utama secara ringkas di pandangan pertama.'
      },
      {
        question: 'Tujuan utama dari metode bercerita dengan data (Storytelling with Data) adalah...',
        options: [
          'Menghubungkan temuan data visual dengan narasi konteks untuk mendorong rekomendasi tindakan nyata yang tepat',
          'Membuat grafik serumit mungkin agar terlihat canggih',
          'Menghafal rumus matematika di luar kepala',
          'Menghapus seluruh angka dari laporan keuangan'
        ],
        answerIndex: 0,
        explanation: 'Storytelling with Data bertujuan mengomunikasikan insight secara persuasif agar audiens tergerak mengambil keputusan tepat.'
      },
      {
        question: 'Jenis grafik yang paling efektif untuk membandingkan besaran nilai nominal antar 5-10 kategori produk yang berbeda adalah...',
        options: ['Bar / Column Chart (Diagram Batang / Kolom)', 'Scatter Plot', 'Radar Chart', 'Area Chart'],
        answerIndex: 0,
        explanation: 'Diagram batang memudahkan perbandingan panjang visual antar-kategori diskrit dengan akurat.'
      },
      {
        question: 'Jenis grafik yang digunakan untuk melihat hubungan atau korelasi antara dua variabel numerik (misalnya korelasi antara suhu pemanggangan dan kerenyahan keripik) adalah...',
        options: ['Scatter Plot (Diagram Tebar)', 'Pie Chart', 'Gauge Meter', 'Funnel Chart'],
        answerIndex: 0,
        explanation: 'Scatter plot memetakan sebaran titik-titik data (X, Y) untuk mengidentifikasi pola korelasi positif, negatif, atau acak.'
      },
      {
        question: 'Diagram yang membagi persegi panjang menjadi ubin-ubin proporsional bersarang untuk menampilkan data berkategori hierarki disebut...',
        options: ['Treemap', 'Line Chart', 'Histogram', 'Boxplot'],
        answerIndex: 0,
        explanation: 'Treemap menampilkan struktur bersarang (nested rectangles) dengan luas area proporsional terhadap besaran nilai.'
      },
      {
        question: 'Konsep "Data-Ink Ratio" yang dicetuskan oleh pakar visualisasi data Edward Tufte menganjurkan pembuat grafik untuk...',
        options: [
          'Memaksimalkan tinta/piksel untuk menampilkan data substansial dan menghilangkan ornamen dekoratif yang tidak perlu (chartjunk)',
          'Menambahkan sebanyak mungkin hiasan animasi 3D',
          'Menggunakan 15 warna berbeda dalam 1 grafik',
          'Mengubah latar belakang grafik menjadi hitam pekat berpola'
        ],
        answerIndex: 0,
        explanation: 'Data-Ink Ratio menekankan efisiensi visual: hapus elemen dekoratif tanpa makna (chartjunk) agar pembaca fokus pada esensi data.'
      },
      {
        question: 'Mengapa penggunaan efek 3D miring (3D perspective / depth) pada grafik batang dan lingkaran sangat TIDAK disarankan dalam standar profesional?',
        options: [
          'Karena perspektif miring mendistorsi sudut pandang optik sehingga irisan depan tampak lebih besar dari nilai aslinya',
          'Karena file 3D selalu merusak layar monitor',
          'Karena grafik 3D hanya bisa dilihat dengan kacamata khusus',
          'Karena grafik 3D tidak memiliki warna'
        ],
        answerIndex: 0,
        explanation: 'Efek 3D semu merusak proporsi visual matematis dan menyulitkan mata membaca perbandingan data secara akurat.'
      },
      {
        question: 'Elemen anatomi grafik yang bertugas memberikan garis bantu horizontal samar untuk mempermudah mata melacak nilai sumbu Y ke batang grafik dinamakan...',
        options: ['Gridlines (Garis Kisi)', 'Plot Area', 'Data Label', 'Axis Title'],
        answerIndex: 0,
        explanation: 'Gridlines adalah garis bantu kisi tipis yang membantu pembaca memproyeksikan posisi nilai data ke skala sumbu.'
      },
      {
        question: 'Grafik yang berbentuk menyerupai donat berlubang di tengah yang sering digunakan untuk menampilkan proporsi persentase ringkas disebut...',
        options: ['Donut Chart', 'Radar Chart', 'Waterfall Chart', 'Candlestick Chart'],
        answerIndex: 0,
        explanation: 'Donut chart adalah variasi diagram lingkaran dengan ruang kosong di tengah yang sering diisi teks total keseluruhan.'
      },
      {
        question: 'Diagram yang menampilkan distribusi persebaran frekuensi data numerik ke dalam rentang interval kelas (bins) disebut...',
        options: ['Histogram', 'Diagram Venn', 'Gantt Chart', 'Flowchart'],
        answerIndex: 0,
        explanation: 'Histogram mengelompokkan data kontinu ke dalam interval kelas (bins) untuk melihat bentuk distribusi data (normal, skewed, dll).'
      },
      {
        question: 'Dalam hierarki tata letak dashboard bisnis (Visual Hierarchy), posisi yang paling pertama kali dilihat oleh pembaca (zona perhatian utama) adalah...',
        options: ['Pojok kiri atas (Top-Left Corner)', 'Pojok kanan bawah', 'Bagian footer paling bawah', 'Di balik scrollbar vertikal'],
        answerIndex: 0,
        explanation: 'Mata manusia dengan pola membaca F-pattern / Z-pattern secara alami menaruh fokus pertama pada sudut kiri atas layar.'
      },
      {
        question: 'Prinsip pemilihan warna yang baik dalam visualisasi dashboard eksekutif adalah...',
        options: [
          'Menggunakan warna netral/monokromatik untuk konteks dan 1 warna aksen mencolok untuk menyorot poin anomali atau data penting',
          'Memberi setiap batang grafik warna yang berbeda-beda secara acak',
          'Menggunakan warna teks kuning terang di atas latar putih',
          'Menghilangkan semua warna sehingga menjadi hitam putih murni tanpa kontras'
        ],
        answerIndex: 0,
        explanation: 'Penggunaan warna aksen terfokus (focal point) memandu perhatian pembaca langsung ke wawasan (insight) yang paling penting.'
      },
      {
        question: 'Jenis grafik yang dirancang khusus untuk melacak jadwal proyek, durasi pekerjaan, dan dependensi antar-tugas dari waktu ke waktu adalah...',
        options: ['Gantt Chart', 'Pie Chart', 'Bubble Chart', 'Polar Chart'],
        answerIndex: 0,
        explanation: 'Gantt Chart memetakan lini masa proyek dengan batang horizontal yang menunjukkan awal, durasi, dan akhir setiap aktivitas.'
      },
      {
        question: 'Grafik yang menampilkan aliran kenaikan dan penurunan kumulatif dari nilai awal hingga nilai akhir (sering dipakai untuk laporan laba-rugi) adalah...',
        options: ['Waterfall Chart (Diagram Air Terjun)', 'Scatter Plot', 'Histogram', 'Treemap'],
        answerIndex: 0,
        explanation: 'Waterfall chart memperlihatkan bagaimana nilai awal bertambah atau berkurang oleh serangkaian faktor positif dan negatif.'
      },
      {
        question: 'Tiga pilar utama dalam metodologi Storytelling with Data adalah...',
        options: ['Data yang Akurat, Visual yang Jelas, dan Narasi Kontekstual yang Menggerakkan Tindakan', 'Kecepatan Koding, Ukuran Layar, dan Jumlah RAM', 'Animasi 3D, Musik Latar, dan Font Artistik', 'Jumlah Halaman Tebal, Warna Pelangi, dan Gambar Kartun'],
        answerIndex: 0,
        explanation: 'Storytelling data yang efektif menggabungkan integritas data, desain visual yang bersih, dan cerita narasi yang persuasif.'
      },
      {
        question: 'Kondisi di mana pembaca dashboard merasa bingung dan kewalahan karena terlalu banyak grafik, angka, dan warna dijejalkan dalam satu layar disebut...',
        options: ['Cognitive Overload (Beban Kognitif Berlebih)', 'Data Precision', 'High Contrast Ratio', 'Dynamic Refresh'],
        answerIndex: 0,
        explanation: 'Cognitive overload terjadi saat kapasitas memori kerja manusia kelebihan muatan akibat tampilan visual yang terlalu padat dan rumit.'
      },
      {
        question: 'Fitur interaktif pada visualisasi data yang memungkinkan pengguna mengeklik kategori tertentu untuk melihat rincian data pada level yang lebih dalam disebut...',
        options: ['Drill-Down / Drill-Through', 'AutoSave', 'Spell Check', 'Word Wrap'],
        answerIndex: 0,
        explanation: 'Drill-down memungkinkan pengguna beralih dari tampilan agregat makro (misal: Tahunan) menuju rincian mikro (misal: Harian/Item).'
      },
      {
        question: 'Dalam dashboard industri pangan APHP, visualisasi grafik garis yang memplot suhu pasteurisasi susu secara real-time terhadap batas aman minimal berfungsi untuk...',
        options: [
          'Segera mendeteksi penyimpangan anomali suhu sebelum produk mengalami kerusakan mutu mikrobiologis',
          'Mengubah warna susu menjadi lebih pekat',
          'Mengurangi kadar air tanpa pemanasan',
          'Menghilangkan kebutuhan kemasan pangan'
        ],
        answerIndex: 0,
        explanation: 'Grafik batas kendali mutu (Control Chart) secara visual memperingatkan operator saat parameter proses keluar dari rentang aman.'
      },
      {
        question: 'Dalam portofolio studio DKV, visualisasi perbandingan kepuasan klien berdasarkan metrik Net Promoter Score (NPS) paling jelas disajikan dengan...',
        options: ['Bar Chart terurut dengan penanda ambang target yang kontras', 'Pie Chart 50 irisan tipis tanpa angka', 'Diagram 3D berputar', 'Teks paragraf tanpa angka'],
        answerIndex: 0,
        explanation: 'Bar chart dengan garis referensi target memudahkan evaluator membandingkan performa capaian terhadap standar mutu layanan.'
      },
      {
        question: 'Jenis grafik mikro berukuran mini tanpa sumbu yang disisipkan langsung ke dalam satu sel tabel untuk memperlihatkan tren kilat dinamakan...',
        options: ['Sparkline', 'Billboard', 'Banner', 'Watermark'],
        answerIndex: 0,
        explanation: 'Sparklines adalah grafik garis/batang sangat kecil di dalam sel yang memberikan konteks tren cepat di samping angka tabel.'
      },
      {
        question: 'Langkah pertama yang paling krusial sebelum mulai merancang sebuah grafik atau dashboard adalah...',
        options: [
          'Memahami siapa audiens pembacanya dan pertanyaan bisnis apa yang ingin dijawab oleh data tersebut',
          'Langsung memilih warna kesukaan',
          'Membeli monitor ukuran 50 inci',
          'Menghapus seluruh baris data ganjil'
        ],
        answerIndex: 0,
        explanation: 'Desain visual data yang sukses selalu berakar dari pemahaman mendalam tentang kebutuhan informasi audiens sasarannya.'
      },
      {
        question: 'Mengapa teks label sumbu pada grafik sebaiknya ditulis horizontal daripada vertikal miring 90 derajat?',
        options: [
          'Karena teks horizontal jauh lebih alami, cepat, dan nyaman dibaca manusia tanpa perlu memiringkan kepala',
          'Karena software spreadsheet menolak teks vertikal',
          'Agar menghemat konsumsi daya baterai laptop',
          'Supaya grafik terlihat seperti koran'
        ],
        answerIndex: 0,
        explanation: 'Orientasi teks horizontal mengurangi hambatan kognitif membaca dan mempercepat pemahaman informasi.'
      },
      {
        question: 'Pemberian judul grafik yang menerapkan pendekatan "Action Title" (Judul Berorientasi Insight) yang baik adalah...',
        options: [
          '"Penjualan Produk Olahan Susu Melonjak 35% Pasca-Peluncuran Kemasan Baru DKV"',
          '"Grafik Penjualan"',
          '"Tabel Data 2026"',
          '"Hasil Perhitungan Rumus Excel Bagian 1"'
        ],
        answerIndex: 0,
        explanation: 'Action Title langsung menyampaikan pesan inti/temuan utama sehingga audiens memahami konteks grafik dalam 3 detik.'
      },
      {
        question: 'Standar aksesibilitas warna dalam visualisasi data menuntut pembuat grafik untuk...',
        options: [
          'Memastikan kombinasi warna tetap dapat dibedakan dengan jelas oleh penderita buta warna (Color-Blind Friendly) dan memiliki kontras tinggi',
          'Hanya menggunakan warna abu-abu gelap',
          'Melarang penggunaan warna biru',
          'Mewajibkan warna neon yang menyala'
        ],
        answerIndex: 0,
        explanation: 'Desain inklusif menghindari ketergantungan semata pada warna merah-hijau dan memanfaatkan variasi kecerahan atau tekstur/simbol.'
      },
      {
        question: 'Diagram tebar (Scatter plot) yang menunjukkan titik-titik data condong membentuk garis lurus miring ke kanan atas mengindikasikan adanya...',
        options: ['Korelasi Positif Kuat (saat nilai X naik, nilai Y juga ikut naik)', 'Korelasi Negatif Kuat', 'Tidak ada korelasi sama sekali', 'Data mengalami kerusakan file'],
        answerIndex: 0,
        explanation: 'Pola sebaran yang menanjak ke kanan atas menandakan hubungan linier positif antara kedua variabel.'
      },
      {
        question: 'Manakah di bawah ini yang merupakan alat bantu perangkat lunak modern untuk membangun dashboard visualisasi data interaktif profesional?',
        options: ['Tableau, Microsoft Power BI, Looker Studio, dan Google Sheets', 'Adobe Premiere Pro dan Audacity', 'WinRAR dan Notepad biasa', 'Avast Antivirus dan CCleaner'],
        answerIndex: 0,
        explanation: 'Power BI, Tableau, Looker Studio, dan Google Sheets adalah platform analitik dan visualisasi data industri terkemuka.'
      },
      {
        question: 'Mengapa kemampuan menyajikan data visual yang komunikatif menjadi salah satu keahlian masa depan (Future Skills) paling bernilai tinggi?',
        options: [
          'Karena data yang melimpah tidak akan memiliki nilai guna jika tidak dapat dipahami, dikomunikasikan, dan diubah menjadi keputusan strategis nyata',
          'Hanya agar laporan tugas sekolah terlihat penuh gambar',
          'Supaya komputer tidak perlu di-restart',
          'Agar siswa tidak perlu menghitung angka lagi'
        ],
        answerIndex: 0,
        explanation: 'Visual storytelling mengubah tumpukan angka mentah menjadi wawasan bermakna yang mendorong inovasi dan keputusan bisnis tepat sasaran.'
      }
    ],
    asesmenUraian: [
      'Jelaskan mengapa pemilihan palet warna yang bijak (minimalis) lebih disukai daripada menggunakan warna pelangi yang terlalu meriah pada grafik dashboard bisnis!',
      'Uraikan analisis Anda mengenai studi kasus di mana sebuah keputusan bisnis yang diambil secara sembrono (tanpa melihat bukti data) berujung pada kerugian besar!'
    ],
    rubrikPenilaian: [
      {
        kriteria: 'Pemilihan & Ketepatan Grafik',
        skor4: 'Grafik dipilih sangat tepat sesuai matriks data, skala sumbu jujur (mulai 0), dan elemen anatomi lengkap.',
        skor3: 'Grafik tepat namun label sumbu X atau Y lupa mencantumkan satuan unit.',
        skor2: 'Memilih tipe grafik yang keliru (misal tren waktu menggunakan pie chart).',
        skor1: 'Grafik tidak dapat dibaca atau rusak.'
      },
      {
        kriteria: 'Desain Dashboard & Storytelling',
        skor4: 'Dashboard 1 halaman sangat bersih, warna terharmonisasi, KPI cards jelas, dan narasi rekomendasi sangat tajam.',
        skor3: 'Dashboard baik namun tata letak grafik masih agak bertumpuk.',
        skor2: 'Dashboard tidak rapi dan tidak memuat narasi insight.',
        skor1: 'Tidak mengumpulkan dashboard visualisasi.'
      }
    ],
    glosarium: [
      { term: 'Visualisasi Data', definition: 'Representasi grafis dari data dan informasi untuk mempermudah identifikasi pola dan tren.' },
      { term: 'Dashboard', definition: 'Antarmuka visual terpadu yang menampilkan indikator kinerja utama (KPI) dalam satu tampilan layar.' },
      { term: 'Chartjunk', definition: 'Elemen visual berlebih dan tidak penting pada grafik yang mengaburkan pesan data utama.' },
      { term: 'Slicer', definition: 'Komponen tombol visual yang digunakan untuk memfilter data pada tabel dan grafik secara interaktif.' },
      { term: 'Data-Driven Decision', definition: 'Proses pengambilan keputusan strategis yang didasarkan pada analisis bukti data faktual.' }
    ],
    sumberReferensi: [
      'Knaflic, C. N. (2015). Storytelling with Data: A Data Visualization Guide for Business Professionals. Wiley.',
      'Few, S. (2013). Information Dashboard Design: Displaying Data for At-a-Glance Monitoring. Analytics Press.',
      'Kemendikbudristek (2021). Buku Siswa Informatika Kelas X. Pusat Perbukuan.',
      'Tufte, E. R. (2001). The Visual Display of Quantitative Information (2nd ed.). Graphics Press.'
    ]
  }
];
