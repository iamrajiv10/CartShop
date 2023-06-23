

 // js code for adding data in the table
 const forms = JSON.parse(localStorage.getItem("products") || "[]");
 const formDataEl = document.getElementById("formData");

 forms.forEach((form, index) => {
     const row = formDataEl.insertRow(-1);
     const serialNumberCell = row.insertCell(0);
     const nameCell = row.insertCell(1);
     const genderCell = row.insertCell(2);
     const priceCell = row.insertCell(3);
     const currencyCell = row.insertCell(4);
     const quantityCell = row.insertCell(5);
     const imageCell = row.insertCell(6);
     const colorCell = row.insertCell(7);
     const actionCell = row.insertCell(8);

     serialNumberCell.textContent = index + 1;
     nameCell.textContent = form.name;
     genderCell.textContent = form.gender;
     priceCell.textContent = form.price;
     currencyCell.textContent = form.currency;
     quantityCell.textContent = form.quantity;
     colorCell.textContent = form.color;
     
     
     if (form.image) {
         const image = document.createElement("img");
         image.src = form.image; // set the src attribute to the path of the uploaded image
         image.classList.add("img-thumbnail");
         image.width = 120; // set the width 
         image.height= 200; // set the height 
         imageCell.appendChild(image);
     } else {
         imageCell.textContent = "Image not Available";
     }

     //Adding edit  button in Action column
     const editBtn = document.createElement("button");
     editBtn.classList.add("updtbtn");
     editBtn.addEventListener("click", () => editRow(index, row));
     actionCell.appendChild(editBtn);
     //Adding delete button in Action column
     const deleteBtn = document.createElement("button");
     deleteBtn.classList.add("dltbtn");
     // deleteBtn.textContent = "Delete";
     deleteBtn.addEventListener("click", () => deleteRow(index, row));
     actionCell.appendChild(deleteBtn);

     
 });

 function editRow(index, row) {
     // add edit functionality here
     localStorage.setItem('edit_table', JSON.stringify(forms[index]));
     localStorage.setItem('edit_id', index);
     window.location.href="AdminPage.html";
 }



function deleteRow(index, row) {
 // get the name of the item to be deleted
 const name = forms[index].name;
 // remove the row from the table
 row.remove();

 // remove the form data from local storage
 forms.splice(index, 1);
 localStorage.setItem("products", JSON.stringify(forms));

 // remove the item from cart data
 const cart = JSON.parse(localStorage.getItem("cart") || "{}");
 delete cart[name];
 localStorage.setItem("cart", JSON.stringify(cart));

 // update the serial numbers in the first column of each row
 const rows = formDataEl.rows;
 for (let i = 1; i < rows.length; i++) {
     const cell = rows[i].cells[0];
     cell.textContent = i;
 }
}

 const admin = document.getElementById('admin');
 // added click event listeners to the buttons to move to Admin Page
   admin.addEventListener('click', () => {
   window.location.href = 'AdminPage.html';
 });