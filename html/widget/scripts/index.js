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
			elements.border.left.css("top", "0");
			elements.border.right.css("bottom", "0");
			elements.border.bottom.css("left", "0");
		} else {
			elements.controls.cont.css("left", "-1500px");
			elements.border.left.css("top", "-1500px");
			elements.border.right.css("bottom", "-1500px");
			elements.border.bottom.css("left", "-1500px");
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
				break;
			case 'Add Alert':
				var hai = addAlert(item);
				break;
			case 'Progress Bar Type':
				var hai = changeProgressAnimation(item);
				break;
			case 'Color':
				// Set the color theme
				var hai = changeColorScheme(item.toLowerCase());
				break;
			case 'Background':
				// Set the background color
				var bgColor = diceThemer.getBackgroundOption(item);
				if (bgColor) {
					elements.body.css("background-color", bgColor);
					elements.diceContainer.css("background-color", bgColor);
				}
				break;
			case 'Font Size':
				changeFontSize(item);
				break;
			default:
				break;
		}
	}

	// Called when the window is resized
	// This makes sure that the widget window is tall enough to house all the content
	// Even though the aspect ratio of the widget is locked, the content's will change


	// Initialization
	// NB.ready(function() {

		
		// sideLength = NB.getHostObject().width*0.8;
  //   	centre = sideLength/2;
  //       $("#arrow").css('transition','0s').width(25*sideLength/500);
  //       $("#pointer").css('transition','0s').height(0.3*sideLength).css('left',centre-$("#pointer").width()/2).css('z-index',99).css('top',centre-$("#pointer").height()*0.5);
  //       $("#d3").width(sideLength).height(sideLength);
  //       $("svg").width(sideLength).height(sideLength);
  //       $("#arrow").css('transition','0s').css('left',centre-$("#arrow").width()/2).css('z-index',99);

	// });
	// 