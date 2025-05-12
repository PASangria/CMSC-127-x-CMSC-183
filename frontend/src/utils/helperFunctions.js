// src/utils/dateFormatter.js

/**
 * Format a date string (ISO 8601 format) into a more user-friendly format.
 * @param {string} isoDate - The ISO 8601 date string to be formatted.
 * @param {string} locale - Optional: Locale for formatting (default is 'en-US').
 * @param {Object} options - Optional: Formatting options for date (default is full format).
 * @returns {string} - The formatted date.
 */
export const formatDate = (isoDate, locale = 'en-US', options = {}) => {
  const date = new Date(isoDate);

  // Default options for full date format
  const defaultOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, // Use 12-hour clock (AM/PM)
  };

  // Merge default options with custom options if provided
  const formatOptions = { ...defaultOptions, ...options };

  return date.toLocaleString(locale, formatOptions);
};
