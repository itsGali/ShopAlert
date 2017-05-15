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