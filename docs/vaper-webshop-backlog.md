## Backlog Issue: Implement “View All Products” Page for Rechargeable Vapes

### Description
Create a “View All Products” page that displays all rechargeable vape products in a visually engaging, filterable, and shoppable grid, closely matching the user experience and features of https://www.blu.com/en-GB/all-rechargeables-vapes. See `view-all-products-prd.md` for full requirements.

### Actions
- Create a sample dataset for rechargeable vape products (with brand, flavor, price, nicotine strength, device type, image, etc.)
- Implement a new HTML page (e.g., `all-products.html`) with a grid layout for products
- Add filters for brand, flavor, price, nicotine strength, and device type (UI and logic)
- Implement real-time filtering of the product grid
- Add “Add to Cart” buttons for each product (functional, with simulated or real cart integration)
- Style the page to closely match the blu.com reference (modern, professional, responsive)
- Add a link or button from the main page to the new products page
- Ensure accessibility and mobile responsiveness
- Test all features and UI/UX

### Reference
- See `docs/view-all-products-prd.md` for user stories and acceptance criteria
## Vaper Webshop Backlog

This backlog is derived from the Product Requirements Document (PRD) and is prioritized for MVP delivery.

---

### 1. Product Browsing
- Implement homepage with featured/latest products
- Create product listing page with filters (brand, flavor, price)
- Display product cards (image, name, price, short description)
  - **Acceptance:** Homepage and listing page show products with correct info and filters work

### 2. Product Details
- Product detail page with images, description, price, specifications, and stock status
  - **Acceptance:** Clicking a product shows all details and stock status

### 3. Shopping Cart
- Add to Cart button on product pages
- Cart icon with item count
- Cart page to view, update, or remove items
  - **Acceptance:** Users can add, update, and remove items; cart updates in real time

### 4. Checkout & Payment
- Age verification at checkout (date of birth, ID upload, or third-party)
- Shipping and billing info forms
- Payment integration (credit card, PayPal, etc.)
- Order confirmation page and email
  - **Acceptance:** Only verified users can checkout; payment and confirmation work

### 5. User Accounts
- Registration, login, and password reset
- User dashboard with order history
  - **Acceptance:** Users can register, log in, and see past orders

### 6. Admin Product Management
- Admin dashboard for products (add, edit, remove)
- Upload images, set stock levels
  - **Acceptance:** Admins can manage catalog and inventory

### 7. Admin Order & Customer Management
- View, update, and process orders
- View customer info and order history
  - **Acceptance:** Admins can fulfill orders and support customers

### 8. Legal & Compliance
- Enforce age verification before checkout
- Display legal disclaimers and terms
- Ensure data privacy and security
  - **Acceptance:** Compliance features are present and functional

### 9. Additional Features
- Responsive design (mobile/desktop)
- SEO-friendly URLs and metadata
- Analytics integration (e.g., Google Analytics)
- Email notifications for orders and account actions
  - **Acceptance:** Site is responsive, SEO and analytics work, emails are sent

---

*This backlog should be reviewed and updated as the project progresses.*