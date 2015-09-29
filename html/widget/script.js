/** Constructor with parameters
 * Make sure, the outputSpanID of two different instances
 * is not the same. Otherwise unpleasant things may happen.
 */
function Timer(count, interval) {
    this.count = count ? count : 0;
    this.interval = interval ? interval : 0;
    this.isPaused = false;
    this.intervalID = 0;
    this.outputSpanID = "time";
    this.callback = null;
    this.seconds = count ? count : 00;
    this.minutes = count ? count : 00;
    this.hours = count ? count : 00;
}

// init function
Timer.prototype.init = function() {
    this.alert();
};

// alert the properties
Timer.prototype.alert = function() {
    alert(this.count + ":" + this.interval + ":" + this.isPaused + ":" + this.intervalID);
};

// print time
Timer.prototype.printTime = function() {
    function FormatNumberLength(num) {
    var r = "" + num;
    while (r.length < 2) {
        r = "0" + r;
    }
    return r;
    }



    document.getElementById(this.outputSpanID).innerHTML = FormatNumberLength(this.hours) + ":" +  FormatNumberLength(this.minutes) + ":" + FormatNumberLength(this.seconds);
};

// start the timer
Timer.prototype.startDown = function(e) {

    //clear interval
    if (this.intervalID != 0) {
        clearInterval(this.intervalID);
    }

    //print time
    this.printTime();

    var self = this;

    //setInterval method sets the interval for repeating the function
    this.intervalID = setInterval(function() {
        self.count -= 1;
        if (self.count >= 0) {
            self.printTime();
        } else {
            self.stop();
        }
    }, self.interval);
};

Timer.prototype.startUp = function(e) {

    //clear interval
    if (this.intervalID != 0) {
        clearInterval(this.intervalID);
    }

    //print time
    this.printTime();

    var self = this;

    //setInterval method sets the interval for repeating the function
    this.intervalID = setInterval(function() {
        self.seconds ++;
            if (self.seconds >= 60){
                self.seconds = 0;
                self.minutes ++;
            }
            if (self.minutes >= 60){
                self.minutes = 0;
                self.hours ++;
            }
        if (self.seconds >= 0) {
            self.printTime();
        } else {
            self.stop();
        }
    }, self.interval);
};

// stop timer
Timer.prototype.stop = function() {
    //this.alert();
    clearInterval(this.intervalID);
    this.count = 0;
    this.interval = 0;
    this.isPaused = false;
    this.printTime();
    if(this.callback) {
        this.callback();
    }
};

// pause timer
Timer.prototype.pause = function() {
    //this.alert();
    clearInterval(this.intervalID);
    this.isPaused = true;
};

// unpause timer
Timer.prototype.unpause = function(e) {
    //this.alert();
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
    var stopBtn = document.getElementById("stopBtn");
    
    var addHourBtn = document.getElementById("add hour");
    var addMinuteBtn = document.getElementById("add minute");
    var addSecondBtn = document.getElementById("add second");

    startDownBtn.onclick = function() {
        timer.count = document.getElementById("timeBox").value;
        timer.interval = 1000;
        timer.startDown();
        if (timer.isPaused === true) {
            pauseBtn.innerHTML = "pause";
        }
    };
    
    startUpBtn.onclick = function() {
        timer.count = 0;
        timer.seconds = 0;
        timer.minutes = 0;
        timer.hours = 0;
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

    stopBtn.onclick = function() {
        timer.stop();
    };
    
    addSecondBtn.onclick = function() {
        document.getElementById("time").value ++;
        alert(document.getElementById("time").value);
    };
}