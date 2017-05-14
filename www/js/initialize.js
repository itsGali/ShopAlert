$(document).ready(function () {
	
	if (checkDataStorage()) {
		loadProductsData();
		initProductsSelectList();
		document.addEventListener("deviceready", function() {
	
			if (checkConnection()) {
				logger.log('connection');
				loadProductsData();
			} else {
				logger.log('no connection');
				document.addEventListener("online", loadProductsData, false);
			}
	
		}, false);
	
	} else {
	
		$("#messagesMainPage .dataStorageError").show();
		$("#editProductSelectGroups").parent().hide();
		$("#editProductSelectProducts").parent().hide();
	
	}
	
});

$(document).bind('pageinit', function () {
	
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