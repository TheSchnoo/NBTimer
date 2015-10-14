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
var timeEdited;
var ARROW_IMAGES = [["red-up.png", 'red-down.png'],["green-up.png", 'green-down.png'],["blue-up.png", 'blue-down.png'],["purple-up.png", 'purple-down.png'],["yellow-up.png", 'yellow-down.png'],["grey-up.png", 'grey-down.png']];


function resetRotate(){
	window.location.reload();
}



var currentSounds={};
function saveSound(){
	currentSounds.during = ($("#soundDuringDropdown").val());
	currentSounds.after = ($("#soundAfterDropdown").val());
	setupSounds();
}
var duringAudio, afterAudio;
function setupSounds(){
	$("#soundDuringDropdown").val(currentSounds.during);
	$("#soundAfterDropdown").val(currentSounds.after);
	duringAudio = new Audio(currentSounds.during);
	afterAudio = new Audio(currentSounds.after);
	saveData();
}

function lockAll(){
    var objects = Object.keys(NB.document.getPage(NB.document.getCurrentPageId()).getObjects());
    for (var i = 0; i<objects.length; i++){
        NB.getObject(Object.keys(NB.document.getPage(NB.document.getCurrentPageId()).getObjects())[i]).lockType = "Lock In Place";
    }
}
function checkTimeInput(id){
	var h = ($(id).val());
	h = h.split("");

	console.log(h);
	for (var x=0; x<h.length; x++){
		if (isNaN(parseInt(h[x]))){
			h.splice(x,1);
			x--;
			// x--;
			// console.log(h);
		} else {
			h[x] = parseInt(h[x]);
			// console.log(h);
		}
	}
	console.log(h);
	if(h.length==0){
		$(id).val("00");
	}
	if (h.length==1){
		
		$(id).val(h[0]);

	}
	if(h.length==2){
		checkMax(id, h);
		$(id).val(h[0]*10+h[1]);
		if(h[0]*10+h[1]==0){
			$(id).val(h[0]+"0");
		}
	}
	if(h.length >2){
		checkMax(id, h);
		$(id).val(h[h.length-2]*10+h[h.length-1]);
		if(h[h.length-2]*10+h[h.length-1]==0){
			$(id).val(h[0]+"0");
		}
	}
}
function checkMax(id,h){
	if(id=="#timeHoursInput"){
		return;
	}
	if (h[h.length-2]*10+h[h.length-1]>=60){
		h[0]=5;
		h[1]=9;
	}
}
var currentEvent={};
function chooseEvent(chosenEvent){
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