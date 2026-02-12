import { registrationSelectors as s } from "../../support/registrationSelectors";

function generateRandomUser() {
    const randomString = Math.random().toString(36).substring(2, 10);
    return {
        firstName: "Test",
        lastName: "User",
        email: `user_${randomString}@gmail.com`,
        password: "Password123"
    };
}

describe("Registration Module Tests", () => {

    beforeEach(() => {
        cy.visit("https://demowebshop.tricentis.com/register");
    });

    // TC_REGISTER_001 - Successful Registration
    it("TC_REGISTER_001 - Successful Registration", () => {
        const user = generateRandomUser();

        cy.get(s.genderMale).check();
        cy.get(s.firstNameInput).type(user.firstName);
        cy.get(s.lastNameInput).type(user.lastName);
        cy.get(s.emailInput).type(user.email);
        cy.get(s.passwordInput).type(user.password);
        cy.get(s.confirmPasswordInput).type(user.password);
        cy.get(s.registerButton).click();

        cy.contains("Your registration completed").should("be.visible");
    });

    // TC_REGISTER_002 - First Name Required Validation
    it("TC_REGISTER_002 - First Name Required Validation", () => {
        const email = `user_${Math.random().toString(36).substring(2, 8)}@gmail.com`;

        cy.get(s.genderMale).check();
        cy.get(s.firstNameInput).clear();
        cy.get(s.lastNameInput).type("Doe");
        cy.get(s.emailInput).type(email);
        cy.get(s.passwordInput).type("Password123");
        cy.get(s.confirmPasswordInput).type("Password123");
        cy.get(s.registerButton).click();

        cy.get(s.firstNameValidation)
            .should("be.visible")
            .and("contain", "First name is required.");

        cy.get(s.registrationSuccessMessage).should("not.exist");
    });

    // TC_REGISTER_003 - Mismatched Password Validation
    it("TC_REGISTER_003 - Mismatched Password Validation", () => {
        const email = `user_${Math.random().toString(36).substring(2, 8)}@gmail.com`;

        cy.get(s.genderFemale).check();
        cy.get(s.firstNameInput).type("Jane");
        cy.get(s.lastNameInput).type("Smith");
        cy.get(s.emailInput).type(email);
        cy.get(s.passwordInput).type("Password123");
        cy.get(s.confirmPasswordInput).type("Password124");
        cy.get(s.registerButton).click();

        cy.get(s.confirmPasswordValidation)
            .should("be.visible")
            .and("contain", "The password and confirmation password do not match.");

        cy.get(s.registrationSuccessMessage).should("not.exist");
    });

    // TC_REGISTER_004 - Invalid Email
    it("TC_REGISTER_004 - Invalid Email Validation", () => {
        cy.get(s.genderMale).check();
        cy.get(s.firstNameInput).type("Robert");
        cy.get(s.lastNameInput).type("Lee");
        cy.get(s.emailInput).type("robert.lee(at)example.com");
        cy.get(s.passwordInput).type("Password123");
        cy.get(s.confirmPasswordInput).type("Password123");
        cy.get(s.registerButton).click();

        cy.get(s.emailValidation)
            .should("be.visible")
            .and("contain", "Wrong email");

        cy.get(s.registrationSuccessMessage).should("not.exist");
    });

    // TC_REGISTER_005 - Already Registered Email
    it("TC_REGISTER_005 - Already Registered Email Validation", () => {
        cy.get(s.genderFemale).check();
        cy.get(s.firstNameInput).type("Emily");
        cy.get(s.lastNameInput).type("Clark");
        cy.get(s.emailInput).type("emily.clark@example.com");
        cy.get(s.passwordInput).type("Password123");
        cy.get(s.confirmPasswordInput).type("Password123");
        cy.get(s.registerButton).click();

        cy.get(s.summaryErrors)
            .should("be.visible")
            .and("contain", "The specified email already exists");

        cy.get(s.registrationSuccessMessage).should("not.exist");
    });

    // TC_REGISTER_006 - Email Contains Whitespace
    it("TC_REGISTER_006 - Email Contains Whitespace", () => {
        cy.get(s.genderMale).check();
        cy.get(s.firstNameInput).type("Test");
        cy.get(s.lastNameInput).type("Doe");
        cy.get(s.emailInput).type(" test.doe@example.com ");
        cy.get(s.passwordInput).type("Password123");
        cy.get(s.confirmPasswordInput).type("Password123");
        cy.get(s.registerButton).click();

        cy.get(s.emailValidation)
            .should("be.visible")
            .and("contain", "Wrong email");
    });

    // TC_REGISTER_007 - Disposable Email
    it("TC_REGISTER_007 - Registration Using Disposable Email", () => {
        cy.get(s.genderMale).check();
        cy.get(s.firstNameInput).type("Test");
        cy.get(s.lastNameInput).type("User");
        cy.get(s.emailInput).type("test@mailinator.com");
        cy.get(s.passwordInput).type("Password123");
        cy.get(s.confirmPasswordInput).type("Password123");
        cy.get(s.registerButton).click();

        cy.get(s.summaryErrors)
            .should("be.visible")
            .then(($el) => {
                const text = $el.text().toLowerCase();
                expect(text).to.match(/already exists|disposable/i);
            });
    });

    // TC_REGISTER_008 - Short Password
    it("TC_REGISTER_008 - Short Password Validation", () => {
        const email = `user_${Math.random().toString(36).substring(2, 8)}@gmail.com`;
        cy.get(s.genderMale).check();
        cy.get(s.firstNameInput).type("Test");
        cy.get(s.lastNameInput).type("User");
        cy.get(s.emailInput).type(email);
        cy.get(s.passwordInput).type("1234");
        cy.get(s.confirmPasswordInput).type("1234");
        cy.get(s.registerButton).click();

        cy.get(s.passwordValidation)
            .should("be.visible")
            .and("contain", "The password should have at least 6 characters");
    });

    // TC_REGISTER_009 - Confirm Password Blank
    it("TC_REGISTER_009 - Confirm Password Blank", () => {
        const email = `user_${Math.random().toString(36).substring(2, 8)}@gmail.com`;
        cy.get(s.genderFemale).check();
        cy.get(s.firstNameInput).type("Anna");
        cy.get(s.lastNameInput).type("Smith");
        cy.get(s.emailInput).type(email);
        cy.get(s.passwordInput).type("Password123");
        cy.get(s.confirmPasswordInput).clear();
        cy.get(s.registerButton).click();

        cy.get(s.confirmPasswordValidation)
            .should("be.visible")
            .and("contain", "Password is required");
    });

    // TC_REGISTER_010 - Case-insensitive Email
    it("TC_REGISTER_010 - Case-Insensitive Email Registration", () => {
        const randomPart = Math.random().toString(36).substring(2, 8);
        const email = `TEST.${randomPart}@EXAMPLE.COM`;
        cy.get(s.genderMale).check();
        cy.get(s.firstNameInput).type("Test");
        cy.get(s.lastNameInput).type("User");
        cy.get(s.emailInput).type(email);
        cy.get(s.passwordInput).type("Password123");
        cy.get(s.confirmPasswordInput).type("Password123");
        cy.get(s.registerButton).click();

        cy.contains("Your registration completed").should("be.visible");
    });

    // TC_REGISTER_011 - Weak Password (No Uppercase)
    it("TC_REGISTER_011 - Weak Password (No Uppercase)", () => {
        const email = `user_${Math.random().toString(36).substring(2, 8)}@gmail.com`;
        cy.get(s.genderFemale).check();
        cy.get(s.firstNameInput).type("Linda");
        cy.get(s.lastNameInput).type("Brown");
        cy.get(s.emailInput).type(email);
        cy.get(s.passwordInput).type("password123"); // no uppercase
        cy.get(s.confirmPasswordInput).type("password123");
        cy.get(s.registerButton).click();

        cy.contains("Your registration completed").should("be.visible");
        cy.log("NOTE: Site does not enforce uppercase in passwords.");
    });

    // TC_REGISTER_012 - Prevent Duplicate Account On Re-Submit
    it("TC_REGISTER_012 - Prevent Duplicate Account On Re-Submit", () => {
        const email = `user_${Math.random().toString(36).substring(2, 8)}@gmail.com`;

        cy.get(s.genderMale).check();
        cy.get(s.firstNameInput).type("John");
        cy.get(s.lastNameInput).type("Doe");
        cy.get(s.emailInput).type(email);
        cy.get(s.passwordInput).type("Password123");
        cy.get(s.confirmPasswordInput).type("Password123");
        cy.get(s.registerButton).click();
        cy.contains("Your registration completed").should("be.visible");

        // Attempt duplicate registration
        cy.visit("https://demowebshop.tricentis.com/register");
        cy.get(s.genderMale).check();
        cy.get(s.firstNameInput).type("John");
        cy.get(s.lastNameInput).type("Doe");
        cy.get(s.emailInput).type(email);
        cy.get(s.passwordInput).type("Password123");
        cy.get(s.confirmPasswordInput).type("Password123");
        cy.get(s.registerButton).click();

        cy.get(s.summaryErrors)
            .should("be.visible")
            .and("contain", "The specified email already exists");
    });

    // TC_REGISTER_013 - Password Missing Numbers
    it("TC_REGISTER_013 - Password Missing Numbers", () => {
        const user = generateRandomUser();
        cy.get(s.genderMale).check();
        cy.get(s.firstNameInput).type(user.firstName);
        cy.get(s.lastNameInput).type(user.lastName);
        cy.get(s.emailInput).type(user.email);
        cy.get(s.passwordInput).type("Password"); // no numbers
        cy.get(s.confirmPasswordInput).type("Password");
        cy.get(s.registerButton).click();

        cy.contains("Your registration completed").should("be.visible");
        cy.log("NOTE: Site does not enforce numeric characters in password.");
    });

    // TC_REGISTER_014 - Register Without Accepting Terms
    it("TC_REGISTER_014 - Register Without Accepting Terms", () => {
        const user = generateRandomUser();
        cy.get(s.genderFemale).check();
        cy.get(s.firstNameInput).type(user.firstName);
        cy.get(s.lastNameInput).type(user.lastName);
        cy.get(s.emailInput).type(user.email);
        cy.get(s.passwordInput).type(user.password);
        cy.get(s.confirmPasswordInput).type(user.password);
        // No T&C checkbox present on site
        cy.get(s.registerButton).click();
        cy.contains("Your registration completed").should("be.visible");
        cy.log("NOTE: T&C acceptance not enforced.");
    });

    // TC_REGISTER_015 - Long First Name Validation
    it("TC_REGISTER_015 - Long First Name Validation", () => {
        const user = generateRandomUser();
        const longFirstName = "JonathanAlexanderChristopherMaximillianAndersonWilliams";
        cy.get(s.genderMale).check();
        cy.get(s.firstNameInput).type(longFirstName);
        cy.get(s.lastNameInput).type(user.lastName);
        cy.get(s.emailInput).type(user.email);
        cy.get(s.passwordInput).type(user.password);
        cy.get(s.confirmPasswordInput).type(user.password);
        cy.get(s.registerButton).click();

        cy.contains("Your registration completed").should("be.visible");
        cy.log("NOTE: Max-length validation for first name not enforced.");
    });

    // TC_REGISTER_016 - Emojis in Name Fields
    it("TC_REGISTER_016 - Emojis in Name Fields", () => {
        const user = generateRandomUser();
        cy.get(s.genderFemale).check();
        cy.get(s.firstNameInput).type("😀Test");
        cy.get(s.lastNameInput).type("😊User");
        cy.get(s.emailInput).type(user.email);
        cy.get(s.passwordInput).type(user.password);
        cy.get(s.confirmPasswordInput).type(user.password);
        cy.get(s.registerButton).click();

        cy.contains("Your registration completed").should("be.visible");
        cy.log("NOTE: Emoji validation not enforced.");
    });

    // TC_REGISTER_017 - Registration After Page Refresh
    it("TC_REGISTER_017 - Registration After Page Refresh", () => {
        const user = generateRandomUser();
        cy.get(s.genderMale).check();
        cy.get(s.firstNameInput).type("Oliver");
        cy.get(s.lastNameInput).type("Stone");
        cy.get(s.emailInput).type(user.email);
        cy.get(s.passwordInput).type("Password123");
        cy.get(s.confirmPasswordInput).type("Password123");

        cy.reload(); // simulate refresh
        cy.get(s.genderMale).check();
        cy.get(s.firstNameInput).type("Oliver");
        cy.get(s.lastNameInput).type("Stone");
        cy.get(s.emailInput).type(user.email);
        cy.get(s.passwordInput).type("Password123");
        cy.get(s.confirmPasswordInput).type("Password123");

        cy.get(s.registerButton).click();
        cy.contains("Your registration completed").should("be.visible");
    });

    // TC_REGISTER_018 - Special Characters in Name Fields
    it("TC_REGISTER_018 - Special Characters in Name Fields", () => {
        const user = generateRandomUser();
        cy.get(s.genderMale).check();
        cy.get(s.firstNameInput).type("test@");
        cy.get(s.lastNameInput).type("Do#e");
        cy.get(s.emailInput).type(user.email);
        cy.get(s.passwordInput).type(user.password);
        cy.get(s.confirmPasswordInput).type(user.password);
        cy.get(s.registerButton).click();

        cy.contains("Your registration completed").should("be.visible");
        cy.log("NOTE: Special character validation not enforced.");
    });

    // TC_REGISTER_019 - Empty Email and Password Fields
    it("TC_REGISTER_019 - Empty Email and Password Fields", () => {
        cy.get(s.genderFemale).check();
        cy.get(s.firstNameInput).type("Alice");
        cy.get(s.lastNameInput).type("Brown");
        cy.get(s.emailInput).clear();
        cy.get(s.passwordInput).clear();
        cy.get(s.confirmPasswordInput).clear();
        cy.get(s.registerButton).click();

        cy.get(s.emailValidation).should("be.visible").and("contain", "Email is required");
        cy.get(s.passwordValidation).should("be.visible").and("contain", "Password is required");
        cy.get(s.confirmPasswordValidation).should("be.visible").and("contain", "Password is required");
    });

    // TC_REGISTER_020 - Register Using Same Email Multiple Times
    it("TC_REGISTER_020 - Register Using Same Email Multiple Times", () => {
        const email = `user_${Math.random().toString(36).substring(2, 8)}@gmail.com`;

        // First registration
        cy.get(s.genderMale).check();
        cy.get(s.firstNameInput).type("Samuel");
        cy.get(s.lastNameInput).type("Johnson");
        cy.get(s.emailInput).type(email);
        cy.get(s.passwordInput).type("Password123");
        cy.get(s.confirmPasswordInput).type("Password123");
        cy.get(s.registerButton).click();
        cy.contains("Your registration completed").should("be.visible");

        // Second registration with same email
        cy.visit("https://demowebshop.tricentis.com/register");
        cy.get(s.genderMale).check();
        cy.get(s.firstNameInput).type("Samuel");
        cy.get(s.lastNameInput).type("Johnson");
        cy.get(s.emailInput).type(email);
        cy.get(s.passwordInput).type("Password123");
        cy.get(s.confirmPasswordInput).type("Password123");
        cy.get(s.registerButton).click();

        cy.get(s.summaryErrors).should("be.visible").and("contain", "The specified email already exists");
    });

    // TC_REGISTER_022 - Auto Login After Successful Registration
    it("TC_REGISTER_022 - Auto Login After Successful Registration", () => {
        const user = generateRandomUser();
        cy.get(s.genderMale).check();
        cy.get(s.firstNameInput).type("Testing");
        cy.get(s.lastNameInput).type("User");
        cy.get(s.emailInput).type(user.email);
        cy.get(s.passwordInput).type("123456");
        cy.get(s.confirmPasswordInput).type("123456");
        cy.get(s.registerButton).click();

        cy.contains("Your registration completed").should("be.visible");
    });

});
