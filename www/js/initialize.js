$(document).ready(function () {
	
	if (checkDataStorage()) {
		
		initProductsSelectList();
		document.addEventListener("deviceready", function() {
	
			if (checkConnection()) {
				logger.log('net', 'connection');
				loadProductsData();
			} else {
				logger.log('net', 'no connection');
				$("#messagesMainPage .internetConnectionError").show();
				document.addEventListener("online", loadProductsData, false);
			}
			
			if(SMS) {
				
				logger.log('sms', 'sms enable');
				
				var filter = {
					box : 'inbox',
					maxCount : 1
				};
				
				SMS.listSMS(filter, function(data) {
					logger.log('sms', 'sms get');
					logger.log('sms', JSON.stringify(data));
				}, function(err){
					logger.log('sms', 'sms get ' + JSON.stringify(err));
				});
				
			} else {
				
				logger.log('sms', 'sms disable');
				
			}
			
			checkMyNumberFromStorage();
			initializeNumberList();
			receivedProductsListDraw();
	
		}, false);
	
	} else {
	
		$("#messagesMainPage .dataStorageError").show();
		$("#editProductSelectGroups").parent().hide();
		$("#editProductSelectProducts").parent().hide();
	
	}
	
	
	$("#createListButtonSend").click(function() {
		var result = checkShopListForm();
		if (result) {
			$("#popupSendListConfirm").popup("open");
		}
	});
	
	$("#popupSendListConfirmSend").click(function() {
		$("#popupSendListConfirm").popup("close");
		trySendShopListData();
	});
	
	$("#popupSendListConfirmBack").click(function() {
		$("#popupSendListConfirm").popup("close");
	});
	
	$("#phoneNumber").change(function() {
		updateCreateListFormNumber();
	});
	
	$("#mainComment").change(function() {
		updateCreateListFormComment();
	});
	
	$("#myPhoneNumberSave").click(function() {
		updateMyNumber();
	});
	
	initTestsData();
	
});

$(document).bind('pageinit', function () {
	
	$("#editProductSelectGroups").change(function() {
		updateProductsSelectList($(this).val());
	});
	
	$("#editProductSelectProducts").change(function() {
		selectProductFromSelectList($(this).val());
	});
	
	$("#selectPhoneNumbers").change(function() {
		selectPhoneNumberFromList($(this).val());
	});
	
	$("#createListButtonAddProduct").click(function() {
		clearProductsForm();
		$("#editProductSave").unbind('click');
		$("#editProductSave").click(function() {
			productFormAddProduct();
		});
	});
	
	$("#createListButtonClear").click(function() {
		productDataClear();
	});
	
	$("#buttonLogsViewLink").click(function() {
		logViewDrawLogs();
	});
	
	$("#buttonListsPage").click(function() {
		receivedProductsListDraw();
	});
	
	createProductsListDraw(productsListData);

});