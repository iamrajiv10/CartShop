function guna(a,b){
    console.log (a*b)
}
guna(12, 36);




// <script>
//     // Function to display form data in separate div elements
// function displayFormData() {
//   var formData = JSON.parse(localStorage.getItem("formData"));
//   var container = document.getElementById("data-container");
//   container.innerHTML = "";

//   for (var j = 0; j < formData.length; j++) {
//     var dataDiv = document.createElement("div");
//     dataDiv.classList.add("data-entry");

//     // Serial number
//     var serialNumber = document.createElement("p");
//     serialNumber.textContent = "Serial No: " + (j + 1);
//     dataDiv.appendChild(serialNumber);

//     // Image
//     var imageElement = document.createElement("img");
//     imageElement.setAttribute("src", formData[j].image);
//     imageElement.setAttribute("width", "100");
//     imageElement.setAttribute("height", "100");
//     dataDiv.appendChild(imageElement);

//     // Other form data
//     var fields = ["Name", "Gender", "Price", "Currency", "Color", "Quantity"];
//     for (var k = 0; k < fields.length; k++) {
//       var fieldLabel = document.createElement("p");
//       fieldLabel.textContent = fields[k] + ":";
//       dataDiv.appendChild(fieldLabel);

//       var fieldValue = document.createElement("p");
//       fieldValue.textContent = formData[j][fields[k].toLowerCase()];
//       dataDiv.appendChild(fieldValue);
//     }

//     // Add data div to container
//     container.appendChild(dataDiv);
//   }
// }

// // Call the displayFormData function initially to show existing data
// displayFormData();
// </script>





// Function to display form data in separate div elements
// function displayFormData() {
//     var formData = JSON.parse(localStorage.getItem("formData"));
//     var container = document.getElementById("data-container");
//     container.innerHTML = "";
  
//     for (var j = 0; j < formData.length; j++) {
//       // Create a new row for every three items
//       if (j % 3 === 0) {
//         var rowDiv = document.createElement("div");
//         rowDiv.classList.add("row");
//         container.appendChild(rowDiv);
//       }
  
//       var dataDiv = document.createElement("div");
//       dataDiv.classList.add("prdct");
  
//       // Image
//       var imageDiv = document.createElement("div");
//       var imageElement = document.createElement("img");
//       imageElement.setAttribute("src", formData[j].image);
//       imageElement.setAttribute("alt", "prdct");
//       imageDiv.appendChild(imageElement);
//       dataDiv.appendChild(imageDiv);
  
//       // Product details
//       var detailsDiv = document.createElement("div");
  
//       // Product name
//       var nameHeading = document.createElement("h6");
//       nameHeading.textContent = formData[j].name;
//       detailsDiv.appendChild(nameHeading);
  
//       // Product price
//       var priceParagraph = document.createElement("p");
//       priceParagraph.textContent = formData[j].price + " " + formData[j].currency;
//       detailsDiv.appendChild(priceParagraph);
  
//       // Add to Cart button
//       var addToCartButton = document.createElement("button");
//       addToCartButton.textContent = "Add to Cart";
//       detailsDiv.appendChild(addToCartButton);
  
//       dataDiv.appendChild(detailsDiv);
  
//       // Add data div to the current row
//       rowDiv.appendChild(dataDiv);
//     }
//   }
  
//   // Call the displayFormData function initially to show existing data
//   displayFormData();
  


// &#8377;         rupees
// &#36;        dollar




// // Quantity
// var quantityCell = document.createElement("td");
// var quantitySelect = document.createElement("select");
// var quantityOptions = [0, 1, 2, 3, 4, 5];
// quantitySelect.value = cartItems[j].quantity; // Set the selected quantity
// quantitySelect.addEventListener("change", updateQuantity.bind(null, j, quantitySelect));
// for (var i = 0; i < quantityOptions.length; i++) {
//   var option = document.createElement("option");
//   option.textContent = quantityOptions[i];
//   quantitySelect.appendChild(option);
// }

// // Apply CSS classes
// quantityCell.classList.add("quantity-cell");
// quantitySelect.classList.add("quantity-select");

// quantityCell.appendChild(quantitySelect);
// row.appendChild(quantityCell);




















function handleUpdate(event) {
    var index = parseInt(event.target.dataset.index);
    var formData = JSON.parse(localStorage.getItem("formData"));
    var selectedData = formData[index];
  
    // Populate input fields with existing data
    var nameInput = document.querySelector('input[type="text"][placeholder="Name"]');
    var genderSelect = document.querySelector('select[name="gender"]');
    var priceInput = document.querySelector('input[type="number"][placeholder="Price"]');
    var currencySelect = document.querySelector('select[name="currency"]');
    var colorSelect = document.querySelector('select[name="color"]');
    var quantityInput = document.querySelector('input[type="number"][placeholder="Quantity"]');
  
    nameInput.value = selectedData.name;
    genderSelect.value = selectedData.gender;
    priceInput.value = selectedData.price;
    currencySelect.value = selectedData.currency;
    colorSelect.value = selectedData.color;
    quantityInput.value = selectedData.quantity;
  
    // Retrieve and display the image
    var imageDiv = document.getElementById("image-container");
    var imageElement = document.createElement("img");
    imageElement.setAttribute("src", selectedData.image);
    imageElement.setAttribute("alt", "Product Image");
    imageDiv.innerHTML = "";
    imageDiv.appendChild(imageElement);
  
    // Add event listener to the form submit button
    var form = document.querySelector('form');
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent form submission
      if (validateForm()) {
        // Update the form data
        formData[index] = {
          name: nameInput.value,
          gender: genderSelect.value,
          price: priceInput.value,
          currency: currencySelect.value,
          color: colorSelect.value,
          quantity: quantityInput.value,
          image: selectedData.image
        };
        localStorage.setItem("formData", JSON.stringify(formData));
        alert("Data updated successfully.");
        form.reset();
        // Redirect to the previous page
        window.history.back();
        // Display the updated data
        displayFormData();
      }
    });
  }
  