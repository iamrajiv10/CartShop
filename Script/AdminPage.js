// Keep track of previously submitted names
let submittedNames = [];

function generateUniqueID() {
    const timestamp = Date.now();
    return `${timestamp}`;
}
function validateForm() {
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const color = document.getElementById("color").value;
    const gender = document.getElementById("gender").value;
    const currency = document.getElementById("currency").value;
    const quantity = document.getElementById("quantity").value;
    const image = document.getElementById("forimage").value;

        // Reset error messages
    document.getElementById("nameError").textContent = "";
    document.getElementById("genderError").textContent = "";
    document.getElementById("priceError").textContent = "";
    document.getElementById("colorError").textContent = "";
    document.getElementById("quantityError").textContent = "";
    document.getElementById("currencyError").textContent = "";
    // document.getElementById("imageError").textContent = "";

       if (!name) {
        document.getElementById("nameError").textContent = "Please input your product Name";
    }
    if (!gender) {
        document.getElementById("genderError").textContent = "Please choose Gender.";
    }
    if (!price) {
        document.getElementById("priceError").textContent = "Please enter Price.";
    }
    if (!color) {
        document.getElementById("colorError").textContent = "Please select Color.";
    }
    if (!quantity) {
        document.getElementById("quantityError").textContent = "Please enter Quantity.";
    }
    if (!currency) {
        document.getElementById("currencyError").textContent = "Please Select Currency.";
    }
    if (!image) {
        document.getElementById("fileError").textContent = "Please upload Image.";
    }


    // generate a unique id for the product
    var id = generateUniqueID();
    // Add name to list of submitted names
    submittedNames.push(name);
    saveData(id);
    return true;
}

// Add event listeners to input fields to check for errors when focus is lost
document.getElementById("name").addEventListener("input", function () {
    const name = this.value.trim();
    if (name === "") {
        document.getElementById("nameError").textContent = "Please input your product Name";
    }else{
        document.getElementById("nameError").textContent =" ";
    }
    
});
document.getElementById("gender").addEventListener("input", function () {
    const gender = this.value.trim();
    if (!gender) {
        document.getElementById("genderError").textContent = "Please choose Gender.";
    }else{
        document.getElementById("genderError").textContent =" ";
    }
});
document.getElementById("price").addEventListener("input", function () {
    const price = this.value.trim();
    if (!price) {
        document.getElementById("priceError").textContent = "Please enter Price.";
    }else{
        document.getElementById("priceError").textContent =" ";
    }
});
document.getElementById("color").addEventListener("input", function () {
    const color = this.value.trim();
    if (!color) {
        document.getElementById("colorError").textContent = "Please select Color.";
    }else{
        document.getElementById("colorError").textContent =" ";
    }
});
document.getElementById("quantity").addEventListener("input", function () {
    const quantity = this.value.trim();
    if (!quantity) {
        document.getElementById("quantityError").textContent = "Please enter Quantity.";
    }else{
        document.getElementById("quantityError").textContent =" ";
    }
});
document.getElementById("currency").addEventListener("input", function () {
    const currency = this.value.trim();
    if (!currency) {
        document.getElementById("currencyError").textContent = "Please Select Currency.";
    }else{
        document.getElementById("currencyError").textContent =" ";
    }
});
document.getElementById("forimage").addEventListener("blur", function () {
    const image = this.value.trim();
    if (!image) {
        document.getElementById("fileError").textContent = "Please upload Image.";
    }else{
        document.getElementById("fileError").textContent =" ";
    }
});


// Retrieve data from localStorage
const updateData = JSON.parse(localStorage.getItem('edit_table'));
// Check if updateData is not null
if (updateData) {
    let forms = JSON.parse(localStorage.getItem('products'));
    let edit_id = localStorage.getItem('edit_id');
    // Set initial values of form fields
    document.getElementById("name").value = updateData.name;
    document.getElementById("price").value = updateData.price;
    document.getElementById("color").value = updateData.color;
    document.getElementById("gender").value = updateData.gender;
    document.getElementById("currency").value = updateData.currency;
    document.getElementById("quantity").value = updateData.quantity;
    // document.getElementById("forimage").src = updateData.forimage;
    document.getElementById("forimage").setAttribute("src", updateData.image);

}
// Submit form
document.getElementById("adminForm").addEventListener("submit", function (event) {
    event.preventDefault();
    // Get updated values of form fields
    const updatedName = document.getElementById("name").value;
    const updatedPrice = document.getElementById("price").value;
    const updatedColor = document.getElementById("color").value;
    const updatedGender = document.getElementById("gender").value;
    const updatedCurrency = document.getElementById("currency").value;
    const updatedQuantity = document.getElementById("quantity").value;
    const updateDataImage = document.getElementById("forimage").src; 

    //   Get the current ID from the updateData object
const id = updateData ? updateData.id : generateUniqueID();

   // Update data in localStorage
const updatedData = {
    id,
    name: updatedName,
    price: updatedPrice,
    color: updatedColor,
    gender: updatedGender,
    currency: updatedCurrency,
    quantity: updatedQuantity,
    image: updateDataImage
};
});
// save the form data to local storage
function saveData(id) {
    const reader = new FileReader();
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const color = document.getElementById("color").value;
    const gender = document.getElementById("gender").value;
    const currency = document.getElementById("currency").value;
    const quantity = document.getElementById("quantity").value;
    const image = document.getElementById("forimage").files[0];
    const localStorageProducts = JSON.parse(localStorage.getItem("products"));

    reader.addEventListener("load", function () {
        const formData = {
            id,
            name,
            price,
            color,
            gender,
            currency,
            quantity,
            image: image ? reader.result : null // convert the image file to a URL
        };
        if (localStorage.getItem('edit_id')) {
            let forms = JSON.parse(localStorage.getItem('products') || '[]');
            forms[localStorage.getItem('edit_id')] = formData;
            localStorage.setItem("products", JSON.stringify(forms)); // store the updated array in localStorage
            localStorage.removeItem('edit_id');
            localStorage.removeItem('edit_table');
            document.getElementById("adminForm").reset();
        }else {
            let forms = JSON.parse(localStorage.getItem('products') || '[]'); // get existing forms or initialize empty array
            forms.unshift(formData); // add the new form data to the beginning of the array
            localStorage.setItem("products", JSON.stringify(forms)); // store the updated array in localStorage
            document.getElementById("adminForm").reset(); // clear the form fields
        }
        alert("Product is saved");
        localStorage.removeItem('edit_id');
    }, false);
    if (image) {reader.readAsDataURL(image);}
}





