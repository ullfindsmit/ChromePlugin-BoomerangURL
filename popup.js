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
		EndDate.setTime(EndDate.getTime() + (EventLengthInMinutes * (60*1000)))
		
		
		var GURL = "https://calendar.google.com/calendar/render?action=TEMPLATE";
		GURL = GURL + "&dates=" + convertToMilitary(StartDate) + "/" + convertToMilitary(EndDate);
		GURL = GURL + "&location=gmail";
		GURL = GURL + "&text=" + $("#txtCurrentTitle").val();
		GURL = GURL + "&details=" + $("#txtCurrentURL").val();
		/*
		https://calendar.google.com/calendar/render?action=TEMPLATE
		dates=20160504T110000Z/20160504T170000Z
		location=Tatooine
		text=Star+Wars+Day+Party
		details=May+the+force+be+with+you%0A%0A--%0Ahttp://addtocalendar.com
		*/
		
		alert(GURL);
		console.log(GURL);
	})
})

function convertToMilitary(value) {
	try{
		var myDate = new Date(value);
		var hour = myDate.getHours();
		var minute = myDate.getMinutes();
		var second = myDate.getSeconds();
		
		minute = "00" + minute.toString();
		hour = "00" + hour.toString();
		second = "00" + second.toString();

		return ""
			+ myDate.getFullYear()
			+ myDate.getMonth()
			+ myDate.getDay()
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