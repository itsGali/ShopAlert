function ProductsList() {
	this.id = null;
	this.sourceNumber = '';
	this.phoneNumber = '';
	this.comment = '';
	this.status = 0; //0: new; 1: open; 2: close;
	this.sendDate = null;
	this.products = [];
	
	this.createFromSendVersion = function(senderNumber, productListSend) {
		this.sourceNumber = senderNumber;
		this.phoneNumber = productListSend.d;
		this.comment = productListSend.c;
		this.sendDate = productListSend.t;
	}
}