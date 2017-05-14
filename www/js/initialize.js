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
			
			initializeNumberList();
	
		}, false);
	
	} else {
	
		$("#messagesMainPage .dataStorageError").show();
		$("#editProductSelectGroups").parent().hide();
		$("#editProductSelectProducts").parent().hide();
	
	}
	
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
	})
	
	createProductsListDraw(productsListData);

});

function initializeNumberList() {
	
	var options = new ContactFindOptions();
	options.multiple = true;
	options.desiredFields = [navigator.contacts.fieldType.id];
	options.hasPhoneNumber = true;
	var fields = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.phoneNumbers];
	navigator.contacts.find(fields, contactSuccess, contactError, options);
	
//	createProductsListDrawNumberList(
//		[
//			{name: "A", number: "123"},
//			{name: "B", number: "456"},
//			{name: "C", number: "789"},
//		]
//	);
	
}

function contactError() {
	
	logger.log('contactList', 'contact list error');
	
}

function contactSuccess(contacts) {
	
	logger.log('contactList', 'contact list success ' + JSON.stringify(contacts[0]));
	
}