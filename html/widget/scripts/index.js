//------------------------------------------------------------------------------------
// Timer Widget for SMART Notebook
//    Timer with functionality
//		- Choose between circle, pie or bar to show progress
//		- Text follows actual time
//		- Count down or up
//		- Pause, Reset, Start buttons
//		- Change colour of progress bar
//		- Change background colour
//		- Change theme (themes: digital, default)
//		- Add event at the end (next page, previous page, delete timer, lock page, add text annotation, add image annotation)
//		- Ability to edit time with keyboard (only when is paused)
//		- Snooze Button (easily add 1min, 5min or 10min)
//      - Sounds during and after
//      - Alert: text pops up at given time. Interface allows you to CRUD
//      - Menu has checkmarks
//      - Hold the arrows up/down
// Authors: Bhawandeep Kambo, Jacob Chan
//------------------------------------------------------------------------------------

//----------------------------------------------------
//FILE STRUCTURE:
// - customize.js = appearance settings
// - settings.js = event settings
// - alerts.js = alerts settings
// - index.js = initialization and all-purpose functions (NB.ready, document.ready, resize, save/load, autoTab)
// - script.js = timer logic
// - dialog.js = show/hide dialogs
//----------------------------------------------------

//----------------------------------------------------
//Global menu related boolean variables
//----------------------------------------------------
var timerThemer;
var toggleEditState = false;
var elements = {
	body: $("body"),
	timerContainer: $("#timer-container"),
	controls: {
		cont: $("#controls-cont"),
		dropdown: $("#controls-dropdown"),
		add: $("#controls-add"),
		remove: $("#controls-remove"),
		reset: $("#controls-reset")
	},
	border: {
		left: $("#border-left"),
		right: $("#border-right"),
		bottom: $("#border-bottom")
	},
	arrow: $("#arrow")
};

//----------------------------------------------------
//Timer options
//----------------------------------------------------
var timer1;
var snoozeTrigger = false;
var snoozeTime;
var pauseTrigger = false;
var alertDialogPopup = false;
var countUpTrigger = false;
var countDownTrigger = true;
var timer = new Timer();
var the_timer;
var hideSnooze;
var countUpUI;
var timeEdited;

//----------------------------------------------------
//Color options
//----------------------------------------------------
var BACKGROUND_COLORS=["#FFAAAA","#CAEA9C", "#C1C6E0","#D3BDDF","#FFFAD6","#eeeeee"];
var TIMER_COLORS = ["#901515","#4D7514","#404C88","#6A3985","#C7BA4F","#333333"];
var BUTTON_COLORS=[["#AA3939","#901515"],["#729C34","#4D7514"],["#646EA4","#404C88"],["#885CA0","#6A3985"],["#F0E384","#C7BA4F"],["#777777","#333333"]];
var ARROW_IMAGES = [["red-up.png", 'red-down.png'],["green-up.png", 'green-down.png'],["blue-up.png", 'blue-down.png'],["purple-up.png", 'purple-down.png'],["yellow-up.png", 'yellow-down.png'],["grey-up.png", 'grey-down.png']];

//----------------------------------------------------
//Resize constants and variables
//----------------------------------------------------
var INITIAL_HEIGHT = 400, INITIAL_WIDTH = 350, INITIAL_TIME_FONTSIZE = 50, INITIAL_LABELS_FONTSIZE = 14, INITIAL_BUTTONS_FONTSIZE = 13, INITIAL_BUTTONS_WIDTH = 65, INITIAL_BUTTONS_HEIGHT = 35, INITIAL_ARROWS_HEIGHT = 10, INITIAL_ARROWS_WIDTH = 40, INITIAL_BUTTON_BORDERRADIUS = 17, INITIAL_CIRCLE_SIZE= 320,INITIAL_COLON_SIZE = 40, INITIAL_MENU_FONT_SIZE = 1, INITIAL_MENU_WIDTH = 130, INITIAL_SUBMENU_WIDTH = 110,INITIAL_SUBSUBMENU_WIDTH = 120, INITIAL_GLYPH_SIZE = 14, INITIAL_COUNTMODENOTIF_SIZE = 0.8;
var ratio = NB.getHostObject().width/INITIAL_WIDTH;


