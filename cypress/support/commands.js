Cypress.Commands.add('login', (email, password) => {
    cy.get(".ico-login").click();
    cy.get(".email").type(email);
    cy.get("#Password").type(password);
    cy.get(".button-1.login-button").click();
    cy.get(".account")
      .should("be.visible")
      .and("contain", email);
});


Cypress.Commands.add("visitHomePage", () => {
    cy.visit("https://demowebshop.tricentis.com/");
});
