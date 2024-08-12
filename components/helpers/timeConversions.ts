export function getTimeLeft(endDate: string) {
    const now = new Date();
    const end = new Date(endDate);

    // Calculate the difference in milliseconds
    const diffMs = end.getTime() - now.getTime();

    if (diffMs < 0) {
        return {
            readableString: "Ended",
            isLessThanTenMinutes: false
        };
    }

    // Convert milliseconds to various time units
    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const remainingHours = hours % 24;
    const remainingMinutes = minutes % 60;
    const remainingSeconds = seconds % 60;

    // Determine if we should include seconds (only if less than 5 minutes left)
    const includeSeconds = minutes < 5;

    // Construct readable string
    const partsArray = [
        days > 0 ? `${days} day${days > 1 ? 's' : ''}` : '',
        remainingHours > 0 ? `${remainingHours} hour${remainingHours > 1 ? 's' : ''}` : '',
        remainingMinutes > 0 ? `${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}` : '',
        includeSeconds && remainingSeconds > 0 ? `${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''}` : '',
    ].filter(part => part !== ''); // Remove empty strings

    const readableString = partsArray.join(', ') || 'Less than a second';

    // Calculate total time in minutes
    const totalMinutes = (days * 1440) + (remainingHours * 60) + remainingMinutes + (remainingSeconds / 60);

    return {
        readableString: `${readableString} remaining`,
        isEndingSoon: totalMinutes < 5
    };
}
