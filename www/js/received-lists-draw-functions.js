function receivedProductsListDraw() {
	
	var receivedLists = localStorage.getItem("received_products_list");
	
	$("#receivedNewProductsList").empty();
	$("#receivedOpenProductsList").empty();
	$("#receivedCloseProductsList").empty();
	
	if (receivedLists === null) {
		return;
	}
	
	receivedLists = JSON.parse(receivedLists);
	if (receivedLists.length < 1) {
		return;
	}
	
	var separatedLists = separateLists();
	
	if (separatedLists.n.length > 0) {
		$.each(separatedLists.n, function(key, value) {
			receivedProductsListDrawNewList(value);
		});
	}
	
	if (separatedLists.o.length > 0) {
		$.each(separatedLists.o, function(key, value) {
			receivedProductsListDrawOpenList(value);
		});
	}
	
	if (separatedLists.c.length > 0) {
		$.each(separatedLists.c, function(key, value) {
			receivedProductsListDrawCloseList(value);
		});
	}
	
}

function receivedProductsListDrawNewList(list) {
	
	var fromText = $("<div/>", {
		text: 'From: ' + list.sourceNumber
	});
	
	var dateText = $("<div/>", {
		text: 'At ' + list.sendDate.toString()
	});
	
	var commentText = $("<div/>", {
		text: list.comment
	});
	
	var container = $("<div/>", {
		class: 'received_product_list_link'
	}).append(fromText)
	.append(dateText)
	.append(commentText);
	
	var link = $("<a/>", {
		href: "#receivedList"
	}).click(function() {
		findSingleListSourceContact(list.sourceNumber);
		receivedListsOpenList(list.id);
		receivedListDraw(list.id);
	}).append(container);
	
	var closeButton = $("<button/>", {
		text: "Close",
		class: "close ui-btn ui-shadow ui-corner-all ui-last-child"
	}).click(function() {receivedListsCloseList(list.id)});
	
	var wrapper = $("<div/>", {
		class: 'received_product_list new'
	}).append(link)
	.append(closeButton)
	.appendTo($("#receivedNewProductsList"));
	
}

function receivedProductsListDrawOpenList(list) {
	
	var fromText = $("<div/>", {
		text: 'From: ' + list.sourceNumber
	});
	
	var dateText = $("<div/>", {
		text: 'At ' + list.sendDate.toString()
	});
	
	var commentText = $("<div/>", {
		text: list.comment
	});
	
	var container = $("<div/>", {
		class: 'received_product_list_link'
	}).append(fromText)
	.append(dateText)
	.append(commentText);
	
	var link = $("<a/>", {
		href: "#receivedList"
	}).click(function() {
		findSingleListSourceContact(list.sourceNumber);
		receivedListDraw(list.id);
	})
	.append(container);
	
	var closeButton = $("<button/>", {
		text: "Close",
		class: "close ui-btn ui-shadow ui-corner-all ui-last-child"
	}).click(function() {receivedListsCloseList(list.id)});
	
	var wrapper = $("<div/>", {
		class: 'received_product_list opened'
	}).append(link)
	.append(closeButton)
	.appendTo($("#receivedOpenProductsList"));
	
}

function receivedProductsListDrawCloseList(list) {
	
	var fromText = $("<div/>", {
		text: 'From: ' + list.sourceNumber
	});
	
	var dateText = $("<div/>", {
		text: 'At ' + list.sendDate.toString()
	});
	
	var commentText = $("<div/>", {
		text: list.comment
	});
	
	var container = $("<div/>", {
		class: 'received_product_list_link'
	}).append(fromText)
	.append(dateText)
	.append(commentText);
	
	var link = $("<a/>", {
		href: "#receivedList"
	}).click(function() {
		findSingleListSourceContact(list.sourceNumber);
		receivedListDraw(list.id);
	})
	.append(container);
	
	var openButton = $("<button/>", {
		text: "Reopen",
		class: "reopen ui-btn ui-shadow ui-corner-all ui-last-child"
	}).click(function() {receivedListsOpenList(list.id)});
	
	var wrapper = $("<div/>", {
		class: 'received_product_list closed'
	}).append(link)
	.append(openButton)
	.appendTo($("#receivedCloseProductsList"));
	
}