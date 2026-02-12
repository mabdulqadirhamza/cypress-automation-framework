import { selectors } from "../../support/selectors";

describe("Checkout Module test", () => {
    const email = "mahebi6673@foxroids.com";
    const password = "password";
    beforeEach(() => {
        cy.visitHomePage();
    });
    
    //TC_CHECKOUT_004

    it.only("TC_CHECKOUT_004 - Invalid Coupon Code", ()=> {
        cy.login(email, password)

        //check the cart to applied coupon
        cy.get(selectors.cartLink).click();

        //applying coupon
        cy.get(selectors.discountCouponInput).type("abcd")
        cy.get(selectors.applyCouponButton).click();

        //assertion
        cy.contains(selectors.invalidCouponMessage).should('exist')
    })

    //TC_CHECKOUT_007
    it.only("TC_CHECKOUT_007- Checkout from the Cart Button", ()=> {
        cy.login(email, password)
        cy.get(selectors.cartLink).click();

      /**"1. Terms of services checkbox should mark. 
2. hit checkout button."
 */
        cy.get(selectors.removeFromCartCheckbox).check();

        //checkout

        cy.get(selectors.termsOfServiceCheckbox).check()
        cy.get(selectors.checkoutButton).click();

        //assertion
        cy.url().should("contain", "/onepagecheckout");


    })

    //TC_CHECKOUT_015
    it.only("TC_CHECKOUT_015 - checkout as guest", ()=> {
       cy.get(selectors.addToCartButton).first().click()
       cy.wait(1500)
        cy.get(selectors.cartLink).click();
cy.wait(1500)
        cy.get(selectors.giftcardRecipientName).type("This gift is for you");
        cy.get(selectors.giftcardRecipientEmail).type("asdfg@gmail.com");
        cy.get(selectors.giftcardSenderName).type("qwer@gmail.com");
        cy.get(selectors.giftcardSenderEmail).type("asdfg@gmail.com");
cy.wait(1500)

        //adding to cart
        cy.get(selectors.productPageAddToCartButton).click();
        cy.wait(1500)
        cy.get(selectors.cartLink).click();
cy.wait(1500)
       cy.get(selectors.removeFromCartCheckbox).check();
cy.wait(1500)
       cy.get(selectors.termsOfServiceCheckbox).check()
        cy.get(selectors.checkoutButton).click();
        cy.wait(1500)
        //checking out as guest
        cy.get(selectors.checkoutAsGuestButton).click();

         //assertion
        cy.url().should("contain", "/onepagecheckout");

    })

    //TC_CHECKOUT_016
    it("TC_CHECKOUT_016 - checkout without filling mandatory field", ()=> {
        cy.login(email, password)
        cy.get(selectors.cartLink).click();
      
      //checkout any existing product without accepting manadtory field
        cy.get(selectors.removeFromCartCheckbox).check();

        //assertion
        cy.contains(selectors.acceptTermsMessage).should('exist');
    })

    //TC_CHECKOUT_026
    it("TC_CHECKOUT_026 - Verify recent order appears.", ()=> {
        cy.login(email, password)

        /**"1. Navigate to “My Orders.” 
        2. Verify recent order appears."
        **/

        cy.get(selectors.ordersLink).click();
        // assertion
        cy.contains(selectors.myOrdersHeader).should('exist');

    })


})