//----------------------------------------------------
//Current options
//----------------------------------------------------
var currentOptions={}
var currentCountType;
var currentSounds;
var currentAlertTextColor,currentAlertBackgroundColor;
var currentTimerColor;
var currentButtonColor;
var currentProgressAnimation;
var currentTheme;
var currentTimeColor;
var currentEvent;
var duringAudio, afterAudio;
var startColor, endColor;
var prev_active_element, active_element;

//----------------------------------------------------
//alerts
//----------------------------------------------------
var alerts;
var nextAlert;
var alertsLeft;

// Show or hide the extended options menu
function toggleOptions(state) {
	if (state) {
		elements.controls.cont.css("left", "0");
		elements.border.left.css("background-color", "#555");
		elements.border.right.css("background-color", "#555");
		elements.border.bottom.css("background-color", "#555");
		menuMode=true;
	} else {
		elements.controls.cont.css("left", "-1500px");
		elements.border.left.css("background-color", "#fff");
		elements.border.right.css("background-color", "#fff");
		elements.border.bottom.css("background-color", "#fff");
		menuMode=false;
	}
}

// Show or hide the editing menu
// Show or hide the editing menu
function toggleEditingMenu(state) {
	if (state) {
		elements.controls.dropdown.show();
		elements.controls.add.hide();
		elements.controls.remove.hide();	
		elements.controls.reset.hide();
	} else {
		elements.controls.dropdown.hide();
		elements.controls.add.show();
		elements.controls.remove.show();
		elements.controls.reset.show();
	}
}

function checkCheckmark(category, item){
    item = item.toLowerCase();
    switch(category) {
        case 'Count Mode':
            if(item=="none"){
                $(".countCheckmark").addClass('invisible');
            }
            $(".countCheckmark").addClass('invisible');
            $("#"+item+"CountCheckmark").removeClass('invisible');
            break;
        case 'Time Color':
            $(".timeColorCheckmark").addClass('invisible');
            $("#"+item+"TimeColorCheckmark").removeClass('invisible');
            break;
        case 'Theme':
            $(".themeCheckmark").addClass('invisible');
            $("#"+item+"ThemeCheckmark").removeClass('invisible');
            break;
        case 'Progress Bar Type':
            $(".progressBarCheckmark").addClass('invisible');
            $("#"+item+"BarCheckmark").removeClass('invisible');
            break;
        case 'Background':
            $(".backgroundCheckmark").addClass('invisible');
            $("#"+item+"BackgroundColorCheckmark").removeClass('invisible');
            break;
        case 'Progress Bar Color':
            $(".timerColorCheckmark").addClass('invisible');
            $("#"+item+"TimerColorCheckmark").removeClass('invisible');
            break;
        case 'Button Color':
            $(".buttonColorCheckmark").addClass('invisible');
            $("#"+item+"ButtonColorCheckmark").removeClass('invisible');
            break;
        case 'Timer Labels':
            $(".timerLabelCheckmark").addClass('invisible');
            $("#"+item+"TimerLabelCheckmark").removeClass('invisible');
            break;
        case 'Snooze Button Options':
            $(".snoozeButtonCheckmark").addClass('invisible');
            $("#"+item+"SnoozeButtonCheckmark").removeClass('invisible');
            break;
        case 'Alert Background Color':
            $(".alertBackgroundColorCheckmark").addClass('invisible');
            $("#"+item+"AlertBackgroundColorCheckmark").removeClass('invisible');
            break;
        case 'Alert Text Color':
            $(".alertTextColorCheckmark").addClass('invisible');
            $("#"+item+"AlertTextColorCheckmark").removeClass('invisible');
            break;
        default:
            break;
    }
}

