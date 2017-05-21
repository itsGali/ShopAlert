function sendMessage(number, content) {
	
	logger.log('sms', 'send to ' + number);
	logger.log('sms', 'message ' + content);
	
	try {
		
		var sendSuccess = function () {
			logger.log('sms', 'send success');
		};
		
		var sendError = function (e) {
			logger.log('sms', 'send error');
			setTimeout(function (){
				$("#popupSendListSendError").popup("open");
			}, 1000);
		};
		
		var options = {
            replaceLineBreaks: false,
            android: {
                intent: 'INTENT'
            }
        };

        sms.send(number, content, options, sendSuccess, sendError);
		
	} catch (error) {
		
		logger.log('sms', 'send catch error');
		logger.log('sms', JSON.stringify(error));
		
		setTimeout(function (){
			$("#popupSendListSendError").popup("open");
		}, 1000);
		
	}
	
}

function getMessage(sms) {
	
	logger.log('sms', 'i got sms');
	logger.log('sms', JSON.stringify(sms));
	return '';
	
	var listToAdd = new ProductsList();
	listToAdd.sourceNumber = '784 628 738';
	listToAdd.phoneNumber = '123456789';
	listToAdd.comment = 'test comment';
	listToAdd.sendDate = new Date();
	
	var product1 = new Product();
	product1.name = 'test name 1';
	product1.quantity = '1';
	product1.priority = 1;
	product1.comment = 'test comment 1';
	product1.status = 0;
	
	var product2 = new Product();
	product2.name = 'test name 2';
	product2.quantity = '2';
	product2.priority = 2;
	product2.comment = 'test comment 2';
	product2.status = 0;
	
	listToAdd.products.push(product1);
	listToAdd.products.push(product2);
	
	var message = {
		sign: "SA#1965",
		list: listToAdd
	}
	
	return JSON.stringify(message);
	
}

function parseMessage(message) {
	
	try {
		
		var data = JSON.parse(message);
		if (data.sign == "SA#1965") {
			return data.list;
		}
		return null;
		
	} catch(error) {
	
		return null;
	
	}
	
}

function prepareDataToSend(list) {
	
	var sendProducts = [];
	var sendList = new ProductsListSend(list);
	
	$.each(list.products, function(key, product) {
		sendList.p.push(new ProductSend(product));
	});

	var message = {
		sign: "SA#1965",
		list: sendList
	}
	
	return JSON.stringify(message);
	
}

function onMessageReceived() {
	
	var message = getMessage();
	var data = parseMessage(message);
	if (data != null) {
		receivedListsAddList(data);
	}
	
}

function sendConfirmMessage(listId) {
	
	var receivedLists = localStorage.getItem("received_products_list");
	receivedLists = JSON.parse(receivedLists);
	var list = receivedLists[listId];
	
	var content = 'ShopAlert - reply to list posted '+getDateString(list.sendDate)+'. List: ';
	$.each(list.products, function(index, product) {
		if (product.status == 0) {
			content = content+product.name+' not bought,';
		}
		if (product.status == 1) {
			content = content+product.name+' bought,';
		}
		if (product.status == 2) {
			content = content+product.name+' unavailable,';
		}
	});
	content = content.slice(0, -1);
	content = content+'.';
	
	logger.log('sms', 'send received confirm to ' + list.sourceNumber);
	logger.log('sms', 'received confirm message ' + content);
	
	try {
		
		var sendSuccess = function () {
			logger.log('sms', 'confirm send success');
		};
		
		var sendError = function (e) {
			logger.log('sms', 'confirm send error');
			setTimeout(function (){
				$("#popupSendReceivedListError").popup("open");
			}, 1000);
		};
		
		var options = {
            replaceLineBreaks: false,
            android: {
                intent: 'INTENT'
            }
        };

        sms.send(list.sourceNumber, content, options, sendSuccess, sendError);
		
	} catch (error) {
		
		logger.log('sms', 'confirm send catch error');
		logger.log('sms', JSON.stringify(error));
		
		setTimeout(function (){
			$("#popupSendReceivedListError").popup("open");
		}, 1000);
		
	}
	
}