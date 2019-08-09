<<<<<<< HEAD
function queryAPI(url) {
    let results;

    $.ajax({
        url: url,
        method: 'GET'
    }).then(function (data) {
        metroID = data.resultsPage.results.location[0].metroArea.id;
        results = data;

=======
async function queryAPI(url) {
    let results = await $.ajax({
        url: url,
        method: 'GET'
    }).then(function (data) {
        return data;
>>>>>>> 92ed1cf612cbcc8676b5f5da5d9f8af88dfa92da
    });

}
// async function queryAPI(url) {
//     let results = await $.ajax({
//         url: url,
//         method: 'GET'
//     }).then(function (data) {
//         return data;
//     });
//     return results;
// }






// #################################   API Info ##########################################
//yelp
const yelpID = "8tbFFNcnX4YcPxbNA7DwBw"
const yelpApiKey = "231r7Ia-ZXGh5J9wW4MA3DBGzycWROrufJz0I3wD_H1uCf16dba1IkRfPGyCzOSc9Cs8IbCyVMJcVT7oA0efxI756ydSvCXUA6pLTFyaRrjR3OgJzETvz68qRxdKXXYx"
//songkick
const songkickApiKey = "&apikey=OJjdV1C71cGFN7Nj";
//################################## Songkick API Functions ###################################
//TODO
//use zipcode to do location search and get metro id
//get date from user
//do upcoming events search and return search object for display

var searchArea = "29.7604,-95.3698"; //needs to be a latlng generated from user inputted zipcode
date = "2019-08-08"; //date in form YYYY-MM-DD
var songkickResultsArr = [];
let locSearchURL = "https://api.songkick.com/api/3.0/search/locations.json?&min_date=" + date +"&max_date="+ date+ songkickApiKey + "&location=geo:" + searchArea;
getMetroID(locSearchURL);


//function does an api call to get songkick metro id from latlng. then calls function to do upcoming events search
function musicSearch(locationURL) {

    $.ajax({
        url: locationURL,
        method: 'GET'
    }).then(function (data) {
        var metroID = data.resultsPage.results.location[0].metroArea.id;

        let upcomingMusicURL = "https://api.songkick.com/api/3.0/metro_areas/" + metroID + "/calendar.json?" + dates + songkickApiKey;

        getUpcomingMusic(upcomingMusicURL);

    });

};

function getUpcomingMusic(url) {

    $.ajax({
        url: url,
        method: 'GET'
    }).then(function (data) {
        console.log(data);
        var result = data.resultsPage.results.event;
      
        for (var i = 0; i < result.length; i++) {
            let currentResult = result[i];
            name = currentResult.displayName;
            type = currentResult.type; 
            time = currentResult.start.date + "at: " + currentResult.start.time;
            info = currentResult.uri;
            venue = currentResult.venue.displayName;

            let songkickResultsOBJ = {
                name: name,
                type: type,
                venue: venue,
                info: info,
                time: time,
            }

            songkickResultsArr.push(songkickResultsOBJ);
        }
        console.log(songkickResultsArr);



    });
}
