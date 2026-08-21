/**
 * Afeem's motion features are shown by default, regardless of the visitor's
 * OS-level `prefers-reduced-motion` setting — that setting is frequently on
 * for reasons unrelated to an actual preference (managed devices, phone
 * battery-saver modes, etc.), and it was silently hiding the entire
 * animation layer from visitors who never chose that.
 *
 * Genuine accessibility need is still respected: a visitor can explicitly
 * turn animations off via the "Reduce motion" control (see MotionToggle),
 * which is the only thing that now disables motion. That choice persists in
 * localStorage so it survives reloads/sessions like a real preference would.
 */
const KEY = "afeem-motion";

export function isMotionEnabled(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem(KEY) !== "off";
}

export function setMotionEnabled(enabled: boolean) {
  localStorage.setItem(KEY, enabled ? "on" : "off");
  document.documentElement.classList.toggle("reduce-motion", !enabled);
}

/** Reads the stored preference and syncs the <html> class. Call once on mount. */
export function syncMotionClass(): boolean {
  const enabled = isMotionEnabled();
  document.documentElement.classList.toggle("reduce-motion", !enabled);
  return enabled;
}

// Inline, blocking script (stringified into <head>) so the class is applied
// before first paint — no flash of animation for a visitor who opted out.
export const MOTION_INIT_SCRIPT = `(function(){try{var v=localStorage.getItem("${KEY}");if(v==="off"){document.documentElement.classList.add("reduce-motion");}}catch(e){}})();`;
