export function formatDateTime(dateTimeString: string): string {
  try {
    const date = new Date(dateTimeString);

    if (isNaN(date.getTime())) {
      return "Invalid date";
    }

    const dateOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const formattedDate = date.toLocaleDateString("en-US", dateOptions);
    const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

    return `${formattedDate} at ${formattedTime}`;
  } catch (error) {
    return "Invalid date format";
  }
}
