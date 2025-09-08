// Checkout page functionality
let cart = JSON.parse(localStorage.getItem('bluCart')) || [];

// Initialize checkout page
document.addEventListener('DOMContentLoaded', function() {
    loadCartItems();
    updateCartCount();
    updateCartSummary();
    
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', proceedToPayment);
});

// Load cart items into the checkout page
function loadCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty</h3>
                <p>Looks like you haven't added any items to your cart yet.</p>
                <a href="index.html" class="continue-shopping-btn">Continue Shopping</a>
            </div>
        `;
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    
    cart.forEach((item, index) => {
        const itemImage = item.image ? item.image.replace(window.location.origin + '/', '') : 'assets/images/imp1.png';
        
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <img src="${itemImage}" alt="${item.name}" class="item-image">
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-subtitle">New Blu 2.0</div>
                <div class="item-price">£${item.price.toFixed(2)}</div>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateItemQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span class="quantity-display">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateItemQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
            <button class="remove-link" onclick="removeItem(${item.id})">🗑 Remove</button>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
    });
}

// Update item quantity
function updateItemQuantity(itemId, newQuantity) {
    if (newQuantity <= 0) {
        removeItem(itemId);
        return;
    }
    
    const itemIndex = cart.findIndex(item => item.id === itemId);
    if (itemIndex > -1) {
        cart[itemIndex].quantity = newQuantity;
        cart[itemIndex].total = cart[itemIndex].price * newQuantity;
        saveCart();
        loadCartItems();
        updateCartCount();
        updateCartSummary();
    }
}

// Remove item from cart
function removeItem(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    loadCartItems();
    updateCartCount();
    updateCartSummary();
    showNotification('Item removed from cart');
}

// Update cart count in header
function updateCartCount() {
    const cartCountElement = document.getElementById('cartCount');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
        cartCountElement.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// Update cart summary
function updateCartSummary() {
    const cartAmount = document.getElementById('cartAmount');
    const cartTotal = document.getElementById('cartTotal');
    const shippingCost = document.getElementById('shippingCost');
    
    let totalAmount = cart.reduce((total, item) => total + item.total, 0);
    
    // Calculate shipping (one-time purchase only)
    let shipping = 0;
    let shippingText = 'FREE';
    
    if (totalAmount < 25 && totalAmount > 0) {
        shipping = 3.99;
        shippingText = '£3.99';
    } else if (totalAmount >= 25) {
        shippingText = 'FREE';
    } else {
        shippingText = 'Calculated in checkout';
    }
    
    if (cartAmount) cartAmount.textContent = `£${totalAmount.toFixed(2)}`;
    if (shippingCost) shippingCost.textContent = shippingText;
    if (cartTotal) cartTotal.textContent = `£${(totalAmount + shipping).toFixed(2)}`;
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('bluCart', JSON.stringify(cart));
}

// Proceed to payment
function proceedToPayment() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    // Simulate payment processing
    showNotification('Redirecting to secure payment...');
    
    setTimeout(() => {
        alert('Payment processing would happen here. This is a demo.');
    }, 1500);
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #0056b3;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    // Add animation keyframes if not already present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Header functionality
document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            showNotification('Search functionality coming soon!');
        });
    }
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Navigation coming soon!');
        });
    });
});

// Back to shopping
function backToShopping() {
    window.location.href = 'index.html';
}
