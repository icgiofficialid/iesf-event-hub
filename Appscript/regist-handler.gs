// ================================================================
// Regist-Handler.gs — Handler form registrasi TIESF 2027
// ================================================================
// FIX:
//  - Anti double-entry: cek email+judul sebelum insert
//  - Email registrasi langsung dikirim saat submitted (tidak tunggu trigger)
//  - Lock lebih ketat untuk cegah race condition
// ================================================================

var SPREADSHEET_ID = '';

// ── CORS helper ───────────────────────────────────────────────────
function corsOutput(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function doOptions(e) { return corsOutput({ result: 'ok' }); }
function doGet(e)     { return handleRequest(e); }
function doPost(e)    { return handleRequest(e); }

function handleRequest(e) {
  var lock = LockService.getScriptLock();
  // Tunggu hingga 30 detik untuk dapat lock — cegah race condition
  var acquired = lock.tryLock(30000);
  if (!acquired) {
    return corsOutput({ result: 'error', error: 'Server sedang sibuk, coba lagi.' });
  }

  try {
    var sheetTarget = e.parameter['sheetTarget'];
    var sheetName;

    if      (sheetTarget === 'indo-online')   sheetName = 'Indo-Online';
    else if (sheetTarget === 'indo-offline')  sheetName = 'Indo-Offline';
    else if (sheetTarget === 'inter-online')  sheetName = 'Inter-Online';
    else if (sheetTarget === 'inter-offline') sheetName = 'Inter-Offline';
    else throw new Error('sheetTarget tidak dikenal: ' + sheetTarget);

    var doc   = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = doc.getSheetByName(sheetName);
    if (!sheet) throw new Error('Sheet tidak ditemukan: ' + sheetName);

    var headers  = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var lastRow  = sheet.getLastRow();

    // ── Anti double-entry: cek email + judul sudah ada ───────────
    var emailHeader = sheetName.includes('Indo') ? 'LEADER_EMAIL' : 'LEADER_EMAIL';
    var judulHeader = 'PROJECT_TITLE';
    var emailIdx    = headers.indexOf(emailHeader);
    var judulIdx    = headers.indexOf(judulHeader);
    var incomingEmail = (e.parameter[emailHeader] || '').trim().toLowerCase();
    var incomingJudul = (e.parameter[judulHeader] || '').trim().toLowerCase();

    if (lastRow >= 2 && emailIdx > -1 && judulIdx > -1 && incomingEmail && incomingJudul) {
      var existingData = sheet.getRange(2, emailIdx + 1, lastRow - 1, 1).getValues();
      var existingJudul = sheet.getRange(2, judulIdx + 1, lastRow - 1, 1).getValues();
      for (var r = 0; r < existingData.length; r++) {
        var existEmail = (existingData[r][0] || '').toString().trim().toLowerCase();
        var existJudul = (existingJudul[r][0] || '').toString().trim().toLowerCase();
        if (existEmail === incomingEmail && existJudul === incomingJudul) {
          Logger.log('Double entry dicegah: ' + incomingEmail + ' | ' + incomingJudul);
          return corsOutput({
            result: 'duplicate',
            message: 'Data dengan email dan judul yang sama sudah terdaftar.'
          });
        }
      }
    }

    // ── Insert baris baru ─────────────────────────────────────────
    var nextRow = sheet.getLastRow() + 1;
    var newRow  = headers.map(function(header) {
      if (header === 'timestamp') return new Date();
      if (header === 'No Regis')  return nextRow - 1;
      return e.parameter[header] || '';
    });
    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    // ── Buat folder Drive ─────────────────────────────────────────
    var folderId  = createDriveFolder1(e.parameter);
    var folder    = DriveApp.getFolderById(folderId);
    var folderUrl = folder.getUrl();

    var urlColumnIndex = headers.indexOf('URL_FOLDER');
    if (urlColumnIndex !== -1) {
      sheet.getRange(nextRow, urlColumnIndex + 1).setValue(folderUrl);
    }

    // ── Langsung kirim email registrasi sukses ────────────────────
    // Tidak perlu tunggu trigger 1 jam — dikirim sekarang juga
    try {
      _sendRegistEmailNow(sheetName, nextRow, sheet, headers, newRow, folderUrl);
    } catch (emailErr) {
      // Jika email gagal, data tetap tersimpan — jangan batalkan registrasi
      Logger.log('Email registrasi gagal (data tetap tersimpan): ' + emailErr.toString());
    }

    return corsOutput({
      result: 'success',
      row: nextRow,
      sheet: sheetName,
      folderId: folderId,
      folderUrl: folderUrl
    });

  } catch (err) {
    Logger.log('handleRequest error: ' + err.toString());
    return corsOutput({ result: 'error', error: err.toString() });

  } finally {
    lock.releaseLock();
  }
}

// ── Kirim email registrasi langsung (tanpa tunggu trigger) ────────
function _sendRegistEmailNow(sheetName, rowIdx, sheet, headers, rowData, folderUrl) {
  // Ambil config dari CFG (file Config.gs harus ada di project yang sama)
  var cfg = CFG.SHEETS[sheetName];
  if (!cfg) { Logger.log('CFG tidak ditemukan untuk: ' + sheetName); return; }

  var email = rowData[cfg.emailCol];
  if (!email) { Logger.log('Email kosong, skip kirim registrasi.'); return; }

  // Cek apakah email 1 sudah terisi (hindari kirim 2x jika trigger sudah jalan)
  var status1 = sheet.getRange(rowIdx, cfg.colEmail1).getValue();
  if (status1) { Logger.log('Email 1 sudah terisi, skip.'); return; }

  // Buat PDF registrasi
  var pdf = _buildPDF(rowData, cfg, 'regist');

  // Kirim via Brevo
  var noRegist = rowData[0];
  var mode     = sheetName.includes('Online') ? 'Online' : 'Offline';
  var isIndo   = cfg.lang === 'id';

  var htmlBody = isIndo
    ? '<p>Dear, Peserta</p>' +
      '<p>Selamat! Tim Anda telah berhasil mendaftar di TIESF 2027.</p>' +
      '<p>Nomor Registrasi TIESF ' + mode + ': <strong>' + noRegist + '</strong></p>' +
      '<hr><p style="color:red;font-weight:bold;">⚠️ Email ini dikirimkan secara otomatis. Mohon <u>tidak membalas email ini</u>.</p>'
    : '<p>Dear Participant,</p>' +
      '<p>Congratulations! Your team has been successfully registered for TIESF 2027.</p>' +
      '<p>Your Registration Number (' + mode + '): <strong>' + noRegist + '</strong></p>' +
      '<hr><p style="color:red;font-weight:bold;">⚠️ This email is sent automatically. Please <u>do not reply</u> to this email.</p>';

  var payload = {
    sender:      CFG.BREVO_SENDER,
    to:          [{ email: email }],
    subject:     cfg.subjectRegist,
    htmlContent: htmlBody,
  };

  if (pdf) {
    payload.attachment = [{
      content: Utilities.base64Encode(pdf.getBytes()),
      name:    'DataRegist_' + noRegist + '.pdf'
    }];
  }

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

  // Tulis status ke sheet
  sheet.getRange(rowIdx, cfg.colEmail1).setValue(status);
  Logger.log('[' + noRegist + '] Email registrasi → ' + email + ' | ' + status);
}