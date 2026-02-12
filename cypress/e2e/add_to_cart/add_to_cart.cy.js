import { selectors } from "../../support/selectors";

describe("Add to cart Module test", () => {
    const email = "mahebi6673@foxroids.com";
    const password = "password";
    beforeEach(() => {
        cy.visitHomePage();
    });

    //TC_ADD_001
     it("TC_CART_001 - PLP->Add to Cart Button", ()=> {
        cy.wait(1500)
        cy.login(email, password);
        cy.wait(1500)

        
        // add item to cart
        cy.get(selectors.addToCartButton).first().click();
        cy.wait(1500)

        cy.get(selectors.giftcardRecipientName).type("This gift is for you");
        cy.get(selectors.giftcardRecipientEmail).type("asdfg@gmail.com");
        cy.wait(1500)

        //adding to cart
        cy.get(selectors.addToCartPDPButton).click();
        cy.wait(1500)

        //assertion'
        cy.contains(selectors.addedToCartMessage).should('exist');

    });

    //TC_ADD_002
    it("TC_ADD_002 - Add to Cart from PLP – Product With Selectable Options", ()=> {
        cy.wait(1500)
        cy.url().should('eq', "https://demowebshop.tricentis.com/");
        cy.wait(1500)
        //assertion on url
        cy.get('a[href="/apparel-shoes"]').contains("Apparel & Shoes").click();
        cy.wait(1500)
        //assertion
        cy.url().should('eq', "https://demowebshop.tricentis.com/apparel-shoes");
        cy.wait(1500)

        cy.get(selectors.addToCartInputBtn).first().click();
        cy.wait(1500)
        //selecting size
        cy.get(selectors.productSizeDropdown).select('2X');
        cy.wait(1500)

        //assertion by size by checking size in the body
        cy.contains("2X").should('exist');
        cy.wait(1500)
    })

    //TC_ADD_003
    it("TC_ADD_003 - View the product in the cart", ()=> {
    cy.login(email, password);

    //view cart
    cy.get(selectors.cartLabel).first().click();

    //assertion
    cy.url().should('eq', "https://demowebshop.tricentis.com/cart");
        
    })

    //TC_ADD_007
    it("TC_ADD_007 - Add Product Without Login", ()=> {
    //adding product without login
    cy.url().should('eq', "https://demowebshop.tricentis.com/");
    cy.wait(1500)
        //assertion on url
        cy.get('a[href="/apparel-shoes"]').contains("Apparel & Shoes").click();
            cy.wait(1500)

        //assertion
        cy.url().should('eq', "https://demowebshop.tricentis.com/apparel-shoes");
            cy.wait(1500)


        cy.get(selectors.addToCartInputBtn).first().click();
            cy.wait(1500)

        //selecting size
        cy.get(selectors.productSizeDropdown).select('2X');
        cy.contains("2X").should('exist');

        //assertion : body does not have any email
        cy.contains('email').should('not.exist');
    });

    //TC_ADD_008
    it("TC_ADD_008 - Add Out of Stock Item", ()=> {
        //adding out of stock item
        cy.get('a[href="/apparel-shoes"]').contains("Apparel & Shoes").click();

        //get inside the product
        cy.get('img[alt="Picture of Custom T-Shirt"]').click();
        // assertion of their is no add to cart button for out of stock item
        cy.get(selectors.productEssential).find("Add to cart").should('not.exist');
    })

})