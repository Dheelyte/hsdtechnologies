export const PLAN_EVENT = "hsd-plan-select";

/**
 * Pre-selects a plan in the contact form when a "Get a Quote" CTA is clicked
 * elsewhere on the page (one-page layout — no query params available).
 */
export function selectPlan(plan: string) {
  try {
    sessionStorage.setItem("hsd-plan", plan);
  } catch {
    /* storage unavailable */
  }
  window.dispatchEvent(new CustomEvent(PLAN_EVENT, { detail: plan }));
}
