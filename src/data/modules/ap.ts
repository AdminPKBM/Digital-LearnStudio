import { ModuleData } from '../../types';

export const apModules: ModuleData[] = [
  // =========================================================================
  // BAB 3: ALGORITMA DAN PEMROGRAMAN DASAR
  // =========================================================================
  {
    id: 'AP-1',
    elementId: 'AP',
    elementName: 'Algoritma dan Pemrograman',
    moduleNumber: 1,
    bab: 'BAB 3 — Algoritma dan Pemrograman Dasar',
    pertemuan: 5,
    fase: 'Fase E (Kelas X SMK)',
    title: 'Logika Algoritma, Notasi Standar, dan Dasar Pemrograman',
    estimatedTimeMinutes: 90,
    difficulty: 'Menengah',
    competencies: [
      'Memahami esensi dan karakteristik fundamental algoritma (Finiteness, Definiteness, Input, Output, Effectiveness)',
      'Merepresentasikan algoritma menggunakan 3 notasi standar: Kalimat Deskriptif, Diagram Alir (Flowchart ANSI/ISO), dan Pseudocode',
      'Memahami konsep dasar pemrograman: Variabel, Konstanta, Tipe Data Primitif/Komposit, dan Operator (Aritmatika, Relasional, Logika)',
      'Menerapkan struktur kontrol dasar: Percabangan (If, If-Else, Nested If, Switch) dan Perulangan (For, While, Do-While)',
      'Memahami modularitas melalui Fungsi dan Prosedur (Parameter, Argumen, Return Value)',
      'Melakukan analisis kesalahan pemrograman (Debugging: Syntax Error, Logic Error, Runtime Error)'
    ],
    objectives: [
      'Siswa mampu menuliskan notasi algoritma deskriptif, flowchart, dan pseudocode untuk memecahkan masalah kejuruan',
      'Siswa dapat mendeklarasikan variabel dengan tipe data yang tepat serta menerapkan operator logika aritmatika',
      'Siswa mampu menyusun kode program sederhana menggunakan Python atau JavaScript yang memanfaatkan percabangan dan perulangan',
      'Siswa mampu membuat fungsi modular dengan parameter dan nilai kembalian (return value)',
      'Siswa mampu mengidentifikasi dan memperbaiki kesalahan sintaks dan kesalahan logika (debugging) pada kode program'
    ],
    summary: 'Fondasi logika pemrograman: perancangan algoritma dengan flowchart dan pseudocode, penguasaan tipe data, operator, percabangan, perulangan, fungsi modular, serta teknik debugging kode Python/JavaScript terapan.',
    infographicHighlights: [
      { label: 'Notasi Algoritma', text: 'Flowchart standar ANSI/ISO & Pseudocode terstruktur.', icon: 'GitMerge' },
      { label: 'Tipe Data & Variabel', text: 'Integer, Float, String, Boolean, Array, dan Object.', icon: 'Binary' },
      { label: 'Struktur Kontrol', text: 'Percabangan If-Else dan Perulangan For/While.', icon: 'Repeat' },
      { label: 'Fungsi & Debugging', text: 'Modularitas kode berparameter dan pelacakan syntax/logic error.', icon: 'Code' }
    ],
    pertanyaanPemantik: [
      'Bagaimana mesin lampu lalu lintas di perempatan jalan tahu kapan harus menyala merah, kuning, dan hijau secara teratur tanpa tabrakan?',
      'Jika sebuah program komputer berjalan tanpa henti dan membuat komputer menjadi lambat (hang), kesalahan apa yang sedang terjadi di dalam kodenya?',
      'Mengapa bahasa pemrograman seperti Python dan JavaScript sangat populer dan digunakan di semua sektor industri modern?'
    ],
    pendahuluan: `Selamat datang di dunia pemrograman! Pemrograman (*programming*) adalah seni dan sains menginstruksikan komputer untuk memecahkan masalah secara otomatis dan berkecepatan tinggi.

Namun, sebelum seorang arsitek mulai meletakkan batu bata untuk membangun gedung, ia harus terlebih dahulu merancang cetak biru (*blueprint*). Begitu pula dalam dunia perangkat lunak: sebelum mengetik baris-baris kode sintaks (*coding*), kita wajib merancang **Algoritma** yang kokoh dan logis.

Melalui modul ini, kamu akan mempelajari bagaimana menuangkan ide logismu ke dalam diagram alir (Flowchart), pseudocode terstruktur, hingga mentranslasikannya ke dalam bahasa pemrograman modern (Python dan JavaScript) yang siap diaplikasikan pada industri kreatif DKV maupun agroindustri APHP!`,
    konsepInti: `1. **Karakteristik Algoritma (Donald Knuth)**: Finiteness (berakhir), Definiteness (pasti), Input (masukan), Output (keluaran), dan Effectiveness (efektif).
2. **Notasi Algoritma**: Kalimat deskriptif natural, Diagram Alir (Flowchart), dan Pseudocode (menyerupai kode asli).
3. **Variabel, Tipe Data & Operator**: Variabel sebagai wadah memori; Integer, Float, String, Boolean, Array; Operator Aritmatika, Perbandingan (==, !=, >, <), dan Logika (AND, OR, NOT).
4. **Struktur Kontrol**: Percabangan (If-Else / Switch) dan Perulangan (For / While).
5. **Modularitas & Debugging**: Fungsi berparameter dan penanganan Syntax Error vs Logic Error.`,
    contentMarkdown: `# BAB 3 — Algoritma dan Pemrograman Dasar

## 1. Hakikat dan Karakteristik Algoritma

**Algoritma** adalah urutan langkah-langkah logis dan terstruktur yang disusun secara sistematis untuk menyelesaikan suatu permasalahan atau mencapai tujuan tertentu.

Menurut ilmuwan komputer legendaris **Donald E. Knuth**, sebuah algoritma yang baik wajib memenuhi 5 kriteria utama:
1. **Finiteness (Keterbatasan)**: Algoritma harus berhenti setelah melakukan sejumlah langkah pemrosesan yang berhingga. Algoritma tidak boleh terjebak dalam perulangan abadi (*infinite loop*).
2. **Definiteness (Kepastian)**: Setiap langkah instruksi harus terdefinisi secara jelas, presisi, dan tidak menimbulkan tafsir ganda (*unambiguous*).
3. **Input (Masukan)**: Algoritma memiliki nol atau lebih data masukan dari luar.
4. **Output (Keluaran)**: Algoritma harus menghasilkan minimal satu keluaran yang merupakan solusi dari masalah.
5. **Effectiveness (Efektivitas)**: Setiap langkah instruksi harus sederhana dan dapat dikerjakan dalam waktu yang masuk akal.

---

## 2. Tiga Notasi Standar Penulisan Algoritma

\`\`\`text
+--------------------+----------------------------+-----------------------------+
| 1. DESKRIPTIF      | 2. FLOWCHART (DIAGRAM)     | 3. PSEUDOCODE               |
+--------------------+----------------------------+-----------------------------+
| Langkah bahasa     | Simbol grafis standar      | Bahasa tiruan kode yang     |
| natural sehari-hari| visual (Terminator, Input, | ringkas dan mudah diterjemah|
| (Bahasa Indonesia) | Proses, Decision, Arrow)   | kan ke Python / JavaScript  |
+--------------------+----------------------------+-----------------------------+
\`\`\`

### A. Simbol Standar Flowchart (ANSI/ISO):
* **Terminator (Kapsul Oval)**: Menandai awal (\`Mulai / Start\`) dan akhir (\`Selesai / End\`) program.
* **Jajaran Genjang**: Operasi Masukan / Keluaran (\`Input / Output\`).
* **Persegi Panjang**: Operasi Pemrosesan aritmatika / manipulasi data (\`Process\`).
* **Belah Ketupat (Diamond)**: Titik Keputusan percabangan kondisi logika (\`Decision: Ya / Tidak\`).
* **Panah Alir (Flowline)**: Menunjukkan arah jalannya instruksi program.

### B. Contoh Perbandingan Notasi: Menghitung Kelulusan Siswa

#### 1. Notasi Deskriptif:
\`\`\`text
1. Masukkan nilai ujian siswa.
2. Jika nilai ujian lebih besar atau sama dengan 75, maka cetak "LULUS".
3. Jika nilai ujian lebih kecil dari 75, maka cetak "REMEDIAL".
4. Selesai.
\`\`\`

#### 2. Notasi Pseudocode:
\`\`\`text
ALGORITMA CekKelulusan
DEKLARASI:
    nilai : INTEGER
    status : STRING
DESKRIPSI:
    READ(nilai)
    IF nilai >= 75 THEN
        status <- "LULUS"
    ELSE
        status <- "REMEDIAL"
    ENDIF
    WRITE(status)
SELESAI
\`\`\`

---

## 3. Konsep Dasar Pemrograman: Variabel, Tipe Data & Operator

\`\`\`text
+-------------------+-------------------+---------------------------------------+
| TIPE DATA         | CONTOH NILAI      | PENJELASAN                            |
+-------------------+-------------------+---------------------------------------+
| Integer (int)     | 10, -5, 1000      | Bilangan bulat tanpa desimal          |
| Float (float)     | 3.14, 87.5, 0.05  | Bilangan pecahan / desimal            |
| String (str)      | "SMK Bisa!", "DKV"| Kumpulan karakter teks dalam tanda petik|
| Boolean (bool)    | True, False       | Logika biner benar atau salah         |
| Array / List      | [80, 90, 75, 95]  | Kumpulan data dalam satu variabel     |
+-------------------+-------------------+---------------------------------------+
\`\`\`

### Operator dalam Pemrograman:
* **Operator Aritmatika**: \`+\` (Tambah), \`-\` (Kurang), \`*\` (Kali), \`/\` (Bagi), \`%\` (Modulus/Sisa Bagi), \`**\` (Pangkat).
* **Operator Perbandingan (Relasional)**: \`==\` (Sama dengan), \`!=\` (Tidak sama dengan), \`>\` (Lebih besar), \`<\` (Lebih kecil), \`>=\` (Lebih besar sama dengan), \`<=\` (Lebih kecil sama dengan).
* **Operator Logika**: \`and\` / \`&&\` (Keduanya harus True), \`or\` / \`||\` (Salah satu True), \`not\` / \`!\` (Pembalikan nilai).

---

## 4. Struktur Kontrol Pemrograman

### A. Percabangan (*Conditionals*)
Percabangan memungkinkan program memilih jalur eksekusi berdasarkan kondisi logika tertentu.

**Contoh Kode Python**:
\`\`\`python
# Menentukan grade nilai siswa SMK
nilai = 82

if nilai >= 85:
    grade = "A (Sangat Baik)"
elif nilai >= 75:
    grade = "B (Baik / Tuntas)"
elif nilai >= 60:
    grade = "C (Cukup)"
else:
    grade = "D (Perlu Bimbingan)"

print(f"Hasil Evaluasi: {grade}")
\`\`\`

### B. Perulangan (*Loops*)
Perulangan mengeksekusi blok kode yang sama berulang kali selama kondisi terpenuhi.

**Contoh Perulangan \`for\` (Mencetak label kemasan produk APHP)**:
\`\`\`python
# Mencetak 5 nomor batch botol jus apel
for nomor_botol in range(1, 6):
    print(f"Kemasan Botol Jus Apel No: BATCH-2026-00{nomor_botol}")
\`\`\`

**Contoh Perulangan \`while\` (Monitoring sensor suhu oven)**:
\`\`\`python
suhu_oven = 80
target_suhu = 100

while suhu_oven < target_suhu:
    print(f"Suhu saat ini: {suhu_oven}°C - Pemanasan berlangsung...")
    suhu_oven += 5  # Naikkan suhu sebesar 5 derajat

print("Target suhu 100°C tercapai! Siap memanggang.")
\`\`\`

---

## 5. Modularitas: Fungsi (*Functions*)

Fungsi adalah blok kode mandiri yang dapat digunakan kembali (*reusable*) untuk melakukan tugas tertentu.

\`\`\`python
# Fungsi menghitung total biaya cetak banner DKV
def hitung_biaya_cetak(panjang_meter, lebar_meter, harga_per_meter=25000):
    luas = panjang_meter * lebar_meter
    total_biaya = luas * harga_per_meter
    return total_biaya

# Pemanggilan fungsi
biaya_spanduk = hitung_biaya_cetak(3, 1.5)
print(f"Total Biaya Cetak Spanduk 3x1.5m: Rp {biaya_spanduk:,.0f}")
\`\`\`

---

## 6. Analisis dan Penanganan Kesalahan (*Debugging*)

Dalam menulis program, seorang programmer pasti menemui kesalahan (*bug*). Ada 3 jenis kesalahan utama:

1. **Syntax Error (Kesalahan Sintaks)**:
   * Terjadi akibat pelanggaran aturan tata bahasa pemrograman (misal: lupa tanda titik dua \`:\`, tanda kurung tidak berpasangan, atau salah ketik kata kunci \`prnt\` alih-alih \`print\`).
   * Program tidak dapat dijalankan sama sekali oleh komputer.
2. **Runtime Error (Kesalahan Waktu Eksekusi)**:
   * Kode sintaks benar, namun terjadi kegagalan fatal saat program sedang berjalan (misal: membagi angka dengan nol \`10 / 0\`, atau mengakses indeks list yang tidak ada).
3. **Logic Error (Kesalahan Logika / Bug)**:
   * Program berjalan lancar tanpa pesan error, tetapi hasil perhitungannya salah (misal: rumus luas persegi panjang ditulis \`panjang + lebar\` alih-alih \`panjang * lebar\`).
   * Ini adalah jenis kesalahan yang paling berbahaya dan membutuhkan ketelitian analisis trace.`,
    contohPenerapan: `1. **Otomatisasi Watermark Gambar DKV**: Skrip pemrograman Python dengan library Pillow yang secara otomatis membaca 100 foto desain di folder dan menempelkan logo watermark di pojok kanan bawah dalam 5 detik.
2. **Kalkulator Formulasi Pakan/Gula APHP**: Program JavaScript interaktif di browser yang meminta input volume buah dan otomatis menghitung gramatur gula pasir serta pengawet natrium benzoat sesuai standar BPOM.`,
    studiKasus: `**Studi Kasus: Sistem Antrean Tiket Wahana Bermain**

Sebuah wahana bermain memiliki aturan:
1. Pengunjung dengan tinggi badan di bawah 120 cm dilarang naik roller coaster demi keselamatan.
2. Pengunjung berusia di bawah 12 tahun wajib didampingi orang dewasa.
3. Harga tiket reguler Rp 50.000, tetapi pengunjung yang berulang tahun hari ini mendapat diskon 50%.

**Tugas**:
Rancanglah pseudocode dan program Python yang menerima masukan (tinggi badan, usia, status pendamping, status ulang tahun) dan menghasilkan keputusan boleh/tidaknya naik wahana serta harga tiket yang harus dibayar!`,
    aktivitasSiswa: `**Praktik Lab Koding: Mini Kalkulator Kejuruan**
1. Buka editor kode Python (IDLE, VS Code, atau Google Colab di browser).
2. Buat program yang meminta input dari pengguna:
   - Nama Siswa
   - Jurusan (DKV atau APHP)
   - Jumlah Barang yang diproduksi
   - Harga Satuan
3. Hitung Total Omzet. Jika Total Omzet > Rp 500.000, berikan potongan diskon 10%.
4. Jalankan program dan perbaiki (*debug*) jika ada pesan error!`,
    tipsPraktis: [
      'Beri nama variabel yang deskriptif dan bermakna (contoh: \`total_harga\`, bukan hanya \`x\` atau \`abc\`).',
      'Perhatikan aturan indentasi (spasi menjorok ke dalam) pada Python, karena indentasi menentukan blok kode percabangan dan perulangan.',
      'Gunakan perintah \`print()\` untuk melihat nilai variabel di tengah jalan saat melakukan pelacakan logic error (debugging).'
    ],
    kesalahanUmum: [
      'Menulis kode tanpa merancang flowchart atau pseudocode terlebih dahulu.',
      'Lupa mengonversi tipe data input teks (\`str\`) menjadi angka numerik (\`int\` atau \`float\`) saat melakukan operasi matematika.',
      'Membuat kondisi perulangan \`while\` yang tidak pernah bernilai False sehingga menyebabkan komputer hang (*infinite loop*).'
    ],
    rangkuman: `• Algoritma adalah langkah logis terstruktur penyelesaian masalah dengan 5 karakteristik: Finiteness, Definiteness, Input, Output, dan Effectiveness.
• 3 Notasi algoritma: Deskriptif, Flowchart (diagram alir standar), dan Pseudocode.
• Konsep dasar pemrograman meliputi Variabel, Tipe Data (int, float, str, bool, list), Operator (aritmatika, perbandingan, logika), dan Struktur Kontrol (Percabangan & Perulangan).
• Fungsi membagi program menjadi modul-modul yang dapat digunakan kembali.
• Debugging adalah keterampilan mendiagnosis dan memperbaiki Syntax Error, Runtime Error, dan Logic Error.`,
    refleksi: [
      'Menurutmu, bagian mana yang lebih menantang: merancang logika algoritmanya atau menuliskan sintaks kodingnya?',
      'Bagaimana kamu melatih kesabaran dan ketelitian saat menemukan pesan error saat memprogram?'
    ],
    latihanPemahaman: [
      '1. Sebutkan dan jelaskan 5 karakteristik algoritma menurut Donald E. Knuth!',
      '2. Gambarkan simbol flowchart untuk Terminator, Input/Output, Proses, dan Decision!',
      '3. Jelaskan perbedaan mendasar antara Syntax Error dan Logic Error beserta contohnya!',
      '4. Tuliskan contoh perulangan `for` dalam Python untuk mencetak angka ganjil dari 1 sampai 15!'
    ],
    tugasPraktik: `**Tugas Koding Mandiri: Program Kasir Sederhana**
Rancang dan buatlah program Python / JavaScript sederhana (.py atau .js) yang memuat:
1. Minimal 3 variabel dengan tipe data berbeda (String, Integer, Float).
2. Struktur percabangan \`if-elif-else\` untuk menentukan diskon atau status kelayakan.
3. Struktur perulangan \`for\` atau \`while\` untuk menampilkan daftar transaksi.
4. Simpan source code dan tangkapan layar (*screenshot*) hasil eksekusi program ke dalam 1 file PDF (\`AP1_NAMA_KELAS.pdf\`) lalu kumpulkan!`,
    asesmen: [
      {
        question: 'Simbol belah ketupat (Diamond) dalam diagram alir (Flowchart) standar berfungsi untuk...',
        options: [
          'Pengambilan keputusan kondisi logika percabangan (Decision: Ya / Tidak)',
          'Memulai dan mengakhiri jalannya program (Terminator)',
          'Proses perhitungan matematika aritmatika',
          'Menerima data masukan dari keyboard pengguna'
        ],
        answerIndex: 0,
        explanation: 'Simbol belah ketupat (Diamond) digunakan untuk mengevaluasi kondisi boolean percabangan.'
      },
      {
        question: 'Tipe data yang paling tepat untuk menyimpan nilai harga produk seperti Rp 45.500,75 adalah...',
        options: ['Float', 'Integer', 'Boolean', 'Char'],
        answerIndex: 0,
        explanation: 'Float digunakan untuk menyimpan bilangan desimal/pecahan presisi mengambang.'
      },
      {
        question: 'Perhatikan ekspresi logika berikut: (10 > 5) and (3 == 4). Nilai kebenaran hasil akhirnya adalah...',
        options: ['False', 'True', 'Error', 'Null'],
        answerIndex: 0,
        explanation: '(10 > 5) bernilai True, sedangkan (3 == 4) bernilai False. Operasi True and False menghasilkan False.'
      },
      {
        question: 'Jenis kesalahan di mana program berjalan lancar tanpa pesan error namun hasil perhitungannya salah disebut...',
        options: ['Logic Error', 'Syntax Error', 'Runtime Error', 'Compilation Error'],
        answerIndex: 0,
        explanation: 'Logic Error adalah kesalahan alur logika algoritma yang membuat output tidak sesuai harapan meskipun sintaks koding valid.'
      },
      {
        question: 'Karakteristik algoritma yang menyatakan bahwa program harus berhenti setelah sejumlah langkah berhingga disebut...',
        options: ['Finiteness', 'Definiteness', 'Effectiveness', 'Generality'],
        answerIndex: 0,
        explanation: 'Finiteness berarti algoritma wajib memiliki batasan langkah dan kondisi berhenti yang pasti.'
      },
      {
        question: 'Tipe data yang hanya bernilai Benar (True) atau Salah (False) dinamakan tipe data...',
        options: ['Boolean', 'String', 'Integer', 'Array'],
        answerIndex: 0,
        explanation: 'Tipe data Boolean hanya memiliki dua kemungkinan nilai: True (1) atau False (0).'
      },
      {
        question: 'Operator aritmetika modulus (%) dalam pemrograman berfungsi untuk...',
        options: ['Menghitung sisa hasil bagi dari dua bilangan bulat', 'Menghitung persentase diskon', 'Memangkatkan angka', 'Membagi bilangan menjadi pecahan desimal'],
        answerIndex: 0,
        explanation: 'Operator Modulo/Modulus (%) menghasilkan nilai sisa pembagian bulat, contoh: 10 % 3 menghasilkan 1.'
      },
      {
        question: 'Berapakah hasil evaluasi ekspresi matematika `8 + 2 * 5` sesuai aturan presedensi operator aritmetika?',
        options: ['18', '50', '26', '80'],
        answerIndex: 0,
        explanation: 'Operasi perkalian (*) memiliki hierarki prioritas lebih tinggi daripada penjumlahan (+), sehingga dihitung (2 * 5) = 10, lalu 8 + 10 = 18.'
      },
      {
        question: 'Manakah nama variabel di bawah ini yang VALID sesuai aturan tata nama identifier pemrograman umum?',
        options: ['total_harga_diskon', '1st_product', 'total harga belanja', 'class'],
        answerIndex: 0,
        explanation: 'Nama variabel tidak boleh diawali angka, tidak boleh mengandung spasi, dan tidak boleh memakai kata kunci reservasi bahasa (reserved keywords).'
      },
      {
        question: 'Simbol flowchart berbentuk oval atau persegi panjang bersudut membulat (Terminator) digunakan untuk melambangkan...',
        options: ['Awal (Start) atau Akhir (End) dari jalannya diagram alir', 'Proses kalkulasi aritmetika', 'Keputusan bersyarat', 'Keluaran data ke layar'],
        answerIndex: 0,
        explanation: 'Terminator menandai titik mulai (Start) dan titik selesai (End) sebuah alur algoritma.'
      },
      {
        question: 'Jika diberikan variabel `skor = 85`, pernyataan kondisi percabangan berikut: `if skor >= 80: grade = "A" else: grade = "B"` akan menghasilkan nilai variabel `grade`...',
        options: ['"A"', '"B"', 'Null', 'Error'],
        answerIndex: 0,
        explanation: 'Karena 85 >= 80 bernilai True, maka blok percabangan pertama dieksekusi sehingga `grade` bernilai "A".'
      },
      {
        question: 'Struktur perulangan (Looping) yang digunakan ketika jumlah iterasi putaran sudah diketahui secara pasti sejak awal dinamakan...',
        options: ['Count-controlled Loop (contoh: for loop)', 'Condition-controlled Loop (while loop)', 'Infinite Loop', 'Recursion Loop'],
        answerIndex: 0,
        explanation: 'For loop digunakan saat jumlah perulangan telah ditentukan atau iterasi melintasi elemen koleksi berhingga.'
      },
      {
        question: 'Struktur perulangan yang akan terus berjalan selama suatu kondisi logika bernilai Benar (True) dan berhenti saat kondisi menjadi Salah (False) adalah...',
        options: ['While Loop', 'Switch Case', 'Try-Catch', 'If-Else'],
        answerIndex: 0,
        explanation: 'While loop mengevaluasi kondisi sebelum setiap iterasi dijalankan dan berhenti begitu syarat menjadi False.'
      },
      {
        question: 'Diberikan array `daftar_buah = ["Apel", "Mangga", "Jeruk", "Pisang"]`. Berapakah nilai dari elemen pada indeks `daftar_buah[2]` (konvensi 0-based index)?',
        options: ['"Jeruk"', '"Mangga"', '"Apel"', '"Pisang"'],
        answerIndex: 0,
        explanation: 'Indeks ke-0 adalah "Apel", indeks ke-1 adalah "Mangga", dan indeks ke-2 adalah "Jeruk".'
      },
      {
        question: 'Kumpulan blok kode terorganisir yang diberi nama, dapat menerima parameter masukan, dan mengembalikan nilai hasil (return value) dinamakan...',
        options: ['Fungsi / Subprogram (Function/Procedure)', 'Variabel Global', 'Tipe Data Primitif', 'Komentar Baris'],
        answerIndex: 0,
        explanation: 'Fungsi adalah modul program mandiri yang memecah kode menjadi blok-blok terstruktur yang dapat digunakan kembali (reusable).'
      },
      {
        question: 'Proses melacak dan memperbaiki kesalahan (bug) pada baris-baris kode program dinamakan...',
        options: ['Debugging', 'Compiling', 'Refactoring', 'Rendering'],
        answerIndex: 0,
        explanation: 'Debugging adalah aktivitas analisis mendalam untuk menemukan penyebab dan memperbaiki galat/bug pada program.'
      },
      {
        question: 'Tipe kesalahan yang terjadi ketika program melanggar aturan tata bahasa penulisan kode (misalnya kurung kurawal tidak ditutup atau typo kata kunci) adalah...',
        options: ['Syntax Error', 'Logic Error', 'Semantic Glitch', 'Hardware Malfunction'],
        answerIndex: 0,
        explanation: 'Syntax error langsung dideteksi oleh compiler/interpreter saat parsing karena melanggar aturan sintaks bahasa.'
      },
      {
        question: 'Tipe kesalahan yang terjadi saat program sedang berjalan, misalnya membagi sebuah angka dengan angka 0 (ZeroDivisionError), disebut...',
        options: ['Runtime Error', 'Syntax Error', 'Logic Error', 'Linker Warning'],
        answerIndex: 0,
        explanation: 'Runtime Error terjadi saat program dieksekusi ketika menemui kondisi komputasi ilegal atau tidak valid.'
      },
      {
        question: 'Perhatikan algoritma sekuensial berikut: \n1. a = 5 \n2. b = 10 \n3. a = a + b \n4. b = a - b \nBerapakah nilai akhir dari variabel `b`?',
        options: ['5', '10', '15', '0'],
        answerIndex: 0,
        explanation: 'Langkah 3: a = 5 + 10 = 15. Langkah 4: b = 15 - 10 = 5. Trik ini menukar nilai variabel tanpa variabel sementara.'
      },
      {
        question: 'Teks deskriptif di dalam kode sumber yang tidak akan dieksekusi oleh komputer dan ditujukan sebagai catatan penjelasan bagi programmer disebut...',
        options: ['Komentar (Comment)', 'Variabel Tetap', 'Header File', 'Namespace'],
        answerIndex: 0,
        explanation: 'Komentar (diawali `#` di Python atau `//` di JS) diabaikan oleh penerjemah bahasa dan berguna untuk dokumentasi kode.'
      },
      {
        question: 'Sebuah variabel `counter` yang nilainya bertambah satu setiap kali perulangan selesai dieksekusi (`counter = counter + 1`) dinamakan...',
        options: ['Pencacah (Counter / Increment)', 'Akumulator', 'Sentinel Value', 'Flag Boolean'],
        answerIndex: 0,
        explanation: 'Counter mencatat jumlah kali suatu blok instruksi atau peristiwa telah terjadi.'
      },
      {
        question: 'Sebuah variabel yang digunakan untuk menjumlahkan nilai secara bertahap dalam perulangan (`total = total + harga_item`) dinamakan...',
        options: ['Akumulator (Accumulator)', 'Counter', 'Terminator', 'Pointer'],
        answerIndex: 0,
        explanation: 'Akumulator mengakumulasi atau menghimpun jumlah total nilai data yang diproses selama iterasi.'
      },
      {
        question: 'Penerapan algoritma seleksi kondisi `if-elif-else` pada kasir penjualan produk pangan APHP: Jika belanja >= 100.000 diskon 10%, jika belanja >= 50.000 diskon 5%, selain itu diskon 0%. Jika total belanja Rp 75.000, diskon yang didapat adalah...',
        options: ['5% (Rp 3.750)', '10% (Rp 7.500)', '0% (Rp 0)', '15% (Rp 11.250)'],
        answerIndex: 0,
        explanation: '75.000 tidak memenuhi kondisi pertama (>= 100.000), tetapi memenuhi kondisi kedua (>= 50.000), sehingga mendapatkan diskon 5%.'
      },
      {
        question: 'Dalam aplikasi grafis DKV, warna diwakili oleh tiga nilai numerik format RGB (Red, Green, Blue) yang masing-masing berkisar antara...',
        options: ['0 sampai 255', '1 sampai 100', '0 sampai 1000', '-128 sampai 127'],
        answerIndex: 0,
        explanation: 'Nilai intensitas warna RGB berbasis 8-bit per kanal saluran warna, menghasilkan nilai integer dari 0 hingga 255.'
      },
      {
        question: 'Perintah `print("Halo", "Dunia", sep="-")` pada Python akan menghasilkan tampilan keluaran...',
        options: ['Halo-Dunia', 'Halo Dunia', 'HaloDunia', 'Halo, Dunia'],
        answerIndex: 0,
        explanation: 'Parameter `sep="-"` menentukan karakter pemisah antar-argumen yang dicetak ke konsol.'
      },
      {
        question: 'Struktur algoritma di mana sebuah fungsi memanggil dirinya sendiri secara berulang untuk menyelesaikan sub-masalah yang lebih kecil disebut...',
        options: ['Rekursi (Recursion)', 'Iterasi Sekuensial', 'Konkatenasi', 'Inheritance'],
        answerIndex: 0,
        explanation: 'Fungsi rekursif memanggil dirinya sendiri dengan kondisi basis (base case) yang menghentikan rekursi.'
      },
      {
        question: 'Operator logika pembanding "tidak sama dengan" dalam bahasa pemrograman Python dan JavaScript ditulis menggunakan lambang...',
        options: ['!=', '<>', '==', 'NOT='],
        answerIndex: 0,
        explanation: 'Simbol `!=` adalah operator standar di sebagian besar bahasa pemrograman untuk perbandingan ketidaksamaan nilai.'
      },
      {
        question: 'Simbol flowchart berbentuk segi enam (Hexagon) atau kotak ganda sering digunakan untuk menandai...',
        options: ['Inisialisasi atau persiapan variabel perulangan (Preparation)', 'Keluaran ke printer kertas', 'Penyimpanan ke disk magnetik', 'Pencabutan kabel power'],
        answerIndex: 0,
        explanation: 'Simbol heksagon merepresentasikan tahap inisialisasi awal nilai variabel atau penetapan batasan perulangan.'
      },
      {
        question: 'Manakah keuntungan utama memecah program besar menjadi beberapa fungsi (Modular Programming)?',
        options: [
          'Kode menjadi lebih mudah dibaca, mudah diuji, terhindar dari duplikasi baris kode, dan mempermudah kerja tim',
          'Program dijamin berjalan 100 kali lebih cepat tanpa memori RAM',
          'Menghilangkan kebutuhan sistem operasi',
          'Mengubah semua variabel menjadi otomatis bernilai 0'
        ],
        answerIndex: 0,
        explanation: 'Pemrograman modular meningkatkan maintainability, reusability, dan kolaborasi antar-pengembang.'
      },
      {
        question: 'Mengapa penguasaan dasar-dasar pemrograman sangat berguna bagi siswa kejuruan era digital, terlepas dari bidang keahliannya?',
        options: [
          'Melatih kemampuan berpikir logis, terstruktur, sistematis, serta memberi kemampuan untuk mengotomatisasi pekerjaan rutin sehari-hari',
          'Hanya agar siswa bisa mengubah tampilan wallpaper komputer lab',
          'Agar siswa tidak perlu lagi belajar menulis dan membaca buku teks',
          'Supaya siswa bisa merusak program komputer instansi lain'
        ],
        answerIndex: 0,
        explanation: 'Keterampilan pemrograman membangun logika analitis problem solving dan kemampuan otomatisasi alur kerja modern di dunia industri.'
      }
    ],
    asesmenUraian: [
      'Jelaskan mengapa representasi pseudocode sering dipilih oleh pengembang perangkat lunak sebelum menulis kode program sesungguhnya!',
      'Analisis cuplikan kode berikut dan jelaskan kesalahan apa yang terjadi: `while x > 0: print(x)` tanpa ada perubahan nilai x di dalam blok perulangan!'
    ],
    rubrikPenilaian: [
      {
        kriteria: 'Logika Algoritma & Flowchart',
        skor4: 'Flowchart menggunakan simbol ANSI yang benar dan alur percabangan serta perulangan terstruktur rapi.',
        skor3: 'Flowchart benar namun ada 1 kesalahan pemilihan simbol grafis.',
        skor2: 'Alur flowchart melompat-lompat dan belum lengkap.',
        skor1: 'Tidak menyertakan notasi algoritma.'
      },
      {
        kriteria: 'Koding & Eksekusi Bebas Error',
        skor4: 'Program berjalan sukses 100%, sintaks bersih, menggunakan tipe data tepat, dan output akurat.',
        skor3: 'Program berjalan namun ada bug logika kecil pada kondisi percabangan.',
        skor2: 'Program mengalami runtime error pada saat input tertentu.',
        skor1: 'Program mengalami syntax error fatal dan tidak bisa dieksekusi.'
      }
    ],
    glosarium: [
      { term: 'Algoritma', definition: 'Urutan langkah-langkah logis dan terstruktur untuk menyelesaikan suatu permasalahan.' },
      { term: 'Flowchart', definition: 'Representasi grafis dari langkah-langkah algoritma menggunakan simbol-simbol geometris standar.' },
      { term: 'Pseudocode', definition: 'Deskripsi tingkat tinggi dari algoritma pemrograman yang menggunakan konvensi struktural bahasa pemrograman tetapi ditujukan untuk dibaca manusia.' },
      { term: 'Debugging', definition: 'Proses menemukan, menganalisis, dan memperbaiki kesalahan (bug) pada perangkat lunak.' },
      { term: 'Infinite Loop', definition: 'Kondisi perulangan program yang berjalan terus-menerus tanpa henti karena kondisi berhenti tidak pernah tercapai.' }
    ],
    sumberReferensi: [
      'Knuth, D. E. (1997). The Art of Computer Programming, Vol 1: Fundamental Algorithms. Addison-Wesley.',
      'Sweigart, A. (2019). Automate the Boring Stuff with Python. No Starch Press.',
      'Kemendikbudristek (2021). Buku Guru dan Siswa Informatika Fase E. Pusat Perbukuan.',
      'Python Software Foundation (2024). Python 3.12 Official Documentation & Tutorial.'
    ]
  }
];
