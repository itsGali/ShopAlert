function createProductsListDraw() {
	
	createProductsListDrawComment(productsListData.comment);
	createProductsListDrawNumber(productsListData.phoneNumber);
	$("#currentProductsList").empty();
	if (productsListData.products.length > 0) {
		$.each(productsListData.products, function() {
			createProductsListDrawProduct(this);
		});
	}
	
}

function createProductsListDrawComment(comment) {
	
	$("#mainComment").val(comment);
	
}

function createProductsListDrawNumber(number) {
	
	$("#phoneNumber").val(number);
	
}

function createProductsListDrawProduct(product) {
	
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
	
	var buttons =  $("<div/>", {
		class: "ui-controlgroup ui-controlgroup-horizontal ui-corner-all"
	})
	.attr("data-role", "controlgroup")
	.attr("data-type", "horizontal")
	.appendTo(blockB);
	
	var buttonsWrapper = $("<div/>", {
		class: "ui-controlgroup-controls"
	}).appendTo(buttons);
	
	var editButton = $("<button/>", {
		class: "edit ui-btn ui-shadow ui-corner-all ui-first-child",
		text: "Edit"
	}).click(function() {
		$("#editProductSave").unbind('click');
		$("#editProductSave").click(function() {
			productFormUpdateProduct(productId);
		});
		$("#editProductName").val(productsListData.products[productId].name);
		$("#editProductQuantity").val(productsListData.products[productId].quantity);
		$("#editProductPriority input:nth("+productsListData.products[productId].priority+")").prop( 'checked', true ).click();
		$("#editProductComment").val(productsListData.products[productId].comment);
		$("#popupEditProduct").popup( "open" );
	}).appendTo(buttonsWrapper);

	var deleteButton = $("<button/>", {
		class: "delete ui-btn ui-shadow ui-corner-all ui-last-child",
		text: "Delete"
	}).click(function() {
		productDataRemoveProduct(productId);
	}).appendTo(buttonsWrapper);
	
	container.appendTo($("#currentProductsList"));
	
}

function createProductsListDrawNumberList(contacts) {
	
	$("#selectPhoneNumbers").empty();
	$("#selectPhoneNumbers").val('');
	if (contacts.length > 0) {
		
		$.each(contacts, function(key, value) {
			var name = value.displayName;
			var numbers = value.phoneNumbers;
			
			$.each(numbers, function(key, value) {
				var number = value.value;
				$("<option/>", {
					value: number,
					text: name
				}).appendTo("#selectPhoneNumbers");
			});
			
		});
		
	}
	
}