import { cartSelectors as s } from "../../support/cartSelectors";

describe("Shopping Cart Module Tests", () => {
    const email = "mahebi6673@foxroids.com";
    const password = "password";

    beforeEach(() => {
        cy.visitHomePage();
    });

    // TC_CART_001 - Add Item In Shopping Cart
    it("TC_CART_001 - Add Item In Shopping Cart", () => {
        cy.login(email, password);

        cy.get(s.addToCartButton).first().click();
        cy.get(s.giftCardRecipientName).type("This gift is for you");
        cy.get(s.giftCardRecipientEmail).type("asdfg@gmail.com");
        cy.get(s.giftCardAddToCartButton).click();

        cy.contains("The product has been added to your shopping cart").should('exist');
    });

    // TC_CART_002 - Remove Item from Shopping Cart
    it("TC_CART_002 - Remove Item from Shopping Cart", () => {
        cy.login(email, password);

        cy.get(s.topCartLink).click();
        cy.get(s.removeFromCartCheckbox).check();
        cy.get(s.updateCartButton).click();

        cy.contains("Your Shopping Cart is empty!").should('exist');
    });

    // TC_CART_003 - Update Quantity in Cart
    it("TC_CART_003 - Item Quantity Update in Cart", () => {
        cy.login(email, password);

        cy.get(s.topCartLink).click();
        cy.get(s.cartQuantityInput("5979664")).clear().type('2');
        cy.get(s.updateCartButton).click();

        cy.url().should('include', "/cart");
    });

    // TC_CART_004 - Continue Shopping Button
    it("TC_CART_004 - Continue Shopping button", () => {
        cy.login(email, password);

        cy.get(s.topCartLink).click();
        cy.get(s.continueShoppingButton).click();

        cy.url().should('include', "/photo-camera");
    });

    // TC_CART_009 - Add same product multiple times
    it("TC_CART_009 - Add same product multiple times", () => {
        cy.login(email, password);

        for (let i = 0; i < 5; i++) {
            cy.get(s.addToCartButton).first().click();
            cy.get(s.giftCardRecipientName).clear().type(`This gift is for you ${i + 1}`);
            cy.get(s.giftCardRecipientEmail).clear().type(`test${i + 1}@gmail.com`);
            cy.get(s.giftCardAddToCartButton).click();

            cy.url().should('include', "/photo-camera");
        }
    });
});
