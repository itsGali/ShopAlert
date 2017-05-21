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

function findSingleListSourceContact(number) {
	
	logger.log('contactList', 'try find number ' + number);
	
	try {
		var options = new ContactFindOptions();
		options.filter   = number;
		options.multiple = true;
		options.hasPhoneNumber = true;
		var fields = [navigator.contacts.fieldType.phoneNumbers];
		navigator.contacts.find(fields, findContactsSuccess, findContactsError, options);
	} catch (error) {
		logger.log('contactList', 'search number error');
	}
	
	logger.log('contactList', 'try find number end');
}

function findContactsSuccess(contacts) {
	
	logger.log('contactList', 'find contact success');
	if (contacts.length = 1) {
		logger.log('contactList', 'try set number by ' + contacts[0].displayName);
		$("#receivedListSource .value").text(contacts[0].displayName);
	}
	
}

function findContactsError(error) {
	
	logger.log('contactList', 'find contact error');
	
}

function checkMyNumberFromStorage() {
		
	logger.log('myNumber', 'check storage');
	var myNumberInStorage = localStorage.getItem("my_number");
	logger.log('myNumber', JSON.stringify(myNumberInStorage));
	
	if (myNumberInStorage === null) {
		checkNumberFromDevice();
	} else {
		$("#myPhoneNumberText").val(myNumberInStorage);
	}
	
}

function checkNumberFromDevice() {
	
	logger.log('myNumber', 'try check');
	try {
		logger.log('myNumber', 'try');
		window.plugins.sim.getSimInfo(saveMyNumber, errorMyNumber);
		logger.log('myNumber', 'try success');
	} catch(error) {
		logger.log('myNumber', 'catch');
		logger.log('myNumber', JSON.stringify(error));
		$.mobile.navigate( "#myNumberSetting" );
	}
	
}

function saveMyNumber(result) {
	
	logger.log('myNumber', 'get my number success');
	logger.log('myNumber', 'data: ' + JSON.stringify(result));
	var myNumber = result.phoneNumber;
	localStorage.setItem("my_number", myNumber);
	$("#myPhoneNumberText").val(myNumber);
	logger.log('myNumber', 'number: ' + myNumber);
	$.mobile.navigate( "#myNumberSetting" );
	
}

function errorMyNumber(error) {
	
	logger.log('myNumber', 'get my number error');
	logger.log('myNumber', JSON.stringify(error));
	$.mobile.navigate( "#myNumberSetting" );
	
}

function updateMyNumber() {
	
	var number = $("#myPhoneNumberText").val();
	localStorage.setItem("my_number", number);
	$("#myPhoneNumberText").val(number);
	$.mobile.navigate("#mainPage");
	
}

function getMyNumber() {
	
	return '123456789';
	
}