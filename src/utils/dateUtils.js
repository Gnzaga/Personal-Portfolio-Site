const calculateDuration = (startDate, endDate = null) => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  
  if (months < 0 || (months === 0 && end.getDate() < start.getDate())) {
    years--;
    months += 12;
  }
  
  // Adjust for day difference if needed, simplified to approximate
  if (end.getDate() < start.getDate()) {
    months--;
  }
  
  if (months < 0) {
    months += 12;
    // years is already adjusted
  }

  const parts = [];
  if (years > 0) parts.push(`${years} year${years === 1 ? '' : 's'}`);
  if (months > 0) parts.push(`${months} month${months === 1 ? '' : 's'}`);
  
  if (parts.length === 0) return "Less than a month";
  return parts.join(', ');
};

const pad = (n) => String(n).padStart(2, '0');

/**
 * Normalise a free-form post date ("January 3, 2026", "July 2026") to a
 * sortable, fixed-width log stamp: YYYY-MM-DD, or YYYY-MM when the source
 * only names a month. Unparseable input is returned unchanged.
 *
 * @param {string} dateStr
 * @returns {string}
 */
const toLogDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  const monthOnly = /^[A-Za-z]+\.?\s+\d{4}$/.test(dateStr.trim());
  const ym = `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
  return monthOnly ? ym : `${ym}-${pad(d.getDate())}`;
};

export { calculateDuration, toLogDate };