Cypress.Commands.add('LoginSession', () => {
    cy.visit('https://practicetestautomation.com/practice-test-login/')
    cy.get('[id="login"]').should('be.visible')
    cy.get('[id="username"]').focus()
        .type('student')
    cy.get('[id="password"]').focus().type('Password123')

    cy.get('[id="submit"]').click()
    cy.get('[class="post-title"]').should('be.visible')
        .should('have.text', 'Logged In Successfully')
})