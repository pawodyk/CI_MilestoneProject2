//API
const appID = '0bbe3156';
const appKey = '3c663976945b145820dd4a4acd49ef3c';
var page = 1;
var results = 6;
var daysOld = 10;
var url = `http://api.adzuna.com/v1/api/jobs/gb/search/${page}?app_id=${appID}&app_key=${appKey}&results_per_page=${results}&max_days_old=${daysOld}`;

function getData(cb, search) {
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

function printResponse() {
    var query = encodeURI($('#input').val());
    console.log(`input: ${query}`);
    getData(console.dir, `&what=${query}`);
}

// getData(console.log);
$('#input').keydown(function (event) {
    if (event.keyCode == 13) {
        printResponse();
    }
});

$('#go').click(function (event) {
    // writeToHTML();
    printResponse();
});




//CODE IN DEVELOPMENT:

var testObj = [];

function writeToTestObject() {
    getData(function (data) {
            testObj = data.results;
        },
        "&what=" + encodeURI($('#input').val())
    );
}

function writeToHTML() {
    // testObj.forEach(function (line){});
    var temp = testObj[0];

    for (const key in temp) {
        $('#job-list').append(`<p>${key}: ${temp[key]}</p>`);
    }

}


//BING Maps temporary code:

var jobsQuantity = 16;
var jobsLocation = 'London';

function GetMap() {
    var map = new Microsoft.Maps.Map('#map', {
        credentials: 'Ardk901xHTnQMsqQm8sYUmbI9R6MC2U1crUKj2S4w9GnC2j_UiCkbZqSpuHPUlTb',
        //center: new Microsoft.Maps.Location(50.50632, -10.12714),
        mapTypeId: Microsoft.Maps.MapTypeId.grayscale,
        disableBirdseye: true,
        disableStreetside: true,
        showMapTypeSelector: false,
        zoom: 6,
        minZoom: 2,
        maxZoom: 8
    });

    var jobsMark = new Microsoft.Maps.Location(51.50632, -0.12714);

    var pin = new Microsoft.Maps.Pushpin(jobsMark, {
        title: jobsLocation,
        subTitle: '',
        text: jobsQuantity.toString()
    });

    map.entities.push(pin);

}