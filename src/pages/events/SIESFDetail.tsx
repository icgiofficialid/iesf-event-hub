// ================================================================
// SIESFDetail.tsx  (slim wrapper)
// Path: src/pages/events/SIESFDetail.tsx
//
// Cukup import data & template. Tidak ada logic di sini.
// ================================================================

import siesf from "@/config/events/siesf";
import EventDetailPage from "./EventDetailPage";

const SIESFDetail = () => <EventDetailPage slug="siesf-2026" data={siesf} />;

export default SIESFDetail;