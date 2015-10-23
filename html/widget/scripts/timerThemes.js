function TimerThemer() {
	var self = this;
	var spinnerOptions = {};
	var addAlertOptions = {};
	var backgroundColors = {};
	var textSizes = {};
	function timerThemesInit() {
		//count type
		addCountMode("Stopwatch");
		addCountMode("Timer");
		//progressbar
		addProgressBarOption("Circle", {});
		addProgressBarOption("Pie", {});
		addProgressBarOption("Bar", {});
		addProgressBarOption("None", {});
		//background colours
		addBackgroundOption("Transparent");
		addBackgroundOption("White");
		addBackgroundOption("Black");
		addBackgroundOption("Grey");
		addBackgroundOption("Green");
		addBackgroundOption("Yellow");
		addBackgroundOption("Red");
		addBackgroundOption("Blue");
		addBackgroundOption("Purple");
		//timer backdrop color colours
		addTimerBackdropColorOption("Transparent");
		addTimerBackdropColorOption("White");
		addTimerBackdropColorOption("Black");
		addTimerBackdropColorOption("Grey");
		addTimerBackdropColorOption("Green");
		addTimerBackdropColorOption("Yellow");
		addTimerBackdropColorOption("Red");
		addTimerBackdropColorOption("Blue");
		addTimerBackdropColorOption("Purple");
		//timer colours
		addTimerColorOption("White");
		addTimerColorOption("Grey");
		addTimerColorOption("Green");
		addTimerColorOption("Yellow");
		addTimerColorOption("Red");
		addTimerColorOption("Blue");
		addTimerColorOption("Purple");
		//button colours
		addButtonColorOption("Grey");
		addButtonColorOption("Green");
		addButtonColorOption("Yellow");
		addButtonColorOption("Red");
		addButtonColorOption("Blue");
		addButtonColorOption("Purple");
		//timer labels
		addTimerLabelOption("Show", {});
		addTimerLabelOption("Hide", {});
		//snooze
		addSnoozeButtonOption("None");
		addSnoozeButtonOption("1 Min");
		addSnoozeButtonOption("5 Min");
		addSnoozeButtonOption("10 Min");
		//theme
		addThemeOption("Simple");
		addThemeOption("Digital");
		addThemeOption("Autumn");
		addThemeOption("Winter");
		addThemeOption("Halloween");
		addThemeOption("Pedro");

		//alert color
		addAlertBackgroundOption("Transparent");
		addAlertBackgroundOption("White");
		addAlertBackgroundOption("Grey");
		addAlertBackgroundOption("Green");
		addAlertBackgroundOption("Yellow");
		addAlertBackgroundOption("Red");
		addAlertBackgroundOption("Blue");
		addAlertBackgroundOption("Purple");
		//alert text
		addAlertTextOption("Black");
		addAlertTextOption("White");
		//time color
		addTimeColor("Black");
		addTimeColor("White");
	}
	function addCountMode(name){
		$('#count-mode-options').append('<li><span class="menu-option ">' + name + '</span>&nbsp;<span class="glyphicon glyphicon-ok invisible countCheckmark" id="'+name.toLowerCase()+'CountCheckmark"aria-hidden="true"></li>');
	}
	function addProgressBarOption(name, theme){
		$('#progressbar-options').append('<li><span class="menu-option">' + name + '</span>&nbsp;<span class="glyphicon glyphicon-ok invisible progressBarCheckmark" id="'+name.toLowerCase()+'BarCheckmark"aria-hidden="true"></li>');
	}

	function addTimerBackdropColorOption(name){
		$('#timer-backdrop-color-options').append('<li><span class="menu-option">' + name + '</span>&nbsp;<span class="glyphicon glyphicon-ok invisible timerBackdropColorCheckmark" id="'+name.toLowerCase()+'TimerBackdropColorCheckmark"aria-hidden="true"></li>');

	}

	function addBackgroundOption(name, color) {
		// backgroundColors[name] = color;
		$('#background-options').append('<li><span class="menu-option">' + name + '</span>&nbsp;<span class="glyphicon glyphicon-ok invisible backgroundCheckmark" id="'+name.toLowerCase()+'BackgroundColorCheckmark"aria-hidden="true"></li>');
	}
	function addTimerColorOption(name, color) {
		// backgroundColors[name] = color;
		$('#timer-color-options').append('<li><span class="menu-option">' + name + '</span>&nbsp;<span class="glyphicon glyphicon-ok invisible timerColorCheckmark" id="'+name.toLowerCase()+'TimerColorCheckmark"aria-hidden="true"></li>');
	}
	function addButtonColorOption(name, color) {
		// backgroundColors[name] = color;
		$('#button-color-options').append('<li><span class="menu-option">' + name + '</span>&nbsp;<span class="glyphicon glyphicon-ok invisible buttonColorCheckmark" id="'+name.toLowerCase()+'ButtonColorCheckmark"aria-hidden="true"></li>');
	}
	function addTimerLabelOption(name, theme) {
		// backgroundColors[name] = color;
		$('#timer-labels-options').append('<li><span class="menu-option">' + name + '</span>&nbsp;<span class="glyphicon glyphicon-ok invisible timerLabelCheckmark" id="'+name.toLowerCase()+'TimerLabelCheckmark"aria-hidden="true"></li>');
	}
	function addSnoozeButtonOption(name, theme) {
		name1 = name.replace(" ","");
		// backgroundColors[name] = color;
		$('#snooze-button-options').append('<li><span class="menu-option">' + name + '</span>&nbsp;<span class="glyphicon glyphicon-ok invisible snoozeButtonCheckmark" id="'+name1.toLowerCase()+'SnoozeButtonCheckmark"aria-hidden="true"></li>');
	}
	function addThemeOption(name){
		$("#theme-options").append('<li><span class="menu-option">' + name + '</span>&nbsp;<span class="glyphicon glyphicon-ok invisible themeCheckmark" id="'+name.toLowerCase()+'ThemeCheckmark"aria-hidden="true"></li>');
	}
	function addAlertBackgroundOption(name){
		$("#alert-background-options").append('<li><span class="menu-option">' + name + '</span>&nbsp;<span class="glyphicon glyphicon-ok invisible alertBackgroundColorCheckmark" id="'+name.toLowerCase()+'AlertBackgroundColorCheckmark"aria-hidden="true"></li>');
	}
	function addAlertTextOption(name){
		$("#alert-text-options").append('<li><span class="menu-option">' + name + '</span>&nbsp;<span class="glyphicon glyphicon-ok invisible alertTextColorCheckmark" id="'+name.toLowerCase()+'AlertTextColorCheckmark"aria-hidden="true"></li>');
	}
	function addTimeColor(name){
		$("#time-color-options").append('<li><span class="menu-option">' + name + '</span>&nbsp;<span class="glyphicon glyphicon-ok invisible timeColorCheckmark" id="'+name.toLowerCase()+'TimeColorCheckmark"aria-hidden="true"></li>');
	}


	timerThemesInit();

}

