// ================================================================
// ManualTools.gs — Generate PDF + Kirim Email manual (TIESF 2027)
// File terpisah, memakai fungsi yang sudah ada di Email.gs
// (_buildPDF, _sendBrevo, _htmlRegist, _htmlLoA, _htmlWarning, _htmlInvoice)
// TIDAK mengubah Email.gs/Config.gs/CheckDuplicate.gs.
// ================================================================

// ── Generate PDF + kirim email, untuk 1 baris, 1 jenis email ──────
// sheetName : 'Indo-Online' | 'Indo-Offline' | 'Inter-Online' | 'Inter-Offline'
// rowNumber : nomor baris di spreadsheet (baris 2 = data pertama)
// emailType : 'regist' | 'loa' | 'warning' | 'invoice'
function generateAndSendManual(sheetName, rowNumber, emailType) {
  var ss  = SpreadsheetApp.openById(CFG.SHEET_ID);
  var cfg = CFG.SHEETS[sheetName];
  if (!cfg) { Logger.log('Config sheet tidak ditemukan: ' + sheetName); return; }

  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) { Logger.log('Sheet tidak ditemukan: ' + sheetName); return; }

  var row   = sheet.getRange(rowNumber, 1, 1, sheet.getLastColumn()).getValues()[0];
  var email = row[cfg.emailCol];
  var noReg = row[0];

  if (!email) { Logger.log('[' + sheetName + ' baris ' + rowNumber + '] Email kosong, dibatalkan.'); return; }

  var colIdx, subject, html, pdfName;

  if (emailType === 'regist') {
    colIdx  = cfg.colEmail1;
    subject = cfg.subjectRegist;
    html    = _htmlRegist(row, cfg);
    pdfName = 'DataRegist_' + noReg + '.pdf';
  } else if (emailType === 'loa') {
    colIdx  = cfg.colEmail2;
    subject = cfg.subjectLoA;
    html    = _htmlLoA(row, cfg);
    pdfName = 'Letter_of_Acceptance_' + noReg + '.pdf';
  } else if (emailType === 'warning') {
    colIdx  = cfg.colEmail2;
    subject = cfg.subjectWarning;
    html    = _htmlWarning(cfg);
    pdfName = null; // warning tidak pakai lampiran PDF
  } else if (emailType === 'invoice') {
    if (!cfg.colEmail3) {
      Logger.log('[' + sheetName + '] Sheet ini tidak punya kolom Invoice (colEmail3 null di Config.gs) — dibatalkan.');
      return;
    }
    colIdx  = cfg.colEmail3;
    subject = cfg.subjectInvoice;
    html    = _htmlInvoice(row, cfg);
    pdfName = 'Invoice_' + noReg + '.pdf';
  } else {
    Logger.log('emailType tidak dikenal: ' + emailType);
    return;
  }

  // 1) Generate PDF dari template (skip untuk warning, karena tidak ada PDF)
  var pdf = null;
  if (emailType !== 'warning') {
    pdf = _buildPDF(row, cfg, emailType);
    if (!pdf) {
      Logger.log('[' + noReg + '] Gagal generate PDF (' + emailType + ') — cek template/folder ID di Config.gs untuk ' + sheetName);
      return;
    }
  }

  // 2) Kirim email dengan PDF yang baru dibuat
  sheet.getRange(rowNumber, colIdx).setValue('Resending...');
  _sendBrevo(sheet, cfg, row, rowNumber, colIdx, email, {
    subject: subject,
    html:    html,
    pdf:     pdf,
    pdfName: pdfName,
  });

  Logger.log('[Manual] ' + sheetName + ' baris ' + rowNumber + ' (' + emailType + ') → ' + email);
}

// ── Generate + kirim SEMUA jenis (Regist, LoA, Invoice) untuk 1 baris ──
// Warning TIDAK ikut di sini karena itu alternatif LoA, bukan tambahan.
function generateAndSendAllManual(sheetName, rowNumber) {
  generateAndSendManual(sheetName, rowNumber, 'regist');
  Utilities.sleep(1200);
  generateAndSendManual(sheetName, rowNumber, 'loa');
  Utilities.sleep(1200);
  generateAndSendManual(sheetName, rowNumber, 'invoice');
}

