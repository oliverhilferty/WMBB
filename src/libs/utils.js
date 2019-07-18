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

/**
 * Writes user data to local storage
 * @param {Object} data
 */
export const writeUserData = (data) => {
    window.localStorage.setItem('userData', JSON.stringify(data));
};

/**
 * Reads user data from local storage
 * @returns {Object}
 */
export const readUserData = () => {
    const storage = window.localStorage;

    // Create a user data object on local storage if one doesn't already exist
    if (!storage.getItem('userData')) {
        writeUserData({});
    }

    return JSON.parse(storage.userData);
};

export const saveStop = (stopName, stopCode) => {
    const userData = readUserData();

    if (!userData.hasOwnProperty('stops')) {
        userData.stops = [];
    }

    userData.stops.push({
        stopName,
        stopCode
    });

    writeUserData(userData);
};