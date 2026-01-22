document.addEventListener('DOMContentLoaded', function () {
    displayCartItems();
});

function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceContainer = document.getElementById('total-price');

    cartItemsContainer.innerHTML = ''; // Clear existing items
    let total = 0;

    cart.forEach((product, index) => {
        const quantity = product.quantity || 1;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.itemName}</td>
            <td>${product.topping}</td>
            <td>
                <input type="number" value="${quantity}" min="1" id="quantity-${index}" onchange="updateQuantity(${index})">
            </td>
            <td id="total-${index}">${(product.price * quantity).toFixed(2)}</td>
        `;

        cartItemsContainer.appendChild(row);
        total += product.price * quantity;
    });

    totalPriceContainer.textContent = total.toFixed(2);
}



function updateQuantity(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const quantity = parseInt(document.getElementById(`quantity-${index}`).value);
    const product = cart[index];

    if (product) {
        product.quantity = quantity; // Store updated quantity
        localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart
        const price = product.price * quantity;
        document.getElementById(`total-${index}`).textContent = price.toFixed(2);
        updateCartTotal();
    }
}

function updateCartTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    cart.forEach((product, index) => {
        const quantity = product.quantity || 1;
        total += product.price * quantity;
    });

    document.getElementById('total-price').textContent = total.toFixed(2);
}

function clearCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        alert('Your cart is already empty!');
        return;
    }

    if (confirm('Are you sure you want to clear your cart?')) {
        localStorage.removeItem('cart');
        displayCartItems();
    }
}

function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        alert('Your cart is empty! Please add items before checking out.');
        return;
    }

    alert('Proceeding to checkout!');
    // Implement checkout logic here
}

function continueShopping() {
    window.location.href = 'menu.html'; // Adjust if your menu page is named differently
}
