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

export { calculateDuration };