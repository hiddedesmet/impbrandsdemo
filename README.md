# Blu 2.0 Product Detail Page

A professional product detail page for the Blu 2.0 vaping device, built with vanilla HTML, CSS, and JavaScript. Features a complete shopping cart system and responsive design matching the official Blu website.

## 🚀 Features

- **Professional Design**: Matches official Blu 2.0 website styling
- **Shopping Cart**: Complete cart functionality with localStorage persistence
- **Responsive Layout**: Works on desktop, tablet, and mobile devices
- **Interactive Gallery**: Product image thumbnails with switching functionality
- **FAQ Section**: Collapsible frequently asked questions
- **Age Verification**: 18+ age verification notices
- **Product Guarantees**: Money back guarantee, free shipping, returns

## 📁 Project Structure

```
impbrandsdemo/
├── index.html                 # Main HTML file
├── README.md                  # Project documentation
├── assets/                    # Static assets
│   ├── css/
│   │   └── styles.css         # Main stylesheet
│   ├── js/
│   │   └── script.js          # JavaScript functionality
│   └── images/                # Product images
│       ├── imp1.png           # Main product image
│       ├── imp2.avif          # Product thumbnail 1
│       ├── imp3.avif          # Product thumbnail 2
│       ├── imp4.avif          # Related product 1
│       ├── imp5.avif          # Related product 2
│       ├── ES PDP One time D.png
│       ├── ES PDP One time M.png
│       ├── ES PDP Subscription D.png
│       └── ES PDP Subscription M.png
└── docs/                      # Documentation
    ├── vaper-webshop-backlog.md
    └── vaper-webshop-prd.md
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

### Product Gallery
- Main product image with thumbnail navigation
- Smooth transitions between images
- Responsive image sizing

### Interactive Elements
- FAQ accordion sections
- Quantity selectors
- Cart notifications
- Hover effects and animations

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
- All styles are in `assets/css/styles.css`
- All JavaScript is in `assets/js/script.js`
- Images are organized in `assets/images/`
- HTML remains in the root for easy serving

## 📄 License

This project is for demonstration purposes. Blu is a trademark of its respective owners.
