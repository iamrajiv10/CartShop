
    // Add event listener to the search input
    var searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", performSearch);
    
    // Function to perform search based on the input value
    function performSearch() {
      var searchTerm = searchInput.value.toLowerCase();
      var allProducts = document.querySelectorAll(".data-item");
      
      allProducts.forEach(function(product) {
        var productName = product.querySelector("h2").textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
          product.style.display = "flex";
        } else {
          product.style.display = "none";
        }
      });
    }

/******************************************************************************************** */



function displayFormData() {
    var formData = JSON.parse(localStorage.getItem("products")) || [];
    var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    var cartProducts = [];
    formData.forEach(x=>{
        let obj = {...x};
        if(cartItems.findIndex(y=>x?.id == y?.id)>-1)
        {
            let cart = cartItems.find(y=>x?.id == y?.id);
            console.log("car",cart);
            obj.cartQty = cart?.quantity;
            obj.isAddedCart = true;
            cartProducts.push(obj);
        }else{
            obj.cartQty = 1;
            obj.isAddedCart = false;
            cartProducts.push(obj);
        }
    })
console.log(cartProducts);
  var formData = JSON.parse(localStorage.getItem("products"));
  var container = document.getElementById("data-container");
  container.innerHTML = "";

  for (var j = 0; j < cartProducts.length; j++) {
    var dataDiv = document.createElement("div");
    dataDiv.classList.add("data-item");

    // Image div
    var imageDiv = document.createElement("div");
    var imageElement = document.createElement("img");
    imageElement.setAttribute("src", cartProducts[j].image);
    imageDiv.appendChild(imageElement);
    dataDiv.appendChild(imageDiv);

    // Details div
    var detailsDiv = document.createElement("div");
    detailsDiv.classList.add("details");

    // Name
    var nameHeading = document.createElement("h2");
    nameHeading.textContent = cartProducts[j].name;
    detailsDiv.appendChild(nameHeading);

    // Price
    var priceHeading = document.createElement("h3");
    priceHeading.textContent = cartProducts[j].currency + " " + cartProducts[j].price;
    detailsDiv.appendChild(priceHeading);

    // Gender
    var genderParagraph = document.createElement("p");
    genderParagraph.textContent = "for " + "- " + cartProducts[j].gender;
    detailsDiv.appendChild(genderParagraph);

    // Quantity
    var productQuantity = document.createElement("p");
    productQuantity.textContent = "Product quantity:" + " " + cartProducts[j].quantity;
    detailsDiv.appendChild(productQuantity);

    // Cloth type
    var clothParagraph = document.createElement("p");
    clothParagraph.textContent = "Cloth type: Cotton";
    detailsDiv.appendChild(clothParagraph);

    // Add product button or quantity selector
    // var productAdded = false;

    //quantity container
    var qbContainer = document.createElement("div");
    qbContainer.classList.add("qtybtnCont");
    detailsDiv.appendChild(qbContainer);

    // Quantity button container
    var quantityContainer = document.createElement("div");
    quantityContainer.classList.add("quantity-container");
    qbContainer.appendChild(quantityContainer);

    // Decrement button
    var decrementButton = document.createElement("button");
    decrementButton.classList.add("quantity-button");
    decrementButton.style.backgroundColor = "#50BEA7"
    decrementButton.textContent = "-";
    decrementButton.addEventListener("click", decrementQuantity.bind(null, j , cartProducts[j].id));
    qbContainer.appendChild(decrementButton);


    //quantity select
    const quantitySelect = document.createElement('input');
    quantitySelect.classList.add("quantity-select");
    quantitySelect.setAttribute('type', 'number');
    quantitySelect.setAttribute('min','1');
    quantitySelect.setAttribute('value', cartProducts[j].cartQty)
    qbContainer.appendChild(quantitySelect);

    // Increment button
    var incrementButton = document.createElement("button");
    incrementButton.classList.add("quantity-button");
    incrementButton.style.backgroundColor = "#50BEA7";
    incrementButton.textContent = "+";
    incrementButton.addEventListener("click", incrementQuantity.bind(null, j, cartProducts[j].id));
    qbContainer.appendChild(incrementButton);
    dataDiv.appendChild(quantityContainer);
    // container.appendChild(dataDiv);



    // increment of Quantity of cart product
  function incrementQuantity(index, id) {
    var formData = JSON.parse(localStorage.getItem("products")) || [];
    let cartProduct = cartItems.find(x => x.id == id);
    for (var k=0; k<formData.length; k++){
      
    if (cartProduct.id == formData[k].id) {
      console.log(cartProduct.id);
      if(cartProduct.cartQty < formData[k].quantity){
        cartProduct.cartQty++
      }
      let qtt = cartProduct.cartQty
      for (var j=0; j<cartItems.length; j++){
    if(cartProduct.id == cartItems[j].id){
      if(cartItems[j].quantity < formData[k].quantity){
      cartItems[j].quantity++
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }
    location.reload();
    }
  }
  }
}


// decrement of quantity of cart product.
function decrementQuantity (index, id) {
  var formData = JSON.parse(localStorage.getItem("products")) || [];
  let cartProduct = cartItems.find(x => x.id == id);
  for (var k=0; k<formData.length; k++){
    
  if (cartProduct.id == formData[k].id) {
    console.log(cartProduct.id);
    if(cartProduct.cartQty < 1){
      cartProduct.cartQty--
    }
    let qtt = cartProduct.cartQty
    for (var j=0; j<cartItems.length; j++){
  if(cartProduct.id == cartItems[j].id){
    if(cartItems[j].quantity > 1){
    cartItems[j].quantity--
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }
  location.reload();
  }
}
}
}
    // Add product button div
    var qbButton = document.createElement("div");
    qbButton.classList.add("qbButtons");
    detailsDiv.appendChild(qbButton);

    // Add product button
    var addButton = document.createElement("button");
    addButton.textContent = "Add product";
    
    addButton.addEventListener("click", addProductToCart.bind(null, cartProducts[j], quantitySelect));
    qbButton.appendChild(addButton);
    dataDiv.appendChild(detailsDiv);
    container.appendChild(dataDiv);



    // Check if the product is already added to cart
    if (cartProducts[j].isAddedCart) {
        //product added , show quantity selector
      qbContainer.style.display = "block"; 
      addButton.style.display = "none";
    
      // Set the selected quantity
      var selectedQuantity = formData[j].quantity;
      // console.log(selectedQuantity);
      if (selectedQuantity > 0) {
        quantitySelect.value = quantitySelect.value;
        // console.log(quantitySelect.value);
      }
    } else {
      // Product not added, hide quantity selector
      qbContainer.style.display = "none";
    }
  }
}

function addProductToCart(product, quantitySelect) {
  var selectedQuantity = parseInt(quantitySelect.value);
  // Create a new product object with quantity
  var productWithQuantity = { ...product, quantity: selectedQuantity };
  // Add the product to cart in localStorage
  var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems.push(productWithQuantity);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  // Refresh the display
  displayFormData();
}

// Function to get the selected quantity for a product from localStorage
function getSelectedQuantity(productqty) {
  var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  var product = cartItems.find((item) => item.id === productqty);

  // console.log(product);
  if (product) {
    return product.quantity;
  }
  return "0";
}

displayFormData();
