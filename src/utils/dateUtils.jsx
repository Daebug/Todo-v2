export const formatCurrentDate = () => {
  const now = new Date();
  
  const dateFormatted = now.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  
  const timeFormatted = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).toLowerCase();
  
  return {
    date: dateFormatted,
    time: timeFormatted
  };
};

/**
 * Convert date string to date input format (yyyy-mm-dd)
 * @param {Date} date - Date object to format
 * @returns {string} Date formatted as yyyy-mm-dd
 */
export const formatDateForInput = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Convert time string to time input format (hh:mm)
 * @param {Date} date - Date object to format
 * @returns {string} Time formatted as hh:mm
 */
export const formatTimeForInput = (date = new Date()) => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

/**
 * Convert date from HTML input format (yyyy-mm-dd) to display format (Month Day, Year)
 * @param {string} dateStr - Date string in yyyy-mm-dd format
 * @returns {string} Date formatted as "Month Day, Year"
 */
export const formatDateForDisplay = (dateStr) => {
  if (!dateStr) return '';
  
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

/**
 * Convert display format date (Month Day, Year) to HTML input format (yyyy-mm-dd)
 * @param {string} displayDate - Date string in "Month Day, Year" format
 * @returns {string} Date formatted as yyyy-mm-dd
 */
export const parseDisplayDate = (displayDate) => {
  if (!displayDate) return '';
  
  const date = new Date(displayDate);
  if (isNaN(date.getTime())) return '';
  
  return formatDateForInput(date);
};

/**
 * Convert time from HTML input format (hh:mm) to display format (h:mm am/pm)
 * @param {string} timeStr - Time string in hh:mm format
 * @returns {string} Time formatted as "h:mm am/pm"
 */
export const formatTimeForDisplay = (timeStr) => {
  if (!timeStr) return '';
  
  const [hours, minutes] = timeStr.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0);
  
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).toLowerCase();
};

/**
 * Convert display format time (h:mm am/pm) to HTML input format (hh:mm)
 * @param {string} displayTime - Time string in "h:mm am/pm" format
 * @returns {string} Time formatted as hh:mm
 */
export const parseDisplayTime = (displayTime) => {
  if (!displayTime) return '';
  
  // Create a date object with the time string
  const date = new Date(`1/1/2000 ${displayTime}`);
  if (isNaN(date.getTime())) return '';
  
  return formatTimeForInput(date);
};