// ── Generate + kirim untuk BANYAK baris sekaligus (1 sheet, 1 jenis) ──
// startRow, endRow : rentang baris (inklusif), cth 2, 20
function generateAndSendBatchManual(sheetName, emailType, startRow, endRow) {
  var count = 0;
  for (var r = startRow; r <= endRow; r++) {
    generateAndSendManual(sheetName, r, emailType);
    count++;
    Utilities.sleep(1200); // jeda antar-request, hindari rate-limit Brevo
  }
  Logger.log('Batch selesai: ' + count + ' baris diproses untuk ' + sheetName + ' (' + emailType + ').');
}

// ================================================================
// ── VERSI "PILIH DI SPREADSHEET" ───────────────────────────────
// Klik satu sel di baris data yang mau diproses, lalu jalankan salah
// satu fungsi di bawah dari editor Apps Script. Sheet & baris otomatis
// diambil dari sel yang sedang kamu klik — tidak perlu ketik manual.
// ================================================================

function _getSelectedSheetAndRow() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var row   = SpreadsheetApp.getActiveRange().getRow();
  var sheetName = sheet.getName();

  if (!CFG.SHEETS[sheetName]) {
    throw new Error('Sheet aktif "' + sheetName + '" bukan Indo-Online/Indo-Offline/Inter-Online/Inter-Offline. Klik dulu sel di salah satu sheet itu.');
  }
  if (row < 2) {
    throw new Error('Baris yang dipilih adalah header. Klik sel di baris data (baris 2 ke bawah).');
  }
  return { sheetName: sheetName, row: row };
}

function sendRegistFromSelection() {
  var sel = _getSelectedSheetAndRow();
  generateAndSendManual(sel.sheetName, sel.row, 'regist');
}

function sendLoaFromSelection() {
  var sel = _getSelectedSheetAndRow();
  generateAndSendManual(sel.sheetName, sel.row, 'loa');
}

function sendWarningFromSelection() {
  var sel = _getSelectedSheetAndRow();
  generateAndSendManual(sel.sheetName, sel.row, 'warning');
}

function sendInvoiceFromSelection() {
  var sel = _getSelectedSheetAndRow();
  generateAndSendManual(sel.sheetName, sel.row, 'invoice');
}

function sendAllFromSelection() {
  var sel = _getSelectedSheetAndRow();
  generateAndSendAllManual(sel.sheetName, sel.row);
}


// ── Kirim Invoice manual TANPA menulis status ke sheet ────────────
// Khusus untuk sheet yang colEmail3-nya null (misal Inter-Offline).
// PDF diambil dari yang SUDAH di-generate sebelumnya (via generatePdfOnly)

function sendInvoiceNoStatusColumn(sheetName, rowNumber) {
  var ss  = SpreadsheetApp.openById(CFG.SHEET_ID);
  var cfg = CFG.SHEETS[sheetName];
  if (!cfg) { Logger.log('Config sheet tidak ditemukan: ' + sheetName); return; }

  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) { Logger.log('Sheet tidak ditemukan: ' + sheetName); return; }

  var row   = sheet.getRange(rowNumber, 1, 1, sheet.getLastColumn()).getValues()[0];
  var email = row[cfg.emailCol];
  var noReg = row[0];

  if (!email) { Logger.log('[' + sheetName + ' baris ' + rowNumber + '] Email kosong, dibatalkan.'); return; }

  // Generate ulang PDF-nya (aman dipanggil lagi walau sudah pernah generate sebelumnya)
  var pdf = _buildPDF(row, cfg, 'invoice');
  if (!pdf) {
    Logger.log('[' + noReg + '] Gagal generate PDF invoice — cek template/folder ID di Config.gs.');
    return;
  }

  var payload = {
    sender:      CFG.BREVO_SENDER,
    to:          [{ email: email }],
    subject:     cfg.subjectInvoice,
    htmlContent: _htmlInvoice(row, cfg),
    attachment:  [{
      content: Utilities.base64Encode(pdf.getBytes()),
      name:    'Invoice_' + noReg + '.pdf',
    }],
  };

  try {
    var res    = UrlFetchApp.fetch(CFG.BREVO_URL, {
      method:      'post',
      contentType: 'application/json',
      headers:     { 'api-key': CFG.BREVO_API_KEY },
      payload:     JSON.stringify(payload),
    });
    var result = JSON.parse(res.getContentText());
    var status = res.getResponseCode() === 201
      ? 'Success: ' + result.messageId
      : 'Failed: ' + result.message;
    Logger.log('[' + noReg + '] Invoice → ' + email + ' | ' + status);
  } catch (err) {
    Logger.log('[' + noReg + '] Error kirim Invoice ke ' + email + ': ' + err.message);
  }
}



