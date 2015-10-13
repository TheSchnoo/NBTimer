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
// Authors: 
//------------------------------------------------------------------------------------
	//used to check if the user is in menu mode or not
	var disableSpin = false;
	var diceThemer;
	var toggleEditState = false;
	var elements = {
		body: $("body"),
		diceContainer: $("#dice-container"),
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
	
	

	// Interact with the dice to change the customization options
	function setCustomizationOption(category, item) {
		switch(category) {
			case 'Themes':
				// Set the dice content (theme)
				var theme = diceThemer.getThemeOption(item);
				saveData();
				break;
			case 'Add Alert':
				var hai = addAlert(item);
				saveData();
				break;
			case 'Progress Bar Type':
				var hai = changeProgressAnimation(item.toLowerCase());
				saveData();
				break;
			case 'Background':
				changeBackgroundColor(item.toLowerCase());
				saveData();
				break;
			case 'Progress Bar Color':
				changeTimerColor(item.toLowerCase());
				saveData();
				break;
			case 'Button Color':
				changeButtonColor(item.toLowerCase());
				saveData();
				break;
			case 'Font Size':
				changeFontSize(item);
				saveData();
				break;
            case 'Timer Labels':
                changeLabelsDisplay(item.toLowerCase());
                saveData();
                break;
            case 'Snooze Button Options':
            	changeSnoozeTime(item.toLowerCase());
            	saveData();
			default:
				break;
		}
	}
NB.ready(function(){
    init();
    toggleOptions(false);
    toggleEditingMenu(false);
    diceThemer = new DiceThemer();
    loadData();


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
        // resetSpinnerStyling();
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
    NB.addObserver('annotationResizedEvent',function(obj){
        console.log('a');
        resize(obj);
        var timer = setTimeout(resize(),50);
    });
    resize();
    var timer = setTimeout(resize(),50);
    saveData();
});
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
    $(".btns:first-child").css('margin-left',($("#display").width()-3*($(".btns").width()+20))/2);
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
    if($("#container").width()<=350){
    	$(".ui-dialog").width($("#container").width());
    	$("#controls-cont img, #controls-cont span").css({
    		'width':'15px',
    		'height':'15px'
    	});
    	$("#controls-cont button:nth-child(-n+5)").css('width','18px');
    } else {
    	$("#controls-cont img, #controls-cont span").css({
    		'width':'20px',
    		'height':'20px'
    	});
    	$("#controls-cont button:nth-child(-n+5)").css('width','35px');
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
    NB.persist.save("timer"+hostobject.guid, hostobject);
}
function loadData(){
    if(NB.persist.load('timer'+NB.getHostObject().guid)!=undefined){
        var loaded_data = JSON.parse(NB.persist.load('timer'+NB.getHostObject().guid));
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
    } else {
    	//defaults
        loaded_data = undefined;
        showLabels = true;
        currentProgressAnimation = 'circle';
        currentTimerColor = 'blue';
        currentButtonColor = 'grey';
        currentBackground = 'transparent';
        currentTheme ='default';
        currentTimeColor = 'black';
        currentEvent = {};
        snoozeTime=600;
        hideSnooze = false;
    }
    changeBackgroundColor(currentBackground);
    changeButtonColor(currentButtonColor);
    changeTimerColor(currentTimerColor);
    changeTheme(currentTheme);
    changeTimeColor(currentTimeColor);
    chooseEvent(currentEvent);
    changeLabelsDisplay(showLabels);
    changeProgressAnimation(currentProgressAnimation);
}