function changeProgressAnimation(type){
	currentProgressAnimation = type;
	var shape = type;


	if (shape === "circle"){
		barTrigger = false;
		$(".timer").show();
		$(".timer.fill").hide();
		$(".bar").hide();
	}
	else if (shape === "pie"){
		barTrigger = false;
		$(".timer").hide();
		$(".timer.fill").show();
		$(".bar").hide();
	}
	else if (shape === "bar"){
		barTrigger = true;
		$(".timer").hide();
		$(".timer.fill").hide();
		$(".bar").show();
	}
	else if (shape === "none"){
		barTrigger = true;
		$(".timer").hide();
		$(".timer.fill").hide();
		$(".bar").hide();
	}

}
var showLabels;
function changeLabelsDisplay(item){
	if (item === "show"){
		$(".timerLabel").css('opacity',1);
		showLabels = true;
	}
	else if (item === "hide"){
		$(".timerLabel").css('opacity',0);
		showLabels=false;
	} else if(item==true){
		$(".timerLabel").css('opacity',1);
	} else if(item==false){
		$(".timerLabel").css('opacity',0);
	}

}

function changeSnoozeTime(item){
	switch(item){
		case "none":
			hideSnooze = true;
			$("#snooze").addClass('invisible');
			snoozeTime=0;
			break;
		case "1 min":
			hideSnooze = false;
			snoozeTime=60;
			//add 1 min
			break;
		case "5 min":
			hideSnooze = false;
			snoozeTime=300;
			//add 5 min
			break;
		case "10 min":
			hideSnooze = false;
			snoozeTime=600;
			//add 10 min
			break;
		default:
			break;
	}
	saveData();
}

function addAlert(item){
	var idNum;
    
    var parent = document.getElementById("newAlertPoint");

    var alertIn = document.createElement("input");
    alertIn.type = "text";
    alertIn.id = idNum;
    parent.appendChild(alertIn);
    
    var removeAlert = document.createElement("button");
    var id = "removeAlertBtn" + idNum;
    removeAlert.id = id;
    removeAlert.class = "btns"
    removeAlert.innerHTML = "X"
    
    $(document).on('click','#'+id, function(){
        $('#'+idNum).remove();
        $('#'+id).remove();
        $('#break'+idNum).remove();
    });

    parent.appendChild(removeAlert);

    alertNum ++;

    var newBreak = parent.appendChild(document.createElement("br"));
    newBreak.id = "break" + idNum;
}