// Interact with the timer to change the customization options
function setCustomizationOption(category, item) {
    console.log(arguments.callee.caller.name.toString());
    var fromLoad = arguments.callee.caller.name.toString()=='loadData';
    var fromTheme = arguments.callee.caller.name.toString()=='changeTheme';
    console.log(fromLoad);
	switch(category) {
        case 'Count Mode':
            if(item.toLowerCase()==currentCountType&&!fromLoad&&!fromTheme){
                return;
            }
            switch(item){
                case 'Stopwatch':
                    triggerCountUp();
                    break;
                case 'Timer':
                    triggerCountDown();
                    break;
                default:
                    break;
            }
            break;
        case 'Time Color':
            if(item.toLowerCase()==currentTimeColor&&!fromLoad&&!fromTheme){
                return;
            }
            changeTimeColor(item.toLowerCase());
            break;
		case 'Theme':
            if(item.toLowerCase()==currentTheme&&!fromLoad&&!fromTheme){
                return;
            }
            changeTheme(item.toLowerCase());
            saveData();
            break;
		case 'Progress Bar Type':
            if(item.toLowerCase()==currentProgressAnimation&&!fromLoad&&!fromTheme){
                return;
            }
			var hai = changeProgressAnimation(item.toLowerCase());
			saveData();
			break;
		case 'Background':
            if(item.toLowerCase()==currentBackground&&!fromLoad&&!fromTheme){
                return;
            }
			changeBackgroundColor(item.toLowerCase());
			saveData();
			break;
		case 'Progress Bar Color':
            if(item.toLowerCase()==currentTimerColor&&!fromLoad&&!fromTheme){
                return;
            }
			changeTimerColor(item.toLowerCase());
			saveData();
			break;
		case 'Button Color':
            if(item.toLowerCase()==currentButtonColor&&!fromLoad&&!fromTheme){
                return;
            }
			changeButtonColor(item.toLowerCase());
			saveData();
			break;
        case 'Timer Labels':
            if(item.toLowerCase()=="hide"?true:false==showLabels&&!fromLoad&&!fromTheme){
                return;
            }
            changeLabelsDisplay(item.toLowerCase());
            saveData();
            break;
        case 'Snooze Button Options':
        	changeSnoozeTime(item.toLowerCase());
        	saveData();
            break;
        case 'Alert Background Color':
            if(item.toLowerCase()==currentAlertBackgroundColor&&!fromLoad&&!fromTheme){
                return;
            }
            changeAlertBackgroundColor(item.toLowerCase());
            saveData();
            break;
        case 'Alert Text Color':
            if(item.toLowerCase()==currentAlertTextColor&&!fromLoad&&!fromTheme){
                return;
            }
            changeAlertTextColor(item.toLowerCase());
            saveData();
            break;
		default:
			break;
	}
    checkNotifs();
    checkCheckmark(category, item);
}

$(document).ready(function(e){
    $("#alertSign").click(function(){
        manageAlerts();
    });
    $("#rest").click(function(){
        if(menuMode){
            toggleEditingMenu(false);
            toggleOptions(false);
        }
    })
    // $(".btns").hover(function(){
    //     $(this).css('background',BUTTON_COLORS[getColorCode(currentButtonColor)][0]);
    // });
    // $(".btns").mouseleave(function(){
    //     $(this).css('background',BUTTON_COLORS[getColorCode(currentButtonColor)][1]);
    // });

    $(".display").click(function(event){
        if(timer.isPaused||timer.time==0){
            $(".displayInput").toggleClass('invisible');
            $(".display").toggleClass('invisible');
            timer.printTime();
        }
        console.log(event,event.currentTarget.id+"Input");
        $("#"+event.currentTarget.id+"Input").focus().select();
        resize();
    });
    $(".displayInput").on('change keyup paste',function(){
        timeEdited = true;
        if(this.time!=0){
            $(".colon").css('color',startColor);
        } else {
            // $("#slice, #progressbar").remove();
            timer.reset();
            timer.isPaused = true;
            timer.isStarted = false;
            timer.resetTriggered = true;
            timer.UI.startCircle(timer.time, timer.resetTriggered);
            timer1.stop();
            startBtn.disabled = false;
        }
        // $("#slice, #progressbar").remove();
        timer.time = parseInt($("#timeSecondsInput").val())+parseInt($("#timeMinutesInput").val()*60) + parseInt($("#timeHoursInput").val()*60*60);
        // checkTimeInput("#"+event.currentTarget.id);
    });
    $("#saveEvent").click(function(){
        console.log('asdf');
        chooseEvent($("#eventDropdown").val());
        
        closeDialogs();
    });
    $("#saveAlert").click(function(){
        var i;
        var specificAlert=undefined;
        if($("#dialog4").hasClass('none')){
            i = undefined;
        }else{
            var classes =document.getElementById('dialog4').className.split(/\s+/);
            console.log(classes);
            // if(parseInt(classes[0])<alerts.length&&alerts[parseInt(classes[0])]){
            //     specificAlert=parseInt(classes[0]);
            // }
            for (var i=0; i < classes.length; i++){

                if(parseInt(classes[i])<alerts.length){
                    specificAlert = parseInt(classes[i]);
                    if(alerts[specificAlert]){
                        console.log(specificAlert);
                        break;
                    }
                }
            }
        }
        saveAlert(specificAlert);
        
        closeDialogs();
    });
    $("#eventDropdown").change(function(){
        if($("#eventDropdown").val()=="Add Text"){
        $("#eventTextInput").attr('placeholder',"Add Text annotation");
        $("#eventTextInput").removeClass('invisible');
    } else if($("#eventDropdown").val()=="Add Image"){
        $("#eventTextInput").attr('placeholder',"Add Image annotation (filepath here)");
        $("#eventTextInput").removeClass('invisible');
    } else {
        $("#eventTextInput").addClass('invisible');}
    });
     $("#saveTheme").click(function(){
        console.log('asdf');
        changeTheme($("#themeDropdown").val().toLowerCase());
        
        closeDialogs();
    });
     $("#saveSound").click(function(){
        saveSound();
        closeDialogs();
     });
     $(".displayInput").focusout(function(){
        checkAll('time');
     });
     $(".alertInput").focusout(function(){
        checkAll('alert');
     });
     $("#countModeNotif").click(function(){
        console.log('asdf');
        if(!timer.isPaused){
            $("#resetBtn").click()
            console.log('asdfffff');
        }
        if (currentCountType =='Timer'){
            currentCountType = 'Stopwatch';
            setCustomizationOption('Count Mode', 'Stopwatch');
        } else if(currentCountType =='Stopwatch'){
            currentCountType = 'Timer';
            setCustomizationOption('Count Mode', 'Timer');
        }
     });

});

