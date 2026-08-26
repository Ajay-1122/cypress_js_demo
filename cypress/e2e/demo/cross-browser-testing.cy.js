//  1. defaultBrowser, CLI falgs: --browser=chrome , edge, firefox 


it('Cross browser testing', () => {

    cy.visit('https://testautomationpractice.blogspot.com')
    cy.url().should('include', 'testautomationpractice')

    console.log(`test running in: ${Cypress.browser.name}`)
    console.log(`browser version:${Cypress.browser.version} `)
    cy.viewport(550, 750)


    if(Cypress.browser.name === 'chrome') {

        cy.get('[id="name"]').focus()
        .clear()
        .type('Ajay')

    } else if (Cypress.browser.name === 'firefox') {

        cy.get('[id="name"]').focus()
        .clear()
        .type('cypress')

    } else if (Cypress.browser.name === 'edge'); {

        cy.log('test running in edge')

    }
})