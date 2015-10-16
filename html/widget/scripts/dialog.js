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
function editEvent(){
	closeDialogs();
    $(function(){
        $("#dialog").removeClass('invisible').dialog();
        resize();
    });
}
function manageAlerts(){
	console.log('a');
	closeDialogs();
    $(function(){
    	refreshAlertsList();
        $("#dialog5").removeClass('invisible').dialog();
        resize();
    });
}
function alertDialog(i){
	closeDialogs();
	checkAll('alert');
    $(function(){
    	$("#dialog4").removeClass();
    	if(i==undefined){
    		$("#alertHoursInput").val("00");
    		$("#alertMinutesInput").val("00");
    		$("#alertSecondsInput").val("00");
    		$("#alertTextInput").val('');
    		$("#dialog4").addClass('none');
    	} else {
    		var time = formatTimeFromSec(alerts[i].time);
    		console.log(time);
    		var time = String(time).split(":");
    		console.log(time);
    		var h = time[0];
    		// time[0]=time[0].split(":");
    		var m = time[1];
    		var s = time[2];
    		console.log(h,m,s);
    		$("#alertHoursInput").val(h);
    		$("#alertMinutesInput").val(m);
    		$("#alertSecondsInput").val(s);
    		$("#alertTextInput").val(alerts[i].text);
    		checkAll('alert');
    		$("#dialog4").addClass(String(i));
    	}
        $("#dialog4").removeClass('invisible').dialog();
    	$("#alertHoursInput").select().focus();
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
	} if(!$("#dialog5").hasClass('invisible')){
		$("#dialog5").dialog("close");
	} 
	$("#alertList").empty();
}