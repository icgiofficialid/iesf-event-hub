// // ================================================================
// // TEMPLATE: src/config/events/_template.ts
// //
// // Copy file ini → ganti slug & isi semua field.
// // Lalu daftarkan di src/config/eventRegistry.ts.
// // ================================================================

// import type { EventDetailData } from "@/config/eventDetailTypes";

// const newEvent: EventDetailData = {
//   slug: "nama-event-slug",     // ← ganti

//   email:   "email@domain.com", // ← ganti
//   website: "www.domain.com",   // ← ganti
//   venue:   "Kota, Negara",     // ← ganti

//   labels: {
//     eventBadge:    { en: "IESF · Competition 2026",    id: "IESF · Kompetisi 2026" },
//     heroBadge:     { en: "Competition · City, Country", id: "Kompetisi · Kota, Negara" },
//     categoriesDesc: {
//       en: "Short description of the competition format.",
//       id: "Deskripsi singkat format kompetisi.",
//     },
//     scheduleDesc: {
//       en: "The event spans X days including ...",
//       id: "Acara berlangsung X hari meliputi ...",
//     },
//   },

//   stats: [
//     { value: "XXX+", label: { en: "Teams Expected",         id: "Tim Peserta" } },
//     { value: "X",    label: { en: "Competition Categories", id: "Kategori Kompetisi" } },
//     { value: "XXX+", label: { en: "Participants Overall",   id: "Total Peserta" } },
//     { value: "X",    label: { en: "Days of Innovation",     id: "Hari Inovasi" } },
//   ],

//   regSteps: {
//     en: [
//       "Step 1 description...",
//       "Step 2 description...",
//     ],
//     id: [
//       "Langkah 1...",
//       "Langkah 2...",
//     ],
//   },

//   about: {
//     welcome:    { en: "Welcome text...",    id: "Teks sambutan..." },
//     background: { en: "Background text...", id: "Teks latar belakang..." },
//     objectives: {
//       en: ["Objective 1", "Objective 2"],
//       id: ["Tujuan 1",    "Tujuan 2"],
//     },
//   },

//   divisions: [
//     { level: { en: "Junior High School", id: "SMP" }, age: { en: "13–15", id: "13–15 tahun" } },
//     { level: { en: "Senior High School", id: "SMA" }, age: { en: "16–18", id: "16–18 tahun" } },
//   ],

//   categories: [
//     {
//       letter: "A",
//       title:       { en: "Category Title",       id: "Judul Kategori" },
//       description: { en: "Category description.", id: "Deskripsi kategori." },
//       icon: "Cpu",  // Cpu | Leaf | HeartPulse | FlaskConical | Users
//     },
//   ],

//   judgingCriteria: [
//     { aspect: { en: "Originality", id: "Orisinalitas" }, weight: "25%" },
//     { aspect: { en: "Quality",     id: "Kualitas" },     weight: "25%" },
//   ],

//   awards: [
//     { place: { en: "1st Place", id: "Juara 1" }, medal: { en: "Gold Medal",   id: "Medali Emas" },  extra: { en: "+ Certificate", id: "+ Sertifikat" } },
//     { place: { en: "2nd Place", id: "Juara 2" }, medal: { en: "Silver Medal", id: "Medali Perak" }, extra: { en: "+ Certificate", id: "+ Sertifikat" } },
//   ],

//   schedule: [
//     {
//       day: 1,
//       title: { en: "Opening Day", id: "Hari Pembukaan" },
//       items: {
//         en: ["Registration", "Opening Ceremony"],
//         id: ["Registrasi",   "Upacara Pembukaan"],
//       },
//     },
//   ],
// };

// export default newEvent;