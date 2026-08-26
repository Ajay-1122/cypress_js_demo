describe('Cookies', () => {

    beforeEach(() => {

        cy.visit('https://example.cypress.io/commands/cookies')

    })

    it('set cookie', () =>{

        cy.get('[id="getCookies"] [class="set-a-cookie btn btn-success"]').click()

        cy.getCookies().should('have.length', 1)

        cy.getCookies().then((cookie) => {

            expect(cookie[0]).to.have.property('name', 'token')
            expect(cookie[0]).to.have.property('value', '123ABC')
            // expect(cookie).to.have.property('name', 'token')
        })

       
    })
})