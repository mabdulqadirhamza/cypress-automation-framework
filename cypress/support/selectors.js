export const selectors = {

    //account 
    accountLink: "a.account",
    changePasswordLink: 'a[href="/customer/changepassword"]',

    oldPasswordInput: "#OldPassword",
    newPasswordInput: "#NewPassword",
    confirmNewPasswordInput: "#ConfirmNewPassword",
    changePasswordButton: ".button-1.change-password-button",
    passwordChangedSuccessMessage: ".result",
    firstNameInput: "#FirstName",
    lastNameInput: "#LastName",
    saveCustomerInfoButton: ".button-1.save-customer-info-button",
    addressesLink: 'a[href="/customer/addresses"]',
    editAddressButton: ".button-2.edit-address-button",
    companyInput: "#Address_Company",
    saveAddressButton: ".button-1.save-address-button",
    deleteAddressButton: ".button-2.delete-address-button",
    ordersLink: 'a[href="/customer/orders"]',

    //login
    loginEmail: "#Email",
    loginLink: ".ico-login",
    loginEmailInput: ".email",
    loginPasswordInput: "#Password",
    loginButton: ".button-1.login-button",
    loginErrorMessage: ".message-error",
    invalidEmailMessage: "Please enter a valid email address.",
    forgotPasswordLink: 'a[href="/passwordrecovery"]',
    passwordRecoveryEmailInput: "#Email",
    passwordRecoveryButton: ".button-1.password-recovery-button",
    passwordRecoverySuccessMessage: "Email with instructions has been sent to you.",
    passwordRecoveryInvalidMessage: "Email not found.",
    accountLink: "a.account",
    logoutLink: ".ico-logout",
    loginMaskPassword: "#Password",
    expiredResetMessage: "This link is invalid or expired",
    resetNewPasswordInput: "#NewPassword",
    resetConfirmPasswordInput: "#ConfirmPassword",
    resetPasswordButton: "#reset-button",


    //register
    registerLink: ".ico-register",
    registerGenderMale: "#gender-male",
    registerFirstName: "#FirstName",
    registerLastName: "#LastName",
    registerEmailInput: "#Email",
    registerPasswordInput: "#Password",
    registerConfirmPasswordInput: "#ConfirmPassword",
    registerButton: "#register-button",
    registrationSuccessMessage: ".result",

    //home / navigation
    apparelShoesLink: 'a[href="/apparel-shoes"]',
    booksLink: 'a[href="/books"]',
    cartLabel: ".cart-label",
    cartLink: "#topcartlink",
    ordersLink: 'a[href="/customer/orders"]',

    //header links
    // Header Menu Selectors
    headerBooksLink: '.header-menu a[href="/books"]',
    headerComputersLink: '.header-menu a[href="/computers"]',
    headerElectronicsLink: '.header-menu a[href="/electronics"]',
    headerApparelShoesLink: '.header-menu a[href="/apparel-shoes"]',
    headerDigitalDownloadsLink: '.header-menu a[href="/digital-downloads"]',
    headerJewelryLink: '.header-menu a[href="/jewelry"]',
    headerGiftCardsLink: '.header-menu a[href="/gift-cards"]',


    //footer links
    infoSitemap: 'a[href="/sitemap"]',
    infoShippingReturns: 'a[href="/shipping-returns"]',
    infoPrivacyPolicy: 'a[href="/privacy-policy"]',
    infoConditionsOfUse: 'a[href="/conditions-of-use"]',
    infoAboutUs: 'a[href="/about-us"]',
    infoContactUs: 'a[href="/contactus"]',

    //customer service links
    csSearch: 'a[href="/search"]',
    csNews: 'a[href="/news"]',
    csBlog: 'a[href="/blog"]',
    csRecentlyViewed: 'a[href="/recentlyviewedproducts"]',
    csCompareProducts: 'a[href="/compareproducts"]',
    csNewProducts: 'a[href="/newproducts"]',

    //my account links
    myAccountInfo: 'a[href="/customer/info"]',
    myAccountOrders: 'a[href="/customer/orders"]',
    myAccountAddresses: 'a[href="/customer/addresses"]',

    //follow us links
    facebookLink: 'a[href="http://www.facebook.com/nopCommerce"]',
    twitterLink: 'a[href="https://twitter.com/nopCommerce"]',
    youtubeLink: 'a[href="http://www.youtube.com/user/nopCommerce"]',

    //product listing page (Plp)
    addToCartButton: ".button-2.product-box-add-to-cart-button",
    addToCartInputBtn: 'input[value="Add to cart"].product-box-add-to-cart-button',
    productPageAddToCartButton: "#add-to-cart-button-2",


    //product details page (pdp)
    giftcardRecipientName: "#giftcard_2_RecipientName",
    giftcardRecipientEmail: "#giftcard_2_RecipientEmail",
    giftcardSenderName: "#giftcard_2_SenderName",
    giftcardSenderEmail: "#giftcard_2_SenderEmail",
    addToCartPDPButton: "#add-to-cart-button-2",
    productSizeDropdown: "#product_attribute_5_7_1",
    productEssential: ".product-essential",

     // CART / CHECKOUT
    removeFromCartCheckbox: 'input[name="removefromcart"]',
    termsOfServiceCheckbox: 'input[name="termsofservice"]',
    checkoutButton: "#checkout",
    discountCouponInput: ".discount-coupon-code",
    applyCouponButton: ".button-2.apply-gift-card-coupon-code-button",
    checkoutAsGuestButton: 'input[value="Checkout as Guest"]',

    // My Account: Personal Info
    saveCustomerInfoButton: ".button-1.save-customer-info-button",

    // My Account: Edit Address 
    editAddressButton: ".button-2.edit-address-button",
    companyInput: "#Address_Company",
    saveAddressButton: ".button-1.save-address-button",

    //My Account: Delete Address
    deleteAddressButton: ".button-2.delete-address-button",

    //assertions
    addedToCartMessage: "The product has been added to your shopping cart",
    invalidCouponMessage: "The coupon code you entered couldn't be applied to your order",
    recentOrderLabel: "Order Number:",
    myOrdersHeader: "My account - Orders",
    acceptTermsMessage: "Please accept the terms of service before the next step."
}