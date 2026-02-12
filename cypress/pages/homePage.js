class Homepage {
    loginBtn = ".ico-login";
    searchBtn = "input[value='search']";

    openLogin() {
        cy.get(this.loginBtn).click();
    }
}

module.exports = new Homepage();