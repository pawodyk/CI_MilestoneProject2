//global variables that could be used in the future to modify the search
// since I was aiming for simplicity I hard coded the days_ago and number of results variables
// by default it displays only results 10 days old and 48 results per call
// 48 was chosen because it is closest number to maximum value of 50 and 
// is divisible by 3 and 2 which is important for user experience since the cards are displayed 
// - by 3 for desktop - by 2 for tablets and - by 1 on smartphones.
const results = 48; // 1-50
const daysOld = 15;

// hardcoded curency and country for Adzuna API call
// gb au at br ca de fr in it nl nz pl ru sg us za
const localisation = "gb"; 
const curency = "&pound;";

// added time difference to offset the conversion of time from string to local date
const timeDif = 60;


/* ================== global variables ====================*/
// @page holds page number for request from server
// @to current number of results to display
// @jobQuery result of the input tag #input_job
// @placeQuery result of the input tag #input_place
// @responce hold the array of results received from Adzuna API - to preserve api calls
// @map hold the Microsoft.Maps.Map variable from bing maps

var page = 1;   
var to = 6;
var jobQuery = "";
var placeQuery = "";

var response = [];
var map;

/* ================== input functions ===================*/

// jquery functions taking the value inputed via input field
// listen for event of pressing enter key in a filed
$('.input').keydown(function (event) {
    if (event.keyCode == 13) {
        jobQuery = $('#input_job').val();
        placeQuery = $('#input_place').val();
        acquireResponse(1);
    }
});

// listens for the button click event from #go button
$('#go').click(function (event) {
    jobQuery = $('#input_job').val();
    placeQuery = $('#input_place').val();
    acquireResponse(1);
});


/* ===================== general functions =======================*/

// acquireResponce(int:@requestedPage)
//  displays the overlay to prevent multiple calls to the server while the data is loading
//  prepares the document by clearing the #job_list and map from previous results and ensures the map is not hiden
//  asign @requestedPage to the page variable
//  calls the getData(@obQuery,@placeQuery,@function (data){}) to aquire the results from the server
//  calls the writeToHTML() to display the results on the page
//  calls the addPushpins() to render the pins/clusters on the map
//  in case of no results provided from the server the message is displayed to the user

function acquireResponse(requestedPage) {

    $("body").append('<div id="overlay" class="d-flex align-items-center justify-content-center"><img src="img/ajax-loading.gif" alt="loading..." width="100"></div>');

    //console.log(`input: ${jobQuery}@${placeQuery}`);
    
    clearJobList();

    //display map
    $("#map").removeClass("_hide");
    map.layers.clear();

    page = requestedPage;

    getData(jobQuery, placeQuery, function (data) {
        response = data.results;
        console.log(response); // returns the array of responses to the console
        if (response.length > 0) {
            if (response.length<6){
                to = response.length;
            }else{
                to = 6;
            }
            
            writeToHTML();
            addPushpins();
        } else {
            messageUser(`<div class="message_text flex-grow-1 ml-2 my-auto"><div><span class="badge badge-info align-middle">!!!</span>&nbsp;No Jobs Found...</div></div>`);
        }

    });
}

// displayMore()
//  displays more results in the intervals of 6 (48%6 == 0)
//  if all the results are displayed it changes the content of the more button to request more results from server

function displayMore() {
    $("#btn_more").remove();
    clearJobList();
    if (response.length > to + 6) {
        to += 6;
        writeToHTML();
    } else {
        to = response.length;
        writeToHTML();
        $("#btn_more").html("Request next " + results + " jobs from the server").attr("onclick", "requestMore()");
    }
}

// requestMore()
//  increases the page by 1 and calls the acquireResponse(@page) to request next 48 results from the server 

function requestMore() { 
    page++;
    acquireResponse(page);
    console.log("requested next " + results + " jobs from server");
}

// clearJobList()
//  clears the #job_list from old results
//  hides the message box

function clearJobList(){
    $('#msg_box').addClass("_hide");
    $("#job_list").html("");
}

// messageUser(string:@message)
// displays @message to the user in the predefined #msg_box

function messageUser(message){
    $('#msg_box').removeClass("_hide");
    $('#msg_content').html("");
    $('#msg_content').html(`${message}`);
}

//  writeToHTML()
//  -Write the results to html-
//  itterates through results to extract required information
//  writes the information to the html string with the aproprate tags and structure 
//  injects prepreperd html string using jquery to the document

