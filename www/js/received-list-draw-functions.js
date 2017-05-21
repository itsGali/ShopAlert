function receivedListDraw(listId) {
	
	var receivedLists = localStorage.getItem("received_products_list");
	receivedLists = JSON.parse(receivedLists);
	productList = receivedLists[listId];
	
	$("#receivedListSource span.value").text(productList.sourceNumber);
	$("#receivedListDate span.value").text(getDateString(productList.sendDate));
	$("#receivedListComment div.value").text(productList.comment);
	
	$("#receivedListProducts").empty();
	if (productList.products.length > 0) {
		$.each(productList.products, function(key, value) {
			receivedListSingleProductDraw(key, value, listId);
		});
	}
	
}

function receivedListSingleProductDraw(key, product, listId) {
	
	var productId = $("#currentProductsList > div").length;
	
	var container = $("<div/>", {
		class: "product priority_" + product.priority
	});
	
	var table =  $("<table/>").appendTo(container);
	
	var blockA =  $("<td/>", {
		class: "bar"
	}).appendTo(table);
	
	var blockB =  $("<td/>", {
		class: "data"
	}).appendTo(table);
	
	var name = $("<div/>", {
		class: "name"
	}).appendTo(blockB);
	
	var nameText = $("<span/>", {
		text: product.name
	}).appendTo(name);
	
	var quantity = $("<div/>", {
		class: "quantity"
	}).appendTo(blockB);
	
	var quantityText = $("<span/>", {
		text: "Quantity: "
	}).appendTo(quantity);
	
	var quantityValue = $("<span/>", {
		text: product.quantity
	}).appendTo(quantity);
	
	var comment = $("<div/>", {
		class: "comment"
	}).appendTo(blockB);
	
	var commentText = $("<div/>", {
		text: "Comment"
	}).appendTo(comment);
	
	var commentValue = $("<div/>", {
		text: product.comment
	}).appendTo(comment);
	
	var statusSelect = $("<select/>").appendTo(blockB);
	
	var optionUnset = $("<option/>", {
		text: "Unset",
		value: "0"
	}).appendTo(statusSelect);
	
	var optionBought = $("<option/>", {
		text: "Bought",
		value: "1"
	}).appendTo(statusSelect);
	
	var optionUnavailable = $("<option/>", {
		text: "Unavailable",
		value: "2"
	}).appendTo(statusSelect);
	
	statusSelect.selectmenu();
	statusSelect.change(function() {
		console.log(product);
		product.status = parseInt(statusSelect.val());
		updateProduct(listId, key, product);
		console.log(product);
	});
	statusSelect.val(product.status).attr('selected', true).siblings('option').removeAttr('selected');
	statusSelect.selectmenu("refresh", true);
	
	container.appendTo($("#receivedListProducts"));
	
	$("#receivedListSendConfirm").unbind("click");
	$("#receivedListSendConfirm").click(function() {
		var result = sendConfirmMessage(listId);
		if (!result) {
			$("#popupSendReceivedListError").popup("open");
		}
	});
	
}