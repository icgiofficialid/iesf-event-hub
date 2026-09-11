// ================================================================
// Config.gs — Konfigurasi utama sistem email otomatis ICGI

const CFG = {

  // ── [1] BREVO API KEY ─────────────────────────────────────────
  BREVO_API_KEY: '',

  // ── [2] SENDER ────────────────────────────────────────────────
  BREVO_SENDER:  { name: 'TIESF COMMITTEE', email: 'icgi.official.id@gmail.com' },
  BREVO_URL:     'https://api.brevo.com/v3/smtp/email',
  BREVO_EVENTS:  'https://api.brevo.com/v3/smtp/statistics/events',
  BREVO_ACCOUNT: 'https://api.brevo.com/v3/account',

  // ── [3] SPREADSHEET REGISTRASI ────────────────────────────────
  SHEET_ID: '',

  // ── [4] DATABASE DUPLIKAT ─────────────────────────────────────
  // Header wajib: NO.|Sekolah|Nama|Email|Telpon|Judul|Frekuensi|Kategori|Kategori2|Karya
  DB_ID: '',

  // ── [5] KONTAK ────────────────────────────────────────────────
  WA_ADMIN: 'https://wa.me/628139905880',
  WA_GROUP: 'https://chat.whatsapp.com/KVyTzNeMCtkAPdFdfkvxNj',


  SHEETS: {

    'Indo-Online': {
      sheetName:      'Indo-Online',
      lang:           'id',
      emailCol:       10,
      statusDupCol:   25, // Deteksi (geser +1, sebelumnya 24)
      colEmail1:      27, // Status Email 1 (geser +1, sebelumnya 26)
      colEmail2:      28, // Status Email 2 (geser +1, sebelumnya 27)
      colEmail3:      29, // Status Email 3 (geser +1, sebelumnya 28)
      colWebhook:     null,
      colBrevoStatus: 30, // geser +1, sebelumnya 29
      colBrevoProc:   31, // geser +1, sebelumnya 30
      dupJudulCol:    23, // PROJECT_TITLE — TIDAK berubah (NPSN disisip SETELAHNYA)
      dupKategoriCol: 22, // CATEGORIES — TIDAK berubah
      dupResultCol:   26, // geser +1, sebelumnya 25
      dupEvidCol:     33, // geser +1, sebelumnya 32
      dupCategoryCompCol: 4,
      sekolahCol:5, namaCol:6, dupEmailCol:10, telponCol:11,
      fields: {
        no:0, timestamp:1, urlFolder:2,
        categoryPart:3, categoryComp:4,
        school:5, name:6, nisn:7, provinsi:8, grade:9,
        email:10, wa:11, sosmed:12,
        supervisorName:13, supervisorWa:14, supervisorEmail:15,
        address:16, info:17,
        yesno:19, partisipasi:20,
        price:21, kategori:22, judul:23,
        npsn:24, // ← BARU: tepat setelah judul/PROJECT_TITLE (0-indexed 24)
      },
      pdfRegist:  ['1f7bm0xruERJ1gO4MLYVEE5WlRkEFxkZw41u5VFHvcS4', '1QYJIpyN5GypM_w5XVVT0p_86NA-FhFGE'], //
      pdfLoA:     ['1rpbQMQXKEbovTKm_uRCX7LjtwDxZ7lptjS4Cj89Gg5E', '1zfIkYFyT9yPDHFhVqs-0zM4P-fJFPoHN'], //
      pdfInvoice: ['1OZJh1wlqZ45w0Sk-c2vE2Xt1otYMqNeLYCWiuY1zju8', '1Zi_oMRE0ZvQHRcG7kQjR3LV22ZtgjerE'], //
      subjectRegist:  'REGISTRATION SUCCESSFULLY TIESF 2027',
      subjectLoA:     'TIESF 2027 - Letter of Acceptance (LoA)',
      subjectWarning: 'WARNING: TITLE ALREADY USED IN ANOTHER EVENT',
      subjectInvoice: 'INVOICE TIESF 2027',
      eventLabel: 'TIESF - Indonesia Online'
    },

    'Indo-Offline': {
      sheetName:      'Indo-Offline',
      lang:           'id',
      emailCol:       10,
      statusDupCol:   25, // Deteksi (geser +1, sebelumnya 24)
      colEmail1:      27, // Status Email 1 (geser +1, sebelumnya 26)
      colEmail2:      28, // Status Email 2 (geser +1, sebelumnya 27)
      colEmail3:      29, // Status Email 3 (geser +1, sebelumnya 28)
      colWebhook:     null,
      colBrevoStatus: 30, // geser +1, sebelumnya 29
      colBrevoProc:   31, // geser +1, sebelumnya 30
      dupJudulCol:    23, // PROJECT_TITLE — TIDAK berubah (NPSN disisip SETELAHNYA)
      dupKategoriCol: 22, // CATEGORIES — TIDAK berubah
      dupResultCol:   26, // geser +1, sebelumnya 25
      dupEvidCol:     33, // geser +1, sebelumnya 32
      dupCategoryCompCol: 4,
      sekolahCol:5, namaCol:6, dupEmailCol:10, telponCol:11,
      fields: {
        no:0, timestamp:1, urlFolder:2,
        categoryPart:3, categoryComp:4,
        school:5, name:6, nisn:7, provinsi:8, grade:9,
        email:10, wa:11, sosmed:12,
        supervisorName:13, supervisorWa:14, supervisorEmail:15,
        address:16, info:17,
        yesno:19, partisipasi:20,
        price:21, kategori:22, judul:23,
        npsn:24, // ← BARU: tepat setelah judul/PROJECT_TITLE (0-indexed 24)
      },
      pdfRegist:  ['1L3ia5ixrasueXBcFImI5Z9VZiT4KtjqKy_sMj1syzDI', '1RXAisVfGIIbkMODFcmg1RTrawZHFCXhg'],//
      pdfLoA:     ['1D4ZibAYTwukovdY7gfZdBFDVs6Afj0WyrytZwaR8iGA',  '1VUP3aUUaTiiq41XzuVRrD8UPyMfDn7PE'],//
      pdfInvoice: ['1xpckQusSlEUSL__dgvfD4TQDUpk1uQjcLtuiDHfNsCg', '1tEINPFWOu6c98JNHtBDzBpe56lMyFbvB'],//
      subjectRegist:  'REGISTRATION SUCCESSFULLY TIESF 2027',
      subjectLoA:     'TIESF 2027 - Letter of Acceptance (LoA)',
      subjectWarning: 'WARNING: TITLE ALREADY USED IN ANOTHER EVENT',
      subjectInvoice: 'INVOICE TIESF 2027',
      eventLabel: 'TIESF - Indonesia Offline'
    },

    'Inter-Online': {
      sheetName:      'Inter-Online',
      lang:           'en',
      emailCol:       9,
      statusDupCol:   23,
      colEmail1:      25,
      colEmail2:      26,
      colEmail3:      27,
      colWebhook:     null,
      colBrevoStatus: 28,
      colBrevoProc:   29,
      dupJudulCol:    22,
      dupKategoriCol: 21,
      dupResultCol:   24,
      dupEvidCol:     31,
      dupCategoryCompCol: 4,
      sekolahCol:5, namaCol:6, dupEmailCol:9, telponCol:10,
      fields: {
        no:0, timestamp:1, urlFolder:2,
        categoryPart:3, categoryComp:4,
        school:5, name:6, country:7, grade:8,
        email:9, wa:10, sosmed:11,
        supervisorName:12, supervisorWa:13, supervisorEmail:14,
        address:15, info:16,
        yesno:18, partisipasi:19,
        price:20, kategori:21, judul:22, phoneCode: 32,
        // Tidak ada NPSN — sheet ini untuk peserta internasional
      },
      pdfRegist:  ['1tKVMZMrt5gOyw5Eo8HxMaMvNJYSMWmb-k3nDyzXYCcc', '1PMhMd7wg2K0Yy8aG8TNLn0iclJqf89ec'],//
      pdfLoA:     ['1xqBfTGPDTCIjfxoVO506HG9tOiUgT4ew34ypu9ybjfo',  '1k2l6kyTW8TjekFEDa2nuStf2GZST3qwJ'],//
      pdfInvoice: ['1BygweUTgY3UTq-rpvoLPZgWNN3lwPaZGY-7gYQ5Nv74',  '1yI52ujbEZjMd5jrtQfil9g93W9bml0YP'],//
      subjectRegist:  'REGISTRATION SUCCESSFULLY TIESF 2027',
      subjectLoA:     'TIESF 2027 - Letter of Acceptance (LoA)',
      subjectWarning: 'WARNING: TITLE ALREADY USED IN ANOTHER EVENT',
      subjectInvoice: 'INVOICE TIESF 2027',
      eventLabel: 'TIESF - International Online'
    },

    'Inter-Offline': {
      sheetName:      'Inter-Offline',
      lang:           'en',
      emailCol:       9,
      statusDupCol:   23,
      colEmail1:      25,
      colEmail2:      26,
      colEmail3:      null,
      colWebhook:     null,
      colBrevoStatus: 27,
      colBrevoProc:   28,
      dupJudulCol:    22,
      dupKategoriCol: 21,
      dupResultCol:   24,
      dupEvidCol:     31,
      dupCategoryCompCol: 4,
      sekolahCol:5, namaCol:6, dupEmailCol:9, telponCol:10,
      fields: {
        no:0, timestamp:1, urlFolder:2,
        categoryPart:3, categoryComp:4,
        school:5, name:6, country:7, grade:8,
        email:9, wa:10, sosmed:11,
        supervisorName:12, supervisorWa:13, supervisorEmail:14,
        address:15, info:16,
        yesno:18, partisipasi:19,
        price:20, kategori:21, judul:22, phoneCode: 32,
        // Tidak ada NPSN — sheet ini untuk peserta internasional
      },
      pdfRegist:  ['1H6HpeT4JDAd0nD4lXQ8JsXgRATawZRHYvD5IuT4UTdo', '1rwWT-dyXLUVeZIBcxIacSg3py8PmOhgX'],//
      pdfLoA:     ['1y11nPUkjibIZol8Y6uWatfMPuWX3sQBVk3zVbiqBMrs',  '1MuAH2CgeC4L6a7shbMPvsTLqr48CLN8S'],//
      pdfInvoice: ['1DNK6Gx_cKqp146O1o-663LB7BMCeaGxPjS2KxYvWBJY', '1xo7cjpImiuZXG1yahSHy4gvxj88owLKv'],//
      subjectRegist:  'REGISTRATION SUCCESSFULLY TIESF 2027',
      subjectLoA:     'TIESF 2027 - Letter of Acceptance (LoA)',
      subjectWarning: 'WARNING: TITLE ALREADY USED IN ANOTHER EVENT',
      subjectInvoice: 'INVOICE TIESF 2027',
      eventLabel: 'TIESF - International Offline'
    },

  },
};