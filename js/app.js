var debug = true;

$(document).ready(function() {

  // Event Listeners
  $('.submitButton').click(function() {

    // Get SMS code from input field
    var smsCode = $('.smsCode').val();
    log(smsCode);
    getArrivals(smsCode).then(function(response) {
      log(response);
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
 * getArrivals() gets the arrival times for all buses at a specific bus stop
 * @param {String} smsCode The Naptan ID of a particular bus stop
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
  }
}
