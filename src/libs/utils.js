/**
 * isDST() determines whether we are currently in daylight saving time
 * @returns {boolean} where true indicates being in daylight saving time
 */
function isDST() {
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
}