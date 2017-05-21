function sendMessage(number, content) {
	
	logger.log('sms', 'send to ' + number);
	logger.log('sms', 'message ' + content);
	
	try {
		
		var sendSuccess = function () { logger.log('sms', 'send success'); };
		var sendError = function (e) { logger.log('sms', 'send error'); };
		
		var options = {
            replaceLineBreaks: false,
            android: {
                intent: 'INTENT'
            }
        };

        sms.send(number, content, options, sendSuccess, sendError);
		
//		CordovaSMS.checkDefault(function(data) {
//			data = JSON.parse(data);
//			logger.log('sms', 'my ' + data.thisApp);
//			logger.log('sms', 'current ' + data.currentDefault);
//			if (data.thisApp == data.currentDefault) {
//				
//				$.each(parts, function(key, part) {
//					setTimeout(function(){ CordovaSMS.sendSMS(number,part,sendSuccess,sendError); }, 1000);
//					logger.log('sms', 'sms send part ' + key);
//				});
//				
//			} else {
//				
//				logger.log('sms', 'try set default');
//				CordovaSMS.setDefault(null,null,"com.app.shopalert");
//				logger.log('sms', 'try set default end');
//				
//			}
//			logger.log('sms', 'current ' + result);
//       }, 
//      function(){});
//		
//		CordovaSMS.onDefaultSelected(function(result) {
//			logger.log('sms', 'check agree on sms');
//			if (result) {
//				logger.log('sms', 'you agree on sms');
//				
//				$.each(parts, function(key, part) {
//					setTimeout(function(){ CordovaSMS.sendSMS(number,part,sendSuccess,sendError); }, 1000);
//					logger.log('sms', 'sms send part ' + key);
//				});
//				
//			} else {
//				logger.log('sms', 'you dont agree on sms');
//			}
//		});
		
	} catch (error) {
		
		logger.log('sms', 'send catch error');
		logger.log('sms', JSON.stringify(error));
		
	}
	
}

function getMessage() {
	
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
		sign: "SHOPALERTMESSAGE",
		list: listToAdd
	}
	
	return JSON.stringify(message);
	
}

function parseMessage(message) {
	
	try {
		
		var data = JSON.parse(message);
		if (data.sign == "SHOPALERTMESSAGE") {
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
	
//	var listText = JSON.stringify(sendList); 
//	var partsQuantity = Math.ceil(listText.length/90);
//	var parts = [];
//	
//	for (i = 0; i < partsQuantity; i++) {
//		var part = listText.slice(90 * i, 90 * (i+1));
//		parts.push(part);
//	} 
//	
//	console.log(listText);
//	console.log(listText.length);
//	console.log(partsQuantity);
//	console.log(parts);
//	
//	var messages = [];
//	$.each(parts, function(key, part) {
//		var message = {
//			s: "SAM#",
//			p: key+1,
//			q: partsQuantity,
///			d: part
//		};
//		var string = JSON.stringify(message);
//		console.log(string);
//		console.log(string.length);
//		messages.push(string);
//	});
//	
//	return messages;

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
	
	return sendMessage(list.sourceNumber, content);
	
}