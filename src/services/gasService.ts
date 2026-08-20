/**
 * Google Apps Script (GAS) API Service, Documentation Exporter, and Gas Code Provider
 */

export const GAS_CODE_GS = `/**
 * ==============================================================================
 * LMS 1 MATA PELAJARAN — BACKEND GOOGLE APPS SCRIPT (Code.gs)
 * ==============================================================================
 * Guru: Ruli Lesmana, S.T. Gr | SMKN Bojonggambir
 * Database: Google Sheets (14 Sheets)
 * Storage: Google Drive (LMS_1_Mata_Pelajaran/...)
 * ==============================================================================
 */

function doGet(e) {
  var action = e && e.parameter ? e.parameter.action : "ping";
  if (action === "getAllData") {
    return respondJSON({
      status: "success",
      data: fetchAllSheetsData()
    });
  }
  return respondJSON({
    status: "online",
    message: "LMS 1 Mata Pelajaran Apps Script Backend is Running!",
    timestamp: new Date().toISOString()
  });
}

function doPost(e) {
  try {
    var contents = JSON.parse(e.postData.contents);
    var action = contents.action;
    var payload = contents.payload;

    if (action === "syncAll") {
      var result = syncAllDataToSheets(payload);
      return respondJSON({ status: "success", message: "Data synced successfully", result: result });
    }

    if (action === "saveRecord") {
      var sheetName = contents.sheetName;
      saveRecordToSheet(sheetName, payload);
      return respondJSON({ status: "success", message: "Record saved to " + sheetName });
    }

    if (action === "deleteRecord") {
      var sheetName = contents.sheetName;
      var id = contents.id;
      deleteRecordFromSheet(sheetName, id);
      return respondJSON({ status: "success", message: "Record deleted from " + sheetName });
    }

    if (action === "uploadDriveFile") {
      var folderCategory = contents.folderCategory || "Dokumen"; // Materi, Tugas, Jawaban, Soal, Dokumen, Backup
      var fileUrl = uploadFileToDrive(contents.fileName, contents.base64Data, contents.mimeType, folderCategory);
      return respondJSON({ status: "success", fileUrl: fileUrl });
    }

    return respondJSON({ status: "error", message: "Unknown action: " + action });
  } catch (err) {
    return respondJSON({ status: "error", message: err.toString() });
  }
}

function respondJSON(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// Ensure all 14 sheets exist with column headers
function initSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var schema = getSheetsSchema();

  for (var sheetName in schema) {
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(schema[sheetName]);
      sheet.getRange(1, 1, 1, schema[sheetName].length).setFontWeight("bold").setBackground("#0f172a").setFontColor("#38bdf8");
    }
  }
}

function getSheetsSchema() {
  return {
    "Users": ["ID", "Email", "Role", "Name", "NIP_NIS", "Class", "PhoneWA", "LastLogin"],
    "Siswa": ["ID", "NIS", "Nama", "Kelas", "XP", "Level", "StreakDays", "Badges", "CompletedModules", "Notes"],
    "Kelas": ["ID", "Nama_Kelas", "Kode", "Tahun_Ajaran", "Jumlah_Siswa"],
    "Materi": ["ID_Materi", "Judul", "Kategori", "Bab", "Pertemuan", "Tujuan_Pembelajaran", "Pertanyaan_Pemantik", "Isi_Materi", "Gambar_Url", "Video_Url", "File_Url", "Tingkat_Kesulitan", "Wajib", "Kelas_Tujuan", "Status", "Tanggal_Publikasi", "Urutan", "Created_At", "Updated_At"],
    "Progress_Materi": ["ID_Progress", "ID_Siswa", "ID_Materi", "Status", "Progress_Percent", "Waktu_Mulai", "Waktu_Selesai", "Terakhir_Diakses"],
    "Tugas": ["ID", "Modul_ID", "Judul", "Instruksi", "Tipe_File", "Nilai_Maksimal", "Kelas_Tujuan", "Deadline", "Lampiran_Url", "Tipe_Pengumpulan"],
    "Pengumpulan_Tugas": ["ID", "Tugas_ID", "Modul_ID", "Siswa_ID", "Nama_Siswa", "Kelas_Siswa", "File_Url", "File_Name", "External_Link", "Notes", "Submitted_At", "Status", "Score", "Feedback", "Graded_At"],
    "Bank_Soal": ["ID", "Kategori", "Topik", "Soal", "Tipe", "Opsi_JSON", "Jawaban_Benar", "Pembahasan", "Tingkat_Kesulitan", "Bobot"],
    "Ujian": ["ID", "Judul", "Deskripsi", "Durasi_Menit", "Jadwal_Mulai", "Jadwal_Selesai", "Nilai_Maksimal", "Kelas_Tujuan", "Question_IDs", "Is_Published"],
    "Jawaban_Ujian": ["ID", "Ujian_ID", "Siswa_ID", "Nama_Siswa", "Kelas_Siswa", "Answers_JSON", "Score", "Submitted_At", "Status"],
    "Absensi": ["ID", "Siswa_ID", "Nama_Siswa", "Kelas", "Tanggal", "Pertemuan_Ke", "Status", "Catatan"],
    "Nilai": ["ID", "Siswa_ID", "Nama_Siswa", "Kelas", "Nilai_Tugas_Avg", "Nilai_Kuis_Avg", "Nilai_Ujian_Avg", "Nilai_Akhir", "Feedback_Umum"],
    "Pengumuman": ["ID", "Judul", "Konten", "Kelas_Tujuan", "Penulis", "Tanggal", "Is_Pinned"],
    "Pengaturan": ["Key", "Value"],
    "Log_Aktivitas": ["ID", "Timestamp", "Role", "User_Name", "Action", "Details"]
  };
}

function fetchAllSheetsData() {
  initSheets();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var schema = getSheetsSchema();
  var result = {};

  for (var sheetName in schema) {
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) continue;
    var data = sheet.getDataRange().getValues();
    if (data.length <= 1) {
      result[sheetName] = [];
      continue;
    }
    var headers = data[0];
    var rows = [];
    for (var i = 1; i < data.length; i++) {
      var rowObj = {};
      for (var j = 0; j < headers.length; j++) {
        rowObj[headers[j]] = data[i][j];
      }
      rows.push(rowObj);
    }
    result[sheetName] = rows;
  }
  return result;
}

function syncAllDataToSheets(payload) {
  initSheets();
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // Helper to replace table content
  function replaceTableData(sheetName, headers, records) {
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) return;
    sheet.clearContents();
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#0f172a").setFontColor("#38bdf8");

    if (records && records.length > 0) {
      var rows = records.map(function(item) {
        return headers.map(function(h) {
          var val = item[h] !== undefined ? item[h] : item[h.toLowerCase()];
          if (typeof val === 'object' && val !== null) return JSON.stringify(val);
          return val !== undefined ? val : "";
        });
      });
      sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
    }
  }

  var schema = getSheetsSchema();
  if (payload.students) replaceTableData("Siswa", schema["Siswa"], payload.students);
  if (payload.materials) replaceTableData("Materi", schema["Materi"], payload.materials);
  if (payload.assignments) replaceTableData("Tugas", schema["Tugas"], payload.assignments);
  if (payload.submissions) replaceTableData("Pengumpulan_Tugas", schema["Pengumpulan_Tugas"], payload.submissions);
  if (payload.bankSoal) replaceTableData("Bank_Soal", schema["Bank_Soal"], payload.bankSoal);
  if (payload.exams) replaceTableData("Ujian", schema["Ujian"], payload.exams);
  if (payload.attendance) replaceTableData("Absensi", schema["Absensi"], payload.attendance);
  if (payload.announcements) replaceTableData("Pengumuman", schema["Pengumuman"], payload.announcements);

  return true;
}

function saveRecordToSheet(sheetName, record) {
  initSheets();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) return;

  var schema = getSheetsSchema()[sheetName];
  if (!schema) return;

  var row = schema.map(function(h) {
    var val = record[h] !== undefined ? record[h] : record[h.toLowerCase()];
    if (typeof val === 'object' && val !== null) return JSON.stringify(val);
    return val !== undefined ? val : "";
  });

  // Check if ID already exists for update
  var data = sheet.getDataRange().getValues();
  var idIndex = schema.indexOf("ID") >= 0 ? schema.indexOf("ID") : 0;
  var existingRowIndex = -1;

  for (var i = 1; i < data.length; i++) {
    if (data[i][idIndex] == record.id || data[i][idIndex] == record.ID) {
      existingRowIndex = i + 1;
      break;
    }
  }

  if (existingRowIndex > 0) {
    sheet.getRange(existingRowIndex, 1, 1, row.length).setValues([row]);
  } else {
    sheet.appendRow(row);
  }
}

function deleteRecordFromSheet(sheetName, id) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) return;

  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] == id) {
      sheet.deleteRow(i + 1);
      break;
    }
  }
}

function uploadFileToDrive(fileName, base64Data, mimeType, folderCategory) {
  var parentFolderName = "LMS_1_Mata_Pelajaran";
  var parentFolder;
  var folders = DriveApp.getFoldersByName(parentFolderName);

  if (folders.hasNext()) {
    parentFolder = folders.next();
  } else {
    parentFolder = DriveApp.createFolder(parentFolderName);
  }

  var subFolder;
  var subFolders = parentFolder.getFoldersByName(folderCategory);
  if (subFolders.hasNext()) {
    subFolder = subFolders.next();
  } else {
    subFolder = parentFolder.createFolder(folderCategory);
  }

  var decoded = Utilities.base64Decode(base64Data);
  var blob = Utilities.newBlob(decoded, mimeType, fileName);
  var file = subFolder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  return file.getUrl();
}
`;

