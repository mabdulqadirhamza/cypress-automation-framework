export const cartSelectors = {
    addToCartButton: ".button-2.product-box-add-to-cart-button",
    giftCardRecipientName: "#giftcard_2_RecipientName",
    giftCardRecipientEmail: "#giftcard_2_RecipientEmail",
    giftCardAddToCartButton: "#add-to-cart-button-2",
    cartNotification: ".bar-notification",
    topCartLink: "#topcartlink",
    removeFromCartCheckbox: 'input[name="removefromcart"]',
    updateCartButton: ".button-2.update-cart-button",
    continueShoppingButton: ".button-2.continue-shopping-button",
    cartQuantityInput: (productId) => `input[name="itemquantity${productId}"]`,
    emptyCartMessage: ".order-summary-content"
};
