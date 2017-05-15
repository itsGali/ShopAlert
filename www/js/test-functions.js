function initTestsData() {
	
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
	
}