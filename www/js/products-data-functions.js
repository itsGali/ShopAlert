const updateInterval = 60*60*1000;
var connectionsCounter = 0;

function getConnectionInterval() {
	
	connectionsCounter++;
	logger.log('net', 'get interval ' + connectionsCounter);
	if (connectionsCounter < 20) {
		return 3000;
	} else if (connectionsCounter < 50) {
		return 1800000;
	} else {
		return 86400000;
	}
	
}

function checkConnection() {
	
	logger.log('net', 'try check internet connection');
	try {
		logger.log('net', 'start check connection');
		var networkState = navigator.connection.type;
		logger.log('net', 'network state set to ' + networkState);
		logger.log('net', 'connection state none = ' + Connection.NONE);
		if (networkState == Connection.NONE) {
			logger.log('net', 'network connection disable');
			return false;
		}
		logger.log('net', 'network connection enable');
		return true;
	}
	catch(err) {
		logger.log('net', 'check network connection error ' + err);
		return false;
	}
	
	
}

function checkDataStorage() {
	
	logger.log('storage', 'try check storage');
	if (typeof(Storage) !== "undefined") {
		logger.log('storage', 'storage enabled');
		return true;
	}
	logger.log('storage', 'storage disabled');
	return false;
	
}

function isUpdateTime() {
	
	var lastUpdateDate = localStorage.getItem("products_last_update");
	
	if (lastUpdateDate === null) {
		logger.log('storage', 'first update data');
		return true;
	}
	
	lastUpdateDate = new Date(JSON.parse(lastUpdateDate));
	logger.log('storage', 'last update in ' + lastUpdateDate);
	
	var nextUpdateDate = new Date(lastUpdateDate.getTime() + updateInterval);
	logger.log('storage', 'next update date ' + nextUpdateDate);
	var currentDate = new Date();
	logger.log('storage', 'current date ' + currentDate);
	
	if (currentDate > nextUpdateDate) {
		logger.log('storage', 'time to update');
		return true;
	}
	
	logger.log('storage', 'no update');
	return false;
	
}

function saveProductsData(data) {
	
	logger.log('storage', 'start save products data');
	localStorage.setItem('products_data', JSON.stringify(data));
	logger.log('storage', 'end save products data');
	
}

function loadProductsData() {
	
	var url = 'http://mgalant.myftp.org:8081/shop_alert/api.php';
	
	logger.log('net', 'start ajax request to api');
	$.ajax({
		dataType: "json",
		crossOrigin: true,
		url: url,
		data: {
			type: "all"
		},
		success: function(result) {
			
			if (result.status == 'success') {
				logger.log('net', 'api request succes');
				saveProductsData(result.data);
				localStorage.setItem('products_last_update', JSON.stringify(new Date()));
				logger.log('net', 'set last update date');
				initProductsSelectList();
				$("#messagesMainPage .internetConnectionError").hide();
			} else {
				logger.log('net', 'api request serwer error');
				$("#messagesMainPage .internetConnectionError").show();
				setTimeout(function() {tryLoadProductsData(tryLoadCounter++)}, getConnectionInterval());
			}
			
		},
		error: function(error) {
			logger.log('net', 'api request connection error');
			$("#messagesMainPage .internetConnectionError").show();
			setTimeout(function() {tryLoadProductsData(tryLoadCounter++)}, getConnectionInterval());
		}
	});
	logger.log('net', 'after (not end) ajax request to api');
	
}

function tryLoadProductsData(counter = null) {
	
	logger.log('net', 'start try download products data nr. ' + counter);
	if (checkConnection()) {
		loadProductsData();
	} else {
		$("#messagesMainPage .internetConnectionError").show();
		document.addEventListener("online", loadProductsData, false);
	}
	logger.log('net', 'end try load products data nr. ' + counter);

}