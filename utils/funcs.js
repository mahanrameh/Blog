

exports.calculateTimeGap = (createdAt) => {
    const currentTime = new Date();
    const createdAtTime = new Date(createdAt);

    const timeDifference = Math.abs(currentTime - createdAtTime);
    const seconds = Math.floor(timeDifference / 1000);

    if (seconds < 60) {
        return 'right now';
    } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);

        return `${minutes} minutes ago`;
    } else {
        const hours = Math.floor(seconds / 3600);

        if (hours < 24) {
            return `${hours} hours ago`;
        } else {
            const days = Math.floor(hours / 24);

            return `${days} days ago`;
        }
    }




};