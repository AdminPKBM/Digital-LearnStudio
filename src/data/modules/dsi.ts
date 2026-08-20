import { ModuleData } from '../../types';

export const dsiModules: ModuleData[] = [
  // =========================================================================
  // BAB 6: INTERNET, LITERASI DIGITAL, DAN ETIKA DIGITAL
  // =========================================================================
  {
    id: 'DSI-1',
    elementId: 'DSI',
    elementName: 'Dampak Sosial Informatika',
    moduleNumber: 1,
    bab: 'BAB 6 — Internet, Literasi Digital, dan Etika Digital',
    pertemuan: 15,
    fase: 'Fase E (Kelas X SMK)',
    title: 'Literasi Digital, Jejak Digital, Keamanan Siber Pribadi, dan Lisensi Hak Cipta',
    estimatedTimeMinutes: 90,
    difficulty: 'Pemula',
    competencies: [
      'Memahami konsep identitas digital, jejak digital (aktif vs pasif), dan dampaknya bagi masa depan akademik serta karier',
      'Menerapkan praktik keamanan akun tingkat lanjut: manajemen kata sandi kuat, passphrases, dan Multi-Factor Authentication (2FA/TOTP)',
      'Menganalisis ancaman kejahatan siber: rekayasa sosial (phishing), scam penipuan online, dan jenis-jenis malware (Ransomware, Trojan, Spyware)',
      'Mengembangkan sikap kritis dalam memverifikasi informasi digital: membedakan hoaks, misinformasi, disinformasi, deepfake, dan metode fact-checking',
      'Menerapkan netiket komunikasi digital serta mencegah tindakan cyberbullying, doxing, dan ujaran kebencian',
      'Memahami Hak Atas Kekayaan Intelektual (HAKI), lisensi Creative Commons (CC0 s.d CC BY-NC-SA), dan penggunaan aset bebas royalti legal'
    ],
    objectives: [
      'Siswa mampu menganalisis jejak digital pribadi dan membersihkan riwayat online yang berisiko merugikan reputasi',
      'Siswa dapat membuat kombinasi kata sandi kuat dan mengaktifkan otentikasi dua langkah (2FA) pada seluruh akun penting',
      'Siswa mampu mengidentifikasi ciri-ciri link phishing dan pesan penipuan online yang mengatasnamakan instansi resmi',
      'Siswa dapat mempraktikkan teknik reverse image search dan cek fakta mandiri untuk membongkar berita hoaks',
      'Siswa mampu memilih dan mencantumkan atribusi lisensi Creative Commons pada karya desain DKV atau materi presentasi secara legal'
    ],
    summary: 'Fondasi etika dan keamanan digital: pengelolaan jejak digital, benteng keamanan akun & 2FA, perlawanan terhadap phishing dan malware, verifikasi fakta hoaks/deepfake, netiket bermedia sosial, serta pemanfaatan aset berlisensi Creative Commons.',
    infographicHighlights: [
      { label: 'Jejak Digital', text: 'Rekam jejak online permanen yang menentukan reputasi masa depan.', icon: 'Fingerprint' },
      { label: 'Benteng 2FA & Akun', text: 'Password kuat 12+ karakter dan aplikasi Authenticator TOTP.', icon: 'ShieldCheck' },
      { label: 'Cek Fakta Hoaks', text: 'Reverse image search, verifikasi sumber, dan situs TurnBackHoax.', icon: 'CheckCircle' },
      { label: 'Lisensi Karya', text: 'Creative Commons (CC BY, CC0) dan aset legal bebas royalti.', icon: 'FileBadge' }
    ],
    pertanyaanPemantik: [
      'Apakah postingan foto atau komentar kasar yang kamu buat di media sosial 5 tahun lalu benar-benar bisa hilang setelah kamu menekan tombol hapus?',
      'Bagaimana sebuah pesan WhatsApp palsu berkedok "Surat Undangan Pernikahan .APK" bisa menguras seluruh saldo rekening bank korban dalam hitungan menit?',
      'Bolehkah seorang siswa DKV mengambil gambar di Google Gambar lalu memasukkannya ke dalam desain kemasan produk yang akan dijual secara komersial?'
    ],
    pendahuluan: `Internet telah mengubah dunia menjadi desa global yang tanpa sekat. Kita bisa belajar, bekerja, bertransaksi, dan berkarya dari mana saja. Namun, di balik segala kemudahan tersebut, internet menyimpan bahaya laten yang mengancam privasi, reputasi, dan keamanan finansial jika kita tidak memiliki **Literasi Digital** yang matang.

Banyak orang menjadi korban kejahatan siber bukan karena sistem komputernya yang rusak, melainkan karena kelalaian faktor manusianya (*human error*) yang mudah tertipu oleh rekayasa sosial (*social engineering*), menyebarkan hoaks tanpa verifikasi, atau mencuri karya orang lain tanpa izin lisensi.

Modul ini adalah pedoman pertahanan dan etika digital bagi siswa SMK agar menjadi warga digital (*digital citizen*) yang cerdas, aman, beretika, dan taat hukum.`,
    konsepInti: `1. **Jejak Digital (Digital Footprint)**: Jejak aktif (postingan, komentar, share) vs Jejak pasif (IP address, cookies, history browsing, lokasi GPS).
2. **Keamanan Siber Pribadi**: Password kuat (12+ karakter alfanumerik simbol), Password Manager, dan Multi-Factor Authentication (2FA Authenticator App).
3. **Ancaman Siber**: Phishing (tautan palsu pencuri kredensial), Scam, Malware (Ransomware pengunci file, Trojan pencuri data, Spyware).
4. **Ekosistem Informasi**: Misinformasi (salah tanpa niat jahat), Disinformasi (sengaja dibuat untuk menyesatkan), Malinformasi (data asli disebar untuk merusak reputasi).
5. **Netiket & HAKI**: Netiquette, etika anti-cyberbullying, pencegahan doxing, UU ITE, lisensi Creative Commons, dan aset bebas royalti.`,
    contentMarkdown: `# BAB 6 — Internet, Literasi Digital, dan Etika Digital

## 1. Identitas dan Jejak Digital (*Digital Footprint*)

Jejak digital adalah rekam jejak data elektronik yang ditinggalkan oleh seseorang saat menggunakan layanan internet. Jejak ini bersifat **permanen** dan sangat sulit dihapus sepenuhnya (*the internet never forgets*).

\`\`\`text
+-------------------------------------------------------------------------------+
|                             DUA JENIS JEJAK DIGITAL                           |
+------------------------------------+------------------------------------------+
| 1. JEJAK DIGITAL AKTIF             | 2. JEJAK DIGITAL PASIF                   |
+------------------------------------+------------------------------------------+
| Data yang sengaja dibagikan:       | Data yang terekam secara otomatis:       |
| • Status, foto, video media sosial | • Alamat IP dan riwayat browsing web     |
| • Komentar di forum dan YouTube    | • Lokasi GPS pelacakan smartphone        |
| • Mengisi formulir pendaftaran web | • Cookies preferensi belanja online      |
| • Mengirim email dan pesan chat    | • Durasi waktu menonton konten video     |
+------------------------------------+------------------------------------------+
\`\`\`

### Mengapa Jejak Digital Sangat Krusial?
Saat ini, lebih dari 70% tim HRD perusahaan dan institusi beasiswa memeriksa riwayat media sosial pelamar sebelum memutuskan penerimaan. Postingan ujaran kebencian, kecurangan, atau konten tidak etis di masa lalu dapat menggagalkan impian kariermu di masa depan.

---

## 2. Keamanan Akun dan Otentikasi Berlapis (2FA)

\`\`\`text
+-------------------------------------------------------------------------------+
|                       PIRAMIDA KEAMANAN KATA SANDI DIGITAL                    |
+-------------------------------------------------------------------------------+
|       [ TINGKAT 3: MULTI-FACTOR AUTHENTICATION (2FA) ]                         |
|       (Aplikasi Google Authenticator / Hardware Security Key YubiKey)         |
|                                ▲                                              |
|                                │                                              |
|       [ TINGKAT 2: PASSPHRASE PANJANG (16+ KARAKTER) ]                        |
|       (Contoh: "KopiSusuDingin#Enak2026!Pagi" - Mudah diingat, susah dibobol) |
|                                ▲                                              |
|                                │                                              |
|       [ TINGKAT 1: KATA SANDI STANDAR (12 KARAKTER KOMBINASI) ]                |
|       (Kombinasi Huruf Besar, Kecil, Angka, dan Simbol Unik)                  |
+-------------------------------------------------------------------------------+
\`\`\`

### Aturan Emas Keamanan Akun:
1. **Hindari Password Reuse**: Jangan pernah menggunakan 1 kata sandi yang sama persis untuk akun email, media sosial, dan mobile banking. Jika salah satu platform bocor, seluruh akunmu akan diretas sekaligus (*credential stuffing*).
2. **Gunakan Aplikasi Authenticator**: Pilih aplikasi 2FA berbasis waktu (*Time-based One-Time Password / TOTP*) seperti Google Authenticator atau Microsoft Authenticator dibandingkan SMS OTP yang rentan terhadap pembajakan kartu SIM (*SIM Swap*).

---

## 3. Ancaman Kejahatan Siber dan Rekayasa Sosial

\`\`\`text
+-------------------+-----------------------------------------------------------+
| TIPE ANCAMAN      | BENTUK DAN METODE SERANGAN                                |
+-------------------+-----------------------------------------------------------+
| Phishing          | Upaya memancing korban mengeklik tautan web tiruan palsu  |
|                   | untuk mencuri username, password, dan PIN perbankan.      |
+-------------------+-----------------------------------------------------------+
| Malware Trojan    | Program jahat yang menyamar sebagai file resmi (misal file|
|                   | .apk undangan pernikahan palsu / game bajakan).           |
+-------------------+-----------------------------------------------------------+
| Ransomware        | Virus yang mengenkripsi (mengunci) seluruh dokumen di     |
|                   | komputer dan memeras uang tebusan untuk kunci pembukanya. |
+-------------------+-----------------------------------------------------------+
| Social Engineering| Manipulasi psikologis manusia (memanfaatkan rasa panik,   |
|                   | terburu-buru, atau hadiah palsu) agar memberikan data rahasia.|
+-------------------+-----------------------------------------------------------+
\`\`\`

---

## 4. Literasi Informasi: Membongkar Hoaks dan Manipulasi Digital

\`\`\`text
+-------------------+-------------------+---------------------------------------+
| MISINFORMASI      | DISINFORMASI      | MALINFORMASI                          |
+-------------------+-------------------+---------------------------------------+
| Informasi salah,  | Informasi salah yang| Informasi benar/fakta riil yang     |
| tetapi orang yang | SENGAJA dibuat dan| disebarkan dengan sengaja untuk merusak|
| menyebarkannya    | disebarkan untuk  | reputasi seseorang (contoh: doxing data|
| mengiranya benar. | menipu masyarakat.| pribadi).                             |
+-------------------+-------------------+---------------------------------------+
\`\`\`

### 5 Langkah Cek Fakta Mandiri:
1. **Cek Judul Sensasional**: Judul provokatif (*clickbait*) sering memanipulasi emosi.
2. **Verifikasi Sumber & Tanggal**: Periksa apakah media berita kredibel lain memberitakan hal yang sama.
3. **Lakukan Reverse Image Search**: Gunakan Google Lens / Yandex Images untuk memeriksa apakah foto yang viral adalah foto lama dari peristiwa berbeda.
4. **Waspadai Deepfake**: Perhatikan ketidakwajaran kedipan mata, bayangan bibir, atau distorsi suara pada video AI.
5. **Rujuk Situs Cek Fakta Resmi**: Kunjungi *TurnBackHoax.id*, *CekFakta.com*, atau kanal resmi Kominfo.

---

## 5. Netiket (Netiquette) dan Pencegahan Perundungan Siber

### Aturan Netiket Utama:
* **Ingat Ada Manusia di Balik Layar**: Perlakukan orang lain di internet dengan kesantunan yang sama seperti berbicara tatap muka.
* **Stop Cyberbullying & Hate Speech**: Menghina fisik (*body shaming*), menyerang suku/agama, atau meneror mental seseorang di kolom komentar adalah tindak pidana UU ITE.
* **Dilarang Melakukan Doxing**: Menyebarkan identitas pribadi orang lain (alamat rumah, nomor NIK KTP, nomor telepon keluarga) ke publik tanpa izin demi mempermalukannya.

---

## 6. Hak Cipta, Lisensi Creative Commons, dan Penggunaan Aset Legal

Karya cipta visual, musik, foto, dan tulisan dilindungi oleh Undang-Undang Hak Cipta No. 28 Tahun 2014.

\`\`\`text
+-------------------+-----------------------------------------------------------+
| LISENSI CC        | ATURAN PENGGUNAAN KARYA                                   |
+-------------------+-----------------------------------------------------------+
| CC0 (Public Domain)| Bebas digunakan untuk apa saja (termasuk komersial) tanpa |
|                   | perlu izin dan tanpa wajib mencantumkan nama pembuat.     |
+-------------------+-----------------------------------------------------------+
| CC BY (Atribusi)  | Boleh digunakan dan dimodifikasi untuk komersial, dengan  |
|                   | SYARAT WAJIB mencantumkan kredit nama pencipta asli.     |
+-------------------+-----------------------------------------------------------+
| CC BY-NC          | Boleh digunakan hanya untuk keperluan NON-KOMERSIAL       |
| (Non-Commercial)  | (pendidikan/pribadi) dan wajib memberi atribusi nama.     |
+-------------------+-----------------------------------------------------------+
| CC BY-ND (No Deriv)| Boleh digunakan untuk apa saja, asalkan karya ASLI UTUH   |
|                   | dan TIDAK DIUBAH/DIMODIFIKASI sedikitpun.                 |
+-------------------+-----------------------------------------------------------+
\`\`\`

### Sumber Aset Legal Bebas Royalti:
* **Foto**: Unsplash, Pexels, Pixabay.
* **Vektor & Ikon**: Flaticon, SVG Repo, Freepik (perhatikan atribusi).
* **Audio & Musik**: YouTube Audio Library, Free Music Archive.`,
    contohPenerapan: `1. **Penerapan 2FA Siswa SMK**: Siswa mengaktifkan verifikasi 2 langkah Google Authenticator di akun email sekolah untuk mencegah pencurian akun saat login di komputer umum warnet/lab.
2. **Pemanfaatan Lisensi CC BY oleh Desainer DKV**: Siswa mengunduh foto cangkir kopi berlisensi CC BY dari Unsplash, menggunakannya untuk poster iklan, dan mencantumkan teks atribusi kecil di pojok poster: "Foto oleh John Doe via Unsplash".`,
    studiKasus: `**Studi Kasus: Modus Penipuan Link Kurir Paket .APK**

Seorang ibu rumah tangga menerima pesan WhatsApp bertuliskan: "Paket Anda tertahan di gudang, silakan klik tautan untuk melihat foto resi: \`Foto_Resi_JNT.apk\`". Karena penasaran, korban mengklik dan menginstal file tersebut. 
Sepuluh menit kemudian, seluruh SMS OTP perbankan korban tersadap oleh penyerang, dan tabungan sebesar Rp 20.000.000 raib ditransfer ke rekening penampung.

**Analisis Tindakan Preventif**:
Jelaskan mengapa file dengan ekstensi \`.apk\` sangat berbahaya jika dipasang di smartphone di luar Google Play Store, serta bagaimana korban seharusnya menyikapi pesan mencurigakan tersebut!`,
    aktivitasSiswa: `**Praktik Lab: Audit Keamanan Akun & Cek Fakta**
1. Lakukan audit keamanan kata sandi email pribadimu: ubah menjadi passphrase 16 karakter unik dan aktifkan 2FA Authenticator.
2. Ambil sebuah foto berita viral yang mencurigakan di internet.
3. Lakukan **Google Reverse Image Search** untuk membuktikan keaslian foto tersebut (apakah foto asli peristiwa terkini atau foto lama yang dimanipulasi).
4. Tuliskan ringkasan hasil pelacakanmu dalam 1 paragraf!`,
    tipsPraktis: [
      'Jangan pernah membagikan kode OTP (6 angka rahasia) kepada siapa pun, termasuk pihak yang mengaku sebagai petugas bank atau customer service.',
      'Periksa alamat URL website di bilah browser dengan teliti (contoh: \`klikbca.com\` vs situs phishing \`klik-bca-login.xyz\`).',
      'Pikirkan konsekuensi 10 tahun ke depan sebelum memposting konten sensitif atau video kontroversial di media sosial.'
    ],
    kesalahanUmum: [
      'Menyimpan catatan seluruh kata sandi di buku kertas atau di bio chat tanpa proteksi.',
      'Langsung menyebarkan pesan berantai WhatsApp bertuliskan "Sebarkan info penting ini ke 10 grup!" tanpa mengecek kebenarannya.',
      'Mengambil gambar logo dari Google Image Search untuk kemasan produk jualan tanpa membeli lisensi resmi.'
    ],
    rangkuman: `• Jejak digital bersifat permanen dan memengaruhi reputasi karier di masa depan.
• Keamanan akun optimal dicapai melalui passphrase kuat, variasi antar platform, dan proteksi 2FA Authenticator.
• Waspadai rekayasa sosial, phishing, scam, serta malware berbahaya (.apk ilegal, ransomware).
• Kembangkan literasi kritis untuk memilah misinformasi, disinformasi, dan deepfake melalui reverse image search dan cek fakta.
• Netiket melarang cyberbullying, hate speech, dan doxing sesuai regulasi UU ITE.
• Karya cipta dilindungi hukum; gunakan lisensi Creative Commons dan aset bebas royalti secara legal.`,
    refleksi: [
      'Setelah mempelajari jejak digital, apakah ada postingan lamamu di media sosial yang perlu kamu bersihkan atau kamu privatisasi?',
      'Seberapa amankah akun-akun digitalmu saat ini dari ancaman peretasan?'
    ],
    latihanPemahaman: [
      '1. Jelaskan perbedaan mendasar antara jejak digital aktif dan jejak digital pasif beserta contohnya!',
      '2. Mengapa otentikasi dua langkah (2FA) menggunakan aplikasi Authenticator jauh lebih aman daripada SMS OTP?',
      '3. Uraikan perbedaan antara Misinformasi, Disinformasi, dan Malinformasi!',
      '4. Jelaskan makna lisensi Creative Commons tipe "CC BY-NC-SA"!'
    ],
    tugasPraktik: `**Tugas Praktik: Infografis Panduan Keamanan Siber Remaja**
Buatlah sebuah poster infografis edukatif (1 halaman ukuran A4/Instagram Feed) menggunakan aplikasi desain grafis yang memuat:
1. 5 Tips Menghindari Penipuan Phishing & Modus APK Ilegal.
2. Panduan Membuat Passphrase Kuat & Aktivasi 2FA.
3. Sumber aset gambar yang digunakan wajib berlisensi legal dengan mencantumkan atribusi lisensi di bagian footer.
Simpan dalam format PDF (\`DSI1_NAMA_KELAS.pdf\`) dan kumpulkan ke portal tugas!`,
    asesmen: [
      {
        question: 'Teknik kejahatan siber yang memancing korban untuk mengeklik tautan situs web tiruan guna mencuri username dan password akun disebut...',
        options: ['Phishing', 'Defragmentasi', 'Reverse Engineering', 'Overclocking'],
        answerIndex: 0,
        explanation: 'Phishing adalah bentuk rekayasa sosial dengan membuat website palsu untuk memancing data rahasia korban.'
      },
      {
        question: 'Metode otentikasi dua langkah (2FA) yang paling aman dari ancaman pembajakan kartu SIM (SIM Swap) adalah...',
        options: [
          'Aplikasi Authenticator (Google Authenticator / Microsoft Authenticator) berbasis TOTP',
          'Pesan SMS OTP biasa',
          'Menulis kata sandi di secarik kertas',
          'Pertanyaan nama ibu kandung'
        ],
        answerIndex: 0,
        explanation: 'Aplikasi Authenticator menghasilkan kode token langsung di perangkat secara lokal tanpa melalui jaringan seluler SMS.'
      },
      {
        question: 'Informasi yang salah dan sengaja dirancang serta disebarluaskan dengan niat jahat untuk menipu masyarakat disebut...',
        options: ['Disinformasi', 'Misinformasi', 'Malinformasi', 'Data Terstruktur'],
        answerIndex: 0,
        explanation: 'Disinformasi adalah informasi keliru yang dibuat dengan sengaja untuk tujuan penyesatan publik.'
      },
      {
        question: 'Lisensi Creative Commons yang memperbolehkan orang lain menggunakan dan memodifikasi karyamu untuk tujuan komersial asalkan mencantumkan nama pencipta aslinya adalah...',
        options: ['CC BY (Atribusi)', 'CC BY-NC', 'CC BY-ND', 'Hak Cipta Tertutup (All Rights Reserved)'],
        answerIndex: 0,
        explanation: 'CC BY adalah lisensi paling terbuka yang mengizinkan pemanfaatan komersial dengan syarat wajib atribusi pencipta.'
      },
      {
        question: 'Tindakan menyebarkan informasi pribadi orang lain seperti nomor NIK KTP dan alamat rumah ke publik tanpa izin dengan tujuan mempermalukan disebut...',
        options: ['Doxing', 'Phishing', 'Spamming', 'Blogging'],
        answerIndex: 0,
        explanation: 'Doxing adalah tindakan publikasi data pribadi seseorang secara sepihak untuk tujuan intimidasi.'
      },
      {
        question: 'Perbedaan mendasar antara Jejak Digital Aktif dan Jejak Digital Pasif adalah...',
        options: [
          'Jejak aktif tercipta saat pengguna secara sadar mengunggah konten (foto, komentar, status), sedangkan jejak pasif terkumpul otomatis di latar belakang (alamat IP, riwayat penjelajahan web, lokasi GPS)',
          'Jejak aktif hanya ada di komputer, jejak pasif hanya ada di televisi',
          'Jejak aktif otomatis terhapus dalam 1 jam, jejak pasif tersimpan selamanya',
          'Jejak aktif tidak menggunakan internet, jejak pasif menggunakan satelit'
        ],
        answerIndex: 0,
        explanation: 'Jejak aktif dihasilkan dari aksi sengaja pengguna, sementara jejak pasif dicatat oleh server dan pelacak web tanpa disadari langsung.'
      },
      {
        question: 'Metode pembuatan kata sandi bertipe "Passphrase" yang sangat kuat dan mudah diingat manusia adalah...',
        options: [
          'Menggabungkan 4 atau lebih kata acak bermakna dengan pemisah simbol dan angka (contoh: "KopiSusuGulaAren#2026!")',
          'Menggunakan tanggal lahir sendiri',
          'Mengetik kata "qwerty12345"',
          'Menuliskan nama hewan peliharaan tanpa huruf besar'
        ],
        answerIndex: 0,
        explanation: 'Passphrase memiliki entropi keamanan tinggi karena panjang karakternya melebihi 15 karakter namun tetap mudah diingat.'
      },
      {
        question: 'Aplikasi perangkat lunak yang dirancang khusus untuk menyimpan ratusan kata sandi unik terenkripsi dalam satu brankas master disebut...',
        options: ['Password Manager (Pengelola Kata Sandi)', 'Text Editor', 'Screen Recorder', 'Disk Defragmenter'],
        answerIndex: 0,
        explanation: 'Password Manager (seperti Bitwarden atau KeePass) membantu pengguna mengelola sandi rumit tanpa perlu menghafal semuanya.'
      },
      {
        question: 'Jenis serangan siber yang mengenkripsi (mengunci) seluruh berkas penting korban dan menuntut tebusan uang dalam bentuk mata uang kripto agar kunci pembuka diberikan dinamakan...',
        options: ['Ransomware', 'Adware', 'Freeware', 'Shareware'],
        answerIndex: 0,
        explanation: 'Ransomware adalah malware berbahaya yang menyandera data korban untuk memeras uang tebusan.'
      },
      {
        question: 'Modus penipuan siber yang mengirimkan file berekstensi ".apk" berkedok "Surat Undangan Pernikahan" atau "Foto Resi Paket" melalui WhatsApp bertujuan untuk...',
        options: [
          'Memasang malware penyadap SMS OTP dan menguras saldo rekening perbankan korban',
          'Mempercepat koneksi internet pengguna',
          'Mengubah wallpaper smartphone secara otomatis',
          'Memberikan kuota internet gratis dari operator'
        ],
        answerIndex: 0,
        explanation: 'File .apk palsu mengeksploitasi izin aksesibilitas smartphone untuk membaca SMS OTP perbankan.'
      },
      {
        question: 'Informasi yang tidak benar namun disebarkan oleh seseorang yang meyakini bahwa informasi tersebut benar tanpa ada niat jahat disebut...',
        options: ['Misinformasi', 'Disinformasi', 'Malinformasi', 'Fakta Otentik'],
        answerIndex: 0,
        explanation: 'Misinformasi adalah kekeliruan informasi tanpa adanya kesengajaan atau niat merugikan orang lain.'
      },
      {
        question: 'Informasi yang berdasarkan fakta nyata namun disebarluaskan untuk mencelakakan, mengancam, atau merusak reputasi seseorang disebut...',
        options: ['Malinformasi', 'Disinformasi', 'Misinformasi', 'Enkripsi Data'],
        answerIndex: 0,
        explanation: 'Malinformasi memanfaatkan informasi riil (seperti rahasia pribadi/rekaman privat) dengan maksud jahat merusak reputasi.'
      },
      {
        question: 'Teknologi manipulasi audio atau video berbasis kecerdasan buatan yang mampu menirukan wajah dan suara tokoh publik secara sangat realistis untuk penipuan disebut...',
        options: ['Deepfake', 'Deep Learning', 'Data Mining', 'Digital Twin'],
        answerIndex: 0,
        explanation: 'Deepfake memanipulasi media visual dan suara manusia menggunakan model generative adversarial networks (GAN).'
      },
      {
        question: 'Alat bantu daring yang efektif untuk melacak sumber asli suatu foto dan mendeteksi apakah gambar tersebut hoaks atau hasil daur ulang peristiwa lama adalah...',
        options: ['Google Reverse Image Search', 'Google Translate', 'Google Maps', 'Google Drive'],
        answerIndex: 0,
        explanation: 'Reverse Image Search mencari keberadaan foto serupa di internet beserta tanggal pertama kali foto tersebut diunggah.'
      },
      {
        question: 'Simbol lisensi Creative Commons "NC" (Non-Commercial) memiliki arti bahwa...',
        options: [
          'Karya tersebut tidak boleh dimanfaatkan untuk tujuan komersial atau mencari keuntungan finansial',
          'Karya tidak boleh diunduh sama sekali',
          'Pencipta tidak mengizinkan karya dibaca orang lain',
          'Karya wajib dijual dengan harga mahal'
        ],
        answerIndex: 0,
        explanation: 'Elemen NC (Non-Commercial) melarang penggunaan karya untuk menghasilkan keuntungan moneter atau bisnis.'
      },
      {
        question: 'Simbol lisensi Creative Commons "ND" (No-Derivatives) memiliki arti bahwa...',
        options: [
          'Orang lain boleh membagikan karya tersebut namun dilarang mengubah, memotong, atau membuat karya turunan darinya',
          'Karya bebas diedit sesuka hati',
          'Karya tidak memiliki hak cipta sama sekali',
          'Nama pencipta boleh dihapus'
        ],
        answerIndex: 0,
        explanation: 'Elemen ND (No-Derivatives) mensyaratkan karya harus disebarkan dalam bentuk utuh tanpa modifikasi atau gubahan.'
      },
      {
        question: 'Lisensi "Creative Commons Zero (CC0) / Public Domain" mengindikasikan bahwa...',
        options: [
          'Pencipta telah melepaskan seluruh hak ciptanya ke ranah publik sehingga karya bebas digunakan untuk apa saja tanpa syarat atribusi',
          'Karya dilindungi hak cipta eksklusif 100 tahun',
          'Karya hanya boleh dilihat oleh pemerintah',
          'Karya tidak boleh dicetak di kertas'
        ],
        answerIndex: 0,
        explanation: 'CC0 menempatkan karya ke Public Domain, memungkinkan penggunaan bebas tanpa royalti dan tanpa kewajiban atribusi.'
      },
      {
        question: 'Tindakan intimidasi, pelecehan, penghinaan, atau pengucilan seseorang secara berulang di ranah media sosial dinamakan...',
        options: ['Cyberbullying (Perundungan Siber)', 'Cyber Law', 'Cyber Security', 'Cyber Ethic'],
        answerIndex: 0,
        explanation: 'Cyberbullying berdampak psikologis serius pada korban dan memiliki konsekuensi hukum pidana.'
      },
      {
        question: 'Dalam UU ITE di Indonesia, ancaman sanksi pidana dapat dijatuhkan kepada seseorang yang...',
        options: [
          'Dengan sengaja menyebarkan ujaran kebencian berbasis SARA, mendistribusikan konten asusila, atau melakukan pemerasan secara digital',
          'Mengunduh aplikasi open source dari GitHub',
          'Membuat akun media sosial untuk belajar',
          'Membeli barang secara legal di e-commerce'
        ],
        answerIndex: 0,
        explanation: 'UU ITE mengatur sanksi pidana penjara dan denda finansial atas kejahatan konten ilegal dan manipulasi akses komputer.'
      },
      {
        question: 'Istilah "Flaming" dalam etika komunikasi internet merujuk pada...',
        options: [
          'Adu argumen daring yang dipenuhi kata-kata kasar, emosional, menghina, dan menyerang pribadi lawan bicara',
          'Mengirim email dengan kecepatan tinggi',
          'Memperbaiki komputer yang terbakar',
          'Mengunggah foto pemandangan alam'
        ],
        answerIndex: 0,
        explanation: 'Flaming adalah perselisihan virtual bernada agresif dan destruktif yang melanggar prinsip netiket.'
      },
      {
        question: 'Program jahat yang menyusup ke dalam komputer dan diam-diam merekam setiap ketukan tombol keyboard untuk mencuri kata sandi pengguna disebut...',
        options: ['Keylogger', 'Screen Saver', 'Spooler', 'Compiler'],
        answerIndex: 0,
        explanation: 'Keylogger mencatat pengetikan huruf dan angka secara rahasia untuk dikirimkan ke server penyerang.'
      },
      {
        question: 'Mengapa menggunakan jaringan WiFi publik terbuka (tanpa kata sandi) di warung kopi atau stasiun berbahaya untuk transaksi perbankan?',
        options: [
          'Karena lalu lintas data dapat disadap oleh pihak ketiga melalui teknik Man-in-the-Middle (MitM) Attack',
          'Karena baterai smartphone akan langsung habis total',
          'Karena layar smartphone akan pecah',
          'Karena memori internal otomatis terhapus'
        ],
        answerIndex: 0,
        explanation: 'WiFi publik tanpa enkripsi rentan penyadapan data transmisi oleh hacker yang berada di satu jaringan.'
      },
      {
        question: 'Ketika menerima tautan pembaruan akun bank dari email yang beralamat "admin@bca-verifikasi-keamanan.xyz", tindakan paling tepat adalah...',
        options: [
          'Mengabaikan dan menandainya sebagai spam/phishing karena domain tersebut bukan domain resmi bank (bca.co.id)',
          'Segera memasukkan PIN dan nomor kartu ATM',
          'Meneruskannya ke semua teman sekolah',
          'Mengirim uang ke nomor rekening yang tertera'
        ],
        answerIndex: 0,
        explanation: 'Pemeriksaan domain URL adalah pertahanan pertama melawan serangan web phishing.'
      },
      {
        question: 'Etika penggunaan gambar milik orang lain dari internet untuk keperluan tugas sekolah yang benar adalah...',
        options: [
          'Menggunakan gambar berlisensi Creative Commons/Public Domain dan mencantumkan tautan sumber serta nama penciptanya',
          'Menghapus watermark fotografer menggunakan Photoshop',
          'Mengakui gambar tersebut sebagai karya ciptaan sendiri',
          'Menjual poster gambar tersebut tanpa izin'
        ],
        answerIndex: 0,
        explanation: 'Atribusi sumber dan menghormati hak cipta adalah wujud integritas akademik dan etika digital.'
      },
      {
        question: 'Sikap proaktif dalam menjaga kebersihan jejak digital (digital footprint) pribadi antara lain dapat dilakukan dengan...',
        options: [
          'Rutin memeriksa pengaturan privasi akun, menghapus postingan lama yang tidak pantas, dan tidak membagikan data identitas sensitif',
          'Membuat akun palsu untuk menyerang orang lain',
          'Mengunggah kartu keluarga ke feed publik',
          'Menonaktifkan kunci layar smartphone'
        ],
        answerIndex: 0,
        explanation: 'Audit privasi berkala meminimalkan risiko eksploitasi data profil di masa mendatang.'
      },
      {
        question: 'Istilah "Social Engineering" (Rekayasa Sosial) dalam keamanan siber didefinisikan sebagai...',
        options: [
          'Teknik manipulasi psikologis manusia agar secara sukarela membocorkan data rahasia atau melakukan tindakan yang menguntungkan peretas',
          'Ilmu merakit robot sosial',
          'Cara membuat aplikasi jejaring sosial baru',
          'Teknik memperbaiki kabel listrik'
        ],
        answerIndex: 0,
        explanation: 'Rekayasa sosial mengeksploitasi kelengahan emosional dan psikologis manusia, bukan celah teknis perangkat lunak.'
      },
      {
        question: 'Metode "Vishing" (Voice Phishing) adalah penipuan yang dilakukan melalui media...',
        options: [
          'Panggilan telepon suara langsung oleh penipu yang berpura-pura menjadi aparat penegak hukum atau pihak bank',
          'Surat pos bertanda tangan basah',
          'Siaran radio gelombang pendek',
          'Papan reklame jalan raya'
        ],
        answerIndex: 0,
        explanation: 'Vishing memanfaatkan percakapan suara telepon langsung untuk menekan korban secara psikologis.'
      },
      {
        question: 'Mengapa menyimpan kata sandi akun perbankan di fitur simpan otomatis (Autofill) browser pada komputer bersama di laboratorium sekolah sangat tidak dianjurkan?',
        options: [
          'Karena pengguna berikutnya yang menggunakan komputer tersebut dapat melihat dan menyalahgunakan kredensial akun Anda',
          'Karena monitor komputer akan cepat buram',
          'Karena keyboard komputer akan macet',
          'Karena tagihan listrik sekolah akan melonjak'
        ],
        answerIndex: 0,
        explanation: 'Komputer publik tidak memiliki isolasi privasi sehingga data kredensial autofill mudah diakses orang lain.'
      },
      {
        question: 'Prinsip "Think Before You Post" (Pikirkan Sebelum Mengunggah) bertujuan untuk...',
        options: [
          'Mengingatkan pengguna bahwa apa pun yang diunggah ke internet dapat disalin, disimpan, dan berdampak jangka panjang pada masa depan',
          'Menghambat kecepatan mengetik di keyboard',
          'Mewajibkan pengguna membayar pajak postingan',
          'Membatasi jumlah kata hanya 5 huruf'
        ],
        answerIndex: 0,
        explanation: 'Kesadaran konsekuensi jangka panjang melindungi masa depan karier dan integritas diri.'
      },
      {
        question: 'Langkah pertama yang wajib segera dilakukan jika akun media sosialmu terindikasi telah diretas oleh orang lain adalah...',
        options: [
          'Segera mengganti kata sandi melalui fitur lupa sandi resmi, logout dari seluruh sesi perangkat, dan aktifkan 2FA',
          'Mematikan aliran listrik di seluruh rumah',
          'Membuang smartphone ke tempat sampah',
          'Menghapus router internet'
        ],
        answerIndex: 0,
        explanation: 'Pemutusan sesi aktif dan perubahan kata sandi serta aktivasi 2FA menghentikan akses ilegal penyusup secara seketika.'
      }
    ],
    asesmenUraian: [
      'Jelaskan mengapa faktor manusia (human error) sering disebut sebagai celah keamanan siber yang paling lemah!',
      'Uraikan langkah-langkah yang harus dilakukan jika akun media sosial atau email Anda terindikasi telah diretas orang lain!'
    ],
    rubrikPenilaian: [
      {
        kriteria: 'Penguasaan Konsep Keamanan Siber',
        skor4: 'Mampu menjelaskan jejak digital, 2FA, jenis malware, dan metode cek fakta secara akurat dan komprehensif.',
        skor3: 'Menjelaskan konsep keamanan dengan baik namun ada 1 poin ancaman yang kurang detail.',
        skor2: 'Hanya memahami konsep kata sandi tanpa memahami 2FA atau lisensi.',
        skor1: 'Tidak memahami konsep literasi digital.'
      },
      {
        kriteria: 'Kepatuhan Etika & Lisensi HAKI',
        skor4: 'Seluruh aset yang digunakan bersumber legal dan pencantuman atribusi lisensi Creative Commons tepat 100%.',
        skor3: 'Aset legal namun atribusi lisensi kurang lengkap.',
        skor2: 'Masih menggunakan gambar sembarangan dari internet tanpa lisensi.',
        skor1: 'Melakukan plagiarisme karya orang lain.'
      }
    ],
    glosarium: [
      { term: 'Digital Footprint', definition: 'Jejak data yang ditinggalkan pengguna saat beraktivitas di jaringan internet.' },
      { term: 'Phishing', definition: 'Metode kejahatan siber untuk memperoleh informasi rahasia melalui penyamaran sebagai entitas tepercaya.' },
      { term: '2FA / MFA', definition: 'Two-Factor Authentication; lapisan keamanan ganda yang memerlukan kata sandi dan kode verifikasi kedua.' },
      { term: 'Creative Commons (CC)', definition: 'Organisasi nirlaba yang menyediakan lisensi hak cipta standar untuk berbagi karya cipta secara legal.' },
      { term: 'Doxing', definition: 'Tindakan mempublikasikan data pribadi seseorang di internet tanpa persetujuan untuk tujuan merugikan korban.' }
    ],
    sumberReferensi: [
      'Kementerian Komunikasi dan Informatika RI (2023). Modul Literasi Digital: Aman, Nyaman, dan Kreatif di Ruang Digital.',
      'Undang-Undang Republik Indonesia Nomor 1 Tahun 2024 tentang Perubahan Kedua UU ITE.',
      'Undang-Undang Republik Indonesia Nomor 28 Tahun 2014 tentang Hak Cipta.',
      'Creative Commons Organization (2024). About CC Licenses and Attribution Guides.'
    ]
  },

  // =========================================================================
  // BAB 9: DAMPAK SOSIAL INFORMATIKA
  // =========================================================================
  {
    id: 'DSI-2',
    elementId: 'DSI',
    elementName: 'Dampak Sosial Informatika',
    moduleNumber: 2,
    bab: 'BAB 9 — Dampak Sosial Informatika',
    pertemuan: 17,
    fase: 'Fase E (Kelas X SMK)',
    title: 'Transformasi Ekonomi Digital, Masa Depan Pekerjaan, Regulasi Hukum, dan Budaya Siber',
    estimatedTimeMinutes: 90,
    difficulty: 'Menengah',
    competencies: [
      'Menganalisis dampak positif dan negatif informatika terhadap tatanan sosial, ekonomi, dan budaya masyarakat',
      'Memahami fenomena otomatisasi, disrupsi pekerjaan tradisional, dan kemunculan profesi baru masa depan',
      'Menganalisis pertumbuhan ekonomi digital di Indonesia: E-Commerce, Fintech, QRIS, dan ekosistem kreator konten',
      'Mengevaluasi isu kesenjangan digital (Digital Divide) di Indonesia serta strategi inklusi digital daerah 3T',
      'Memahami kerangka regulasi hukum digital (UU ITE dan UU Perlindungan Data Pribadi No. 27 Tahun 2022)',
      'Mengembangkan kesadaran kesehatan mental digital: mengatasi screen addiction, bahaya judi online/pinjol ilegal, dan menyeimbangkan FOMO vs JOMO'
    ],
    objectives: [
      'Siswa mampu memetakan peluang karier baru era digital dan merancang strategi adaptasi kompetensi kejuruan SMK',
      'Siswa dapat menjelaskan ekosistem ekonomi digital Indonesia serta peran standardisasi QRIS dalam memajukan UMKM',
      'Siswa mampu menganalisis kesenjangan digital infrastruktur di daerah dan merumuskan solusi berbasis teknologi tepat guna',
      'Siswa dapat menguraikan hak-hak pemilik data pribadi berdasarkan UU PDP No. 27 Tahun 2022',
      'Siswa mampu merumuskan batasan sehat dalam penggunaan gawai untuk mencegah kecanduan digital dan jeratan pinjaman online ilegal'
    ],
    summary: 'Kajian komprehensif dampak sosial teknologi: disrupsi masa depan pekerjaan, revolusi ekonomi digital QRIS/Fintech, penanganan kesenjangan digital 3T, kepatuhan UU PDP & UU ITE, serta pembentukan budaya digital yang sehat.',
    infographicHighlights: [
      { label: 'Otomasi Pekerjaan', text: 'Pergeseran tugas rutin manual menuju pekerjaan bernilai analisis tinggi.', icon: 'Briefcase' },
      { label: 'Ekonomi Digital', text: 'E-Commerce, Fintech, QRIS, dan monetisasi konten kreatif.', icon: 'CreditCard' },
      { label: 'Regulasi UU PDP', text: 'Perlindungan hak privasi data pribadi konsumen dan warga negara.', icon: 'Scale' },
      { label: 'Kesehatan Mental', text: 'Digital detox, pencegahan judi online, dan keseimbangan hidup digital.', icon: 'HeartHandshake' }
    ],
    pertanyaanPemantik: [
      'Mengapa profesi penjaga loket tiket jalan tol atau juru ketik manual kini hampir punah, sementara profesi seperti Data Analyst dan Content Creator bergaji puluhan juta?',
      'Bagaimana pedagang sayur keliling di desa bisa menerima pembayaran non-tunai dari pembeli hanya bermodalkan stiker kode QRIS di gerobaknya?',
      'Apa yang harus kamu lakukan jika sebuah aplikasi pinjaman online ilegal meneror dan menyebarkan foto kontak teman-teman di smartphone-mu?'
    ],
    pendahuluan: `Perkembangan teknologi informatika bagaikan pedang bermata dua. Di satu sisi, teknologi menciptakan lompatan peradaban: jutaan lapangan kerja baru tercipta di sektor ekonomi digital, transaksi perdagangan menjadi instan dengan QRIS, dan akses ilmu pengetahuan terbuka lebar bagi siapa saja.

Namun di sisi lain, teknologi membawa disrupsi sosial yang masif: pekerjaan manual tergeser oleh mesin otomatis, kesenjangan digital (*digital divide*) antara kota besar dan daerah pelosok semakin melebar, serta maraknya bahaya ketergantungan gawai (*screen addiction*), judi online terselubung, dan kebocoran data pribadi.

Modul ini mengajak siswa SMK untuk menelaah secara kritis posisi teknologi dalam masyarakat, memahami perlindungan hukum negara, serta menjadi agen perubahan yang membawa dampak sosial positif bagi lingkungan sekitar.`,
    konsepInti: `1. **Otomatisasi & Future of Jobs**: Profesi repetitif terotomasi vs Profesi masa depan (AI Engineer, UI/UX Designer, Agritech Specialist).
2. **Ekonomi Digital**: Nilai transaksi digital Indonesia, Financial Technology (Fintech), QRIS Bank Indonesia, dan logistik pintar.
3. **Kesenjangan Digital (Digital Divide)**: Tiga dimensi: Akses Infrastruktur, Kepemilikan Perangkat, dan Literasi Kemampuan Digital.
4. **Regulasi Hukum**: UU ITE (tindak pidana pencemaran, manipulasi data, transaksi ilegal) dan UU PDP No. 27 Tahun 2022 (hak penghapusan data, kerahasiaan data spesifik).
5. **Budaya & Kesehatan Mental**: Work From Anywhere (WFA), fenomena FOMO vs JOMO, digital detox, dan bahaya jeratan judi online / pinjol ilegal.`,
    contentMarkdown: `# BAB 9 — Dampak Sosial Informatika

## 1. Otomatisasi dan Transformasi Lanskap Pekerjaan Masa Depan

Berdasarkan laporan *Future of Jobs Report* oleh **World Economic Forum (WEF)**, jutaan pekerjaan yang bersifat rutin dan repetitif akan digantikan oleh otomasi perangkat lunak dan robot cerdas. Namun, jutaan profesi baru yang membutuhkan kreativitas, empati, dan analisis komputasi justru tumbuh pesat:

\`\`\`text
+------------------------------------+------------------------------------------+
| PEKERJAAN YANG MENURUN (TERGESER)  | PEKERJAAN YANG BERTUMBUH PESAT           |
+------------------------------------+------------------------------------------+
| • Petugas entri data manual (Data  | • Data Analyst & Data Scientist          |
|   Entry Clerks)                    | • AI & Machine Learning Specialists      |
| • Kasir konvensional & penjaga tol | • UI/UX Designers & Digital Animators    |
| • Operator telepon & juru arsip    | • Cyber Security & Cloud Engineers       |
| • Pekerja perakitan manual pabrik  | • Digital Agritech & Smart Farming Leads |
+------------------------------------+------------------------------------------+
\`\`\`

---

## 2. Ledakan Ekonomi Digital dan Inovasi Finansial di Indonesia

Indonesia merupakan pasar ekonomi digital terbesar di Asia Tenggara dengan nilai transaksi mencapai ratusan triliun rupiah.

\`\`\`text
+-------------------------------------------------------------------------------+
|                        EKOSISTEM EKONOMI DIGITAL INDONESIA                    |
+---------------------+-------------------------+-------------------------------+
| 1. E-COMMERCE       | 2. FINTECH & QRIS       | 3. LOGISTIK CERDAS            |
| Shopee, Tokopedia,  | QRIS Bank Indonesia,    | Pelacakan kurir real-time     |
| TikTok Shop UMKM    | GoPay, OVO, DANA, BCA   | pergudangan otomatis, routing |
| Penjualan produk    | Pembayaran non-tunai    | algoritma ekspedisi           |
+---------------------+-------------------------+-------------------------------+
\`\`\`

### QRIS (Quick Response Code Indonesian Standard):
Standar kode QR nasional yang diluncurkan oleh Bank Indonesia dan ASPI. Dengan 1 stiker QRIS, pedagang warung atau unit produksi siswa SMK dapat menerima pembayaran dari seluruh aplikasi perbankan dan e-wallet di Indonesia secara instan, aman, dan tanpa biaya tambahan.

---

## 3. Isu Kesenjangan Digital (*Digital Divide*) di Indonesia

Kesenjangan digital adalah jurang pemisah antara kelompok masyarakat yang memiliki akses penuh terhadap teknologi informasi modern dengan kelompok yang tidak memilikinya.

\`\`\`text
+-------------------+-----------------------------------------------------------+
| TINGKATAN         | FAKTOR DAN TANTANGAN KESENJANGAN                          |
+-------------------+-----------------------------------------------------------+
| 1. Infrastruktur  | Ketiadaan sinyal 4G/5G dan fiber optic di daerah 3T       |
|                   | (Tertinggal, Terdepan, dan Terluar).                      |
+-------------------+-----------------------------------------------------------+
| 2. Perangkat      | Mahalnya harga laptop/smartphone berkualitas bagi keluarga|
|                   | prasejahtera.                                             |
+-------------------+-----------------------------------------------------------+
| 3. Literasi       | Masyarakat memiliki smartphone tetapi hanya untuk konsumsi|
|                   | hiburan, belum bisa memanfaatkannya untuk produktivitas.  |
+-------------------+-----------------------------------------------------------+
\`\`\`

---

## 4. Perlindungan Data Pribadi (UU PDP No. 27 Tahun 2022) & UU ITE

Pemerintah Indonesia telah mengesahkan **Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP)** untuk melindungi hak-hak warga negara di ruang siber.

### Hak-Hak Pemilik Data Pribadi:
1. **Hak atas Informasi**: Mengetahui tujuan pengumpulan data dan siapa yang memproses datanya.
2. **Hak Koreksi Data**: Berhak memperbaiki data yang salah atau tidak akurat.
3. **Hak Penghapusan (*Right to Erasure / Right to be Forgotten*)**: Berhak meminta perusahaan menghapus data pribadi mereka dari server jika sudah tidak berlangganan.
4. **Sanksi Pelanggaran**: Perusahaan yang membocorkan data nasabah dapat dikenai denda hingga miliaran rupiah dan sanksi pidana kurungan.

---

## 5. Budaya Digital, Kesehatan Mental, dan Bahaya Sosial

\`\`\`text
+-------------------+-----------------------------------------------------------+
| FENOMENA BUDAYA   | DESKRIPSI DAN CARA MENYIKAPI SECARA BIJAK                 |
+-------------------+-----------------------------------------------------------+
| FOMO vs JOMO      | FOMO (Fear of Missing Out): Cemas ketinggalan tren.       |
|                   | JOMO (Joy of Missing Out): Menikmati kehidupan nyata.     |
+-------------------+-----------------------------------------------------------+
| Screen Addiction  | Kecanduan layar gawai yang merusak kualitas tidur dan mata|
|                   | -> Terapkan aturan 20-20-20 dan *Digital Detox* berkala.   |
+-------------------+-----------------------------------------------------------+
| Bahaya Judi Online| Jeratan game judi berkedok slot online yang merusak masa  |
| & Pinjol Ilegal   | depan remaja dan memicu tindak kriminalitas.              |
+-------------------+-----------------------------------------------------------+
\`\`\``,
    contohPenerapan: `1. **Digitalisasi UMKM Desa**: Siswa SMK membantu kelompok tani kopi lokal mendaftarkan akun QRIS Merchant dan toko online Shopee sehingga produk kopi desa bisa terjual ke pelanggan di seluruh nusantara.
2. **Penerapan Hak Hapus Akun**: Seorang pengguna meminta aplikasi e-commerce menghapus seluruh nomor telepon dan riwayat transaksi lamanya setelah ia menonaktifkan akun.`,
    studiKasus: `**Studi Kasus: Jeratan Pinjol Ilegal dan Penyalahgunaan Data Pribadi**

Seorang remaja tergiur meminjam uang Rp 1.000.000 dari aplikasi pinjaman online tanpa izin OJK untuk membeli item game online. Saat menginstal aplikasi, ia menekan tombol "Izinkan Semua Akses" (kontak telepon, galeri foto, lokasi).
Ketika terlambat membayar 3 hari, pihak pinjol menyebarkan foto KTP dan mengirimkan pesan ancaman ke seluruh nomor guru dan teman-teman di kontak teleponnya.

**Analisis Masalah**:
1. Analisis pelanggaran privasi apa yang terjadi berdasarkan UU PDP No. 27 Tahun 2022.
2. Jelaskan langkah pencegahan yang harus dipahami oleh seluruh siswa SMK!`,
    aktivitasSiswa: `**Diskusi Meja Bundar: Digital Impact & Social Action**
1. Bentuk kelompok beranggotakan 4 orang.
2. Pilih satu isu sosial: (a) Kesenjangan sinyal internet di desa terpencil, (b) Bahaya judi online di kalangan pelajar, atau (c) Transformasi pekerjaan di bidang DKV/APHP.
3. Rumuskan 3 solusi berbasis aksi nyata yang bisa dilakukan oleh siswa SMK untuk mengatasi masalah tersebut.
4. Tuliskan dalam bentuk poster deklarasi digital di Canva/Docs!`,
    tipsPraktis: [
      'Jangan pernah memberikan izin akses kontak telepon dan galeri foto kepada aplikasi keuangan yang tidak berizin resmi OJK.',
      'Manfaatkan fitur Screen Time / Digital Wellbeing di smartphone-mu untuk membatasi waktu buka media sosial maksimal 2 jam per hari.',
      'Dukung UMKM di sekitarmu dengan membiasakan membayar menggunakan QRIS non-tunai.'
    ],
    kesalahanUmum: [
      'Mengira bahwa semua lowongan kerja akan hilang karena teknologi (pekerjaan hanya bertransformasi, bukan musnah).',
      'Menganggap remeh izin privasi saat menginstal aplikasi game atau aplikasi pinjol abal-abal.',
      'Menghabiskan waktu berjam-jam bermain game online hingga mengabaikan tugas belajar dan kesehatan mata.'
    ],
    rangkuman: `• Informatika mentransformasi dunia kerja: mengotomasi tugas rutin dan menciptakan profesi masa depan berorientasi data, AI, dan kreativitas.
• Ekonomi digital Indonesia tumbuh pesat didorong oleh E-Commerce, Fintech, dan standardisasi pembayaran nasional QRIS.
• Kesenjangan digital mencakup aspek infrastruktur, kepemilikan gawai, dan literasi pemanfaatan produktif.
• UU PDP No. 27 Tahun 2022 menjamin hak warga negara atas privasi data pribadinya.
• Kesehatan mental digital dijaga dengan membatasi waktu layar gawai, menghindari FOMO, dan menjauhi bahaya judi online serta pinjaman ilegal.`,
    refleksi: [
      'Berapa jam rata-rata waktu yang kamu habiskan di depan layar smartphone setiap hari, dan berapa persen dari waktu itu yang bernilai produktif?',
      'Keterampilan baru apa yang harus kamu pelajari mulai hari ini agar tidak tergeser oleh otomasi masa depan?'
    ],
    latihanPemahaman: [
      '1. Sebutkan 3 profesi yang mengalami penurunan dan 3 profesi yang bertumbuh pesat menurut laporan Future of Jobs WEF!',
      '2. Apa manfaat standardisasi QRIS Bank Indonesia bagi pedagang kecil dan UMKM?',
      '3. Uraikan 3 tingkatan kesenjangan digital (Digital Divide) yang masih terjadi di Indonesia!',
      '4. Sebutkan 3 hak mendasar pemilik data pribadi yang dilindungi oleh UU PDP No. 27 Tahun 2022!'
    ],
    tugasPraktik: `**Tugas Esai Analisis Sosial: Peta Masa Depan Kejuruan SMK**
Tuliskan sebuah esai kritis (2 halaman PDF) dengan memilih salah satu topik:
1. *Bagaimana AI dan Otomasi Mengubah Industri Desain Komunikasi Visual (DKV) dalam 5 Tahun ke Depan?*
ATAU
2. *Peran Smart Agriculture dan Digital Traceability dalam Modernisasi Pengolahan Pangan (APHP) di Indonesia.*
Lengkapi dengan data tren ekonomi digital dan simpan sebagai file PDF (\`DSI2_NAMA_KELAS.pdf\`)!`,
    asesmen: [
      {
        question: 'Standar kode QR pembayaran nasional yang ditetapkan oleh Bank Indonesia untuk mengintegrasikan seluruh e-wallet dan mobile banking adalah...',
        options: ['QRIS (Quick Response Code Indonesian Standard)', 'NFC Tap to Pay', 'Barcode EAN-13', 'SWIFT Code'],
        answerIndex: 0,
        explanation: 'QRIS adalah standar pembayaran kode QR terpadu di Indonesia yang menghubungkan seluruh bank dan e-wallet.'
      },
      {
        question: 'Hak pemilik data pribadi untuk meminta penghapusan seluruh data rekam jejaknya dari sistem server perusahaan disebut...',
        options: ['Right to Erasure (Hak Penghapusan Data / Right to be Forgotten)', 'Right to Download', 'Hak Cipta Eksklusif', 'Hak Monopoli Data'],
        answerIndex: 0,
        explanation: 'UU PDP No. 27 Tahun 2022 mengatur Right to Erasure, di mana pengguna berhak meminta data pribadinya dimusnahkan.'
      },
      {
        question: 'Jurang pemisah antara kelompok masyarakat yang memiliki akses internet cepat dengan kelompok yang terisolir teknologi disebut...',
        options: ['Digital Divide (Kesenjangan Digital)', 'Digital Footprint', 'Digital Detox', 'Digital Native'],
        answerIndex: 0,
        explanation: 'Digital Divide menggambarkan kesenjangan akses infrastruktur, perangkat, dan literasi digital antar wilayah/kelompok.'
      },
      {
        question: 'Sikap mental menikmati momen nyata dan ketenangan tanpa rasa cemas ketinggalan tren media sosial disebut...',
        options: ['JOMO (Joy of Missing Out)', 'FOMO (Fear of Missing Out)', 'Cyber Addiction', 'Social Phobia'],
        answerIndex: 0,
        explanation: 'JOMO adalah kebalikan dari FOMO, yaitu kepuasan diri untuk tidak terikat pada hiruk pikuk tren media sosial.'
      },
      {
        question: 'Berdasarkan regulasi di Indonesia, aplikasi pinjaman online yang legal dan diawasi oleh pemerintah wajib memiliki izin dari...',
        options: ['Otoritas Jasa Keuangan (OJK)', 'Badan Meteorologi dan Geofisika', 'Kementerian Pertanian', 'Dinas Kependudukan dan Catatan Sipil'],
        answerIndex: 0,
        explanation: 'OJK (Otoritas Jasa Keuangan) adalah lembaga resmi negara yang mengatur dan mengawasi seluruh aktivitas jasa keuangan di Indonesia.'
      },
      {
        question: 'Berdasarkan laporan Future of Jobs oleh World Economic Forum (WEF), kategori pekerjaan yang paling rentan tergeser oleh otomatisasi adalah...',
        options: [
          'Pekerjaan rutin dan repetitif manual (seperti entri data dan kasir manual)',
          'Pekerjaan yang menuntut empati tinggi, negosiasi, dan kepemimpinan strategis',
          'Profesi perancang kecerdasan artifisial dan data analyst',
          'Spesialis keamanan siber'
        ],
        answerIndex: 0,
        explanation: 'Tugas-tugas rutin berulang berbasis aturan tetap paling mudah diotomatisasi oleh algoritma dan robotika.'
      },
      {
        question: 'Istilah "Fintech" (Financial Technology) dalam revolusi ekonomi digital merujuk pada...',
        options: [
          'Inovasi teknologi digital yang mengubah dan mempermudah layanan keuangan, transaksi pembayaran, dan investasi',
          'Teknik merakit komputer perbankan',
          'Mata pelajaran akuntansi manual di buku kas',
          'Peralatan mesin cetak uang kertas fisik'
        ],
        answerIndex: 0,
        explanation: 'Fintech mencakup sistem pembayaran digital, e-wallet, peer-to-peer lending, crowdfunding, dan insurtech.'
      },
      {
        question: 'Dalam regulasi UU Perlindungan Data Pribadi (UU PDP No. 27/2022), data yang tergolong sebagai "Data Pribadi Spesifik" (sensitif) adalah...',
        options: [
          'Data kesehatan, data biometrik, data genetika, catatan kejahatan, dan data keuangan pribadi',
          'Nama lengkap dan jenis kelamin',
          'Alamat kantor pos kota',
          'Judul buku kesukaan'
        ],
        answerIndex: 0,
        explanation: 'Data spesifik memiliki risiko diskriminasi atau kerugian fatal jika bocor, sehingga mewajibkan standar pengamanan ekstra ketat.'
      },
      {
        question: 'Proyek infrastruktur serat optik nasional yang dibangun pemerintah Indonesia untuk menghubungkan jaringan telekomunikasi antar-pulau dari Sabang sampai Merauke adalah...',
        options: ['Palapa Ring', 'Garuda Shield', 'Nusantara Satelit', 'Siber Kreasi'],
        answerIndex: 0,
        explanation: 'Palapa Ring adalah tulang punggung jaringan serat optik pita lebar (broadband) nasional untuk pemerataan akses internet.'
      },
      {
        question: 'Sindrom kecemasan psikologis di mana seseorang merasa takut tertinggal kabar atau tren viral yang sedang terjadi di dunia maya dinamakan...',
        options: ['FOMO (Fear of Missing Out)', 'JOMO (Joy of Missing Out)', 'Nomophobia', 'Cyberloafing'],
        answerIndex: 0,
        explanation: 'FOMO memicu dorongan kompulsif untuk terus-menerus memeriksa layar ponsel (checking habits).'
      },
      {
        question: 'Praktik menjauhkan diri secara sengaja dari gawai digital dan media sosial dalam periode waktu tertentu untuk memulihkan kesehatan mental disebut...',
        options: ['Digital Detox', 'Defragmentasi', 'Overclocking', 'System Reboot'],
        answerIndex: 0,
        explanation: 'Digital Detox bertujuan meredakan stres mental dan mengembalikan keseimbangan interaksi di dunia nyata.'
      },
      {
        question: 'Ciri-ciri utama aplikasi pinjaman online (Pinjol) ilegal yang berbahaya bagi masyarakat adalah, KECUALI...',
        options: [
          'Terdaftar resmi dan memiliki izin operasional dari Otoritas Jasa Keuangan (OJK)',
          'Meminta izin akses ke seluruh buku kontak, galeri foto, dan mikrofon smartphone secara paksa',
          'Mengenakan bunga dan denda harian yang sangat tinggi tanpa kejelasan kontrak',
          'Melakukan penagihan dengan ancaman teror, intimidasi, dan penyebaran data pribadi'
        ],
        answerIndex: 0,
        explanation: 'Pinjol legal terdaftar di OJK, transparan dalam perjanjian bunga, dan dilarang mengakses kontak ponsel konsumen.'
      },
      {
        question: 'Bahaya utama dari fenomena maraknya promosi judi online (judol) terselubung di media sosial terhadap generasi muda adalah...',
        options: [
          'Menimbulkan kecanduan dopamin patologis, kerugian finansial drastis, putus sekolah, hingga depresi mental berat',
          'Membuat baterai laptop lebih cepat terisi penuh',
          'Meningkatkan kecerdasan matematika',
          'Menghilangkan seluruh virus komputer secara otomatis'
        ],
        answerIndex: 0,
        explanation: 'Judi online dirancang secara manipulatif untuk memicu kecanduan psikologis dan memiskinkan korbannya.'
      },
      {
        question: 'Hak pemilik data pribadi untuk memperbaiki atau memperbarui datanya yang keliru di sistem basis data perusahaan disebut...',
        options: ['Right to Rectification (Hak Pembetulan Data)', 'Right to Erasure', 'Right to Delete', 'Right to Block'],
        answerIndex: 0,
        explanation: 'Right to Rectification menjamin keakuratan data profil pengguna di bawah UU PDP.'
      },
      {
        question: 'Istilah "Gig Economy" dalam lanskap ketenagakerjaan modern merujuk pada...',
        options: [
          'Pasar tenaga kerja berbasis proyek jangka pendek, pekerjaan lepas (freelancer), dan platform on-demand (seperti kurir ojol dan desainer grafis lepas)',
          'Pabrik baja industri berat konvensional',
          'Sistem kerja seumur hidup pada satu instansi',
          'Perdagangan barter hasil bumi'
        ],
        answerIndex: 0,
        explanation: 'Gig Economy menawarkan fleksibilitas waktu bagi pekerja mandiri yang terhubung melalui platform aplikasi digital.'
      },
      {
        question: 'Tiga tingkatan dimensi dalam Kesenjangan Digital (Digital Divide) meliputi kesenjangan pada...',
        options: [
          'Akses Infrastruktur, Kepemilikan Perangkat Keras, dan Literasi/Keterampilan Digital Pemanfaatan',
          'Merek Smartphone, Warna Casing, dan Jumlah Kamera',
          'Kecepatan Mengetik, Jumlah Followers Medsos, dan Resolusi Layar',
          'Usia Komputer, Bahasa Pemrograman, dan Merek Router'
        ],
        answerIndex: 0,
        explanation: 'Digital divide bergeser dari sekadar masalah fisik kabel (first-level) menuju kesenjangan keterampilan memanfaatkan teknologi (second-level).'
      },
      {
        question: 'Peran standardisasi sistem pembayaran QRIS Bank Indonesia bagi pelaku UMKM produk olahan pangan (APHP) di pedesaan adalah...',
        options: [
          'Memungkinkan penerimaan pembayaran non-tunai dari berbagai aplikasi bank/e-wallet dengan satu stiker QR dan pencatatan transaksi yang otomatis',
          'Mengubah rasa makanan menjadi lebih manis secara otomatis',
          'Menghilangkan kebutuhan membayar pajak',
          'Membuat makanan tahan basi 10 tahun'
        ],
        answerIndex: 0,
        explanation: 'QRIS memfasilitasi inklusi keuangan digital UMKM dan integrasi riwayat kas penjualan tanpa biaya terminal EDC mahal.'
      },
      {
        question: 'Penyedia layanan komputasi awan yang mengelola seluruh server, penyimpanan, dan jaringan tanpa pengguna perlu membeli perangkat keras fisik sendiri disebut model...',
        options: ['Cloud Computing', 'Manual Filing', 'Local Host Standalone', 'Off-grid Station'],
        answerIndex: 0,
        explanation: 'Cloud computing memungkinkan efisiensi biaya infrastruktur teknologi bagi startup dan perusahaan modern.'
      },
      {
        question: 'Tindakan yang melanggar ketentuan Pasal 27 ayat 3 UU ITE di media sosial adalah...',
        options: [
          'Mendistribusikan konten digital yang memuat muatan penghinaan, fitnah, atau pencemaran nama baik orang lain',
          'Membeli pulsa data melalui mobile banking',
          'Mengunggah karya desain portofolio buatan sendiri',
          'Mengunduh aplikasi open source legal'
        ],
        answerIndex: 0,
        explanation: 'Pasal 27 ayat 3 UU ITE mengatur delik pencemaran nama baik dan fitnah melalui sistem elektronik.'
      },
      {
        question: 'Fenomena "Nomophobia" (No Mobile Phone Phobia) adalah ketakutan ekstrem yang dialami seseorang ketika...',
        options: [
          'Terpisah dari smartphone-nya, kehabisan baterai, atau tidak memiliki koneksi sinyal internet',
          'Mendengarkan suara petir di luar rumah',
          'Melihat angka matematika di layar monitor',
          'Berbicara di depan panggung umum'
        ],
        answerIndex: 0,
        explanation: 'Nomophobia mencerminkan ketergantungan psikologis yang tidak sehat terhadap kehadiran perangkat gawai.'
      },
      {
        question: 'Kewajiban Pengendali Data Pribadi (perusahaan/organisasi) menurut UU PDP apabila terjadi insiden kebocoran data adalah...',
        options: [
          'Memberitahukan secara tertulis kepada pemilik data pribadi dan lembaga otoritas PDP paling lambat 3 x 24 jam',
          'Menyembunyikan kebocoran dari publik selamanya',
          'Menghapus seluruh file kantor dan membakar server',
          'Menyalahkan pemilik data atas kebocoran'
        ],
        answerIndex: 0,
        explanation: 'UU PDP mewajibkan notifikasi resmi insiden kebocoran data dalam waktu maksimal 72 jam kepada otoritas dan korban.'
      },
      {
        question: 'Dalam industri kreatif DKV, platform crowdsourcing mikro-stok (seperti Shutterstock atau Adobe Stock) memungkinkan desainer untuk...',
        options: [
          'Menjual lisensi aset grafis, foto, dan ilustrasi digital secara pasif ke pasar global dunia',
          'Menghapus seluruh file komputer orang lain',
          'Membuat printer mencetak uang tunai',
          'Mengambil alih server internet'
        ],
        answerIndex: 0,
        explanation: 'Pasar mikro-stok digital membuka peluang monetisasi karya visual desainer ke jutaan pembeli internasional.'
      },
      {
        question: 'Istilah "Transversal Skills" atau keterampilan abad ke-21 yang wajib dimiliki siswa SMK agar tidak mudah terdisrupsi teknologi mencakup...',
        options: [
          'Berpikir Kritis, Kreativitas, Komunikasi Efektif, Kolaborasi Tim, dan Kemampuan Belajar Mandiri (Adaptabilitas)',
          'Hanya keterampilan mengetik 10 jari tanpa analisis',
          'Kemampuan menghafal rumus tanpa memahami maknanya',
          'Keahlian bermain game online semalam suntuk'
        ],
        answerIndex: 0,
        explanation: 'Keterampilan transversal bersifat lintas profesi dan tahan terhadap ancaman otomatisasi AI.'
      },
      {
        question: 'Strategi pemanfaatan teknologi digital yang bertanggung jawab bagi generasi muda SMK adalah...',
        options: [
          'Memanfaatkan internet untuk meningkatkan keahlian vokasional, membangun portofolio profesional, dan mematuhi etika hukum siber',
          'Menggunakan media sosial untuk menyebarkan ujaran kebencian anonim',
          'Mencari celah wifi sekolah untuk mengunduh konten bajakan',
          'Menghabiskan seluruh waktu untuk judi online'
        ],
        answerIndex: 0,
        explanation: 'Literasi digital yang matang mengarahkan penggunaan teknologi pada produktivitas ekonomi dan pengembangan karier.'
      },
      {
        question: 'Mengapa mata pelajaran Dampak Sosial Informatika (DSI) diajarkan kepada seluruh siswa Fase E jenjang SMK?',
        options: [
          'Agar melahirkan lulusan vokasi yang tidak hanya terampil teknis, tetapi juga memiliki kesadaran hukum, etika moral, dan kepemimpinan digital yang bertanggung jawab di masyarakat',
          'Hanya sebagai formalitas jadwal pelajaran sekolah',
          'Supaya siswa bisa membongkar casing komputer lab',
          'Agar siswa tidak perlu belajar mata pelajaran kejuruan'
        ],
        answerIndex: 0,
        explanation: 'DSI membentuk karakter profesional yang etis, sadar hukum, dan siap menghadapi tantangan transformasi peradaban digital.'
      }
    ],
    asesmenUraian: [
      'Jelaskan bagaimana pemanfaatan ekonomi digital dapat membantu petani lokal di pedesaan memasarkan hasil panennya secara langsung ke konsumen tanpa tengkulak!',
      'Uraikan analisis Anda mengenai bahaya kecanduan judi online terhadap masa depan dan kesehatan mental generasi muda!'
    ],
    rubrikPenilaian: [
      {
        kriteria: 'Kedalaman Analisis Sosial',
        skor4: 'Analisis sangat mendalam, mengaitkan fenomena otomasi, regulasi hukum UU PDP, dan contoh konkret kejuruan SMK.',
        skor3: 'Analisis baik namun belum mengaitkan secara spesifik dengan regulasi hukum.',
        skor2: 'Analisis dangkal dan bersifat opini umum tanpa data.',
        skor1: 'Tidak menyampaikan analisis sosial yang tepat.'
      },
      {
        kriteria: 'Argumentasi & Tata Bahasa',
        skor4: 'Argumen logis, runtut, menggunakan bahasa Indonesia baku, dan menyertakan referensi rujukan kredibel.',
        skor3: 'Bahasa cukup baik dengan sedikit kesalahan ejaan minor.',
        skor2: 'Struktur penulisan esai belum rapi.',
        skor1: 'Tugas tidak memenuhi struktur penulisan ilmiah.'
      }
    ],
    glosarium: [
      { term: 'Digital Divide', definition: 'Kesenjangan antara individu atau wilayah yang memiliki akses teknologi informasi dengan yang tidak.' },
      { term: 'QRIS', definition: 'Quick Response Code Indonesian Standard; standar nasional pembayaran non-tunai berbasis kode QR di Indonesia.' },
      { term: 'UU PDP', definition: 'Undang-Undang Pelindungan Data Pribadi No. 27 Tahun 2022 yang mengatur tata kelola dan perlindungan privasi data pribadi.' },
      { term: 'Fintech', definition: 'Financial Technology; inovasi teknologi dalam industri layanan keuangan dan sistem pembayaran.' }
    ],
    sumberReferensi: [
      'World Economic Forum (2023). The Future of Jobs Report 2023.',
      'Bank Indonesia (2024). Cetak Biru Sistem Pembayaran Indonesia & Standar QRIS.',
      'Undang-Undang Republik Indonesia Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi.',
      'Kementerian Kominfo RI (2023). Peta Jalan Indonesia Digital 2021-2024.'
    ]
  },

  // =========================================================================
  // BAB 10: KECERDASAN ARTIFISIAL (AI)
  // =========================================================================
  {
    id: 'DSI-3',
    elementId: 'DSI',
    elementName: 'Dampak Sosial Informatika',
    moduleNumber: 3,
    bab: 'BAB 10 — Kecerdasan Artifisial (AI)',
    pertemuan: 19,
    fase: 'Fase E (Kelas X SMK)',
    title: 'Kecerdasan Artifisial, Generative AI, Literasi Kritis, dan Etika Co-Pilot',
    estimatedTimeMinutes: 90,
    difficulty: 'Menengah',
    competencies: [
      'Memahami definisi, sejarah singkat, dan perbedaan antara Artificial Narrow Intelligence (ANI) vs Artificial General Intelligence (AGI)',
      'Memahami konsep dasar Machine Learning dan Deep Learning dalam mengenali pola data',
      'Menganalisis cara kerja Generative AI dan Large Language Models (LLM) berbasis probabilitas token',
      'Mengenal ragam tipe Generative AI (Teks, Citra Visual, Audio Musik, dan Video Sintetis)',
      'Menerapkan AI secara produktif pada sektor Pendidikan, Desain Grafis DKV, Industri Pangan APHP, dan Administrasi Kerja',
      'Menganalisis keterbatasan dan bahaya AI: Halusinasi AI (*Hallucination*), Bias Algoritma, Isu Privasi, dan Hak Cipta Dataset',
      'Menerapkan Prinsip Sikap Kritis 5 Langkah dalam berinteraksi dengan AI sebagai Co-Pilot'
    ],
    objectives: [
      'Siswa mampu menjelaskan cara kerja AI generatif tanpa miskonsepsi bahwa AI memiliki perasaan atau kesadaran manusia',
      'Siswa dapat merumuskan prompt terstruktur (*prompt engineering*) yang efektif untuk membantu riset tugas sekolah',
      'Siswa mampu mengidentifikasi halusinasi data dan bias informasi pada jawaban yang dihasilkan oleh model AI',
      'Siswa mampu menerapkan prinsip etika akademik dengan tidak melakukan copy-paste mentah tugas dari AI',
      'Siswa mampu mendemonstrasikan metode verifikasi 5 langkah (Bertanya → Memeriksa → Membandingkan → Memverifikasi → Bertanggung Jawab)'
    ],
    summary: 'Eksplorasi kecerdasan artifisial: arsitektur Machine Learning & LLM, aplikasi produktif di DKV dan APHP, bahaya halusinasi data & bias algoritma, panduan prompting terstruktur, serta penerapan AI sebagai co-pilot beretika.',
    infographicHighlights: [
      { label: 'Konsep AI & LLM', text: 'Prediksi token probabilistik berdasarkan dataset masif global.', icon: 'BrainCircuit' },
      { label: 'Tipe Generative AI', text: 'Generator teks, visual citra, audio suara, dan video sintetik.', icon: 'Sparkles' },
      { label: 'Halusinasi AI', text: 'Kecenderungan AI mengarang fakta fiktif dengan nada meyakinkan.', icon: 'AlertTriangle' },
      { label: 'Metode 5 Langkah', text: 'Bertanya → Cek Logika → Bandingkan → Validasi → Tanggung Jawab.', icon: 'CheckSquare' }
    ],
    pertanyaanPemantik: [
      'Apakah chatbot kecerdasan buatan seperti ChatGPT atau Gemini benar-benar bisa berpikir dan memiliki kesadaran seperti otak manusia?',
      'Mengapa saat ditanya tentang tokoh fiktif atau rumus yang tidak ada, AI sering memberikan jawaban yang sangat panjang dan percaya diri padahal 100% karangan palsu?',
      'Bagaimana cara siswa SMK memanfaatkan AI sebagai asisten cerdas (*co-pilot*) tanpa kehilangan kemampuan berpikir kritis dan orisinalitas berkarya?'
    ],
    pendahuluan: `Kecerdasan Artifisial (*Artificial Intelligence* / AI) telah menjadi salah satu inovasi teknologi paling revolusioner dalam sejarah peradaban manusia. Dalam beberapa detik, model AI modern dapat menulis esai ilmiah, menggambar ilustrasi fotorealistik dari deskripsi teks, mengaransemen musik latar, hingga menganalisis baris-baris kode pemrograman.

Namun, di tengah kemudahan luar biasa ini, muncul tantangan etika dan kognitif yang besar: banyak siswa menjadi malas berpikir kritis, menyalin mentah jawaban tanpa memahami isinya, atau mempercayai informasi palsu hasil **Halusinasi AI (*AI Hallucination*)**.

Penting untuk dipahami bahwa **AI bukanlah pengganti nalar manusia**. AI adalah perkakas pengungkit produktivitas (*co-pilot*). Sebagai siswa SMK di era modern, kamu harus menguasai bagaimana cara kerja AI, bagaimana memanfaatkannya secara etis, dan bagaimana memverifikasi setiap keluarannya dengan nalar kritis yang tajam.`,
    konsepInti: `1. **Definisi AI**: Kemampuan sistem komputasi meniru fungsi kognitif manusia (mengenali pola, memproses bahasa, mengambil keputusan).
2. **Narrow AI vs General AI**: Narrow AI (fokus pada 1 tugas spesifik seperti translasi atau deteksi wajah) vs AGI (kecerdasan setara manusia di segala bidang - belum terwujud).
3. **Machine Learning & LLM**: Komputer dilatih (*trained*) menggunakan miliaran token data teks untuk memprediksi kata berikutnya (*next token prediction*) berdasarkan probabilitas statistik.
4. **Bahaya Kunci**: Halusinasi data (mengarang fakta), Bias data latih, Kebocoran privasi rahasia, dan Pelanggaran hak cipta seniman.
5. **Metode Kritis 5 Langkah**: Bertanya (Prompt Terstruktur) → Memeriksa (Kelogisan) → Membandingkan (Cross-Check) → Memverifikasi (Validasi Sumber Primer) → Menggunakan Secara Bertanggung Jawab.`,
    contentMarkdown: `# BAB 10 — Kecerdasan Artifisial (AI)

## 1. Pengertian dan Tingkatan Kecerdasan Artifisial

**Kecerdasan Artifisial (Artificial Intelligence / AI)** adalah bidang ilmu komputer yang berfokus pada penciptaan sistem cerdas yang mampu melakukan tugas-tugas yang biasanya membutuhkan kecerdasan kognitif manusia.

\`\`\`text
+-------------------------------------------------------------------------------+
|                         HIERARKI TEKNOLOGI KECERDASAN ARTIFISIAL               |
+-------------------------------------------------------------------------------+
|                                                                               |
|   [ ARTIFICIAL INTELLIGENCE (AI) ]                                            |
|   (Konsep payung luas menciptakan mesin cerdas)                               |
|          │                                                                    |
|          ▼                                                                    |
|   [ MACHINE LEARNING (ML) ]                                                   |
|   (Sistem belajar dari pola data tanpa diprogram aturan kaku satu per satu)   |
|          │                                                                    |
|          ▼                                                                    |
|   [ DEEP LEARNING (DL) ]                                                      |
|   (Jaringan saraf tiruan / Neural Networks berlapis-lapis multi-layer)        |
|          │                                                                    |
|          ▼                                                                    |
|   [ GENERATIVE AI & LARGE LANGUAGE MODELS (LLM) ]                             |
|   (AI yang mampu MENGHASILKAN konten baru: Teks, Citra, Audio, Video)         |
|                                                                               |
+-------------------------------------------------------------------------------+
\`\`\`

### Dua Kategori Utama AI:
1. **Artificial Narrow Intelligence (ANI / Weak AI)**: AI yang dirancang dan dilatih khusus untuk menjalankan **satu tugas spesifik** dengan sangat unggul (contoh: ChatGPT untuk teks, Midjourney untuk gambar, filter spam email, rekomendasi video TikTok). Seluruh AI yang ada di dunia saat ini adalah kategori ANI.
2. **Artificial General Intelligence (AGI / Strong AI)**: AI hipotesis masa depan yang memiliki kesadaran umum dan kemampuan memecahkan masalah di segala bidang setara atau melebihi manusia.

---

## 2. Cara Kerja Generative AI dan Large Language Models (LLM)

Banyak orang mengira AI Generatif "memahami" arti kata seperti manusia. Secara teknis, LLM (seperti GPT-4 atau Gemini) adalah **mesin probabilitas statistik berbasis token**:

\`\`\`text
Kalimat Masukan : "Ibu guru sedang mengajar mata pelajaran..."
Prediksi LLM    :
  • "Informatika" (Probabilitas: 48%)  <-- Dipilih
  • "Matematika"  (Probabilitas: 32%)
  • "Sejarah"      (Probabilitas: 15%)
  • "Pesawat"     (Probabilitas: 0.01%)
\`\`\`

LLM dilatih (*training phase*) membaca triliunan kata dari buku, artikel web, ensiklopedia, dan forum publik untuk mempelajari keterkaitan matematis antar kata.

---

## 3. Ekosistem Tipe Generative AI

\`\`\`text
+-------------------+----------------------------+------------------------------+
| TIPE GENERATIVE   | CONTOH PLATFORM POPULER    | APLIKASI DI DUNIA KERJA      |
+-------------------+----------------------------+------------------------------+
| Generator Teks    | ChatGPT, Gemini, Claude    | Draf email, perangkum artikel|
| (Text-to-Text)    |                            | pembuatan ide modul, coding  |
+-------------------+----------------------------+------------------------------+
| Generator Citra   | Midjourney, DALL-E, Stable | Moodboard desain DKV, mockup |
| (Text-to-Image)   | Diffusion, Adobe Firefly   | tekstur kemasan, ilustrasi   |
+-------------------+----------------------------+------------------------------+
| Generator Audio   | Suno, Udio, ElevenLabs     | Voice-over narasi video, efek|
| (Text-to-Audio)   |                            | musik latar bebas royalti    |
+-------------------+----------------------------+------------------------------+
| Generator Video   | Sora, Runway Gen-2, Pika   | Video storyboard, animasi 3D |
+-------------------+----------------------------+------------------------------+
\`\`\`

---

## 4. Keterbatasan Kritis dan Bahaya Penggunaan AI

### A. Halusinasi AI (*AI Hallucination*)
Kondisi di mana model AI menghasilkan jawaban yang **sepenuhnya salah, fiktif, atau mengarang fakta**, namun disajikan dengan gaya bahasa yang sangat meyakinkan, formal, dan percaya diri.
* **Penyebab**: AI tidak memiliki pemahaman kebenaran empiris dunia nyata; AI hanya menyusun kata berdasarkan probabilitas kelancaran kalimat.

### B. Bias Algoritma (*Algorithmic Bias*)
Jika data internet yang digunakan untuk melatih AI mengandung stereotip gender, diskriminasi ras, atau ketimpangan budaya, maka keluaran AI juga akan mencerminkan bias diskriminatif tersebut.

### C. Keamanan Data & Privasi
Memasukkan rahasia perusahaan, resep rahasia industri APHP, atau data pribadi ke prompt AI publik dapat menyebabkan data tersebut tersimpan di server cloud penyedia AI dan berisiko bocor ke publik.

---

## 5. Prinsip 5 Langkah Menggunakan AI Secara Kritis & Bertanggung Jawab

\`\`\`text
+-------------------------------------------------------------------------------+
|                   PANDUAN 5 LANGKAH SIKAP KRITIS PENGGUNAAN AI                |
+-------------------------------------------------------------------------------+
|                                                                               |
|   1. BERTANYA (PROMPTING TERSTRUKTUR)                                         |
|      Beri peran, konteks tugas, batasan format, dan instruksi jelas.          |
|                       │                                                       |
|                       ▼                                                       |
|   2. MEMERIKSA (CEK KELOGISAN)                                                |
|      Baca seksama setiap kalimat; apakah argumennya masuk akal?               |
|                       │                                                       |
|                       ▼                                                       |
|   3. MEMBANDINGKAN (CROSS-CHECK)                                              |
|      Bandingkan hasil dari 2 platform AI berbeda (misal Gemini vs Claude).    |
|                       │                                                       |
|                       ▼                                                       |
|   4. MEMVERIFIKASI (VALIDASI SUMBER ASLI)                                     |
|      Cek langsung ke buku teks resmi, jurnal ilmiah, atau situs pemerintah.   |
|                       │                                                       |
|                       ▼                                                       |
|   5. MENGGUNAKAN SECARA BERTANGGUNG JAWAB                                     |
|      Jujur mencantumkan transparansi penggunaan AI dan jadikan sebagai CO-PILOT|
|                                                                               |
+-------------------------------------------------------------------------------+
\`\`\`

### Rumus Prompt Engineering yang Baik:
\`[PERAN] + [KONTEKS] + [TUGAS SPESIFIK] + [BATASAN FORMAT]\`
* **Contoh Buruk**: *"Buatkan tugas DKV."*
* **Contoh Baik**: *"Bertindaklah sebagai Konsultan Branding Senior. Berikan 3 konsep nama merek dan palet warna untuk produk olahan selai stroberi lokal SMK di pedesaan. Sajikan dalam format tabel dengan penjelasan filosofi masing-masing."*`,
    contohPenerapan: `1. **Pemanfaatan di Desain DKV**: Siswa DKV menggunakan Adobe Firefly / Midjourney untuk membuat *moodboard* eksplorasi gaya visual konsep kemasan produk sebelum mulai menggambar manual di Illustrator.
2. **Pemanfaatan di Agroindustri APHP**: Siswa APHP menggunakan prompt Gemini untuk menganalisis data kandungan gizi buah lokal dan merumuskan draf teks tabel Informasi Nilai Gizi produk pangan olahan.`,
    studiKasus: `**Studi Kasus: Skripsi Palsu Akibat Halusinasi AI**

Seorang mahasiswa menyalin seluruh bab tinjauan pustaka langsung dari chatbot AI tanpa membaca ulang. Di dalam teks tersebut, AI mengutip 5 nama jurnal ilmiah internasional lengkap dengan nama pengarang dan tahun terbit.
Ketika dosen penguji memeriksa ke perpustakaan digital, ternyata kelima jurnal tersebut **tidak pernah ada di dunia nyata** (fiktif buatan halusinasi AI). Mahasiswa tersebut dinyatakan gagal sidang dan wajib mengulang dari awal.

**Analisis**:
Mengapa halusinasi tersebut bisa terjadi, dan langkah verifikasi apa yang seharusnya dilakukan sebelum dokumen dikumpulkan?`,
    aktivitasSiswa: `**Praktik Lab AI: AI Prompting & Fact-Checking Experiment**
1. Buka layanan AI (Google Gemini atau ChatGPT).
2. Ujilah AI dengan 2 perintah prompt:
   - Prompt A (Prompt umum/biasa): *"Jelaskan tentang proses fermentasi yogurt."*
   - Prompt B (Prompt terstruktur peran & format): *"Sebagai ahli mikrobiologi pangan APHP, jelaskan tahap fermentasi yogurt dari suhu inkubasi hingga pengujian pH dalam format tabel 4 kolom."*
3. Bandingkan kualitas kedua jawaban tersebut.
4. Lakukan verifikasi 1 fakta dari jawaban AI ke buku pelajaran biologi/kimia untuk membuktikan tidak ada halusinasi data!`,
    tipsPraktis: [
      'Gunakan AI sebagai "teman diskusi brainstorming" untuk memicu ide awal, bukan sebagai "joki pembuat tugas akhir".',
      'Selalu minta AI menyertakan alasan atau langkah logika di balik rekomendasinya (*Chain-of-Thought*).',
      'Jangan pernah memasukkan nomor KTP, kata sandi, atau data medis rahasia ke kolom prompt AI publik.'
    ],
    kesalahanUmum: [
      'Menganggap semua informasi yang diketik oleh AI adalah 100% fakta mutlak yang tidak perlu diperiksa lagi.',
      'Melakukan copy-paste mentah tugas dari AI ke Google Classroom tanpa memahami maknanya (plagiarisme AI).',
      'Memberikan prompt yang terlalu singkat dan ambigu sehingga menghasilkan jawaban yang tidak relevan.'
    ],
    rangkuman: `• AI adalah teknologi komputer yang meniru fungsi kognitif manusia, bertumpu pada Machine Learning dan Deep Learning.
• Generative AI (LLM) bekerja dengan memprediksi token kata berikutnya berdasarkan probabilitas matematis dari data latih masif.
• Tipe Generative AI meliputi penghasil teks, gambar, audio musik, dan video sintetis.
• Keterbatasan fatal AI adalah Halusinasi data (mengarang fakta) dan Bias algoritma.
• Terapkan Sikap Kritis 5 Langkah: Bertanya → Memeriksa → Membandingkan → Memverifikasi → Bertanggung Jawab.
• Posisi AI adalah Co-Pilot (alat bantu produktivitas), bukan pengganti nalar manusia.`,
    refleksi: [
      'Apakah kamu pernah menemukan jawaban dari AI yang ternyata salah atau tidak masuk akal?',
      'Bagaimana kamu memastikan bahwa penggunaan AI dalam belajarmu tidak menurunkan daya berpikir kritis dan kreativitasmu sendiri?'
    ],
    latihanPemahaman: [
      '1. Jelaskan perbedaan mendasar antara Artificial Narrow Intelligence (ANI) dan Artificial General Intelligence (AGI)!',
      '2. Bagaimana mekanisme dasar Large Language Models (LLM) dalam menghasilkan kalimat baru?',
      '3. Apa yang dimaksud dengan Halusinasi AI (*AI Hallucination*) dan mengapa hal tersebut bisa terjadi?',
      '4. Uraikan 5 langkah sikap kritis yang wajib dilakukan saat menggunakan AI untuk keperluan akademis!'
    ],
    tugasPraktik: `**Tugas Eksperimen: Evaluasi Output AI dan Verifikasi Fakta**
Buatlah dokumen laporan praktikum (2 halaman PDF) yang memuat:
1. Tangkapan layar prompt terstruktur yang kamu ajukan ke Google Gemini / ChatGPT terkait materi kejuruanmu (DKV atau APHP).
2. Analisis kritis terhadap jawaban AI: tandai bagian mana yang akurat dan bagian mana yang berpotensi bias atau halusinasi.
3. Bukti verifikasi 2 fakta ke sumber buku/jurnal primer terpercaya.
Simpan dalam format PDF (\`DSI3_NAMA_KELAS.pdf\`) dan kumpulkan ke portal LMS!`,
    asesmen: [
      {
        question: 'Kondisi di mana model kecerdasan artifisial menghasilkan informasi yang sepenuhnya salah atau fiktif dengan nada yang sangat percaya diri disebut...',
        options: ['AI Hallucination (Halusinasi AI)', 'Overclocking Hardware', 'Data Redundancy', 'Deepfake Security'],
        answerIndex: 0,
        explanation: 'Halusinasi AI adalah fenomena di mana model LLM mengarang fakta palsu akibat proses probabilitas token tanpa pemahaman dunia nyata.'
      },
      {
        question: 'Kategori kecerdasan buatan yang ada saat ini dan hanya mampu menjalankan satu tugas spesifik (seperti pengenalan wajah atau penulisan teks) disebut...',
        options: ['Artificial Narrow Intelligence (ANI)', 'Artificial General Intelligence (AGI)', 'Artificial Super Intelligence (ASI)', 'Quantum Intelligence'],
        answerIndex: 0,
        explanation: 'ANI (Narrow AI) adalah jenis AI yang fokus unggul pada satu domain tugas tertentu.'
      },
      {
        question: 'Mekanisme komputasi dasar di balik cara kerja Large Language Models (LLM) seperti ChatGPT atau Gemini adalah...',
        options: [
          'Memprediksi token kata berikutnya berdasarkan probabilitas statistik dari dataset data latih',
          'Memiliki perasaan dan kesadaran batin seperti manusia',
          'Menghafal seluruh buku perpustakaan kata per kata tanpa rumus',
          'Mengirimkan sinyal gelombang telepati ke pikiran manusia'
        ],
        answerIndex: 0,
        explanation: 'LLM adalah model probabilistik yang menghitung peluang kemunculan kata berikutnya berdasarkan dataset masif.'
      },
      {
        question: 'Struktur formula prompt engineering terstruktur yang baik memuat elemen...',
        options: [
          'Peran (Role) + Konteks + Tugas Spesifik + Batasan Format',
          'Satu kata perintah singkat tanpa penjelasan',
          'Mengetik kata tolong berkali-kali tanpa rincian',
          'Mengunggah seluruh buku tanpa pertanyaan'
        ],
        answerIndex: 0,
        explanation: 'Prompt yang efektif memberikan persona peran, konteks situasi, instruksi spesifik, dan batasan format keluaran.'
      },
      {
        question: 'Prinsip yang benar mengenai peran AI dalam pembelajaran siswa SMK adalah...',
        options: [
          'AI bertindak sebagai Co-Pilot (alat bantu pengungkit produktivitas), nalar utama tetap pada manusia',
          'AI menggantikan seluruh tugas berpikir sehingga siswa tidak perlu belajar lagi',
          'AI dilarang digunakan dalam semua kondisi kehidupan',
          'Keluaran AI adalah kebenaran mutlak yang tidak boleh diuji'
        ],
        answerIndex: 0,
        explanation: 'AI adalah co-pilot pembantu produktivitas; verifikasi dan pengambilan keputusan tetap berada di kendali akal sehat manusia.'
      },
      {
        question: 'Tingkatan kecerdasan buatan hipotetis di masa depan yang mampu menyamai segala kemampuan intelektual manusia di berbagai bidang disebut...',
        options: ['Artificial General Intelligence (AGI)', 'Artificial Narrow Intelligence (ANI)', 'Expert System 1980', 'Optical Character Recognition'],
        answerIndex: 0,
        explanation: 'AGI adalah kecerdasan buatan umum setingkat manusia yang masih dalam tahap riset teoretis.'
      },
      {
        question: 'Istilah "Token" dalam pemrosesan bahasa alami oleh model AI (LLM) merujuk pada...',
        options: [
          'Potongan karakter, suku kata, atau kata tunggal yang menjadi unit dasar pembacaan teks oleh model AI',
          'Koin fisik untuk menyalakan komputer',
          'Kata sandi login wifi lab sekolah',
          'Voucher diskon belanja di marketplace'
        ],
        answerIndex: 0,
        explanation: 'Model LLM memecah teks masukan menjadi token-token numerik sebelum diproses oleh lapisan jaringan saraf.'
      },
      {
        question: 'Teknik memberikan beberapa contoh pasangan masukan-keluaran (*input-output*) di dalam prompt agar AI meniru gaya format yang diinginkan disebut...',
        options: ['Few-Shot Prompting', 'Zero-Shot Prompting', 'System Cracking', 'Brute Force'],
        answerIndex: 0,
        explanation: 'Few-shot prompting memandu model menghasilkan respons yang sangat konsisten dengan menyajikan 2-3 contoh terlebih dahulu.'
      },
      {
        question: 'Teknologi manipulasi video dan suara berbasis kecerdasan artifisial yang mampu mengganti wajah atau menirukan suara tokoh publik secara meyakinkan disebut...',
        options: ['Deepfake', 'Data Mining', 'Smart Contract', 'Firewall'],
        answerIndex: 0,
        explanation: 'Deepfake memanfaatkan generative adversarial networks (GAN) dan dapat disalahgunakan untuk penyebaran disinformasi/hoaks.'
      },
      {
        question: 'Kondisi di mana model AI menghasilkan keputusan yang tidak adil atau diskriminatif terhadap kelompok tertentu akibat ketimpangan data latih disebut...',
        options: ['Algorithmic Bias (Bias Algoritma)', 'Halusinasi Data', 'Syntax Error', 'Deadlock System'],
        answerIndex: 0,
        explanation: 'Bias terjadi jika data latih AI merefleksikan prasangka manusia atau kurangnya keterwakilan kelompok minoritas.'
      },
      {
        question: 'Isu hukum dan etika paling krusial dalam pemanfaatan model AI Text-to-Image (seperti Midjourney atau Stable Diffusion) adalah...',
        options: [
          'Penggunaan jutaan karya seni visual dan foto seniman tanpa izin (*consent*) dan kompensasi royalti sebagai data latih model',
          'Warna gambar yang terlalu cerah',
          'Format file gambar yang tidak bisa dibuka di smartphone',
          'Resolusi piksel yang terlalu tinggi'
        ],
        answerIndex: 0,
        explanation: 'Pelatihan model AI pada karya berhak cipta tanpa lisensi memicu perdebatan sengit mengenai hak kekayaan intelektual (HAKI) seniman.'
      },
      {
        question: 'Dalam industri Pengolahan Hasil Pertanian (APHP), implementasi nyata teknologi Computer Vision bertenaga AI adalah...',
        options: [
          'Sistem sortir dan grading otomatis kematangan buah serta deteksi cacat fisik pada konveyor berjalan dengan kamera berkecepatan tinggi',
          'Menggoreng keripik secara manual dengan wajan',
          'Mencetak kemasan dengan sablon manual',
          'Menyiram tanaman dengan ember secara manual'
        ],
        answerIndex: 0,
        explanation: 'Computer vision mengklasifikasikan kualitas mutu pangan secara cepat dan konsisten di lini industri.'
      },
      {
        question: 'Dalam industri Desain Komunikasi Visual (DKV), fitur Generative Fill (Inpainting) pada software desain grafis berfungsi untuk...',
        options: [
          'Menghapus, mengganti, atau menambahkan objek baru secara mulus ke dalam foto berdasarkan deskripsi teks instruksi',
          'Menghapus seluruh file komputer secara permanen',
          'Memformat ulang harddisk laptop',
          'Menutup aplikasi secara paksa'
        ],
        answerIndex: 0,
        explanation: 'Inpainting memanfaatkan AI generatif untuk memanipulasi area seleksi piksel gambar secara fotorealistik.'
      },
      {
        question: 'Tindakan menyalin mentah-mentah (*copy-paste*) esai dari chatbot AI tanpa membaca, memvalidasi, dan mencantumkan sitasi sebagai karya pribadi dalam tugas sekolah tergolong sebagai...',
        options: [
          'Pelanggaran integritas akademik (Plagiarisme AI / Academic Dishonesty)',
          'Prestasi literasi digital luar biasa',
          'Kecerdasan emosional tinggi',
          'Keterampilan kepemimpinan industri'
        ],
        answerIndex: 0,
        explanation: 'Klaim karya AI sebagai karya asli pribadi tanpa atribusi melanggar etika kejujuran akademik.'
      },
      {
        question: 'Metode Sikap Kritis 5 Langkah dalam berinteraksi dengan AI meliputi tahapan...',
        options: [
          'Bertanya (Prompt Terstruktur) → Periksa Logika → Bandingkan Output → Validasi Sumber Primer → Tanggung Jawab',
          'Buka Chatbot → Copy Semua Teks → Paste ke Word → Kirim ke Guru → Tidur',
          'Mempercayai semua hasil AI tanpa membaca sepatah kata pun',
          'Menolak menggunakan komputer seumur hidup'
        ],
        answerIndex: 0,
        explanation: 'Metode 5 langkah memastikan siswa mempertahankan nalar kritis dan memverifikasi akurasi keluaran AI.'
      },
      {
        question: 'Risiko keamanan informasi yang terjadi jika seorang karyawan mengunggah data rahasia perusahaan atau kode program internal ke layanan AI publik gratisan adalah...',
        options: [
          'Data rahasia tersebut dapat tersimpan di server pihak ketiga dan berpotensi bocor atau digunakan sebagai data latih model berikutnya',
          'Layar laptop akan otomatis retak',
          'Listrik kantor akan langsung padam',
          'File langsung terkirim ke seluruh televisi nasional'
        ],
        answerIndex: 0,
        explanation: 'Kebijakan privasi LLM publik umumnya memanfaatkan percakapan pengguna untuk pelatihan model lebih lanjut.'
      },
      {
        question: 'Model Generative AI yang dirancang khusus untuk memahami dan menghasilkan baris-baris kode program komputer contohnya adalah...',
        options: ['GitHub Copilot / Codex', 'Midjourney', 'Suno AI', 'ElevenLabs'],
        answerIndex: 0,
        explanation: 'GitHub Copilot adalah asisten pemrograman cerdas yang membantu programmer melengkapi kode sintaks secara efisien.'
      },
      {
        question: 'Istilah "Zero-Shot Prompting" dalam interaksi AI mengacu pada...',
        options: [
          'Memberikan instruksi langsung kepada model AI tanpa menyertakan contoh masukan-keluaran sebelumnya',
          'Menyalakan komputer tanpa listrik',
          'Mengirim email kosong',
          'Menghapus seluruh akun media sosial'
        ],
        answerIndex: 0,
        explanation: 'Zero-shot prompting menguji kemampuan alami model memahami instruksi langsung tanpa contoh panduan.'
      },
      {
        question: 'Tantangan kognitif utama jika siswa terlalu bergantung 100% pada AI dalam menyelesaikan setiap soal pelajaran adalah...',
        options: [
          'Atrofi kognitif (menurunnya daya nalar, daya ingat kritis, dan kemampuan pemecahan masalah mandiri)',
          'Penglihatan menjadi memiliki resolusi 4K',
          'Kecepatan berjalan kaki meningkat',
          'Jari tangan berubah menjadi logam'
        ],
        answerIndex: 0,
        explanation: 'Otak manusia membutuhkan latihan berpikir aktif; ketergantungan pasif pada AI melemahkan kapasitas kognitif analitis.'
      },
      {
        question: 'Konsep "Human-in-the-loop" (HITL) dalam penerapan sistem AI industri menjamin bahwa...',
        options: [
          'Manusia tetap memegang peran pengendali akhir untuk memvalidasi, mengoreksi, dan bertanggung jawab atas keputusan kritis yang dihasilkan AI',
          'Komputer dapat beroperasi tanpa pengawasan manusia selamanya',
          'Manusia dilarang menyentuh papan ketik komputer',
          'Robot mengambil alih seluruh kekuasaan pemerintahan'
        ],
        answerIndex: 0,
        explanation: 'HITL memastikan akuntabilitas etika dan hukum tetap berada di bawah kendali pertimbangan moral manusia.'
      },
      {
        question: 'Model AI generatif yang mampu memproses berbagai macam jenis modalitas data (teks, gambar, audio, dan video) secara bersamaan disebut model...',
        options: ['Multimodal AI', 'Unimodal AI', 'Binary AI', 'Monochrome Model'],
        answerIndex: 0,
        explanation: 'Multimodal AI (seperti Gemini 1.5 Pro) mampu memahami input teks, gambar, video, dan audio dalam satu konteks terpadu.'
      },
      {
        question: 'Apa langkah paling tepat yang harus dilakukan jika kamu menemukan jawaban chatbot AI yang menyebutkan rumus ilmiah aneh yang belum pernah ada di buku pelajaran?',
        options: [
          'Menguji silang (*cross-check*) rumus tersebut ke buku referensi resmi terbitan universitas/kementerian atau jurnal ilmiah terakreditasi',
          'Langsung mempercayainya dan menyebarkannya ke grup kelas',
          'Menghafal rumus palsu tersebut untuk ujian',
          'Menyalahkan guru yang belum mengajarkan rumus baru itu'
        ],
        answerIndex: 0,
        explanation: 'Prinsip verifikasi ilmiah mewajibkan validasi ke sumber primer berwewenang untuk menyaring halusinasi AI.'
      },
      {
        question: 'Fitur "System Prompt / Custom Instructions" pada aplikasi chatbot AI berguna untuk...',
        options: [
          'Menetapkan kepribadian, gaya bahasa, konteks latar belakang, dan aturan baku yang harus dipatuhi AI di setiap percakapan',
          'Mengganti kartu memori RAM smartphone',
          'Mengubah frekuensi gelombang radio microwave',
          'Membuat kipas laptop berputar lebih cepat'
        ],
        answerIndex: 0,
        explanation: 'System instructions menetapkan batasan perilaku persisten bagi model AI dalam berinteraksi.'
      },
      {
        question: 'Manfaat paling tepat dari penggunaan Generative AI bagi siswa SMK jurusan DKV adalah...',
        options: [
          'Membantu eksplorasi ide konsep awal, menyusun narasi copywriting, dan membuat moodboard referensi visual secara cepat',
          'Menggantikan seluruh proses belajar menggambar manual',
          'Menjual karya seni orang lain tanpa izin',
          'Menghindari tugas sekolah selamanya'
        ],
        answerIndex: 0,
        explanation: 'AI berfungsi sebagai asisten kreatif pengungkit ide, sementara eksekusi teknis dan orisinalitas tetap menjadi keahlian desainer.'
      },
      {
        question: 'Sikap etis yang harus dipegang teguh oleh seluruh generasi muda Indonesia dalam menyambut era Artificial Intelligence adalah...',
        options: [
          'Menjadi pengguna cerdas yang beretika, kritis terhadap kebenaran informasi, menghormati hak cipta orang lain, dan terus meningkatkan kompetensi diri',
          'Menolak perkembangan teknologi secara total',
          'Memanfaatkan AI untuk menyebarkan hoaks dan penipuan siber',
          'Berhenti belajar karena semua sudah bisa dikerjakan robot'
        ],
        answerIndex: 0,
        explanation: 'Penguasaan etika, kecerdasan kritis, dan integritas moral adalah kunci menjadi pemenang di era transformasi AI.'
      }
    ],
    asesmenUraian: [
      'Jelaskan mengapa ketergantungan berlebihan pada AI dalam mengerjakan tugas dapat membahayakan kemampuan problem solving siswa SMK!',
      'Uraikan analisis Anda mengenai isu hak cipta dataset gambar karya seniman yang digunakan untuk melatih model Text-to-Image AI!'
    ],
    rubrikPenilaian: [
      {
        kriteria: 'Pemahaman Konsep AI & LLM',
        skor4: 'Mampu menjelaskan cara kerja LLM, ANI vs AGI, dan halusinasi data secara ilmiah dan bebas mitos.',
        skor3: 'Menjelaskan konsep AI dengan baik namun ada sedikit analogi yang kurang presisi.',
        skor2: 'Masih menganggap AI memiliki kesadaran berpikir manusia.',
        skor1: 'Tidak memahami konsep dasar AI.'
      },
      {
        kriteria: 'Literasi Kritis & Verifikasi',
        skor4: 'Menerapkan metode 5 langkah secara utuh, membuktikan halusinasi fakta, dan menyertakan rujukan validasi primer.',
        skor3: 'Mampu membuat prompt baik namun verifikasi sumber sekunder kurang lengkap.',
        skor2: 'Hanya menyalin output AI tanpa evaluasi kritis.',
        skor1: 'Melakukan plagiarisme output AI.'
      }
    ],
    glosarium: [
      { term: 'Artificial Intelligence (AI)', definition: 'Disiplin ilmu komputasi yang menciptakan sistem untuk meniru kemampuan kognitif cerdas manusia.' },
      { term: 'Large Language Model (LLM)', definition: 'Model Deep Learning berparameter masif yang dilatih untuk memahami dan menghasilkan bahasa alami.' },
      { term: 'AI Hallucination', definition: 'Keluaran salah atau fiktif yang dihasilkan AI namun disajikan seolah-olah sebagai fakta nyata.' },
      { term: 'Prompt Engineering', definition: 'Seni dan teknik merumuskan instruksi terstruktur untuk memandu model AI menghasilkan keluaran yang optimal.' },
      { term: 'Co-Pilot', definition: 'Metafora penggunaan AI sebagai asisten pendamping yang membantu eksekusi, sementara kendali arah dan keputusan tetap di tangan manusia.' }
    ],
    sumberReferensi: [
      'Russell, S., & Norvig, P. (2020). Artificial Intelligence: A Modern Approach (4th ed.). Pearson.',
      'UNESCO (2023). Guidance for Generative AI in Education and Research.',
      'Kemendikbudristek (2024). Panduan Etika Pemanfaatan Kecerdasan Artifisial dalam Pembelajaran.',
      'OpenAI & Google DeepMind (2024). Safety and Ethical Guidelines for Frontier AI Systems.'
    ]
  }
];
