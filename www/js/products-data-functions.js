const updateInterval = 60*60*1000;
var connectionsCounter = 0;

function getConnectionInterval() {
	
	connectionsCounter++;
	console.log(connectionsCounter);
	if (connectionsCounter < 20) {
		return 3000;
	} else if (connectionsCounter < 50) {
		return 1800000;
	} else {
		return 86400000;
	}
	
}

function checkConnection() {
	
	return true;
	
}

function isUpdateTime() {
	
	var lastUpdateDate = localStorage.getItem("product_last_update");
	
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
	
	localStorage.setItem('product_data', JSON.stringify(data));
	
}

function setProductsList() {
	
	
	
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
				setProductsList();
			} else {
				setTimeout(function() {tryLoadProductsData()}, getConnectionInterval());
			}
			
		},
		error: function(error) {
			
			setTimeout(function() {tryLoadProductsData()}, getConnectionInterval());
			
		}
	});
	
}

function tryLoadProductsData() {
	
	if (checkConnection()) {
		loadProductsData();
	} else {
		setTimeout(function() {tryLoadProductsData()}, getConnectionInterval());
	}

}

function getProductsDataOnStart() {
	
	setProductsList();
	if (isUpdateTime()) {
		tryLoadProductsData();
	}
	
}