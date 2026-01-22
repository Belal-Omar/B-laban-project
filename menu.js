// Function to open the popup
function openPopup(id) {
  document.querySelector('.overlay').style.display = 'block';
  document.getElementById(id).style.display = 'block';
}

// Function to close the popup
function closePopup() {
  document.querySelector('.overlay').style.display = 'none';
  const popups = document.querySelectorAll('.popup');
  popups.forEach(popup => popup.style.display = 'none');
}

// Function to handle the order submission
function submitOrder(event, itemName, itemPrice) {
  event.preventDefault(); // Prevent form from submitting the default way
  const form = event.target;
  const topping = form.querySelector('input[type="radio"]:checked');
  
  if (topping) {
      const selectedTopping = topping.value;

      // Create the product object with item name, topping, and price
      const product = {
          itemName: itemName,
          topping: selectedTopping,
          price: itemPrice, // Store the price as well
      };
      
      // Retrieve the cart from localStorage, or initialize an empty array
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      
      // Add the new product to the cart
      cart.push(product);
      
      // Save the updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));

      // Notify the user that the order was placed
      alert("Order placed successfully ✅ for " + itemName + " with: " + selectedTopping + " for $" + itemPrice + ".\n\n" );

      // Reset the form and close the popup
      form.reset();
      closePopup();
     } 
  else {
      alert("Please select a topping.");
  }
}
