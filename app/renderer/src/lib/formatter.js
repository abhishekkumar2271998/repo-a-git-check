/**
 * Format a date for the recording metadata chip.
 *
 * @param {Date} date
 * @returns {string}
 */
export function formatRecordingDate(date) {
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Format a time using a zero-padded 24-hour clock.
 *
 * @param {Date} date
 * @returns {string}
 */
export function formatRecordingTime(date) {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}
