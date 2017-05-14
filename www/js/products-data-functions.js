const updateInterval = 60*60*1000;
var connectionsCounter = 0;

function getConnectionInterval() {
	
	connectionsCounter++;
	if (connectionsCounter < 20) {
		return 3000;
	} else if (connectionsCounter < 50) {
		return 1800000;
	} else {
		return 86400000;
	}
	
}

function checkConnection() {
	
	try {
		var networkState = navigator.connection.type;
		if (networkState == Connection.NONE) {
			return false;
		}
		return true;
	}
	catch(err) {
		return false;
	}
	
}

function checkDataStorage() {
	
	if (typeof(Storage) !== "undefined") {
		return true;
	}
	return false;
	
}

function isUpdateTime() {
	
	var lastUpdateDate = localStorage.getItem("products_last_update");
	
	if (lastUpdateDate === null) {
		return true;
	}
	
	lastUpdateDate = new Date(JSON.parse(lastUpdateDate));
	
	var nextUpdateDate = new Date(lastUpdateDate.getTime() + updateInterval);
	var currentDate = new Date();
	
	if (currentDate > nextUpdateDate) {
		return true;
	}
	
	return false;
	
}

function saveProductsData(data) {
	
	localStorage.setItem('products_data', JSON.stringify(data));
	
}

function loadProductsData() {
	logger.log('try load');
	var url = 'http://mgalant.myftp.org:8081/shop_alert/api.php';
	
	$.ajax({
		dataType: "json",
		crossOrigin: true,
		url: url,
		data: {
			type: "all"
		},
		success: function(result) {
			
			if (result.status == 'success') {
				logger.log('load success');
			//	saveProductsData(result.data);
			//	localStorage.setItem('products_last_update', JSON.stringify(new Date()));
			//	initProductsSelectList();
			//	$("#messagesMainPage .internetConnectionError").hide();
			} else {
				logger.log('load server error');
			//	$("#messagesMainPage .internetConnectionError").show();
			//	setTimeout(function() {tryLoadProductsData()}, getConnectionInterval());
			}
			
		},
		error: function(error) {
			logger.log('load connection error - ' + JSON.stringify(error));
			//$("#messagesMainPage .internetConnectionError").show();
			//setTimeout(function() {tryLoadProductsData()}, getConnectionInterval());
		}
	});
	
}