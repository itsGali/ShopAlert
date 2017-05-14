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
	
	var name = $("<div/>", {
		text: product.name
	});
	
	var quantity = $("<div/>", {
		text: "Quantity: " + product.quantity
	});
	
	var comment = $("<div/>", {
		text: "Comment: " + product.comment
	});
	
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
	});
	
	var deleteButton = $("<button/>", {
		class: "delete ui-btn ui-shadow ui-corner-all ui-last-child",
		text: "Delete"
	}).click(function() {
		productDataRemoveProduct(productId);
	});
	
	var buttonsWrapper = $("<div/>", {
		class: "ui-controlgroup-controls"
	})
	.append(editButton)
	.append(deleteButton);
	
	var buttons = $("<div/>", {
		class: "ui-controlgroup ui-controlgroup-horizontal ui-corner-all"
	})
	.attr("data-role", "controlgroup")
	.attr("data-type", "horizontal")
	.append(buttonsWrapper);
	
	$("<div/>", {
		class: "product id_" + productId + " priority_" + product.priority
	})
	.append(name)
	.append(quantity)
	.append(comment)
	.append(buttons)
	.appendTo($("#currentProductsList"));
	
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
					value: value.number,
					text: value.name
				}).appendTo("#selectPhoneNumbers");
			});
			
		});
		
	}
	
}