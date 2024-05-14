export function timeRemaining(isoDate: string): string {
    const now = new Date();
    const endDate = new Date(isoDate);
    const diff = endDate.getTime() - now.getTime();

    if (diff < 0) {
        return "0 minutes";
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);

    const daysPart = days > 0 ? `${days} day${days > 1 ? 's' : ''}, ` : '';
    const hoursPart = hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}, ` : '';
    const minutesPart = minutes > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''}, ` : '';

    // Trim the trailing comma if necessary
    const formatted = (daysPart + hoursPart + minutesPart).replace(/, $/, '');

    return formatted || 'Less than a minute';
}

export function parseISODuration(duration: string): string {
    const regex = /P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const parts = regex.exec(duration);

    if (!parts) return "Invalid duration format";

    const days = parts[1] ? parseInt(parts[1], 10) : 0;
    const hours = parts[2] ? parseInt(parts[2], 10) : 0;
    const minutes = parts[3] ? parseInt(parts[3], 10) : 0;

    const partsArray = [
        days > 0 ? `${days} day${days > 1 ? 's' : ''}` : '',
        hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : '',
        minutes > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''}` : '',
    ].filter(part => part !== ''); // Remove empty strings

    return partsArray.join(', ') || 'Less than a minute';
}

export function isLessThanTenMinutes(isoDuration: string) {
    const regex = /P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)W)?(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const matches = regex.exec(isoDuration);

    if (!matches) return "Invalid duration format";

    // Extract time parts from the regex match, defaulting to 0 if undefined
    const years = parseInt(matches[1]) || 0;
    const months = parseInt(matches[2]) || 0;
    const weeks = parseInt(matches[3]) || 0;
    const days = parseInt(matches[4]) || 0;
    const hours = parseInt(matches[5]) || 0;
    const minutes = parseInt(matches[6]) || 0;
    const seconds = parseInt(matches[7]) || 0;

    // Calculate total time in minutes
    const totalMinutes = (years * 525600) + (months * 43800) + (weeks * 10080) + (days * 1440) + (hours * 60) + minutes + (seconds / 60);

    // Return true if total minutes is less than 10
    return totalMinutes < 10;
}