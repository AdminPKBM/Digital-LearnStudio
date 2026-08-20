import { ModuleData } from '../../types';

export const plbModules: ModuleData[] = [
  // =========================================================================
  // BAB 13: DASAR DESAIN GRAFIS & KOMUNIKASI VISUAL DIGITAL
  // =========================================================================
  {
    id: 'PLB-1',
    elementId: 'PLB',
    elementName: 'Praktik Lintas Bidang',
    moduleNumber: 1,
    bab: 'BAB 13 — Dasar Desain Grafis & Komunikasi Visual Digital',
    pertemuan: 25,
    fase: 'Fase E (Kelas X SMK)',
    title: 'Prinsip Desain Visual (CRAP), Teori Warna RGB/CMYK, Tipografi, dan Vektor',
    estimatedTimeMinutes: 90,
    difficulty: 'Menengah',
    competencies: [
      'Memahami prinsip dasar desain grafis dan komunikasi visual (CRAP: Contrast, Repetition, Alignment, Proximity, Balance, White Space)',
      'Menganalisis perbedaan model warna digital RGB (layar) vs model warna cetak fisik CMYK dan psikologi warna',
      'Menerapkan hierarki tipografi digital (Heading, Body Text, Readability, Leading, Kerning) pada berbagai media',
      'Membandingkan karakteristik format gambar Vektor (.svg, .ai) dan Raster/Bitmap (.png, .jpg, .webp)',
      'Mengatur resolusi digital (72 DPI layar vs 300 DPI cetak) dan aspek rasio (1:1 feed, 9:16 reels/story, 16:9 banner)',
      'Mengoperasikan perangkat lunak desain industri (Figma, Canva, Adobe Illustrator/Inkscape)',
      'Merancang materi promosi visual: poster acara sekolah, feed media sosial, banner web, dan pedoman identitas merek (*brand guidelines*)'
    ],
    objectives: [
      'Siswa mampu menerapkan prinsip CRAP untuk menata tata letak poster yang seimbang dan mudah dipahami',
      'Siswa dapat memilih mode warna RGB untuk media web dan CMYK untuk media cetak dengan tepat guna mencegah distorsi warna',
      'Siswa mampu memilih kombinasi font yang memiliki keterbacaan tinggi dan hierarki visual yang jelas',
      'Siswa dapat membedakan file vektor dan raster serta mengekspor format file yang sesuai dengan kebutuhan publikasi',
      'Siswa mampu merancang desain kemasan produk dan media promosi digital yang selaras dengan identitas merek'
    ],
    summary: 'Fondasi desain grafis dan komunikasi visual terapan: implementasi prinsip tata letak CRAP, konversi RGB ke CMYK, hierarki tipografi, aset vektor vs raster, resolusi 300 DPI, dan pembuatan materi promosi kreatif menggunakan Figma dan Canva.',
    infographicHighlights: [
      { label: 'Prinsip CRAP', text: 'Contrast, Repetition, Alignment, dan Proximity untuk tata letak rapi.', icon: 'Layout' },
      { label: 'RGB vs CMYK', text: 'RGB untuk layar digital dinamis, CMYK untuk hasil cetak fisik presisi.', icon: 'Palette' },
      { label: 'Vektor vs Raster', text: 'Vektor SVG tidak pecah saat di-zoom; Raster PNG foto berkualitas.', icon: 'Image' },
      { label: 'Resolusi & DPI', text: '72 DPI untuk kecepatan web, 300 DPI untuk kualitas cetak tajam.', icon: 'Maximize2' }
    ],
    pertanyaanPemantik: [
      'Mengapa desain poster yang tampak sangat cerah dan menyala di layar laptop tiba-tiba warnanya berubah menjadi kusam dan gelap saat dicetak di atas kertas banner?',
      'Apa yang membuat logo sebuah perusahaan tidak pernah pecah atau buram meskipun dicetak sebesar baliho di pinggir jalan tol?',
      'Bagaimana sebuah penataan spasi dan jenis huruf (*typography*) bisa mengubah persepsi produk biasa menjadi produk mewah berharga mahal?'
    ],
    pendahuluan: `Di era banjir informasi digital saat ini, sebuah pesan hanya memiliki waktu kurang dari 3 detik untuk menarik perhatian mata audiens. Desain visual yang buruk, berantakan, dan sulit dibaca akan langsung diabaikan oleh calon pelanggan.

**Desain Komunikasi Visual (DKV)** adalah perpaduan antara seni estetika, psikologi persepsi manusia, dan teknologi komputasi untuk menyampaikan pesan secara efektif dan memikat.

Bagi seluruh siswa SMK—baik yang mendalami jurusan DKV untuk menjadi desainer profesional, maupun siswa jurusan APHP yang ingin memasarkan produk makanan olahannya secara menarik di media sosial—kemampuan merancang aset visual dengan kaidah desain yang benar adalah keterampilan kompetitif yang sangat dicari di industri modern.`,
    konsepInti: `1. **Prinsip Desain CRAP**: Contrast (kontras warna/ukuran), Repetition (konsistensi elemen berulang), Alignment (keteraturan garis lurus tepi), Proximity (kedekatan relasi jarak objek).
2. **Model Warna**: RGB (Red-Green-Blue, aditif cahaya, gamut luas untuk layar) vs CMYK (Cyan-Magenta-Yellow-Key/Black, subtraktif pigmen tinta cetak).
3. **Tipografi & Hierarki**: Serif (klasik formal), Sans-serif (modern bersih), Display (judul besar); Aturan H1 > H2 > Body; Leading (spasi baris) & Kerning (spasi huruf).
4. **Vektor vs Raster**: Vektor berbasis rumus matematika garis (SVG, AI - skala bebas), Raster berbasis kisi pixel matriks (PNG, JPG, WebP - pecah jika di-stretch).
5. **Standar Resolusi**: Layar Digital 72-96 PPI/DPI; Media Cetak Offset 300 DPI.`,
    contentMarkdown: `# BAB 13 — Dasar Desain Grafis & Komunikasi Visual Digital

## 1. Prinsip Dasar Tata Letak Desain: Metode CRAP

\`\`\`text
+-------------------------------------------------------------------------------+
|                       EMPAT PILAR PRINSIP DESAIN (C.R.A.P)                    |
+---------------------+-------------------------+-------------------------------+
| 1. CONTRAST         | 2. REPETITION           | 3. ALIGNMENT & PROXIMITY      |
| (Kontras Tajam)     | (Repetisi Konsisten)    | (Keteraturan & Kedekatan)     |
| Bedakan elemen utama| Gunakan palet warna,    | Luruskan garis batas tepi teks|
| dengan warna / font | ikon, dan gaya font yang| dan dekatkan item-item yang   |
| yang kontras jelas. | sama di seluruh halaman.| saling berhubungan satu tema. |
+---------------------+-------------------------+-------------------------------+
\`\`\`

* **Contrast**: Jangan ragu membuat elemen utama (Judul/Promo) jauh lebih besar dan mencolok daripada teks pendukung.
* **Repetition**: Konsistensi menciptakan identitas visual yang profesional dan mudah diingat.
* **Alignment**: Tidak boleh ada elemen yang diletakkan secara acak; semua harus memiliki garis batas sejajar (rata kiri, kanan, atau tengah).
* **Proximity & White Space**: Kelompokkan teks yang berhubungan dalam 1 klaster dan beri ruang kosong bernapas (*negative space*) agar mata tidak lelah.

---

## 2. Model Warna Digital: RGB vs CMYK & Psikologi Warna

\`\`\`text
+-------------------+----------------------------+------------------------------+
| PARAMETER         | RGB (Red, Green, Blue)     | CMYK (Cyan, Magenta, Yellow, Black)|
+-------------------+----------------------------+------------------------------+
| Media Target      | Layar Smartphone, Monitor  | Kertas Brosur, Spanduk, Box  |
| Cara Kerja        | Emisi Cahaya (Aditif)      | Serapan Tinta Pigmen (Subtraktif)|
| Batas Nilai       | 0 s.d 255 per warna        | 0% s.d 100% per komponen tinta|
| Efek Salah Pilih  | Jika dicetak fisik, warna menyala neon akan berubah menjadi kusam gelap!|
+-------------------+----------------------------+------------------------------+
\`\`\`

### Psikologi Warna dalam Komunikasi Merek:
* **Merah**: Energi, keberanian, urgensi promo, dan pembangkit nafsu makan (KFC, Coca-Cola).
* **Biru**: Kepercayaan, stabilitas, teknologi, dan keamanan perbankan (BCA, Intel, Twitter).
* **Hijau**: Kesegaran, kesehatan alami, lingkungan, dan pertanian (APHP Agro, Starbucks).
* **Kuning / Oranye**: Kehangatan, keceriaan, optimisme, dan keramahan.

---

## 3. Tipografi Digital dan Anatomi Hierarki Tulisan

\`\`\`text
+-------------------------------------------------------------------------------+
| JUDUL UTAMA POSTER (Heading 1 - Bold 36pt Display/Sans-Serif)                 |
| Sub-Judul Penjelas (Heading 2 - Medium 20pt Sans-Serif)                       |
|                                                                               |
| Teks isi paragraf deskripsi produk yang menggunakan font bersih dengan        |
| tingkat keterbacaan tinggi serta spasi baris (leading) yang cukup lega.       |
| (Body Text - Regular 14pt Sans-Serif)                                         |
+-------------------------------------------------------------------------------+
\`\`\`

### Klasifikasi Font Standar:
* **Serif (Berkaki)**: Memiliki sirip di ujung huruf (Times New Roman, Merriweather) → Nuansa elegan, resmi, sastra.
* **Sans-Serif (Tanpa Kaki)**: Huruf modern tanpa sirip (Inter, Roboto, Montserrat) → Nuansa modern, bersih, optimal untuk layar digital.
* **Monospace**: Lebar setiap karakter sama persis (Courier, Fira Code) → Untuk koding komputer.

---

## 4. Format Grafis: Vektor vs Raster/Bitmap

\`\`\`text
+-------------------+----------------------------+------------------------------+
| PARAMETER         | VEKTOR (.SVG, .AI, .EPS)   | RASTER (.PNG, .JPG, .WEBP)   |
+-------------------+----------------------------+------------------------------+
| Struktur          | Persamaan Matematis Garis  | Kisi-kisi Titik Pixel (Grid) |
| Skalabilitas      | Bebas diperbesar ukuran    | Pecah/Buram jika diperbesar  |
|                   | baliho tanpa kehilangan mutu| melebihi ukuran aslinya      |
| Penggunaan Utama  | Logo, Ikon, Tipografi, Maskot| Foto Kamera, Lukisan Realis  |
| Transparansi      | Mendukung Transparansi     | PNG (Ya), JPG (Tidak Bisa)   |
+-------------------+----------------------------+------------------------------+
\`\`\`

---

## 5. Resolusi dan Aspek Rasio Standar Media

* **Resolusi Layar (Web/Medsos)**: 72 s.d 96 DPI (Dots Per Inch) agar ukuran file ringan dan cepat dimuat.
* **Resolusi Cetak (Printing)**: Wajib **300 DPI** agar hasil cetakan di kertas art paper tajam dan tidak pecah bintik-bintik.
* **Aspek Rasio Populer**:
  * \`1:1\` (1080 x 1080 px) : Feed Instagram & Katalog E-Commerce.
  * \`9:16\` (1080 x 1920 px) : Instagram Story, TikTok Video, YouTube Shorts.
  * \`16:9\` (1920 x 1080 px) : Banner Website & Thumbnail YouTube.`,
    contohPenerapan: `1. **Pembuatan Desain Label Kemasan APHP**: Siswa DKV berkolaborasi dengan siswa APHP mendesain stiker label botol jus apel menggunakan format warna CMYK 300 DPI di Illustrator dan mengekspor mockup 3D format PNG transparan untuk promosi Instagram.
2. **Perancangan Brand Guidelines**: Tim membuat dokumen panduan identitas visual yang mengatur jenis font resmi, kode warna heksadesimal (#1A73E8), dan jarak batas aman (*clear space*) logo.`,
    studiKasus: `**Studi Kasus: Banner Pameran yang Rusak & Pecah Saat Dicetak**

Panitia bazar sekolah mengunduh logo sekolah berformat JPG berukuran 200x200 pixel (72 DPI) dari profil WhatsApp, lalu merentangkannya menjadi ukuran spanduk 3x1 meter di Photoshop. Saat spanduk dicetak oleh percetakan, logo sekolah tampak buram, bergerigi, dan pecah total.

**Analisis Perbaikan**:
1. Logo resmi wajib disimpan dan dikelola dalam format **Vektor (.SVG atau .AI)**.
2. File cetak spanduk harus disiapkan pada mode warna CMYK dengan resolusi minimal 150-300 DPI sesuai jarak pandang pembaca.`,
    aktivitasSiswa: `**Praktik Desain: Promotional Social Media Banner**
1. Buka aplikasi desain (Figma atau Canva).
2. Buat kanvas berukuran 1080 x 1080 px (Rasio 1:1).
3. Rancang poster promosi produk hasil karya kejuruanmu (misal: Jasa Desain DKV atau Minuman Olahan APHP) dengan menerapkan:
   - Kontras warna yang tajam (Background vs Teks).
   - Hierarki tipografi 3 tingkat (Judul > Subjudul > Kontak Info).
   - Foto produk bebas royalti dengan format PNG transparan.
4. Ekspor hasil karya ke format PNG dan PDF Siap Cetak!`,
    tipsPraktis: [
      'Gunakan maksimal 2 atau 3 kombinasi jenis font dalam satu desain agar tidak terlihat amatir dan berantakan.',
      'Sisakan ruang kosong (White Space) minimal 10-15% di sekeliling tepi kanvas agar elemen desain tidak terpotong saat dipotong mesin percetakan (*margin & bleed*).',
      'Uji keterbacaan desainmu dengan memperkecil ukuran tampilan di layar ponsel; jika judulnya masih terbaca jelas, maka hierarkimu sudah berhasil!'
    ],
    kesalahanUmum: [
      'Menarik sudut foto produk secara tidak proporsional (membuat gambar menjadi gepeng atau lonjong).',
      'Menggunakan teks warna kuning terang di atas latar belakang putih (kontras sangat rendah dan menyiksa mata).',
      'Mengirimkan file desain dengan mode warna RGB ke mesin percetakan spanduk offset.'
    ],
    rangkuman: `• Prinsip CRAP (Contrast, Repetition, Alignment, Proximity) menjamin tata letak visual terstruktur dan profesional.
• Mode warna RGB dirancang untuk layar digital, sedangkan CMYK adalah standar mutlak untuk media cetak fisik.
• Tipografi membangun keterbacaan dan kesan emosional melalui jenis Serif, Sans-serif, serta hierarki ukuran font.
• Format Vektor (SVG/AI) berbasis garis matematis yang tidak akan pernah pecah; format Raster (PNG/JPG) tersusun atas kisi piksel.
• Resolusi cetak wajib 300 DPI dengan manajemen aspek rasio yang tepat (1:1, 9:16, 16:9).`,
    refleksi: [
      'Prinsip desain mana dari metode CRAP yang menurutmu paling sering dilanggar pada poster-poster yang sering kamu lihat di jalanan?',
      'Bagaimana pemilihan warna kemasan dapat memengaruhi keputusan seseorang untuk membeli produk makanan?'
    ],
    latihanPemahaman: [
      '1. Jelaskan 4 pilar prinsip desain tata letak CRAP beserta contoh penerapannya!',
      '2. Mengapa kita wajib mengubah mode warna dari RGB ke CMYK sebelum mengirim file desain ke percetakan spanduk?',
      '3. Uraikan perbedaan mendasar antara gambar berformat Vektor dan gambar berformat Raster/Bitmap!',
      '4. Berapa standar resolusi (DPI) yang dibutuhkan untuk publikasi web digital dan media cetak fisik?'
    ],
    tugasPraktik: `**Tugas Desain Grafis: Brand Identity Mini-Kit**
Rancanglah paket identitas visual sederhana untuk produk kejuruan sekolah menggunakan Figma / Canva yang memuat:
1. Satu Logo Vektor (kombinasi simbol dan nama merek).
2. Palet Warna Resmi (3 kode warna Hex & CMYK beserta filosofinya).
3. Panduan Tipografi (Font Judul dan Font Body Text).
4. Satu Mockup Aplikasi Produk (Feed Medsos atau Label Kemasan).
Simpan dokumen dalam format PDF (\`PLB1_NAMA_KELAS.pdf\`) dan unggah ke portal LMS!`,
    asesmen: [
      {
        question: 'Prinsip desain tata letak yang menekankan pentingnya meluruskan tepi batas elemen teks atau gambar agar terlihat rapi dan terhubung adalah...',
        options: ['Alignment (Keteraturan Garis Sejajar)', 'Proximity', 'Noise', 'Rasterization'],
        answerIndex: 0,
        explanation: 'Alignment mengatur garis batas tepi elemen agar sejajar dan menciptakan tata letak visual yang teratur.'
      },
      {
        question: 'Model warna yang bekerja berdasarkan pencampuran emisi cahaya dan digunakan khusus untuk tampilan layar monitor serta smartphone adalah...',
        options: ['RGB (Red, Green, Blue)', 'CMYK (Cyan, Magenta, Yellow, Black)', 'Grayscale Cetak', 'Pantone Spot Color'],
        answerIndex: 0,
        explanation: 'RGB adalah model warna aditif pencahayaan yang menjadi standar tampilan seluruh perangkat layar digital.'
      },
      {
        question: 'Keunggulan utama dari format gambar grafis Vektor (.SVG / .AI) dibandingkan Raster (.JPG / .PNG) adalah...',
        options: [
          'Dapat diperbesar ke ukuran berapapun tanpa pernah kehilangan ketajaman atau pecah',
          'Memiliki ukuran file yang selalu lebih besar dari video',
          'Hanya bisa dibuka di satu komputer saja',
          'Tidak bisa diubah warnanya'
        ],
        answerIndex: 0,
        explanation: 'Gambar vektor tersusun dari persamaan matematis garis dan kurva sehingga bebas diskalakan ke ukuran raksasa tanpa pecah.'
      },
      {
        question: 'Resolusi standar minimal yang wajib digunakan untuk dokumen desain yang akan dicetak pada media kertas atau banner adalah...',
        options: ['300 DPI', '72 DPI', '10 DPI', '1000 DPI'],
        answerIndex: 0,
        explanation: '300 DPI (Dots Per Inch) adalah standar industri percetakan agar hasil cetak tajam, halus, dan tidak berbintik.'
      },
      {
        question: 'Keluarga font yang memiliki ciri khas sirip atau kait kecil di ujung setiap guratan hurufnya (seperti Times New Roman) disebut...',
        options: ['Serif', 'Sans-Serif', 'Monospace', 'Comic Sans'],
        answerIndex: 0,
        explanation: 'Serif adalah kelompok huruf yang memiliki sirip/kaki di ujung karakter, memberikan kesan klasik dan formal.'
      },
      {
        question: 'Model warna yang digunakan khusus untuk keperluan cetak tinta fisik pada kertas, kemasan, atau kain adalah...',
        options: ['CMYK (Cyan, Magenta, Yellow, Key/Black)', 'RGB', 'HSL', 'Hex Color'],
        answerIndex: 0,
        explanation: 'CMYK adalah model warna subtraktif yang menjadi standar mesin cetak offset dan digital printing.'
      },
      {
        question: 'Prinsip desain "Proximity" (Kedekatan) menyatakan bahwa...',
        options: [
          'Elemen-elemen yang saling berhubungan secara fungsi/makna harus diletakkan saling berdekatan agar dipahami sebagai satu kesatuan kelompok',
          'Semua teks harus ditulis dengan ukuran font yang sama',
          'Semua gambar harus diberi warna merah',
          'Jarak antar elemen harus selalu 100 cm'
        ],
        answerIndex: 0,
        explanation: 'Proximity mengelompokkan elemen terkait dalam satu ruang visual untuk mempermudah pemahaman struktur informasi.'
      },
      {
        question: 'Area kosong di sekitar elemen visual (teks dan gambar) yang berfungsi memberi ruang bernapas dan mencegah kesan sesak pada desain disebut...',
        options: ['White Space / Negative Space', 'Dead Pixel', 'Bleed Area', 'Crop Mark'],
        answerIndex: 0,
        explanation: 'White space atau negative space memberikan kelegaan visual dan meningkatkan fokus pada elemen utama.'
      },
      {
        question: 'Istilah tipografi yang merujuk pada pengaturan jarak horizontal antar-karakter huruf dalam satu kata atau kalimat adalah...',
        options: ['Tracking / Kerning', 'Leading', 'Baseline', 'Cap Height'],
        answerIndex: 0,
        explanation: 'Tracking mengatur kerapatan huruf secara keseluruhan, sedangkan Kerning mengatur jarak spesifik antar dua pasangan karakter.'
      },
      {
        question: 'Istilah tipografi yang merujuk pada jarak vertikal spasi antar-baris teks paragraf adalah...',
        options: ['Leading (Line Spacing)', 'Tracking', 'Kerning', 'Alignment'],
        answerIndex: 0,
        explanation: 'Leading mengatur jarak vertikal antar-baris teks agar nyaman dibaca dan tidak bertumpuk.'
      },
      {
        question: 'Keluarga huruf modern tanpa sirip/kait di ujungnya yang sangat bersih dan mudah dibaca di layar digital (seperti Arial, Helvetica, Roboto) disebut...',
        options: ['Sans-Serif', 'Serif', 'Blackletter', 'Decorative'],
        answerIndex: 0,
        explanation: 'Sans-Serif (tanpa sirip) memberikan kesan modern, bersih, tegas, dan sangat mudah dibaca pada resolusi layar perangkat digital.'
      },
      {
        question: 'Keluarga huruf di mana setiap karakter menempati lebar ruang horizontal yang sama persis (sering dipakai untuk tampilan kode pemrograman) adalah...',
        options: ['Monospace', 'Serif', 'Script', 'Cursive'],
        answerIndex: 0,
        explanation: 'Font monospace memberikan lebar seragam pada setiap karakter, menjaga kerapian perataan kolom kode pemrograman.'
      },
      {
        question: 'Format berkas gambar yang mendukung transparansi latar belakang (alpha channel) tanpa latar putih adalah...',
        options: ['PNG (.png) / SVG (.svg)', 'JPG (.jpg)', 'BMP (.bmp)', 'TXT (.txt)'],
        answerIndex: 0,
        explanation: 'Format PNG dan SVG mendukung lapisan transparansi, menjadikannya standar utama untuk logo dan ikon.'
      },
      {
        question: 'Margin tambahan di luar garis potong dokumen desain cetak (biasanya 2-3 mm) untuk mencegah garis putih tepi saat pisau potong meleset dinamakan...',
        options: ['Bleed Area', 'Safe Zone', 'Trim Line', 'Fold Line'],
        answerIndex: 0,
        explanation: 'Bleed adalah area lebihan gambar di luar batas potong (trim) untuk mengantisipasi ketidakakuratan mesin pemotong kertas.'
      },
      {
        question: 'Tanda garis siku kecil di sudut luar dokumen desain yang memandu operator percetakan saat memotong kertas hasil cetak disebut...',
        options: ['Crop Marks / Trim Marks', 'Watermark', 'Color Bar', 'Registration Black'],
        answerIndex: 0,
        explanation: 'Crop marks menunjukkan garis batas potong akhir dokumen hasil cetak.'
      },
      {
        question: 'Prinsip desain "Hierarchy" (Hierarki Visual) dicapai melalui cara...',
        options: [
          'Membedakan ukuran, bobot font (Bold), dan kontras warna sehingga mata pembaca otomatis tertuju ke judul utama terlebih dahulu',
          'Membuat semua tulisan seragam berukuran 12pt',
          'Menghapus semua gambar dari halaman',
          'Mengacak susunan urutan paragraf'
        ],
        answerIndex: 0,
        explanation: 'Hierarki visual memandu urutan membaca dari informasi paling penting (headline) ke informasi pendukung.'
      },
      {
        question: 'Dokumen panduan standar resmi identitas visual suatu merek/brand yang memuat aturan penggunaan logo, warna resmi, dan tipografi disebut...',
        options: ['Brand Identity Guidelines / Brand Book', 'Surat Izin Usaha', 'Daftar Menu Kasir', 'Struk Belanja'],
        answerIndex: 0,
        explanation: 'Brand Guidelines menjaga konsistensi identitas merek di semua media cetak, digital, maupun merchandise.'
      },
      {
        question: 'Representasi visual realistis skala 1:1 dari penerapan desain pada produk nyata (seperti desain label pada botol minuman atau billboard) disebut...',
        options: ['Mockup Produk', 'Wireframe', 'Source Code', 'Storyboard Sketsa'],
        answerIndex: 0,
        explanation: 'Mockup memberikan gambaran nyata kepada klien bagaimana desain visual akan terlihat pada wujud fisik aslinya.'
      },
      {
        question: 'Kerangka dasar tata letak layar hitam-putih sederhana tanpa ornamen grafis yang fokus pada penempatan fungsi antarmuka aplikasi disebut...',
        options: ['Wireframe (Lo-Fi)', 'High-Fidelity Mockup', 'Final Render 3D', 'Print Production'],
        answerIndex: 0,
        explanation: 'Wireframe adalah sketsa struktur antarmuka untuk menyepakati tata letak fungsi sebelum masuk ke tahap desain visual detail.'
      },
      {
        question: 'Format gambar modern berbasis web buatan Google yang menghasilkan ukuran file sangat kecil dengan kualitas visual tajam untuk mempercepat loading web adalah...',
        options: ['WebP (.webp)', 'TIFF (.tiff)', 'PSD (.psd)', 'RAW (.raw)'],
        answerIndex: 0,
        explanation: 'WebP mengompresi gambar hingga 30% lebih efisien dibanding JPEG/PNG tanpa degradasi kualitas yang tampak.'
      },
      {
        question: 'Lisensi font yang memberikan hak resmi kepada desainer untuk menggunakan jenis huruf tersebut pada produk komersial yang diperjualbelikan disebut...',
        options: ['Commercial License', 'Personal Use Only', 'Free Demo License', 'Evaluation Trial'],
        answerIndex: 0,
        explanation: 'Penggunaan font untuk produk komersial (kemasan, logo bisnis, iklan) wajib memiliki Commercial License legal.'
      },
      {
        question: 'Jenis lisensi Creative Commons yang memperbolehkan karya dibagikan dan dimodifikasi asalkan mencantumkan nama pencipta aslinya adalah...',
        options: ['CC BY (Attribution)', 'CC NC-ND', 'All Rights Reserved', 'Copyright Secret'],
        answerIndex: 0,
        explanation: 'CC BY adalah lisensi paling terbuka yang hanya mensyaratkan atribusi pencantuman kredit pencipta karya.'
      },
      {
        question: 'Perbedaan mendasar antara perangkat lunak pengolah vektor (seperti Adobe Illustrator / CorelDRAW) dan pengolah bitmap (Adobe Photoshop) adalah...',
        options: [
          'Pengolah vektor berbasis rumus kurva matematis untuk logo dan ilustrasi, sedangkan pengolah bitmap berbasis susunan piksel untuk manipulasi foto',
          'Vektor tidak bisa diberi warna',
          'Bitmap tidak bisa dibuka di komputer laptop',
          'Keduanya sama persis tanpa perbedaan'
        ],
        answerIndex: 0,
        explanation: 'Vektor berbasis titik koordinat matematis (resolusi independen), sedangkan bitmap tersusun atas grid piksel (resolusi dependen).'
      },
      {
        question: 'Kombinasi warna kontras komplementer (berseberangan pada roda warna) yang tepat dan mampu menarik perhatian visual seketika adalah...',
        options: ['Biru dan Oranye', 'Biru dan Biru Muda', 'Merah dan Merah Muda', 'Hitam dan Abu-abu Gelap'],
        answerIndex: 0,
        explanation: 'Warna komplementer berada tepat berseberangan pada lingkaran warna (seperti Biru-Oranye, Merah-Hijau) menciptakan kontras maksimal.'
      },
      {
        question: 'Prinsip desain "Contrast" (Kontras) digunakan untuk...',
        options: [
          'Menghindari tampilan monoton dan membuat elemen penting menonjol secara tegas dibanding elemen di sekitarnya',
          'Menyamarkan semua teks agar sulit dibaca',
          'Membuat seluruh halaman menjadi transparan',
          'Menggabungkan semua font menjadi satu huruf'
        ],
        answerIndex: 0,
        explanation: 'Kontras (ukuran, warna, bobot) menciptakan dinamika visual yang memandu mata pembaca menuju pusat perhatian.'
      },
      {
        question: 'Dalam desain kemasan produk pangan APHP karya siswa DKV, penempatan logo Halal dan izin edar BPOM harus diletakkan pada area...',
        options: [
          'Muka utama (Front of Pack) yang jelas terlihat tanpa tertutup lipatan kemasan',
          'Di bagian dalam kemasan yang terendam minyak makanan',
          'Di sudut tersembunyi dengan ukuran mikroskopis',
          'Dihilangkan sama sekali agar hemat tinta'
        ],
        answerIndex: 0,
        explanation: 'Logo Halal dan legalitas edar wajib terlihat jelas pada kemasan depan sebagai jaminan mutu dan kepercayaan konsumen.'
      },
      {
        question: 'Fitur pada software desain yang membagi lembar kerja menjadi garis kisi bantu 12 kolom vertikal untuk menjaga kerapian tata letak antarmuka disebut...',
        options: ['Grid System (Layout Grid)', 'Color Swatch', 'Gradient Map', 'Magic Wand'],
        answerIndex: 0,
        explanation: 'Layout Grid 12 kolom adalah sistem baku untuk menyusun proporsi antarmuka web dan tata letak grafis secara harmonis.'
      },
      {
        question: 'Format berkas standar industri percetakan profesional yang mengunci seluruh font, tautan gambar vektor resolusi tinggi, dan profil warna CMYK adalah...',
        options: ['PDF Print-Ready (PDF/X-1a atau PDF/X-4)', 'HTML Web', 'GIF Animasi', 'DOCX Word'],
        answerIndex: 0,
        explanation: 'Format standar PDF/X memastikan seluruh aset, font, dan profil warna tersemat utuh tanpa risiko pergeseran saat dicetak.'
      },
      {
        question: 'Istilah "Rasterize" dalam aplikasi desain grafis berarti...',
        options: [
          'Mengubah objek berbasis vektor atau teks menjadi susunan piksel bitmap tetap',
          'Menghapus layer secara permanen',
          'Mencetak dokumen ke printer',
          'Mengubah resolusi dari 300 DPI menjadi 1 DPI'
        ],
        answerIndex: 0,
        explanation: 'Rasterize mengonversi persamaan kurva vektor menjadi matriks piksel bitmap tetap.'
      },
      {
        question: 'Mengapa kolaborasi antara desainer grafis (DKV) dan pengembang teknologi informasi sangat penting dalam era ekonomi kreatif digital?',
        options: [
          'Karena keunggulan estetika visual harus dipadukan dengan fungsionalitas teknologi yang handal untuk menghasilkan produk digital bernilai tinggi',
          'Hanya agar desainer tidak perlu bekerja sendiri',
          'Supaya komputer lab tidak pernah dimatikan',
          'Agar biaya produksi produk menjadi paling mahal di pasar'
        ],
        answerIndex: 0,
        explanation: 'Sinergi desain visual dan rekayasa perangkat lunak menghasilkan pengalaman pengguna (UX) yang memikat, intuitif, dan fungsional.'
      }
    ],
    asesmenUraian: [
      'Jelaskan bagaimana konsep White Space (ruang kosong negatif) justru dapat meningkatkan kemewahan dan kejelasan sebuah karya desain grafis!',
      'Uraikan analisis Anda mengenai pentingnya keselarasan antara psikologi warna dengan target pasar produk makanan olahan!'
    ],
    rubrikPenilaian: [
      {
        kriteria: 'Penerapan Kaidah Desain CRAP',
        skor4: 'Prinsip Contrast, Repetition, Alignment, dan Proximity diterapkan secara sempurna dan menghasilkan visual profesional.',
        skor3: 'Tata letak rapi namun kontras warna teks terhadap latar belakang masih agak kurang tajam.',
        skor2: 'Elemen desain diletakkan acak tanpa keteraturan alignment.',
        skor1: 'Desain tidak menerapkan kaidah visual.'
      },
      {
        kriteria: 'Ketepatan Format Teknis',
        skor4: 'Mode warna (RGB/CMYK) dan resolusi DPI sesuai peruntukan serta aset logo berformat vektor tajam.',
        skor3: 'Format file tepat namun resolusi gambar pendukung masih agak buram.',
        skor2: 'Gambar mengalami distorsi aspek rasio (gepeng/tertarik).',
        skor1: 'Salah memilih format file secara fatal.'
      }
    ],
    glosarium: [
      { term: 'CRAP', definition: 'Akronim empat prinsip dasar desain grafis: Contrast, Repetition, Alignment, dan Proximity.' },
      { term: 'RGB', definition: 'Red Green Blue; model warna aditif berbasis cahaya yang digunakan untuk tampilan layar digital.' },
      { term: 'CMYK', definition: 'Cyan Magenta Yellow Key (Black); model warna subtraktif berbasis tinta yang digunakan untuk proses percetakan fisik.' },
      { term: 'Vektor', definition: 'Grafis digital yang dibentuk dari rumus matematis titik, garis, dan kurva geometris.' },
      { term: 'DPI / PPI', definition: 'Dots Per Inch / Pixels Per Inch; ukuran kerapatan titik piksel yang menentukan ketajaman resolusi gambar.' }
    ],
    sumberReferensi: [
      'Williams, R. (2014). The Non-Designer\'s Design Book (4th ed.). Peachpit Press.',
      'Lupton, E. (2014). Thinking with Type: A Critical Guide for Designers, Writers, Editors, & Students. Princeton Architectural Press.',
      'Kemendikbudristek (2021). Buku Dasar-Dasar Desain Komunikasi Visual SMK. Pusat Kurikulum dan Perbukuan.',
      'Adobe Design Center (2024). Color Systems and Vector Graphics Standards.'
    ]
  },

  // =========================================================================
  // BAB 14: OTOMASI & DIGITALISASI PENGOLAHAN PANGAN
  // =========================================================================
  {
    id: 'PLB-2',
    elementId: 'PLB',
    elementName: 'Praktik Lintas Bidang',
    moduleNumber: 2,
    bab: 'BAB 14 — Otomasi & Digitalisasi Pengolahan Pangan',
    pertemuan: 27,
    fase: 'Fase E (Kelas X SMK)',
    title: 'Agri-Food Tech, Sensor Mutu Pangan, Formulasi Resep Presisi, Traceability, dan IoT',
    estimatedTimeMinutes: 90,
    difficulty: 'Menengah',
    competencies: [
      'Memahami peran teknologi informatika dan komputasi dalam rantai pasok agroindustri (*Agri-Food Tech & Smart Agriculture*)',
      'Mengintegrasikan sensor digital untuk pemantauan parameter mutu pangan: Sensor Suhu & Kelembaban (DHT22), Sensor Keasaman (pH Meter), dan Refraktometer Kadar Gula (°Brix)',
      'Merancang kalkulasi formulasi resep pangan presisi, batas ambang Bahan Tambahan Pangan (BTP) BPOM, serta Harga Pokok Produksi (HPP) berbasis Spreadsheet',
      'Menerapkan sistem ketertelusuran produk pangan (*Food Traceability: Farm-to-Fork*) menggunakan Barcode EAN-13 dan kode QR batch dinamis',
      'Memahami standar regulasi pelabelan digital: Informasi Nilai Gizi, Izin Edar P-IRT/BPOM MD, Logo Halal, dan Masa Kedaluwarsa',
      'Merancang skema otomasi sederhana unit pendingin (*Cold Storage Monitoring*) berbasis mikrokontroler IoT (ESP32/Arduino)'
    ],
    objectives: [
      'Siswa mampu merumuskan lembar kerja spreadsheet untuk menghitung persentase rendemen dan formulasi resep pangan secara otomatis',
      'Siswa dapat membaca dan menginterpretasikan data sensor parameter mutu pangan (°Brix, pH, Suhu) untuk kendali mutu (Quality Control)',
      'Siswa mampu membuat label kemasan produk pangan yang memenuhi standar regulasi BPOM dan memuat QR Code ketertelusuran batch',
      'Siswa dapat merancang sistem pencatatan inventaris stok bahan baku pangan berbasis komputasi awan',
      'Siswa mampu menjelaskan arsitektur sistem monitoring suhu ruang pendingin berbasis sensor IoT'
    ],
    summary: 'Digitalisasi rantai pasok agroindustri pangan: integrasi sensor mutu (pH/Brix/Suhu), otomatisasi formulasi resep spreadsheet, ketertelusuran barcode/QR Code Farm-to-Fork, kepatuhan label BPOM/Halal, dan monitoring IoT.',
    infographicHighlights: [
      { label: 'Sensor Mutu', text: 'Kadar gula °Brix, pH meter keasaman, dan sensor suhu termokopel.', icon: 'Gauge' },
      { label: 'Formulasi Presisi', text: 'Perhitungan HPP, rendemen panen, dan batas aman BTP BPOM.', icon: 'Calculator' },
      { label: 'Food Traceability', text: 'Ketertelusuran batch Farm-to-Fork melalui Barcode & QR Code.', icon: 'QrCode' },
      { label: 'IoT Smart Storage', text: 'Monitoring ruang pendingin cold storage dengan sensor ESP32.', icon: 'Radio' }
    ],
    pertanyaanPemantik: [
      'Bagaimana sebuah pabrik minuman sari buah kemasan bisa menjamin bahwa rasa manis dan tingkat keasaman di 100.000 botol yang diproduksi selalu 100% identik?',
      'Ketika terjadi kasus keracunan makanan di suatu wilayah, bagaimana supermarket modern bisa melacak dalam 5 menit dari kebun mana dan batch produksi jam berapa makanan tersebut berasal?',
      'Apa peran sensor Internet of Things (IoT) dalam menjaga agar daging atau susu segar di ruang pendingin tidak membusuk saat listrik padam di malam hari?'
    ],
    pendahuluan: `Industri pengolahan pangan modern telah bertransformasi dari sekadar kegiatan memasak tradisional di dapur menjadi **Agroindustri Presisi (*Agri-Food Technology*)**. Di era digital, kualitas rasa, keamanan pangan, dan daya tahan produk tidak lagi ditentukan oleh perkiraan atau "kira-kira", melainkan dikendalikan secara presisi oleh data komputasi dan sensor digital.

Teknologi informatika berperan vital dalam setiap tahapan rantai pasok pangan: mulai dari pencatatan formulasi bahan baku secara matematis di spreadsheet, pemantauan sensor suhu fermentasi secara real-time, penjaminan keamanan pangan melalui pelabelan QR Code ketertelusuran (*traceability*), hingga sistem pergudangan cerdas.

Modul ini memadukan keahlian komputasi informatika dengan kompetensi kejuruan Agribisnis Pengolahan Hasil Pertanian (APHP) untuk mencetak lulusan SMK yang unggul, presisi, dan siap memimpin modernisasi pangan nasional.`,
    konsepInti: `1. **Parameter Mutu Digital**: Suhu (°C), Kelembaban Relatif (%RH), Derajat Keasaman (pH 0-14), dan Refraktometer Kadar Padatan Terlarut / Gula (°Brix).
2. **Formulasi Presisi Spreadsheet**: Perhitungan Rasio Bahan Baku, Perhitungan Rendemen (% Yield), dan Batas Maksimum Bahan Tambahan Pangan (BTP) Pengawet per kg bahan.
3. **Ketertelusuran (Food Traceability)**: Sistem identifikasi rantai pasok dari petani hingga konsumen (*Farm-to-Fork*) menggunakan kode Barcode EAN-13 dan QR Code batch produksi unik.
4. **Regulasi Label Pangan BPOM**: Tabel Informasi Nilai Gizi, Daftar Komposisi Terurut dari Terbanyak, Nomor P-IRT / BPOM, Logo Halal, dan Kode Produksi.
5. **Monitoring IoT Pangan**: Arsitektur Sensor DHT22 → Mikrokontroler ESP32 → Transmisi Wi-Fi → Cloud Dashboard / Alert Notifikasi WhatsApp/Telegram saat suhu ruang pendingin melonjak.`,
    contentMarkdown: `# BAB 14 — Otomasi & Digitalisasi Pengolahan Pangan

## 1. Rantai Pasok Pangan Digital (*Farm-to-Fork*) & Parameter Sensor

\`\`\`text
+-------------------------------------------------------------------------------+
|                   RANTAI PASOK AGROINDUSTRI PANGAN TERDIGITALISASI            |
+-------------------------------------------------------------------------------+
|                                                                               |
|   [ 1. KEBUN PETANI ]                [ 2. PABRIK PENGOLAHAN APHP ]            |
|   Sensor Cuaca & Panen  ──────────>  • Sortasi & Uji Brix Gula                |
|   Pencatatan Asal Bibit              • Formulasi Resep Presisi (Spreadsheet)  |
|                                      • Sensor Pasteurisasi Suhu Otomatis      |
|                                                      │                        |
|                 ┌────────────────────────────────────┘                        |
|                 ▼                                                             |
|   [ 3. PENGEMASAN & LABEL ]          [ 4. COLD STORAGE & LOGISTIK ]           |
|   • Label BPOM & Halal               • Monitoring Suhu Ruang IoT ESP32        |
|   • Cetak QR Code Batch Traceability • GPS Kurir Pengantaran Dingin           |
|                                                      │                        |
|                 ┌────────────────────────────────────┘                        |
|                 ▼                                                             |
|   [ 5. KONSUMEN AKHIR ]                                                       |
|   Scan QR Code di Smartphone: Muncul data kebun asal, tanggal olah, & uji mutu|
|                                                                               |
+-------------------------------------------------------------------------------+
\`\`\`

---

## 2. Sensor Digital Pengukur Kualitas Pangan

\`\`\`text
+-------------------+----------------------------+------------------------------+
| PARAMETER MUTU    | SENSOR / ALAT DIGITAL      | PENERAPAN DI INDUSTRI PANGAN |
+-------------------+----------------------------+------------------------------+
| Kadar Gula        | Refraktometer Digital      | Mengukur tingkat kemanisan   |
| (°Brix)           | Optik                      | sari buah apel, sirup, madu  |
+-------------------+----------------------------+------------------------------+
| Derajat Keasaman  | Digital pH Probe Meter     | Memantau fermentasi yogurt,  |
| (pH)              |                            | nata de coco, keju, & saus   |
+-------------------+----------------------------+------------------------------+
| Suhu Pemanasan    | Thermocouple / PT100       | Mengontrol suhu pasteurisasi |
| (°Celsius)        | Probe Stainless Steel      | susu agar bakteri patogen mati|
+-------------------+----------------------------+------------------------------+
| Kelembaban Ruang  | Sensor DHT22 / SHT31       | Mencegah pertumbuhan jamur di|
| (%RH)             | Digital                    | ruang pengering biji kopi    |
+-------------------+----------------------------+------------------------------+
\`\`\`

---

## 3. Otomatisasi Formulasi Resep dan Perhitungan Biaya (HPP)

Formulasi pangan skala industri wajib dihitung secara matematis menggunakan rumus persentase bakeri (*baker's percentage*) atau matriks formulasi:

\`\`\`text
Formula Rendemen Hasil (%):
Rendemen (%) = (Bobot Produk Jadi / Bobot Bahan Baku Awal Mentah) * 100%

Formula Batas Aman BTP Pengawet (BPOM):
Maksimal Natrium Benzoat = 1.000 mg per 1 kg produk akhir (0,1%)
\`\`\`

### Contoh Lembar Formulasi Spreadsheet APHP:
* **Sel B2 (Bobot Buah Apel Kupas)** : \`10.000 gram\`
* **Sel B3 (Rasio Gula Pasir 12%)** : \`=B2 * 12%\` → \`1.200 gram\`
* **Sel B4 (Air Matang)** : \`=B2 * 50%\` → \`5.000 ml\`
* **Sel B5 (Pengawet Benzoat 0.05%)** : \`= (B2+B3+B4) * 0.05%\` → \`8,1 gram\`
* **Sel B6 (Total Biaya Bahan)** : \`=SUM(C2:C5)\`
* **Sel B7 (HPP per Botol 250ml)** : \`=B6 / (Total_Volume / 250)\`

---

## 4. Ketertelusuran Produk (*Food Traceability*) & Standar Label BPOM

Ketertelusuran (*Traceability*) adalah kemampuan melacak riwayat, penerapan, atau lokasi suatu produk pangan melalui seluruh tahapan produksi dan distribusi.

\`\`\`text
+-------------------------------------------------------------------------------+
| ANATOMI LABEL KEMASAN PANGAN RESMI SESUAI REGULASI BPOM & HALAL               |
+-------------------------------------------------------------------------------+
|  SARI BUAH APEL ALAMI "SEGAR SMK"                                             |
|  Komposisi: Sari Buah Apel (65%), Air, Gula Pasir, Asam Sitrat, Pengawet      |
|  ---------------------------------------------------------------------------  |
|  INFORMASI NILAI GIZI (Takaran Saji: 250 ml)                                  |
|  • Energi Total : 120 kkal      • Lemak Total : 0 g                           |
|  • Karbohidrat : 28 g           • Gula Total  : 22 g                          |
|  • Protein      : 0 g           • Garam (Natrium) : 15 mg                     |
|  ---------------------------------------------------------------------------  |
|  P-IRT No: 2063206010123-28     | Logo Halal Indonesia : ID321100012345       |
|  Baik Digunakan Sebelum: 20/12/2026                                           |
|  Kode Produksi: BATCH-202608-A01 [ SCAN QR TRACEABILITY ]                     |
+-------------------------------------------------------------------------------+
\`\`\`

---

## 5. Sistem Monitoring Ruang Pendingin (*Cold Storage*) Berbasis IoT

\`\`\`text
+-------------------------------------------------------------------------------+
|                    SKEMA ARSITEKTUR IOT COLD STORAGE PANGAN                   |
+-------------------------------------------------------------------------------+
|                                                                               |
|   [ SENSOR SUHU DS18B20 ] ──> [ MIKROKONTROLER ESP32 ] ──> [ WI-FI ROUTER ]   |
|   (Mendeteksi suhu daging)    (Baca data setiap 10 detik)    (Kirim ke cloud) |
|                                                                     │         |
|                                                                     ▼         |
|   [ AKSI DARURAT TELEGRAM ] <── [ CLOUD SERVER MQTT / ADAFRUIT IO ]           |
|   "PERINGATAN: Suhu Cold Room                                                 |
|    Naik ke 12°C! Periksa Mesin!"                                              |
|                                                                               |
+-------------------------------------------------------------------------------+
\`\`\``,
    contohPenerapan: `1. **Sistem Sortir Buah Otomatis**: Unit APHP menggunakan kamera komputer terhubung ke mikrokontroler dengan model computer vision sederhana untuk memilah tomat matang merah dan tomat mentah hijau di konveyor berjalan.
2. **Kalkulator Formulasi Selai Nanas**: Siswa membuat aplikasi web spreadsheet yang meminta input berat buah nanas parut dan otomatis memunculkan takaran gula, pektin, dan asam sitrat yang presisi hingga angka desimal gram.`,
    studiKasus: `**Studi Kasus: Kerusakan 500 Liter Susu Pasteurisasi di Lab APHP**

Lab pengolahan susu SMK mengalami insiden: 500 botol susu pasteurisasi mengalami pembusukan dan basi hanya dalam 2 hari setelah diproduksi.
Setelah dilakukan investigasi digital:
1. **Analisis Data Sensor Suhu**: Data log sensor thermocouple menunjukkan suhu pasteurisasi hanya mencapai 62°C selama 10 menit (seharusnya minimal 72°C selama 15 detik).
2. **Analisis Log Cold Storage**: Terjadi pemadaman listrik selama 4 jam di malam hari sehingga suhu freezer naik dari -4°C menjadi 18°C tanpa ada yang tahu.

**Solusi Sistem**:
Pasang modul IoT ESP32 bertenaga baterai cadangan dengan sensor suhu DS18B20 yang otomatis mengirimkan pesan alarm darurat ke WhatsApp guru dan teknisi lab jika suhu pendingin naik di atas 4°C!`,
    aktivitasSiswa: `**Praktik Lab: Perancangan Formulasi Resep & QR Traceability**
1. Buka spreadsheet Excel / Google Sheets.
2. Buat tabel formulasi produksi salah satu produk pangan lokal (misal: Keripik Pisang Rasa, Minuman Sari Jahe, atau Roti Manis).
3. Buat rumus otomatis untuk menghitung kebutuhan bahan baku, batas maksimal pengawet, dan Harga Pokok Produksi (HPP) per kemasan.
4. Buat sebuah **QR Code dinamis** menggunakan generator QR online yang berisi data nomor batch, tanggal kadaluarsa, dan nama kelompok siswa pembuatnya.
5. Tempelkan QR Code tersebut pada desain label kemasan!`,
    tipsPraktis: [
      'Kalibrasi sensor pH meter menggunakan cairan buffer standar (pH 4.0 dan pH 7.0) sebelum digunakan untuk mengukur keasaman produk pangan.',
      'Urutkan daftar komposisi bahan pada label kemasan dari bahan yang persentase bobotnya paling banyak hingga yang paling sedikit sesuai aturan resmi BPOM.',
      'Gunakan kata sandi terenkripsi pada spreadsheet master formulasi resep rahasia agar tidak bisa diubah sembarangan oleh pihak luar.'
    ],
    kesalahanUmum: [
      'Menghitung takaran pengawet makanan hanya berdasarkan perkiraan sendok makan tanpa timbangan digital gram presisi.',
      'Mencetak label kemasan tanpa mencantumkan nomor kode produksi batch (sehingga mustahil dilakukan penarikan produk jika ada cacat mutu).',
      'Mengabaikan pembersihan dan sterilisasi probe sensor setelah mencelupkannya ke dalam cairan bahan uji asam/gula.'
    ],
    rangkuman: `• Agri-Food Tech memanfaatkan komputasi untuk menjamin kualitas, efisiensi, dan keamanan pangan secara terukur.
• Sensor digital (°Brix, pH meter, thermocouple) menggantikan estimasi subjektif manusia dalam pengendalian mutu.
• Formulasi spreadsheet presisi menghitung persentase rendemen, takaran aman BTP BPOM, dan kalkulasi HPP.
• Food Traceability memungkinkan pelacakan riwayat produk dari kebun hingga meja konsumen melalui Barcode dan QR Code.
• Sistem monitoring IoT (ESP32/Cloud) menjaga suhu ruang pendingin cold storage dari bahaya pembusukan.`,
    refleksi: [
      'Bagaimana penerapan teknologi digital di bidang pangan dapat membantu mencegah kasus keracunan makanan di masyarakat?',
      'Apakah unit produksi pangan di sekolahmu sudah memanfaatkan pencatatan digital dan sensor otomatis?'
    ],
    latihanPemahaman: [
      '1. Sebutkan 3 parameter sensor digital yang krusial dalam pengendalian mutu pangan beserta fungsinya!',
      '2. Bagaimana rumus menghitung rendemen hasil pengolahan pangan dan mengapa angka rendemen sangat penting bagi efisiensi bisnis?',
      '3. Jelaskan konsep Food Traceability (Farm-to-Fork) dan apa manfaatnya bagi perlindungan konsumen!',
      '4. Sebutkan komponen-komponen wajib yang harus tercantum pada label kemasan pangan resmi BPOM!'
    ],
    tugasPraktik: `**Tugas Laporan Terpadu: Formulasi & Label Pangan Digital**
Buatlah dokumen proyek komprehensif (file PDF) yang memuat:
1. Lembar Formulasi Resep Presisi Produk Pangan APHP berbasis spreadsheet (lengkap dengan rumus dan rincian HPP).
2. Desain Label Kemasan Lengkap yang mematuhi standar BPOM (Informasi Nilai Gizi, Komposisi, Logo Halal, dan Tanggal Kedaluwarsa).
3. Satu kode QR Code aktif yang jika di-scan mengarahkan ke halaman web log ketertelusuran batch produksi.
Simpan dalam format PDF (\`PLB2_NAMA_KELAS.pdf\`) dan kumpulkan ke portal LMS!`,
    asesmen: [
      {
        question: 'Alat ukur digital yang digunakan dalam industri pengolahan pangan untuk mengukur persentase kadar gula atau padatan terlarut pada sari buah adalah...',
        options: ['Refraktometer Digital (°Brix)', 'Barometer Udara', 'Anemometer', 'Oscilloscope'],
        answerIndex: 0,
        explanation: 'Refraktometer mengukur indeks bias cahaya untuk menentukan konsentrasi kadar gula dalam satuan derajat Brix (°Brix).'
      },
      {
        question: 'Konsep pelacakan rantai pasok produk pangan dari asal usul kebun petani hingga ke tangan konsumen akhir disebut...',
        options: ['Food Traceability (Farm-to-Fork)', 'Food Plagiarism', 'Digital Divide', 'Overclocking Storage'],
        answerIndex: 0,
        explanation: 'Food Traceability adalah sistem pelacakan identitas dan riwayat keamanan pangan di sepanjang rantai distribusi pangan.'
      },
      {
        question: 'Aturan baku penulisan daftar komposisi bahan baku pada label kemasan makanan menurut regulasi BPOM adalah...',
        options: [
          'Diurutkan dari bahan dengan persentase bobot terbesar hingga terkecil',
          'Diurutkan berdasarkan abjad A sampai Z',
          'Hanya menuliskan bahan yang rasanya manis saja',
          'Diurutkan secara acak'
        ],
        answerIndex: 0,
        explanation: 'Sesuai regulasi BPOM dan internasional, komposisi pangan wajib diurutkan dari bahan dengan kandungan terbanyak.'
      },
      {
        question: 'Komponen mikrokontroler murah yang populer digunakan untuk mengirimkan data sensor suhu cold storage secara nirkabel melalui Wi-Fi adalah...',
        options: ['ESP32 / ESP8266', 'Harddisk IDE', 'Kabel VGA', 'Power Supply ATX'],
        answerIndex: 0,
        explanation: 'ESP32 adalah mikrokontroler dengan modul Wi-Fi dan Bluetooth terintegrasi untuk aplikasi Internet of Things (IoT).'
      },
      {
        question: 'Perhitungan persentase rendemen hasil pengolahan pangan dihitung dengan membagi...',
        options: [
          'Bobot produk jadi akhir dengan bobot bahan baku awal dikalikan 100%',
          'Harga jual dengan harga beli',
          'Jumlah karyawan dengan luas pabrik',
          'Volume air dengan kadar gula'
        ],
        answerIndex: 0,
        explanation: 'Rendemen = (Bobot Produk Jadi / Bobot Bahan Baku Awal) * 100%, mengukur tingkat efisiensi pemanfaatan bahan baku.'
      },
      {
        question: 'Alat ukur digital yang digunakan untuk mengukur tingkat derajat keasaman atau kebasaan pada produk olahan pangan cair (seperti yogurt, cuka, atau jus) adalah...',
        options: ['Digital pH Meter', 'Lux Meter', 'Speedometer', 'Sound Level Meter'],
        answerIndex: 0,
        explanation: 'Digital pH Meter mengukur konsentrasi ion hidrogen untuk menentukan nilai pH dari skala 0 (sangat asam) hingga 14 (sangat basa).'
      },
      {
        question: 'Jika 50 kg ubi kayu segar diolah menjadi keripik dan menghasilkan 20 kg keripik siap jual, berapakah persentase rendemennya?',
        options: ['40%', '25%', '50%', '70%'],
        answerIndex: 0,
        explanation: 'Rendemen = (20 kg / 50 kg) * 100% = 40%.'
      },
      {
        question: 'Sensor suhu digital yang memiliki probe kedap air berbahan stainless steel yang umum digunakan untuk memonitor suhu pasteurisasi susu adalah...',
        options: ['Sensor DS18B20 / Thermocouple K-Type', 'LDR (Light Dependent Resistor)', 'Sensor PIR Gerak', 'Sensor Gas MQ-2'],
        answerIndex: 0,
        explanation: 'Probe DS18B20 stainless steel tahan air dan korosi cairan pangan pada rentang suhu operasional pengolahan.'
      },
      {
        question: 'Aktivitas air (Water Activity / aw) pada bahan pangan yang diukur dengan sensor Aw meter mengindikasikan...',
        options: [
          'Jumlah air bebas yang dapat digunakan oleh mikroorganisme (bakteri/jamur) untuk tumbuh dan merusak makanan',
          'Kecepatan aliran air pada pipa pabrik',
          'Kadar garam dalam makanan',
          'Berat total kemasan plastik'
        ],
        answerIndex: 0,
        explanation: 'Nilai Aw (0.0 - 1.0) menentukan stabilitas mikrobiologis makanan; semakin rendah Aw, makanan semakin awet dari pembusukan.'
      },
      {
        question: 'Batas maksimum penggunaan Bahan Tambahan Pangan (BTP) seperti natrium benzoat (pengawet) ditetapkan secara ketat oleh BPOM bertujuan untuk...',
        options: [
          'Melindungi kesehatan konsumen dari risiko toksisitas atau efek samping konsumsi jangka panjang',
          'Membuat makanan terasa lebih pahit',
          'Mempercepat makanan basi',
          'Menaikkan harga produk 10 kali lipat'
        ],
        answerIndex: 0,
        explanation: 'BTP memiliki batasan Acceptable Daily Intake (ADI) dan batas maksimum per kg pangan untuk menjamin keamanan pangan.'
      },
      {
        question: 'Dalam formulasi resep spreadsheet APHP, apa yang dimaksud dengan HPP (Harga Pokok Produksi)?',
        options: [
          'Total seluruh biaya langsung (bahan baku + kemasan + tenaga kerja + utilitas listrik/gas) yang dikeluarkan untuk menghasilkan 1 unit produk jadi',
          'Harga jual yang tertera di struk toko ritel modern',
          'Pajak pertambahan nilai (PPN)',
          'Keuntungan bersih yang diterima pengusaha'
        ],
        answerIndex: 0,
        explanation: 'HPP adalah akumulasi seluruh beban biaya produksi riil sebelum ditambahkan persentase margin laba keuntungan.'
      },
      {
        question: 'Teknologi kode batang dua dimensi (2D Barcode) yang mampu menyimpan tautan URL informasi riwayat panen, uji lab, dan tanggal kedaluwarsa adalah...',
        options: ['QR Code (Quick Response Code)', 'Barcode 1D Garis Hitam Putih Standar UPC', 'Magnetik Strip Kartu', 'Pita Kaset'],
        answerIndex: 0,
        explanation: 'QR Code memiliki kapasitas data alfanumerik tinggi dan dapat dipindai langsung dengan kamera smartphone konsumen.'
      },
      {
        question: 'Tindakan wajib yang harus dilakukan sebelum menggunakan probe pH meter digital untuk memastikan hasil pembacaan akurat adalah...',
        options: [
          'Melakukan kalibrasi menggunakan larutan penyangga (Buffer Solution pH 4.0, 7.0, atau 10.0)',
          'Mencelupkan ke dalam minyak goreng mendidih',
          'Memukul probe dengan sendok logam',
          'Menjemur alat di bawah terik matahari seharian'
        ],
        answerIndex: 0,
        explanation: 'Kalibrasi larutan buffer pH standar menjamin sensor membaca nilai keasaman secara presisi tanpa offset kesalahan.'
      },
      {
        question: 'Sistem manajemen keamanan pangan internasional berbasis pencegahan bahaya biologis, kimia, dan fisik pada setiap titik kritis pengolahan disebut...',
        options: ['HACCP (Hazard Analysis Critical Control Point)', 'TCP/IP Protocol', 'RGB Model', 'Kanban Agile'],
        answerIndex: 0,
        explanation: 'HACCP adalah pendekatan sistematis ilmiah untuk mengidentifikasi, mengevaluasi, dan mengendalikan bahaya keamanan pangan.'
      },
      {
        question: 'Informasi wajib yang HARUS tercantum pada label kemasan pangan olahan menurut UU Pangan dan BPOM, KECUALI...',
        options: [
          'Nama produk, daftar komposisi, berat bersih, nama & alamat produsen, tanggal kedaluwarsa, dan kode produksi',
          'Daftar akun media sosial pribadi seluruh karyawan pabrik',
          'Tanda izin edar (P-IRT / MD / ML) dan logo Halal jika dipersyaratkan',
          'Informasi Nilai Gizi (Nutrition Facts)'
        ],
        answerIndex: 1,
        explanation: 'Akun media sosial pribadi karyawan bukan merupakan elemen regulasi label kemasan pangan BPOM.'
      },
      {
        question: 'Tujuan dari pencantuman nomor "Kode Produksi / Batch Number" pada kemasan pangan adalah...',
        options: [
          'Memudahkan pelacakan dan penarikan produk (product recall) secara presisi apabila ditemukan cacat mutu pada periode produksi tertentu',
          'Hanya sebagai hiasan kemasan',
          'Sebagai nomor undian berhadiah',
          'Menunjukkan nomor telepon kurir ekspedisi'
        ],
        answerIndex: 0,
        explanation: 'Kode batch mengidentifikasi kelompok produk yang diproduksi pada waktu, jalur mesin, dan batch bahan baku yang sama.'
      },
      {
        question: 'Dalam neraca massa pembuatan sirup buah, jika ditambahkan 10 kg gula pasir ke dalam 40 kg sari buah murni, berapa total bobot adonan sirup sebelum dimasak?',
        options: ['50 kg', '400 kg', '4 kg', '30 kg'],
        answerIndex: 0,
        explanation: 'Prinsip kekekalan massa: Total massa masuk = 10 kg + 40 kg = 50 kg adonan sirup.'
      },
      {
        question: 'Sensor digital yang mengukur intensitas warna objektif pada bahan pangan berdasarkan koordinat ruang warna L* (kecerahan), a* (merah/hijau), dan b* (kuning/biru) adalah...',
        options: ['Colorimeter / Spektrofotometer Warna', 'pH Meter', 'Viskometer', 'Barometer'],
        answerIndex: 0,
        explanation: 'Colorimeter digital membaca parameter L*a*b* untuk mengontrol keseragaman warna produk olahan pangan secara standar.'
      },
      {
        question: 'Alat ukur digital yang digunakan untuk mengukur tingkat kekentalan atau viskositas pada saus tomat, kecap, atau selai buah adalah...',
        options: ['Viskometer Digital', 'Refraktometer', 'Termometer', 'Anemometer'],
        answerIndex: 0,
        explanation: 'Viskometer mengukur resistansi fluida terhadap gaya geser untuk menentukan kekentalan (viskositas) produk pangan cair/semi-padat.'
      },
      {
        question: 'Kondisi penyimpanan ruang pendingin (Cold Storage) daging atau produk beku yang dipantau dengan IoT idealnya dijaga pada suhu...',
        options: ['-18°C atau lebih rendah', '+25°C suhu ruang', '+60°C hangat', '+100°C mendidih'],
        answerIndex: 0,
        explanation: 'Standar rantai dingin (cold chain) internasional untuk pangan beku (frozen food) adalah suhu -18°C untuk menghentikan pertumbuhan mikroba.'
      },
      {
        question: 'Kelebihan pencatatan log kontrol kualitas (Quality Control) berbasis aplikasi spreadsheet digital dibanding buku catatan kertas manual di lab APHP adalah...',
        options: [
          'Data tersimpan rapi, tidak mudah hilang/rusak, rumus rekapitulasi otomatis, dan grafik tren mutu langsung terbentuk real-time',
          'Buku kertas selalu lebih tahan air dibanding cloud storage',
          'Membuat komputer menghasilkan bau buah',
          'Tidak membutuhkan daya baterai atau listrik sama sekali'
        ],
        answerIndex: 0,
        explanation: 'Digitalisasi QC log mempercepat audit data, mencegah manipulasi catatan, dan menyediakan analitik otomatis.'
      },
      {
        question: 'Dalam pembuatan selai buah nanas, penambahan pektin dan asam sitrat bertujuan untuk...',
        options: [
          'Membentuk struktur gel selai yang kokoh pada tingkat keasaman (pH) dan kadar gula (°Brix) yang tepat',
          'Membuat selai menjadi cair seperti air teh',
          'Menghilangkan warna kuning buah nanas',
          'Membuat selai meledak saat dibuka'
        ],
        answerIndex: 0,
        explanation: 'Pektin membentuk jaringan gel stabil pada kondisi asam optimal (pH 3.0-3.4) dan padatan terlarut sekitar 65% Brix.'
      },
      {
        question: 'Jika HPP 1 botol jus buah Rp 6.000 dan unit usaha siswa menetapkan margin keuntungan sebesar 25% dari HPP, berapakah harga jual produk tersebut?',
        options: ['Rp 7.500', 'Rp 8.000', 'Rp 6.250', 'Rp 10.000'],
        answerIndex: 0,
        explanation: 'Laba = 25% * Rp 6.000 = Rp 1.500. Harga Jual = Rp 6.000 + Rp 1.500 = Rp 7.500.'
      },
      {
        question: 'Teknologi RFID (Radio Frequency Identification) dalam industri logistik pangan cerdas digunakan untuk...',
        options: [
          'Melacak identitas dan pergerakan krat wadah produk secara nirkabel otomatis tanpa kontak langsung saat melewati gerbang gudang',
          'Memasak bahan makanan dengan gelombang suara',
          'Mengubah biji kopi menjadi cokelat',
          'Memotong buah dari jarak 10 meter'
        ],
        answerIndex: 0,
        explanation: 'Tag RFID memungkinkan pemindaian massal otomatis seluruh inventaris pangan saat melewati pemindai radio gudang.'
      },
      {
        question: 'Sensory Evaluation (Uji Organoleptik) digital mengumpulkan data penilaian panelis manusia terhadap parameter pangan yang mencakup...',
        options: ['Warna, Aroma, Rasa, Tekstur, dan Penerimaan Keseluruhan (Hedonik)', 'Berat badan panelis', 'Merek laptop yang digunakan', 'Kecepatan internet wifi'],
        answerIndex: 0,
        explanation: 'Uji hedonik organoleptik mengukur respon sensorik panca indra manusia terhadap sifat mutu produk pangan.'
      },
      {
        question: 'Apa bahaya utama jika probe sensor suhu/pH tidak dibersihkan dengan air suling (aquades) setelah menguji satu sampel cairan pangan?',
        options: [
          'Terjadi kontaminasi silang (cross-contamination) yang menyebabkan pembacaan sampel berikutnya menjadi tidak akurat',
          'Sensor akan berubah menjadi berwarna ungu',
          'Layar monitor komputer akan mati seketika',
          'Tidak ada bahaya sama sekali'
        ],
        answerIndex: 0,
        explanation: 'Residu sampel sebelumnya akan mengotori elektroda probe dan mendistorsi hasil pengukuran sampel selanjutnya.'
      },
      {
        question: 'Prinsip Good Manufacturing Practices (GMP) dalam industri pangan mencakup pedoman standar mengenai...',
        options: [
          'Kebersihan personalia, sanitasi peralatan, kontrol proses pengolahan, dan pencegahan kontaminasi di lingkungan pabrik',
          'Teknik meretas jaringan komputer kompetitor',
          'Cara memasang wallpaper komputer dengan cepat',
          'Aturan bermain game saat jam kerja'
        ],
        answerIndex: 0,
        explanation: 'GMP adalah pedoman cara produksi pangan yang baik dan higienis untuk menghasilkan produk yang aman dan bermutu.'
      },
      {
        question: 'Dalam aplikasi pemantauan IoT, fitur "Alert / Notifikasi Telegram/WA" diaktifkan apabila...',
        options: [
          'Suhu atau kelembaban ruangan melampaui batas ambang kritis aman yang telah ditentukan',
          'Siswa selesai mengetik dokumen Word',
          'Komputer sedang memutar lagu',
          'Lampu ruangan menyala terang'
        ],
        answerIndex: 0,
        explanation: 'Notifikasi otomatis memberi peringatan dini kepada teknisi/petugas saat terjadi anomali suhu agar segera ditangani.'
      },
      {
        question: 'Sertifikasi Halal resmi di Indonesia diterbitkan oleh Badan Penyelenggara Jaminan Produk Halal (BPJPH) berdasarkan ketetapan fatwa halal dari...',
        options: ['Majelis Ulama Indonesia (MUI)', 'Kementerian Perhubungan', 'Dinas Kebersihan Kota', 'Operator Telekomunikasi'],
        answerIndex: 0,
        explanation: 'Ketetapan kehalalan produk secara syariah ditetapkan oleh Komisi Fatwa MUI setelah melalui audit Lembaga Pemeriksa Halal (LPH).'
      },
      {
        question: 'Mengapa penerapan teknologi komputasi, otomasi sensor, dan digitalisasi data sangat krusial dalam mencetak lulusan APHP yang kompetitif?',
        options: [
          'Karena industri pangan modern menuntut efisiensi tinggi, konsistensi mutu berbasis data, dan jaminan keamanan pangan terverifikasi digital',
          'Hanya agar siswa terlihat modern di depan kamera',
          'Supaya produk pangan tidak perlu dijual ke pasar',
          'Agar siswa tidak perlu lagi mencuci peralatan pengolahan pangan'
        ],
        answerIndex: 0,
        explanation: 'Smart Agri-Food Processing menjamin daya saing lulusan SMK di era industri manufaktur pangan 4.0 yang serba terotomasi dan terdata presisi.'
      }
    ],
    asesmenUraian: [
      'Jelaskan mengapa pengukuran parameter pH (keasaman) sangat kritis dalam proses fermentasi yogurt atau pengawetan saus olahan pangan!',
      'Uraikan skenario bagaimana teknologi sensor IoT dapat mencegah kerugian finansial akibat kegagalan pendingin pada gudang penyimpanan daging beku!'
    ],
    rubrikPenilaian: [
      {
        kriteria: 'Ketepatan Formulasi & HPP',
        skor4: 'Kalkulasi resep spreadsheet 100% presisi, batas BTP mematuhi BPOM, dan perhitungan HPP logis.',
        skor3: 'Formulasi baik namun ada sedikit kesalahan pembulatan pada perhitungan persentase BTP.',
        skor2: 'Formula spreadsheet belum dinamis dan masih menggunakan hitungan manual.',
        skor1: 'Tidak menyertakan tabel formulasi resep.'
      },
      {
        kriteria: 'Kepatuhan Standar Label & Traceability',
        skor4: 'Label memuat seluruh elemen wajib BPOM, komposisi terurut benar, dan QR Code traceability berfungsi aktif saat di-scan.',
        skor3: 'Label lengkap namun QR code hanya mengarah ke link statis tanpa data batch.',
        skor2: 'Elemen label banyak yang hilang (tidak ada informasi nilai gizi).',
        skor1: 'Desain label tidak memenuhi standar kemasan pangan.'
      }
    ],
    glosarium: [
      { term: 'Agri-Food Tech', definition: 'Penerapan teknologi digital dan komputasi modern untuk meningkatkan efisiensi serta mutu rantai pasok agroindustri.' },
      { term: 'Derajat Brix (°Brix)', definition: 'Satuan skala konsentrasi padatan terlarut (terutama gula) dalam suatu larutan cairan.' },
      { term: 'Food Traceability', definition: 'Sistem penelusuran riwayat perjalanan produk pangan di seluruh rantai pasok dari produsen ke konsumen.' },
      { term: 'BTP (Bahan Tambahan Pangan)', definition: 'Bahan yang ditambahkan ke dalam pangan untuk memengaruhi sifat atau bentuk pangan sesuai batas aman BPOM.' },
      { term: 'Cold Storage Monitoring', definition: 'Sistem pemantauan suhu dan kelembaban ruang pendingin secara otomatis berbasis sensor IoT.' }
    ],
    sumberReferensi: [
      'Badan Pengawas Obat dan Makanan RI (2021). Peraturan BPOM tentang Label Pangan Olahan.',
      'Fellows, P. J. (2016). Food Processing Technology: Principles and Practice (4th ed.). Woodhead Publishing.',
      'Kemendikbudristek (2021). Dasar-Dasar Agribisnis Pengolahan Hasil Pertanian Kelas X SMK. Pusat Perbukuan.',
      'FAO (Food and Agriculture Organization) (2023). Digital Technologies in Agriculture and Food Systems.'
    ]
  },

  // =========================================================================
  // BAB 15: PROYEK KOLABORATIF LINTAS DISIPLIN / PRAKTIK LINTAS BIDANG (PLB)
  // =========================================================================
  {
    id: 'PLB-3',
    elementId: 'PLB',
    elementName: 'Praktik Lintas Bidang',
    moduleNumber: 3,
    bab: 'BAB 15 — Proyek Kolaboratif Lintas Disiplin (PLB)',
    pertemuan: 29,
    fase: 'Fase E (Kelas X SMK)',
    title: 'Manajemen Proyek Lintas Bidang, Design Thinking, Kerangka Kerja Agile, dan Pameran Karya',
    estimatedTimeMinutes: 90,
    difficulty: 'Mahir',
    competencies: [
      'Mengintegrasikan seluruh 8 elemen Capaian Pembelajaran Informatika (BK, TIK, SK, JKI, AD, AP, DSI, PLB) dalam pemecahan masalah nyata',
      'Menerapkan metodologi Design Thinking: Empathize (Empati Masalah) → Define (Rumusan Isu) → Ideate (Brainstorm Solusi) → Prototype (Purwarupa) → Test (Pengujian Pengguna)',
      'Menerapkan kerangka kerja kolaborasi tim Agile/Scrum: Product Backlog, Sprint Planning, Daily Standup, dan Sprint Review',
      'Membagi peran tim multidisiplin: Project Manager, Visual/UI Designer (DKV), Data Analyst & Programmer (AP/AD), dan Domain Specialist (APHP/Kejuruan)',
      'Mengeksekusi proyek dalam 5 fase terstruktur: Riset Lapangan → Perancangan Solusi → Pengembangan Terpadu → Uji Coba UAT → Pameran Karya (*Exhibition*)',
      'Menyusun dokumen laporan teknis, poster pameran ilmiah, video demonstrasi produk, dan presentasi *Pitch Deck* profesional'
    ],
    objectives: [
      'Siswa mampu bekerja dalam tim kolaboratif lintas kompetensi kejuruan untuk menyelesaikan tantangan industri lokal',
      'Siswa dapat merancang jadwal kerja sprint dan memantau progres tugas menggunakan papan Kanban digital (Trello / Notion / Jira)',
      'Siswa mampu menghasilkan purwarupa solusi terintegrasi (misal: Aplikasi Web Kasir + Desain Kemasan + Database Penjualan + Label Nutrisi)',
      'Siswa dapat melakukan User Acceptance Testing (UAT) dan mengukur tingkat kepuasan pengguna menggunakan kuesioner terstruktur',
      'Siswa mampu mempresentasikan dan mempertahankan karya inovasinya di hadapan dewan penguji dan pengunjung pameran sekolah'
    ],
    summary: 'Puncak pembelajaran Informatika Fase E: integrasi holistik 8 elemen komputasi melalui proyek kolaboratif berbasis Design Thinking dan Agile Scrum untuk menghasilkan solusi nyata yang dipamerkan dalam ekshibisi sekolah.',
    infographicHighlights: [
      { label: 'Design Thinking', text: 'Empathize → Define → Ideate → Prototype → Test.', icon: 'Lightbulb' },
      { label: 'Agile & Scrum', text: 'Manajemen sprint terukur dengan papan Kanban dan daily check-in.', icon: 'Kanban' },
      { label: 'Integrasi 8 Elemen', text: 'Perpaduan logika koding, desain visual, data, dan etika siber.', icon: 'Puzzle' },
      { label: 'Pameran Karya', text: 'Pitch deck presentasi, poster ekshibisi, dan video demo produk.', icon: 'Trophy' }
    ],
    pertanyaanPemantik: [
      'Bagaimana perusahaan teknologi raksasa dunia seperti Google, Gojek, atau Tokopedia bisa mengoordinasikan ribuan desainer, programmer, dan manajer untuk merilis aplikasi yang sempurna?',
      'Jika kamu diberikan tantangan untuk memodernisasi sebuah UMKM kuliner di dekat rumahmu dalam waktu 3 minggu, peran apa yang ingin kamu ambil di dalam tim?',
      'Apa rahasia sebuah presentasi *pitch deck* yang mampu meyakinkan juri dan calon investor hanya dalam waktu 5 menit?'
    ],
    pendahuluan: `Selamat! Kamu telah tiba di babak puncak pembelajaran Informatika Kelas X SMK. Selama satu tahun ajaran, kamu telah mempelajari potongan-potongan penting teknologi: berpikir komputasional, perangkat keras, jaringan internet, analisis data spreadsheet, logika koding pemrograman, literasi digital, hingga desain grafis dan otomasi pangan.

Namun, di dunia industri yang sesungguhnya, **teknologi tidak pernah bekerja secara terisolasi**. Seorang programmer hebat tidak akan sukses tanpa sentuhan estetika desainer UI/UX, dan sebuah produk pangan yang lezat tidak akan terjual tanpa sistem pencatatan data dan media promosi digital yang kuat.

**Praktik Lintas Bidang (PLB)** adalah ruang pembuktian di mana kamu dan timmu akan melebur seluruh ilmu yang telah dipelajari menjadi sebuah karya inovasi nyata (*Cap-Stone Project*) yang siap dipamerkan dan membawa manfaat langsung bagi masyarakat!`,
    konsepInti: `1. **Integrasi 8 Elemen Informatika**: BK (Logika), TIK (Kolaborasi Dokumen), SK (Hardware/OS), JKI (Jaringan/Cloud), AD (Analisis Data), AP (Pemrograman Solusi), DSI (Etika/UU PDP), PLB (Kolaborasi Tim).
2. **Design Thinking**: Empathize (observasi kebutuhan pengguna) → Define (rumusan masalah inti) → Ideate (ide solusi kreatif) → Prototype (pembuatan produk nyata) → Test (uji coba langsung).
3. **Agile Scrum**: Sprint 2 Mingguan, Product Backlog, Task Board (To Do, In Progress, Review, Done).
4. **Peran Tim**: Project Manager (koordinator alur waktu), UI/Visual Designer (DKV), Coder/Data Analyst (AP/AD), Domain Specialist (APHP/Kejuruan).
5. **5 Fase Eksekusi**: Riset Masalah → Desain Wireframe/Flow → Pengembangan Solusi → Pengujian UAT → Pelaporan & Ekshibisi Pameran.`,
    contentMarkdown: `# BAB 15 — Proyek Kolaboratif Lintas Disiplin (PLB)

## 1. Peta Integrasi Holistik 8 Elemen Informatika

\`\`\`text
+-------------------------------------------------------------------------------+
|                       ARSITEKTUR PROYEK LINTAS BIDANG (PLB)                   |
+-------------------------------------------------------------------------------+
|                                                                               |
|   [ BK: Berpikir Komputasional ]    --> Dekomposisi & Algoritma Solusi        |
|   [ TIK: Teknologi Informasi ]      --> Kolaborasi Cloud Docs & Presentasi    |
|   [ SK: Sistem Komputer ]           --> Konfigurasi Hardware & Media Storage  |
|   [ JKI: Jaringan Komputer ]        --> Konektivitas Web, Hosting & DNS       |
|   [ AD: Analisis Data ]             --> Spreadsheet HPP, Mutu & Dashboard KPI |
|   [ AP: Algoritma & Pemrograman ]   --> Skrip Python / Web Interaktif         |
|   [ DSI: Dampak Sosial ]            --> Lisensi Legal, UU PDP & Etika Digital |
|                                                                               |
|                                     │                                         |
|                                     ▼                                         |
|                    [ KARYA INOVASI TERPADU SISWA SMK ]                        |
|                                                                               |
+-------------------------------------------------------------------------------+
\`\`\`

---

## 2. Metodologi Design Thinking untuk Inovasi Berpusat pada Pengguna

\`\`\`text
+-------------------------------------------------------------------------------+
|                       LIMA TAHAPAN DESIGN THINKING                            |
+---------------+---------------+---------------+---------------+---------------+
| 1. EMPATHIZE  | 2. DEFINE     | 3. IDEATE     | 4. PROTOTYPE  | 5. TEST       |
| Wawancarai &  | Rumuskan akar | Brainstorming | Buat produk   | Uji coba ke   |
| amati masalah | masalah nyata | puluhan ide   | nyata versi   | calon pengguna|
| target UMKM   | pengguna      | solusi kreatif| purwarupa     | & minta review|
+---------------+---------------+---------------+---------------+---------------+
\`\`\`

---

## 3. Kerangka Kerja Manajemen Proyek Tim (Agile Scrum)

\`\`\`text
+------------------------------------+------------------------------------------+
| PERAN DALAM TIM PROYEK             | TANGGUNG JAWAB UTAMA                     |
+------------------------------------+------------------------------------------+
| 1. Project Manager (Scrum Master)  | Menjaga timeline sprint, koordinasi tugas|
|                                    | tim, dan menyelesaikan kendala hambatan. |
+------------------------------------+------------------------------------------+
| 2. UI/UX & Graphic Designer (DKV)  | Merancang identitas merek, logo, kemasan |
|                                    | produk, mockup antarmuka, dan media promo.|
+------------------------------------+------------------------------------------+
| 3. Programmer & Data Lead (AP/AD)  | Membuat database spreadsheet / web sistem|
|                                    | kalkulator, dan analisis dashboard data. |
+------------------------------------+------------------------------------------+
| 4. Domain Specialist / QA (APHP)   | Menentukan standar formulasi produk mutu,|
|                                    | uji mutu pangan, dan validasi fungsional.|
+------------------------------------+------------------------------------------+
\`\`\`

### Manajemen Papan Tugas (Kanban Board):
Bagi pekerjaan tim ke dalam 4 kolom di Trello atau Notion:
* \`[BACKLOG]\` : Seluruh daftar keinginan fitur proyek.
* \`[TO DO]\` : Tugas yang harus diselesaikan dalam sprint minggu ini.
* \`[IN PROGRESS]\` : Tugas yang sedang dikerjakan secara aktif.
* \`[DONE]\` : Tugas yang telah selesai diuji dan disetujui tim.

---

## 4. Lima Fase Eksekusi Proyek Kolaboratif

### Fase 1: Riset Lapangan & Analisis Masalah (Minggu 1)
Tim melakukan observasi langsung ke unit produksi sekolah, kantin, atau UMKM lokal di sekitar sekolah untuk memetakan masalah (misal: pencatatan kas masih di buku kertas kotor, kemasan produk belum memiliki izin dan barcode, atau antrean pesanan tidak teratur).

### Fase 2: Perancangan Desain & Alur Solusi (Minggu 2)
* Pembuatan Diagram Alir (*Flowchart*) proses operasional baru.
* Pembuatan *Moodboard* desain visual dan sketsa logo.
* Pembuatan struktur tabel database spreadsheet.

### Fase 3: Pengembangan Produk / Solusi Terpadu (Minggu 3)
* Eksekusi desain kemasan berlabel BPOM dan aset media sosial.
* Pembuatan template spreadsheet otomatisasi kasir / HPP / form input.
* Pembuatan kode QR Traceability produk.

### Fase 4: Pengujian & User Acceptance Testing (UAT) (Minggu 4)
* Uji coba produk/sistem langsung oleh pemilik UMKM atau guru pembimbing.
* Mengisi kuesioner evaluasi: Kemudahan Penggunaan, Kecepatan, dan Tampilan Visual.
* Perbaikan bug dan revisi akhir (*refinement*).

### Fase 5: Dokumentasi, Pitch Deck, & Pameran Karya (Exhibition) (Minggu 5)
* Penyusunan laporan teknis lengkap (Format PDF resmi).
* Pembuatan video demonstrasi produk berdurasi 2 menit.
* Pemasangan poster pameran berukuran X-Banner di aula sekolah.
* Presentasi Pitch Deck 5 menit di hadapan dewan juri dan tamu undangan!

---

## 5. Struktur Standar Presentasi Pitch Deck 7 Slide

\`\`\`text
+-------------------------------------------------------------------------------+
| Slide 1 : Judul Inovasi, Logo Tim, & Nama Anggota + Peran                     |
| Slide 2 : Masalah Nyata (The Problem) - Bukti temuan di lapangan              |
| Slide 3 : Solusi Terintegrasi (The Solution) - Gambaran umum karya            |
| Slide 4 : Demonstrasi Fitur Kunci (Product Demo / Screenshots)                |
| Slide 5 : Integrasi Teknologi Informatika (Koding, Data, Desain, Sensor)      |
| Slide 6 : Dampak Nyata & Respon Pengguna (Hasil UAT)                          |
| Slide 7 : Kesimpulan & Rencana Pengembangan Masa Depan                        |
+-------------------------------------------------------------------------------+
\`\`\``,
    contohPenerapan: `1. **Proyek "Smart Jamu Desa"**: Tim siswa beranggotakan 4 orang: Siswa APHP memformulasi minuman jamu kunyit asam terstandarisasi, Siswa DKV merancang kemasan botol kaca elegan dan feed Instagram, Siswa Programmer membuat sistem kasir spreadsheet berbasis barcode, dan Project Manager memimpin presentasi di pameran inovasi SMK.
2. **Proyek "E-Kantin Terpadu"**: Kolaborasi pembuatan sistem pre-order makanan jam istirahat sekolah berbasis Google Form & QRIS yang berhasil memangkas antrean kantin hingga 70%.`,
    studiKasus: `**Studi Kasus: Konflik Pembagian Tugas dalam Tim Proyek**

Sebuah kelompok proyek PLB mengalami macet kerja di minggu ketiga. Programmer mengeluh tidak bisa mulai membuat database karena desainer belum selesai membuat logo, sementara desainer beralasan belum mendapat arahan dari Project Manager.
Akibatnya, proyek terancam tidak selesai saat pameran ekshibisi.

**Solusi Manajemen Agile**:
1. Jalankan sesi **Daily Standup Meeting 10 Menit**: Setiap anggota menjawab 3 pertanyaan: *Apa yang sudah saya kerjakan kemarin? Apa yang akan saya kerjakan hari ini? Kendala apa yang menghalangi saya?*
2. Terapkan prinsip kerja paralel: Programmer dapat mulai membangun struktur database menggunakan data dummy sementara desainer menyelesaikan aset grafis.`,
    aktivitasSiswa: `**Eksekusi Proyek Tim: Capstone Project Challenge**
1. Bentuk tim beranggotakan 3-4 siswa dengan pembagian peran yang tegas (PM, Designer, Coder/Analyst, Domain Lead).
2. Pilih 1 topik masalah nyata di sekolah atau lingkungan sekitar.
3. Buat papan Trello tim dan tentukan jadwal sprint 4 minggu.
4. Kembangkan karya terpadu yang menggabungkan minimal 4 elemen Informatika.
5. Siapkan bahan pameran: Laporan PDF, Poster X-Banner, dan Slide Pitch Deck!`,
    tipsPraktis: [
      'Gunakan media penyimpanan cloud bersama (Google Drive / GitHub) agar seluruh anggota tim selalu bekerja pada versi file dokumen yang paling mutakhir.',
      'Lakukan pengujian sistem (*User Testing*) seawal mungkin; jangan menunggu produk 100% selesai baru ditunjukkan ke pengguna.',
      'Latihlah pembagian waktu saat presentasi pameran agar seluruh anggota tim mendapat kesempatan berbicara di depan juri.'
    ],
    kesalahanUmum: [
      'Menumpuk seluruh pekerjaan di malam terakhir menjelang hari pameran karya (*deadliner syndrome*).',
      'Hanya satu orang yang bekerja mengerjakan seluruh proyek sementara anggota lain hanya menumpang nama.',
      'Membuat presentasi slide yang dipenuhi oleh paragraf teks panjang alih-alih grafik visual dan poin kunci.'
    ],
    rangkuman: `• Praktik Lintas Bidang (PLB) mengintegrasikan seluruh 8 elemen Informatika dalam satu proyek pemecahan masalah nyata.
• Pendekatan Design Thinking menjamin solusi berpusat pada kebutuhan riil pengguna (Empathize hingga Test).
• Kerangka kerja Agile Scrum dan papan Kanban mengorganisasi tugas tim secara transparan dan terukur.
• Keberhasilan proyek ditentukan oleh kolaborasi harmonis antar peran (Project Manager, Designer, Programmer, Domain Lead).
• Puncak proyek dirayakan melalui pameran karya (Exhibition), pitch deck presentasi, dan dokumentasi laporan teknis.`,
    refleksi: [
      'Pengalaman berharga apa yang paling kamu rasakan saat bekerja sama dalam tim yang memiliki latar belakang keahlian berbeda?',
      'Bagaimana kamu mengatasi perbedaan pendapat atau konflik antar anggota tim selama pengerjaan proyek?'
    ],
    latihanPemahaman: [
      '1. Sebutkan 5 tahapan dalam metode Design Thinking dan jelaskan tujuan masing-masing tahap!',
      '2. Apa fungsi papan Kanban (Backlog, To Do, In Progress, Done) dalam manajemen proyek tim?',
      '3. Uraikan pembagian peran dan tanggung jawab ideal dalam tim proyek PLB Informatika!',
      '4. Jelaskan struktur urutan slide yang ideal dalam sebuah presentasi Pitch Deck bisnis/produk!'
    ],
    tugasPraktik: `**Tugas Akhir Semester: Portofolio Proyek Terpadu PLB**
Kumpulkan bundel portofolio proyek akhir kelompok yang memuat:
1. Laporan Teknis Proyek Lengkap (Format PDF 10-15 Halaman: Latar Belakang, Desain Solusi, Dokumentasi Teknis Koding/Spreadsheet, dan Hasil UAT).
2. File Presentasi Slide Pitch Deck (.pptx / PDF 7 Slide).
3. File Desain Poster Pameran Resolusi Tinggi (300 DPI siap cetak).
4. Tautan Video Demonstrasi Produk (YouTube / Google Drive durasi 2-3 menit).
Unggah seluruh berkas ke portal ujian akhir (\`PLB3_KELOMPOK_KELAS.zip\`)!`,
    asesmen: [
      {
        question: 'Tahapan pertama dalam metodologi Design Thinking yang berfokus pada memahami perasaan, keluhan, dan kebutuhan mendalam calon pengguna melalui wawancara dan observasi langsung adalah...',
        options: ['Empathize (Empati)', 'Prototype', 'Testing', 'Deployment'],
        answerIndex: 0,
        explanation: 'Empathize adalah langkah awal untuk merasakan dan memahami perspektif masalah nyata yang dihadapi pengguna.'
      },
      {
        question: 'Papan visual yang membagi tugas tim menjadi kolom Backlog, To Do, In Progress, dan Done dalam manajemen Agile disebut...',
        options: ['Papan Kanban (Kanban Board)', 'Diagram Pohon Keputusan', 'Spreadsheet Makro', 'Flowchart Diamond'],
        answerIndex: 0,
        explanation: 'Papan Kanban memvisualisasikan alur kerja tim agar progres setiap tugas terpantau transparan.'
      },
      {
        question: 'Pertemuan singkat 10-15 menit setiap pagi yang dilakukan tim pengembang untuk menyelaraskan progres dan hambatan harian disebut...',
        options: ['Daily Standup Meeting', 'Sidang Pleno Tahunan', 'Audit Keuangan', 'Ujian Remedial'],
        answerIndex: 0,
        explanation: 'Daily Standup adalah pertemuan harian cepat dalam Scrum untuk memeriksa progres harian dan menghapus hambatan.'
      },
      {
        question: 'Tahapan pengujian produk perangkat lunak atau sistem yang dilakukan secara langsung oleh pengguna akhir untuk memastikan sistem telah sesuai kebutuhan disebut...',
        options: ['User Acceptance Testing (UAT)', 'Syntax Compiling', 'Defragmentasi Harddisk', 'Overclocking Test'],
        answerIndex: 0,
        explanation: 'UAT adalah fase evaluasi penerimaan sistem oleh calon pengguna akhir sebelum produk resmi diluncurkan.'
      },
      {
        question: 'Format presentasi ringkas dan memikat berdurasi 3-5 menit yang dirancang untuk memperkenalkan ide solusi dan produk kepada juri/investor disebut...',
        options: ['Pitch Deck', 'Buku Manual Panduan Tebal', 'Nota Dinas Surat Menyurat', 'Kamus Glosarium'],
        answerIndex: 0,
        explanation: 'Pitch Deck adalah slide presentasi singkat dan visual untuk memaparkan ringkasan ide bisnis dan produk secara persuasif.'
      },
      {
        question: 'Urutan 5 tahapan dalam metodologi inovasi Design Thinking yang benar adalah...',
        options: [
          'Empathize -> Define -> Ideate -> Prototype -> Test',
          'Test -> Prototype -> Define -> Ideate -> Empathize',
          'Ideate -> Test -> Prototype -> Empathize -> Define',
          'Define -> Test -> Ideate -> Empathize -> Prototype'
        ],
        answerIndex: 0,
        explanation: 'Design Thinking diawali dari Empati, Perumusan Masalah (Define), Penggalian Ide (Ideate), Purwarupa (Prototype), dan Pengujian (Test).'
      },
      {
        question: 'Tahap dalam Design Thinking di mana tim menghasilkan sebanyak mungkin alternatif ide solusi kreatif tanpa saling mengkritik terlebih dahulu disebut...',
        options: ['Ideate (Brainstorming)', 'Define', 'Testing', 'UAT'],
        answerIndex: 0,
        explanation: 'Ideate adalah fase divergen untuk melahirkan berbagai macam konsep solusi inovatif seluas-luasnya.'
      },
      {
        question: 'Dalam metodologi Scrum, periode waktu berulang berdurasi tetap (biasanya 1-2 minggu) untuk menyelesaikan sejumlah tugas proyek disebut...',
        options: ['Sprint', 'Marathon', 'Overtime', 'Milestone Year'],
        answerIndex: 0,
        explanation: 'Sprint adalah siklus kerja pendek yang menghasilkan peningkatan produk (product increment) siap uji.'
      },
      {
        question: 'Anggota tim proyek yang bertanggung jawab memfasilitasi tim, menghilangkan hambatan kerja, dan memastikan alur Scrum berjalan lancar adalah...',
        options: ['Scrum Master / Project Coordinator', 'Quality Assurance', 'Lead Designer', 'End User'],
        answerIndex: 0,
        explanation: 'Scrum Master bertindak sebagai fasilitator dan pelindung tim dari hambatan eksternal selama sprint berlangsung.'
      },
      {
        question: 'Daftar prioritas seluruh fitur, kebutuhan teknis, dan ide perbaikan produk yang dikelola sepanjang proyek dinamakan...',
        options: ['Product Backlog', 'Burn Down Trash', 'Sprint Finished', 'Archive Log'],
        answerIndex: 0,
        explanation: 'Product Backlog adalah daftar hidup seluruh item pekerjaan dan fitur yang diinginkan pada produk.'
      },
      {
        question: 'Pertemuan di akhir siklus Sprint di mana tim merefleksikan apa yang berjalan baik, apa yang kurang baik, dan rencana perbaikan kerja tim dinamakan...',
        options: ['Sprint Retrospective', 'Daily Standup', 'Kick-off Meeting', 'Public Hearing'],
        answerIndex: 0,
        explanation: 'Retrospective adalah evaluasi internal proses kerja tim untuk perbaikan berkesinambungan (continuous improvement).'
      },
      {
        question: 'Diagram batang horizontal yang menggambarkan jadwal waktu proyek, urutan aktivitas, dan durasi setiap fase dari awal hingga akhir adalah...',
        options: ['Gantt Chart', 'Pie Chart', 'Scatter Plot', 'Histogram'],
        answerIndex: 0,
        explanation: 'Gantt Chart memetakan linimasa aktivitas proyek terhadap waktu kalender secara visual.'
      },
      {
        question: 'Prinsip pembatasan jumlah pekerjaan yang sedang dikerjakan secara bersamaan pada kolom "In Progress" papan Kanban disebut...',
        options: ['Work-In-Progress (WIP) Limit', 'Sprint Goal', 'Overload Capacity', 'Time Blocking'],
        answerIndex: 0,
        explanation: 'WIP Limit mencegah anggota tim melakukan multitasking berlebihan yang menurunkan fokus dan kualitas pekerjaan.'
      },
      {
        question: 'Penyajian elevator pitch yang efektif adalah penyampaian ide solusi yang ringkas, padat, dan meyakinkan dalam durasi waktu...',
        options: ['30 hingga 60 detik', '2 jam penuh', '1 hari', '10 detik'],
        answerIndex: 0,
        explanation: 'Elevator pitch dirancang untuk menarik minat pendengar dalam waktu singkat secepat naik lift (30-60 detik).'
      },
      {
        question: 'Struktur urutan slide pertama dan kedua dalam standar presentasi Pitch Deck bisnis biasanya memuat...',
        options: [
          'Masalah Nyata Pengguna (Problem) dan Solusi yang Ditawarkan (Solution)',
          'Daftar Nilai Rapor Seluruh Anggota Tim',
          'Struk Belanja Peralatan Sekolah',
          'Glosarium Istilah Bahasa Asing'
        ],
        answerIndex: 0,
        explanation: 'Pitch deck yang baik langsung membuka dengan masalah mendesak (Problem) dan proposisi nilai solusi (Solution).'
      },
      {
        question: 'Purwarupa cepat yang dibuat dengan material murah seperti kertas sketsa atau mockup digital kasar untuk menguji alur fungsi awal disebut...',
        options: ['Low-Fidelity Prototype', 'High-Fidelity Finished Product', 'Commercial Release', 'Hardware Factory Build'],
        answerIndex: 0,
        explanation: 'Low-Fidelity Prototype memungkinkan tim menguji konsep secara cepat dan murah sebelum investasi waktu koding mendalam.'
      },
      {
        question: 'Pengujian awal perangkat lunak yang dilakukan oleh tim pengembang internal di dalam lab sebelum diuji ke pengguna luar disebut...',
        options: ['Alpha Testing', 'Beta Testing', 'User Acceptance Testing (UAT)', 'Post-Release Monitoring'],
        answerIndex: 0,
        explanation: 'Alpha Testing adalah pengujian fungsional internal oleh tim pengembang untuk membersihkan bug awal.'
      },
      {
        question: 'Pengujian produk yang melibatkan sekelompok pengguna eksternal terbatas di lingkungan nyata sebelum peluncuran massal disebut...',
        options: ['Beta Testing', 'Alpha Testing', 'Unit Testing', 'Code Review'],
        answerIndex: 0,
        explanation: 'Beta testing mengumpulkan masukan pengguna riil untuk memastikan keandalan produk di kondisi operasional sesungguhnya.'
      },
      {
        question: 'Penyebab utama kegagalan kerja tim dalam proyek Praktik Lintas Bidang (PLB) adalah...',
        options: [
          'Komunikasi yang buruk, tidak adanya pembagian peran yang jelas, dan menunda pekerjaan hingga malam terakhir (deadliner)',
          'Terlalu banyak anggota tim yang memiliki laptop',
          'Menggunakan aplikasi kanban online',
          'Membeli kertas poster resolusi 300 DPI'
        ],
        answerIndex: 0,
        explanation: 'Masalah koordinasi, komunikasi tertutup, dan prokrastinasi adalah faktor risiko utama kegagalan proyek kolaboratif.'
      },
      {
        question: 'Ukuran resolusi gambar minimal yang wajib digunakan saat mengekspor file poster pameran proyek agar hasil cetak X-Banner tajam dan tidak pecah adalah...',
        options: ['300 DPI (Dots Per Inch)', '72 DPI', '10 DPI', '5 DPI'],
        answerIndex: 0,
        explanation: 'Resolusi 300 DPI adalah standar cetak grafis profesional agar teks dan gambar poster tajam tanpa bintik piksel.'
      },
      {
        question: 'Dalam pembagian peran tim PLB, tugas utama dari peran Domain Specialist (misal siswa APHP) adalah...',
        options: [
          'Memastikan formulasi produk, prosedur higienitas GMP/HACCP, dan parameter mutu pangan tervalidasi secara akurat',
          'Memperbaiki kabel listrik gedung sekolah',
          'Mencuci mobil guru',
          'Menulis kode CSS layout website'
        ],
        answerIndex: 0,
        explanation: 'Domain Specialist memastikan produk memenuhi standar ilmiah, regulasi, dan proses keilmuan jurusannya.'
      },
      {
        question: 'Dalam pembagian peran tim PLB, tugas utama dari peran Lead Designer (misal siswa DKV) adalah...',
        options: [
          'Merancang identitas merek, logo, kemasan produk, poster pameran, dan antarmuka visual agar memikat dan profesional',
          'Menginstal ulang sistem operasi komputer kasir',
          'Memasak bahan baku selai di dapur',
          'Mengganti baterai multimeter'
        ],
        answerIndex: 0,
        explanation: 'Lead Designer bertanggung jawab atas aspek estetika, komunikasi visual, identitas merek, dan pengalaman visual pengguna.'
      },
      {
        question: 'Dalam pembagian peran tim PLB, tugas utama dari peran Programmer / Data Lead adalah...',
        options: [
          'Membangun logika program, otomatisasi rumus spreadsheet, kode QR, dan visualisasi dashboard data analitik',
          'Mencetak stiker di percetakan luar',
          'Membeli buah di pasar tradisional',
          'Menjadi MC saat pameran dibuka'
        ],
        answerIndex: 0,
        explanation: 'Programmer / Data Lead menangani rekayasa logika komputasi, otomasi spreadsheet, dan pengolahan data sistem.'
      },
      {
        question: 'Tujuan utama diadakannya Pameran Karya (Exhibition / Expo) proyek akhir siswa di sekolah adalah...',
        options: [
          'Sebagai wadah uji publik, unjuk kompetensi, menerima masukan nyata dari pengunjung/industri, dan melatih rasa percaya diri siswa',
          'Hanya untuk menghabiskan anggaran kas kelas',
          'Supaya siswa bisa berfoto selfie seharian',
          'Untuk menjual barang-barang bekas'
        ],
        answerIndex: 0,
        explanation: 'Pameran karya menguji produk secara publik, membangun jejaring dengan calon mitra UMKM/industri, dan merayakan pencapaian belajar.'
      },
      {
        question: 'Video demonstrasi produk berdurasi 2-3 menit yang baik untuk portofolio proyek idealnya memuat...',
        options: [
          'Latar belakang masalah, penjelasan fitur utama produk saat digunakan nyata, testimoni singkat pengguna, dan penutup',
          'Hanya rekaman layar koding hitam tanpa suara selama 1 jam',
          'Kompilasi lagu pop tanpa menunjukkan produk sama sekali',
          'Teks tulisan berjalan yang sangat cepat dan tidak terbaca'
        ],
        answerIndex: 0,
        explanation: 'Video demo yang efektif menyajikan narasi masalah-solusi, memperlihatkan produk bekerja secara nyata, dan menyertakan dampak manfaatnya.'
      },
      {
        question: 'Sikap profesional yang harus ditunjukkan saat menerima kritik pedas atau masukan kekurangan produk dari calon pengguna saat sesi UAT adalah...',
        options: [
          'Mencatat masukan secara objektif dengan lapang dada dan menjadikannya bahan perbaikan (iterasi) versi produk berikutnya',
          'Marah dan memusuhi pengguna tersebut',
          'Langsung menghapus proyek dan membatalkan ujian',
          'Menyalahkan anggota tim lain di depan publik'
        ],
        answerIndex: 0,
        explanation: 'Umpan balik konstruktif adalah bahan bakar utama penyempurnaan produk dalam siklus pengembangan iteratif.'
      },
      {
        question: 'Kondisi di mana ruang lingkup proyek terus membesar tanpa kendali akibat permintaan fitur baru yang terus bertambah di tengah jalan disebut...',
        options: ['Scope Creep', 'Sprint Speed', 'Backlog Refinement', 'Code Refactoring'],
        answerIndex: 0,
        explanation: 'Scope creep terjadi saat cakupan proyek bertambah tanpa penyesuaian waktu dan sumber daya, mengancam tenggat waktu.'
      },
      {
        question: 'Fitur "Kuesioner UAT" (User Acceptance Testing) berbasis skala Likert (skor 1 sampai 5) digunakan untuk mengukur...',
        options: [
          'Tingkat kepuasan, kemudahan pengoperasian (Usability), dan kesesuaian solusi terhadap kebutuhan riil pengguna',
          'Kecepatan mengetik jari pengguna',
          'Daya tahan baterai mouse',
          'Ketinggian meja pameran'
        ],
        answerIndex: 0,
        explanation: 'Kuesioner UAT menguantifikasi respon subjektif pengguna menjadi data terukur untuk mengevaluasi kelayakan sistem.'
      },
      {
        question: 'Dalam manajemen konflik tim, teknik mencari jalan tengah yang saling menguntungkan bagi kedua belah pihak disebut solusi...',
        options: ['Win-Win Solution (Kolaborasi Integratif)', 'Lose-Lose Solution', 'One-Man Show', 'Silent Treatment'],
        answerIndex: 0,
        explanation: 'Win-win solution mengedepankan musyawarah mufakat untuk mencapai kesepakatan terbaik bagi kepentingan tim.'
      },
      {
        question: 'Mengapa modul Praktik Lintas Bidang (PLB) menjadi puncak kulminasi pembelajaran Informatika di jenjang SMK?',
        options: [
          'Karena membuktikan kemampuan siswa mengintegrasikan pengetahuan teoritis komputasi, keahlian kejuruan, kepemimpinan, dan kerja tim dalam memecahkan masalah nyata dunia kerja',
          'Hanya untuk mengisi sisa minggu sebelum liburan sekolah',
          'Agar siswa menghafal lebih banyak buku paket',
          'Supaya nilai rapor semua siswa otomatis 100 tanpa dinilai'
        ],
        answerIndex: 0,
        explanation: 'PLB melatih kompetensi holistik: hard skills teknologis, domain vokasional, serta soft skills kolaborasi dan komunikasi abad 21.'
      }
    ],
    asesmenUraian: [
      'Jelaskan mengapa komunikasi yang terbuka dan pembagian peran yang jelas menjadi kunci utama keberhasilan proyek teknologi lintas disiplin!',
      'Uraikan analisis Anda mengenai pentingnya mengadakan pameran karya (Exhibition) di sekolah sebagai wadah apresiasi dan uji publik kompetensi siswa SMK!'
    ],
    rubrikPenilaian: [
      {
        kriteria: 'Kompleksitas & Integrasi Solusi',
        skor4: 'Karya mengintegrasikan minimal 5 elemen Informatika secara harmonis, inovatif, fungsional, dan menjawab masalah riil.',
        skor3: 'Karya mengintegrasikan 3 elemen Informatika dengan baik namun ada fitur yang belum tuntas.',
        skor2: 'Karya hanya fokus pada 1 elemen tanpa ada integrasi lintas bidang.',
        skor1: 'Tidak menghasilkan produk solusi.'
      },
      {
        kriteria: 'Kualitas Presentasi & Pameran',
        skor4: 'Pitch deck sangat menarik, poster pameran memenuhi standar grafis 300 DPI, dan presentasi lisan sangat percaya diri.',
        skor3: 'Presentasi baik namun poster pameran masih agak padat teks.',
        skor2: 'Slide presentasi tidak siap dan pembagian bicara tidak merata.',
        skor1: 'Tidak hadir dalam sesi pameran karya.'
      }
    ],
    glosarium: [
      { term: 'Praktik Lintas Bidang (PLB)', definition: 'Pembelajaran berbasis proyek kolaboratif yang mengintegrasikan berbagai elemen kompetensi untuk menyelesaikan masalah riil.' },
      { term: 'Design Thinking', definition: 'Metodologi inovasi berpusat pada manusia untuk memecahkan masalah kompleks secara kreatif.' },
      { term: 'Agile / Scrum', definition: 'Kerangka kerja manajemen pengembangan proyek yang fleksibel, cepat, dan berulang (iteratif).' },
      { term: 'Pitch Deck', definition: 'Presentasi singkat berformat visual yang menyajikan ringkasan solusi bisnis atau inovasi produk.' },
      { term: 'User Acceptance Testing (UAT)', definition: 'Pengujian akhir produk yang dilakukan oleh pengguna sesungguhnya untuk memvalidasi kelayakan solusi.' }
    ],
    sumberReferensi: [
      'Brown, T. (2009). Change by Design: How Design Thinking Transforms Organizations and Inspires Innovation. HarperBusiness.',
      'Sutherland, J. (2014). Scrum: The Art of Doing Twice the Work in Half the Time. Crown Business.',
      'Kemendikbudristek (2024). Panduan Pembelajaran dan Asesmen Informatika Kurikulum Merdeka Fase E.',
      'Project Management Institute (2021). A Guide to the Project Management Body of Knowledge (PMBOK Guide) (7th ed.).'
    ]
  }
];
