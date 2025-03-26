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

    const fullDate = targetDate.toLocaleString('en-us', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    if (!includeRelative) {
        return fullDate;
    }

    const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
    const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
    const daysAgo = currentDate.getDate() - targetDate.getDate();

    let relativeDate = '';
    if (yearsAgo > 0) {
        relativeDate = `${yearsAgo}y ago`;
    } else if (monthsAgo > 0) {
        relativeDate = `${monthsAgo}mo ago`;
    } else if (daysAgo > 0) {
        relativeDate = `${daysAgo}d ago`;
    } else {
        relativeDate = 'Today';
    }

    return `${fullDate} (${relativeDate})`;
} 