export function extractTime(dateString:string) {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = padZero(date.getMinutes());
    const period = hours >= 12 ? "PM" : "AM";
  
    // Convert to 12-hour format
    hours = hours % 12 || 12; // Convert 0 to 12 for midnight
    const paddedHours = padZero(hours);
  
    return `${paddedHours}:${minutes} ${period}`;
  }
  
  // Helper function to pad single-digit numbers with a leading zero
  function padZero(number:number) {
    return number.toString().padStart(2, "0");
  }
  