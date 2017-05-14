$(document).bind('pageinit', function () {
	
//	const ENABLE_LOGS = true;
//	
//	if (ENABLE_LOGS) {
//		logger.addLogsButton();
//		logger.log('main', 'logs on');
//	}

	if (checkDataStorage()) {
		initProductsSelectList();
		if (isUpdateTime()) {
			tryLoadProductsData(tryLoadCounter++);
		}
	} else {
		$("#messagesMainPage .dataStorageError").show();
		$("#editProductSelectGroups").parent().hide();
		$("#editProductSelectProducts").parent().hide();
	}
	
	$("#editProductSelectGroups").change(function() {
		updateProductsSelectList($(this).val());
	});
	
	$("#editProductSelectProducts").change(function() {
		selectProductFromSelectList($(this).val());
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
	
	createProductsListDraw(productsListData);
	
});