function writeToHTML() {
    var from = 0;
    //console.log("writing to HTML... page: " + page + "; results:" + from + "-->" + to); // shows the requested page and number of results being added to the html - for debuging and testing 
    var html = '<div class="row my-1 px-2">';
    

    for (let index = from; index < to; index++) {
        const element = response[index];
        let time = calculateTime(element.created);
        let description = shorten(element.description, 400);
        //let company = shorten(element.company.display_name, 20);
        let salary = element.salary_min != element.salary_max ? `${curency} ${element.salary_min} - ${curency} ${element.salary_max}` : `${curency} ${element.salary_max}`;
        
        html += 
        `<div id="${element.id}" class="col-12 col-md-6 col-lg-4 p-0">
            <div class="d-flex flex-column card shadow m-2">
                <div class="job_box card-body pb-0">
                    <div class="job_title d-flex align-items-center justify-content-center">
                        <h3>${element.title}</h3>
                    </div>
                    <div class="details_container d-flex flex-sm-row flex-column justify-content-between">
                        <div class="details_group float-left d-inline-flex flex-column">
                            <div class="job_company details"><i class="fas fa-building" style="color:blue;"></i>&nbsp;<span title="${element.company.display_name}">${element.company.display_name}</span></div>
                            <div class="job_location details"><i class="fas fa-map-marked-alt" style="color:red;"></i>&nbsp;<span title="${element.location.display_name}">${element.location.display_name}</span></div>
                        </div>
                        <div class="details_group float-right d-inline-flex flex-column">
                            <div class="details"><i class="fas fa-money-bill-alt" style="color:green;"></i>&nbsp;<span title="${salary}">${salary}</span></div>
                            <div class="job_date details"><i class="fas fa-business-time" style="color:orange;"></i>&nbsp;<span title="${time}">${time}</span></div>
                        </div>
                    </div>
                    <div class="job_description d-flex align-items-stretch justify-content-center">
                        <p class="m-0 p-0">${description}</p>
                    </div>
                </div>
                <div class="align-bottom d-flex px-1 align-items-end">
                    <a class="btn btn-success text-center btn_apply p-2" href="${element.redirect_url}" target="_blank">Apply</a>
                </div>
            </div>
        </div>`;
    }
    html += `</div> 
            <button id="btn_more" class="btn btn-primary p-2 m-1 shadow float-right" type="submit" onclick="displayMore()">MORE!</button>`;

    $('#job_list').html(html);
}

/* ================== WriteToHTML() helper classes =========================*/

// shorten (string:@word, int:@maxLength)
// takes the string @word and shorten it to the lenght passed by @maxLength
// used to remove the <strong> tags and shorten the desription received from Adzuna API
function shorten(word, maxLength) {
    var shortened;
    if (typeof word !== "undefined") {
        shortened = word.replace(/\<strong\>/g, "").replace(/\<\/strong\>/g, "");
        shortened = shortened.length > maxLength ? shortened.substring(0, maxLength) + "..." : shortened;
    } else {
        shortened = "Not Specified";
    }
    return shortened;
}

// calculateTime(Date:@time)
// takes the @time value and subtract it from the current date
// used to calculate time passed since the ad was posted
// note: work only for current time zone 
function calculateTime(time) {

    var currentDate = new Date();
    
    var adDate = new Date(time);
    
    
    let result = (currentDate - adDate) / (1000 * 60) + timeDif;

    if (result < 60) {
        result = Math.floor(result);
        if (result === 1) result = result + " minute ago";
        else result = result + " minutes ago";
    } else if (result / 60 < 24) {
        result = Math.floor(result / 60);
        if (result === 1) result = result + " hour ago";
        else result = result + " hours ago";
    } else {
        result = Math.floor(result / (60 * 24));
        if (result === 1) result = result + " day ago";
        else result = result + " days ago";
    }
    return result;
}



/* ======================== API s =========================== */

// getData(string:@job,string:@place,function:@cb)
// Call to Adzuna API use @place and @job in the request to adzuna server
// return the json data as a parameter in @cb function
// removes #overlay tag after the callback

function getData(job, place, cb) {

    const appID = '0bbe3156';
    const appKey = '3c663976945b145820dd4a4acd49ef3c';
    const category = 'it-jobs';

    job = encodeURI(job);
    place = encodeURI(place);

    var url = `https://api.adzuna.com/v1/api/jobs/${localisation}/search/${page}?app_id=${appID}&app_key=${appKey}&results_per_page=${results}&distance=30&max_days_old=${daysOld}&category=${category}&sort_by=date&what=${job}&where=${place}`;

    var xhr = new XMLHttpRequest();

    xhr.open("GET", url);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
        $("#overlay").remove();
    };
}



