
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


        if (!name) {alert('please input your product Name'); return false;
        }
        else if (!price) {alert('please input your product Price'); return false;
        }
        else if (!color) {alert('please select your Product Color'); return false;
        }
        else if (!gender) {alert('please choose Your Product Gender'); return false;
        }
        else if (!currency) {alert('please Choose Currency Type'); return false;
        }
        else if (!quantity) {alert('please Input Quantity Of Product'); return false;
        }
        else if (!image) {alert('please Upload Image of The product'); return false;
        }
        // generate a unique id for the product
        var id = generateUniqueID();
        // Add name to list of submitted names
        submittedNames.push(name);
        saveData(id);
        return true;
    }
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
        document.getElementById("forimage").value = updateData.forimage;
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
        const updateDataImage = document.getElementById("forimage").value

        // Update data in localStorage
        if (updateData) {
            updateData.name = updatedName;
            updateData.price = updatedPrice;
            updateData.color = updatedColor;
            updateData.gender = updatedGender;
            updateData.currency = updatedCurrency;
            updateData.quantity = updatedQuantity;
            updateData.forimage = updateDataImage;
            localStorage.setItem('edit_table', JSON.stringify(updateData));
        }
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
        const localStorageProducts = JSON.parse(localStorage.getItem("products"))

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
            alert("Item is saved");
            localStorage.removeItem('edit_id');
        }, false);
        if (image) {reader.readAsDataURL(image);}
    }
