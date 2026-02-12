describe("Shipping Module test", () => {
    const email = "mahebi6673@foxroids.com";
    const password = "password";
    beforeEach(() => {
        cy.visitHomePage();
    });

    //TC_SHIPPING_001
    it("TC_SHIPPING_001 - Estimate Shipping feature", () => {
        //need to login first 
        cy.get(".ico-login").click();
        cy.get(".email").clear().type(email);
        cy.get("#Password").clear().type(password);
        cy.get(".button-1.login-button").click();

        // go to shopping cart
        cy.get(".cart-qty").click();
        cy.get("#CountryId").select("Canada");
        cy.get("#ZipPostalCode").type("23456234");
        cy.get(".button-2.estimate-shipping-button").click();

        //assertion
        cy.contains("Estimate shipping").should('exist');
    });

})