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
    const seconds = Math.floor((diff / 1000) % 60);

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
