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
    changeTheme('none');
    // $("#countModeNotif").css('color', 'black');
    // $("#alertNotif").css('color', 'black');
    if(color=="transparent"){
        $("body").css("background-color", "transparent");

        return;
    }
    if(color=="white"){
        $("body").css("background-color", "white");

        return;
    }
    if(color=="black"){
        console.log('a');
        $("body").css("background-color", "black");
        return;
    }
    currentBackground = color;
    color = getColorCode(color);

    $("body").css("background-color", BACKGROUND_COLORS[color]);

}

function changeTimerColor(color){
    changeTheme('none');
    if(color=="white"){
    	if(currentProgressAnimation=="circle"){
        	$(".pie").css("border-color", "white");
        }
        if(currentProgressAnimation=="pie"){
        	$(".timer .fill >#slice >.pie").css("background-color", 'white');
        } if(currentProgressAnimation == "bar"){
    		$("#progressbar div").css('background-color', 'white');
    }
    }
    currentTimerColor = color;
    color = getColorCode(color);

    $(".pie").css("border-color", TIMER_COLORS[color]);
    if(currentProgressAnimation=="pie"){
    	$(".timer .fill >#slice >.pie").css("background-color", TIMER_COLORS[color]);
    } else if(currentProgressAnimation == "bar"){
    	$("#progressbar div").css('background-color', TIMER_COLORS[color]);
    }
}

function changeButtonColor(color){
    changeTheme('none');
    currentButtonColor = color;
    color = getColorCode(color);
    $(".btns").css('background',BUTTON_COLORS[getColorCode(currentButtonColor)][1]);
    // $(".btns").hover(function(){
    //     $(this).css('background',BUTTON_COLORS[getColorCode(currentButtonColor)][0]);
    // });
    // $(".btns").mouseleave(function(){
    //     $(this).css('background',BUTTON_COLORS[getColorCode(currentButtonColor)][1]);
    // });
}
function changeArrowColor(color){
    changeTheme('none');
	if (color=="white"){
		$(".add").attr('src', "src/arrows/white-up.png");
		$(".sub").attr('src', "src/arrows/white-down.png");
		return;
	} else if(color=="black"){
		$(".add").attr('src', "src/arrows/black-up.png");
		$(".sub").attr('src', "src/arrows/black-down.png");
		return;
	}
	color = getColorCode(color)
	$(".add").attr('src', "src/arrows/"+ARROW_IMAGES[color][0]);
	$(".sub").attr('src', "src/arrows/"+ARROW_IMAGES[color][1]);
	resize();
}
function changeTheme(theme){
    currentTheme = theme;
    checkCheckmark('Theme',theme);
    switch(theme){
    	case "none":
            return;
    		break;
    	case "digital":
    		startColor = "white";
	        endColor = "red";
	        $("body").css({
	            'font-family':'monospace'
	        });
	        $(".btns").css({
	            'font-family':'monospace'
	        });
	        currentTimerColor = 'white';
	        currentTimeColor= 'white';
            currentButtonColor = 'red';
            currentBackground = 'black';
            currentAlertBackgroundColor = 'red';
            currentAlertTextColor = 'white'
	   		break;
	    case "simple":
	    	startColor = "black";
	        endColor = "red";
	        $("body").css({
	            'font-family':'sans-serif'
	        });
	        $(".btns").css({
	            'font-family':'sans-serif'
	        });
	        currentTimerColor = 'grey';
	        currentTimeColor= 'black';
            currentBackground = 'white';
            currentButtonColor = 'grey';
            currentAlertBackgroundColor = 'grey';
            currentAlertTextColor = 'black';
	        break;

	    default:
	    	startColor = "black";
	        endColor = "red";
	    	break;
    }
    setCustomizationOption('Time Color', currentTimeColor);
    setCustomizationOption('Button Color', currentButtonColor);
    setCustomizationOption('Background', currentBackground);
    setCustomizationOption('Alert Background Color', currentAlertBackgroundColor);
    setCustomizationOption('Alert Text Color', currentAlertTextColor);
    // $("#slice, #progressbar").remove();
    currentTheme = theme;
    resize();
    saveData();
}

function changeTimeColor(color){
    changeTheme('none');
    currentTimeColor = color;
    if(color=="white"){
        startColor = "white";
        endColor = "red";
    } else if (color=="black"){
        startColor = "black";
    }
    changeArrowColor(color);
    $(".colon").css('color', startColor);
    $(".display").css('color', startColor);
    $(".timerLabel").css('color', startColor);
    // $(".display").css('color', startColor);
   	saveData();
}

function changeAlertBackgroundColor(color){
    changeTheme('none');
    currentAlertBackgroundColor = color;
    $("#countModeNotif").css('color', 'black');
    if(color=="white"){
        $("#alert-modal").css('background-color', 'white');
        return;
    } else if (color=="black"){
        $("#alert-modal").css('background-color', 'black');
        return;
    }
    color = getColorCode(color);

    $("#alert-modal").css("background-color", BACKGROUND_COLORS[color]);
    saveData();
}
function changeAlertTextColor(color){
    changeTheme('none');
    currentAlertTextColor = color;
    if(color=="white"){
        $("#alert-modal-dialogue").css('color', 'white');
        return;
    } else if (color=="black"){
        $("#alert-modal-dialogue").css('color', 'black');
        return;
    }
}
function checkNotifs(){
    if(currentBackground =='black'){
        $("#gear").attr('src', 'img/gear-white.png');
        $("#countModeNotif").css('color', 'white');
        $("#alert-count-super").css('color', 'white');
        $("#alertNotif").css('color', 'white');
    } else{
        $("#gear").attr('src', 'img/gear-black.png');
        $("#countModeNotif").css('color', 'black');
        $("#alert-count-super").css('color', 'black');
        $("#alertNotif").css('color', 'black');
    }
}