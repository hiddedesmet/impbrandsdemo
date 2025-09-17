// Product dataset for rechargeable vapes
// Following cart structure: { id, name, price, image } + filter fields
const PRODUCTS = [
    {
        id: 1,
        name: "NEW BLU 2.0",
        price: 9.99,
        image: "assets/images/imp1.png",
        brand: "Blu",
        flavor: "Neutral",
        nicotineStrength: "0mg",
        deviceType: "Device",
        description: "The latest in vape technology for flexible control of your puffs, flavour intensity and battery life.",
        inStock: true,
        stockLevel: "high" // high, low, out
    },
    {
        id: 2,
        name: "BLU 2.0 Classic Black",
        price: 9.99,
        image: "assets/images/imp2.avif",
        brand: "Blu",
        flavor: "Neutral",
        nicotineStrength: "0mg",
        deviceType: "Device",
        description: "Classic black edition of the popular BLU 2.0 device with enhanced battery life.",
        inStock: true,
        stockLevel: "high"
    },
    {
        id: 3,
        name: "BLU 2.0 Premium Blue",
        price: 12.99,
        image: "assets/images/imp3.avif",
        brand: "Blu",
        flavor: "Neutral",
        nicotineStrength: "0mg",
        deviceType: "Device",
        description: "Premium blue edition with extended warranty and exclusive accessories.",
        inStock: true,
        stockLevel: "low"
    },
    {
        id: 4,
        name: "Strawberry Ice Flavour Max",
        price: 4.99,
        image: "assets/images/imp4.avif",
        brand: "Blu",
        flavor: "Strawberry Ice",
        nicotineStrength: "18mg",
        deviceType: "Pod",
        description: "Refreshing strawberry ice flavor with maximum intensity for BLU 2.0 devices.",
        inStock: true,
        stockLevel: "high"
    },
    {
        id: 5,
        name: "Kiwi Passion Flavour Max",
        price: 4.99,
        image: "assets/images/imp5.avif",
        brand: "Blu",
        flavor: "Kiwi Passion",
        nicotineStrength: "18mg",
        deviceType: "Pod",
        description: "Exotic kiwi passion fruit blend with bold, authentic flavours for BLU 2.0.",
        inStock: true,
        stockLevel: "high"
    },
    {
        id: 6,
        name: "Menthol Fresh Pod",
        price: 4.99,
        image: "assets/images/imp2.avif",
        brand: "Blu",
        flavor: "Menthol",
        nicotineStrength: "12mg",
        deviceType: "Pod",
        description: "Cool and refreshing menthol flavor for a smooth vaping experience.",
        inStock: true,
        stockLevel: "high"
    },
    {
        id: 7,
        name: "Tobacco Classic Pod",
        price: 4.99,
        image: "assets/images/imp3.avif",
        brand: "Blu",
        flavor: "Tobacco",
        nicotineStrength: "18mg",
        deviceType: "Pod",
        description: "Traditional tobacco flavor with rich, authentic taste.",
        inStock: false,
        stockLevel: "out"
    },
    {
        id: 8,
        name: "BLU Pro Device",
        price: 19.99,
        image: "assets/images/imp1.png",
        brand: "Blu",
        flavor: "Neutral",
        nicotineStrength: "0mg",
        deviceType: "Device",
        description: "Professional grade device with advanced temperature control and longer battery life.",
        inStock: true,
        stockLevel: "low"
    },
    {
        id: 9,
        name: "Cherry Burst Pod",
        price: 4.99,
        image: "assets/images/imp4.avif",
        brand: "Blu",
        flavor: "Cherry",
        nicotineStrength: "6mg",
        deviceType: "Pod",
        description: "Sweet cherry flavor with a burst of fruity goodness.",
        inStock: true,
        stockLevel: "high"
    },
    {
        id: 10,
        name: "Vanilla Cream Pod",
        price: 4.99,
        image: "assets/images/imp5.avif",
        brand: "Blu",
        flavor: "Vanilla Cream",
        nicotineStrength: "12mg",
        deviceType: "Pod",
        description: "Smooth vanilla cream flavor for a luxurious vaping experience.",
        inStock: true,
        stockLevel: "high"
    },
    {
        id: 11,
        name: "BLU Compact Starter Kit",
        price: 14.99,
        image: "assets/images/imp2.avif",
        brand: "Blu",
        flavor: "Mixed",
        nicotineStrength: "12mg",
        deviceType: "Kit",
        description: "Complete starter kit with device and assorted flavor pods.",
        inStock: true,
        stockLevel: "high"
    },
    {
        id: 12,
        name: "Mango Tropical Pod",
        price: 4.99,
        image: "assets/images/imp4.avif",
        brand: "Blu",
        flavor: "Mango",
        nicotineStrength: "18mg",
        deviceType: "Pod",
        description: "Tropical mango flavor that transports you to paradise.",
        inStock: true,
        stockLevel: "low"
    }
];

// Filter options derived from product data
const FILTER_OPTIONS = {
    brands: ["Blu"],
    flavors: ["Neutral", "Strawberry Ice", "Kiwi Passion", "Menthol", "Tobacco", "Cherry", "Vanilla Cream", "Mixed", "Mango"],
    nicotineStrengths: ["0mg", "6mg", "12mg", "18mg"],
    deviceTypes: ["Device", "Pod", "Kit"],
    priceRanges: [
        { label: "Under £5", min: 0, max: 5 },
        { label: "£5 - £10", min: 5, max: 10 },
        { label: "£10 - £15", min: 10, max: 15 },
        { label: "£15+", min: 15, max: Infinity }
    ]
};

// Export for use in other files (global scope for vanilla JS)
window.PRODUCTS = PRODUCTS;
window.FILTER_OPTIONS = FILTER_OPTIONS;