import { selectors } from "../../support/selectors";

describe("Login Module test", () => {

    const email = "testuser@example.com";
    const password = "TestPassword123";

    beforeEach(() => {
        cy.visitHomePage();
    });

    // TC-LOGIN-001
    it("TC-LOGIN-001 - Valid login test registered credentials", () => {
        cy.visitHomePage(email, password);
    });


    // TC-LOGIN-002
    it("TC-LOGIN-002 - Login attempt with invalid username", () => {
        cy.get(selectors.loginLink).click();

        cy.get(selectors.loginEmailInput).type("34567456456@gmail.com");
        cy.get(selectors.loginPasswordInput).type(password);
        cy.get(selectors.loginButton).click();

        cy.get(selectors.loginErrorMessage)
            .should("contain.text", "Login was unsuccessful")
            .and("contain.text", "No customer account found");
    });


    // TC-LOGIN-003
    it("TC-LOGIN-003 - Login attempt with invalid password", () => {
        cy.get(selectors.loginLink).click();

        cy.get(selectors.loginEmailInput).type(email);
        cy.get(selectors.loginPasswordInput).type("5678345678");
        cy.get(selectors.loginButton).click();

        cy.get(selectors.loginErrorMessage)
            .should("contain.text", "Login was unsuccessful");
    });


    // TC-LOGIN-004
    it("TC-LOGIN-004 - Login with empty username / email", () => {
        cy.get(selectors.loginLink).click();

        cy.get(selectors.loginPasswordInput).type(password);
        cy.get(selectors.loginButton).click();

        cy.get(selectors.loginErrorMessage)
            .should("contain.text", "Login was unsuccessful");
    });


    // TC-LOGIN-005
    it("TC-LOGIN-005 - Login with empty password", () => {
        cy.get(selectors.loginLink).click();

        cy.get(selectors.loginEmailInput).type(email);
        cy.get(selectors.loginButton).click();

        cy.get(selectors.loginErrorMessage)
            .should("contain.text", "Login was unsuccessful");
    });


    // TC-LOGIN-006
    it("TC-LOGIN-006 - Login with empty email and password", () => {
        cy.get(selectors.loginLink).click();

        cy.get(selectors.loginButton).click();

        cy.get(selectors.loginErrorMessage)
            .should("contain.text", "Login was unsuccessful");
    });


    // TC-LOGIN-007
    it("TC-LOGIN-007 - Password mask validation", () => {
        cy.get(selectors.loginLink).click();

        cy.get(selectors.loginPasswordInput).type(password);

        cy.get(selectors.loginPasswordInput)
            .should("have.attr", "type", "password");
    });


    // TC-LOGIN-008
    it("TC-LOGIN-008 - Case sensitivity of credentials (email) failed", () => {
        cy.get(selectors.loginLink).click();

        cy.get(selectors.loginEmailInput).type(email.toUpperCase());
        cy.get(selectors.loginPasswordInput).type(password);
        cy.get(selectors.loginButton).click();

        cy.get(selectors.accountLink)
            .should("be.visible")
            .and("contain", email);
    });


    // TC-LOGIN-009
    it("TC-LOGIN-009 - Case sensitivity (password)", () => {
        cy.get(selectors.loginLink).click();

        cy.get(selectors.loginEmailInput).type(email);
        cy.get(selectors.loginPasswordInput).type(password.toUpperCase());
        cy.get(selectors.loginButton).click();

        cy.get(selectors.loginErrorMessage)
            .should("contain.text", "Login was unsuccessful");
    });


    // TC-LOGIN-010
    it("TC-LOGIN-010 - SQL injection attempt", () => {
        cy.get(selectors.loginLink).click();

        cy.get(selectors.loginEmailInput).type("' OR 1=1 --");
        cy.get(selectors.loginPasswordInput).type("random");
        cy.get(selectors.loginButton).click();

        cy.contains(selectors.invalidEmailMessage).should("be.visible");
    });


    // TC-LOGIN-011
    it("TC-LOGIN-011 - XSS attempt", () => {
        cy.get(selectors.loginLink).click();

        cy.get(selectors.loginEmailInput).type("<script>alert('XSS')</script>");
        cy.get(selectors.loginPasswordInput).type(password);
        cy.get(selectors.loginButton).click();

        cy.contains("Please enter a valid email address").should("be.visible");
    });


    // TC-LOGIN-012
    it("TC-LOGIN-012 - Account lockout after multiple failed attempts", () => {

        cy.get(selectors.loginLink).click();

        for (let i = 1; i <= 5; i++) {
            cy.get(selectors.loginEmailInput).clear().type("wrong@gmail.com");
            cy.get(selectors.loginPasswordInput).clear().type("sdasdasd");
            cy.get(selectors.loginButton).click();

            cy.contains("Login was unsuccessful").should("be.visible");
        }

        cy.contains("locked", { matchCase: false }).should("not.exist");
    });


    // TC-LOGIN-013
    it("TC-LOGIN-013 - Weak password accepted (negative test)", () => {

        const uniqueEmail = `weak_${Date.now()}@gmail.com`;

        cy.get(selectors.registerLink).click();
        cy.get(selectors.registerGenderMale).click();
        cy.get(selectors.registerFirstName).type("Test");
        cy.get(selectors.registerLastName).type("User");
        cy.get(selectors.registerEmailInput).type(uniqueEmail);
        cy.get(selectors.registerPasswordInput).type("password");
        cy.get(selectors.registerConfirmPasswordInput).type("password");
        cy.get(selectors.registerButton).click();

        cy.get(".result").should("contain.text", "Your registration completed");
});


    // TC-LOGIN-014
    it("TC-LOGIN-014 - Session persistence", () => {
        cy.get(selectors.loginLink).click();

        cy.get(selectors.loginEmailInput).type("testuser@example.com");
        cy.get(selectors.loginPasswordInput).type("TestPassword123");
        cy.get(selectors.loginButton).click();

        cy.visit("https://demowebshop.tricentis.com/");

        cy.contains("testuser@example.com").should("be.visible");
    });


    // TC-LOGIN-015
    it("TC-LOGIN-015 - Session timeout test", () => {
        cy.get(selectors.loginLink).click();

        cy.get(selectors.loginEmailInput).type(email);
        cy.get(selectors.loginPasswordInput).type(password);
        cy.get(selectors.loginButton).click();

        cy.get(selectors.accountLink).should("be.visible");

        cy.wait(60000);
        cy.reload();

        cy.get(selectors.accountLink).should("be.visible");
    });


    // TC-LOGIN-016
    it("TC-LOGIN-016 - Successful logout", () => {
        cy.get(selectors.loginLink).click();

        cy.get(selectors.loginEmailInput).type(email);
        cy.get(selectors.loginPasswordInput).type(password);
        cy.get(selectors.loginButton).click();

        cy.get(selectors.accountLink).should("contain", email);
        cy.get(selectors.logoutLink).click();

        cy.get("body").should("not.contain", email);
    });


    // TC-LOGIN-017
    it("TC-LOGIN-017 - Forgot password invalid email", () => {
        cy.get(selectors.loginLink).click();

        cy.get(selectors.forgotPasswordLink).click();

        cy.get(selectors.passwordRecoveryEmailInput).type("wrongemail@gmail.com");
        cy.get(selectors.passwordRecoveryButton).click();

        cy.contains(selectors.passwordRecoveryInvalidMessage).should("be.visible");
    });


    // TC-LOGIN-018
    it("TC-LOGIN-018 - Forgot password with valid email", () => {
        cy.get(selectors.loginLink).click();

        cy.get(selectors.forgotPasswordLink).click();

        cy.get(selectors.passwordRecoveryEmailInput).type(email);
        cy.get(selectors.passwordRecoveryButton).click();

        cy.contains(selectors.passwordRecoverySuccessMessage).should("be.visible");
    });


    // TC-LOGIN-019
    it("TC-LOGIN-019 - Invalid or expired reset link", () => {
        const invalidResetLink =
            "https://demowebshop.tricentis.com/passwordrecovery/reset?token=INVALID123";

        cy.visit(invalidResetLink);

        cy.contains(selectors.expiredResetMessage).should("be.visible");

        cy.get(selectors.resetNewPasswordInput).should("not.exist");
        cy.get(selectors.resetConfirmPasswordInput).should("not.exist");
        cy.get(selectors.resetPasswordButton).should("not.exist");
    });


    // TC-LOGIN-023
    it("TC_LOGIN_023 - Email max length 256", () => {

        const longEmail = "a".repeat(256 - "@example.com".length) + "@example.com";

        cy.visit("https://demowebshop.tricentis.com/login");

        cy.get(selectors.loginEmailInput)
            .type(longEmail)
            .should("have.value", longEmail);
    });


    // TC-LOGIN-024
    it("TC_LOGIN_024 - Password field max 256 chars", () => {

        const longPassword = "A".repeat(256);

        cy.visit("https://demowebshop.tricentis.com/register");

        cy.get(selectors.registerGenderMale).check();
        cy.get(selectors.registerFirstName).type("Test");
        cy.get(selectors.registerLastName).type("User");

        const randEmail = `user_${Date.now()}@gmail.com`;
        cy.get(selectors.registerEmailInput).type(randEmail);

        cy.get(selectors.registerPasswordInput)
            .type(longPassword)
            .should("have.value", longPassword);

        cy.get(selectors.registerConfirmPasswordInput)
            .type(longPassword)
            .should("have.value", longPassword);

        cy.get(selectors.registerButton).click();

        cy.contains("Your registration completed").should("be.visible");
    });
});
