import * as $ from 'jquery';

/**
 * getArrivals() gets the raw arrivals data for a specific bus stop
 * @param {String} smsCode The smsCode of a particular bus stop
 * @returns {Object}
 */
export const getRawArrivals = async (smsCode) => {
    const search = await $.getJSON(`https://api.tfl.gov.uk/StopPoint/Search/${smsCode}`);
    const stopId = search.matches[0].id;
    return await $.getJSON(`https://api.tfl.gov.uk/StopPoint/${stopId}/Arrivals`);
};
