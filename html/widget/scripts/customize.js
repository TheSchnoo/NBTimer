
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

function changeTimerColor(color){
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
function changeArrowColor(color){
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
    switch(theme){
    	case "none":
    		break;
    	case "digital":
    		$("#gear").attr('src', 'img/gear-white.png');
    		startColor = "white";
	        endColor = "red";
	        $("body").css({
	            'background': 'black',
	            'font-family':'monospace'
	        });
	        $(".btns").css({
	            'font-family':'monospace'
	        });
	        currentTimerColor = 'white';
	        currentTimeColor= 'white';
	        changeButtonColor('red');
	        changeTimeColor('white');
	        changeArrowColor('white');
	   		break;
	    case "default":
	    	$("#gear").attr('src', 'img/gear-black.png');
	    	startColor = "black";
	        endColor = "red";
	        $("body").css({
	            'background': 'white',
	            'color':'#000',
	            'font-family':'sans-serif'
	        });
	        $(".btns").css({
	            'font-family':'sans-serif'
	        });
	        currentTimerColor = 'grey';
	        currentTimeColor= 'black';
	        changeButtonColor('grey');
	        changeTimeColor('black');
	        changeArrowColor('black');
	        break;

	    default:
	    	startColor = "black";
	        endColor = "red";
	    	break;
    }
    // $("#slice, #progressbar").remove();
    resize();
    saveData();
}

function changeTimeColor(color){
    currenTimeColor = color;
    if(color=="white"){
        startColor = "white";
        endColor = "red";
    } else if (color=="black"){
        startColor = "black";
    }
    $(".colon").css('color', startColor);
    $(".display").css('color', startColor);
    $("body").css('color', startColor);
   	saveData();
}

function changeAlertBackgroundColor(color){
    currentAlarmBackgroundColor = color;
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
    currentAlarmTextColor = color;
    if(color=="white"){
        $("#alert-modal-dialogue").css('color', 'white');
        return;
    } else if (color=="black"){
        $("#alert-modal-dialogue").css('color', 'black');
        return;
    }
}