/* ============ BING Maps API: ================= */

// GetMap()
// request and renders the Bing map in the #map tag

function GetMap() {
    
    map = new Microsoft.Maps.Map('#map', {
        //credentials: 'Ardk901xHTnQMsqQm8sYUmbI9R6MC2U1crUKj2S4w9GnC2j_UiCkbZqSpuHPUlTb',
        //center: pointTo,
        mapTypeId: Microsoft.Maps.MapTypeId.grayscale,
        disableBirdseye: true,
        disableStreetside: true,
        showMapTypeSelector: false,
        zoom: 6,
        minZoom: 4,
        maxZoom: 12
    });

}

// addPushpins()
// adds pushpins to the map and adds them into pins clusters
// display clusters on the map as a layer using custom cluster options taken from "bing maps APi examples"[link in the readme file]
// adds the click event to each cluster/pin, which invokes onClusterClick() function
// calls focusOnCluster(ClusterLayer) before it renders the clusters/pins in order to focus on the cluster

function addPushpins() {
    
    var pins = [];
    response.forEach(function (element) {

        if (typeof element.latitute != 'number' && typeof element.longitude != 'number') {
            console.log("invalid coordinates: " + typeof element.latitude + ", " + typeof element.longitude);

        } else {
            let location = new Microsoft.Maps.Location(element.latitude, element.longitude);
            let pin = new Microsoft.Maps.Pushpin(location, {
                title: element.location.area[element.location.area.length - 1],
                subTitle: element.title.replace(/\<strong\>/g, "").replace(/\<\/strong\>/g, ""),
                text: 1,
                color: "rgba(65, 168, 213, 0.5)"
            });
            pin.id = element.id;

            // map.entities.push(pin);
            pins.push(pin);
        }

    });

    Microsoft.Maps.loadModule('Microsoft.Maps.Clustering', function () {
        var clusterLayer = new Microsoft.Maps.ClusterLayer(pins, {
            clusteredPinCallback: createCustomClusteredPin,
            gridSize: 80
        });

        Microsoft.Maps.Events.addHandler(clusterLayer, 'click', onClusterClick);

        focusOnCluster(clusterLayer);
        map.layers.insert(clusterLayer);
    });

}


// NOTE: this code was taken from Microsoft Documents - Customizing Clustered Pushpins Example:
// createCustomClusterPin(ClusterLayer:@cluster)
// takes default Microsoft.Maps.ClusterLayer and modify the options to display custom svg visuals

function createCustomClusteredPin(cluster) {
    //Define variables for minimum cluster radius, and how wide the outline area of the circle should be.
    var minRadius = 12;
    var outlineWidth = 6;
    //Get the number of pushpins in the cluster
    var clusterSize = cluster.containedPushpins.length;
    //Calculate the radius of the cluster based on the number of pushpins in the cluster, using a logarithmic scale.
    var radius = Math.log(clusterSize) / Math.log(10) * 5 + minRadius;
    //Default cluster color is red.
    var fillColor = 'rgba(255, 40, 40, 0.5)';
    if (clusterSize < 10) {
        //Make the cluster green if there are less than 10 pushpins in it.
        fillColor = 'rgba(20, 180, 20, 0.5)';
    } else if (clusterSize < 20) {
        //Make the cluster yellow if there are 10 to 19 pushpins in it.
        fillColor = 'rgba(255, 210, 40, 0.5)';
    }
    //Create an SVG string of two circles, one on top of the other, with the specified radius and color.
    var svg = ['<svg xmlns="http://www.w3.org/2000/svg" width="', (radius * 2), '" height="', (radius * 2), '">',
        '<circle cx="', radius, '" cy="', radius, '" r="', radius, '" fill="', fillColor, '"/>',
        '<circle cx="', radius, '" cy="', radius, '" r="', radius - outlineWidth, '" fill="', fillColor, '"/>',
        '</svg>'
    ];
    //Customize the clustered pushpin using the generated SVG and anchor on its center.
    cluster.setOptions({
        icon: svg.join(''),
        anchor: new Microsoft.Maps.Point(radius, radius),
        textOffset: new Microsoft.Maps.Point(0, radius - 8) //Subtract 8 to compensate for height of text.
    });
    
}

// NOTE: this code was taken from Microsoft Documents - Zoom into Clusters Example:
// focusOnCluster(ClusterLayer:cl)
// modified code from the microsoft bing maps api
// takes Microsoft.Maps.ClusterLayer and chages the view of the bing map to the clusters displayed

