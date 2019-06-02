//create StopWatch
var container = document.getElementsByClassName("container")[0];
var stopWatchDiv = document.createElement("div");
container.insertBefore(stopWatchDiv, container.childNodes[2]);
var displayStopWatch = document.createElement("div");
stopWatchDiv.appendChild(displayStopWatch);
displayStopWatch.setAttribute("id", "display");
displayStopWatch.innerHTML = "Time passed from the last finished task: 00:00";

//define vars to hold time values
let seconds = 0;
let minutes = 0;

//define vars to hold display values
let displaySeconds = 0;
let displayMinutes = 0;

//define var to hold setInterval()
let interval = null;

//define var to hold stopWatch status
let status = "stopped";

function stopWatch() {
    seconds ++;

    if(seconds / 60 === 1) {
        seconds = 0;
        minutes ++;
    }

    if(seconds < 10) {
        displaySeconds = "0" + seconds.toString();
    } else {
        displaySeconds = seconds;
    }

    if(minutes < 10) {
        displayMinutes = "0" + minutes.toString();
    } else {
        displayMinutes = minutes;
    }

    document.getElementById("display").innerHTML = "Time passed from the last finished task: " + "<span>" + displayMinutes + ":" + displaySeconds + "</span>";
}

function startStop() {
    interval = window.setInterval(stopWatch, 1000);
}

function reset() {
    window.clearInterval(interval);
    seconds = 0;
    minutes = 0;

    document.getElementById("display").innerHTML = "Time passed from the last finished task: 00:00";
}