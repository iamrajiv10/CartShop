// Function to validate the form
function validateForm() {
    var name = document.querySelector('input[type="text"][placeholder="Name"]').value;
    var gender = document.querySelector('select').value;
    var price = document.querySelector('input[type="number"][placeholder="Price"]').value;
    var currency = document.querySelector('input[type="text"][placeholder="Currency"]').value;
    var color = document.querySelectorAll('select')[1].value;
    var quantity = document.querySelector('input[type="number"][placeholder="Quantity"]').value;
  
    // Validate required fields
    if (name === "" || gender === "Gender" || price === "" || currency === "" || color === "Select Color" || quantity === "") {
      alert("Please fill in all required fields.");
      return false;
    }
  
    // Validate price and quantity fields
    if (isNaN(price) || price <= 0 || isNaN(quantity) || quantity <= 0) {
      alert("Please enter a valid price and quantity.");
      return false;
    }
  
    // Store data in localStorage
    var formData = {
      name: name,
      gender: gender,
      price: price,
      currency: currency,
      color: color,
      quantity: quantity
    };
    localStorage.setItem("formData", JSON.stringify(formData));
    return true;
  }
  
  // Attach event listener to the form submit button
  var form = document.querySelector('form');
  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
    if (validateForm()) {
      alert("Data saved successfully.");
      form.reset();
    }
  });
  