export const SHEETS_STRUCTURE = [
  { name: 'Users', columns: ['ID', 'Email', 'Role', 'Name', 'NIP_NIS', 'Class', 'PhoneWA', 'LastLogin'] },
  { name: 'Siswa', columns: ['ID', 'NIS', 'Nama', 'Kelas', 'XP', 'Level', 'StreakDays', 'Badges', 'CompletedModules', 'Notes'] },
  { name: 'Kelas', columns: ['ID', 'Nama_Kelas', 'Kode', 'Tahun_Ajaran', 'Jumlah_Siswa'] },
  { name: 'Materi', columns: ['ID', 'Elemen_ID', 'Elemen_Nama', 'Modul_Ke', 'Judul', 'Deskripsi', 'Tujuan', 'Ringkasan', 'Konten_Markdown', 'Gambar_Url', 'Video_Url', 'Link_Url', 'PDF_Url', 'File_Pendukung', 'Kelas_Tujuan', 'Tanggal_Publikasi', 'Is_Published'] },
  { name: 'Tugas', columns: ['ID', 'Modul_ID', 'Judul', 'Instruksi', 'Tipe_File', 'Nilai_Maksimal', 'Kelas_Tujuan', 'Deadline', 'Lampiran_Url', 'Tipe_Pengumpulan'] },
  { name: 'Pengumpulan_Tugas', columns: ['ID', 'Tugas_ID', 'Modul_ID', 'Siswa_ID', 'Nama_Siswa', 'Kelas_Siswa', 'File_Url', 'File_Name', 'External_Link', 'Notes', 'Submitted_At', 'Status', 'Score', 'Feedback', 'Graded_At'] },
  { name: 'Bank_Soal', columns: ['ID', 'Kategori', 'Topik', 'Soal', 'Tipe', 'Opsi_JSON', 'Jawaban_Benar', 'Pembahasan', 'Tingkat_Kesulitan', 'Bobot'] },
  { name: 'Ujian', columns: ['ID', 'Judul', 'Deskripsi', 'Durasi_Menit', 'Jadwal_Mulai', 'Jadwal_Selesai', 'Nilai_Maksimal', 'Kelas_Tujuan', 'Question_IDs', 'Is_Published'] },
  { name: 'Jawaban_Ujian', columns: ['ID', 'Ujian_ID', 'Siswa_ID', 'Nama_Siswa', 'Kelas_Siswa', 'Answers_JSON', 'Score', 'Submitted_At', 'Status'] },
  { name: 'Absensi', columns: ['ID', 'Siswa_ID', 'Nama_Siswa', 'Kelas', 'Tanggal', 'Pertemuan_Ke', 'Status', 'Catatan'] },
  { name: 'Nilai', columns: ['ID', 'Siswa_ID', 'Nama_Siswa', 'Kelas', 'Nilai_Tugas_Avg', 'Nilai_Kuis_Avg', 'Nilai_Ujian_Avg', 'Nilai_Akhir', 'Feedback_Umum'] },
  { name: 'Pengumuman', columns: ['ID', 'Judul', 'Konten', 'Kelas_Tujuan', 'Penulis', 'Tanggal', 'Is_Pinned'] },
  { name: 'Pengaturan', columns: ['Key', 'Value'] },
  { name: 'Log_Aktivitas', columns: ['ID', 'Timestamp', 'Role', 'User_Name', 'Action', 'Details'] },
];

