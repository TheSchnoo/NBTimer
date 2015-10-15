function resetRotate(){
	window.location.reload();
}

function saveSound(){
	currentSounds.during = ($("#soundDuringDropdown").val());
	currentSounds.after = ($("#soundAfterDropdown").val());
	setupSounds();
}
function setupSounds(){
	$("#soundDuringDropdown").val(currentSounds.during);
	$("#soundAfterDropdown").val(currentSounds.after);
	duringAudio = new Audio(currentSounds.during);
	duringAudio.id = 'duringAudio';
	// duringAudio.onended= replay();
	afterAudio = new Audio(currentSounds.after);
	duringAudio.id = 'afterAudio';

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
	// if(h.length==0){
	// 	$(id).val("00");
	// }
	if (h.length==1){
		
		$(id).val("0"+h[0]);

	}
	if(h.length==2){
		checkMax(id, h);
		$(id).val(h[0]*10+h[1]);
		if(h[0]*10+h[1]==0){
			$(id).val("00");
		}
		if(h[0]*10+h[1]<=9){
			$(id).val("0"+h[1]);
		}
	}
	if(h.length >2){
		checkMax(id, h);
		$(id).val(h[h.length-2]*10+h[h.length-1]);
		if(h[h.length-2]*10+h[h.length-1]==0){
			$(id).val("00");
		}
	}
}
function checkAll(prefix){
    checkTimeInput("#"+prefix+"HoursInput");
    checkTimeInput("#"+prefix+"MinutesInput");
    checkTimeInput("#"+prefix+"SecondsInput");
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
