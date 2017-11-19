var debug = true;

$(document).ready(function() {

  // Event Listeners
  $('.submitButton').click(function() {
    // Get SMS code from input field
    var smsCode = $('.smsCode').val();
    log(smsCode);

    // Clear the table
    clearTable();


    // Get arrivals for bus stop from sms code
    getArrivals(smsCode).then(function(response) {
      log(response);

      // Extract required data from repsonse
      var arrivals = parseArrivals(response);
      log(arrivals);

      var sortedArrivals = sortArrivals(arrivals);
      log(sortedArrivals);

      populateTable(sortedArrivals);

    });
  });
});


/**
 * isDST() determines whether we are currently in daylight saving time
 * @returns {boolean} true or false, where true
 * indicates being in daylight saving time
 */
function isDST() {
  Date.prototype.stdTimezoneOffset = function() {
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  };

  Date.prototype.dst = function() {
    return this.getTimezoneOffset() < this.stdTimezoneOffset();
  };

  var today = new Date();
  return today.dst();
}

/**
 * clearTable() clears all rows from the table
 */
function clearTable() {
  $('td').remove();
}

/**
 * Extracts the routenumber, destination, and time until arrival from
 * arrival object
 * @param {Object} arrivalsObject - Response from getArrivals()
 * @returns {Array} - An array of objects containg routes, destinations, and
 * arrival times of buses taken from arrivals argument
 */
function parseArrivals(arrivalsObject) {

  // initialize the array to hold the parsed arrivals
  var arrivalTimes = [];

  // Iterate over the arrivals object
  arrivalsObject.forEach(function(arrival) {

    // Init variable to hold details of bus arrival
    var bus = {};

    // Get route id from arrival object
    bus.route = arrival.lineId;

    // Get route destination from arrival object
    bus.destination = arrival.destinationName;

     // Get time until arrival
     bus.timeUntil = parseExpectedArrival(arrival.expectedArrival);

     // Append to arrivalTimes list
     arrivalTimes.push(bus);

  });

  return arrivalTimes;
}


/**
 * Sorts a list of arrival objects based on time until arrival
 * @param {Array} arrivalObjects - An array of arrival objects
 */
function sortArrivals(arrivalObjects) {
  arrivalObjects.sort(function(a, b) {
    return parseFloat(a.timeUntil) - parseFloat(b.timeUntil);
  });

  return arrivalObjects
}


/**
 * Populates the arrivals table
 * @param {Array} arrivalTimes - An array of objects containing route id,
 * destination, and time until arrival
 */
function populateTable(arrivalTimes) {

  // Cache the table body jquery object
  var $table = $('tbody');

  // Sort arrival times
  var sortedTimes = sortArrivals(arrivalTimes);

  sortedTimes.forEach(function(arrivalObject) {

    // Create route element
    var $route = $('<td />').text(`${arrivalObject.route}`);

    // Create destination element
    var $destination = $('<td />').text(`${arrivalObject.destination}`);

    // Convert arrival time to readable string
    var timeUntilString;
    var timeUntil = arrivalObject.timeUntil;

    if (timeUntil == 0) {
      timeUntilString = 'Due';
    } else {
      timeUntilString = `${timeUntil} min` + (timeUntil == 1 ? '' : 's');
    }

    // Create time until element
    var $timeUntil = $('<td />').text(`${timeUntilString}`);

    // create table row
    var $row = $('<tr />');

    // append elements to row
    $row.append($route, $destination, $timeUntil);

    // append row to table
    $table.append($row);
  });
}

/**
 * parseExpectedArrival() calculates the time until a given time in minutes
 * @param {String} expectedArrival - expectedArrival string from arrivals object
 * @returns {String} - The time in minutes
 */
function parseExpectedArrival(expectedArrival) {

  // Extract time from expectedArrival string
  var arrivalTime = expectedArrival.split('T')[1].slice(0,-1).split(':');
  log(arrivalTime);

  // Set hours, minutes, and seconds
  var hours = parseInt(arrivalTime[0]) + (isDST() ? 1 : 0);
  log(hours);
  var minutes = arrivalTime[1];
  var seconds = arrivalTime[2];

  // init time object
  var time = new Date();

  // Set time
  time.setHours(hours);
  time.setMinutes(minutes);
  time.setSeconds(seconds);
  time.setMilliseconds(0);

  // Calculate the time from now until the given time
  var timeUntil = (time.getTime() - new Date().getTime()) / 1000 / 60;
  timeUntil = Math.round(timeUntil);

  if (timeUntil <= 0) {timeUntil = 0;}

  log(timeUntil);
  return timeUntil;
}

/**
 * getArrivals() gets the arrival times for all buses at a specific bus stop
 * @param {String} smsCode The smsCode of a particular bus stop
 * @returns {Object} An object containing bus arrival times for the given smsCode
 */
async function getArrivals(smsCode) {

  // Search for the stop code
  var data = await $.getJSON(`https://api.tfl.gov.uk/StopPoint/Search/${smsCode}`);

  // Extract the stop id from the search results
  var id = data.matches[0].id;

  // Get the arrivals data
  var arrivals = await $.getJSON(`https://api.tfl.gov.uk/StopPoint/${id}/Arrivals`);

  return arrivals;
}

/**
 * Log function for debugging
 * @param {String} message - The message to log to the screen and console
 */
function log(message) {
  if (debug == true) {
    console.log(message);
    Materialize.toast(message, 4000);
  } else if (debug == 'console only') {
    console.log(message);
  }
}
