// alert("Start");
$("document").ready(function() {

  $("input").focus(function() {
  	$("label").css("color", "#e42e2e");
  });
  $("input").blur(function() {
  	$("label").css("color", "#999999");
  });

  $("div.submit").click(function() {
    clearTable();
    var smsCode = $('input').val();
    console.log(smsCode);
    getRoutes(smsCode);
  });

});

function clearTable() {
  $("td").remove();
}

function isDST() {
  Date.prototype.stdTimezoneOffset = function() {
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  }

  Date.prototype.dst = function() {
    return this.getTimezoneOffset() < this.stdTimezoneOffset();
  }

  var today = new Date();
  return today.dst();
}

function generateRow(route, towards, time) {
	var tr = document.createElement("tr");

  var td1 = document.createElement("td");
  td1.innerHTML = route;

  var td2 = document.createElement("td");
  td2.innerHTML = towards;

  var td3 = document.createElement("td");
  td3.innerHTML = time;

  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);

  $('table')[0].appendChild(tr);
}

function generateDirection(routes) {
  console.log("start");
  $(".arrivalsWrapper1").css("display", "none");
  $(".arrivalsWrapper2").css("display", "none");

  if (routes.length == 2) { //two directions
    $(".arrivalsWrapper1").css("display", "block");

    var routes1 = routes[0];
    var routes2 = routes[1];

    $('.arrivalsTop').html(routes1.split('-')[0]);
    $('.arrivalsBottom').html(routes2.split('-')[0]);

    $(".arrivalsTop").click(function() {
      getArrivals(routes1.split("-")[1]);
    });
    $(".arrivalsBottom").click(function() {
      getArrivals(routes2.split("-")[1]);
    });
  } else { // one direction
    $(".arrivalsWrapper2").css("display", "block");

    $('.arrivalsSingle').html(routes[0].split('-')[0]);

    $(".arrivalsSingle").click(function() {
      getArrivals(routes[0].split("-")[1]);
    });
  }
}


function getTimeUntil(hours, minutes, seconds) {
  var time = new Date();
  time.setHours(hours);
  time.setMinutes(minutes);
  time.setSeconds(seconds);
  time.setMilliseconds( 0 );
  var timeUntil = (time.getTime() - new Date().getTime()) / 1000 / 60;
  timeUntil = Math.round(timeUntil);

  if (timeUntil <= 0) {timeUntil = 0;}

  return timeUntil;
}

function getArrivals(naptanId) {
  buses = [];
  return $.getJSON('https://api.tfl.gov.uk/StopPoint/' + naptanId + '/arrivals', function(data) {
    for (var i = 0; i < data.length; i++) {
      var busData = data[i];
      var bus = {};

      bus.id = busData.lineId;
      bus.destination = busData.destinationName;

      var busDataTime = busData.expectedArrival.split("T")[1].replace("Z", "").split(":");
      var busDataHour = parseInt(busDataTime[0]) + (isDST() ? 1 : 0);
      var busDataMin = parseInt(busDataTime[1]);
      var busDataSec = parseInt(busDataTime[2]);
      var timeUntil = getTimeUntil(busDataHour, busDataMin, busDataSec);
      timeUntil = Math.round(timeUntil);
      if (timeUntil < 0) {timeUntil = 0;}

      bus.time = timeUntil;

      buses.push(bus);
    }

    buses.sort(function(a, b) {
      return parseFloat(a.time) - parseFloat(b.time);
    });

    for (var i = 0; i < buses.length; i++) {
      var bus = buses[i];
      var time = bus.time;
      if (time == 0) {
        time = "Due";
      } else if (time == 1) {
        time = "1 min";
      } else {
        time = time + " mins";
      }

      generateRow(bus.id, bus.destination, time);
    }
  });
}

function getRoutes(smsCode) {
  $.getJSON("https://api.tfl.gov.uk/StopPoint/Sms/" + smsCode, function(data) {
    var routes = [];
    // alert(data.children.length)
    for (var i = 0; i < data.children.length; i++) {
      routes.push(data.children[i].additionalProperties[1].value +
      "-" + data.children[i].naptanId);
    }
    console.log(routes);
    //return routes;
    console.log("before function call");
    generateDirection(routes);
  });
}

// NAPTAN ID : 490011217S

// getArrivals("490011217S");
// $(".arrivalsWrapper1").css("display", "block");
