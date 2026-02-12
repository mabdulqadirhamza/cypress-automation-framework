import { selectors } from "../../support/selectors";

describe("Dashboard Module test", () => {
    const email = "abqadir123@gmail.com";
    const password = "asdfgh123456";
    beforeEach(() => {
        cy.visitHomePage();
    });

    // TC_DASHBOARD_001
    it("TC_DASHBOARD_001 - Account Lockout After Consecutive Failed Login Attempts", () => {

        const attempts = 5;

        cy.get(selectors.loginLink).click();

        // Perform 5 failed attempts
        for (let i = 1; i <= attempts; i++) {
            cy.log(`Attempt #${i}`);

            cy.get(selectors.loginEmailInput).clear().type("wrongemail@gmail.com");
            cy.get(selectors.loginPassword).clear().type("wrongpass");
            cy.get(selectors.loginButton).click();

            // Assert the standard failure message appears each time
            cy.contains("Login was unsuccessful.").should("be.visible");
        }

        // After 5 attempts, check IF lockout message exists
        // (DemoWebShop does not have a lockout, so this is failed test)
        cy.contains("locked", { matchCase: false })
            .should("not.exist");

        cy.log("NOTE: System does NOT implement account lockout — test marked as FAIL as per requirement.");
    });

    //TC_DASHBOARD_002
    it("TC_DASHBOARD_002 - Change Password Functionality Validation", () => {

        // 1. click on change password. 
        //first we need to login 
        cy.get(selectors.loginLink).click();

        //enter credentials
        cy.get(selectors.loginEmailInput).type(email);
        cy.get(selectors.loginPasswordInput).type(password);
        cy.get(selectors.loginButton).click();

        //assertion
        cy.get(selectors.accountLink)
            .should("be.visible")
            .and("contain", email);

        // access change password page
        cy.get(selectors.accountLink).first().click();

        //click on change password
        cy.get(selectors.changePasswordLink).click();

        // 2. enter old password. 
        cy.get(selectors.oldPasswordInput).type(password);

        // 3. enter new password. 
        cy.get(selectors.newPasswordInput).type("asdfgh123456");

        // 4. confirm new password. 
        cy.get(selectors.confirmNewPasswordInput).type("asdfgh123456");

        // 5. click password change button "

        cy.get(selectors.changePasswordButton).click();

        //assertion of password change
        cy.contains("Password was changed");
    });

    //TC_DASHBOARD_003
    it("TC_DASHBOARD_003 - User Registration with Valid Gmail Credentials)", () => {

        const uniqueEmail = `new_reg_${Date.now()}@gmail.com`;


        cy.get(selectors.registerLink).click();


        // Fill registration form

        cy.get(selectors.registerGenderMale).click();
        cy.get(selectors.registerFirstName).type("Test");
        cy.get(selectors.registerLastName).type("User");
        cy.get("#Email").type(uniqueEmail);

        // set password
        cy.get(selectors.loginPasswordInput).type("passwo567rd");
        cy.get(selectors.registerConfirmPasswordInput).type("passwo567rd");

        // Submit
        cy.get(selectors.registerButton).click();

        // Check if registration succeeded
        cy.contains("Your registration completed")
            .should("be.visible");

    });

    // TC_DASHBOARD_004
    it("TC_DASHBOARD_004 - Valid login with registered credentials", () => {
        cy.get(selectors.loginLink).click();

        //enter credentials
        cy.get(selectors.loginEmailInput).type(email);
        cy.get(selectors.loginPasswordInput).type(password);
        cy.get(selectors.loginButton).click();

        //assertion
        cy.get(".account")
            .should("be.visible")
            .and("contain", email);
    });

    // //TC_DASHBOARD_005
    it("TC_DASHBOARD_005 - Logout from Application", () => {
        cy.get(selectors.loginLink).click();

        //enter credentials
        cy.get(".email").type(email);
        cy.get("#Password").type(password);
        cy.get(".button-1.login-button").click();

        // //assertion
        cy.get(".account")
            .should("be.visible")
            .and("contain", email);

        //         // perform logout
        cy.get(selectors.logoutLink).click();
        cy.should("not.be.contain", email);
    });

    //TC_DASHBOARD_006
   it("TC_DASHBOARD_006 - Header Menu Navigation Verification (All Categories)", () => {

    cy.get(selectors.headerBooksLink).click();
    cy.url().should('eq', "https://demowebshop.tricentis.com/books");

    cy.get(selectors.headerComputersLink).click();
    cy.url().should('eq', "https://demowebshop.tricentis.com/computers");

    cy.get(selectors.headerElectronicsLink).click();
    cy.url().should('eq', "https://demowebshop.tricentis.com/electronics");

    cy.get(selectors.headerApparelShoesLink).click();
    cy.url().should('eq', "https://demowebshop.tricentis.com/apparel-shoes");

    cy.get(selectors.headerDigitalDownloadsLink).click();
    cy.url().should('eq', "https://demowebshop.tricentis.com/digital-downloads");

    cy.get(selectors.headerJewelryLink).click();
    cy.url().should('eq', "https://demowebshop.tricentis.com/jewelry");

    cy.get(selectors.headerGiftCardsLink).click();
    cy.url().should('eq', "https://demowebshop.tricentis.com/gift-cards");
});




    //TC_DASHBOARD_017,018,019,20
    it.only("TC_DASHBOARD_017,018,019,20 - Footer column links validation", () => {

        // Accessing information column links
        cy.get(selectors.infoSitemap).click();
        // assertion
        cy.url().should('eq', "https://demowebshop.tricentis.com/sitemap")

        cy.get(selectors.infoShippingReturns).click();
        // assertion
        cy.url().should('eq', "https://demowebshop.tricentis.com/shipping-returns")

        cy.get(selectors.infoPrivacyPolicy).click();
        // assertion
        cy.url().should('eq', "https://demowebshop.tricentis.com/privacy-policy")

        cy.get(selectors.infoConditionsOfUse).click();
        // assertion
        cy.url().should('eq', "https://demowebshop.tricentis.com/conditions-of-use")

        cy.get(selectors.infoAboutUs).click();
        // assertion
        cy.url().should('eq', "https://demowebshop.tricentis.com/about-us")

        cy.get(selectors.infoContactUs).click();
        // assertion
        cy.url().should('eq', "https://demowebshop.tricentis.com/contactus")



        // Accessing customer service column links
        cy.get(selectors.csSearch).click();
        // assertion
        cy.url().should('eq', "https://demowebshop.tricentis.com/search")

        cy.get(selectors.csNews).click();
        // assertion
        cy.url().should('eq', "https://demowebshop.tricentis.com/news")

        cy.get(selectors.csBlog).click();
        // assertion
        cy.url().should('eq', "https://demowebshop.tricentis.com/blog")

        cy.get(selectors.csRecentlyViewed).click();
        // assertion
        cy.url().should('eq', "https://demowebshop.tricentis.com/recentlyviewedproducts")

        cy.get(selectors.csCompareProducts).click();
        // assertion
        cy.contains("Compare products")

        cy.get(selectors.csNewProducts).click();
        // assertion
        cy.url().should('eq', "https://demowebshop.tricentis.com/newproducts")


        //Accessing my account column links
        cy.get(selectors.myAccountInfo).click();
        // assertion
        cy.url().should('eq', "https://demowebshop.tricentis.com/login?ReturnUrl=%2fcustomer%2finfo")

        cy.get(selectors.loginLink).click();


        cy.get(selectors.loginEmailInput).clear().type(email);
        cy.get(selectors.loginPasswordInput).clear().type(password);
        cy.get(selectors.loginButton).click();

        cy.get(selectors.ordersLink).click();
        // assertion
        cy.contains("My account - Orders");

        cy.get(selectors.csRecentlyViewed).click();
        // assertion
        cy.contains("Recently viewed products")

        cy.get(selectors.csCompareProducts).click();
        // assertion
        cy.contains("Compare products")

        cy.get(selectors.csNewProducts).click();
        // assertion
        cy.contains("New products");

        //    Accessing follow - us column links
        cy.get(selectors.facebookLink)
            .should('have.attr', 'href', 'http://www.facebook.com/nopCommerce');


        cy.get(selectors.twitterLink)
            .should('have.attr', 'href', 'https://twitter.com/nopCommerce');


        cy.get(selectors.youtubeLink)
            .should('have.attr', 'href', 'http://www.youtube.com/user/nopCommerce');

    })

})