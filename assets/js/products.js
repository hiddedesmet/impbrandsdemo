// Products data - In a real application, this would come from an API
const products = [
    {
        id: 1,
        name: "NEW BLU 2.0",
        description: "The latest in vape technology for flexible control of your puffs, flavour intensity and battery life.",
        price: 9.99,
        image: "assets/images/imp1.png",
        rating: 5,
        reviewCount: 127,
        inStock: true,
        isNew: true
    },
    {
        id: 2,
        name: "BLU 2.0 STARTER KIT",
        description: "Complete starter kit with device, charger and two flavour pods.",
        price: 19.99,
        image: "assets/images/imp2.avif",
        rating: 4.8,
        reviewCount: 89,
        inStock: true,
        isNew: false
    },
    {
        id: 3,
        name: "BLU 2.0 PREMIUM",
        description: "Premium version with extended battery life and premium materials.",
        price: 24.99,
        image: "assets/images/imp3.avif",
        rating: 4.9,
        reviewCount: 156,
        inStock: true,
        isNew: false
    },
    {
        id: 4,
        name: "BLU 2.0 COMPACT",
        description: "Compact and portable design perfect for on-the-go vaping.",
        price: 14.99,
        image: "assets/images/imp1.png",
        rating: 4.7,
        reviewCount: 73,
        inStock: false,
        isNew: false
    },
    {
        id: 5,
        name: "BLU 2.0 PRO",
        description: "Professional grade device with advanced temperature control.",
        price: 29.99,
        image: "assets/images/imp2.avif",
        rating: 5,
        reviewCount: 201,
        inStock: true,
        isNew: true
    },
    {
        id: 6,
        name: "BLU 2.0 CLASSIC",
        description: "Classic design with reliable performance and authentic flavours.",
        price: 12.99,
        image: "assets/images/imp3.avif",
        rating: 4.6,
        reviewCount: 94,
        inStock: true,
        isNew: false
    }
];

// DOM elements
let productsGrid;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    productsGrid = document.getElementById('productsGrid');
    
    if (productsGrid) {
        renderProducts();
    }
    
    // Initialize cart count from existing script
    if (typeof updateCartCount === 'function') {
        updateCartCount();
    }
});

// Render products grid
function renderProducts() {
    if (!productsGrid) return;
    
    // Show loading state
    productsGrid.innerHTML = `
        <div class="products-loading">
            <div class="loading-spinner"></div>
            <p>Loading products...</p>
        </div>
    `;
    
    // Simulate loading delay (in real app, this would be an API call)
    setTimeout(() => {
        if (products.length === 0) {
            renderEmptyState();
        } else {
            renderProductCards();
        }
    }, 500);
}

// Render empty state
function renderEmptyState() {
    productsGrid.innerHTML = `
        <div class="products-empty">
            <h3>No products available</h3>
            <p>Please check back later for new products.</p>
        </div>
    `;
}

// Render product cards
function renderProductCards() {
    const productsHTML = products.map(product => createProductCard(product)).join('');
    productsGrid.innerHTML = productsHTML;
}

// Create individual product card
function createProductCard(product) {
    const starsHTML = generateStars(product.rating);
    const stockClass = product.inStock ? '' : 'out-of-stock';
    const addToCartText = product.inStock ? 'ADD TO CART' : 'OUT OF STOCK';
    const addToCartDisabled = product.inStock ? '' : 'disabled';
    
    return `
        <div class="product-card ${stockClass}" data-product-id="${product.id}">
            <div class="product-image" onclick="navigateToProduct(${product.id})">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-name" onclick="navigateToProduct(${product.id})">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">
                    <span class="stars">${starsHTML}</span>
                    <span class="rating-count">(${product.reviewCount})</span>
                </div>
                <div class="product-price">£${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    <button class="add-to-cart" onclick="addProductToCart(${product.id})" ${addToCartDisabled}>
                        ${addToCartText}
                    </button>
                    <button class="view-details" onclick="navigateToProduct(${product.id})">
                        VIEW DETAILS
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '★';
    }
    
    // Half star
    if (hasHalfStar) {
        starsHTML += '☆';
    }
    
    // Empty stars to make it 5 total
    const totalStars = hasHalfStar ? fullStars + 1 : fullStars;
    for (let i = totalStars; i < 5; i++) {
        starsHTML += '☆';
    }
    
    return starsHTML;
}

// Navigate to product detail page
function navigateToProduct(productId) {
    // In this demo, we'll navigate to the main product page
    // In a real application, you would pass the product ID as a parameter
    window.location.href = 'index.html?product=' + productId;
}

// Add product to cart
function addProductToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!product || !product.inStock) {
        showNotification('This product is currently out of stock.');
        return;
    }
    
    // Check if addToCart function exists from main script
    if (typeof addToCart === 'function') {
        // Use existing cart functionality but with product data
        addProductToCartWithData(product);
    } else {
        // Fallback cart functionality
        addToSimpleCart(product);
    }
}

// Add product to cart with existing cart system
function addProductToCartWithData(product) {
    // Get or initialize cart
    let cart = JSON.parse(localStorage.getItem('bluCart')) || [];
    
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => item.name === product.name);
    
    if (existingItemIndex > -1) {
        // Update existing item quantity
        cart[existingItemIndex].quantity += 1;
        cart[existingItemIndex].total = cart[existingItemIndex].price * cart[existingItemIndex].quantity;
    } else {
        // Add new item to cart
        const cartItem = {
            id: Date.now(),
            name: product.name,
            quantity: 1,
            price: product.price,
            total: product.price,
            image: product.image
        };
        cart.push(cartItem);
    }
    
    // Save cart
    localStorage.setItem('bluCart', JSON.stringify(cart));
    
    // Update cart count if function exists
    if (typeof updateCartCount === 'function') {
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
            if (cartCount > 0) {
                cartCountElement.style.display = 'inline-block';
            }
        }
    }
    
    // Show notification if function exists
    if (typeof showNotification === 'function') {
        showNotification(`${product.name} added to cart!`);
    } else {
        alert(`${product.name} added to cart!`);
    }
}

// Simple cart fallback
function addToSimpleCart(product) {
    let cart = JSON.parse(localStorage.getItem('simpleCart')) || [];
    cart.push(product);
    localStorage.setItem('simpleCart', JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
}

// Search functionality (if search button exists)
document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            if (typeof showNotification === 'function') {
                showNotification('Search functionality coming soon!');
            } else {
                alert('Search functionality coming soon!');
            }
        });
    }
    
    const userBtn = document.querySelector('.user-btn');
    if (userBtn) {
        userBtn.addEventListener('click', function() {
            if (typeof showNotification === 'function') {
                showNotification('User account features coming soon!');
            } else {
                alert('User account features coming soon!');
            }
        });
    }
    
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', function() {
            const cart = JSON.parse(localStorage.getItem('bluCart')) || [];
            if (cart.length === 0) {
                if (typeof showNotification === 'function') {
                    showNotification('Your cart is empty!');
                } else {
                    alert('Your cart is empty!');
                }
            } else {
                if (typeof showCartModal === 'function') {
                    showCartModal();
                } else {
                    // Navigate to checkout page
                    window.location.href = 'checkout.html';
                }
            }
        });
    }
});