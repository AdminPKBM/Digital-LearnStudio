/**
 * Google Apps Script (GAS) & Google Sheets Integration Engine
 * Full synchronization of 15 Sheets & Tables:
 * 1. Users (Admin, Guru, Akun Siswa)
 * 2. Siswa (102 Siswa SMKN Bojonggambir)
 * 3. Kelas (X DKV 1, X DKV 2, X APHP)
 * 4. Materi (16 Modul Fase E Komprehensif)
 * 5. Progress_Materi (Kemajuan Baca Siswa)
 * 6. Tugas (16 Tugas Praktik Modul)
 * 7. Pengumpulan_Tugas (Pengumpulan Tugas Siswa & Nilai)
 * 8. Bank_Soal (240 Butir Soal, Kunci Jawaban & Pembahasan)
 * 9. Ujian (PTS, PAS & Kuis Modul)
 * 10. Jawaban_Ujian (Hasil & Rincian Jawaban Siswa)
 * 11. Absensi (Presensi Otomatis Siswa)
 * 12. Nilai (Rekapitulasi Nilai Akhir & Rapor)
 * 13. Pengumuman (Pengumuman Sekolah & Guru)
 * 14. Pengaturan (Konfigurasi Aplikasi & Sekolah)
 * 15. Log_Aktivitas (Catatan Aktivitas Siswa Real-time)
 */

import { initialStudents, defaultSettings, assignmentsData, initialClasses, initialAnnouncements } from '../data/seedData';
import { allModulesData } from '../data/modules';
import { allQuizzesData } from '../data/quizzes';
import { StorageService } from './storage';