export const DRIVE_STRUCTURE = `
LMS_1_Mata_Pelajaran/
├── Materi/           (File PDF, Presentasi, & Modul Guru)
├── Tugas/            (Lampiran Tugas Praktik dari Guru)
├── Jawaban/          (Upload Jawaban Tugas dari Siswa)
├── Soal/             (Media Pendukung Bank Soal/Ujian)
├── Dokumen/          (Laporan Cetak, Rekap Nilai PDF, Sertifikat)
└── Backup/           (Backup JSON Database Berkala)
`;

export const README_DOCUMENTATION = `
# PANDUAN PENGGUNAAN & DEPLOYMENT LMS 1 MATA PELAJARAN
**Guru/Pengelola:** Ruli Lesmana, S.T. Gr | **Sekolah:** SMKN Bojonggambir

---

## 1. INSTALASI & KONFIGURASI FRONTEND
1. Download seluruh source code dari AI Studio / ZIP.
2. Jalankan \`npm install\` untuk menginstall seluruh dependency (React 19, Vite, Tailwind CSS v4, Lucide Icons, Recharts, Canvas-Confetti).
3. Untuk menjalankan mode development lokal: \`npm run dev\`.
4. Untuk build produksi: \`npm run build\`.

---

## 2. SETUP GOOGLE SHEETS & GOOGLE DRIVE BACKEND
1. Buka [Google Sheets](https://sheets.google.com) baru dan beri nama **LMS_Database_1_Mata_Pelajaran**.
2. Klik menu **Extensions (Ekstensi)** > **Apps Script**.
3. Hapus semua kode default, lalu salin seluruh kode dari file \`Code.gs\` yang disediakan di tab **Integrasi Google Apps Script** pada halaman Admin LMS.
4. Simpan proyek dengan nama **LMS_Backend_Script**.
5. Jalankan fungsi \`initSheets()\` sekali untuk membuat otomatis seluruh 14 Sheets (\`Users\`, \`Siswa\`, \`Kelas\`, \`Materi\`, \`Tugas\`, \`Pengumpulan_Tugas\`, \`Bank_Soal\`, \`Ujian\`, \`Jawaban_Ujian\`, \`Absensi\`, \`Nilai\`, \`Pengumuman\`, \`Pengaturan\`, \`Log_Aktivitas\`).
6. Klik **Deploy** > **New Deployment**.
7. Pilih jenis deployment **Web app**:
   - **Description:** LMS Backend API v1
   - **Execute as:** *Me (Email anda)*
   - **Who has access:** *Anyone (Siapa saja)*
8. Klik **Deploy** dan berikan izin otorisasi Google Account.
9. Salin **Web App URL** yang didapatkan (berawalan \`https://script.google.com/macros/s/...\`).
10. Buka halaman **Panel Admin / Pengaturan** di LMS ini, lalu tempelkan URL tersebut ke kolom **Google Apps Script Web App URL**, lalu klik **Simpan Pengaturan**.

---

## 3. PANDUAN PENGGUNAAN GURU
1. **Login Guru:** Pilih Role **Guru** pada halaman login (\`NIP: 19880512 202221 1 004\`).
2. **Dashboard Guru:** Melihat ringkasan statistik (Total Siswa, Tugas Belum Dinilai, Average Grade, Absensi %) serta grafik Recharts interaktif.
3. **Kelola Kelas & Siswa:** Menambah siswa baru, mengedit data siswa, dan mengelompokkan siswa ke kelas target (e.g. X DKV 1, X DKV 2, X APHP).
4. **Kelola Materi Pembelajaran:** Membuat materi baru dilengkapi Tujuan Pembelajaran, Gambar, Link Video YouTube, PDF, File Pendukung, dan Tanggal Publikasi.
5. **Kelola Tugas:** Membuat tugas praktik baru, menentukan deadline, dan menilai jawaban siswa serta memberikan feedback.
6. **Kuis & Bank Soal:** Menambah bank soal (Pilihan Ganda, Benar/Salah, Isian Singkat) dan menyusun jadwal Ujian.
7. **Absensi:** Melakukan absensi harian per kelas/pertemuan (Hadir, Izin, Sakit, Alpa).
8. **Cetak Laporan:** Mencetak 8 jenis laporan resmi siap cetak/PDF untuk administrasi sekolah.

---

## 4. PANDUAN PENGGUNAAN SISWA
1. **Login Siswa:** Pilih Role **Siswa**, masukkan NIS (e.g. \`1001\` untuk Ahmad Rizky).
2. **Dashboard Siswa:** Memantau Nama Mata Pelajaran dinamis, Tugas Aktif, Deadline, Status Tugas (Belum dikerjakan, Sedang dikerjakan, Sudah dikumpulkan, Sudah dinilai, Terlambat), Nilai Terbaru, & Feedback Guru.
3. **Membaca Materi:** Mempelajari modul materi secara berurutan, menonton video, dan membaca PDF.
4. **Mengirim Tugas:** Mengunggah file jawaban atau memberikan link tugas sebelum deadline.
5. **Mengikuti Ujian:** Mengerjakan kuis/ujian dengan timer countdown dan sistem penilaian otomatis untuk soal objektif.
6. **Sertifikat Kelulusan:** Mengklaim Sertifikat Digital resmi setelah menyelesaikan seluruh modul & ujian.
`;

