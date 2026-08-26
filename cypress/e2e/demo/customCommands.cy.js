

import {myData} from '../../fixtures/data'
import {fileUpload} from '../../support/utility/helpers'

import {fillForm} from '../../support/utility/helpers'



it("Creating custom commands", ()=>{

        cy.visit('https://testautomationpractice.blogspot.com')
        cy.url().should('include', 'testautomationpractice')

        cy.get('[class="titlewrapper"]').should('have.text', '\n\nAutomation Testing Practice\n\n')

        cy.fillDataEntryForm(myData)
})

it('reusable function', () => {
    cy.visit('https://testautomationpractice.blogspot.com')
    cy.url().should('include', 'testautomationpractice')

    // fillForm(myData)
    cy.contains('Upload Files').scrollIntoView()
    fileUpload('cypress/fixtures/Screenshot.png')

})

it('Login and Logout commads', ()=>{
    
    cy.visit('https://practicetestautomation.com/practice-test-login/')

    cy.Login('student', 'Password123')

    // verify the flow which we need here

    cy.Logout()

})


 


