export const plpSelectors = {
    // Category links
    booksCategoryLink: 'a[href="/books"]',
    electronicsCategoryLink: 'a[href="/electronics"]',
    apparelShoesCategoryLink: 'a[href="/apparel-shoes"]',

    // Navigation / breadcrumbs
    homeBreadcrumbLink: 'a[href="/"]',

    // Sort by dropdown
    sortByDropdown: '#products-orderby',

    // Price filters
    priceUnder25: 'a[href="https://demowebshop.tricentis.com/books?price=-25"]',
    price25to50: 'a[href="https://demowebshop.tricentis.com/books?price=25-50"]',
    priceOver50: 'a[href="https://demowebshop.tricentis.com/books?price=50-"]',
    removePriceFilterButton: '.remove-price-range-filter',

    // Product listing items
    productItem: '.product-item',
    productPicture: '.picture',
    productTitle: 'h2.product-title a',

    // Add to cart / compare / wishlist buttons on PLP
    addToCartButton: '.button-2.product-box-add-to-cart-button',
    addToCompareButton: 'input[value="Add to compare list"]',
    addToWishlistButton: 'input[value="Add to wishlist"]',
};
