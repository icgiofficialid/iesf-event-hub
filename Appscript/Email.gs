// ================================================================
// Email.gs — Kirim email (Regist, LoA, Warning, Invoice) + buat PDF
//            Berlaku untuk semua sheet TIESF
// ================================================================

// ── Entry points (dipanggil dari Trigger.gs) ─────────────────────
function sendEmailsTIESF_Indo()  { _processEmails(['Indo-Online',  'Indo-Offline']);  }
function sendEmailsTIESF_Inter() { _processEmails(['Inter-Online', 'Inter-Offline']); }

// ── Core email processor ──────────────────────────────────────────
function _processEmails(sheetNames) {
  const ss  = SpreadsheetApp.openById(CFG.SHEET_ID);
  const now = new Date();

  sheetNames.forEach(sheetName => {
    const cfg   = CFG.SHEETS[sheetName];
    const sheet = ss.getSheetByName(sheetName);
    if (!sheet) { Logger.log(`Sheet "${sheetName}" tidak ditemukan.`); return; }

    const data = sheet.getDataRange().getValues();

    for (let i = 1; i < data.length; i++) {
      const row         = data[i];
      const email       = row[cfg.emailCol];
      const timestamp   = new Date(row[1]);
      const elapsedHrs = (now - timestamp) / 3600000;
      const statusDup   = row[cfg.statusDupCol];
      const status1     = row[cfg.colEmail1 - 1];
      const status2     = row[cfg.colEmail2 - 1];
      const status3     = cfg.colEmail3 ? row[cfg.colEmail3 - 1] : 'skip';

      if (!email) continue;

      // ── Email 1: Registrasi Sukses (langsung) ──
      if (!status1 && elapsedHrs >= 0) {
        const pdf = _buildPDF(row, cfg, 'regist');
        _sendBrevo(sheet, cfg, row, i + 1, cfg.colEmail1, email, {
          subject: cfg.subjectRegist,
          html:    _htmlRegist(row, cfg),
          pdf, pdfName: `DataRegist_${row[0]}.pdf`
        });
        if (cfg.colWebhook) sheet.getRange(i + 1, cfg.colWebhook).setValue('');
      }

      // ── Email 2: LoA atau Warning (setelah 8 jam) ──
      if (!status2 && elapsedHrs >= 8) {
        const isExceeded = statusDup === 'Exceeded' || statusDup === 'Exceeded (Same Category and Name)';
        const isValid    = !isExceeded && statusDup; // Unique, Duplicate, dsb

        if (isValid) {
          const pdf = _buildPDF(row, cfg, 'loa');
          _sendBrevo(sheet, cfg, row, i + 1, cfg.colEmail2, email, {
            subject: cfg.subjectLoA,
            html:    _htmlLoA(row, cfg),
            pdf, pdfName: 'Letter_of_Acceptance.pdf'
          });
        } else if (isExceeded) {
          _sendBrevo(sheet, cfg, row, i + 1, cfg.colEmail2, email, {
            subject: cfg.subjectWarning,
            html:    _htmlWarning(cfg),
            pdf: null
          });
        }
        if (cfg.colWebhook) sheet.getRange(i + 1, cfg.colWebhook).setValue('');
      }

      // ── Email 3: Invoice (setelah 24 jam) — hanya jika ada config ──
      if (cfg.colEmail3 && cfg.subjectInvoice && !status3 && elapsedHrs >= 24) {
        const isExceeded = statusDup === 'Exceeded' || statusDup === 'Exceeded (Same Category and Name)';
        if (isExceeded) {
          sheet.getRange(i + 1, cfg.colEmail3).setValue('Skipped');
        } else {
          const pdf = _buildPDF(row, cfg, 'invoice');
          _sendBrevo(sheet, cfg, row, i + 1, cfg.colEmail3, email, {
            subject: cfg.subjectInvoice,
            html:    _htmlInvoice(row, cfg),
            pdf, pdfName: `Invoice_${row[0]}.pdf`
          });
          if (cfg.colWebhook) sheet.getRange(i + 1, cfg.colWebhook).setValue('');
        }
      }
    }
  });
}

// ── Kirim via Brevo API ───────────────────────────────────────────
function _sendBrevo(sheet, cfg, row, rowIdx, colIdx, recipient, { subject, html, pdf, pdfName }) {
  const noRegist = row[0];
  const payload  = {
    sender:      CFG.BREVO_SENDER,
    to:          [{ email: recipient }],
    subject,
    htmlContent: html,
  };
  if (pdf && pdfName) {
    payload.attachment = [{ content: Utilities.base64Encode(pdf.getBytes()), name: pdfName }];
  }

  try {
    const res    = UrlFetchApp.fetch(CFG.BREVO_URL, {
      method: 'post', contentType: 'application/json',
      headers: { 'api-key': CFG.BREVO_API_KEY },
      payload: JSON.stringify(payload),
    });
    const result = JSON.parse(res.getContentText());
    const status = res.getResponseCode() === 201
      ? `Success: ${result.messageId}`
      : `Failed: ${result.message}`;
    sheet.getRange(rowIdx, colIdx).setValue(status);
    Logger.log(`[${noRegist}] ${subject} → ${recipient} | ${status}`);
  } catch (err) {
    sheet.getRange(rowIdx, colIdx).setValue(`Failed: ${err.message}`);
    Logger.log(`[${noRegist}] Error kirim ke ${recipient}: ${err.message}`);
  }
}

