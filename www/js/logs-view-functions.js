function logViewDrawLogs() {
	
	$("#logsTable tbody").empty();
	$.each(logger.logs, function(key, value) {
		var time = $("<td/>", {
			text: value.type
		});
		var type = $("<td/>", {
			text: value.date.toString()
		});
		var message = $("<td/>", {
			text: value.message
		});
		$("<tr/>")
		.append(time)
		.append(type)
		.append(message)
		.appendTo("#logsTable tbody");
	});
	
}