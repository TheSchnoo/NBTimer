//----------------------------------
//--BUTTON events and input clicking
//----------------------------------

//freshly creates elements to fixed number length
	function createElements(){
		//clear out the svg and the array
		clearOut();
		var count=0;
		for(count;count<$("#amount").val();count++){
			data.push({"value":1,"label":"longer"});
		}
		d3Create();
	}
   //--------Resets
    function resetRotate(){
    	$("#d3").css({"transform":"","transition":""});
    }
    function resetSpinnerStyling(){
		$("path").css({"opacity": 1,"stroke-width": 1});
		if($(".ui-dialog").is(":visible")){
			$("#dialog").dialog("close");
		}
	}
	//-----------------------
	//--------EVENTS--------
	//-----------------------
	function eventAddClickEffect(){
        $('path').click(function() {
            if(!disableSpin){
                return;
            }
            //reset all borders
            $("path").attr("stroke-width",0);

            //blur the other ones out 
            $("path").css("opacity", 0.3);
            $(this).css("opacity",1);
            $(this).css("stroke-width", 4);
            $parent = $(this).parent();
            //let's the id from the parent and use it as our array index
            var index = $parent.attr("id").replace("slice","");
            $(function() {
                $("#dialog").dialog();
                $("#element-setting").html("Element #"+index);
                $("#element-color-picker").val(data[index].color);
                $("#element-font-color-picker").val(data[index].fontColor);
                $("#element-text").val(data[index].label);
                $("#element-color").html(data[index].color);
                $("#element-index").html(index);
                $("#element-font-size").html(data[index].fontSize);
            });
        });
    }
	$("#element-text").keyup(function(){
		changeElementText();
	});
	$("#element-color-picker").change(function(){
		changeElementColor();
	});
	$("#element-font-color-picker").change(function(){
		changeElementTextColor();
	});
	function getFontSizeCode(font){
		switch(font){
			case("Max"):
				return 24;
				break;
			case("Large"):
				return 18;
				break;
			case("Medium"):
				return 12;
				break;
			case("Small"):
				return 8;
				break;
			default:
				return;
		}
	}
	function changeFontSize(fontString,sliceIndex){
		var size = getFontSizeCode(fontString);
		if(sliceIndex == undefined){
			for (var i=0; i<data.length; i++){
				data[i].fontSize = size;
			}
		} else {
			data[sliceIndex].fontSize=size;
		}
		$("svg").remove();
		d3Create();
	}
	function changeElementColor(){
		var index = $("#element-index").html();
		data[index].color = $("#element-color-picker").val();
		$("#slice"+index+" path").attr("fill",data[index].color);
	}
	function changeElementTextColor(){
		var index = $("#element-index").html();
		data[index].fontColor = $("#element-font-color-picker").val();
		$("#slice"+index+" text").attr("fill",data[index].fontColor);
	}
	function changeElementText(){
		var index = $("#element-index").html();
		data[index].label = $("#element-text").val();
		$("#slice"+index+" text").text(data[index].label);
	}

	function changeType(type){
		if (type=="Wheel"){
			wheelSpinner = true;
		} else wheelSpinner = false;
		if(!wheelSpinner){
			$("svg").remove();
			d3Create();
			$("#d3").css('transition','0s').css('-webkit-transform','');
			$("#arrow").css('display','none');
			$("#pointer").css('display','block');
			disableSpin = true;
		}
	}
	function joinSections(sections){
		//sections is an array of indexes, first val will always be the one that is first
		var amount = sections.length;
		var size =0;
		for (var i=0; i<sections.length; i++){
			size+=data[sections[i]].value;
		}
		data[sections[0]].value = size;
		for (var i=1; i<sections.length; i++){
			removeSection(sections[i]);
		}
		$("svg").remove();
		d3Create();
	}

	var COLOUR_SCHEMES=[
		[
			"#FFAAAA","#D46A6A","#AA3939","#901515" //red
		], [
			"#CAEA9C","#9BC362","#729C34","#4D7514" //green
		],[
			"#C1C6E0","#9098C2","#646EA4","#404C88" //blue
		],[
			"#D3BDDF","#AC89BF","#885CA0","#6A3985" //purple
		],[
			"#FFFAD6","#FFF6B3","#F0E384","#C7BA4F" //yellow
		],[
			"#eeeeee","#aaaaaa","#777777","#333333" //grey
		]
	];
	var currentScheme = 'red';
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
	function nextColor(){
		if(data.length ==0){
			return COLOUR_SCHEMES[getColorCode(currentScheme)][0];
		}
		var index = COLOUR_SCHEMES[getColorCode(currentScheme)].indexOf(data[data.length-1].color);
		return COLOUR_SCHEMES[getColorCode(currentScheme)][(index+1)%4];
	}
	function changeColorScheme(color){
		currentScheme = color;

		color = getColorCode(color);
		for (var i=0; i<data.length; i++){
			data[i].color=COLOUR_SCHEMES[color][i%4];
		}
		$("svg").remove();
		d3Create();
	}

