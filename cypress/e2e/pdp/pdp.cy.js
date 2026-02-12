import { selectors } from "../../support/selectors";
import { pdpSelectors as s } from "../../support/pdpSelectors";

describe("PDP Module test", () => {
    beforeEach(() => {
        cy.visitHomePage();
    });

    //TC_PDP_001
    it("TC_PDP_001 - View Product Details", () => {
        cy.get(s.electronicsCategoryLink).first().click(); // click the first Electronics link
        cy.url().should('include', "/electronics");

        cy.get(s.subCategoryItem).first().click();
        cy.get(s.productPicture).first().click();

        cy.get(s.emailAFriendButton).should('exist');
        cy.get(s.addToCompareListButton).should('exist');
    });

    //TC_PDP_002
    it("TC_PDP_002 - Product Description Page Electronics", () => {
        cy.get(s.electronicsCategoryLink).first().click();
        cy.url().should('include', "/electronics");

        cy.get(s.subCategoryItem).first().click();
        cy.get(s.productPicture).first().click();

        cy.get(s.mainProductImage).should('be.visible');
        cy.get(s.productName).should('exist');
        cy.get(s.shortDescription).should('exist');
        cy.get(s.productReviewsLink).should('exist');
    });

    //TC_PDP_010
    it("TC_PDP_010 - PDP Electronics -> Product Rating", () => {
        cy.get(s.electronicsCategoryLink).first().click();
        cy.url().should('include', "/electronics");

        cy.get(s.subCategoryItem).first().click();
        cy.get(s.productPicture).first().click();

        cy.get(s.productRating).should('exist');
    });

    //TC_PDP_016
    it("TC_PDP_016 - PDP Electronics -> Product Price", () => {
        cy.get(s.electronicsCategoryLink).first().click();
        cy.url().should('include', "/electronics");

        cy.get(s.subCategoryItem).first().click();
        cy.get(s.productPicture).first().click();

        cy.get(s.productPrice).should('exist');
    });

    //TC_PDP_037
    it("TC_PDP_037 - PDP Apparel & Shoes -> Size Selector", () => {
        cy.get(s.apparelShoesCategoryLink).first().click();
        cy.url().should('include', "/apparel-shoes");

        cy.get(s.addToCartPDPButton).first().click();
        cy.get(s.sizeDropdown).select('2X');

        cy.contains("2X").should('exist');
    });
});
