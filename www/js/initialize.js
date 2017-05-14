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
	options.hasPhoneNumber = true;
	var fields = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.phoneNumbers];
	navigator.contacts.find(fields, loadContactsSuccess, loadContactsError, options);
	
}

function loadContactsError() {
	
	logger.log('contactList', 'contact list error');
	
}

function loadContactsSuccess(contacts) {
	
	createProductsListDrawNumberList(contacts);
	
	logger.log('contactList', JSON.stringify(contacts[0].id));
	logger.log('contactList', JSON.stringify(contacts[0].displayName));
	logger.log('contactList', JSON.stringify(contacts[0].name));
	logger.log('contactList', JSON.stringify(contacts[0].nickname));
	logger.log('contactList', JSON.stringify(contacts[0].phoneNumbers));
	logger.log('contactList', JSON.stringify(contacts[0].emails));
	logger.log('contactList', JSON.stringify(contacts[0].addresses));
	logger.log('contactList', JSON.stringify(contacts[0].ims));
	logger.log('contactList', JSON.stringify(contacts[0].organizations));
	logger.log('contactList', JSON.stringify(contacts[0].birthday));
	logger.log('contactList', JSON.stringify(contacts[0].note));
	logger.log('contactList', JSON.stringify(contacts[0].photos));
	logger.log('contactList', JSON.stringify(contacts[0].categories));
	logger.log('contactList', JSON.stringify(contacts[0].urls));
	
}