/* eslint-disable eqeqeq */
//API
const appID = '0bbe3156';
const appKey = '3c663976945b145820dd4a4acd49ef3c';
var page = 1;
var results = 30;
var daysOld = 10;

var response = [];

function getData(search, cb) {
    var url = `http://api.adzuna.com/v1/api/jobs/gb/search/${page}?app_id=${appID}&app_key=${appKey}&results_per_page=${results}&max_days_old=${daysOld}&category=it-jobs&sort_by=date`;

    var xhr = new XMLHttpRequest();

    xhr.open("GET", url + search);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };
}

var from = 0;
var to = 6;

//input functions
$('#input_position').keydown(function (event) {
    if (event.keyCode == 13) {
        $('#job-list').html("");
        acquireResponse();
    }
});

$('#go').click(function (event) {

    $('#job-list').html("");
    from = 0;
    to = 6;
    acquireResponse();
});

function displayMore() {
    console.log("click");
    $("#btn_more").remove();
    //from += 6;
    if (response.length > to + 6) {
        to += 6;
    } else {
        to = response.length;
        $(this).remove();
    }
    writeToHTML();
}


// $('#btn_more').click(function (event){
//     
// });


function acquireResponse() {
    var query = encodeURI($('#input_position').val());
    console.log(`input: ${query}`);
    getData(`&what=${query}`, function (data) {
        response = data.results;
        console.log(response);

        writeToHTML();

    });
}

function printResponse() {
    console.log(acquireResponse());
}


function writeToHTML() {

    var html = "";
    html = '<div class="row ">';

    for (let index = from; index < to; index++) {
        const element = response[index];
        var daysOld = Math.floor((new Date() - new Date(element.created)) / (1000 * 60 * 60 * 24));
        var decription = element.description;
        description = decription.length > 400 ? decription.substring(0, 400) + "..." : decription;

        html += `<div class="col-6 col-md-4 p-1 shadow">
                <div class="job-box">
                    <h2 class="job-title">${element.title}</h2>
                    <div class="details-container">
                        <span class="job-company details"><i class="fas fa-building"></i> ${element.company.display_name}</span>
                        <span class="job-location details"><i class="fas fa-map-marked-alt"></i> ${element.location.display_name}</span>
                        <span class="job-date details"><i class="far fa-calendar-alt"></i> ${daysOld} d</span>
                    </div>
                    <p class="job-description">${description}</p>
                </div>
                <a class="btn btn-success text-center btn_apply p-2" href="${element.redirect_url}" target="_blank">Apply</a>
                </div>`;
    }
    html += `</div> 
            <button id="btn_more" class="btn btn-primary p-2 shadow float-right" type="submit" onclick="displayMore()">MORE!</button>`;

    $('#job-list').html(html);
}

//BING Maps temporary code:

// var jobsQuantity = 16;
// var jobsLocation = 'London';

// function GetMap() {
//     var map = new Microsoft.Maps.Map('#map', {
//         credentials: 'Ardk901xHTnQMsqQm8sYUmbI9R6MC2U1crUKj2S4w9GnC2j_UiCkbZqSpuHPUlTb',
//         //center: new Microsoft.Maps.Location(50.50632, -10.12714),
//         mapTypeId: Microsoft.Maps.MapTypeId.grayscale,
//         disableBirdseye: true,
//         disableStreetside: true,
//         showMapTypeSelector: false,
//         zoom: 6,
//         minZoom: 2,
//         maxZoom: 8
//     });

//     var jobsMark = new Microsoft.Maps.Location(51.50632, -0.12714);

//     var pin = new Microsoft.Maps.Pushpin(jobsMark, {
//         title: jobsLocation,
//         subTitle: '',
//         text: jobsQuantity.toString()
//     });

//     map.entities.push(pin);

// }