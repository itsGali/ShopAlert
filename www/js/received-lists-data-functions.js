function receivedListsAddList(productList) {
	
	var receivedLists = localStorage.getItem("received_products_list");
	
	if (receivedLists === null) {
		productList.id = 0;
		productList.status = 0;
		receivedLists = [productList];
	} else {
		receivedLists = JSON.parse(receivedLists);
		productList.id = receivedLists.length;
		productList.status = 0;
		receivedLists.push(productList);
	}
	
	localStorage.setItem("received_products_list", JSON.stringify(receivedLists));
	
}

function receivedListsOpenList(listId) {
	
	console.log('open ' + listId);
	var receivedLists = localStorage.getItem("received_products_list");
	receivedLists = JSON.parse(receivedLists);
	receivedLists[listId].status = 1;
	localStorage.setItem("received_products_list", JSON.stringify(receivedLists));
	receivedProductsListDraw();
	
}

function receivedListsCloseList(listId) {
	
	console.log('close ' + listId);
	var receivedLists = localStorage.getItem("received_products_list");
	receivedLists = JSON.parse(receivedLists);
	receivedLists[listId].status = 2;
	localStorage.setItem("received_products_list", JSON.stringify(receivedLists));
	receivedProductsListDraw();
	
}

function separateLists() {
	
	var newLists = [];
	var openLists = [];
	var closeLists = [];
	
	var receivedLists = localStorage.getItem("received_products_list");
	
	if (receivedLists === null) {
		return {
			n: newLists,
			o: openLists,
			c: closeLists
		};
	}
	
	receivedLists = JSON.parse(receivedLists)
	if (receivedLists.length < 1) {
		return {
			n: newLists,
			o: openLists,
			c: closeLists
		};
	}
	
	$.each(receivedLists, function(key, value) {
		if (value.status == 0) {
			newLists.push(value);
		}
		if (value.status == 1) {
			openLists.push(value);
		}
		if (value.status == 2) {
			closeLists.push(value);
		}
	});
	
	return {
		n: newLists,
		o: openLists,
		c: closeLists
	};
	
}