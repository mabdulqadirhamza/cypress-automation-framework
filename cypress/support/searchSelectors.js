// cypress/selectors/searchSelectors.js
export const searchSelectors = {
    searchInput: "#small-searchterms",
    searchButton: ".button-1.search-box-button",
    noProductsMessage: ".no-result", // fallback, can be cy.contains as well
    productLink: (productName) => `a[href="/${productName.toLowerCase().replace(/\s/g,'-')}"]`
};
