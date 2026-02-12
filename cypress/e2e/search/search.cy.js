import { searchSelectors as s } from "../../support/searchSelectors";

describe("Search Module Tests", () => {
    const email = "mahebi6673@foxroids.com";
    const password = "password";

    beforeEach(() => {
        cy.visitHomePage();
    });

    // TC_Search_001 - Valid keyword search
    it("TC_Search_001 - Valid keyword search", () => {
        cy.login(email, password);
        cy.get(s.searchInput).click().type("Simple computer");
        cy.get(s.searchButton).click();
        cy.get(s.productLink("Simple Computer")).should('exist');
    });

    // TC_Search_002 - Search without input
    it("TC_Search_002 - Search without input", () => {
        cy.get(s.searchButton).click();
        cy.on('window:alert', (text) => {
            expect(text).to.equal('Please enter some search keyword');
        });
    });

    // TC_Search_003 - Search with non-existing keyword
    it("TC_Search_003 - Non-existing keyword", () => {
        cy.get(s.searchInput).click().type("Table");
        cy.get(s.searchButton).click();
        cy.contains("No products were found that matched your criteria.").should('exist');
    });

    // TC_Search_013 - Search with numeric input
    it("TC_Search_013 - Numeric input", () => {
        cy.get(s.searchInput).click().type("666");
        cy.get(s.searchButton).click();
        cy.contains("No products were found that matched your criteria.").should('exist');
    });

    // TC_Search_018 - SQL Injection prevention
    it("TC_Search_018 - SQL injection prevention", () => {
        cy.get(s.searchInput).click().type("' OR 1=1");
        cy.get(s.searchButton).click();
        cy.contains("No products were found that matched your criteria.").should('exist');
    });

    after(()=>{
        cy.log("All search tests completed")
    })
    
});