// ── Contoh pemanggilan manual — edit sesuai kebutuhan, lalu Run ───






// ================================================================
// ── GENERATE PDF SAJA (TANPA KIRIM EMAIL) ──────────────────────
// ================================================================

// ── Generate 1 jenis PDF untuk 1 baris, TANPA kirim email ─────────
// sheetName : 'Indo-Online' | 'Indo-Offline' | 'Inter-Online' | 'Inter-Offline'
// rowNumber : nomor baris di spreadsheet (baris 2 = data pertama)
// pdfType   : 'regist' | 'loa' | 'invoice'
function generatePdfOnly(sheetName, rowNumber, pdfType) {
  var ss  = SpreadsheetApp.openById(CFG.SHEET_ID);
  var cfg = CFG.SHEETS[sheetName];
  if (!cfg) { Logger.log('Config sheet tidak ditemukan: ' + sheetName); return; }

  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) { Logger.log('Sheet tidak ditemukan: ' + sheetName); return; }

  var row   = sheet.getRange(rowNumber, 1, 1, sheet.getLastColumn()).getValues()[0];
  var noReg = row[0];

  if (pdfType !== 'regist' && pdfType !== 'loa' && pdfType !== 'invoice') {
    Logger.log('pdfType tidak dikenal: ' + pdfType);
    return;
  }

  var pdf = _buildPDF(row, cfg, pdfType);
  if (!pdf) {
    Logger.log('[' + noReg + '] Gagal generate PDF (' + pdfType + ') — cek template/folder ID di Config.gs untuk ' + sheetName);
    return;
  }

  Logger.log('[' + noReg + '] PDF ' + pdfType + ' berhasil dibuat & tersimpan di folder (' + sheetName + '). Email TIDAK dikirim.');
}

// ── Generate SEMUA jenis PDF (Regist+LoA+Invoice) untuk 1 baris, tanpa kirim ──
function generateAllPdfOnly(sheetName, rowNumber) {
  generatePdfOnly(sheetName, rowNumber, 'regist');
  generatePdfOnly(sheetName, rowNumber, 'loa');
  generatePdfOnly(sheetName, rowNumber, 'invoice');
}

// ── Generate PDF untuk BANYAK baris sekaligus, tanpa kirim ─────────
// startRow, endRow : rentang baris (inklusif), cth 2, 20
function generatePdfBatchOnly(sheetName, pdfType, startRow, endRow) {
  var count = 0;
  for (var r = startRow; r <= endRow; r++) {
    generatePdfOnly(sheetName, r, pdfType);
    count++;
    Utilities.sleep(500); // jeda ringan, hindari timeout Docs/Drive API
  }
  Logger.log('Batch selesai: ' + count + ' baris diproses untuk ' + sheetName + ' (' + pdfType + '), email TIDAK dikirim.');
}

// ── Versi "klik sel di spreadsheet" — generate PDF saja ────────────
function generateRegistPdfFromSelection() {
  var sel = _getSelectedSheetAndRow();
  generatePdfOnly(sel.sheetName, sel.row, 'regist');
}

function generateLoaPdfFromSelection() {
  var sel = _getSelectedSheetAndRow();
  generatePdfOnly(sel.sheetName, sel.row, 'loa');
}

function generateInvoicePdfFromSelection() {
  var sel = _getSelectedSheetAndRow();
  generatePdfOnly(sel.sheetName, sel.row, 'invoice');
}

function generateAllPdfFromSelection() {
  var sel = _getSelectedSheetAndRow();
  generateAllPdfOnly(sel.sheetName, sel.row);
}

// ========================== UBAH INI UNTUK MENJALANKAN FUNGSI2 DI ATAS, SESUAIKAN DENGAN KEBUTUHAN ==================================

function test2() {
  // generatePdfOnly('Inter-Offline', 2, 'invoice');      // 1 baris, 1 jenis
  generateAllPdfOnly('Inter-Offline', 2);                 // 1 baris, semua jenis
  // generatePdfBatchOnly('Inter-Online', 'regist', 2, 20); // banyak baris sekaligus
}

function buatDanKirimSurat() {
  generateAndSendAllManual('Inter-Online', 3);
}

function buatSajaInvoice() {
  generatePdfOnly('Inter-Offline', 2, 'invoice');
}

function buatDanKirimInvoiceManual() {
  sendInvoiceNoStatusColumn('Inter-Offline', 2);
}
