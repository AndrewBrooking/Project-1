// Start logic after page has loaded
$(document).ready(function () {

    init();
});

function init() {

    // Initialize input character counting
    $('input#zip-input').characterCounter();

    // Initialize date pickers
    $('.datepicker').datepicker({
        autoClose: true,
        defaultDate: Date.now(),
        setDefaultDate: true
    });

    // Initialize modals
    $('.modal').modal();

    // Intialize select fields
    $('select').formSelect();
}
// ##################  API Info #############################
//yelp
const  yelpID = "8tbFFNcnX4YcPxbNA7DwBw"
const yelpApiKey = "231r7Ia-ZXGh5J9wW4MA3DBGzycWROrufJz0I3wD_H1uCf16dba1IkRfPGyCzOSc9Cs8IbCyVMJcVT7oA0efxI756ydSvCXUA6pLTFyaRrjR3OgJzETvz68qRxdKXXYx"

//google places 
const gPlacesApiKey = "&key=AIzaSyCBjqQBqpsTRLKM_9Y0bYVCWNQVQwrve6o"


var gPlaceLoc = "location=-33.8670522,151.1957362"
var gPlaceRadius = "&radius=50"
var gPlaceType1 = "&types=restaurant"
var name = "&name=harbour"

var gPlaceURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" + gPlaceLoc + gPlaceRadius + gPlaceType1 + gPlacesApiKey;

var exampeURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise" + gPlacesApiKey;

// $.ajax({
//     url: exampeURL,
//     method: "GET",
//     datatype: "jsonp",
// }).then(function (response) {
//     console.log(response);

// });
//  logPlaceDetails()

// function logPlaceDetails() {
//     var service = new google.maps.places.PlacesService(document.getElementById('map'));
//     service.getDetails({
//       placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
//     }, function (place, status) {
//       console.log(place);
//     });
//   }
fuckGoogle();

var map;
var service;
var infowindow;

function fuckGoogle() {
  var pyrmont = new google.maps.LatLng(29.749907,-95.358421);

  map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15
    });

  var request = {
    location: pyrmont,
    radius: '500',
    type: ['restaurant']
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  console.log(results);
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
}