// ── Buat PDF dari Google Doc template ────────────────────────────
function _buildPDF(row, cfg, type) {
  const [templateId, folderId] = type === 'regist'  ? cfg.pdfRegist  :
                                  type === 'loa'     ? cfg.pdfLoA     :
                                  cfg.pdfInvoice;
  if (!templateId || !folderId) return null;

  const copy   = DriveApp.getFileById(templateId).makeCopy();
  const doc    = DocumentApp.openById(copy.getId());
  const body   = doc.getBody();
  const f      = cfg.fields;
  const noReg  = row[f.no];
  const ts     = Utilities.formatDate(new Date(row[f.timestamp]), 'Asia/Jakarta', 'EEE, dd MMM yyyy');

  // ── Placeholder umum (semua tipe PDF) ──
  _safeReplace(body, '<<No>>',         noReg);
  _safeReplace(body, '<<Timestamps>>', ts);
  _safeReplace(body, '<<timestamp>>',  ts);

  if (type === 'regist') {
    _safeReplace(body, '<<Categories_Participant>>',    row[f.categoryPart]);
    _safeReplace(body, '<<Category_Competition>>',      row[f.categoryComp]);
    _safeReplace(body, '<<Nama_Sekolah>>',              row[f.school]);
    _safeReplace(body, '<<Nama_Lengkap>>',              row[f.name]);
    _safeReplace(body, '<<Leader_Email>>',              row[f.email]);
    _safeReplace(body, '<<Leader_Whatsapp>>',           row[f.wa]);
    _safeReplace(body, '<<Name_Supervisor>>',           row[f.supervisorName]);
    _safeReplace(body, '<<Whatsapp_Number_Supervisor>>',row[f.supervisorWa]);
    _safeReplace(body, '<<Email_Addres_Supervisor>>',   row[f.supervisorEmail]);
    _safeReplace(body, '<<Project_Title>>',             row[f.judul]);
    _safeReplace(body, '<<Categories>>',                row[f.kategori]);
    _safeReplace(body, '<<YES/No>>',                    row[f.yesno]);
    _safeReplace(body, '<<Judul_Pernah_Berpatisipasi>>',row[f.partisipasi]);
    // Field khusus Indo
    if (f.npsn    !== undefined) _safeReplace(body, '<<NPSN>>',    row[f.npsn]);
    if (f.nisn    !== undefined) _safeReplace(body, '<<NISN_NIM>>',row[f.nisn]);
    if (f.provinsi!== undefined) _safeReplace(body, '<<Provinsi>>',row[f.provinsi]);
    if (f.grade   !== undefined) _safeReplace(body, '<<Grade>>',   row[f.grade]);
    if (f.address !== undefined) _safeReplace(body, '<<Complate_Address>>', row[f.address]);
    if (f.info    !== undefined) _safeReplace(body, '<<Information_Resources>>', row[f.info]);
    // Field khusus Inter
    if (f.country   !== undefined) _safeReplace(body, '<<Country>>',    row[f.country]);
    if (f.phoneCode !== undefined) _safeReplace(body, '<<Phone_Code>>', row[f.phoneCode]);
    if (f.sosmed    !== undefined) _safeReplace(body, '<<Sosmed>>',     row[f.sosmed]);
  }

  if (type === 'loa') {
    _safeReplace(body, '<<Category_Competition>>', row[f.categoryComp]);
    _safeReplace(body, '<<Nama_Lengkap>>',         row[f.name]);
    _safeReplace(body, '<<Nama_Sekolah>>',         row[f.school]);
    _safeReplace(body, '<<Project_Title>>',        row[f.judul]);
  }

  if (type === 'invoice') {
    _safeReplace(body, '<<URL_FOLDER>>',          row[f.urlFolder]);
    _safeReplace(body, '<<Nama_Lengkap>>',        row[f.name]);
    _safeReplace(body, '<<Nama_Sekolah>>',        row[f.school]);
    _safeReplace(body, '<<CATEGORY_COMPETITION>>',row[f.categoryComp]);
    _safeReplace(body, '<<CATEGORY_PRICE>>',      row[f.price]);
  }

  doc.saveAndClose();
  const pdf    = DriveApp.getFileById(copy.getId()).getAs('application/pdf');
  const folder = DriveApp.getFolderById(folderId);
  const saved  = folder.createFile(pdf);
  saved.setName(`${type === 'regist' ? 'DataRegist' : type === 'loa' ? 'LoA' : 'Invoice'}_${noReg}.pdf`);
  DriveApp.getFileById(copy.getId()).setTrashed(true);
  return pdf;
}

