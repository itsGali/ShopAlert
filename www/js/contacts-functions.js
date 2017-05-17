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

var findNumberTarget = null;

function findSingleListSourceContact(number, contactNamePlace) {
	
	logger.log('contactList', 'try find number ' + number);
	logger.log('contactList', 'place ' + contactNamePlace);
	findNumberTarget = contactNamePlace;
	logger.log('contactList', 'try find number 1');
	
	var options = new ContactFindOptions();
	logger.log('contactList', 'try find number 2');
	options.filter   = number;
	logger.log('contactList', 'try find number 3');
	options.multiple = true;
	logger.log('contactList', 'try find number 4');
	options.hasPhoneNumber = true;
	logger.log('contactList', 'try find number 5');
	var fields = [navigator.contacts.fieldType.phoneNumbers];
	logger.log('contactList', 'try find number 6');
	navigator.contacts.find(fields, findContactsSuccess, findContactsError, options);
	logger.log('contactList', 'try find number end');
}

function findContactsSuccess(contacts) {
	
	logger.log('contactList', 'find contact success');
	if (contacts.length = 1) {
		logger.log('contactList', 'try set number by ' + contacts[0].displayName);
		findNumberTarget.text(contacts[0].displayName);
	}
	
}

function findContactsError(contacts) {
	
	logger.log('contactList', 'find contact error');
	
}