var alerts = []
var nextAlert;
var alertsLeft;
var Alert =function(time, text){
	this.text = text?text:undefined;
	this.time = time?time:0;
	this.triggered = false;
	this.pause = false;
	// console.log('a');
	alerts.push(this);
	reorderAlerts();
	// if(!timersLeft){ //if there is no timer left in the queue
	// 	timersLeft = time < timer.time; //check if this new one is in the queue
	// } //else keep it as true
	console.log(this);
}
function refreshAlertsList(){
	$("#alertList").empty();
	for(var i =0; i<alerts.length;i++){
    		$("#alertList").append('<li id="alert'+i+'" class="alertListItem">'+formatTimeFromSec(alerts[i].time)+", "+alerts[i].text+'&nbsp;<span class="glyphicon glyphicon-remove" aria-hidden="true"onclick="removeAlert('+i+')"></li>');
    	}
}
function removeAlert(i){
	alerts.splice(i,1);
	refreshAlertsList();
}
function saveAlert(){
	var alert_time = parseInt($("#alertHoursInput").val())*60*60+parseInt($("#alertMinutesInput").val())*60+parseInt($("#alertSecondsInput").val());
	var alert_text = $("#alertTextInput").val();
	var alert = new Alert(alert_time, alert_text);
}

function reorderAlerts(){
	alerts.sort(function compare(a,b) {
 		if (a.time < b.time)
		     return 1;
		  if (a.time > b.time)
		    return -1;
		  return 0;
		}
	)
}

function triggerAlert(alert){
	alert.triggered = true;
	console.log(alert.text);
	
	alertDialogPopup = true;
	
	$("#alert-modal").css('display', 'block');

	   //check whether the landed thing is a image type or not
	   //let's clean it before doing anything
	   $("#alert-modal-dialogue").text("");
	   $("#alert-modal-dialogue").text(alert.text);    
	  
}