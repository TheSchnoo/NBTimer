var INITIAL_HEIGHT = 400, INITIAL_WIDTH = 350, INITIAL_TIME_FONTSIZE = 50, INITIAL_LABELS_FONTSIZE = 14, INITIAL_BUTTONS_FONTSIZE = 13, INITIAL_BUTTONS_WIDTH = 65, INITIAL_BUTTONS_HEIGHT = 35, INITIAL_ARROWS_HEIGHT = 10, INITIAL_ARROWS_WIDTH = 40, INITIAL_BUTTON_BORDERRADIUS = 17, INITIAL_CIRCLE_SIZE= 320,INITIAL_COLON_SIZE = 40;

var BACKGROUND_COLORS=["#FFAAAA","#CAEA9C", "#C1C6E0","#D3BDDF","#FFFAD6","#eeeeee"];
var TIMER_COLORS = ["#901515","#4D7514","#404C88","#6A3985","#C7BA4F","#333333"];
var BUTTON_COLORS=[["#AA3939","#901515"],["#729C34","#4D7514"],["#646EA4","#404C88"],["#885CA0","#6A3985"],["#F0E384","#C7BA4F"],["#777777","#333333"]];
var currentTimerColor;
var currentButtonColor;
var ratio = NB.getHostObject().width/INITIAL_WIDTH;
var currentProgressAnimation;
var currentTheme;
var startColor, endColor;
var currentTimeColor;
function resetRotate(){
	window.location.reload();
}

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
        $(".pie").css("border-color", "white");
        return;
    }
    currentTimerColor = color;
    color = getColorCode(color);

    $(".pie").css("border-color", TIMER_COLORS[color]);
    $(".pie").css("background-color", TIMER_COLORS[color]);
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
$(document).ready(function(){
    $(".btns").hover(function(){
        $(this).css('background',BUTTON_COLORS[getColorCode(currentButtonColor)][0]);
    });
    $(".btns").mouseleave(function(){
        $(this).css('background',BUTTON_COLORS[getColorCode(currentButtonColor)][1]);
    });

    $(".display").click(function(){
    	if(timer.isPaused||timer.time==0){
	    	$(".displayInput").toggleClass('invisible');
	    	$(".display").toggleClass('invisible');
	    	timer.printTime();
	    }
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
    });
    $("#saveEvent").click(function(){
    	console.log('asdf');
		chooseEvent($("#eventDropdown").val());
		if($(".ui-dialog").is(":visible")){
			$("#dialog").dialog("close");
 		}
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
		if($(".ui-dialog").is(":visible")){
			$("#dialog2").dialog("close");
 		}
    });
});

var timeEdited;
function themeDialog(){
	$("#dialog2").removeClass('invisible').dialog();
}
var ARROW_IMAGES = [["red-up.png", 'red-down.png'],["green-up.png", 'green-down.png'],["blue-up.png", 'blue-down.png'],["purple-up.png", 'purple-down.png'],["yellow-up.png", 'yellow-down.png'],["grey-up.png", 'grey-down.png']];
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
	            'color':'#fff',
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
	        currentTimerColor = 'black';
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
    $("#slice, #progressbar").remove();
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
function editEvent(event){

    console.log('asdffffff');
    $("#dialog").removeClass('invisible');
    if($(".ui-dialog").css('display')=="none"){
    	$(".ui-dialog").css('display','block');
    }
    $(function(){
        $("#dialog").dialog();
    });
    saveData();
}
function lockAll(){
    var objects = Object.keys(NB.document.getPage(NB.document.getCurrentPageId()).getObjects());
    for (var i = 0; i<objects.length; i++){
        NB.getObject(Object.keys(NB.document.getPage(NB.document.getCurrentPageId()).getObjects())[i]).lockType = "Lock In Place";
    }
}
var currentEvent={};
function chooseEvent(chosenEvent){
	// if(chosenEvent==''){
	// 	currentEvent = "None";
	// 	return;
	// }
	// console.log('choooseEvent');
	currentEvent.event = $("#eventDropdown").val();
	currentEvent.data = $("#eventTextInput").val();
	saveData();
}
function runEvent(){
	var properties = {
		x: NB.getHostObject().x,
		y: NB.getHostObject().height+NB.getHostObject().y,
	}
	var pageIds = NB.document.getPageIds();
	switch(currentEvent.event){
		case "None":
			break;
		case "Lock All":
			lockAll();
			break;
		case "Next Page":
			NB.document.viewNextPage();
			break;
		case "Previous Page":
			NB.document.viewPreviousPage();
			break;
		case "First Page":
			NB.document.viewPage(pageIds[0]);
			break;
		case "Last Page":
			NB.document.viewPage(pageIds[pageIds.length-1]);
			break;
		case "Delete Timer":
			NB.getHostObject().deleteObject();
			break;
		case "Add Text":
			NB.addObject(NB.objectPrototype.text(currentEvent.data, properties));
			break;
		case "Add Image":
			NB.addObject(NB.objectPrototype.file(currentEvent.data));
			break;
		default:
			break;
	}

}
//POTENTIAL EVENTS--------------
//lockAll();
//NB.document.viewNextPage()
//NB.document.viewPreviousPage()
//THIS IS WHERE I WOULD PUT VIEW FIRST/LAST PAGE
//IF I KNEW HOW
//NB.getHostObject().deleteObject()
//NB.addObject(NB.objectPrototype.text('asdf',{width:100,height:100}));
//NB.addObject(NB.objectPrototype.file(path));