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

    var deg = 300/100*percent;

    $('#progressbar div').css("width", deg);  
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
        clearInterval(the_timer);
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
    document.getElementById("timeMinutes").innerHTML = formatTimeFromSec(this.time, 'minutes')<10?"0"+formatTimeFromSec(this.time, 'minutes'):formatTimeFromSec(this.time, 'minutes');
    document.getElementById("timeHours").innerHTML = formatTimeFromSec(this.time, 'hours')<10?"0"+formatTimeFromSec(this.time, 'hours'):formatTimeFromSec(this.time, 'hours');
};

// start the timer
Timer.prototype.startDown = function(e) {
    
    this.type = "down";
    this.isPaused = false;
    isPaused = false;
    
    if (this.time == 0){
        $(".display").css('color',endColor);
        $(".colon").css('color',endColor);
        self.printTime();
        self.pause();
    }
    
    $(".display").css('color',startColor);
    $(".colon").css('color',startColor);

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
            $(".display").css('color',endColor);
            $(".colon").css('color',endColor);
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
    isPaused = false;
    
    $(".display").css('color',startColor);
    $(".colon").css('color',startColor);

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
            $(".display").css('color',endColor);
            $(".colon").css('color',endColor);
        } else {
            self.printTime();
        }
    }, self.interval);
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
var timer1;
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

    var isPaused = false;

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
            timer2 = $.timer(function() {finish = finish+50;});
            timer2.set({ time : 50, autostart : true });
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
var INITIAL_HEIGHT = 400, INITIAL_WIDTH = 350, INITIAL_TIME_FONTSIZE = 50, INITIAL_LABELS_FONTSIZE = 14, INITIAL_BUTTONS_FONTSIZE = 13, INITIAL_BUTTONS_WIDTH = 65, INITIAL_BUTTONS_HEIGHT = 35, INITIAL_ARROWS_HEIGHT = 10, INITIAL_ARROWS_WIDTH = 40, INITIAL_BUTTON_BORDERRADIUS = 17, INITIAL_CIRCLE_SIZE= 320,INITIAL_COLON_SIZE = 40;
NB.ready(function(){
    init();
    toggleOptions(false);
    toggleEditingMenu(false);
    diceThemer = new DiceThemer();
    if(NB.persist.load('timer'+NB.getHostObject().guid)!=undefined){
        var loaded_data = JSON.parse(NB.persist.load('timer'+NB.getHostObject().guid));
        currentProgressAnimation = loaded_data.currentProgressAnimation;
    currentTimerColor = loaded_data.currentTimerColor;
    currentButtonColor = loaded_data.currentButtonColor;
    currentBackground = loaded_data.currentBackground;
    } else {
        loaded_data = undefined;
        currentProgressAnimation = 'circle';
        currentTimerColor = 'blue';
        currentButtonColor = 'grey';
        currentBackground = 'white';
    }
    //defaults!!!
    
    changeBackgroundColor(currentBackground);
    changeButtonColor(currentButtonColor);
    changeTimerColor(currentTimerColor);

    $("#controls-open").click(function() {
        toggleOptions(true);
        //going into menu
        disableSpin = true;
        //
        eventAddClickEffect();
    });
    $("#controls-close").click(function() {
        toggleOptions(false);
        toggleEditingMenu(false);
        //out of menu
        disableSpin = false;
        resetSpinnerStyling();
    });

    $("#controls-edit").click(function() {
        toggleEditState = !toggleEditState;
        toggleEditingMenu(toggleEditState);


    });
    $("#controls-reset").click(function(){
        resetRotate();
    });

    $("#controls-add").click(function() {
        countUpTrigger = true;
        countDownTrigger = false;
    });

    $("#controls-remove").click(function() {
        countUpTrigger = false;
        countDownTrigger = true;
    });

    $("#remove-from-spin").click(function(){
        toggleRemoveUponStop();
    });

    $('div#dialog').on('dialogclose',function(){
        resetSpinnerStyling();
    });

    $("#menu").menu({
        select: function( event, ui ) {
            // Get which item was selected
            var item = ui.item.find(".menu-option")[0].innerHTML;
            var category = ui.item.parent().parent().find(".menu-option")[0].innerHTML;
            setCustomizationOption(category, item);
        }
    });
    NB.addObserver('annotationResizedEvent',function(obj){
        console.log('a');
        resize(obj);
    });
    resize();
    var timer = setTimeout(resize(),50);
    saveData();
});
var ratio = NB.getHostObject().width/INITIAL_WIDTH;
function resize(obj){

    ratio = NB.getHostObject().width/INITIAL_WIDTH;
    $(".timerLabel").css('width', $("#display").width()*0.3);
    // $("#minutesLabel").css('margin-left',$("#display").width()*0.04);
    // $("#secondsLabel").css('margin-left',$("#display").width()*0.05);
    $(".arrowbtnsDiv").css('width', $("#display").width()*0.3);
    // $("#addMinuteDiv").css('margin-left',$("#display").width()*0.03);
    // $("#addSecondDiv").css('margin-left',$("#display").width()*0.03);
    // $("#subMinuteDiv").css('margin-left',$("#display").width()*0.03);
    // $("#subSecondDiv").css('margin-left',$("#display").width()*0.03);
    $(".timer").css('font-size', INITIAL_CIRCLE_SIZE*ratio+"px");
    // $("#minutesLabel").css('margin-left',$("#display").width()*0.03);
    // $("#secondsLabel").css('margin-left',$("#display").width()*0.04);
    $("#timerAll").css('left', $("#container").width()/2-$("#timerAll").width()/2);
    $("#timerAll").css('top', (NB.getHostObject().height)/2-($("#timerAll").height()/2)+35);
    $(".arrowbtns").css({
        "width":INITIAL_ARROWS_WIDTH*ratio+"px",
        "height":INITIAL_ARROWS_HEIGHT*ratio+"px",
    });
    $(".display").css({
        "font-size":INITIAL_TIME_FONTSIZE*ratio+"px",
    });
    $("#display").css({
        "font-size":INITIAL_LABELS_FONTSIZE*ratio+"px"
    });
    $(".btns").css({
        "width":INITIAL_BUTTONS_WIDTH*ratio+"px",
        "height":INITIAL_BUTTONS_HEIGHT*ratio+"px",
        "font-size":INITIAL_BUTTONS_FONTSIZE*ratio+"px",
        "border-radius":INITIAL_BUTTON_BORDERRADIUS*ratio+"px"
    });
    $(".third:first-child").css('margin-left',($("#display").width()/2-$(".third").width()*3/2)/2);
    $(".btns:first-child").css('margin-left',($("#display").width()-3*($(".btns").width()+20))/2);
    $(".arrowbtns").css('margin-left', $(".arrowbtnsDiv").width()*0.5-$(".arrowbtns").width()/2);
    $(".display").css('margin-left',$(".arrowbtnsDiv").width()/2-$(".display").width()/2);
    $("#progressbar").css('left', $("#container").width()/2 - $("#progressbar").width()/2)
    $(".btns").css('background', BUTTON_COLORS[getColorCode(currentButtonColor)][1]);
    // $("#slice").css('left', $("#container").width()/2-$("#slice").width()/2);
    $("#border-left").css('height',NB.getHostObject().height-20+"px");
    $("#border-right").css('height',NB.getHostObject().height+"px");
    $("#border-bottom").css('width',NB.getHostObject().width-20+"px");
    $(".colon").css('font-size',INITIAL_COLON_SIZE*ratio+"px");
    $("#colon1").css('left', $(".third").width()+$(".third").width()*0.085);
    $("#colon2").css('left', $(".third").width()*2+$(".third").width()*0.155);
    $(".colon").css('top', $(".timerLabel").height()+$(".arrowbtnsDiv").height()+$(".timerLabel").height()*0.2);
}
var BACKGROUND_COLORS=["#FFAAAA","#CAEA9C", "#C1C6E0","#D3BDDF","#FFFAD6","#eeeeee"];
function getColorCode(color){
    switch(color){
        case("red"):
            color = 0;
            break;
        case("green"):
            color = 1;
            break;
        case("blue"):
            color = 2;
            break;
        case("purple"):
            color = 3;
            break;
        case("yellow"):
            color = 4;
            break;
        case("grey"):
            color = 5;
            break;
        default:
            return;
    }
    return color;
}
function changeBackgroundColor(color){
    
    if(color=="transparent"){
        $("body").css("background-color", "transparent");

        return;
    }
    if(color=="white"){
        $("body").css("background-color", "white");

        return;
    }
    currentBackground = color;
    color = getColorCode(color);

    $("body").css("background-color", BACKGROUND_COLORS[color]);

}
var TIMER_COLORS = ["#FFAAAA","#CAEA9C", "#C1C6E0","#D3BDDF","#FFFAD6","#eeeeee"];
var currentTimerColor;
function changeTimerColor(color){
    if(color=="white"){
        $(".pie").css("border-color", "white");
        return;
    }
    currentTimerColor = color;
    color = getColorCode(color);

    $(".pie").css("border-color", TIMER_COLORS[color]);
    $(".pie").css("background-color", TIMER_COLORS[color]);
}
var currentButtonColor;
var BUTTON_COLORS=[["#AA3939","#901515"],["#729C34","#4D7514"],["#646EA4","#404C88"],["#885CA0","#6A3985"],["#F0E384","#C7BA4F"],["#777777","#333333"]];
function changeButtonColor(color){
    currentButtonColor = color;
    color = getColorCode(color);
    $(".btns").css('background',BUTTON_COLORS[getColorCode(currentButtonColor)][1]);
    $(".btns").hover(function(){
        $(this).css('background',BUTTON_COLORS[getColorCode(currentButtonColor)][0]);
    });
    $(".btns").mouseleave(function(){
        $(this).css('background',BUTTON_COLORS[getColorCode(currentButtonColor)][1]);
    });
}
$(document).ready(function(){
    $(".btns").hover(function(){
        $(this).css('background',BUTTON_COLORS[getColorCode(currentButtonColor)][0]);
    });
    $(".btns").mouseleave(function(){
        $(this).css('background',BUTTON_COLORS[getColorCode(currentButtonColor)][1]);
    });
});
var currentProgressAnimation;
function saveData(){
    hostobject = NB.getHostObject();
    hostobject.currentProgressAnimation = currentProgressAnimation;
    hostobject.currentTimerColor = currentTimerColor;
    hostobject.currentButtonColor = currentButtonColor;
    hostobject.currentBackground = currentBackground;
    NB.persist.save("timer"+hostobject.guid, hostobject);
}
var currentTheme;
var startColor='black', endColor='red';
function changeTheme(theme){
    currentTheme = theme;
    if(theme=="digital"){
        startColor = "white";
        endColor = "red";
        $("body").css({
            'background': 'black',
            'color':'#fff',
            'font-family':'monospace'
        });
        $(".btns").css({
            'font-family':'monospace'
        });
        currentTimerColor = 'white';
        changeButtonColor('red');
        resize();
    }
}