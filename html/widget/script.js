function UI() {
    this.timerFinish = 0;
    this.timer = 0;
}

function Timer(count, interval) {
    this.time = count ? count : 0;
    this.interval = interval ? interval : 0;
    this.isPaused = false;
    this.resetTriggered = false;
    this.intervalID = 0;
    this.outputSpanID = "time";
    this.type = "none";
    this.alertNum = 0;
    this.alertBreaks = [];
    this.total = this.time;
    this.UI = new UI();
    this.isStarted = false;
}

// Helper for turning a seconds value into hours, minutes, and seconds
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

// Helper for converting hour, minute, and seconds values into 00:00:00 format
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

UI.prototype.drawTimer = function(percent) {

    $('div.timer').html('<div class="percent"></div><div id="slice"'+(percent > 50?' class="gt50"':'')+'><div class="pie"></div>'+(percent > 50?'<div class="pie fill"></div>':'')+'</div>');


    var deg = 360/100*percent;

    $('#slice .pie').css({

        '-moz-transform':'rotate('+deg+'deg)',

        '-webkit-transform':'rotate('+deg+'deg)',

        '-o-transform':'rotate('+deg+'deg)',

        'transform':'rotate('+deg+'deg)'

    });
};

UI.prototype.drawBar = function(percent) {

    var deg = 300/100*percent;

    $('#progressbar div').css("width", deg);  
};

UI.prototype.stopWatch = function(finish) {
    
    this.timerFinish = finish;

    var seconds = (this.timerFinish-(new Date().getTime()))/1000;

    if(seconds <= 0){
        
        this.drawTimer(100);
        this.drawBar(100);

        clearInterval(timer);
        
    }
    else {
        
        var percent = 100-((seconds/timerSeconds)*100);

        this.drawTimer(percent);
        this.drawBar(percent);
    }
};

UI.prototype.startCircle = function(sec, resetTriggered) {
    
    if (resetTriggered === false){

        timerSeconds = sec;
        
        var finish = new Date().getTime()+(timerSeconds*1000);

        this.timer = setInterval(function(){
            UI.prototype.stopWatch(finish);
        }, 50);
        
    }
    else{
        clearInterval(this.timer);
        this.drawTimer(0);
        this.drawBar(0);

    }
};



UI.prototype.updateTime = function(sec, resetTriggered) {
    this.resetWatch();
    this.startCircle(sec, resetTriggered);
};

UI.prototype.resetWatch = function() {
    clearInterval(this.timer);
    this.drawTimer(0);
    this.drawBar(0);
}

function DrawBar(maxWidth) {
    var w = $('#bar').width();
    var percent = parseInt((w * 100) / maxWidth);
}

function resetBar(){
    var barMaxWidth = 0;
    var $bar = $('#bar');
        $bar.stop(true, true);
        clearInterval(barTimer);
}

UI.prototype.startProgressBar = function(sec) {
    

    var barMaxWidth = 350;
    var barDuration = sec*1000;
    var barTimer;

        var $bar = $('#bar');
        DrawBar(barMaxWidth);
        barTimer = setInterval('DrawBar('+barMaxWidth+')', 100);

        $bar.animate({
            width: barMaxWidth
        }, barDuration, function() {
            $(this).css('background-color', 'red');
            clearInterval(barTimer);
        });


}

// print time
Timer.prototype.printTime = function() {
    document.getElementById("time").innerHTML = formatTimeFromSec(this.time);
};

// start the timer
Timer.prototype.startDown = function(e) {
    
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
    
    var countTo = [this.time];
    
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
            // check if the thing is contained...
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
    pauseBtn.innerHTML = "Pause"
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

    // get new instance of time

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
    
    var addAlertBtn = document.getElementById("addAlert");

    countUpTrigger = false;
    countDownTrigger = true;
    $(".timer").show();
    $(".timer.fill").hide();
    $(".bar").hide();

    // startDownBtn.onclick = function() {
    //     timer.total = timer.time;
    //     timer.UI.startProgressBar(timer.time);
    //     pauseBtn.innerHTML = "Pause";
    //     timer.interval = 1000;
    //     timer.startDown();
    //     timer.resetTriggered = false;
    //     timer.UI.startCircle(timer.time, timer.resetTriggered);
    //     if (timer.isPaused === true) {
    //         pauseBtn.innerHTML = "pause";
    //     }
    //     timer.isStarted = true;
    // };
    
    // startUpBtn.onclick = function() {
    //     timer.total = timer.time;
    //     pauseBtn.innerHTML = "Pause";
    //     timer.interval = 1000;
    //     timer.startUp();
    //     timer.resetTriggered = false;
    //     timer.UI.startCircle("60", timer.resetTriggered);
    //     timer.isStarted = true;
    // };

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
        timer.UI.startCircle(timer.time, timer.resetTriggered);
        resetBar();
        start
    };
    
    addHourBtn.onclick = function() {
        timer.pause();
        timer.time = timer.time + 3600;
        timer.printTime();
        if (timer.isStarted == true) {
            timer.UI.updateTime(timer.time, timer.resetTriggered);
        }
        timer.unpause();
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
        timer.pause();
        timer.time = timer.time + 60;
        timer.printTime();
        if (timer.isStarted == true) {
            timer.UI.updateTime(timer.time, timer.resetTriggered);
        }
        timer.unpause();
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
        timer.pause();
        timer.time = timer.time + 1;
        timer.printTime();
        if (timer.isStarted == true) {
            timer.UI.updateTime(timer.time, timer.resetTriggered);
        }
        timer.unpause();
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
    
    startBtn.onclick = function(){
        if (countUpTrigger === false && countDownTrigger === true){
            timer.total = timer.time;
            timer.UI.startProgressBar(timer.time);
            pauseBtn.innerHTML = "Pause";
            timer.interval = 1000;
            timer.startDown();
            timer.resetTriggered = false;
            timer.UI.startCircle(timer.time, timer.resetTriggered);
            if (timer.isPaused === true) {
                pauseBtn.innerHTML = "pause";
            }
            timer.isStarted = true;
        }
        else if (countUpTrigger === true && countDownTrigger === false){
            timer.total = timer.time;
            pauseBtn.innerHTML = "Pause";
            timer.interval = 1000;
            timer.startUp();
            timer.resetTriggered = false;
            timer.UI.startCircle("60", timer.resetTriggered);
            timer.isStarted = true;
        }
    }

    // addAlertBtn.onclick = function() {
        
    //     var idNum = timer.alertNum;
    
    //     var parent = document.getElementById("newAlertPoint");

    //     var alertIn = document.createElement("input");
    //     alertIn.type = "text";
    //     alertIn.id = idNum;
    //     parent.appendChild(alertIn);
        
    //     var removeAlert = document.createElement("button");
    //     var id = "removeAlertBtn" + idNum;
    //     removeAlert.id = id;
    //     removeAlert.innerHTML = "X"
        
    //     $(document).on('click','#'+id, function(){
    //         $('#'+idNum).remove();
    //         $('#'+id).remove();
    //         $('#break'+idNum).remove();
    //     });

    //     parent.appendChild(removeAlert);

    //     timer.alertNum ++;

    //     var newBreak = parent.appendChild(document.createElement("br"));
    //     newBreak.id = "break" + idNum;

    // };
}

