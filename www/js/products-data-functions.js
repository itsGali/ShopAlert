const updateInterval = 60*60*1000;

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
	
	logger.log('storage', 'start save');
	localStorage.setItem('products_data', JSON.stringify(data));
	logger.log('storage', 'end save');
	
}

function loadProductsData() {
	
	logger.log('net', 'try load');
	$("#messagesMainPage .internetConnectionError").hide();
	if (isUpdateTime()) {
		
		logger.log('storage', 'is update time');
	
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
					logger.log('net', 'load success');
					saveProductsData(result.data);
					localStorage.setItem('products_last_update', JSON.stringify(new Date()));
					initProductsSelectList();
					$("#messagesMainPage .internetConnectionError").hide();
					$("#messagesMainPage .apiServerError").hide();
				} else {
					logger.log('net', 'load server error');
					$("#messagesMainPage .apiServerError").show();
				}
				
			},
			error: function(error) {
				logger.log('net', 'load connection error - ' + JSON.stringify(error));
				$("#messagesMainPage .internetConnectionError").show();
				$("#messagesMainPage .apiServerError").hide();
			}
		});
		
	} else {
		
		logger.log('storage', 'no update time');
		
	}
	
}