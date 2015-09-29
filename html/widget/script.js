/** Constructor with parameters
 * Make sure, the outputSpanID of two different instances
 * is not the same. Otherwise unpleasant things may happen.
 */
function Timer(count, interval) {
    this.time = count ? count : 0;
    this.interval = interval ? interval : 0;
    this.isPaused = false;
    this.intervalID = 0;
    this.outputSpanID = "time";
    this.callback = null;
    this.seconds = count ? count : 00;
    this.minutes = count ? count : 00;
    this.hours = count ? count : 00;
}

function formatTimeFromSec(sec){
    var seconds = sec;
    var minutes = 0
    var hours = 0
    while (seconds - 60 >= 0) {
        minutes++;
        seconds = seconds - 60;
    }
    while (minutes - 60 >= 0) {
        hours++;
        minutes = minutes - 60;
    }
    return convertToTimeFormat(hours, minutes, seconds);
}

function convertToTimeFormat(hr, min, sec){
    if (hr < 10) {
        hr = "0" + hr;
    }
    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }
    return hr + ":" + min + ":" + sec;
}

// print time
Timer.prototype.printTime = function() {
    document.getElementById("time").innerHTML = formatTimeFromSec(this.time);
};

// start the timer
Timer.prototype.startDown = function(e) {
    
    document.getElementById("time").style.color = "black";

    //clear interval
    if (this.intervalID != 0) {
        clearInterval(this.intervalID);
    }

    //print time
    this.printTime();

    var self = this;

    //setInterval method sets the interval for repeating the function
    this.intervalID = setInterval(function() {
        self.time -- ;
        if (self.time > 0) {
            self.printTime();
        } else {
            document.getElementById("time").style.color = "red";
            self.printTime();
            self.pause();
        }
    }, self.interval);
};

Timer.prototype.startUp = function(e) {
    
    document.getElementById("time").style.color = "black";

    //clear interval
    if (this.intervalID != 0) {
        clearInterval(this.intervalID);
    }
    
    var countTo = this.time;

    var self = this;
    
    self.time = 0
    
    var count = 0

    //setInterval method sets the interval for repeating the function
    this.intervalID = setInterval(function() {
        count ++;
        if (count == countTo) {
            self.pause();
            document.getElementById("time").style.color = "red";
        } else {
            self.printTime();
        }
    }, self.interval);
};

// reset timer
Timer.prototype.reset = function() {
    
    document.getElementById("time").style.color = "black";
    
    clearInterval(this.intervalID);

    this.time = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.isPaused = false;
    pauseBtn.innerHTML = "pause"
    this.printTime();

    if(this.callback) {
        this.callback();
    }
};

// pause timer
Timer.prototype.pause = function() {
    clearInterval(this.intervalID);
    this.isPaused = true;
};

// unpause timer
Timer.prototype.unpause = function(e) {
    this.startUp();
    this.isPaused = false;
};

/**
 * init method
 */
function init() {

    // get new instance of timer
    var timer = new Timer();
    timer.outputSpanID = "time";

    /* get the buttons and attach eventhandlers */
    var startDownBtn = document.getElementById("startDownBtn");
    var startUpBtn = document.getElementById("startUpBtn");
    var pauseBtn = document.getElementById("pauseBtn");
    var resetBtn = document.getElementById("resetBtn");
    
    var addHourBtn = document.getElementById("addHour");
    var addMinuteBtn = document.getElementById("addMinute");
    var addSecondBtn = document.getElementById("addSecond");

    startDownBtn.onclick = function() {
        timer.interval = 1000;
        timer.startDown();
        if (timer.isPaused === true) {
            pauseBtn.innerHTML = "pause";
        }
    };
    
    startUpBtn.onclick = function() {
        timer.interval = 1000;
        timer.startUp();
        if (timer.isPaused === true) {
            pauseBtn.innerHTML = "pause";
        }
    };

    pauseBtn.onclick = function() {
        if (timer.isPaused === false) {
            timer.pause();
            this.innerHTML = "unpause";
        } else {
            timer.unpause();
            this.innerHTML = "pause";
        }
    };

    resetBtn.onclick = function() {
        timer.reset();
    };
    
    addHourBtn.onclick = function() {
        timer.time = timer.time + 3600;
        timer.printTime();
    };
    addMinuteBtn.onclick = function() {
        timer.time = timer.time + 60;
        timer.printTime();
    };
    addSecondBtn.onclick = function() {
        timer.time = timer.time + 1;
        timer.printTime();
    };
}