NB.ready(function(){
    init();
    toggleOptions(false);
    toggleEditingMenu(false);
    timerThemer = new TimerThemer();
    loadData();
    $("#alert-count").text(alerts.length);

    $("#controls-open").click(function() {
        toggleOptions(true);
        //going into menu
        disableSpin = true;
        //
        // eventAddClickEffect();
    });
    $("#controls-close").click(function() {
        toggleOptions(false);
        toggleEditingMenu(false);
        //out of menu
        disableSpin = false;
        // resetSpinnerStyling();
    });

    $("#controls-edit").click(function() {
        toggleEditState = !toggleEditState;
        toggleEditingMenu(toggleEditState);


    });
    $("#controls-reset").click(function(){
        resetRotate();
    });


    $('div#dialog').on('dialogclose',function(){
        // resetSpinnerStyling();
    });

    $("#menu").menu({
        select: function( event, ui ) {
            // Get which item was selected
            var item = ui.item.find(".menu-option")[0].innerHTML;
            var category = ui.item.parent().parent().find(".menu-option")[0].innerHTML;
            setCustomizationOption(category, item);
        }
    });
    // $('#menu').unbind('mouseenter mouseleave mouseover click');

    // $('#menu li').unbind('mouseenter mouseleave mouseover click');
    // $(".has-submenu").click(function(){
    //     $(".subMenu").
    //     $(this).find('ul.subMenu').toggle();
    // });


    NB.addObserver('annotationResizedEvent',function(obj){
        console.log('a');
        resize(obj);
        var timer = setTimeout(resize(),50);
    });
    duringAudio.addEventListener('ended', function(){
        console.log('asdfasdfasdf');
        duringAudio.currentTime =0;
        duringAudio.play();
    });
    resize();
    $(".alert-count").text(alerts.length);
    var timer = setTimeout(resize(),50);
    // $("body").click(function(e){
    //     if(!menuMode){
    //         console.log('first');
            
    //     }
    //     else if(String(e.srcElement).search('menuComponent')==-1){
    //         console.log(menuMode);
    //         else{
    //             toggleOptions(false);
    //         }
    //         // if(!menuMode)
    //     }
    // });
    saveData();
});
function replay(){
    console.log('endd');
    if(duringAudio){
        duringAudio.currentTime = 0;
        duringAudio.play();
    }
    
}
function triggerCountUp(){
    currentCountType = 'Stopwatch';
    console.log('triggerCountUp');
    this.time = 0;
    resetBtn.click();
    countUpTrigger = true;
    countDownTrigger = false;
    $("#countMode").text('Stopwatch');
}
function triggerCountDown(){
    currentCountType = 'Timer';
    console.log('triggerCountDown');
    this.time = 0;
    resetBtn.click();
    countUpTrigger = false;
    countDownTrigger = true;
    $("#countMode").text('Timer');
}
function changeCountType(type){
    switch(type){
        case'up':
            triggerCountUp();
            break;
        case 'down':
            triggerCountDown();
            break;
        default:
            break;
    }
}
function resize(obj){

    ratio = NB.getHostObject().width/INITIAL_WIDTH;
    $(".timerLabel").css('width', $("#display").width()*0.3);
    $(".arrowbtnsDiv").css('width', $("#display").width()*0.3);
    $(".timer").css('font-size', INITIAL_CIRCLE_SIZE*ratio+"px");
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
    $(".btns:first-child").css('margin-left',($("#timerAll").width()-($(".btns").width()+20)*2)/2);
    $(".arrowbtns").css('margin-left', $(".arrowbtnsDiv").width()*0.5-$(".arrowbtns").width()/2);
    $(".display").css('margin-left',$(".arrowbtnsDiv").width()/2-$(".display").width()/2);
    $("#progressbar").css('left', $("#container").width()/2 - $("#progressbar").width()/2)
    $(".btns").css('background', BUTTON_COLORS[getColorCode(currentButtonColor)][1]);
    $("#slice").css('left', $("#container").width()/2-$("#slice").width()/2);
    $("#border-left").css('height',NB.getHostObject().height-20+"px");
    $("#border-right").css('height',NB.getHostObject().height+"px");
    $("#border-bottom").css('width',NB.getHostObject().width-20+"px");
    $(".colon").css('font-size',INITIAL_COLON_SIZE*ratio+"px");
    $("#colon1").css('left', $(".third").width()+$(".third").width()*0.085);
    $("#colon2").css('left', $(".third").width()*2+$(".third").width()*0.155);
    if(currentTheme=="digital"){
    	$("#colon1").css('left', $(".third").width()+$(".third").width()*0.03);
    	$("#colon2").css('left', $(".third").width()*2+$(".third").width()*0.165);
    }

    $(".colon").css('top', $(".timerLabel").height()+$(".arrowbtnsDiv").height()+$(".timerLabel").height()*0.2);
    $('#progressbar div').css({

        'background-color':TIMER_COLORS[getColorCode(currentTimerColor)]
    });  
    $("#progressbar").css({
        'width':0.95*$("#container").width(),
    });
    $("#progressbar").css('margin-left',$("#container").width()/2-$("#progressbar").width()/2);
    $(".displayInput").css({
    	'font-size':parseInt($(".display").css('font-size').substr(0,$(".display").css('font-size').length-2))*0.8,
    	'margin-left':$(".third").width()/2-$(".displayInput").width()/2
    });
    $("#snooze").css('margin-left',$("#display").width()/2-($("#snooze").width()+20)/2);
    $("#menu").css({
        'font-size':INITIAL_MENU_FONT_SIZE*ratio+"em",
        'width':INITIAL_MENU_WIDTH*ratio+"px"
    });
    $(".subMenu").width(INITIAL_SUBMENU_WIDTH*ratio+"px");
    $(".subsubMenu").width(INITIAL_SUBSUBMENU_WIDTH*ratio+"px");
    $("#controls-dropdown").width(INITIAL_MENU_WIDTH*ratio+"px");
    $("#alertSign").css({
        'top': (NB.getHostObject().height)-20-$("#alertSign").height()+"px",
        'font-size':INITIAL_GLYPH_SIZE*ratio+"px"
    });
    $("#countModeNotif").css({
        'top': (NB.getHostObject().height)-22-$("#countModeNotif").height()+"px",
        'font-size':INITIAL_COUNTMODENOTIF_SIZE*ratio+"em",
        'right':$("#alertSign").width()*1.5+"px"
    });
    $("#rest").css({
        'width':$("#container").width(),
        'height':NB.getHostObject().height-$("#container").height(),
        'top':$("#container").height()
    });
}
function saveData(){
    hostobject = NB.getHostObject();
    hostobject.currentProgressAnimation = currentProgressAnimation;
    hostobject.currentTimerColor = currentTimerColor;
    hostobject.currentButtonColor = currentButtonColor;
    hostobject.currentBackground = currentBackground;
    hostobject.currentTimeColor = currentTimeColor;
    hostobject.currentTheme = currentTheme;
    hostobject.currentEvent = currentEvent;
    hostobject.snoozeTime = snoozeTime;
    hostobject.showLabels = showLabels;
    hostobject.hideSnooze = hideSnooze;
    hostobject.currentSounds = currentSounds;
    hostobject.alerts = alerts;
    hostobject.currentAlertBackgroundColor = currentAlertBackgroundColor;
    hostobject.currentAlertTextColor = currentAlertTextColor;
    hostobject.currentCountType = currentCountType;
    NB.persist.save("timer"+hostobject.guid, hostobject);
}
function loadData(){
    if(NB.persist.load('timer'+NB.getHostObject().guid)!=undefined){
        var loaded_data = JSON.parse(NB.persist.load('timer'+NB.getHostObject().guid));
        // currentOptions={
        //     currentProgressAnimation : loaded_data.currentProgressAnimation,
        //     currentTimerColor : loaded_data.currentTimerColor,
        //     currentButtonColor : loaded_data.currentButtonColor,
        //     currentBackground : loaded_data.currentBackground,
        //     currentTimeColor:loaded_data.currentTimeColor,
        //     currentTheme:loaded_data.currentTheme,
        //     currentEvent : loaded_data.currentEvent,
        //     snoozeTime : loaded_data.snoozeTime,
        //     showLabels : loaded_data.showLabels,
        //     hideSnooze : loaded_data.hideSnooze,
        //     alerts : loaded_data.alerts,
        //     currentSounds : loaded_data.currentSounds?loaded_data.currentSounds:{},
        //     currentAlertTextColor : loaded_data.currentAlertTextColor,
        //     currentAlertBackgroundColor : loaded_data.currentAlertBackgroundColor,
        //     currentCountType : loaded_data.currentCountType
        // }
        currentProgressAnimation = loaded_data.currentProgressAnimation;
        currentTimerColor = loaded_data.currentTimerColor;
        currentButtonColor = loaded_data.currentButtonColor;
        currentBackground = loaded_data.currentBackground;
        currentTimeColor=loaded_data.currentTimeColor;
        currentTheme=loaded_data.currentTheme;
        currentEvent = loaded_data.currentEvent;
        snoozeTime = loaded_data.snoozeTime;
        showLabels = loaded_data.showLabels;
        hideSnooze = loaded_data.hideSnooze;
        alerts = loaded_data.alerts;
        currentSounds = loaded_data.currentSounds?loaded_data.currentSounds:{};
        currentAlertTextColor = loaded_data.currentAlertTextColor;
        currentAlertBackgroundColor = loaded_data.currentAlertBackgroundColor;
        currentCountType = loaded_data.currentCountType;
    } else {
    	//defaults
        alerts = [];
        loaded_data = undefined;
        showLabels = true;
        currentCountType = 'Timer';
        currentProgressAnimation = 'circle';
        currentTimerColor = 'blue';
        currentButtonColor = 'grey';
        currentBackground = 'transparent';
        currentTheme ='simple';
        currentTimeColor = 'black';
        currentEvent = {};
        snoozeTime=300;
        hideSnooze = false;
        currentSounds = {};
        currentAlertBackgroundColor = 'red';
        currentAlertTextColor = 'black';
    }
    //settings that don't mess with themes
    chooseEvent(currentEvent);
    setupSounds();
    //settings not included in theme
    setCustomizationOption('Count Mode', currentCountType);
    setCustomizationOption('Timer Labels', showLabels?"Show":"Hide");
    setCustomizationOption('Progress Bar Type', currentProgressAnimation);
    //if there is a theme, apply it, ignore the rest of the things.
    if(currentTheme!="none"){
        setCustomizationOption('Theme', currentTheme);
        return;
    }
    //settings included in theme.
    setCustomizationOption('Background', currentBackground);
    setCustomizationOption('Button Color', currentButtonColor);
    setCustomizationOption('Progress Bar Color', currentTimerColor);
    setCustomizationOption('Time Color', currentTimeColor);
    setCustomizationOption('Alert Background Color', currentAlertBackgroundColor);
    setCustomizationOption('Alert Text Color', currentAlertTextColor);

}


