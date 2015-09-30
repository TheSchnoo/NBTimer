function DiceThemer() {
	var self = this;
	var spinnerOptions = {};
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
		addSpinnerTypeOption("Wheel", {});
		addSpinnerTypeOption("Pointer", {});
		// addThemeOption("Traditional", {content: diceContent.traditional, maxSides: 6});
		// addThemeOption("Letters", {content: diceContent.letters, maxSides: 10});
		// addThemeOption("Heath", {content: diceContent.squirrel, maxSides: 10});
		// addThemeOption("Custom", {content: diceContent.custom, maxSides: 6});
		addBackgroundOption("None", "transparent");
		addBackgroundOption("Gray", "#333333");
		addBackgroundOption("Green", "green");
		addBackgroundOption("White", "#F5F5F5");
		addSizeOption("Max", "100%");
		addSizeOption("Large", "75%");
		addSizeOption("Medium", "50%");
		addSizeOption("Small", "25%");

		addAdvancedOption("Remove Upon Spin", "remove-from-spin");
		//$("#remove-from-spin").append("<input type='radio' id='remove-from-spin-radio'>");
	}
	function addSpinnerTypeOption(name, theme){
		spinnerOptions[name] = theme;
		$('#progressbar-options').append('<li><span class="menu-option">' + name + '</span></li>');
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
		backgroundColors[name] = color;
		$('#background-options').append('<li><span class="menu-option">' + name + '</span></li>');
	}
	function addSizeOption(name, size) {
		textSizes[name] = size;
		$('#textsize-options').append('<li><span class="menu-option">' + name + '</span></li>');
	}
	function addAdvancedOption(name, id) {
		$('#advanced-options').append('<li id="'+id+'"><span class="menu-option">' + name + '</span></li>');
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
	this.getSizeOption = function(name) {
		return textSizes[name];
	};
	function getDuplicate(theme) {
		return JSON.parse(JSON.stringify(theme));
	}
	var diceContent = {
		traditional: [traditionalSide(1), traditionalSide(2), traditionalSide(3), traditionalSide(4), traditionalSide(5), traditionalSide(6)],
		letters: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
		rick: [getImageHTML("img/rick-astley.png"), getImageHTML("img/rick-astley.png"), getImageHTML("img/rick-astley.png"), getImageHTML("img/rick-astley.png"), getImageHTML("img/rick-astley.png"), getImageHTML("img/rick-astley.png")],
		squirrel: [getImageHTML("img/squirrel.gif"), getImageHTML("img/squirrel.gif"), getImageHTML("img/squirrel.gif"), getImageHTML("img/squirrel.gif"), getImageHTML("img/squirrel.gif"), getImageHTML("img/squirrel.gif")],
		custom: [getImageHTML("img/edit.png"), getImageHTML("img/edit.png"), getImageHTML("img/edit.png"), getImageHTML("img/edit.png"), getImageHTML("img/edit.png"), getImageHTML("img/edit.png")]
	};
	function getImageHTML(imageURL, width, height) {
		width = width ? width : "100%";
		height = height ? height : "auto";
		return '<img class="smart-nb-clickable smart-nb-draggable" src="' + imageURL + '" style="max-width:' + width + ';max-height:' + height + ';">';
	}
	function traditionalSide(sideValue) {
		var dotArray;
		switch(sideValue) {
			case 1:
				dotArray = [0,0,0,0,1,0,0,0,0];
				break;
			case 2:
				dotArray = [1,0,0,0,0,0,0,0,1];
				break;
			case 3:
				dotArray = [1,0,0,0,1,0,0,0,1];
				break;
			case 4:
				dotArray = [1,0,1,0,0,0,1,0,1];
				break;
			case 5:
				dotArray = [1,0,1,0,1,0,1,0,1];
				break;
			case 6:
				dotArray = [1,0,1,1,0,1,1,0,1];
				break;
			default:
				dotArray = [0,0,0,0,0,0,0,0,0];
		}
		for(var i = 0; i < dotArray.length; i++) {
			if(dotArray[i]) {
				dotArray[i] = "dice-dot";
			} else {
				dotArray[i] = "dice-blank";
			}
		}
		var diceTable = 
			'<div class="dice-table smart-nb-clickable smart-nb-draggable">\
				<div class="dice-row smart-nb-clickable smart-nb-draggable">\
					<div class="' + dotArray[0] + ' smart-nb-clickable smart-nb-draggable"></div>\
					<div class="' + dotArray[1] + ' smart-nb-clickable smart-nb-draggable"></div>\
					<div class="' + dotArray[2] + ' smart-nb-clickable smart-nb-draggable"></div>\
				</div>\
				<div class="dice-row smart-nb-clickable smart-nb-draggable">\
					<div class="' + dotArray[3] + ' smart-nb-clickable smart-nb-draggable"></div>\
					<div class="' + dotArray[4] + ' smart-nb-clickable smart-nb-draggable"></div>\
					<div class="' + dotArray[5] + ' smart-nb-clickable smart-nb-draggable"></div>\
				</div>\
				<div class="dice-row smart-nb-clickable smart-nb-draggable">\
					<div class="' + dotArray[6] + ' smart-nb-clickable smart-nb-draggable"></div>\
					<div class="' + dotArray[7] + ' smart-nb-clickable smart-nb-draggable"></div>\
					<div class="' + dotArray[8] + ' smart-nb-clickable smart-nb-draggable"></div>\
				</div>\
			</div>';
		return diceTable;
	}
	diceThemesInit();
	function resetSpinnerStyling(){
		
	}
}
