// cypress/support/pages/searchPage.js
import { searchSelectors as s } from "../../selectors/searchSelectors";

export class SearchPage {

    enterSearchTerm(term) {
        cy.get(s.searchInput).clear().type(term);
    }

    clickSearchButton() {
        cy.get(s.searchButton).click();
    }

    searchForProduct(term) {
        this.enterSearchTerm(term);
        this.clickSearchButton();
    }

    verifyProductExists(productName) {
        cy.get(s.productLink(productName)).should("exist");
    }

    verifyNoProductsMessage() {
        cy.contains("No products were found that matched your criteria.").should("exist");
    }
}
