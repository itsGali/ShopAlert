$(document).bind('pageinit', function () {

	if (checkDataStorage()) {
		initProductsSelectList();
		//if (isUpdateTime()) {
			tryLoadProductsData();
		//}
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
	
	$("#buttonLogsViewLink").click(function() {
		logViewDrawLogs();
	})
	
	createProductsListDraw(productsListData);

});