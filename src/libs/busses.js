import * as $ from 'jquery';
import {timeUntil} from "./utils";

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

/**
 * Parses and sorts raw arrival data into a list of object with route numbers, destinations, and times until arrival
 * @param {Object} rawArrivals
 * @returns {Object[]}
 */
export const parseRawArrivals = (rawArrivals) => {
    const arrivals = [];
    for (const arrival of rawArrivals) {
        const destination = arrival["destinationName"];
        const routeNumber = arrival["lineName"];
        const expectedArrival = arrival["expectedArrival"];

        let timeUntilArrival = timeUntil(expectedArrival);
        timeUntilArrival = timeUntilArrival > -1 ? timeUntilArrival : 0;
        let timeUntilArrivalString;
        if (timeUntilArrival === 0) {
            timeUntilArrivalString = 'Due';
        } else {
            timeUntilArrivalString = `${timeUntilArrival} min${timeUntilArrival === 1 ? '' : 's'}`;
        }

        arrivals.push({
            destination,
            routeNumber,
            timeUntilArrival,
            timeUntilArrivalString
        });
    }

    return arrivals.sort((a, b) => a.timeUntilArrival - b.timeUntilArrival);
};