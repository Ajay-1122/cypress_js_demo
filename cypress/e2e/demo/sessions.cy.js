describe('Handling sessions', () =>{

    beforeEach(() => {

        cy.session('loginSession', () => {
            cy.LoginSession()

        })
    })


    it('Assert logged in session', () => {

        cy.visit('https://practicetestautomation.com/logged-in-successfully/')
        cy.contains('Logged In Successfully').should('be.visible')
    })


    it('Assert logged in session', () => {

        cy.visit('https://practicetestautomation.com/logged-in-successfully/')
        cy.contains('Logged In Successfully').should('be.visible')
    })


    it('Assert logged in session and logout', () => {

        cy.visit('https://practicetestautomation.com/logged-in-successfully/')
        cy.contains('Log out').click()
    })
})