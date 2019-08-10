/**
 * Generic API query call
 */
async function queryAPI(url) {
    // Run query with provided URL then wait for results
    let results = await $.ajax({
        url: url,
        method: 'GET'
    }).then(function (data) {
        return data;
    });

    return results;
}

// ######################################## API Info ########################################

// const yelpID = "8tbFFNcnX4YcPxbNA7DwBw"
// const yelpApiKey = "231r7Ia-ZXGh5J9wW4MA3DBGzycWROrufJz0I3wD_H1uCf16dba1IkRfPGyCzOSc9Cs8IbCyVMJcVT7oA0efxI756ydSvCXUA6pLTFyaRrjR3OgJzETvz68qRxdKXXYx"

// ############################### Google Places API Functions ###############################

/**
 * Convert input from miles to meters
 */
function radiusConverter(distanceMi) {
    return distanceMi * 1609.34;
}

/**
 * Creates a request for Google Places API call 
 */
function gPlacesSearch(lat, lng, types, radius) {
    // 
    var place = new google.maps.LatLng(lat, lng);

    // 
    var map = new google.maps.Map(document.getElementById('map'), {
        center: place,
        zoom: 15
    });

    // 
    var request = {
        location: place,
        radius: radius,
        type: types,
    };

    // Creates a google places service object to search
    var service = new google.maps.places.PlacesService(map);

    // Uses google places nearby search method to generate an API call and return a customized array of results
    return service.nearbySearch(request, function (results, status) {
        var name;
        var location;
        var type;
        var icon;
        var gSearchResultsARR = [];
        
        // 
        for (var i = 0; i<results.length; i++) {
            currentResult = results[i];

            // 
            name = currentResult.name;
            location = currentResult.vicinity;
            type = currentResult.types;
            icon = currentResult.icon;

            // 
            var gSearchResultOBJ = {
                name: name,
                location: location,
                type: type,
                icon: icon,
            }

            // 
            gSearchResultsARR.push(gSearchResultOBJ);
        }

        return gSearchResultsARR;
    });
};
