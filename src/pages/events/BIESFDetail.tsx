// ================================================================
// BIESFDetail.tsx  (BARU — slim wrapper)
// Path: src/pages/events/BIESFDetail.tsx
//
// Cukup import data & template. Tidak ada logic di sini.
// Untuk event baru, copy pola ini dan ganti slug + data.
// ================================================================

import biesf from "@/config/events/biesf";
import EventDetailPage from "./EventDetailPage";


const BIESFDetail = () => <EventDetailPage slug="biesf-2026" data={biesf} />;

export default BIESFDetail;