function autoTab(event){
	var keyCode = event.which || event.keyCode;
	console.log(keyCode, event.which, event.keyCode);
    if(keyCode==0&&event.which==0&&event.keyCode==0){
        keyCode = 48;
    }
	console.log(keyCode>=48&&keyCode<=57,keyCode>=96&&keyCode<=105);
    var alertTimer = undefined;
    var type = document.activeElement.id.search('alert')!=-1?'alert':'time';
    console.log(type);
    if(type=='alert'){
        alertTimer = parseInt($("#alertHoursInput").val())*60*60+parseInt($("#alertMinutesInput").val())*60+parseInt($("#alertSecondsInput").val());
        console.log(alertTimer);

    }
    if(keyCode == 38){
        console.log('up');
        if(type=="time"){
            if(document.activeElement.id.search('Hour')!=-1){
                addHour();
            } else if(document.activeElement.id.search('Minute')!=-1){
                addMinute();
            } else if(document.activeElement.id.search('Second')!=-1){
                addSecond();
            }
        } else {
            if(document.activeElement.id.search('Hour')!=-1){
                alertTimer+=60*60;
            } else if(document.activeElement.id.search('Minute')!=-1){
                alertTimer+=60;
            } else if(document.activeElement.id.search('Second')!=-1){
                alertTimer+=1;
            }
        }
        if(type=="alert"){
            var time = formatTimeFromSec(alertTimer);
            // console.log(time);
            var time = String(time).split(":");
            // console.log(time);
            var h = time[0];
            // time[0]=time[0].split(":");
            var m = time[1];
            var s = time[2];
            console.log(h,m,s);
            $("#alertHoursInput").val(h);
            $("#alertMinutesInput").val(m);
            $("#alertSecondsInput").val(s);
        }
        checkAll(type=="alert"? 'alert':'time');
        return;
    }
    if(keyCode == 40){
        if(type=="time"){
            if(document.activeElement.id.search('Hour')!=-1){
                subHour();
            } else if(document.activeElement.id.search('Minute')!=-1){
                subMinute();
            } else if(document.activeElement.id.search('Second')!=-1){
                subSecond();
            }
        } else {
            if(document.activeElement.id.search('Hour')!=-1){
                alertTimer-=60*60;
            } else if(document.activeElement.id.search('Minute')!=-1){
                alertTimer-=60;
            } else if(document.activeElement.id.search('Second')!=-1){
                alertTimer-=1;
            }
        }
        if(type=="alert"){
            var time = formatTimeFromSec(alertTimer);
            // console.log(time);
            var time = String(time).split(":");
            // console.log(time);
            var h = time[0];
            // time[0]=time[0].split(":");
            var m = time[1];
            var s = time[2];
            console.log(h,m,s);
            $("#alertHoursInput").val(h);
            $("#alertMinutesInput").val(m);
            $("#alertSecondsInput").val(s);
        }
        checkAll(type=="alert"? 'alert':'time');
        return;
    }
    if(keyCode==9){
        checkAll(type=="alert"? 'alert':'time');
    }
    if(keyCode==13){
        active_element = document.activeElement.id;
        switchSelection();
        return;
    }
	if(!((keyCode>=48&&keyCode<=57)||(keyCode>=96&&keyCode<=105))){
		console.log('not');
		return;
	}
	if(!document.activeElement.id.search("input")){
		return;
	} else {
		prev_active_element = active_element;
		active_element = document.activeElement.id;
		console.log(prev_active_element, active_element);
		if (prev_active_element==active_element){
            console.log('a');
            switchSelection();
		}
	}
}
function switchSelection(){
    var prefix = undefined;
    if(active_element.split("")[0]=='t'){
        prefix = "time";
    } else if(active_element.split("")[0]=='a'){
        prefix="alert";
    }
    switch(active_element){
        case prefix+"HoursInput":
            // prev_active_element = undefined;
            // active_element = undefined;
            checkTimeInput("#"+prefix+"HoursInput");
            if(parseInt($("#"+prefix+"MinutesInput").val())==0){
                $("#"+prefix+"MinutesInput").val('');
            }
            $("#"+prefix+"MinutesInput").select();
            break;
        case prefix+"MinutesInput":
            // prev_active_element = undefined;
            // active_element = undefined;
            checkTimeInput("#"+prefix+"MinutesInput");
            if(parseInt($("#"+prefix+"SecondsInput").val())==0){
                $("#"+prefix+"SecondsInput").val('');
            }
            $("#"+prefix+"SecondsInput").select();
            break;
        case prefix+"SecondsInput":
            // prev_active_element = undefined;
            // active_element = undefined;
            checkTimeInput("#"+prefix+"SecondsInput");
            $("#"+prefix+"SecondsInput").focusout();
            if(prefix=="alert"){
                $("#alertTextInput").select().focus();
            }
            break;

    }
}