/**
 * Shared display formatters.
 *
 * These were previously defined inline in individual components, which meant
 * the same duration or clock string could drift between the sidebar, the live
 * dock and the meeting detail view. Everything here is pure and
 * locale-respecting (we pass `undefined` as the locale so the OS setting wins).
 *
 * Note the two distinct clock helpers: `formatClock` takes a `Date` and always
 * returns a string, while `formatClockFromIso` parses an optional ISO string
 * and returns `undefined` on missing/invalid input. They are not
 * interchangeable — callers rely on the differing null-handling.
 */

const pad = (n: number) => n.toString().padStart(2, '0');

/**
 * Compact duration for metadata rows ("1h 4m", "12m", "45s").
 * Returns `undefined` for zero/absent input so callers can omit the field.
 */
export function formatDuration(seconds?: number): string | undefined {
  if (!seconds || seconds <= 0) return undefined;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m`;
  return `${s}s`;
}

/**
 * Plain-English duration ("12 min", "1 h 4 min"). Mono is reserved for the
 * live timer, so prose surfaces use this instead of `formatDuration`.
 */
export function formatDurationEnglish(seconds: number): string {
  if (seconds < 60) return `${seconds} sec`;
  const totalMinutes = Math.floor(seconds / 60);
  if (totalMinutes < 60) return `${totalMinutes} min`;
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  if (m === 0) return `${h} h`;
  return `${h} h ${m} min`;
}

/**
 * Running timer for an in-progress recording ("07:12", "1:07:12").
 * Clamps negatives and truncates fractional seconds so the digits never jitter.
 */
export function formatElapsed(seconds: number): string {
  const s = Math.max(0, seconds | 0);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const rem = s % 60;
  if (h > 0) return `${h}:${pad(m)}:${pad(rem)}`;
  return `${pad(m)}:${pad(rem)}`;
}

/** Long-form date for section headers ("Tue, 4 Jun 2025"). */
export function formatDate(d: Date): string {
  return d.toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/** Wall-clock time from a `Date` ("09:05"). */
export function formatClock(d: Date): string {
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/**
 * Wall-clock time from an ISO string ("09:05"), or `undefined` when the input
 * is missing or unparseable.
 */
export function formatClockFromIso(iso?: string): string | undefined {
  if (!iso) return undefined;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return undefined;
  return formatClock(d);
}

/**
 * Full date + time for the meeting detail header, preferring the processed
 * timestamp and falling back to the last update.
 */
export function formatDetailDate(info: {
  processed_at?: string;
  updated_at?: string;
}): string | undefined {
  const raw = info.processed_at ?? info.updated_at;
  if (!raw) return undefined;
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

/** Keep a badge from stretching its row on large counts. */
export function formatCount(n: number): string {
  return n > 99 ? '99+' : String(n);
}
