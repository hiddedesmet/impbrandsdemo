# Blu 2.0 Product Detail Page

A professional product detail page for the Blu 2.0 vaping device, built with vanilla HTML, CSS, and JavaScript. Features a complete shopping cart system and responsive design matching the official Blu website.

## 🚀 Features

- **Professional Design**: Matches official Blu 2.0 website styling
- **Shopping Cart**: Complete cart functionality with localStorage persistence
- **Product Catalog**: Full "All Products" page with filtering and search
- **Responsive Layout**: Works on desktop, tablet, and mobile devices
- **Interactive Gallery**: Product image thumbnails with switching functionality
- **Product Filters**: Filter by brand, device type, flavor, nicotine strength, and price
- **FAQ Section**: Collapsible frequently asked questions
- **Age Verification**: 18+ age verification notices
- **Product Guarantees**: Money back guarantee, free shipping, returns

## 📁 Project Structure

```
impbrandsdemo/
├── index.html                 # Main HTML file
├── all-products.html          # Products catalog page
├── checkout.html              # Checkout page
├── README.md                  # Project documentation
├── assets/                    # Static assets
│   ├── css/
│   │   ├── styles.css         # Main stylesheet
│   │   ├── products.css       # Products page styles
│   │   └── checkout.css       # Checkout page styles
│   ├── js/
│   │   ├── script.js          # Core cart functionality
│   │   ├── products.js        # Product dataset
│   │   ├── products-page.js   # Products page logic
│   │   └── checkout.js        # Checkout functionality
│   └── images/                # Product images
│       ├── imp1.png           # Main product image
│       ├── imp2.avif          # Product thumbnail 1
│       ├── imp3.avif          # Product thumbnail 2
│       ├── imp4.avif          # Related product 1
│       ├── imp5.avif          # Related product 2
│       ├── imp6.jpg           # Logo
│       ├── ES PDP One time D.png
│       ├── ES PDP One time M.png
│       ├── ES PDP Subscription D.png
│       └── ES PDP Subscription M.png
└── docs/                      # Documentation
    ├── vaper-webshop-backlog.md
    ├── vaper-webshop-prd.md
    └── view-all-products-prd.md
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and accessibility
- **CSS3**: Flexbox, Grid, animations, and responsive design
- **Vanilla JavaScript**: Cart functionality, DOM manipulation, localStorage
- **Inter Font**: Google Fonts for professional typography

## 🎯 Key Components

### Shopping Cart
- Add/remove items with quantity management
- Persistent storage using localStorage
- Real-time price calculations
- Professional sidebar design
- Item thumbnails and details

### Product Catalog
- Complete "All Products" page displaying 12 rechargeable vape products
- Real-time filtering by brand, device type, flavor, nicotine strength, and price
- Responsive grid layout (1-4 columns based on screen size)
- Stock status indicators (In Stock, Low Stock, Out of Stock)
- Integration with existing cart system

### Product Gallery
- Main product image with thumbnail navigation
- Smooth transitions between images
- Responsive image sizing

### Interactive Elements
- FAQ accordion sections
- Quantity selectors
- Cart notifications
- Hover effects and animations
- Filter controls with real-time updates

## 🚀 How to Run

1. **Using VS Code Live Server (Recommended)**:
   - Install the "Live Server" extension in VS Code
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - The site will open automatically in your browser

2. **Using Python HTTP Server**:
   ```bash
   # Navigate to project directory
   cd /path/to/impbrandsdemo
   
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```
   Then open `http://localhost:8000` in your browser

3. **Using Node.js HTTP Server**:
   ```bash
   # Install http-server globally
   npm install -g http-server
   
   # Navigate to project directory and start server
   cd /path/to/impbrandsdemo
   http-server
   ```

## 🎨 Design Features

- **Official Blu Branding**: Authentic colors, fonts, and layout
- **Professional Typography**: Inter font family throughout
- **Responsive Grid System**: Works on all screen sizes
- **Smooth Animations**: Cart slide-ins, hover effects
- **Accessibility**: Proper ARIA labels and semantic HTML

## 🛒 Cart Functionality

- **Persistent Storage**: Cart survives page refreshes
- **Smart Quantity Management**: Prevents duplicates, updates existing items
- **Professional UI**: Matches official e-commerce standards
- **Real-time Updates**: Instant price calculations and count updates
- **Error Prevention**: Handles edge cases and invalid inputs

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Development

The project uses a clean, organized structure:
- All styles are in `assets/css/` (main styles, products page, checkout)
- All JavaScript is in `assets/js/` (core cart, products data, page logic)
- Product data is managed in `assets/js/products.js` for easy extension
- Images are organized in `assets/images/`
- HTML pages remain in the root for easy serving

### Adding New Products

To add new products to the catalog, edit `assets/js/products.js` and add entries to the `PRODUCTS` array following this structure:

```javascript
{
    id: unique_number,
    name: "Product Name",
    price: 9.99,
    image: "assets/images/product.jpg",
    brand: "Blu",
    flavor: "Flavor Name",
    nicotineStrength: "18mg",
    deviceType: "Device|Pod|Kit",
    description: "Product description",
    inStock: true,
    stockLevel: "high|low|out"
}
```

## 📄 License

This project is for demonstration purposes. Blu is a trademark of its respective owners.
