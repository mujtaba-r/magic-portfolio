export function formatDate(date: string | undefined, includeRelative = false) {
    if (!date) return '';

    const currentDate = new Date();
    let targetDate: Date;

    try {
        // If the date doesn't include time, add it
        if (!date.includes('T')) {
            date = `${date}T00:00:00Z`;
        }
        
        // Parse the date and ensure it's in UTC
        targetDate = new Date(date);
        if (isNaN(targetDate.getTime())) {
            console.warn(`Invalid date: ${date}`);
            return 'Invalid date';
        }
    } catch (error) {
        console.warn(`Error parsing date: ${date}`, error);
        return 'Invalid date';
    }

    const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
    const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
    const daysAgo = currentDate.getDate() - targetDate.getDate();

    let formattedDate = '';

    if (yearsAgo > 0) {
        formattedDate = `${yearsAgo}y ago`;
    } else if (monthsAgo > 0) {
        formattedDate = `${monthsAgo}mo ago`;
    } else if (daysAgo > 0) {
        formattedDate = `${daysAgo}d ago`;
    } else {
        formattedDate = 'Today';
    }

    const fullDate = targetDate.toLocaleString('en-us', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
    });

    if (!includeRelative) {
        return fullDate;
    }

    return `${fullDate} (${formattedDate})`;
} 