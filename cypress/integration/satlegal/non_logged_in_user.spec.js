describe('Non-logged In User Test', function() {
  it('Visits the main page', function() {
    cy.visit('/');
    cy.url().should('include', '/auth/login') // => true
  })
})