export const generateCompleteGASCode = (): string => {
  // Pre-serialize all 102 students
  const studentsJSON = JSON.stringify(
    initialStudents.map((s) => ({
      ID: s.id,
      NIS: s.nis,
      Nama: s.name,
      Gender: s.gender || 'L',
      Kelas: s.classGroup,
      Jurusan: s.jurusan || (s.classGroup === 'X APHP' ? 'APHP' : 'DKV'),
      XP: s.xp,
      Level: s.level,
      StreakDays: s.streakDays,
      Badges: JSON.stringify(s.badges || ['first_login']),
      CompletedModules: JSON.stringify(s.completedModuleIds || []),
      Notes: JSON.stringify(s.notes || {}),
    }))
  );

  // Pre-serialize all 16 modules
  const modulesJSON = JSON.stringify(
    allModulesData.map((m) => ({
      ID_Materi: m.id,
      Elemen: m.elementId,
      Nama_Elemen: m.elementName,
      Modul_Ke: m.moduleNumber,
      Judul: m.title,
      Waktu_Menit: m.estimatedTimeMinutes,
      Tingkat_Kesulitan: m.difficulty,
      Tujuan_Pembelajaran: (m.objectives || []).join(' | '),
      Ringkasan: m.summary,
      Konten_Markdown: m.contentMarkdown ? m.contentMarkdown.slice(0, 3000) : '',
      Gambar_Url: m.imageUrl || '',
      Video_Url: m.videoUrl || '',
      File_Url: m.pdfUrl || '',
      Status: m.status || 'published',
      Kelas_Tujuan: m.targetClass || 'ALL',
      Urutan: m.urutan || m.moduleNumber,
    }))
  );

  // Pre-serialize all 240 questions from 16 modules (15 questions each)
  const bankSoalArray: any[] = [];
  allModulesData.forEach((m) => {
    const qData = allQuizzesData[m.id];
    if (qData && qData.questions) {
      qData.questions.forEach((q, idx) => {
        const optionLabels = ['A', 'B', 'C', 'D'];
        bankSoalArray.push({
          ID: q.id || `${m.id}-Q${idx + 1}`,
          Modul_ID: m.id,
          Elemen: m.elementId,
          Nomor_Soal: idx + 1,
          Soal: q.question,
          Opsi_A: q.options[0] || '',
          Opsi_B: q.options[1] || '',
          Opsi_C: q.options[2] || '',
          Opsi_D: q.options[3] || '',
          Kunci_Jawaban: optionLabels[q.correctAnswer] || 'A',
          Index_Jawaban: q.correctAnswer,
          Pembahasan: q.explanation || '',
          Bobot: 1,
        });
      });
    }
  });
  const bankSoalJSON = JSON.stringify(bankSoalArray);

  // Pre-serialize assignments
  const assignmentsArray = Object.values(assignmentsData).map((a) => ({
    ID: a.id,
    Modul_ID: a.moduleId,
    Judul: a.title,
    Instruksi: a.instruction,
    Tipe_File: (a.allowedTypes || []).join(', '),
    Nilai_Maksimal: a.maxScore || 100,
    Kelas_Tujuan: 'ALL',
    Deadline: '2026-12-31',
  }));
  const assignmentsJSON = JSON.stringify(assignmentsArray);

  return `/**
 * ==============================================================================
 * LMS DIGITAL LEARNSTUDIO — GOOGLE APPS SCRIPT BACKEND (Code.gs)
 * ==============================================================================
 * Sekolah: SMK Negeri Bojonggambir
 * Guru Pengampu: Ruli Lesmana, S.T. Gr (081223546686)
 * Mata Pelajaran: Informatika Fase E (16 Modul, 240 Soal, 102 Siswa)
 * Database: Google Sheets (15 Tabel Terintegrasi Penuh)
 * Storage: Google Drive
 * ==============================================================================
 */

// Menangani permintaan GET (API Read & Ping)
function doGet(e) {
  var action = e && e.parameter ? e.parameter.action : "ping";
  
  if (action === "getAllData") {
    return respondJSON({
      status: "success",
      data: fetchAllSheetsData()
    });
  }

  if (action === "getSheetData") {
    var sheetName = e.parameter.sheetName || "Siswa";
    return respondJSON({
      status: "success",
      data: fetchSingleSheetData(sheetName)
    });
  }
  
  if (action === "seedAll") {
    var count = seedAllExistingData();
    return respondJSON({
      status: "success",
      message: "Seluruh data awal (102 Siswa, 16 Modul, 240 Soal & Kunci, dll) berhasil dimuat ke semua 15 Google Sheets!",
      recordsCount: count
    });
  }
  
  return respondJSON({
    status: "online",
    name: "LMS Digital LearnStudio Apps Script API",
    school: "SMK Negeri Bojonggambir",
    teacher: "Ruli Lesmana, S.T. Gr",
    timestamp: new Date().toISOString()
  });
}

// Menangani permintaan POST (API Write / Sync Massal)
function doPost(e) {
  try {
    var contents = JSON.parse(e.postData.contents);
    var action = contents.action;
    var payload = contents.payload;

    if (action === "syncAll") {
      var result = syncAllDataToSheets(payload);
      return respondJSON({ status: "success", message: "Seluruh data berhasil disinkronkan ke seluruh 15 tabel Google Sheets", result: result });
    }

    if (action === "saveRecord") {
      var sheetName = contents.sheetName;
      saveRecordToSheet(sheetName, payload);
      return respondJSON({ status: "success", message: "Data berhasil disimpan ke " + sheetName });
    }

    if (action === "deleteRecord") {
      var sheetName = contents.sheetName;
      var id = contents.id;
      deleteRecordFromSheet(sheetName, id);
      return respondJSON({ status: "success", message: "Data ID " + id + " berhasil dihapus dari " + sheetName });
    }

    if (action === "uploadDriveFile") {
      var folderCategory = contents.folderCategory || "Dokumen";
      var fileUrl = uploadFileToDrive(contents.fileName, contents.base64Data, contents.mimeType, folderCategory);
      return respondJSON({ status: "success", fileUrl: fileUrl });
    }

    return respondJSON({ status: "error", message: "Aksi tidak dikenal: " + action });
  } catch (err) {
    return respondJSON({ status: "error", message: err.toString() });
  }
}

function respondJSON(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// Schema Seluruh 15 Sheet
function getSheetsSchema() {
  return {
    "Users": ["ID", "Email", "Role", "Name", "NIP_NIS", "Class", "PhoneWA", "LastLogin"],
    "Siswa": ["ID", "NIS", "Nama", "Gender", "Kelas", "Jurusan", "XP", "Level", "StreakDays", "Badges", "CompletedModules", "Notes"],
    "Kelas": ["ID", "Nama_Kelas", "Jurusan", "Kode", "Tahun_Ajaran", "Jumlah_Siswa"],
    "Materi": ["ID_Materi", "Elemen", "Nama_Elemen", "Modul_Ke", "Judul", "Waktu_Menit", "Tingkat_Kesulitan", "Tujuan_Pembelajaran", "Ringkasan", "Konten_Markdown", "Gambar_Url", "Video_Url", "File_Url", "Status", "Kelas_Tujuan", "Urutan"],
    "Progress_Materi": ["ID_Progress", "ID_Siswa", "ID_Materi", "Status", "Progress_Percent", "Waktu_Mulai", "Waktu_Selesai", "Terakhir_Diakses"],
    "Tugas": ["ID", "Modul_ID", "Judul", "Instruksi", "Tipe_File", "Nilai_Maksimal", "Kelas_Tujuan", "Deadline"],
    "Pengumpulan_Tugas": ["ID", "Tugas_ID", "Modul_ID", "Siswa_ID", "Nama_Siswa", "Kelas_Siswa", "File_Url", "File_Name", "External_Link", "Notes", "Submitted_At", "Status", "Score", "Feedback", "Graded_At"],
    "Bank_Soal": ["ID", "Modul_ID", "Elemen", "Nomor_Soal", "Soal", "Opsi_A", "Opsi_B", "Opsi_C", "Opsi_D", "Kunci_Jawaban", "Index_Jawaban", "Pembahasan", "Bobot"],
    "Ujian": ["ID", "Judul", "Deskripsi", "Durasi_Menit", "Jadwal_Mulai", "Jadwal_Selesai", "Nilai_Maksimal", "Kelas_Tujuan", "Is_Published"],
    "Jawaban_Ujian": ["ID", "Ujian_ID", "Siswa_ID", "Nama_Siswa", "Kelas_Siswa", "Answers_JSON", "Score", "Submitted_At", "Status"],
    "Absensi": ["ID", "Siswa_ID", "Nama_Siswa", "Kelas", "Tanggal", "Login_Pertama", "Login_Terakhir", "Jumlah_Login", "Status"],
    "Nilai": ["ID", "Siswa_ID", "Nama_Siswa", "Kelas", "Nilai_Tugas_Avg", "Nilai_Kuis_Avg", "Nilai_Ujian_Avg", "Nilai_Akhir", "Feedback_Umum"],
    "Pengumuman": ["ID", "Judul", "Konten", "Kelas_Tujuan", "Penulis", "Tanggal", "Is_Pinned"],
    "Pengaturan": ["Key", "Value"],
    "Log_Aktivitas": ["ID", "Timestamp", "Role", "User_Name", "Action", "Details"]
  };
}

// Inisialisasi Seluruh 15 Sheet dengan Format Desain & Header Keren
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
      var range = sheet.getRange(1, 1, 1, schema[sheetName].length);
      range.setFontWeight("bold")
           .setBackground("#0f172a")
           .setFontColor("#38bdf8")
           .setFontFamily("Calibri")
           .setFontSize(11);
      sheet.setFrozenRows(1);
    }
  }
}

/**
 * SEED ALL EXISTING DATA (1-Click Pengisian Seluruh Database)
 * Memasukkan 102 Siswa, 16 Modul, 240 Soal & Kunci Jawaban, Tugas, Kelas, Pengaturan, Nilai, dll.
 */
function seedAllExistingData() {
  initSheets();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var schema = getSheetsSchema();

  function populateSheet(sheetName, headers, records) {
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) return;
    sheet.clearContents();
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length)
         .setFontWeight("bold")
         .setBackground("#0f172a")
         .setFontColor("#38bdf8")
         .setFontFamily("Calibri")
         .setFontSize(11);
    sheet.setFrozenRows(1);

    if (records && records.length > 0) {
      var rows = records.map(function(item) {
        return headers.map(function(h) {
          var val = item[h] !== undefined ? item[h] : item[h.toLowerCase()];
          if (typeof val === 'object' && val !== null) return JSON.stringify(val);
          return val !== undefined ? val : "";
        });
      });
      sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
      sheet.autoResizeColumns(1, Math.min(headers.length, 10));
    }
  }

  // 1. Data Siswa (102 Siswa SMKN Bojonggambir)
  var rawStudents = ${studentsJSON};
  populateSheet("Siswa", schema["Siswa"], rawStudents);

  // 2. Data Materi (16 Modul Informatika Fase E)
  var rawModules = ${modulesJSON};
  populateSheet("Materi", schema["Materi"], rawModules);

  // 3. Data Bank Soal (240 Butir Soal + Kunci & Pembahasan)
  var rawBankSoal = ${bankSoalJSON};
  populateSheet("Bank_Soal", schema["Bank_Soal"], rawBankSoal);

  // 4. Data Tugas (16 Tugas Praktik)
  var rawAssignments = ${assignmentsJSON};
  populateSheet("Tugas", schema["Tugas"], rawAssignments);

  // 5. Data Kelas
  var rawKelas = [
    { ID: "KLS-DKV1", Nama_Kelas: "X DKV 1", Jurusan: "Desain Komunikasi Visual", Kode: "DKV-01", Tahun_Ajaran: "2026/2027", Jumlah_Siswa: 40 },
    { ID: "KLS-DKV2", Nama_Kelas: "X DKV 2", Jurusan: "Desain Komunikasi Visual", Kode: "DKV-02", Tahun_Ajaran: "2026/2027", Jumlah_Siswa: 41 },
    { ID: "KLS-APHP", Nama_Kelas: "X APHP", Jurusan: "Agribisnis Pengolahan Hasil Pertanian", Kode: "APHP-01", Tahun_Ajaran: "2026/2027", Jumlah_Siswa: 21 }
  ];
  populateSheet("Kelas", schema["Kelas"], rawKelas);

  // 6. Data Users
  var rawUsers = [
    { ID: "usr-admin", Email: "admin@smknbojonggambir.sch.id", Role: "Admin", Name: "Administrator LMS", NIP_NIS: "ADMIN", Class: "-", PhoneWA: "081223546686", LastLogin: new Date().toISOString() },
    { ID: "usr-teacher-1", Email: "ruli.lesmana@smknbojonggambir.sch.id", Role: "Guru", Name: "Ruli Lesmana, S.T. Gr", NIP_NIS: "19880512 202221 1 004", Class: "Semua Kelas", PhoneWA: "081223546686", LastLogin: new Date().toISOString() },
    { ID: "usr-student-demo", Email: "siswa@smknbojonggambir.sch.id", Role: "Siswa", Name: "Ahmad Rizky (Demo)", NIP_NIS: "25261001", Class: "X DKV 1", PhoneWA: "-", LastLogin: new Date().toISOString() }
  ];
  populateSheet("Users", schema["Users"], rawUsers);

  // 7. Data Pengaturan
  var rawSettings = [
    { Key: "schoolName", Value: "SMK Negeri Bojonggambir" },
    { Key: "subjectName", Value: "Informatika" },
    { Key: "curriculum", Value: "Kurikulum Merdeka (Edisi Revisi Fase E)" },
    { Key: "teacherName", Value: "Ruli Lesmana, S.T. Gr" },
    { Key: "teacherNip", Value: "19880512 202221 1 004" },
    { Key: "teacherPhoneWA", Value: "081223546686" },
    { Key: "passingScoreThreshold", Value: "75" },
    { Key: "totalModules", Value: "16" },
    { Key: "totalQuestions", Value: "240" },
    { Key: "totalStudents", Value: "102" }
  ];
  populateSheet("Pengaturan", schema["Pengaturan"], rawSettings);

  // 8. Data Pengumuman
  var rawAnnouncements = [
    { ID: "ann-1", Judul: "Selamat Datang di LMS Digital LearnStudio Informatika", Konten: "Silakan pelajari 16 modul ajar mulai dari Berpikir Komputasional (BK-1) hingga Praktik Lintas Bidang (PLB-2). Setiap modul dilengkapi 15 butir kuis evaluasi.", Kelas_Tujuan: "ALL", Penulis: "Ruli Lesmana, S.T. Gr", Tanggal: "2026-08-01", Is_Pinned: true },
    { ID: "ann-2", Judul: "Jadwal Evaluasi & Ujian Tengah Semester", Konten: "Pastikan seluruh tugas praktik modul 1-8 telah dikumpulkan sebelum batas akhir pengumpulan nilai semester.", Kelas_Tujuan: "ALL", Penulis: "Ruli Lesmana, S.T. Gr", Tanggal: "2026-08-15", Is_Pinned: false }
  ];
  populateSheet("Pengumuman", schema["Pengumuman"], rawAnnouncements);

  // 9. Data Ujian
  var rawExams = [
    { ID: "exam-pts", Judul: "Penilaian Tengah Semester (PTS) Informatika Fase E", Deskripsi: "Cakupan Materi Elemen BK, TIK, SK, dan JKI (Modul 1 s.d 8)", Durasi_Menit: 60, Jadwal_Mulai: "2026-09-15 08:00", Jadwal_Selesai: "2026-09-20 17:00", Nilai_Maksimal: 100, Kelas_Tujuan: "ALL", Is_Published: true },
    { ID: "exam-pas", Judul: "Penilaian Akhir Semester (PAS) Informatika Fase E", Deskripsi: "Cakupan Komprehensif Seluruh 8 Elemen (16 Modul)", Durasi_Menit: 90, Jadwal_Mulai: "2026-12-01 08:00", Jadwal_Selesai: "2026-12-10 17:00", Nilai_Maksimal: 100, Kelas_Tujuan: "ALL", Is_Published: true }
  ];
  populateSheet("Ujian", schema["Ujian"], rawExams);

  // 10. Data Nilai Awal Siswa
  var rawGrades = rawStudents.slice(0, 30).map(function(s, idx) {
    return {
      ID: "grade-" + s.ID,
      Siswa_ID: s.ID,
      Nama_Siswa: s.Nama,
      Kelas: s.Kelas,
      Nilai_Tugas_Avg: 85 + (idx % 12),
      Nilai_Kuis_Avg: 80 + (idx % 15),
      Nilai_Ujian_Avg: 82 + (idx % 14),
      Nilai_Akhir: 84 + (idx % 10),
      Feedback_Umum: "Sangat baik dalam pemahaman konsep dan keaktifan praktik"
    };
  });
  populateSheet("Nilai", schema["Nilai"], rawGrades);

  // 11. Data Absensi Awal
  var todayStr = new Date().toISOString().split('T')[0];
  var rawAttendance = rawStudents.map(function(s, idx) {
    return {
      ID: "att-" + s.ID + "-" + todayStr,
      Siswa_ID: s.ID,
      Nama_Siswa: s.Nama,
      Kelas: s.Kelas,
      Tanggal: todayStr,
      Login_Pertama: "07:" + (10 + (idx % 40)) + ":00",
      Login_Terakhir: "12:" + (15 + (idx % 30)) + ":00",
      Jumlah_Login: 2 + (idx % 3),
      Status: "Hadir"
    };
  });
  populateSheet("Absensi", schema["Absensi"], rawAttendance);

  // 12. Data Log Aktivitas Awal
  var rawLogs = [
    { ID: "log-init-1", Timestamp: new Date().toISOString(), Role: "Guru", User_Name: "Ruli Lesmana, S.T. Gr", Action: "Inisialisasi Database", Details: "Memuat 102 siswa, 16 modul, dan 240 soal ke Google Sheets" },
    { ID: "log-init-2", Timestamp: new Date().toISOString(), Role: "Siswa", User_Name: "Ahmad Rizky", Action: "Membuka materi", Details: "Mempelajari Modul BK-1 Berpikir Komputasional" }
  ];
  populateSheet("Log_Aktivitas", schema["Log_Aktivitas"], rawLogs);

  return {
    students: rawStudents.length,
    modules: rawModules.length,
    questions: rawBankSoal.length,
    assignments: rawAssignments.length,
    classes: rawKelas.length
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

function fetchSingleSheetData(sheetName) {
  initSheets();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];
  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];
  var headers = data[0];
  var rows = [];
  for (var i = 1; i < data.length; i++) {
    var rowObj = {};
    for (var j = 0; j < headers.length; j++) {
      rowObj[headers[j]] = data[i][j];
    }
    rows.push(rowObj);
  }
  return rows;
}

function syncAllDataToSheets(payload) {
  initSheets();
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  function replaceTableData(sheetName, headers, records) {
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) return;
    sheet.clearContents();
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length)
         .setFontWeight("bold")
         .setBackground("#0f172a")
         .setFontColor("#38bdf8");
    sheet.setFrozenRows(1);

    if (records && records.length > 0) {
      var rows = records.map(function(item) {
        return headers.map(function(h) {
          var val = item[h] !== undefined ? item[h] : item[h.toLowerCase()];
          if (typeof val === 'object' && val !== null) return JSON.stringify(val);
          return val !== undefined ? val : "";
        });
      });
      sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
      sheet.autoResizeColumns(1, Math.min(headers.length, 10));
    }
  }

  var schema = getSheetsSchema();
  if (payload.users) replaceTableData("Users", schema["Users"], payload.users);
  if (payload.students) replaceTableData("Siswa", schema["Siswa"], payload.students);
  if (payload.classes) replaceTableData("Kelas", schema["Kelas"], payload.classes);
  if (payload.materials) replaceTableData("Materi", schema["Materi"], payload.materials);
  if (payload.materialProgress) replaceTableData("Progress_Materi", schema["Progress_Materi"], payload.materialProgress);
  if (payload.assignments) replaceTableData("Tugas", schema["Tugas"], payload.assignments);
  if (payload.submissions) replaceTableData("Pengumpulan_Tugas", schema["Pengumpulan_Tugas"], payload.submissions);
  if (payload.bankSoal) replaceTableData("Bank_Soal", schema["Bank_Soal"], payload.bankSoal);
  if (payload.exams) replaceTableData("Ujian", schema["Ujian"], payload.exams);
  if (payload.examAnswers || payload.quizResults) replaceTableData("Jawaban_Ujian", schema["Jawaban_Ujian"], payload.examAnswers || payload.quizResults);
  if (payload.attendance) replaceTableData("Absensi", schema["Absensi"], payload.attendance);
  if (payload.grades) replaceTableData("Nilai", schema["Nilai"], payload.grades);
  if (payload.announcements) replaceTableData("Pengumuman", schema["Pengumuman"], payload.announcements);
  if (payload.settings) replaceTableData("Pengaturan", schema["Pengaturan"], payload.settings);
  if (payload.activityLogs) replaceTableData("Log_Aktivitas", schema["Log_Aktivitas"], payload.activityLogs);

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

  var data = sheet.getDataRange().getValues();
  var idIndex = schema.indexOf("ID") >= 0 ? schema.indexOf("ID") : (schema.indexOf("ID_Materi") >= 0 ? schema.indexOf("ID_Materi") : (schema.indexOf("Key") >= 0 ? schema.indexOf("Key") : 0));
  var existingRowIndex = -1;

  var checkId = record.id || record.ID || record.ID_Materi || record.Key || record.key;

  for (var i = 1; i < data.length; i++) {
    if (data[i][idIndex] == checkId) {
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
  var parentFolderName = "LMS_Digital_LearnStudio_Bojonggambir";
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
};

export const GASService = {
  // Generate code dynamically with all current datasets
  getBackendGSCode(): string {
    return generateCompleteGASCode();
  },

  // Prepare full database payload spanning all 15 sheets
  prepareFullDatabasePayload() {
    const rawStudents = StorageService.getStudents();
    const rawClasses = StorageService.getClasses();
    const rawUsers = StorageService.getUsers();
    const rawAnnouncements = StorageService.getAnnouncements();
    const rawSettings = StorageService.getSettings();
    const rawExams = StorageService.getExams();
    const rawSubmissions = StorageService.getSubmissions();
    const rawQuizResults = StorageService.getQuizResults();
    const rawPresensi = StorageService.getPresensiOtomatis();
    const rawGrades = StorageService.getStudentGrades();
    const rawProgress = StorageService.getMaterialProgress();
    const rawActivities = StorageService.getAktivitasSiswa();

    // 240 questions
    const bankSoalArray: any[] = [];
    allModulesData.forEach((m) => {
      const qData = allQuizzesData[m.id];
      if (qData && qData.questions) {
        qData.questions.forEach((q, idx) => {
          const optionLabels = ['A', 'B', 'C', 'D'];
          bankSoalArray.push({
            ID: q.id || `${m.id}-Q${idx + 1}`,
            Modul_ID: m.id,
            Elemen: m.elementId,
            Nomor_Soal: idx + 1,
            Soal: q.question,
            Opsi_A: q.options[0] || '',
            Opsi_B: q.options[1] || '',
            Opsi_C: q.options[2] || '',
            Opsi_D: q.options[3] || '',
            Kunci_Jawaban: optionLabels[q.correctAnswer] || 'A',
            Index_Jawaban: q.correctAnswer,
            Pembahasan: q.explanation || '',
            Bobot: 1,
          });
        });
      }
    });

    const assignmentsArray = Object.values(assignmentsData).map((a) => ({
      ID: a.id,
      Modul_ID: a.moduleId,
      Judul: a.title,
      Instruksi: a.instruction,
      Tipe_File: (a.allowedTypes || []).join(', '),
      Nilai_Maksimal: a.maxScore || 100,
      Kelas_Tujuan: 'ALL',
      Deadline: a.deadline || '2026-12-31',
    }));

    return {
      users: rawUsers.map((u) => ({
        ID: u.id_user,
        Email: u.email || '',
        Role: u.role,
        Name: u.nama,
        NIP_NIS: u.nis || '-',
        Class: u.classGroup || '-',
        PhoneWA: '-',
        LastLogin: u.last_login || new Date().toISOString(),
      })),
      students: rawStudents.map((s) => ({
        ID: s.id,
        NIS: s.nis,
        Nama: s.name,
        Gender: s.gender || 'L',
        Kelas: s.classGroup,
        Jurusan: s.jurusan || (s.classGroup === 'X APHP' ? 'APHP' : 'DKV'),
        XP: s.xp,
        Level: s.level,
        StreakDays: s.streakDays,
        Badges: JSON.stringify(s.badges || []),
        CompletedModules: JSON.stringify(s.completedModuleIds || []),
        Notes: JSON.stringify(s.notes || {}),
      })),
      classes: (rawClasses.length > 0 ? rawClasses : initialClasses).map((c) => ({
        ID: c.id,
        Nama_Kelas: c.name,
        Jurusan: c.code.includes('DKV') ? 'Desain Komunikasi Visual' : 'Agribisnis Pengolahan Hasil Pertanian',
        Kode: c.code,
        Tahun_Ajaran: c.academicYear,
        Jumlah_Siswa: c.studentCount || 0,
      })),
      materials: allModulesData.map((m) => ({
        ID_Materi: m.id,
        Elemen: m.elementId,
        Nama_Elemen: m.elementName,
        Modul_Ke: m.moduleNumber,
        Judul: m.title,
        Waktu_Menit: m.estimatedTimeMinutes,
        Tingkat_Kesulitan: m.difficulty,
        Tujuan_Pembelajaran: (m.objectives || []).join(' | '),
        Ringkasan: m.summary,
        Konten_Markdown: m.contentMarkdown ? m.contentMarkdown.slice(0, 3000) : '',
        Gambar_Url: m.imageUrl || '',
        Video_Url: m.videoUrl || '',
        File_Url: m.pdfUrl || '',
        Status: m.status || 'published',
        Kelas_Tujuan: m.targetClass || 'ALL',
        Urutan: m.urutan || m.moduleNumber,
      })),
      materialProgress: rawProgress.map((p) => ({
        ID_Progress: p.id,
        ID_Siswa: p.studentId,
        ID_Materi: p.moduleId,
        Status: p.status,
        Progress_Percent: p.progressPercent,
        Waktu_Mulai: p.startTime || '',
        Waktu_Selesai: p.completedTime || '',
        Terakhir_Diakses: p.lastAccessed,
      })),
      assignments: assignmentsArray,
      submissions: rawSubmissions.map((sub) => ({
        ID: sub.id,
        Tugas_ID: sub.assignmentId,
        Modul_ID: sub.moduleId,
        Siswa_ID: sub.studentId,
        Nama_Siswa: sub.studentName,
        Kelas_Siswa: sub.studentClass,
        File_Url: sub.fileUrl || '',
        File_Name: sub.fileName || '',
        External_Link: sub.externalLink || '',
        Notes: sub.notes || '',
        Submitted_At: sub.submittedAt,
        Status: sub.status,
        Score: sub.score ?? '',
        Feedback: sub.feedback || '',
        Graded_At: sub.gradedAt || '',
      })),
      bankSoal: bankSoalArray,
      exams: rawExams.map((e) => ({
        ID: e.id,
        Judul: e.title,
        Deskripsi: e.description,
        Durasi_Menit: e.durationMinutes,
        Jadwal_Mulai: e.startSchedule,
        Jadwal_Selesai: e.endSchedule,
        Nilai_Maksimal: e.maxScore,
        Kelas_Tujuan: e.targetClass,
        Is_Published: e.isPublished,
      })),
      examAnswers: rawQuizResults.map((qr) => ({
        ID: qr.id,
        Ujian_ID: qr.moduleId,
        Siswa_ID: qr.studentId,
        Nama_Siswa: '',
        Kelas_Siswa: '',
        Answers_JSON: JSON.stringify({ correctCount: qr.correctCount, total: qr.totalQuestions, passed: qr.passed }),
        Score: qr.score,
        Submitted_At: qr.attemptDate,
        Status: qr.passed ? 'Lulus' : 'Remedial',
      })),
      attendance: rawPresensi.map((att) => ({
        ID: att.id_presensi,
        Siswa_ID: att.id_siswa,
        Nama_Siswa: att.nama_siswa,
        Kelas: att.classGroup,
        Tanggal: att.tanggal,
        Login_Pertama: att.login_pertama,
        Login_Terakhir: att.login_terakhir,
        Jumlah_Login: att.jumlah_login,
        Status: att.status,
      })),
      grades: rawGrades.map((g) => {
        const scoreValues = Object.values(g.scores || {}).filter((v): v is number => typeof v === 'number');
        const avg = scoreValues.length > 0 ? Math.round(scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length) : '';
        return {
          ID: g.id || `grade-${g.studentId}`,
          Siswa_ID: g.studentId,
          Nama_Siswa: g.studentName,
          Kelas: g.classGroup,
          Nilai_Tugas_Avg: avg,
          Nilai_Kuis_Avg: avg,
          Nilai_Ujian_Avg: avg,
          Nilai_Akhir: avg,
          Feedback_Umum: g.teacherNotes || 'Aktif dalam pembelajaran',
        };
      }),
      announcements: (rawAnnouncements.length > 0 ? rawAnnouncements : initialAnnouncements).map((ann) => ({
        ID: ann.id,
        Judul: ann.title,
        Konten: ann.content,
        Kelas_Tujuan: ann.targetClass,
        Penulis: ann.author,
        Tanggal: ann.date,
        Is_Pinned: ann.isPinned,
      })),
      settings: Object.entries(rawSettings).map(([k, v]) => ({
        Key: k,
        Value: typeof v === 'object' ? JSON.stringify(v) : String(v),
      })),
      activityLogs: rawActivities.slice(0, 200).map((act) => ({
        ID: act.id_aktivitas,
        Timestamp: act.created_at || `${act.tanggal} ${act.waktu}`,
        Role: 'SISWA',
        User_Name: act.nama_siswa,
        Action: act.jenis_aktivitas,
        Details: `${act.deskripsi} (${act.classGroup})`,
      })),
    };
  },

  // Fetch sheet data
  async fetchSheetData(apiUrl: string, sheetName: string): Promise<{ success: boolean; data?: any[]; error?: string }> {
    if (!apiUrl || !apiUrl.startsWith('http')) {
      return { success: false, error: 'URL Google Apps Script belum diisi.' };
    }
    try {
      const response = await fetch(`${apiUrl}?action=getSheetData&sheetName=${encodeURIComponent(sheetName)}`);
      const res = await response.json();
      if (res.status === 'success' || res.data) {
        return { success: true, data: res.data || [] };
      }
      return { success: false, error: res.message || 'Gagal mengambil data sheet.' };
    } catch (e: any) {
      return { success: false, error: e.message || String(e) };
    }
  },

  // Save single record to a sheet (using text/plain to avoid CORS preflight options blocking)
  async saveRecord(apiUrl: string, sheetName: string, record: any): Promise<{ success: boolean; error?: string }> {
    if (!apiUrl || !apiUrl.startsWith('http')) return { success: false, error: 'No URL' };
    try {
      await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'saveRecord',
          sheetName,
          payload: record,
        }),
      });
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  },

  // Delete single record
  async deleteRecord(apiUrl: string, sheetName: string, id: string): Promise<{ success: boolean; error?: string }> {
    if (!apiUrl || !apiUrl.startsWith('http')) return { success: false, error: 'No URL' };
    try {
      await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'deleteRecord',
          sheetName,
          id,
        }),
      });
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  },

  // Sync data to Google Apps Script if endpoint is configured
  async syncToSheets(apiUrl: string, payload: any): Promise<{ success: boolean; message: string }> {
    if (!apiUrl || !apiUrl.startsWith('http')) {
      return { success: false, message: 'URL Google Apps Script belum diisi atau format URL salah.' };
    }
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'syncAll',
          payload: payload,
        }),
      });
      const resData = await response.json();
      if (resData.status === 'success') {
        return { success: true, message: 'Seluruh 15 sheet & tabel berhasil disinkronkan ke Google Spreadsheet!' };
      }
      return { success: false, message: resData.message || 'Gagal sinkronisasi data.' };
    } catch (e: any) {
      console.warn('Google Sheets Sync failed:', e);
      return { success: false, message: `Gagal sinkronisasi: ${e.message || e}` };
    }
  },

  // Trigger remote seed in Apps Script
  async seedRemoteSheets(apiUrl: string): Promise<{ success: boolean; message: string }> {
    if (!apiUrl || !apiUrl.startsWith('http')) {
      return { success: false, message: 'URL Apps Script belum diatur.' };
    }
    try {
      const response = await fetch(`${apiUrl}?action=seedAll`);
      const data = await response.json();
      if (data.status === 'success') {
        return { success: true, message: data.message || 'Seluruh data awal (15 Sheet) berhasil di-seed ke Google Sheets!' };
      }
      return { success: false, message: data.message || 'Gagal seed data.' };
    } catch (e: any) {
      return { success: false, message: `Gagal menjalankan seed: ${e.message || e}` };
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
        return { success: true, message: `Koneksi Berhasil! Terhubung ke ${data.name || 'Google Apps Script'} (${data.school || ''})` };
      }
      return { success: false, message: `Respon server tidak valid: ${JSON.stringify(data)}` };
    } catch (e: any) {
      return { success: false, message: `Gagal terhubung ke Google Apps Script: ${e.message || e}` };
    }
  },

  // Export ready-to-run Code.gs file
  downloadGASFile() {
    const code = generateCompleteGASCode();
    const blob = new Blob([code], { type: 'text/javascript;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Code_LMS_Bojonggambir_${new Date().toISOString().split('T')[0]}.gs`;
    a.click();
  },
};
