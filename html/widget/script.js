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
function formatTimeFromSec(sec, entry){
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
    if(entry =="seconds"){
        return seconds;
    }
    if(entry =="minutes"){
        return minutes;
    }
    if(entry =="hours"){
        return hours;
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

    $('div.timer').html('<div class="percent"></div><div id="slice"'+(percent > 50?' class="gt50"':'')+'style="left:'+parseInt($("#container").width()/2-$(".timer").width()/2)+'px"><div class="pie"></div>'+(percent > 50?'<div class="pie fill"></div>':'')+'</div>');

    console.log("Asdf");
    var deg = 360/100*percent;

    $('#slice .pie').css({

        '-moz-transform':'rotate('+deg+'deg)',

        '-webkit-transform':'rotate('+deg+'deg)',

        '-o-transform':'rotate('+deg+'deg)',

        'transform':'rotate('+deg+'deg)',
        'border-color':TIMER_COLORS[getColorCode(currentTimerColor)],
        'background-color':currentProgressAnimation=="pie"?TIMER_COLORS[getColorCode(currentTimerColor)]:'none'

    });
};

UI.prototype.drawBar = function(percent) {

    var deg = $("#progressbar").width()/100*percent;

    $('#progressbar div').css({
        "width": deg,
        'background-color':TIMER_COLORS[getColorCode(currentTimerColor)]
    });  
};

UI.prototype.stopWatch = function(finish) {
    
    this.timerFinish = finish;

    var seconds = (this.timerFinish-(new Date().getTime()))/1000;
    // if (seconds == 0){
    //     console.log('end');
    //     return;
    // }
    // if (seconds <0){
    //     // do{
    //     //     clearInterval(the_timer);
    //     // }while(seconds==0)
    //     console.log('a');
    //     return;
    // }
     if(seconds < 0){
        
        this.drawTimer(100);
        this.drawBar(100);

        startBtn.disabled = false;
        timer.isStarted = false;
        timer.isPaused = true;
        timer1.stop();   
    }
    else {
        
        var percent = 100-((seconds/timerSeconds)*100);

        this.drawTimer(percent);
        this.drawBar(percent);
    }
};
var the_timer;
UI.prototype.startCircle = function(sec, resetTriggered) {
    
    if (resetTriggered === false){

        timerSeconds = sec;
        
        finish = new Date().getTime()+(timerSeconds*1000);

        timer1 = $.timer(function() {
        UI.prototype.stopWatch(finish);
        });

        timer1.set({ time : 50, autostart : true });


        // the_timer = setInterval(function(){

        //     UI.prototype.stopWatch(finish);
        // }, 50);
        
    }
    else{
        timer1.stop();
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

// print time
Timer.prototype.printTime = function() {
    document.getElementById("timeSeconds").innerHTML = formatTimeFromSec(this.time, 'seconds')<10?"0"+formatTimeFromSec(this.time, 'seconds'):formatTimeFromSec(this.time, 'seconds');
    $("#timeSecondsInput").val(formatTimeFromSec(this.time, 'seconds')<10?"0"+formatTimeFromSec(this.time, 'seconds'):formatTimeFromSec(this.time, 'seconds'));
    document.getElementById("timeMinutes").innerHTML = formatTimeFromSec(this.time, 'minutes')<10?"0"+formatTimeFromSec(this.time, 'minutes'):formatTimeFromSec(this.time, 'minutes');
    $("#timeMinutesInput").val(formatTimeFromSec(this.time, 'minutes')<10?"0"+formatTimeFromSec(this.time, 'minutes'):formatTimeFromSec(this.time, 'minutes'));
    document.getElementById("timeHours").innerHTML = formatTimeFromSec(this.time, 'hours')<10?"0"+formatTimeFromSec(this.time, 'hours'):formatTimeFromSec(this.time, 'hours');
    $("#timeHoursInput").val(formatTimeFromSec(this.time, 'hours')<10?"0"+formatTimeFromSec(this.time, 'hours'):formatTimeFromSec(this.time, 'hours'));
};

// start the timer
Timer.prototype.startDown = function(e) {
    
    this.type = "down";
    this.isPaused = false;
    isPaused = false;
    
    if (this.time == 0){
        $(".display").css('color',endColor);
        $(".colon").css('color',endColor);
        timer.printTime();
        timer.pause();
    }
    
    $(".display").css('color',startColor);
    $(".colon").css('color',startColor);

    //clear interval
    if (this.intervalID != 0) {
        clearInterval(this.intervalID);
    }

    //print time
    this.printTime();

    var timer = this;

    //setInterval method sets the interval for repeating the function
    this.intervalID = setInterval(function() {
        timer.time -- ;
        if (timer.time > 0) {
            timer.printTime();
        } else {
            $(".display").css('color',endColor);
            $(".colon").css('color',endColor);
            timer.printTime();
            timer.pause();
            timer.isStarted = false;
            startBtn.disabled = false;
            if (snoozeTrigger === false){
                timer.snooze();
            }
        }
    }, timer.interval);
};

Timer.prototype.startUp = function(e) {
    
    var countTo = [this.time];
    
    if (e == null) {
        this.time = 0;
    }
    
    this.type = "up";
    this.isPaused = false;
    isPaused = false;
    
    $(".display").css('color',startColor);
    $(".colon").css('color',startColor);

    //clear interval
    if (this.intervalID != 0) {
        clearInterval(this.intervalID);
    }
    
    this.printTime();
    
    var timer = this;

    //setInterval method sets the interval for repeating the function
    this.intervalID = setInterval(function() {
        timer.time ++;
        if (timer.time == countTo) {
            // check if the thing is contained...
            timer.printTime();
            timer.pause();
            $(".display").css('color',endColor);
            $(".colon").css('color',endColor);
        } else {
            timer.printTime();
        }
    }, timer.interval);
};

// reset timer
Timer.prototype.reset = function() {
    
    $(".display").css('color',startColor);
    $(".colon").css('color',startColor);
    
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
    isPaused = true;

};

// unpause timer
Timer.prototype.unpause = function() {
    
    this.isPaused = false;
    isPaused = false;
    
    if (this.type == "up") {
        this.startUp(this.time);
    }
    if (this.type == "down") {
        this.startDown();
    }
};

Timer.prototype.snooze = function() {

        var snoozeBtn = document.createElement("input"); 

        snoozeBtn.type = "button";
        snoozeBtn.value = "SNOOZE";
        snoozeBtn.name = "snooze1";
        snoozeBtn.className = "btnSnooze";
        snoozeBtn.style.width = "150px";
        snoozeBtn.id = "sn";
        snoozeTrigger = true;


        snoozeBtn.onclick = function() { 
            startBtn.click();
        };

        var foo = document.getElementById("snooze");
        foo.appendChild(snoozeBtn);

};

var timer1;
var snoozeTrigger = false;
/**
 * init method
 */

    var timer = new Timer();

function init() {

    // get new instance of time
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

    var isPaused = false;

    var snoozeTime;

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
            timer1.pause();
            timer2 = $.timer(function() {finish = finish+102;}); 
            timer2.set({ time : 100, autostart : true });
            startBtn.disabled = false;
        } else {
            timer.unpause();
            this.innerHTML = "Pause";
            timer2.stop();
            timer1.play();
        }
    };

    resetBtn.onclick = function() {
        timer.reset();
        timer.isPaused = true;
        timer.isStarted = false;
        timer.resetTriggered = true;
        timer.UI.startCircle(timer.time, timer.resetTriggered);
        timer1.stop();
        startBtn.disabled = false;
        $("#slice, #progressbar").remove();
        document.getElementById("sn").remove();
        snoozeTrigger = false;
    };
    
    addHourBtn.onclick = function() {
        timer.pause();
        timer.time = timer.time + 3600;
        timer.printTime();
        if (timer.isStarted === true) {
            timer.UI.updateTime(timer.time, timer.resetTriggered);
            timer.unpause();
        }
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
        if (timer.isStarted === true) {
            timer.UI.updateTime(timer.time, timer.resetTriggered);
            timer.unpause();
        }
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
        if (timer.isStarted === true) {
            finish = finish + 1900
            // timer.UI.updateTime(timer.time, timer.resetTriggered);
            timer.unpause();
        }
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
        if (timer.isStarted === false){
            timer.unpause();
        }

        if (timer.isPaused === false||timeEdited){
            if (countUpTrigger === false && countDownTrigger === true && isPaused ===false){
                timer.total = timer.time;
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
            else if (countUpTrigger === true && countDownTrigger === false && isPaused === false){
                timer.total = timer.time;
                pauseBtn.innerHTML = "Pause";
                timer.interval = 1000;
                timer.startUp();
                timer.resetTriggered = false;
                timer.UI.startCircle("60", timer.resetTriggered);
                timer.isStarted = true;
            }
        }
        else if (timer.isPaused === true){
            timer.unpause();
            timer2.stop();
            timer1.play();
            pauseBtn.innerHTML = "Pause";
            timer.isStarted = true;
            startBtn.disabled = true;
        }
        if($(".display").hasClass('invisible')){
            $(".displayInput").toggleClass('invisible');
            $(".display").toggleClass('invisible');
        }
        startBtn.disabled = true;
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
