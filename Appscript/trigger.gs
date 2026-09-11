// ================================================================
// Trigger.gs — Entry point utama yang dijalankan oleh time-trigger
//
// CARA SETUP TRIGGER:
//   1. Buka Apps Script → Triggers (ikon jam)
//   2. Add Trigger:
//      - Function: TIESFIndoTrigger  → Every 1 hour
//      - Function: TIESFInterTrigger → Every 1 hour
// ================================================================

function TIESFIndoTrigger() {
  _runSafe('CheckTitleTIESF_Indo',    CheckTitleTIESF_Indo);
  _runSafe('sendEmailsTIESF_Indo',    sendEmailsTIESF_Indo);
  _runSafe('updateBrevoStatus_Indo', updateBrevoStatus_Indo);
}

function TIESFInterTrigger() {
  _runSafe('CheckTitleTIESF_Inter',    CheckTitleTIESF_Inter);
  _runSafe('sendEmailsTIESF_Inter',    sendEmailsTIESF_Inter);
  _runSafe('updateBrevoStatus_Inter', updateBrevoStatus_Inter);
}

// ── Run semua sekaligus (manual / untuk testing) ─────────────────
function TIESFRunAll() {
  TIESFIndoTrigger();
  TIESFInterTrigger();
}

// ── Helper: jalankan fungsi dengan catch individual ───────────────
function _runSafe(name, fn) {
  try {
    Logger.log(`▶ Menjalankan ${name}...`);
    fn();
    Logger.log(`✓ ${name} selesai.`);
  } catch (e) {
    Logger.log(`✗ Error di ${name}: ${e.toString()}`);
  }
}

// ── Setup trigger otomatis (jalankan 1x secara manual) ───────────
function setupTriggers() {
  // Hapus semua trigger lama agar tidak duplikat
  ScriptApp.getProjectTriggers().forEach(t => ScriptApp.deleteTrigger(t));

  ScriptApp.newTrigger('TIESFIndoTrigger')
    .timeBased().everyHours(1).create();

  ScriptApp.newTrigger('TIESFInterTrigger')
    .timeBased().everyHours(1).create();

  Logger.log('Triggers berhasil dibuat: TIESFIndoTrigger & TIESFInterTrigger (setiap 1 jam)');
}