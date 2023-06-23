function displayCartData() {
  var container = document.getElementById("data-container");
  container.innerHTML = ""; // Clear the container
}


let forms = JSON.parse(localStorage.getItem("products") || "[]");
let cartItems = JSON.parse(localStorage.getItem("cartItems"));

function clearCart() {

    for (var k=0; k<cartItems.length; k++){
        for (var j=0; j<forms.length; j++){
            if (cartItems[k].id === forms[j].id){
                // console.log(cartItems[k].quantity);
                var newQty = forms[j].quantity - cartItems[k].quantity ;
                console.log(newQty)

                // update the quantity value in forms array
                forms[j].quantity = newQty;
            }
        }
    }
    
    //update the forms data in localstorage
    localStorage.setItem("products", JSON.stringify(forms));

  // Clear the cart items in localStorage
  localStorage.removeItem("cartItems");

  // Reload the page
  location.reload();
}


// Add event listener to the clear cart button
var clearCartButton = document.getElementById("clearCartButton");
clearCartButton.addEventListener("click", clearCart);


//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
function displayCartData() {
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));
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
    }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  location.reload(); // Reload the page
    }
  }
}
  
  // Function to decrement the quantity
  function decrementQuantity(index) {
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (cartItems[index].quantity > 1) {
      cartItems[index].quantity--;
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else {
      cartItems.splice(index, 1); // Remove item if quantity is 1
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
    location.reload(); // Reload the page
  }
  
  
  // Function to delete a cart item
  function deleteCartItem(index) {
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));
    cartItems.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    location.reload();
    displayCartData();
  }
  
  // Call the displayCartData function initially to show existing cart data
  displayCartData();
  
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
    subtotalCell.textContent ="₹" + " " + totalData.subtotal;
  }
  if (totalCell) {
    totalCell.textContent ="₹"+ " " +totalData.total;
  }
}

// Call the displayCartData function initially to show existing cart data
displayCartData();

// Call the displayTotalSum function to show the total sum in the separate table
displayTotalSum();

  

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

