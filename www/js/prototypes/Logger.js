function Logger() {
	
	this.logs = [];
	
	this.log = function(type, message) {
		var log = {
			date: new Date(),
			type: type,
			message: message
		};
		
		this.logs.push(log);
		console.log(this.logs);
	};
	
}