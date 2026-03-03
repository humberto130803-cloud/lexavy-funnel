/**
 * Central analytics module — beacon-based event batching to Lead Engine.
 * All components call these helpers; events are queued and flushed every 3 seconds
 * via navigator.sendBeacon() to the Lead Engine funnel-events API.
 *
 * Config: VITE_ANALYTICS_URL and VITE_ANALYTICS_KEY in .env
 */

const ANALYTICS_URL = import.meta.env.VITE_ANALYTICS_URL;
const ANALYTICS_KEY = import.meta.env.VITE_ANALYTICS_KEY;
const FLUSH_INTERVAL = 3000;
const MAX_BATCH_SIZE = 20;

// ── Session ID (persists per tab) ──────────────────────────────────────
function getSessionId() {
  let sid = sessionStorage.getItem("_sid");
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem("_sid", sid);
  }
  return sid;
}

// ── Event queue + flush logic ──────────────────────────────────────────
let queue = [];
let flushTimer = null;

function enqueue(eventName, params = {}) {
  if (!ANALYTICS_URL || !ANALYTICS_KEY) return;

  queue.push({
    sessionId: getSessionId(),
    eventName,
    params: JSON.stringify(params),
    path: window.location.pathname,
    referrer: document.referrer || null,
    userAgent: navigator.userAgent,
    timestamp: new Date().toISOString(),
  });

  if (queue.length >= MAX_BATCH_SIZE) {
    flush();
  } else if (!flushTimer) {
    flushTimer = setTimeout(flush, FLUSH_INTERVAL);
  }
}

function flush() {
  clearTimeout(flushTimer);
  flushTimer = null;

  if (queue.length === 0) return;

  const events = queue.splice(0, MAX_BATCH_SIZE);
  const url = `${ANALYTICS_URL}?key=${ANALYTICS_KEY}`;
  const body = JSON.stringify({ events });

  const blob = new Blob([body], { type: "application/json" });
  const sent = navigator.sendBeacon?.(url, blob);

  if (!sent) {
    fetch(url, { method: "POST", body, keepalive: true, headers: { "Content-Type": "application/json" } }).catch(() => {});
  }

  // If there are remaining events, schedule another flush
  if (queue.length > 0) {
    flushTimer = setTimeout(flush, FLUSH_INTERVAL);
  }
}

// ── Flush on page hide ─────────────────────────────────────────────────
if (typeof window !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flush();
  });
  window.addEventListener("pagehide", flush);
}

// ── Meta Pixel helper ──────────────────────────────────────────────────
function fbPixel(eventName, params = {}) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, params);
  }
}

// ── Public API (identical signatures to previous GA4 version) ──────────

export function trackPageView(pagePath, pageTitle) {
  enqueue("page_view", { page_path: pagePath, page_title: pageTitle });
}

export function trackEvent(eventName, params = {}) {
  enqueue(eventName, params);
}

export function trackCtaClick(ctaId, ctaText) {
  enqueue("cta_click", { cta_id: ctaId, cta_text: ctaText });
}

export function trackFormStart() {
  enqueue("form_start", { form_id: "qualification" });
}

export function trackFormError(fields) {
  enqueue("form_error", { form_id: "qualification", error_fields: fields.join(",") });
}

export function trackFormSubmit(role) {
  enqueue("form_submit", { form_id: "qualification", role });
  enqueue("generate_lead", { form_id: "qualification", role });
  fbPixel("Lead", { content_name: "qualification_form", content_category: role });
}

export function trackVideoEvent(action) {
  enqueue("vsl_video", { video_action: action });
}

export function trackSectionView(sectionName) {
  enqueue("section_view", { section_name: sectionName });
}

export function trackFaqOpen(questionIndex) {
  enqueue("faq_open", { question_index: questionIndex });
}

export function trackLanguageToggle(newLang) {
  enqueue("language_toggle", { language: newLang });
}

export function trackEbookDownload() {
  enqueue("ebook_download", {});
  fbPixel("Lead", { content_name: "ebook_download" });
}

export function trackCalendlyInteraction(action) {
  enqueue("calendly_interaction", { calendly_action: action });
  if (action === "scheduled") {
    fbPixel("Schedule", { content_name: "calendly_booking" });
  }
}
