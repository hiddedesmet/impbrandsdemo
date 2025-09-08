// Cart functionality
let cart = JSON.parse(localStorage.getItem('bluCart')) || [];
let cartCount = cart.reduce((total, item) => total + item.quantity, 0);

// Update cart count display
function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
        // Show/hide cart count badge
        if (cartCount > 0) {
            cartCountElement.style.display = 'inline-block';
        } else {
            cartCountElement.style.display = 'none';
        }
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('bluCart', JSON.stringify(cart));
}

// Change quantity
function changeQuantity(delta) {
    const quantityInput = document.getElementById('quantity');
    let currentValue = parseInt(quantityInput.value);
    let newValue = currentValue + delta;
    
    if (newValue >= 1) {
        quantityInput.value = newValue;
    }
}

// Add to cart functionality
function addToCart() {
    const quantity = parseInt(document.getElementById('quantity').value);
    const productTitle = document.querySelector('.product-title').textContent;
    const productPrice = parseFloat(document.querySelector('.price').textContent.replace('£', ''));
    const productImage = document.getElementById('mainProductImage').src;
    
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => item.name === productTitle);
    
    if (existingItemIndex > -1) {
        // Update existing item quantity
        cart[existingItemIndex].quantity += quantity;
        cart[existingItemIndex].total = cart[existingItemIndex].price * cart[existingItemIndex].quantity;
    } else {
        // Add new item to cart
        const cartItem = {
            id: Date.now(),
            name: productTitle,
            quantity: quantity,
            price: productPrice,
            total: productPrice * quantity,
            image: productImage
        };
        cart.push(cartItem);
    }
    
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    updateCartCount();
    saveCart();
    
    // Show success message
    showNotification(`${quantity} x ${productTitle} added to cart!`);
    
    console.log('Cart:', cart);
}

// Remove item from cart
function removeFromCart(itemId) {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    if (itemIndex > -1) {
        cart.splice(itemIndex, 1);
        cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        updateCartCount();
        saveCart();
        showCartModal(); // Refresh cart modal
        showNotification('Item removed from cart');
    }
}

// Update item quantity in cart
function updateCartItemQuantity(itemId, newQuantity) {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    if (itemIndex > -1) {
        if (newQuantity <= 0) {
            removeFromCart(itemId);
        } else {
            cart[itemIndex].quantity = newQuantity;
            cart[itemIndex].total = cart[itemIndex].price * newQuantity;
            cartCount = cart.reduce((total, item) => total + item.quantity, 0);
            updateCartCount();
            saveCart();
            showCartModal(); // Refresh cart modal
        }
    }
}

// Clear entire cart
function clearCart() {
    cart = [];
    cartCount = 0;
    updateCartCount();
    saveCart();
    closeCartModal();
    showNotification('Cart cleared');
}
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #00bfff;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    // Add animation keyframes
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

// Nicotine option selection (removed - not applicable for device)
document.addEventListener('DOMContentLoaded', function() {
    // Thumbnail image functionality
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainProductImage');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            this.classList.add('active');
            
            // Update main image
            const imageUrls = [
                'imp1.png',
                'imp2.avif',
                'imp3.avif'
            ];
            
            const index = Array.from(thumbnails).indexOf(this);
            mainImage.src = imageUrls[index];
        });
    });
    
    // Initialize cart count on page load
    updateCartCount();
});

// FAQ functionality
function toggleFAQ(element) {
    const faqItem = element.parentNode;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Search functionality (placeholder)
document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.querySelector('.search-btn');
    
    searchBtn.addEventListener('click', function() {
        showNotification('Search functionality coming soon!');
    });
    
    const userBtn = document.querySelector('.user-btn');
    
    userBtn.addEventListener('click', function() {
        showNotification('User account features coming soon!');
    });
    
    const cartBtn = document.querySelector('.cart-btn');
    
    cartBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            showNotification('Your cart is empty!');
        } else {
            showCartModal();
        }
    });
});

