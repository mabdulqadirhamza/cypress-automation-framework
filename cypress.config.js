const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // projectId: "6ktuff",
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.js',
    watchForFileChanges: true,
    experimentalStudio: true,
    setupNodeEvents(on, config) {
    },
  },
  
});
