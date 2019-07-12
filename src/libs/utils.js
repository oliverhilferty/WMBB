/**
 * isDST() determines whether we are currently in daylight saving time
 * @returns {boolean} where true indicates being in daylight saving time
 */
export const isDST = () => {
    Date.prototype.stdTimezoneOffset = function() {
        const jan = new Date(this.getFullYear(), 0, 1);
        const jul = new Date(this.getFullYear(), 6, 1);
        return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    };

    Date.prototype.dst = function() {
        return this.getTimezoneOffset() < this.stdTimezoneOffset();
    };

    const today = new Date();
    return today.dst();
};

/**
 * Gets the time until a given datetime
 * @param {String} time - A datetime string
 * @param {Date} now = new Date() - Optionally, the time to use as the current time
 * @returns {Number} The time until the given time, rounded to the nearest minute
 */
export const timeUntil = (time, now = new Date()) => {
    const then = new Date(time);
    const difference = then - now;
    const mins = difference / 1000 / 60;
    return Math.round(mins);
};