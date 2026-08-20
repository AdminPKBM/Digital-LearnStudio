import { ModuleData } from '../../types';

export const jkiModules: ModuleData[] = [
  // =========================================================================
  // BAB 5: JARINGAN KOMPUTER DAN INTERNET
  // =========================================================================
  {
    id: 'JKI-1',
    elementId: 'JKI',
    elementName: 'Jaringan Komputer dan Internet',
    moduleNumber: 1,
    bab: 'BAB 5 — Jaringan Komputer dan Internet',
    pertemuan: 9,
    fase: 'Fase E (Kelas X SMK)',
    title: 'Arsitektur Jaringan, Pengalamatan IP, Layanan Web, dan Keamanan Konektivitas',
    estimatedTimeMinutes: 90,
    difficulty: 'Menengah',
    competencies: [
      'Memahami konsep dasar, manfaat, dan klasifikasi jangkauan jaringan komputer (LAN, MAN, WAN, Internet, Intranet)',
      'Menganalisis karakteristik media transmisi kabel (UTP Cat6, Fiber Optic) dan nirkabel (Wi-Fi 2.4/5/6 GHz)',
      'Mengidentifikasi peran perangkat keras jaringan (Router, Switch, Access Point, Modem, Server, NIC)',
      'Memahami mekanisme pengalamatan IP (IPv4 32-bit vs IPv6 128-bit, Subnet Mask, Default Gateway, IP Public vs Private)',
      'Menjelaskan cara kerja Domain Name System (DNS) dan protokol web terenkripsi (HTTP vs HTTPS SSL/TLS)',
      'Menganalisis parameter performa jaringan (Bandwidth, Throughput, Latency/Ping, Packet Loss)',
      'Mempraktikkan perintah diagnostik jaringan (ping, traceroute, ipconfig) dan troubleshooting konektivitas'
    ],
    objectives: [
      'Siswa mampu membedakan jenis jaringan berdasarkan cakupan geografis dan topologi fisiknya',
      'Siswa dapat menjelaskan fungsi router, switch, dan access point dalam infrastruktur jaringan sekolah/industri',
      'Siswa mampu membaca dan mengonfigurasi alamat IPv4 statis dan dinamis (DHCP) pada perangkat komputer',
      'Siswa dapat menguraikan alur resolusi DNS saat mengakses alamat website di browser',
      'Siswa mampu melakukan pengujian koneksi jaringan menggunakan utilitas command line (`ipconfig`, `ping`, `tracert`) dan mengatasi masalah koneksi terputus'
    ],
    summary: 'Fondasi jaringan komputer dan internet: media transmisi kabel & wireless, perangkat perutean, pengalamatan IPv4/IPv6, mekanisme DNS & HTTPS, metrik kualitas jaringan, serta panduan praktis diagnosa perintah ping dan ipconfig.',
    infographicHighlights: [
      { label: 'Klasifikasi Jaringan', text: 'LAN (Lokal), MAN (Kota), WAN (Negara), dan Internet (Global).', icon: 'Network' },
      { label: 'Media & Perangkat', text: 'UTP Cat6, Fiber Optic, Wi-Fi 6, Router, dan Managed Switch.', icon: 'Wifi' },
      { label: 'Pengalamatan IP & DNS', text: 'IPv4 32-bit, Subnetting, Gateway, dan Resolusi Nama Domain.', icon: 'Globe' },
      { label: 'Diagnostik CLI', text: 'Perintah ipconfig, ping test, traceroute, dan keamanan WPA3.', icon: 'Terminal' }
    ],
    pertanyaanPemantik: [
      'Ketika kamu mengetik \`google.com\` di browsermu, bagaimana laptopmu bisa tahu server mana di belahan bumi lain yang harus dihubungi dalam 0,1 detik?',
      'Mengapa Wi-Fi di rumah terasa sangat cepat saat dipakai sendirian, tetapi langsung lambat dan patah-patah ketika seluruh anggota keluarga menonton video streaming bersamaan?',
      'Apa perbedaan simbol gembok hijau HTTPS di browser dengan HTTP biasa tanpa gembok?'
    ],
    pendahuluan: `Bayangkan jika seluruh komputer, smartphone, dan mesin kasir di dunia ini terisolasi dan tidak bisa saling berbicara satu sama lain. Kita tidak akan pernah memiliki mesin pencari Google, media sosial, video streaming, perbankan online, maupun e-commerce.

**Jaringan Komputer (*Computer Network*)** adalah sekumpulan dua atau lebih perangkat komputasi yang saling terhubung melalui media transmisi (kabel atau gelombang radio nirkabel) untuk saling berbagi sumber daya (*resource sharing*), bertukar data (*data communication*), dan menjalankan aplikasi bersama.

Ketika miliaran jaringan komputer lokal di seluruh dunia saling terhubung menjadi satu kesatuan raksasa, lahirlah **Internet (*Interconnected Network*)**. Di era digital, memahami prinsip kerja jaringan adalah fondasi wajib bagi siswa SMK untuk mengelola sistem data, berkolaborasi di cloud, dan menjaga keamanan siber.`,
    konsepInti: `1. **Klasifikasi Jangkauan**: LAN (Gedung/Sekolah), MAN (Antar-gedung sekota), WAN (Antar-negara/benua), Internet (Jaringan global terbuka), Intranet (Jaringan privat internal).
2. **Media Transmisi**: Kabel UTP/STP Cat5e/Cat6/Cat7, Fiber Optic (kecepatan cahaya), Wi-Fi (2.4 GHz jangkauan luas vs 5 GHz kecepatan tinggi).
3. **Hardware Jaringan**: Router (menghubungkan beda segmen network), Switch (distribusi paket lokal), Access Point (pemancar Wi-Fi), Modem (modulator-demodulator).
4. **Protokol IP & DNS**: IPv4 (4 oktet biner 32-bit), Subnet Mask (\`255.255.255.0\`), IP Private vs Public; DNS menerjemahkan nama domain alfabet menjadi IP angka.
5. **Keamanan & Web**: HTTP (port 80 polos) vs HTTPS (port 443 terenkripsi SSL/TLS), Firewall, dan enkripsi Wi-Fi WPA3.
6. **Utilitas CLI**: \`ipconfig\` (cek IP), \`ping\` (cek latensi & respon), \`tracert\` (lacak rute hop).`,
    contentMarkdown: `# BAB 5 — Jaringan Komputer dan Internet

## 1. Klasifikasi Jaringan Berdasarkan Jangkauan Geografis

\`\`\`text
+-------------------------------------------------------------------------------+
|                       HIERARKI JANGKAUAN JARINGAN KOMPUTER                    |
+-------------------------------------------------------------------------------+
|                                                                               |
|   [ LAN: Local Area Network ]           --> Ruang Lab / 1 Gedung Sekolah      |
|              │                                                                |
|              ▼                                                                |
|   [ MAN: Metropolitan Area Network ]    --> Antar Kampus / 1 Wilayah Kota     |
|              │                                                                |
|              ▼                                                                |
|   [ WAN: Wide Area Network ]            --> Antar Provinsi / Seluruh Negara   |
|              │                                                                |
|              ▼                                                                |
|   [ INTERNET ]                          --> Jaringan Global Seluruh Dunia     |
|                                                                               |
+-------------------------------------------------------------------------------+
\`\`\`

* **LAN (Local Area Network)**: Jaringan dengan jangkauan terbatas (radius 10m - 1 km) seperti di dalam lab komputer SMKN Bojonggambir.
* **MAN (Metropolitan Area Network)**: Menghubungkan beberapa lokasi kantor dalam satu kota besar.
* **WAN (Wide Area Network)**: Jaringan berkecepatan tinggi yang menghubungkan cabang perusahaan lintas pulau atau negara.
* **Internet vs Intranet**: Internet bersifat publik global; Intranet adalah jaringan privat berotentikasi ketat milik internal sekolah/perusahaan.

---

## 2. Media Transmisi Data: Kabel vs Nirkabel (Wireless)

### A. Media Kabel (*Wired Network*)
1. **Twisted Pair (UTP / STP - Unshielded/Shielded Twisted Pair)**:
   * Menggunakan konektor standar **RJ-45**.
   * Kategori populer: **Cat5e** (100-1000 Mbps), **Cat6** (1 Gbps s.d 10 Gbps pada jarak pendek < 55m). Jarak maksimal transmisi tanpa repeater: 100 meter.
2. **Kabel Serat Optik (*Fiber Optic*)**:
   * Mentransmisikan data dalam bentuk **pulsa cahaya** melalui serat kaca ultra-murni.
   * Keunggulan: Kecepatan gigabit/terabit, jarak puluhan kilometer tanpa degradasi, dan kebal terhadap interferensi gelombang elektromagnetik/petir.

### B. Media Nirkabel (*Wireless Network*)
* **Frekuensi 2.4 GHz**: Sinyal mampu menembus dinding tebal dengan jangkauan lebih jauh, namun kanal frekuensinya padat dan rentan interferensi.
* **Frekuensi 5 GHz**: Kecepatan transfer jauh lebih tinggi dengan latensi rendah, namun jangkauan lebih pendek dan sulit menembus dinding beton.
* **Wi-Fi 6 / 6E (802.11ax)**: Standar nirkabel modern yang mendukung ratusan perangkat sekaligus secara simultan tanpa *buffer*.

---

## 3. Perangkat Keras Jaringan Komputer

\`\`\`text
+-------------------+-----------------------------------------------------------+
| PERANGKAT         | FUNGSI DAN PERAN UTAMA                                    |
+-------------------+-----------------------------------------------------------+
| Network Interface | Kartu jaringan fisik pada PC/Laptop (Ethernet / Wi-Fi card)|
| Card (NIC)        | yang memiliki alamat unik bawaan pabrik: MAC Address.     |
+-------------------+-----------------------------------------------------------+
| Switch            | Menghubungkan banyak komputer dalam 1 segmen LAN lokal dan|
|                   | meneruskan paket data berdasarkan MAC Address tujuan.     |
+-------------------+-----------------------------------------------------------+
| Router            | Menghubungkan dua atau lebih jaringan yang berbeda subnet |
|                   | (misal LAN sekolah ke Internet) berdasarkan IP Address.   |
+-------------------+-----------------------------------------------------------+
| Access Point (AP) | Pemancar gelombang radio untuk koneksi nirkabel (Wi-Fi).  |
+-------------------+-----------------------------------------------------------+
| Modem             | Mengubah sinyal analog penyedia internet (ISP) menjadi    |
|                   | sinyal digital yang dimengerti komputer dan router.       |
+-------------------+-----------------------------------------------------------+
\`\`\`

---

## 4. Pengalamatan IP (IP Address) dan Sistem Nama Domain (DNS)

### A. Format IPv4 (Internet Protocol Version 4)
IPv4 terdiri atas **32-bit** angka biner yang ditulis dalam format 4 blok desimal bertitik (*dotted-decimal*):
\`\`\`text
Contoh IP Komputer Lab: 192.168.1.15
Subnet Mask           : 255.255.255.0  (Menandakan 192.168.1 adalah Network ID)
Default Gateway       : 192.168.1.1   (Alamat IP Router gerbang keluar internet)
\`\`\`

* **IP Private**: Alamat IP yang hanya berlaku di jaringan lokal (misal: \`192.168.x.x\`, \`10.x.x.x\`, \`172.16.x.x\`).
* **IP Public**: Alamat IP global yang diberikan oleh ISP dan dapat diakses dari seluruh dunia.
* **IPv6**: Menggunakan format heksadesimal 128-bit untuk mengatasi keterbatasan jumlah alamat IPv4 yang sudah habis di dunia.

### B. Mekanisme Resolusi Domain Name System (DNS)
Otak manusia lebih mudah mengingat nama teks (\`smknbojonggambir.sch.id\`), sedangkan komputer hanya mengerti angka IP (\`103.247.x.x\`).
**DNS bekerja seperti buku telepon internet**:

\`\`\`text
1. User ketik "google.com" di browser
2. Laptop bertanya ke DNS Server: "Berapa IP Address dari google.com?"
3. DNS Server membalas: "IP google.com adalah 142.250.190.46"
4. Laptop langsung menghubungi server 142.250.190.46 dan halaman web tampil!
\`\`\`

---

## 5. Protokol Web: HTTP vs HTTPS

\`\`\`text
+-------------------+----------------------------+------------------------------+
| PARAMETER         | HTTP (Port 80)             | HTTPS (Port 443)             |
+-------------------+----------------------------+------------------------------+
| Kepanjangan       | Hypertext Transfer Protocol| HTTP Secure (dengan SSL/TLS) |
| Keamanan Data     | Plaintext (Teks Terbuka)   | Enkripsi Kriptografi Kuat    |
| Risiko Sniffing   | Password & data mudah disadap| Data tidak bisa dibaca hacker|
| Indikator Browser | Tanda peringatan "Not Secure"| Simbol Gembok Terkunci       |
+-------------------+----------------------------+------------------------------+
\`\`\`

---

## 6. Parameter Kualitas Jaringan & Perintah Diagnostik CLI

### A. Metrik Kualitas Jaringan:
* **Bandwidth**: Kapasitas maksimal lebar jalur transmisi pipa data (misal: 100 Mbps).
* **Throughput**: Kecepatan data aktual yang benar-benar diterima pada saat tertentu.
* **Latency / Ping**: Waktu yang dibutuhkan paket data untuk pergi ke server dan kembali (diukur dalam milidetik \`ms\`). Makin kecil makin bagus (< 20 ms).
* **Packet Loss**: Persentase data yang hilang di tengah jalan karena gangguan sinyal.

### B. Panduan Perintah Praktik Command Line:
1. **Cek Alamat IP Komputer Sendiri**:
   \`\`\`cmd
   ipconfig /all
   \`\`\`
2. **Uji Koneksi & Latensi ke Server**:
   \`\`\`cmd
   ping 8.8.8.8
   ping smknbojonggambir.sch.id
   \`\`\`
3. **Melacak Rute Perjalanan Paket Data**:
   \`\`\`cmd
   tracert google.com
   \`\`\``,
    contohPenerapan: `1. **Topologi Jaringan Lab DKV**: 30 unit komputer iMac dihubungkan menggunakan kabel UTP Cat6 ke Managed Switch Gigabit agar transfer file video berukuran 50 GB ke server lokal selesai dalam 1 menit.
2. **Sistem Kasir APHP Berbasis Wi-Fi**: Printer struk thermal kasir unit produksi APHP terhubung ke access point lokal sehingga tablet pemesanan kasir bisa langsung mencetak nota penjualan secara nirkabel.`,
    studiKasus: `**Studi Kasus: Internet Lab Komputer Mendadak Putus Massal**

Saat jam pelajaran Informatika berlangsung, seluruh 36 komputer di lab komputer tiba-tiba tidak bisa membuka website dan muncul pesan "DNS_PROBE_FINISHED_NO_INTERNET".

**Langkah Diagnosis Troubleshooting Siswa**:
1. Siswa mengetik \`ipconfig\` di CMD: Ternyata komputer mendapatkan IP \`192.168.1.55\` dengan gateway \`192.168.1.1\` (Koneksi ke switch dan router aman).
2. Siswa mengetik \`ping 192.168.1.1\`: Balasan \`Reply time=1ms\` (Kabel LAN dan router lokal bekerja baik).
3. Siswa mengetik \`ping 8.8.8.8\`: Balasan \`Reply time=18ms\` (Koneksi fisik ke internet luar sebenarnya lancar!).
4. Siswa mengetik \`ping google.com\`: Muncul pesan \`Could not find host google.com\`.

**Kesimpulan Masalah**: Terjadi gangguan pada DNS Server ISP. Solusinya: Ubah konfigurasi DNS komputer menjadi DNS publik Google (\`8.8.8.8\` dan \`8.8.4.4\`), dan seketika seluruh internet lab kembali normal!`,
    aktivitasSiswa: `**Praktik Lab Mandiri: Network Diagnostics Challenge**
1. Buka aplikasi **Command Prompt (CMD)** pada komputermu.
2. Jalankan perintah \`ipconfig\` dan catat alamat IPv4 Address, Subnet Mask, dan Default Gateway komputermu.
3. Lakukan pengujian \`ping\` sebanyak 4 kali ke alamat Default Gateway routermu dan ke DNS publik \`8.8.8.8\`.
4. Jalankan perintah \`tracert smknbojonggambir.sch.id\` dan hitung berapa jumlah lompatan (*hops*) router yang dilalui paket data hingga sampai ke server tujuan!`,
    tipsPraktis: [
      'Jangan pernah memasukkan username, password, atau nomor kartu debit di website yang masih menggunakan protokol HTTP tanpa SSL/TLS.',
      'Gunakan kata sandi Wi-Fi dengan enkripsi standar minimal WPA2-AES atau WPA3-SAE untuk mencegah pembobolan jaringan.',
      'Saat crimping kabel LAN UTP RJ-45, selalu pastikan urutan warna standar T568B: Putih Oranye, Oranye, Putih Hijau, Biru, Putih Biru, Hijau, Putih Cokelat, Cokelat.'
    ],
    kesalahanUmum: [
      'Menyamakan istilah Bandwidth dengan Kecepatan (Bandwidth adalah lebar kapasitas jalan, bukan kecepatan laju mobil).',
      'Menggunakan alamat IP yang sama (duplikat) pada dua komputer dalam satu jaringan lokal sehingga menyebabkan IP Conflict.',
      'Menghubungkan sembarangan kabel LAN dari satu port switch ke port switch lainnya yang sama sehingga menimbulkan *broadcast storm/looping*.'
    ],
    rangkuman: `• Jaringan komputer mengklasifikasikan jangkauan menjadi LAN, MAN, WAN, dan jaringan global Internet.
• Media transmisi meliputi kabel tembaga UTP (maksimal 100m), kabel serat optik (kecepatan cahaya), dan gelombang radio Wi-Fi (2.4GHz & 5GHz).
• Perangkat keras inti meliputi Router (perute antar-jaringan), Switch (distribusi paket lokal), Access Point, dan Modem.
• IPv4 berukuran 32-bit; DNS bertindak sebagai direktori penerjemah nama domain ke alamat IP numerik.
• Protokol HTTPS mengenkripsi seluruh pertukaran data web melalui port 443 demi keamanan privasi.
• Diagnostik jaringan CLI menggunakan perintah ipconfig, ping, dan tracert.`,
    refleksi: [
      'Bagaimana pemahaman tentang jaringan komputer membantumu mengatasi masalah internet di rumah atau di smartphone-mu?',
      'Mengapa keamanan enkripsi HTTPS sangat penting saat bertransaksi perbankan di era digital?'
    ],
    latihanPemahaman: [
      '1. Jelaskan perbedaan mendasar antara jaringan LAN, MAN, dan WAN!',
      '2. Mengapa kabel Fiber Optic lebih unggul daripada kabel UTP tembaga untuk koneksi jarak jauh?',
      '3. Uraikan alur kerja Domain Name System (DNS) secara runtut!',
      '4. Apa yang membedakan protokol HTTP dan HTTPS dalam hal keamanan pertukaran data?'
    ],
    tugasPraktik: `**Tugas Laporan Uji Diagnostik Jaringan Lab**
Lakukan pengujian jaringan pada komputermu dan buatlah dokumen laporan praktikum (2 halaman PDF) yang memuat:
1. Hasil tangkapan layar (\`screenshot\`) perintah \`ipconfig /all\` dan penjelasan maknanya.
2. Hasil tangkapan layar perintah \`ping\` ke 3 domain berbeda (Google, Kominfo, dan Web Sekolah) beserta analisis nilai latensinya (\`ms\`).
3. Analisis skema denah sederhana topologi jaringan lab komputer sekolah.
Simpan dalam format PDF (\`JKI1_NAMA_KELAS.pdf\`) lalu kumpulkan ke portal tugas!`,
    asesmen: [
      {
        question: 'Perangkat jaringan yang berfungsi menghubungkan dua jaringan dengan subnet/segmen yang berbeda dan menentukan rute terbaik pengiriman paket data adalah...',
        options: ['Router', 'Switch Unmanaged', 'Hub', 'Repeater'],
        answerIndex: 0,
        explanation: 'Router bertugas merutekan paket data antar-jaringan yang berbeda berdasarkan IP address tujuan.'
      },
      {
        question: 'Layanan internet yang bertugas menerjemahkan nama domain alfabet (seperti google.com) menjadi alamat IP angka numerik adalah...',
        options: ['Domain Name System (DNS)', 'Dynamic Host Configuration Protocol (DHCP)', 'File Transfer Protocol (FTP)', 'Simple Mail Transfer Protocol (SMTP)'],
        answerIndex: 0,
        explanation: 'DNS (Domain Name System) berfungsi sebagai buku alamat yang menerjemahkan nama domain ke alamat IP.'
      },
      {
        question: 'Port standar dan fitur keamanan yang digunakan oleh protokol HTTPS adalah...',
        options: ['Port 443 dengan enkripsi SSL/TLS', 'Port 80 tanpa enkripsi data', 'Port 21 untuk transfer berkas', 'Port 25 untuk pengiriman surat email'],
        answerIndex: 0,
        explanation: 'HTTPS berjalan pada port default 443 dan menggunakan sertifikat SSL/TLS untuk mengenkripsi lalu lintas komunikasi web.'
      },
      {
        question: 'Panjang bit total dari alamat IPv4 dan IPv6 berturut-turut adalah...',
        options: ['32-bit dan 128-bit', '16-bit dan 64-bit', '64-bit dan 256-bit', '128-bit dan 512-bit'],
        answerIndex: 0,
        explanation: 'IPv4 berukuran 32-bit (4 oktet biner), sedangkan IPv6 berukuran 128-bit dalam format heksadesimal.'
      },
      {
        question: 'Perintah pada Command Prompt (CMD) yang digunakan untuk menguji latensi dan konektivitas respons antara komputer kita dengan server tujuan adalah...',
        options: ['ping', 'ipconfig', 'cls', 'mkdir'],
        answerIndex: 0,
        explanation: 'Perintah ping mengirimkan paket ICMP Echo Request untuk menguji konektivitas dan mengukur waktu bolak-balik respons (latensi).'
      },
      {
        question: 'Protokol jaringan yang secara otomatis mengalokasikan alamat IP, subnet mask, dan default gateway ke komputer klien saat terhubung adalah...',
        options: ['DHCP (Dynamic Host Configuration Protocol)', 'DNS (Domain Name System)', 'FTP (File Transfer Protocol)', 'HTTP (Hypertext Transfer Protocol)'],
        answerIndex: 0,
        explanation: 'DHCP server secara dinamis mendistribusikan konfigurasi IP ke perangkat klien tanpa perlu setting manual.'
      },
      {
        question: 'Topologi jaringan di mana semua komputer klien terhubung secara terpusat ke satu perangkat Switch/Hub pusat disebut topologi...',
        options: ['Star (Bintang)', 'Bus (Jalur Linier)', 'Ring (Cincin)', 'Mesh Penuh'],
        answerIndex: 0,
        explanation: 'Topologi Star menghubungkan setiap node ke switch sentral, sehingga kegagalan satu kabel tidak mematikan seluruh jaringan.'
      },
      {
        question: 'Kelebihan utama media transmisi kabel Serat Optik (Fiber Optic) dibandingkan kabel tembaga UTP/STP adalah...',
        options: [
          'Menggunakan sinyal cahaya sehingga kebal terhadap interferensi gelombang elektromagnetik dan mampu menempuh jarak jauh',
          'Sangat lentur dan tidak bisa patah sama sekali',
          'Harganya paling murah dan mudah disambung dengan gunting biasa',
          'Tidak memerlukan perangkat konverter optik'
        ],
        answerIndex: 0,
        explanation: 'Fiber Optic mentransmisikan data dalam bentuk pulsa cahaya melalui kaca serat murni, memberikan kecepatan gigabit dan bebas interferensi EMI.'
      },
      {
        question: 'Konektor standar yang dipasang pada ujung kabel jaringan UTP (Unshielded Twisted Pair) untuk dicolokkan ke port LAN komputer adalah...',
        options: ['RJ-45', 'RJ-11', 'BNC', 'SC Connector'],
        answerIndex: 0,
        explanation: 'RJ-45 adalah konektor 8-pin modular standar industri untuk terminasi kabel Ethernet UTP/STP.'
      },
      {
        question: 'Pada model referensi OSI (Open Systems Interconnection) 7 Layer, lapisan paling bawah yang bertanggung jawab mentransmisikan bit sinyal fisik adalah...',
        options: ['Physical Layer (Lapisan 1)', 'Data Link Layer (Lapisan 2)', 'Network Layer (Lapisan 3)', 'Application Layer (Lapisan 7)'],
        answerIndex: 0,
        explanation: 'Physical Layer menangani transmisi aliran bit mentah (raw bits) melalui media fisik kabel, radio nirkabel, atau cahaya.'
      },
      {
        question: 'Perangkat jaringan cerdas Layer-2 yang membaca alamat fisik (MAC Address) untuk meneruskan frame data hanya ke port perangkat tujuan spesifik adalah...',
        options: ['Switch', 'Hub Tradisional', 'Repeater Pasif', 'Kabel Coaxial'],
        answerIndex: 0,
        explanation: 'Switch mencatat MAC Address table sehingga lalu lintas data tidak disebarkan (broadcast) secara membabi buta seperti pada Hub.'
      },
      {
        question: 'Manakah di bawah ini yang merupakan rentang alamat IPv4 Privat (Private IP) yang sering digunakan pada jaringan lokal LAN sekolah/kantor?',
        options: ['192.168.0.0 – 192.168.255.255', '8.8.8.0 – 8.8.8.255', '1.1.1.0 – 1.1.1.255', '202.158.0.0 – 202.158.255.255'],
        answerIndex: 0,
        explanation: 'Rentang 192.168.0.0/16, 172.16.0.0/12, dan 10.0.0.0/8 dialokasikan khusus oleh IANA sebagai alamat IP privat lokal.'
      },
      {
        question: 'Alamat IP loopback khusus yang merujuk pada komputer lokal kita sendiri (localhost) adalah...',
        options: ['127.0.0.1', '192.168.1.1', '255.255.255.255', '0.0.0.0'],
        answerIndex: 0,
        explanation: '127.0.0.1 adalah alamat IPv4 loopback yang mengarahkan koneksi kembali ke mesin lokal (localhost).'
      },
      {
        question: 'Perintah Command Prompt Windows yang digunakan untuk melihat konfigurasi alamat IP, Subnet Mask, Gateway, dan DNS pada komputer saat ini adalah...',
        options: ['ipconfig /all', 'ping -t', 'tracert', 'netstat -a'],
        answerIndex: 0,
        explanation: 'Perintah `ipconfig /all` menampilkan detail lengkap seluruh adapter jaringan yang aktif beserta alamat IP dan MAC address.'
      },
      {
        question: 'Perintah diagnostik jaringan yang digunakan untuk melacak rute hop/jalur router yang dilewati paket data hingga sampai ke server tujuan adalah...',
        options: ['tracert (Traceroute)', 'ping', 'hostname', 'getmac'],
        answerIndex: 0,
        explanation: 'Tracert (Traceroute) menampilkan daftar seluruh router perantara (hop) dan waktu respon masing-masing rute.'
      },
      {
        question: 'Teknologi jaringan nirkabel (Wireless) yang beroperasi pada pita frekuensi 2.4 GHz dan 5 GHz untuk komunikasi perangkat komputer disebut...',
        options: ['Wi-Fi (IEEE 802.11)', 'Bluetooth (IEEE 802.15)', 'NFC', 'Inframerah IrDA'],
        answerIndex: 0,
        explanation: 'Wi-Fi adalah standar transmisi data nirkabel berbasis keluarga protokol IEEE 802.11.'
      },
      {
        question: 'Protokol enkripsi keamanan Wi-Fi modern yang paling aman dan direkomendasikan saat ini untuk mencegah pembobolan sandi adalah...',
        options: ['WPA3 / WPA2-Enterprise', 'WEP (Wired Equivalent Privacy)', 'Open / Tanpa Sandi', 'WPS PIN Default'],
        answerIndex: 0,
        explanation: 'WPA3 menggunakan protokol Simultaneous Authentication of Equals (SAE) yang jauh lebih tangguh dari kerentanan WEP dan WPA lawas.'
      },
      {
        question: 'Teknologi jaringan privat virtual yang mengenkripsi jalur lalu lintas internet pengguna sehingga terlindungi saat berselancar di Wi-Fi publik disebut...',
        options: ['VPN (Virtual Private Network)', 'VLAN (Virtual Local Area Network)', 'VoIP (Voice over IP)', 'NAT (Network Address Translation)'],
        answerIndex: 0,
        explanation: 'VPN membangun terowongan (tunnel) terenkripsi antara perangkat pengguna dengan server VPN sehingga data tidak dapat disadap.'
      },
      {
        question: 'Nama identitas publik pemancar sinyal hotspot nirkabel yang muncul di daftar pencarian Wi-Fi laptop/smartphone disebut...',
        options: ['SSID (Service Set Identifier)', 'BSSID MAC', 'WPA Key', 'Subnet Name'],
        answerIndex: 0,
        explanation: 'SSID adalah nama jaringan nirkabel yang dipancarkan oleh Access Point agar dapat dikenali pengguna.'
      },
      {
        question: 'Penyebab utama video call patah-patah atau game online mengalami "lag" meskipun kecepatan download tertera tinggi adalah tingginya nilai...',
        options: ['Latensi (Ping dalam milidetik) dan Jitter', 'Kapasitas harddisk', 'Ukuran monitor', 'Jumlah tab browser yang ditutup'],
        answerIndex: 0,
        explanation: 'Latensi adalah waktu tunda pengiriman paket data dari pengirim ke penerima. Semakin tinggi latensi (ms), responsivitas semakin lambat.'
      },
      {
        question: 'Kondisi di mana sebagian paket data yang dikirimkan melalui jaringan gagal mencapai tujuan dan hilang di tengah jalan disebut...',
        options: ['Packet Loss', 'Bandwidth Throttling', 'Overclocking', 'Broadcast Storm'],
        answerIndex: 0,
        explanation: 'Packet loss mengindikasikan adanya gangguan fisik kabel, sinyal nirkabel lemah, atau kemacetan (kongesti) lalu lintas jaringan.'
      },
      {
        question: 'Fungsi dari Default Gateway pada konfigurasi kartu jaringan komputer adalah...',
        options: [
          'Sebagai pintu gerbang (IP router) untuk meneruskan data keluar dari jaringan lokal menuju internet',
          'Sebagai nama komputer di jaringan',
          'Sebagai pengatur kecepatan kipas pendingin',
          'Sebagai penyimpan riwayat browsing'
        ],
        answerIndex: 0,
        explanation: 'Default Gateway adalah alamat router lokal yang menjadi gerbang keluar bagi semua paket data yang ditujukan ke luar subnet.'
      },
      {
        question: 'Subnet mask standar untuk jaringan IPv4 kelas C dengan notasi prefix /24 adalah...',
        options: ['255.255.255.0', '255.0.0.0', '255.255.0.0', '255.255.255.255'],
        answerIndex: 0,
        explanation: 'Notasi /24 berarti 24 bit bernilai 1 biner, yang setara dengan representasi desimal 255.255.255.0.'
      },
      {
        question: 'Perbedaan karakteristik gelombang Wi-Fi frekuensi 2.4 GHz dan 5 GHz yang benar adalah...',
        options: [
          'Frekuensi 2.4 GHz memiliki jangkauan lebih luas dan tembus dinding lebih baik, sedangkan 5 GHz memiliki kecepatan transfer lebih tinggi dengan jangkauan lebih pendek',
          'Frekuensi 2.4 GHz selalu lebih cepat daripada 5 GHz di semua kondisi',
          'Frekuensi 5 GHz tidak bisa digunakan untuk smartphone',
          'Kedua frekuensi tidak memiliki perbedaan sama sekali'
        ],
        answerIndex: 0,
        explanation: 'Gelombang 2.4 GHz memiliki panjang gelombang lebih besar sehingga tembus halangan lebih baik, sedangkan 5 GHz menawarkan bandwidth lebih lega.'
      },
      {
        question: 'Fitur pada sistem operasi yang memungkinkan beberapa komputer dalam satu lab sekolah saling mengakses folder kerja bersama tanpa flashdisk disebut...',
        options: ['File & Folder Sharing (Network Sharing)', 'Disk Defragmenter', 'Safe Mode', 'Virtual Machine'],
        answerIndex: 0,
        explanation: 'Network File Sharing memanfaatkan protokol SMB/NFS untuk berbagi berkas antar-komputer melalui jaringan lokal.'
      },
      {
        question: 'Dalam industri Desain Komunikasi Visual (DKV), arsitektur Cloud Storage & Sync (seperti Google Drive / Dropbox) sangat krusial karena...',
        options: [
          'Memungkinkan kolaborasi aset desain resolusi besar antar-anggota tim secara real-time dan mencegah kehilangan data master',
          'Mengubah resolusi gambar secara otomatis menjadi lebih kecil',
          'Menghilangkan kebutuhan kartu grafis GPU',
          'Membuat monitor berubah menjadi layar sentuh'
        ],
        answerIndex: 0,
        explanation: 'Cloud storage memfasilitasi sinkronisasi berkas desain multi-gigabyte, versioning aset grafis, dan kolaborasi tim terpadu.'
      },
      {
        question: 'Dalam industri Agribisnis Pengolahan Hasil Pertanian (APHP), implementasi perangkat IoT (Internet of Things) yang terhubung ke jaringan internet digunakan untuk...',
        options: [
          'Memantau suhu dan kelembaban ruang fermentasi pangan secara otomatis dan real-time dari jarak jauh',
          'Mengubah rasa makanan secara digital',
          'Mempercepat proses memasak dengan sinyal radio',
          'Menggantikan bahan baku pangan dengan perangkat lunak'
        ],
        answerIndex: 0,
        explanation: 'Sensor IoT mentransmisikan data parameter lingkungan industri pangan (suhu, kelembaban, pH) melalui jaringan untuk automasi kontrol kualitas.'
      },
      {
        question: 'Serangan siber di mana penyerang membanjiri server dengan jutaan permintaan palsu hingga server tumbang dan tidak dapat diakses pengguna resmi dinamakan...',
        options: ['DDoS (Distributed Denial of Service)', 'Phishing', 'Man-in-the-Middle', 'Keylogging'],
        answerIndex: 0,
        explanation: 'DDoS menyerang ketersediaan (availability) server dengan membanjiri bandwidth dan resource komputasi menggunakan ribuan botnet.'
      },
      {
        question: 'Praktek penipuan online yang mengirimkan email atau tautan palsu menyerupai website resmi untuk mencuri username, password, dan PIN pengguna dinamakan...',
        options: ['Phishing', 'Subnetting', 'Routing', 'Broadcasting'],
        answerIndex: 0,
        explanation: 'Phishing adalah rekayasa sosial (social engineering) untuk memancing korban memberikan kredensial rahasia melalui situs tiruan.'
      },
      {
        question: 'Mengapa pemahaman tentang jaringan komputer dan keamanan digital sangat penting bagi siswa SMK di era Industri 4.0?',
        options: [
          'Agar mampu mengonfigurasi konektivitas kerja secara mandiri, berkolaborasi secara digital, serta menjaga kerahasiaan aset informasi organisasi',
          'Hanya agar siswa bisa mencari password Wi-Fi tetangga',
          'Supaya siswa tidak perlu lagi memperhatikan standar K3 di bengkel/lab',
          'Agar semua siswa dapat meretas situs internet tanpa izin'
        ],
        answerIndex: 0,
        explanation: 'Literasi jaringan dan keamanan siber membentuk kompetensi profesional siswa dalam menjaga integritas data dan produktivitas kerja era digital.'
      }
    ],
    asesmenUraian: [
      'Jelaskan mengapa latensi (ping) yang rendah sangat penting dalam aktivitas komunikasi real-time seperti video call dan ujian online!',
      'Uraikan analisis Anda mengenai risiko keamanan jika pengguna bertransaksi perbankan di jaringan Wi-Fi publik tanpa enkripsi HTTPS atau VPN!'
    ],
    rubrikPenilaian: [
      {
        kriteria: 'Penguasaan Konsep Protokol & IP',
        skor4: 'Mampu menjelaskan konsep IP Address, Subnetting, Gateway, DNS, dan HTTPS secara tepat dan runtut.',
        skor3: 'Menjelaskan konsep dasar dengan baik namun ada sedikit kerancuan pada fungsi Gateway.',
        skor2: 'Hanya memahami sebagian kecil konsep jaringan.',
        skor1: 'Tidak memahami konsep pengalamatan jaringan.'
      },
      {
        kriteria: 'Keterampilan Diagnostik CLI',
        skor4: 'Mampu mengeksekusi ipconfig, ping, tracert serta menganalisis arti pesan error jaringan secara akurat.',
        skor3: 'Mampu mengeksekusi perintah CLI namun belum bisa membaca hasil latensi dengan tepat.',
        skor2: 'Hanya bisa menjalankan 1 perintah tanpa analisis.',
        skor1: 'Tidak mampu menjalankan perintah diagnostik.'
      }
    ],
    glosarium: [
      { term: 'LAN', definition: 'Local Area Network; jaringan komputer yang mencakup area geografis terbatas seperti ruangan, gedung, atau kampus.' },
      { term: 'IP Address', definition: 'Deretan angka biner unik yang menjadi identitas alamat setiap perangkat di jaringan internet.' },
      { term: 'DNS', definition: 'Domain Name System; sistem basis data terdistribusi yang memetakan nama domain ke alamat IP.' },
      { term: 'Latency', definition: 'Waktu jeda yang dibutuhkan oleh paket data untuk berpindah dari sumber ke tujuan (diukur dalam ms).' },
      { term: 'HTTPS', definition: 'Hypertext Transfer Protocol Secure; versi aman dari protokol HTTP yang menggunakan enkripsi SSL/TLS.' }
    ],
    sumberReferensi: [
      'Kurose, J. F., & Ross, K. W. (2021). Computer Networking: A Top-Down Approach (8th ed.). Pearson.',
      'Tanenbaum, A. S., & Wetherall, D. J. (2014). Computer Networks (5th ed.). Prentice Hall.',
      'Kemendikbudristek (2021). Buku Siswa Informatika Kelas X SMK. Pusat Kurikulum dan Perbukuan.',
      'Cisco Networking Academy (2024). CCNA: Introduction to Networks Course Materials.'
    ]
  }
];
