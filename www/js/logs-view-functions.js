function logViewDrawLogs() {
	
	$("#logsTable tbody").empty();
	$.each(logger.logs, function(key, value) {
		var time = $("<td/>", {
			text: value.date.toString()
		});
		var type = $("<td/>", {
			text: value.type
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