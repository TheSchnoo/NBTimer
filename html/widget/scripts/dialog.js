function themeDialog(){
	closeDialogs();
	$("#dialog2").removeClass('invisible').dialog();
	resize();
}
function soundDialog(){
    closeDialogs();
    $(function(){
        $("#dialog3").removeClass('invisible').dialog();
        resize();
    });
}
function editEvent(event){
	closeDialogs();
    $(function(){
        $("#dialog").removeClass('invisible').dialog();
        resize();
    });
}
function manageAlerts(){
	closeDialogs();
    $(function(){
    	for(var i =0; i<alerts.length;i++){
    		$("#alertList").append('<li id="alert'+i+'" class="alertListItem">'+formatTimeFromSec(alerts[i].time)+", "+alerts[i].text+'</li>');
    	}
        $("#dialog5").removeClass('invisible').dialog();
        resize();
    });
}
function alertDialog(){
	closeDialogs();
	checkAll('alert');
    $(function(){
        $("#dialog4").removeClass('invisible').dialog();
        resize();
    });
}
function closeDialogs(){
	if(!$("#dialog").hasClass('invisible')){
		$("#dialog").dialog("close");
	}if(!$("#dialog2").hasClass('invisible')){
		$("#dialog2").dialog("close");
	}if(!$("#dialog3").hasClass('invisible')){
		$("#dialog3").dialog("close");
	} if(!$("#dialog4").hasClass('invisible')){
		$("#dialog4").dialog("close");
	} 
	$("#alertList").empty();
}