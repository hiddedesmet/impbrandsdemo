// Products page functionality
// Relies on existing cart functions from assets/js/script.js
// Uses PRODUCTS and FILTER_OPTIONS from assets/js/products.js

// Active filters state
let activeFilters = {
    brands: [],
    flavors: [],
    nicotineStrengths: [],
    deviceTypes: [],
    priceRanges: []
};

// Filtered products cache
let filteredProducts = [];

// Initialize the products page
function initProductsPage() {
    // Ensure cart count is displayed
    updateCartCount();
    
    // Render filter options
    renderFilters();
    
    // Initial render of all products
    applyFilters();
    
    // Setup event listeners
    setupEventListeners();
    
    console.log('Products page initialized with', PRODUCTS.length, 'products');
}

// Render filter options
function renderFilters() {
    renderBrandFilters();
    renderDeviceTypeFilters();
    renderFlavorFilters();
    renderNicotineFilters();
    renderPriceFilters();
}

function renderBrandFilters() {
    const container = document.getElementById('brandFilters');
    container.innerHTML = FILTER_OPTIONS.brands.map(brand => `
        <div class="filter-option">
            <input type="checkbox" id="brand-${brand}" value="${brand}" onchange="toggleFilter('brands', '${brand}')">
            <label for="brand-${brand}">${brand}</label>
        </div>
    `).join('');
}

function renderDeviceTypeFilters() {
    const container = document.getElementById('deviceTypeFilters');
    container.innerHTML = FILTER_OPTIONS.deviceTypes.map(type => `
        <div class="filter-option">
            <input type="checkbox" id="deviceType-${type}" value="${type}" onchange="toggleFilter('deviceTypes', '${type}')">
            <label for="deviceType-${type}">${type}</label>
        </div>
    `).join('');
}

function renderFlavorFilters() {
    const container = document.getElementById('flavorFilters');
    container.innerHTML = FILTER_OPTIONS.flavors.map(flavor => `
        <div class="filter-option">
            <input type="checkbox" id="flavor-${flavor}" value="${flavor}" onchange="toggleFilter('flavors', '${flavor}')">
            <label for="flavor-${flavor}">${flavor}</label>
        </div>
    `).join('');
}

function renderNicotineFilters() {
    const container = document.getElementById('nicotineFilters');
    container.innerHTML = FILTER_OPTIONS.nicotineStrengths.map(strength => `
        <div class="filter-option">
            <input type="checkbox" id="nicotine-${strength}" value="${strength}" onchange="toggleFilter('nicotineStrengths', '${strength}')">
            <label for="nicotine-${strength}">${strength}</label>
        </div>
    `).join('');
}

function renderPriceFilters() {
    const container = document.getElementById('priceFilters');
    container.innerHTML = FILTER_OPTIONS.priceRanges.map((range, index) => `
        <div class="filter-option">
            <input type="checkbox" id="price-${index}" value="${index}" onchange="togglePriceFilter(${index})">
            <label for="price-${index}">${range.label}</label>
        </div>
    `).join('');
}

// Toggle filter function
function toggleFilter(category, value) {
    const filterArray = activeFilters[category];
    const index = filterArray.indexOf(value);
    
    if (index > -1) {
        filterArray.splice(index, 1);
    } else {
        filterArray.push(value);
    }
    
    applyFilters();
    updateFilterUI();
}

// Toggle price filter (special handling for range objects)
function togglePriceFilter(rangeIndex) {
    const range = FILTER_OPTIONS.priceRanges[rangeIndex];
    const existingIndex = activeFilters.priceRanges.findIndex(r => r.min === range.min && r.max === range.max);
    
    if (existingIndex > -1) {
        activeFilters.priceRanges.splice(existingIndex, 1);
    } else {
        activeFilters.priceRanges.push(range);
    }
    
    applyFilters();
    updateFilterUI();
}

// Apply filters and update display
function applyFilters() {
    filteredProducts = PRODUCTS.filter(product => {
        // Brand filter
        if (activeFilters.brands.length > 0 && !activeFilters.brands.includes(product.brand)) {
            return false;
        }
        
        // Device type filter
        if (activeFilters.deviceTypes.length > 0 && !activeFilters.deviceTypes.includes(product.deviceType)) {
            return false;
        }
        
        // Flavor filter
        if (activeFilters.flavors.length > 0 && !activeFilters.flavors.includes(product.flavor)) {
            return false;
        }
        
        // Nicotine strength filter
        if (activeFilters.nicotineStrengths.length > 0 && !activeFilters.nicotineStrengths.includes(product.nicotineStrength)) {
            return false;
        }
        
        // Price range filter
        if (activeFilters.priceRanges.length > 0) {
            const matchesPrice = activeFilters.priceRanges.some(range => 
                product.price >= range.min && product.price < range.max
            );
            if (!matchesPrice) {
                return false;
            }
        }
        
        return true;
    });
    
    renderProducts();
    updateResultsCount();
}

