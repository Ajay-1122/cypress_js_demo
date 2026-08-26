
describe('verify storage data', () => {

    it('local storage', () => {

        cy.visit('https://example.cypress.io/commands/storage#clearlocalstorage')

        const populateStorageData = '[class="ls-btn btn btn-success"]'

        cy.get(populateStorageData).click()

        cy.get(populateStorageData).should(() => {

            expect(localStorage.getItem('prop1')).to.eq('red')
            expect(localStorage.getItem('prop2')).to.eq('blue')
            expect(localStorage.getItem('prop3')).to.eq('magenta')
        })

        cy.clearAllLocalStorage()

        cy.getAllLocalStorage().should(() => {

        expect(localStorage.getItem('prop1')).to.be.null
        expect(localStorage.getItem('prop2')).to.be.null
        expect(localStorage.getItem('prop3')).to.be.null

    })

    })
})