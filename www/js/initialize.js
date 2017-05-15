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
	
	var listToAdd = new ProductsList();
	listToAdd.sourceNumber = '111111';
	listToAdd.phoneNumber = '123456';
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
	
	receivedListsAddList(listToAdd);

	receivedProductsListDraw();
	
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
	
	logger.log('contactList', 'contact list success');
	logger.log('contactList', JSON.stringify(contacts[0].id));
	logger.log('contactList', JSON.stringify(contacts[0].displayName));
	logger.log('contactList', JSON.stringify(contacts[0].phoneNumbers));
	
	contacts.sort(function (a, b) {
		if (a.displayName < b.displayName) {
			return -1;
		}
		if (a.displayName > b.displayName) {
			return 1;
		}
		if (a.displayName == b.displayName) {
			return 0;
		}
	});
	
	createProductsListDrawNumberList(contacts);
	
}