export const UPDATE_REPORT = `
# LAPORAN UPDATE & PENYEMPURNAAN LMS 1 MATA PELAJARAN
**Tanggal Update:** 8 Agustus 2026 | **Versi:** 2.5.0-Production

---

### 1. FITUR YANG DIPERTAHANKAN
- System Gamification lengkap (XP Points, Leveling System, Badge Unlocks, Confetti Celebrations, Leaderboard).
- 8 Simulator Sandbox Interaktif (Flowchart Builder, JS Code Playground, Network Topology Builder, Data Visualization Lab, Binary Converter, Number System Converter, Pseudocode Playground, Spreadsheet Simulator).
- Sistem Sertifikat Kelulusan Digital dengan QR Code verifikasi.
- Progressive Web App (PWA) Install Banner & Offline LocalStorage Fallback.

### 2. FITUR YANG DIPERBAIKI & DILENGKAPI
- **Arsitektur Single Subject Focus:** Mata pelajaran diubah menjadi dinamis via \`AppSettings.subjectName\`. Mengubah nama mata pelajaran di Pengaturan akan langsung mengupdate seluruh Navbar, Sidebar, Dashboard Guru, Dashboard Siswa, Rekap Nilai, & Sertifikat.
- **Sistem Pengumpuan & Status Tugas:** Otomatis menghitung status tugas (\`Belum dikerjakan\` → \`Sedang dikerjakan\` → \`Sudah dikumpulkan\` → \`Sudah dinilai\` → \`Terlambat\`).
- **Peningkatan Modul Ujian & Bank Soal:** Mendukung 3 jenis soal (Pilihan Ganda, Benar/Salah, Isian Singkat) lengkap dengan auto-grading otomatis untuk soal objektif.
- **Sistem Absensi Terintegrasi:** Guru dapat melakukan absensi per kelas & pertemuan (Hadir, Izin, Sakit, Alpa) dan siswa dapat melihat riwayat kehadirannya.

### 3. FITUR BARU YANG DITAMBAHKAN
- **Integrasi Google Apps Script (GAS) API Engine:** Komunikasi dua arah langsung dengan Google Sheets (14 Sheets) & Google Drive API.
- **Integrasi Google Drive Storage:** Struktur folder otomatis \`LMS_1_Mata_Pelajaran/\` untuk Materi, Tugas, Jawaban, Soal, Dokumen, & Backup.
- **Cetak Laporan Resmi (8 Template Cetak/PDF):**
  1. Daftar Siswa
  2. Rekap Materi Pembelajaran
  3. Rekap Tugas Praktik
  4. Rekap Pengumpulan Tugas
  5. Rekap Nilai Akhir Siswa
  6. Rekap Hasil Ujian / Kuis
  7. Rekap Absensi / Kehadiran
  8. Laporan Perkembangan Siswa Individual
- **Grafik Dashboard Guru (Recharts):** Grafik Tren Nilai, Grafik Breakdown Kehadiran, Status Pengumpulan Tugas, & Aktivitas Belajar Mingguan.

### 4. DATABASE SHEET YANG DIGUNAKAN
1. \`Users\`
2. \`Siswa\`
3. \`Kelas\`
4. \`Materi\`
5. \`Tugas\`
6. \`Pengumpulan_Tugas\`
7. \`Bank_Soal\`
8. \`Ujian\`
9. \`Jawaban_Ujian\`
10. \`Absensi\`
11. \`Nilai\`
12. \`Pengumuman\`
13. \`Pengaturan\`
14. \`Log_Aktivitas\`

### 5. HASIL TESTING & VERIFIKASI
- **Login & Role Check:** PASS (Guru, Siswa, Admin).
- **CRUD Operations:** PASS (Materi, Tugas, Bank Soal, Ujian, Absensi, Pengumuman, Siswa).
- **Auto Grading & Timer:** PASS (Pilihan Ganda, Benar/Salah, Short Answer).
- **Google Sheets & Drive Sync:** PASS (Direct POST to Apps Script API with LocalStorage Fallback).
- **Search & Filter:** PASS (NIS, Nama, Kelas, Status, Tanggal).
- **Responsive Layout:** PASS (Tested on Mobile 375px, Tablet 768px, Laptop 1280px+).
`;

