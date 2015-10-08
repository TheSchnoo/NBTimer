var INITIAL_HEIGHT = 400, INITIAL_WIDTH = 350, INITIAL_TIME_FONTSIZE = 50, INITIAL_LABELS_FONTSIZE = 14, INITIAL_BUTTONS_FONTSIZE = 13, INITIAL_BUTTONS_WIDTH = 65, INITIAL_BUTTONS_HEIGHT = 35, INITIAL_ARROWS_HEIGHT = 10, INITIAL_ARROWS_WIDTH = 40, INITIAL_BUTTON_BORDERRADIUS = 17, INITIAL_CIRCLE_SIZE= 320,INITIAL_COLON_SIZE = 40;

var BACKGROUND_COLORS=["#FFAAAA","#CAEA9C", "#C1C6E0","#D3BDDF","#FFFAD6","#eeeeee"];
var TIMER_COLORS = ["#901515","#4D7514","#404C88","#6A3985","#C7BA4F","#333333"];
var BUTTON_COLORS=[["#AA3939","#901515"],["#729C34","#4D7514"],["#646EA4","#404C88"],["#885CA0","#6A3985"],["#F0E384","#C7BA4F"],["#777777","#333333"]];
var currentTimerColor;
var currentButtonColor;
var ratio = NB.getHostObject().width/INITIAL_WIDTH;
var currentProgressAnimation;
var currentTheme;
var startColor='black', endColor='red';
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
    $("#save").click(function(){
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
    // $("#save").click(function(){
    	
    // });
    // if($("#eventDropdown").val()=="Add Text"){
    // 	$("#eventTextInput").attr('placeholder',"Add Text annotation");
    // 	$("#eventTextInput").removeClass('invisible');
    // } else if($("#eventDropdown").val()=="Add Image"){
    // 	$("#eventTextInput").attr('placeholder',"Add Image annotation (filepath here)");
    // 	$("#eventTextInput").removeClass('invisible');
    // } else {
    // 	$("#eventTextInput").addClass('invisible');}
});

var timeEdited;

function changeTheme(theme){
    currentTheme = theme;
    if(theme=="digital"){
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
        changeButtonColor('red');
        resize();
    }
    $("#slice, #progressbar").remove();
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
}
function editEvent(){
    console.log('asdffffff');
    $("#dialog").removeClass('invisible');
    if($(".ui-dialog").css('display')=="none"){
    	$(".ui-dialog").css('display','block');
    }
    $(function(){
        $("#dialog").dialog();
    });
}
function lockAll(){
    var objects = Object.keys(NB.document.getPage(NB.document.getCurrentPageId()).getObjects());
    for (var i = 0; i<objects.length; i++){
        NB.getObject(Object.keys(NB.document.getPage(NB.document.getCurrentPageId()).getObjects())[i]).lockType = "Lock In Place";
    }
}
var currentEvent={};
function chooseEvent(chosenEvent){
	if(!chosenEvent){
		currentEvent = "None";
		return;
	}
	currentEvent.event = chosenEvent;
	currentEvent.data = $("#eventTextInput").val();
}
function runEvent(){
	var properties = {
		x: NB.getHostObject().x,
		y: NB.getHostObject().height+NB.getHostObject().y,
	}
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