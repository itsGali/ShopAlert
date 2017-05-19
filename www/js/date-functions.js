function getDateString(date) {
	
	if (date == null) {
		return '';
	}
	
	var months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	];
	
	var tmpDate = new Date(date);
	var year = tmpDate.getFullYear();
	var month = months[tmpDate.getMonth()];
	var day = tmpDate.getDate();	
	var hours = tmpDate.getHours();
	var minutes = tmpDate.getMinutes();
	
	if (hours < 10) {
		hours = '0'+hours;
	}
	
	if (minutes < 10) {
		minutes = '0'+minutes;
	}
	
	return day+' '+month+' '+year+' '+hours+':'+minutes;
	
};