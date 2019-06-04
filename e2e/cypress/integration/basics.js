describe("The basics", () => {
  it("Should visit the app and see the app title.", function() {
    /* Visit the app via  login  custom command. */
    cy.fixture("contexts/instructor.json")
      .then(cy.login)
      .then(response => {
        expect(response).to.exist;
        expect(response.redirectedToUrl).to.exist;
        /* Custom command  visitRedirect  to follow the redirect. */
        cy.visitRedirect(response);
        cy.get(`#lti_root`).contains(/LTI/);
      });
  });
});
