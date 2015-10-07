//------------------------------------------------------------------------------------
// Dice Widget for SMART Notebook
//    Let's the user spin up to nine customizable dice
// Authors: Francis Ge, Kyle Owsen
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
				var hai = changeProgressAnimation(item);
				saveData();
				break;
			case 'Background':
				changeBackgroundColor(item.toLowerCase());
				saveData();
				break;
			case 'Timer Color':
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
			default:
				break;
		}
	}