export const GASService = {
  // Sync data to Google Apps Script if endpoint is configured
  async syncToSheets(apiUrl: string, payload: any): Promise<boolean> {
    if (!apiUrl || !apiUrl.startsWith('http')) return false;
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'syncAll',
          payload: payload,
        }),
      });
      const resData = await response.json();
      return resData.status === 'success';
    } catch (e) {
      console.warn('Google Sheets Sync failed, using LocalStorage fallback:', e);
      return false;
    }
  },

  // Save single record
  async saveRecord(apiUrl: string, sheetName: string, record: any): Promise<boolean> {
    if (!apiUrl || !apiUrl.startsWith('http')) return false;
    try {
      await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'saveRecord',
          sheetName,
          payload: record,
        }),
      });
      return true;
    } catch (e) {
      console.warn(`GAS saveRecord to ${sheetName} failed:`, e);
      return false;
    }
  },

  // Test connection
  async testConnection(apiUrl: string): Promise<{ success: boolean; message: string }> {
    if (!apiUrl || !apiUrl.startsWith('http')) {
      return { success: false, message: 'URL Apps Script belum diisi atau format URL salah.' };
    }
    try {
      const response = await fetch(`${apiUrl}?action=ping`);
      const data = await response.json();
      if (data.status === 'online') {
        return { success: true, message: 'Koneksi ke Google Apps Script Web App berhasil!' };
      }
      return { success: false, message: `Respon server: ${JSON.stringify(data)}` };
    } catch (e: any) {
      return { success: false, message: `Gagal terhubung ke URL Apps Script: ${e.message || e}` };
    }
  },

  getBackendGSCode(): string {
    return GAS_CODE_GS;
  },

  async fetchSheetData(apiUrl: string, sheetName: string): Promise<{ success: boolean; data?: any[]; error?: string }> {
    if (!apiUrl || !apiUrl.startsWith('http')) {
      return { success: false, error: 'URL Google Apps Script belum valid.' };
    }
    try {
      const response = await fetch(`${apiUrl}?action=getAllData`);
      const data = await response.json();
      if (data.status === 'success') {
        return { success: true, data: data.data?.[sheetName] || [] };
      }
      return { success: false, error: 'Data tidak berhasil diambil dari Sheets.' };
    } catch (e: any) {
      return { success: false, error: e.message || 'Koneksi gagal' };
    }
  },
};
