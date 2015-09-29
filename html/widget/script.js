/** Constructor with parameters
 * Make sure, the outputSpanID of two different instances
 * is not the same. Otherwise unpleasant things may happen.
 */
function Timer(count, interval) {
    this.time = count ? count : 0;
    this.interval = interval ? interval : 0;
    this.isPaused = false;
    this.resetTriggered = false;
    this.intervalID = 0;
    this.outputSpanID = "time";
    this.type = "none";
}

function drawTimer(percent){

    $('div.timer').html('<div class="percent"></div><div id="slice"'+(percent > 50?' class="gt50"':'')+'><div class="pie"></div>'+(percent > 50?'<div class="pie fill"></div>':'')+'</div>');

    var deg = 360/100*percent;

    $('#slice .pie').css({

        '-moz-transform':'rotate('+deg+'deg)',

        '-webkit-transform':'rotate('+deg+'deg)',

        '-o-transform':'rotate('+deg+'deg)',

        'transform':'rotate('+deg+'deg)'

    });


}

function stopWatch(){

    var seconds = (timerFinish-(new Date().getTime()))/1000;

    if(seconds <= 0){

        drawTimer(100);

        clearInterval(timer);

    }else{

        var percent = 100-((seconds/timerSeconds)*100);

        drawTimer(percent);

    }

}

function StartCircle(sec, resetTriggered){
            if (resetTriggered === false){

                timerSeconds = sec;

                timerFinish = new Date().getTime()+(timerSeconds*1000);

                timer = setInterval('stopWatch()',50);
            }
            else {
                clearInterval(timer);
                drawTimer(0);
            }
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
    
    alert("moki");
    
    this.type = "down";
    this.isPaused = false;
    
    if (this.time == 0){
        document.getElementById("time").style.color = "red";
        self.printTime();
        self.pause();
    }
    
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
    
    var countTo = this.time;
    if (e == null) {
        this.time = 0;
    }
    
    this.type = "up";
    this.isPaused = false;
    
    document.getElementById("time").style.color = "black";

    //clear interval
    if (this.intervalID != 0) {
        clearInterval(this.intervalID);
    }
    
    this.printTime();
    
    var self = this;

    //setInterval method sets the interval for repeating the function
    this.intervalID = setInterval(function() {
        self.time ++;
        if (self.time == countTo) {
            self.printTime();
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
};

// pause timer
Timer.prototype.pause = function() {
    clearInterval(this.intervalID);
    this.isPaused = true;
};

// unpause timer
Timer.prototype.unpause = function() {
    
    this.isPaused = false;
    
    if (this.type == "up") {
        this.startUp(this.time);
    }
    if (this.type == "down") {
        this.startDown();
    }
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
    var subHourBtn = document.getElementById("subHour");
    var addMinuteBtn = document.getElementById("addMinute");
    var subMinuteBtn = document.getElementById("subMinute");
    var addSecondBtn = document.getElementById("addSecond");
    var subSecondBtn = document.getElementById("subSecond");

    startDownBtn.onclick = function() {
        pauseBtn.innerHTML = "Pause";
        timer.interval = 1000;
        timer.startDown();
        timer.resetTriggered = false;
        StartCircle(timer.time, timer.resetTriggered);
        if (timer.isPaused === true) {
            pauseBtn.innerHTML = "pause";
        }
    };
    
    startUpBtn.onclick = function() {
        pauseBtn.innerHTML = "Pause";
        timer.interval = 1000;
        timer.startUp();
        timer.resetTriggered = false;
        StartCircle("60", timer.resetTriggered);
    };

    pauseBtn.onclick = function() {
        if (timer.isPaused === false) {
            timer.pause();
            this.innerHTML = "Unpause";
        } else {
            timer.unpause();
            this.innerHTML = "Pause";
        }
    };

    resetBtn.onclick = function() {
        timer.reset();
        timer.resetTriggered = true;
        StartCircle(timer.time, timer.resetTriggered);
        start
    };
    
    addHourBtn.onclick = function() {
        timer.time = timer.time + 3600;
        timer.printTime();
    };
    
    subHourBtn.onclick = function() {
        if (timer.time - 3600 <= 0) {
            timer.time = 0;
        }
        else {
            timer.time = timer.time - 3600;
        }
        timer.printTime();
    };
    
    addMinuteBtn.onclick = function() {
        timer.time = timer.time + 60;
        timer.printTime();
    };
    
    subMinuteBtn.onclick = function() {
        if (timer.time - 60 <= 0) {
            timer.time = 0;
        }
        else {
            timer.time = timer.time - 60;
        }
        timer.printTime();
    };
    
    addSecondBtn.onclick = function() {
        timer.time = timer.time + 1;
        timer.printTime();
    };
    
    subSecondBtn.onclick = function() {
        if (timer.time - 1 <= 0) {
            timer.time = 0;
        }
        else {
            timer.time = timer.time - 1;
        }
        timer.printTime();
    };
}

