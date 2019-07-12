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