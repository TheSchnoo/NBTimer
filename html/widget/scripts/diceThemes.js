function DiceThemer() {
	var self = this;
	var spinnerOptions = {};
	var addAlertOptions = {};
	var diceThemes = {};
	var diceColors = {};
	var backgroundColors = {};
	var textSizes = {};
	function diceThemesInit() {
		addColorOption("Red");
		addColorOption("Green");
		addColorOption("Blue");
		addColorOption("Purple");
		addColorOption("Yellow");
		addColorOption("Grey");
		addProgressBarOption("circle", {});
		addProgressBarOption("pie", {});
		addProgressBarOption("bar", {});
		addAlertOption("Add", {});

		// addThemeOption("Traditional", {content: diceContent.traditional, maxSides: 6});
		// addThemeOption("Letters", {content: diceContent.letters, maxSides: 10});
		// addThemeOption("Heath", {content: diceContent.squirrel, maxSides: 10});
		// addThemeOption("Custom", {content: diceContent.custom, maxSides: 6});
		addBackgroundOption("Transparent");
		addBackgroundOption("White");
		addBackgroundOption("Grey");
		addBackgroundOption("Green");
		addBackgroundOption("Yellow");
		addBackgroundOption("Red");
		addBackgroundOption("Blue");
		addBackgroundOption("Purple");
		addTimerColorOption("Transparent");
		addTimerColorOption("White");
		addTimerColorOption("Grey");
		addTimerColorOption("Green");
		addTimerColorOption("Yellow");
		addTimerColorOption("Red");
		addTimerColorOption("Blue");
		addTimerColorOption("Purple");
		addButtonColorOption("Grey");
		addButtonColorOption("Green");
		addButtonColorOption("Yellow");
		addButtonColorOption("Red");
		addButtonColorOption("Blue");
		addButtonColorOption("Purple");

		//$("#remove-from-spin").append("<input type='radio' id='remove-from-spin-radio'>");
	}
	function addProgressBarOption(name, theme){
		spinnerOptions[name] = theme;
		$('#progressbar-options').append('<li><span class="menu-option">' + name + '</span></li>');
	}
	function addAlertOption(name, theme) {
		addAlertOptions[name] = theme;
		$('#addAlert-options').append('<li><span class="menu-option">' + name + '</span></li>');
	}
	function addThemeOption(name, theme) {
		diceThemes[name] = theme;
		$('#theme-options').append('<li><span class="menu-option">' + name + '</span></li>');
	}
	function addColorOption(name, color) {
		diceColors[name] = color;
		$('#color-options').append('<li><span class="menu-option">' + name + '</span></li>');
	}
	function addBackgroundOption(name, color) {
		// backgroundColors[name] = color;
		$('#background-options').append('<li><span class="menu-option">' + name + '</span></li>');
	}
	function addTimerColorOption(name, color) {
		// backgroundColors[name] = color;
		$('#timer-color-options').append('<li><span class="menu-option">' + name + '</span></li>');
	}
	function addButtonColorOption(name, color) {
		// backgroundColors[name] = color;
		$('#button-color-options').append('<li><span class="menu-option">' + name + '</span></li>');
	}

	this.getThemeOption = function(name) {
		return $.extend(true, {}, diceThemes[name]);
	};
	this.getColorOption = function(name) {
		return $.extend(true, {}, diceColors[name]);
	};
	this.getBackgroundOption = function(name) {
		return backgroundColors[name];
	};
	function getDuplicate(theme) {
		return JSON.parse(JSON.stringify(theme));
	}
	function getImageHTML(imageURL, width, height) {
		width = width ? width : "100%";
		height = height ? height : "auto";
		return '<img class="smart-nb-clickable smart-nb-draggable" src="' + imageURL + '" style="max-width:' + width + ';max-height:' + height + ';">';
	}

	diceThemesInit();

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
