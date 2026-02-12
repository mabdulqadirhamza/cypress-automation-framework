describe("Search Module test", () => {
    const email = "mahebi6673@foxroids.com";
    const password = "password";
    beforeEach(() => {
        cy.visitHomePage();
    });
    //TC_WishList_001
    it("TC_WishList_001 - Wishlist feature with Instock product", ()=> {

        /** test steps
         * "1.Open home page   
         * 2.Open any in-stock product page such as (Product:14.1-inch Laptop)
        3. Verify presence of “Add to Wishlist” button"
         */
        cy.visit("https://demowebshop.tricentis.com/141-inch-laptop");
        //assertion
        cy.contains("Add to wishlist").should('not.be.exist');

        // this is a fail case
        cy.log("This is a failed case");
    })

    //TC_WishList_002
    it("TC_WishList_002 - Wishlist feature with ADD TO WISHLIST button", ()=> {
        cy.login('mahebi6673@foxroids.com','password')

        // *"1 Go to Homepage . 
        // 2.Navigate to product page (e.g smartphone)
        cy.contains('a[href="/electronics"]', 'Electronics').click();
        cy.wait(2000)
        cy.get('img[alt="Picture for category Cell phones"]').click();
        cy.wait(2000)
        cy.get('img[alt="Picture of Smartphone"]').click();
       // 3. Click on “Add to Wishlist”"
       cy.get("#add-to-wishlist-button-43").click();
       //assertion : product add to wishlist
       cy.contains("The product has been added to your wishlist").should('exist');
        cy.wait(3000)
        //checking the wishlist for final assertion
        cy.get(".wishlist-qty").click();
        cy.url("http://demowebshop.tricentis.com/wishlist/3b9b80b9-dbbc-40a8-8fcb-b2a8f5e18e5d").should('exist')
    })

    //TC_WishList_006
    it("TC_WishList_006 - Wishlist with share link", ()=> {
    cy.login('mahebi6673@foxroids.com', 'password')
    cy.get(".wishlist-qty").click();
        cy.get(".share-link").click();

        //assertion
        cy.url("https://demowebshop.tricentis.com/wishlist/f9771483-ba87-46c9-8394-eeee4a3ba861one").should('exist')
    })

    //TC_WishList_004
    it("TC_WishList_004 - Wishlist after removing products", ()=> {
        /***
         * 1. Go to Homepage. 
         * 2.Navigate to wishlist page 
         * 3. Remove product from wishlist

         */
        cy.login('mahebi6673@foxroids.com','password')
        cy.get(".wishlist-qty").click();
        cy.get(".remove-from-cart").click();
        cy.get(".button-2.update-wishlist-button").click();

        //assertion
        cy.contains("The wishlist is empty!").should('exist')

    })

    //TC_WishList_011
    it.only("TC_WishList_011 -  Wishlist (Share by Email) after logging in", ()=> {
        cy.login('mahebi6673@foxroids.com', 'password');
        cy.get(".wishlist-qty").click();

        cy.get(".button-2.email-a-friend-wishlist-button").click()
        // enter a email 
        cy.get(".friend-email").type("abc123@gmail.com")
        cy.get(".button-1.send-email-a-friend-button").click();

        //assertion
        cy.contains("Your message has been sent.").should('exist')

    })


})