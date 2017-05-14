function productDataRemoveProduct(productId) {
	
	productsListData.products.splice(productId, 1);
	createProductsListDraw();
	
}

function productDataAddProduct(productData) {
	
	productsListData.products.push(productData);
	createProductsListDraw();
	
}

function productDataClear() {
	
	productsListData = new ProductsList();
	createProductsListDraw();
	
}

function selectPhoneNumberFromList(number) {
	
	productsListData.phoneNumber = number;
	createProductsListDraw();
	
}