function _safeReplace(body, placeholder, value) {
  try { body.replaceText(placeholder, String(value ?? '')); } catch(e) {}
}

// ── HTML Templates ────────────────────────────────────────────────
function _htmlRegist(row, cfg) {
  const noReg = row[0];
  const mode  = cfg.sheetName && cfg.sheetName.includes('Online') ? 'Online' : 'Offline';
  if (cfg.lang === 'id') return `
    <p>Dear, Peserta</p>
    <p>Selamat! Tim Anda telah berhasil mendaftar di TIESF 2027.</p>
    <p>Nomor Registrasi TIESF ${mode}: <strong>${noReg}</strong></p>
    <hr>
    <p style="color:red;font-weight:bold;">
    ⚠️ Email ini dikirimkan secara otomatis. Mohon <u>tidak membalas email ini</u>.
    </p>`;
  return `
    <p>Dear Participant,</p>
    <p>Congratulations! Your team has been successfully registered for TIESF 2027.</p>
    <p>Your Registration Number (${mode}): <strong>${noReg}</strong></p>
    <hr>
    <p style="color:red;font-weight:bold;">
    ⚠️ This email is sent automatically. Please <u>do not reply</u> to this email.
    </p>`;
}

function _htmlLoA(row, cfg) {
  if (cfg.lang === 'id') return `
    <p>Dear Peserta,</p>
    <p>Berikut adalah Letter of Acceptance (LoA) Anda untuk TIESF 2027.</p>
    <p>Untuk bantuan, hubungi admin kami: <a href="${CFG.WA_ADMIN}">Admin TIESF</a></p>
    <hr>
    <p style="color:red;font-weight:bold;">
    ⚠️ Email ini dikirimkan secara otomatis. Mohon <u>tidak membalas email ini</u>.
    </p>`;
  return `
    <p>Dear Participant,</p>
    <p>Please find your Letter of Acceptance (LoA) for TIESF 2027 attached.</p>
    <p>For assistance, contact our admin: <a href="${CFG.WA_ADMIN}">TIESF Admin</a></p>
    <hr>
    <p style="color:red;font-weight:bold;">
    ⚠️ This email is sent automatically. Please <u>do not reply</u> to this email.
    </p>`;
}

function _htmlWarning(cfg) {
  if (cfg.lang === 'id') return `
    <p>Perhatian, judul yang diajukan sudah melebihi batas maksimal penggunaan (2x).</p>
    <p>Jika tidak ada perubahan pada penelitian ini, tim Anda akan didiskualifikasi.</p>
    <p>Jika ada perubahan/perkembangan, hubungi: <a href="${CFG.WA_ADMIN}">Admin TIESF</a></p>
    <p>Sertakan: nama event, judul, dan nomor registrasi.</p>
    <hr>
    <p style="color:red;font-weight:bold;">
    ⚠️ Email ini dikirimkan secara otomatis. Mohon <u>tidak membalas email ini</u>.
    </p>`;
  return `
    <p>Attention: The submitted title has exceeded the maximum usage limit (2 times).</p>
    <p>If there are no updates to this research, your team will be disqualified.</p>
    <p>If there are updates, contact: <a href="${CFG.WA_ADMIN}">TIESF Admin</a></p>
    <p>Please include: event name, title, and registration number.</p>
    <hr>
    <p style="color:red;font-weight:bold;">
    ⚠️ This email is sent automatically. Please <u>do not reply</u> to this email.
    </p>`;
}

function _htmlInvoice(row, cfg) {
  if (cfg.lang === 'id') return `
    <p>Dear Peserta TIESF 2027,</p>
    <p>Terima kasih telah mendaftar. Berikut terlampir invoice dan link drive untuk TIESF 2027.</p>
    <p>Silakan bergabung ke grup WhatsApp event: <a href="${CFG.WA_GROUP}">TIESF COMMUNITY 2027</a></p>
    <p>Best Regards,<br>TIESF 2027 Committee</p>
    <hr>
    <p style="color:red;font-weight:bold;">
    ⚠️ Email ini dikirimkan secara otomatis. Mohon <u>tidak membalas email ini</u>.
    </p>`;
  return `
    <p>Dear TIESF 2027 Participant,</p>
    <p>Thank you for registering. Please find the invoice and drive link attached.</p>
    <p>Join our WhatsApp group: <a href="${CFG.WA_GROUP}">TIESF COMMUNITY 2027</a></p>
    <p>Best Regards,<br>TIESF 2027 Committee</p>
    <hr>
    <p style="color:red;font-weight:bold;">
    ⚠️ This email is sent automatically. Please <u>do not reply</u> to this email.
    </p>`;
}