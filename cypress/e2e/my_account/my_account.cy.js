import { selectors as s } from "../../support/selectors";

describe("My Account Module test", () => {

    const email = "mahebi6673@foxroids.com";
    const password = "password";

    beforeEach(() => {
        cy.visitHomePage();
    });

    // Helper: login
    function login() {
        cy.get(s.loginLink).click();
        cy.get(s.loginEmail).clear().type(email);
        cy.get(s.loginPasswordInput).clear().type(password);
        cy.get(s.loginButton).click();
        cy.contains(email).should("be.visible");
        cy.get(s.accountLink).first().click();
    }

    // TC_MY_ACC_001
    it("TC_MY_ACC_001 - My account: update personal info", () => {
        login();

        cy.get(s.firstNameInput).clear().type("M. Abdul");
        cy.get(s.lastNameInput).clear().type("Qadir Hamza");
        cy.get(s.saveCustomerInfoButton).click();

        cy.contains("My account - Customer info").should("exist");
    });


    // TC_MY_ACC_003 
    it("TC_MY_ACC_003 - My Account: view order history", () => {
        login();

        cy.get(s.ordersLink).first().click();
        cy.contains("My account - Orders").should("exist");
    });

    // TC_MY_ACC_008 
    it("TC_MY_ACC_008 - My Account: Change password (mismatch)", () => {
        login();

        cy.get(s.changePasswordLink).click();

        cy.get(s.oldPasswordInput).type(password);
        cy.get(s.newPasswordInput).type("asdfgh3456");
        cy.get(s.confirmNewPasswordInput).type("asdfgh123456");
        cy.get(s.changePasswordButton).click();

        cy.contains("The new password and confirmation password do not match.")
            .should("be.visible");
    });

    // TC_MY_ACC_012 
    it.only("TC_MY_ACC_012 - My Account: Delete address", () => {
        login();

        cy.get(s.addressesLink).first().click();
        cy.get(s.deleteAddressButton).first().click();
        cy.contains("Company:").should("not.exist");
        cy.contains("First name:").should("not.exist");
        cy.contains("Last name:").should("not.exist");
    });

});
