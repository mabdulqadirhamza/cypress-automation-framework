export const registrationSelectors = {
    // Gender
    genderMale: "#gender-male",
    genderFemale: "#gender-female",

    // Personal info inputs
    firstNameInput: "#FirstName",
    lastNameInput: "#LastName",
    emailInput: "#Email",
    passwordInput: "#Password",
    confirmPasswordInput: "#ConfirmPassword",

    // Buttons
    registerButton: "#register-button",

    // Validation messages
    firstNameValidation: '[data-valmsg-for="FirstName"]',
    lastNameValidation: '[data-valmsg-for="LastName"]',
    emailValidation: '[data-valmsg-for="Email"]',
    passwordValidation: '[data-valmsg-for="Password"]',
    confirmPasswordValidation: '[data-valmsg-for="ConfirmPassword"]',
    summaryErrors: ".validation-summary-errors",

    // Success message
    registrationSuccessMessage: ".result",

    // Header links for post-registration assertions
    loginLink: ".ico-login",
    logoutLink: ".ico-logout",
};
