// ================================================================
// CheckDuplicate.gs — Cek duplikasi judul untuk semua sheet TIESF
// ================================================================

// ── Entry points (dipanggil dari Trigger.gs) ──────────────────────
function CheckTitleTIESF_Indo()  { _checkDuplicate(['Indo-Online',  'Indo-Offline']);  }
function CheckTitleTIESF_Inter() { _checkDuplicate(['Inter-Online', 'Inter-Offline']); }

// ── Shared helpers ────────────────────────────────────────────────
function _normalizeText(text) {
  return text.toLowerCase().replace(/[^a-z\s]/g, '').trim();
}

function _cosineSimilarity(t1, t2) {
  const w1 = _normalizeText(t1).split(' ');
  const w2 = _normalizeText(t2).split(' ');
  const all = [...new Set([...w1, ...w2])];
  const v1  = all.map(w => w1.filter(x => x === w).length);
  const v2  = all.map(w => w2.filter(x => x === w).length);
  const dot = v1.reduce((s, v, i) => s + v * v2[i], 0);
  const m1  = Math.sqrt(v1.reduce((s, v) => s + v * v, 0));
  const m2  = Math.sqrt(v2.reduce((s, v) => s + v * v, 0));
  return (m1 && m2) ? dot / (m1 * m2) : 0;
}

// ── Core duplicate checker ────────────────────────────────────────
function _checkDuplicate(sheetNames) {
  const reg = SpreadsheetApp.openById(CFG.SHEET_ID);
  const db  = SpreadsheetApp.openById(CFG.DB_ID).getSheetByName('Database');
  let processed = 0;

  sheetNames.forEach(sheetName => {
    const cfg   = CFG.SHEETS[sheetName];
    const sheet = reg.getSheetByName(sheetName);
    if (!sheet) { Logger.log(`Sheet "${sheetName}" tidak ditemukan.`); return; }

    const lastRow = sheet.getLastRow();
    const lastCol = sheet.getLastColumn();
    if (lastRow < 2) return;

    const headers        = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    const processedColIdx = headers.indexOf('Processed'); // 0-based
    const allData        = sheet.getDataRange().getValues();
    const dbLastRow      = db.getLastRow();
    const dbData = dbLastRow < 2 ? [] : db.getRange(2, 1, dbLastRow - 1, 11).getValues();

    const results = [], evidence = [], colors = [];
    const eventLabel = cfg.eventLabel || ('TIESF - ' + sheetName);

    for (let i = 1; i < allData.length; i++) {
      const row        = allData[i];
      const judul      = row[cfg.dupJudulCol];
      const kategori   = row[cfg.dupKategoriCol];

      // Skip baris kosong
      if (!judul || typeof judul !== 'string' || !kategori) {
        results.push(['Data Tidak Lengkap']); evidence.push(['']); colors.push(new Array(lastCol).fill('')); continue;
      }

      // Skip jika sudah diproses
      if (processedColIdx > -1 && row[processedColIdx] === 'Yes') {
        results.push([sheet.getRange(i + 1, cfg.dupResultCol).getValue() || '']);
        evidence.push(['']);
        colors.push(sheet.getRange(i + 1, 1, 1, lastCol).getBackgrounds()[0]);
        continue;
      }

      const categoryComp = row[cfg.dupCategoryCompCol];
      const sekolah      = row[cfg.sekolahCol];
      const nama         = row[cfg.namaCol];
      const email        = row[cfg.dupEmailCol];
      const telpon       = row[cfg.telponCol];

      // Cari kemiripan di database
      let maxSim = 0, occ = 0, titleRowIdx = -1, foundTitle = '', foundEvent = '';
      dbData.forEach((dbRow, di) => {
        const sim = _cosineSimilarity(judul, dbRow[5]);
        if (sim > maxSim) { maxSim = sim; occ = dbRow[6] || 0; titleRowIdx = di + 2; foundTitle = dbRow[5]; foundEvent = dbRow[10] || ''; }
      });

      let result = 'Unique', color = '';

      if (maxSim < 0.9) {
        // Judul baru → tambah ke database
        result = 'Unique'; color = '#00FF00';
        const nr = db.getLastRow() + 1;
        db.getRange(nr, 1, 1, 11).setValues([[nr - 1, sekolah, nama, email, telpon, judul, 1, categoryComp, '', '', eventLabel]]);
      } else {
        const sameNameCat = (categoryComp === db.getRange(titleRowIdx, 8).getValue() &&
                             nama         === db.getRange(titleRowIdx, 3).getValue());
        if (occ === 1) {
          if (sameNameCat) { result = 'Duplicate (Same Category and Name)'; color = '#FFA500'; }
          else { result = 'Duplicate'; color = '#FFFF00'; db.getRange(titleRowIdx, 7).setValue(occ + 1); }
        } else if (occ >= 2) {
          if (sameNameCat) { result = 'Exceeded (Same Category and Name)'; color = '#FFA500'; }
          else {
            result = 'Exceeded'; color = '#FF0000';
            if (!db.getRange(titleRowIdx, 8).getValue()) db.getRange(titleRowIdx, 8).setValue(categoryComp);
            else if (!db.getRange(titleRowIdx, 9).getValue()) db.getRange(titleRowIdx, 9).setValue(categoryComp);
            db.getRange(titleRowIdx, 7).setValue(occ + 1);
          }
        }
      }
      
      foundTitle = foundEvent ? `${foundTitle} [${foundEvent}]` : foundTitle;

      results.push([result]);
      evidence.push([result === 'Unique' ? '' : foundTitle]);
      colors.push(new Array(lastCol).fill(color));
      if (processedColIdx > -1) sheet.getRange(i + 1, processedColIdx + 1).setValue('Yes');
      processed++;
    }

    // Tulis hasil batch
    if (results.length > 0) {
      sheet.getRange(2, cfg.dupResultCol, results.length, 1).setValues(results);
      sheet.getRange(2, cfg.dupEvidCol,   evidence.length, 1).setValues(evidence);
      sheet.getRange(2, 1, colors.length, lastCol).setBackgrounds(colors);
    }
  });

  Logger.log(`CheckDuplicate selesai: ${processed} baris diproses.`);
}