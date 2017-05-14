function initProductsSelectList() {
	
	logger.log('form', 'start init products list');
	var productsData = localStorage.getItem("products_data");
	if (productsData !== null) {
		var productsData = JSON.parse(productsData);
		logger.log('form', 'groups ' + productsData.length);
		if (productsData.length > 0) {
			
			$.each(productsData, function(key, value) {
				$("<option/>", {
					value: key,
					text: value.name
				}).appendTo("#editProductSelectGroups");
			});
			
			var products = productsData[0].products;
			logger.log('form', 'products ' + products.length);
			$("#editProductSelectProducts").empty();
			if (products.length > 0) {
				$.each(products, function(key, value) {
					$("<option/>", {
						value: value.name,
						text: value.name
					}).appendTo("#editProductSelectProducts");
				});
			}
			
		}
	}
	logger.log('form', 'end init products list');
	
}

function updateProductsSelectList(groupId) {
	
	var productsData = localStorage.getItem("products_data");
	if (productsData !== null) {
		var productsData = JSON.parse(productsData);
		if (productsData.length >= groupId) {
			
			var products = productsData[groupId].products;
			$("#editProductSelectProducts").empty();
			$("#editProductSelectProducts").val('');
			if (products.length > 0) {
				$.each(products, function(key, value) {
					$("<option/>", {
						value: value.name,
						text: value.name
					}).appendTo("#editProductSelectProducts");
				});
			}
			
		}
	}
	
}

function clearProductsForm() {
	
	$("#editProductName").val('');
	$("#editProductQuantity").val('1');
	$("#editProductPriorityNormal").prop( 'checked', true ).click();
	$("#editProductComment").val('');
	
}

function selectProductFromSelectList(productName) {
	
	$("#editProductName").val(productName);
	
}

function loadDataToProduct(product) {
	
	product.name = $("#editProductName").val();
	product.quantity = $("#editProductQuantity").val();
	product.priority = $("#editProductPriority input:checked").val();
	product.comment = $("#editProductComment").val();
	return product;
	
}

function validateProductFormCondition() {
	
	if ($("#editProductName").val() == '') {
		return false;
	}
	if ($("#editProductQuantity").val() == '') {
		return false;
	}
	if (!($.isNumeric($("#editProductQuantity").val()))) {
		return false;
	}
	if ($("#editProductQuantity").val() <= 0) {
		return false;
	}
	return true;
	
}

function productFormAddProduct() {
	
	if (validateProductFormCondition()) {
		var product = new Product();
		product = loadDataToProduct(product);
		$("#popupEditProduct").popup( "close" );
		clearProductsForm();
		productDataAddProduct(product);
	}
	
}

function productFormUpdateProduct(productId) {
	
	if (validateProductFormCondition()) {
		productsListData.products[productId] = loadDataToProduct(productsListData.products[productId]);
		$("#popupEditProduct").popup( "close" );
		clearProductsForm();
		createProductsListDraw();
	}

}