// Render products grid
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const emptyState = document.getElementById('emptyState');
    
    if (filteredProducts.length === 0) {
        grid.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    grid.style.display = 'grid';
    emptyState.style.display = 'none';
    
    grid.innerHTML = filteredProducts.map(product => {
        const stockBadgeClass = product.stockLevel === 'high' ? 'in-stock' : 
                               product.stockLevel === 'low' ? 'low-stock' : 'out-of-stock';
        const stockBadgeText = product.inStock ? 
                              (product.stockLevel === 'low' ? 'Low Stock' : 'In Stock') : 
                              'Out of Stock';
        
        return `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <div class="stock-badge ${stockBadgeClass}">${stockBadgeText}</div>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-attributes">
                        <span class="product-attribute">${product.deviceType}</span>
                        <span class="product-attribute">${product.flavor}</span>
                        <span class="product-attribute">${product.nicotineStrength}</span>
                    </div>
                    <div class="product-price">£${product.price.toFixed(2)}</div>
                    <div class="product-actions">
                        <button 
                            class="add-to-cart-product-btn" 
                            onclick="addProductToCart(${product.id})"
                            ${!product.inStock ? 'disabled' : ''}
                        >
                            ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Add product to cart from products page
function addProductToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product || !product.inStock) {
        showNotification('Product is not available');
        return;
    }
    
    // Use existing cart system - simulate the structure expected by addToCart
    // We need to temporarily set up the DOM elements that addToCart expects
    const tempQuantityInput = document.createElement('input');
    tempQuantityInput.id = 'quantity';
    tempQuantityInput.value = '1';
    document.body.appendChild(tempQuantityInput);
    
    const tempTitle = document.createElement('div');
    tempTitle.className = 'product-title';
    tempTitle.textContent = product.name;
    document.body.appendChild(tempTitle);
    
    const tempPrice = document.createElement('div');
    tempPrice.className = 'price';
    tempPrice.textContent = `£${product.price}`;
    document.body.appendChild(tempPrice);
    
    const tempImage = document.createElement('img');
    tempImage.id = 'mainProductImage';
    tempImage.src = product.image;
    document.body.appendChild(tempImage);
    
    // Call existing addToCart function
    addToCart();
    
    // Clean up temporary elements
    document.body.removeChild(tempQuantityInput);
    document.body.removeChild(tempTitle);
    document.body.removeChild(tempPrice);
    document.body.removeChild(tempImage);
}

// Update results count
function updateResultsCount() {
    const count = filteredProducts.length;
    const countElement = document.getElementById('resultsCount');
    countElement.textContent = `${count} product${count !== 1 ? 's' : ''}`;
}

// Update filter UI to show active states
function updateFilterUI() {
    // Update checkboxes to reflect active filters
    document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(checkbox => {
        const filterOption = checkbox.closest('.filter-option');
        if (checkbox.checked) {
            filterOption.classList.add('active');
        } else {
            filterOption.classList.remove('active');
        }
    });
}

// Clear all filters
function clearAllFilters() {
    activeFilters = {
        brands: [],
        flavors: [],
        nicotineStrengths: [],
        deviceTypes: [],
        priceRanges: []
    };
    
    // Uncheck all checkboxes
    document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
        checkbox.closest('.filter-option').classList.remove('active');
    });
    
    applyFilters();
}

// Setup event listeners
function setupEventListeners() {
    // Clear filters buttons
    document.querySelectorAll('.clear-filters-btn').forEach(btn => {
        btn.addEventListener('click', clearAllFilters);
    });
    
    // Mobile filters toggle
    const mobileFiltersBtn = document.getElementById('mobileFiltersBtn');
    const filtersSidebar = document.getElementById('filtersSidebar');
    const filtersToggle = document.getElementById('filtersToggle');
    
    mobileFiltersBtn.addEventListener('click', () => {
        filtersSidebar.classList.toggle('active');
    });
    
    filtersToggle.addEventListener('click', () => {
        filtersSidebar.classList.remove('active');
    });
    
    // Close filters when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            filtersSidebar.classList.contains('active') && 
            !filtersSidebar.contains(e.target) && 
            !mobileFiltersBtn.contains(e.target)) {
            filtersSidebar.classList.remove('active');
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            filtersSidebar.classList.remove('active');
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure all scripts are loaded
    setTimeout(initProductsPage, 100);
});

// Export functions for global access
window.toggleFilter = toggleFilter;
window.togglePriceFilter = togglePriceFilter;
window.addProductToCart = addProductToCart;
window.clearAllFilters = clearAllFilters;