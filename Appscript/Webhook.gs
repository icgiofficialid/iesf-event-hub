// ================================================================
// Webhook.gs — Ambil status pengiriman email dari Brevo API
//              Berlaku untuk semua sheet TIESF
// ================================================================

// ── Entry points ─────────────────────────────────────────────────
function updateBrevoStatus_Indo()  { _updateBrevoStatus(['Indo-Online',  'Indo-Offline']);  }
function updateBrevoStatus_Inter() { _updateBrevoStatus(['Inter-Online', 'Inter-Offline']); }

// ── Core ──────────────────────────────────────────────────────────
function _updateBrevoStatus(sheetNames) {
  if (!_checkBrevoQuota()) { Logger.log('Kuota Brevo habis.'); return; }

  const ss = SpreadsheetApp.openById(CFG.SHEET_ID);

  sheetNames.forEach(sheetName => {
    const cfg   = CFG.SHEETS[sheetName];
    const sheet = ss.getSheetByName(sheetName);
    if (!sheet) { Logger.log(`Sheet "${sheetName}" tidak ditemukan.`); return; }

    const data = sheet.getDataRange().getValues();

    for (let i = 1; i < data.length; i++) {
      const noRegist  = data[i][0];
      const email     = data[i][cfg.emailCol];
      const processed = data[i][cfg.colBrevoProc - 1];

      if (!noRegist || !email || processed === 'Finish Processed') continue;

      try {
        const res      = UrlFetchApp.fetch(`${CFG.BREVO_EVENTS}?email=${email}`, {
          method: 'get',
          headers: { 'accept': 'application/json', 'api-key': CFG.BREVO_API_KEY },
        });
        const brevo    = JSON.parse(res.getContentText());
        const current  = data[i][cfg.colBrevoStatus - 1];

        if (brevo.events && brevo.events.length > 0) {
          const latest = brevo.events[0];
          const status = latest.event || current;
          if (status !== current) {
            sheet.getRange(i + 1, cfg.colBrevoStatus).setValue(status);
          }
        }
        // Tandai selesai diproses
        sheet.getRange(i + 1, cfg.colBrevoProc).setValue('Finish Processed');
        Logger.log(`[${noRegist}] Brevo status diperbarui (${sheetName})`);
      } catch (err) {
        Logger.log(`[${noRegist}] Error Brevo status di ${sheetName}: ${err.message}`);
      }
    }
  });
}

// ── Cek sisa kuota Brevo ─────────────────────────────────────────
function _checkBrevoQuota() {
  try {
    const res  = UrlFetchApp.fetch(CFG.BREVO_ACCOUNT, {
      method: 'get',
      headers: { 'accept': 'application/json', 'api-key': CFG.BREVO_API_KEY },
    });
    const data = JSON.parse(res.getContentText());
    if (Array.isArray(data.plan)) {
      for (const plan of data.plan) {
        if (plan.creditsType === 'sendLimit') {
          const remaining = parseInt(plan.credits, 10);
          Logger.log(`Sisa kuota Brevo: ${remaining}`);
          return remaining > 0;
        }
      }
    }
    return false;
  } catch (err) {
    Logger.log(`Error cek kuota Brevo: ${err.message}`);
    return false;
  }
}