function focusOnCluster(cl) {
    var pins = cl.getPushpins();
    if (pins) {
        var locs = [];
        for (var i = 0; i < pins.length; i++) {
            //Get the location of each pushpin.
            locs.push(pins[i].getLocation());
        }

        //Create a bounding box for the pushpins.
        var bounds = Microsoft.Maps.LocationRect.fromLocations(locs);

        //Zoom into the bounding box of the cluster. 
        //Add a padding to compensate for the pixel area of the pushpins.
        map.setView({
            bounds: bounds,
            padding: 100
        });
    }
}


/* ===================== Map Events ========================= */

// onClusterClick(Event:@e)
// invoked on click from the cluser
// removes the job cards and then adds only the cards that match the id of the jobs in the cluster selected
// calls messageUser(string) - which adds message to the user informing them on the location selected
//                              or displays "multiple locations" if the user select cluster with diferent locations

function onClusterClick(e) {
        e = e.target;
        to = response.length;
        var location = "";
        writeToHTML();
        
        $("#btn_more").html("Display All");
        $("#job_list>.row").children().addClass("_hide");
        if(e.containedPushpins){
            e.containedPushpins.forEach(function(el){
                if(location === "" || location === el.entity.title){
                    location = el.entity.title;
                } else {
                    location = "Multiple Locations";
                }
                
                $(`#${el.id}`).removeClass("_hide");
            });
        } else {
            location = e.entity.title;
            $(`#${e.id}`).removeClass("_hide");
        }
        messageUser(`<div class="message_text flex-grow-1 ml-1 ml-lg-5 my-auto"><div>Displaying jobs in&nbsp;: <span class="badge badge-info">${location}</span></div></div><div><button class="btn btn-primary p-2 shadow float-right" type="submit" onclick="displayMore()">Display All</button></div>`);
}

/* ====================== Possible implementation for the future =================== */

//posible improvement.. would change the country of search based on the available countries in Adzuna API
// would have to change the currency as well as time zones for the calculateTime(Date) function

/*
var pointTo = new Microsoft.Maps.Location(50.50632, -10.12714);

function setCountry(location) {
    // gb au at br ca de fr in it nl nz pl ru sg us za
    localisation = location; 
    if (location === "gb"){
        curency = "&pound;";
        pointTo = new Microsoft.Maps.Location(53.943832, -2.550564);
    }else if (location === "au") {
        curency = "&#36;";
        pointTo = new Microsoft.Maps.Location(-25.578938, 134.359711);
    }else if (location === "at") {
        curency = "&euro;";
        pointTo = new Microsoft.Maps.Location(47.587086, 14.141286);
    }else if (location === "br") {
        curency = "BRL";
        pointTo = new Microsoft.Maps.Location(-10.776803, -53.068085);
    }else if (location === "ca") {
        curency = "&#36;";
        pointTo = new Microsoft.Maps.Location(62.536041, -96.388351);
    }else if (location === "de") {
        curency = "&euro;";
        pointTo = new Microsoft.Maps.Location(51.121807, 10.400695);
    }else if (location === "fr") {
        curency = "&euro;";
        pointTo = new Microsoft.Maps.Location(46.621841, 2.451944);
    }else if (location === "in") {
        curency = "&#8377;";
        pointTo = new Microsoft.Maps.Location(22.493118, 79.727013);
    }else if (location === "it") {
        curency = "&euro;";
        pointTo = new Microsoft.Maps.Location(43.52903, 12.162184);
    }else if (location === "nl") {
        curency = "&euro;";
        pointTo = new Microsoft.Maps.Location(52.342258, 5.528157);
    }else if (location === "nz") {
        curency = "&#36;";
        pointTo = new Microsoft.Maps.Location(-43.947639, 170.502869);
    }else if (location === "pl") {
        curency = "PLN";
        pointTo = new Microsoft.Maps.Location(52.12904, 19.393702);
    }else if (location === "ru") {
        curency = "&#x20bd;";
        pointTo = new Microsoft.Maps.Location(56.133307, 40.407715);
    }else if (location === "sg") {
        curency = "&pound;";
        pointTo = new Microsoft.Maps.Location(1.35757, 103.810226);
    }else if (location === "us") {
        curency = "&#36;";
        pointTo = new Microsoft.Maps.Location(39.495914, -98.989983);
    }else if (location === "za") {
        curency = "R";
        pointTo = new Microsoft.Maps.Location(-29.00231, 25.080317);
    }
}
*/