// Cart modal functionality
function showCartModal() {
    // Create modal backdrop
    const backdrop = document.createElement('div');
    backdrop.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 10000;
        display: flex;
        align-items: flex-start;
        justify-content: flex-end;
        padding-top: 0;
    `;
    
    // Create cart sidebar
    const cartSidebar = document.createElement('div');
    cartSidebar.style.cssText = `
        background: white;
        width: 400px;
        height: 100vh;
        overflow-y: auto;
        position: relative;
        box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
        animation: slideInRight 0.3s ease;
    `;
    
    // Add slide animation
    if (!document.querySelector('#cart-animations')) {
        const style = document.createElement('style');
        style.id = 'cart-animations';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); }
                to { transform: translateX(0); }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); }
                to { transform: translateX(100%); }
            }
        `;
        document.head.appendChild(style);
    }
    
    let cartHTML = `
        <div style="padding: 2rem; border-bottom: 1px solid #e2e8f0;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h2 style="margin: 0; color: #1a1a2e; font-size: 1.5rem; font-weight: 600;">CART</h2>
                <button onclick="closeCartModal()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #666;">×</button>
            </div>
        </div>
    `;
    
    if (cart.length === 0) {
        cartHTML += `
            <div style="padding: 2rem; text-align: center;">
                <div style="color: #666; font-size: 1.1rem; margin-bottom: 1rem;">Your cart is empty</div>
                <button onclick="closeCartModal()" style="padding: 0.8rem 2rem; background: #0056b3; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;">
                    Continue Shopping
                </button>
            </div>
        `;
    } else {
        // Free delivery message
        cartHTML += `
            <div style="padding: 1rem 2rem; background: #f8f9fa; border-bottom: 1px solid #e2e8f0;">
                <div style="color: #0056b3; font-size: 0.9rem; font-weight: 500;">
                    🚚 Free delivery on all vape subscription orders and non-subscription orders over £25
                </div>
            </div>
        `;
        
        // Cart items
        cartHTML += '<div style="padding: 1rem 2rem;">';
        
        let totalPrice = 0;
        cart.forEach(item => {
            totalPrice += item.total;
            const itemImage = item.image ? item.image.replace(window.location.origin + '/', '') : 'imp1.png';
            
            cartHTML += `
                <div style="display: flex; align-items: center; padding: 1rem 0; border-bottom: 1px solid #f1f1f1;">
                    <img src="${itemImage}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 6px; margin-right: 1rem;">
                    <div style="flex: 1;">
                        <h4 style="margin: 0 0 0.5rem 0; color: #1a1a2e; font-size: 1rem; font-weight: 600;">${item.name}</h4>
                        <div style="color: #0056b3; font-weight: 600; font-size: 1.1rem;">£${item.price.toFixed(2)}</div>
                        <div style="display: flex; align-items: center; margin-top: 0.5rem;">
                            <button onclick="updateCartItemQuantity(${item.id}, ${item.quantity - 1})" 
                                    style="width: 32px; height: 32px; border: 1px solid #ddd; background: white; cursor: pointer; border-radius: 4px; display: flex; align-items: center; justify-content: center;">
                                -
                            </button>
                            <span style="margin: 0 1rem; font-weight: 500; min-width: 20px; text-align: center;">${item.quantity}</span>
                            <button onclick="updateCartItemQuantity(${item.id}, ${item.quantity + 1})" 
                                    style="width: 32px; height: 32px; border: 1px solid #ddd; background: white; cursor: pointer; border-radius: 4px; display: flex; align-items: center; justify-content: center;">
                                +
                            </button>
                            <button onclick="removeFromCart(${item.id})" 
                                    style="margin-left: auto; color: #666; background: none; border: none; cursor: pointer; text-decoration: underline; font-size: 0.9rem;">
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        cartHTML += '</div>';
        
        // Order summary and checkout
        const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
        cartHTML += `
            <div style="padding: 1rem 2rem; border-top: 1px solid #e2e8f0; margin-top: auto;">
                <div style="margin-bottom: 1rem;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <span>${itemCount} Items</span>
                        <span>£${totalPrice.toFixed(2)}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-weight: 600; font-size: 1.1rem; color: #1a1a2e;">
                        <span>Total</span>
                        <span>£${totalPrice.toFixed(2)}</span>
                    </div>
                </div>
                
                <button onclick="proceedToCheckout()" 
                        style="width: 100%; padding: 1rem; background: #ff9500; color: white; border: none; border-radius: 6px; font-weight: 600; font-size: 1rem; cursor: pointer; margin-bottom: 1rem;">
                    GO TO CART
                </button>
                
                <div style="text-align: center;">
                    <button onclick="clearCart()" 
                            style="background: none; border: none; color: #666; cursor: pointer; text-decoration: underline; font-size: 0.9rem;">
                        Clear Cart
                    </button>
                </div>
                
                <!-- Guarantees -->
                <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                    <div style="display: flex; align-items: center; margin-bottom: 0.8rem; font-size: 0.9rem; color: #666;">
                        <span style="margin-right: 0.5rem;">💰</span>
                        <span>30 day money back guarantee</span>
                    </div>
                    <div style="display: flex; align-items: center; margin-bottom: 0.8rem; font-size: 0.9rem; color: #666;">
                        <span style="margin-right: 0.5rem;">🕐</span>
                        <span>Order before 3 p.m. for same day shipping</span>
                    </div>
                    <div style="display: flex; align-items: center; margin-bottom: 0.8rem; font-size: 0.9rem; color: #666;">
                        <span style="margin-right: 0.5rem;">🚚</span>
                        <span>Free shipping on orders over £25</span>
                    </div>
                    <div style="display: flex; align-items: center; font-size: 0.9rem; color: #666;">
                        <span style="margin-right: 0.5rem;">↩️</span>
                        <span>Free returns</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    cartSidebar.innerHTML = cartHTML;
    backdrop.appendChild(cartSidebar);
    document.body.appendChild(backdrop);
    
    // Close on backdrop click
    backdrop.addEventListener('click', function(e) {
        if (e.target === backdrop) {
            closeCartModal();
        }
    });
    
    // Store reference for closing
    window.currentCartModal = backdrop;
}

function closeCartModal() {
    if (window.currentCartModal && window.currentCartModal.parentNode) {
        const cartSidebar = window.currentCartModal.querySelector('div');
        cartSidebar.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (window.currentCartModal.parentNode) {
                window.currentCartModal.parentNode.removeChild(window.currentCartModal);
            }
            window.currentCartModal = null;
        }, 300);
    }
}

function proceedToCheckout() {
    closeCartModal();
    showNotification('Redirecting to checkout... (Age verification required)');
    
    // Simulate checkout redirect
    setTimeout(() => {
        showNotification('Checkout functionality coming soon!');
    }, 2000);
}
