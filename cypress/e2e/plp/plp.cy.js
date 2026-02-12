import { plpSelectors as s } from "../../support/plpSelectors";

describe("PLP Module test", () => {
    beforeEach(() => {
        cy.visitHomePage();
    });

    //TC_PLP_001
    it("TC_PLP_001 - PLP Books-> Page Path", () => {
        cy.get(s.booksCategoryLink).first().click();
        // pick the first Home breadcrumb if multiple exist
        cy.get(s.homeBreadcrumbLink).first().click();
        cy.url().should('eq', "https://demowebshop.tricentis.com/");
    });

    //TC_PLP_003
    it("TC_PLP_003 - PLP Books->Sort by", () => {
        cy.get(s.booksCategoryLink).first().click();
        cy.get(s.sortByDropdown).select('Name: A to Z');
        cy.get(s.sortByDropdown).select('Name: Z to A');
        cy.get(s.sortByDropdown).select('Price: Low to High');
        cy.get(s.sortByDropdown).select('Price: High to Low');
        cy.get(s.sortByDropdown).select('Created on');
        cy.url().should('include', "/books");
    });

    //TC_PLP_013
    it("TC_PLP_013 - PLP Books-> Filter By Price", () => {
        cy.get(s.booksCategoryLink).first().click();
        cy.get(s.priceUnder25).click();
        cy.contains("Under 25.00").should('exist');
        cy.get(s.removePriceFilterButton).click();

        cy.get(s.price25to50).click();
        cy.contains("25.00 - 50.00").should('exist');
        cy.get(s.removePriceFilterButton).click();

        cy.get(s.priceOver50).click();
        cy.contains("Over 50.00").should('exist');
    });

    //TC_PLP_015
    it("TC_PLP_015 - PLP Books->Product Description", () => {
        cy.get(s.booksCategoryLink).first().click();
        cy.url().should('include', "/books");

        cy.get(s.productItem).first().within(() => {
            cy.get(s.productTitle).should('exist');
            cy.get(s.productPicture).should('exist');
            cy.get(s.addToCartButton).should('exist');

            // only check Add to Compare if it exists
            cy.get('input[value="Add to compare list"]').then(($el) => {
                if ($el.length) {
                    cy.wrap($el).should('exist');
                } else {
                    cy.log("Add to Compare button not available for this product");
                }
            });

            // only check Add to Wishlist if it exists
            cy.get('input[value="Add to wishlist"]').then(($el) => {
                if ($el.length) {
                    cy.wrap($el).should('exist');
                } else {
                    cy.log("Add to Wishlist button not available for this product");
                }
            
            });
        });
    });
});
