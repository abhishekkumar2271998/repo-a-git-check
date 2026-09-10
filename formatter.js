/**
 * Lightweight value-formatting helpers for JavaScript entry points.
 *
 * Kept dependency-free so it can be used from Node/Electron code as well as
 * browser bundles.
 */

function formatDuration(seconds) {
  if (!Number.isFinite(seconds) || seconds <= 0) return undefined;

  const totalSeconds = Math.floor(seconds);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const remainingSeconds = totalSeconds % 60;

  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m`;
  return `${remainingSeconds}s`;
}

function formatElapsed(seconds) {
  const totalSeconds = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const remainingSeconds = totalSeconds % 60;
  const pad = (value) => String(value).padStart(2, '0');

  return hours > 0
    ? `${hours}:${pad(minutes)}:${pad(remainingSeconds)}`
    : `${pad(minutes)}:${pad(remainingSeconds)}`;
}

function formatCount(count) {
  return count > 99 ? '99+' : String(count);
}

module.exports = { formatCount, formatDuration, formatElapsed };
