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
		//logger.log('net', 'network state set to ' + networkState);
		//logger.log('net', 'connection state none = ' + Connection.NONE);
		if (networkState == Connection.NONE) {
			logger.log('net', 'network connection disable');
			return false;
		}
		logger.log('net', 'network connection enable');
		return true;
	}
	catch(err) {
		logger.log('net', 'check network connection error');
		//logger.log('net', 'check network connection error ' + err);
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
				saveProductsData(result.data);
				localStorage.setItem('products_last_update', JSON.stringify(new Date()));
				initProductsSelectList();
				$("#messagesMainPage .internetConnectionError").hide();
			} else {
				$("#messagesMainPage .internetConnectionError").show();
				setTimeout(function() {tryLoadProductsData()}, getConnectionInterval());
			}
			
		},
		error: function(error) {
			$("#messagesMainPage .internetConnectionError").show();
			setTimeout(function() {tryLoadProductsData()}, getConnectionInterval());
		}
	});
	
}

	
function tryLoadProductsData() {
	if (checkConnection()) {
		loadProductsData();
	} else {
		$("#messagesMainPage .internetConnectionError").show();
		document.addEventListener("online", loadProductsData, false);
	}

}