// ================================================================
// BorneoIESFDetail.tsx  (slim wrapper)
// Path: src/pages/events/BorneoIESFDetail.tsx
//
// Cukup import data & template. Tidak ada logic di sini.
// ================================================================

import borneoiesf from "@/config/events/borneoiesf";
import EventDetailPage from "./EventDetailPage";

const BorneoIESFDetail = () => <EventDetailPage slug="borneo-iesf-2026" data={borneoiesf} />;

export default BorneoIESFDetail;