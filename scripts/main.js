/* eslint-disable eqeqeq */
//API
const appID = '0bbe3156';
const appKey = '3c663976945b145820dd4a4acd49ef3c';
var page = 1;
var results = 48; // => 48
var daysOld = 10;

var response = [];

function getData(search, cb) {
    var url = `https://api.adzuna.com/v1/api/jobs/gb/search/${page}?app_id=${appID}&app_key=${appKey}&results_per_page=${results}&max_days_old=${daysOld}&category=it-jobs&sort_by=date`;

    var xhr = new XMLHttpRequest();

    xhr.open("GET", url + search);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send();
    $("#job-list").append('<img class="align-self-center" src="img/ajax-loading.gif" alt="loading..." width="100">');

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        } else {
            console.log(this.status);
        }
        $("#job-list img").remove();
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
    query = encodeURI($('#input_position').val());
    console.log(`input: ${query}`);
    $('#job-list').html("");
    oldResults = "";
    from = 0;
    to = 6;
    page = 1;
    acquireResponse();

});

function displayMore() {

    $("#btn_more").remove();
    //from += 6;
    if (response.length > to + 6) {
        to += 6;
        writeToHTML();
        console.log("more...");
    } else {
        to = response.length;
        writeToHTML();
        $("#btn_more").html("Request more jobs from the server").attr("onclick", "requestMore()");


        console.log("jobs done...");
    }
}

var oldResults = "";

function requestMore() {
    $("#btn_more").remove();
    oldResults = $("#job-list").html();
    page++;
    from = 0;
    to = 6;
    getData(`&what=${query}`, function (data) {
        response = data.results;
        console.log(response);
        $("#job-list").html("");
        writeToHTML();
    });
    console.log("received more jobs from server");
}

var query;

function acquireResponse() {
    getData(`&what=${query}`, function (data) {
        response = data.results;
        console.log(response);
        writeToHTML();
        addPushpins();
    });
}

function printResponse() {
    console.log(acquireResponse());
}


function writeToHTML() {
    console.log("writing to HTML... page: " + page + "; results:" + from + "-->" + to);
    var html = oldResults + '<div class="row ">';

    for (let index = from; index < to; index++) {
        const element = response[index];
        let daysOld = Math.floor((new Date() - new Date(element.created)) / (1000 * 60 * 60 * 24));
        let decription = element.description.replace(/\<strong\>/g, "").replace(/\<\/strong\>/g, "");
        description = decription.length > 400 ? decription.substring(0, 400) + "..." : decription;
        let salary = element.salary_min != element.salary_max ?
            "&euro;" + element.salary_min + " - &euro;" + element.salary_max : "&euro;" + element.salary_max;

        html += `<div class="col-12 col-sm-6 col-lg-4 p-1 shadow">
                <div class="job-box">
                    <h2 class="job-title">${element.title}</h2>
                    <div class="details-container">
                        <div>
                            <span class="job-company details"><i class="fas fa-building" style="color:blue;"></i> ${element.company.display_name}</span>
                            <span class="job-location details"><i class="fas fa-map-marked-alt" style="color:red;"></i> ${element.location.display_name}</span>
                        </div>
                        <div>
                            <span class="details"><i class="fas fa-money-bill-alt" style="color:green;"></i> ${salary}
                            <span class="job-date details"><i class="far fa-calendar-alt" style="color:yellow;"></i> ${daysOld} d</span>

                        </div>
                        
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

var jobsQuantity = 16;
var jobsLocation = 'London';
var map;

function GetMap() {
    map = new Microsoft.Maps.Map('#map', {
        credentials: 'Ardk901xHTnQMsqQm8sYUmbI9R6MC2U1crUKj2S4w9GnC2j_UiCkbZqSpuHPUlTb',
        //center: new Microsoft.Maps.Location(50.50632, -10.12714),
        mapTypeId: Microsoft.Maps.MapTypeId.grayscale,
        disableBirdseye: true,
        disableStreetside: true,
        showMapTypeSelector: false,
        zoom: 6,
        minZoom: 2,
        maxZoom: 10
    });

}

function addPushpins() {


    response.forEach(function (element) {
        //console.log(element);
        //console.log();
        if (typeof element.latitute != 'number' && typeof element.longitude != 'number') {
            console.log("invalid coordinates: " + typeof element.latitude + ", " + typeof element.longitude);

        } else {
            let location = new Microsoft.Maps.Location(element.latitude, element.longitude);
            let pin = new Microsoft.Maps.Pushpin(location, {
                title: element.title.replace(/\<strong\>/g, "").replace(/\<\/strong\>/g, ""),
                //subTitle: '',
                text: 1
            });

            map.entities.push(pin);
        }

    });

}