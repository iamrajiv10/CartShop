

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
function displayCartData() {
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));
    var formData = JSON.parse(localStorage.getItem("products"));
    var tableBody = document.querySelector("tbody");
  
    // Clear existing table rows
    tableBody.innerHTML = "";
  
    for (var j = 0; j < cartItems.length; j++) {
      var row = document.createElement("tr");
  
      // Delete button
      var deleteCell = document.createElement("td");
      var deleteButton = document.createElement("button");
      deleteButton.classList.add("dltbtn")
      deleteButton.textContent = "X";
      deleteButton.addEventListener("click", deleteCartItem.bind(null, j),);
      deleteCell.appendChild(deleteButton);
      row.appendChild(deleteCell);
  
      // Image
      var imageCell = document.createElement("td");
      var imageElement = document.createElement("img");
      imageElement.setAttribute("src", cartItems[j].image);
      imageElement.setAttribute("alt", "Product Image");
      imageElement.setAttribute("width", "100");
      imageCell.appendChild(imageElement);
      row.appendChild(imageCell);
  
      // Name
      var nameCell = document.createElement("td");
      nameCell.textContent = cartItems[j].name;
      row.appendChild(nameCell);
  
      // Price
      var priceCell = document.createElement("td");
      priceCell.style.color = "green"
      priceCell.textContent =cartItems[j].currency  + " " + cartItems[j].price;
      row.appendChild(priceCell);
  
      // Quantity
      var quantityCell = document.createElement("td");
      quantityCell.classList.add("qnty")
  
      // Decrement button
      var decrementButton = document.createElement("button");
      decrementButton.textContent = "-";
      decrementButton.addEventListener("click", decrementQuantity.bind(null, j));
      quantityCell.appendChild(decrementButton);
  
      // Quantity value
      var quantityValue = document.createElement("div");
      quantityValue.classList.add("qtnmbr")
      quantityValue.textContent = cartItems[j].quantity;
      quantityCell.appendChild(quantityValue);
  
      // Increment button
      var incrementButton = document.createElement("button");
      incrementButton.textContent = "+";
      incrementButton.addEventListener("click", incrementQuantity.bind(null, j));
      quantityCell.appendChild(incrementButton);
  
      row.appendChild(quantityCell);
  
      // Total
      var totalCell = document.createElement("td");
      totalCell.style.color = "green";
      var totalValue = cartItems[j].price * cartItems[j].quantity;
      totalCell.textContent = cartItems[j].currency+" "+totalValue;
      row.appendChild(totalCell);
      tableBody.appendChild(row);
    }
  }
  
  // Function to increment the quantity
  function incrementQuantity(index) {

  var formData = JSON.parse(localStorage.getItem("products"));
  var cartItems = JSON.parse(localStorage.getItem("cartItems"));

  for (var k=0; k<formData.length; k++){
    if(cartItems[index].id == formData[k].id){
    if(cartItems[index].quantity < formData[k].quantity){
  cartItems[index].quantity++;
  cartItems[index].cartQty++;
    }else {
    alert("Sorry! no more products are available right now .")
    }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  displayCartData();
  displayTotalSum();
    }
  }
}
  
  // Function to decrement the quantity
  function decrementQuantity(index) {
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (cartItems[index].quantity > 1) {
      cartItems[index].quantity--;
      cartItems[index].cartQty--;
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else {
      alert("The Product has been removed from your cart")
      cartItems.splice(index, 1); // Remove item if quantity is 1
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
    displayCartData();
    displayTotalSum();
  }
  
  
  // Function to delete a cart item
  function deleteCartItem(index) {
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));
    cartItems.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    location.reload();
    displayCartData();
    displayTotalSum();
  } 
  
// Call the displayCartData function initially to show existing cart data
  displayCartData();
  displayTotalSum();

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// Function to calculate the subtotal and total sum
function calculateTotalSum() {
  var cartItems = JSON.parse(localStorage.getItem("cartItems"));
  var subtotalSum = 0;
  var totalSum = 0;
  for (var j = 0; j < cartItems.length; j++) {
    if (cartItems[j].currency === "₹") {
      var totalValue = cartItems[j].price * cartItems[j].quantity;
    } else {
      totalValue = cartItems[j].price * cartItems[j].quantity * 80;
    }
    subtotalSum += totalValue;
    totalSum += totalValue;
  }
  return {
    subtotal: subtotalSum,
    total: totalSum
  };
}

// Function to display the total sum in the separate table
function displayTotalSum() {
  var totalData = calculateTotalSum();
  var subtotalCell = document.getElementById("subtotalCell");
  subtotalCell.style.color = "green";
  var totalCell = document.getElementById("totalCell");
  totalCell.style.color = "green"

  if (subtotalCell) {
    subtotalCell.textContent ="₹" + " " + totalData.subtotal;}
  if (totalCell) {
    totalCell.textContent ="₹"+ " " +totalData.total;}
}
// Call the displayCartData function initially to show existing cart data
displayCartData();
displayTotalSum();


//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


function ClearCart(){
  var formData = JSON.parse(localStorage.getItem("products"));
  var cartItems = JSON.parse(localStorage.getItem("cartItems"));
  for (j=0; j<cartItems.length; j++){
    for(k=0; k<formData.length; k++){
      if (cartItems[j].id == formData[k].id){
        formData[k].quantity = formData[k].quantity - cartItems[j].quantity;
        console.log(formData[k].quantity);
        localStorage.setItem("products", JSON.stringify(formData));
      }
      if (formData[k].quantity < 1){
        formData.splice(k, 1); // Remove the item from the array 
        localStorage.setItem("products", JSON.stringify(formData));
      }
    }
  }
    localStorage.removeItem("cartItems");
    console.log("lola");
  alert("Thanks for shoping with us.")
  window.location.reload();
  displayCartData();
}
