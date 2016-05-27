$(document).ready(function(){
	
	chrome.tabs.getSelected(null, function(tab) {
		tabId = tab.id;
		tabUrl = tab.url;
		tabTitle = tab.title;

		$("#txtCurrentURL").val(tabUrl);
		$("#txtCurrentTitle").val("BURL: " + tabTitle);
    });
	
	
	$("#btnCancel").on("click",function(){
		window.close();
	})
	
	$("#btnGo").on("click",function(){
		var iDuration = parseInt($("input:radio[name=rdoDuration]:checked").val());
		var StartDate = new Date();
		StartDate.setDate(StartDate.getDate() + iDuration);
		
		var EventLengthInMinutes = 30;
		var EndDate = new Date();
		EndDate.setTime(EndDate.getTime() + (EventLengthInMinutes * (1000)))
		
		
		var GURL = "https://calendar.google.com/calendar/render?action=TEMPLATE&sf=true&output=xml";
		GURL = GURL + "&location=gmail";
		GURL = GURL + "&text=" + encodeURI( $("#txtCurrentTitle").val() );
		GURL = GURL + "&details=" + encodeURI(  $("#txtCurrentURL").val() );
		GURL = GURL + "&dates=" + convertToMilitary(StartDate) + "%2F" + convertToMilitary(EndDate) ;
				
		window.open(GURL);
	})
})

function convertToMilitary(value) {
	try{
		var myDate = new Date(value);
		var year = myDate.getFullYear()
		var month = myDate.getMonth()
		var day = myDate.getDay()
		var hour = myDate.getHours();
		var minute = myDate.getMinutes();
		var second = myDate.getSeconds();
		
		
		month = "00" + month.toString();
		day = "00" + day.toString();
		hour = "00" + hour.toString();
		minute = "00" + minute.toString();
		second = "00" + second.toString();

		return ""
			+ year
			+ month.substring(month.length - 2) 
			+ day.substring(day.length - 2) 
			+ "T"
			+ hour.substring(hour.length - 2) 
			+ minute.substring(minute.length - 2)
			+ second.substring(second.length - 2)
			+ "Z"
			;
	}catch(e){
		alert(e);
	}
}