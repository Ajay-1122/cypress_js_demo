
import {DataEntryForm} from '../../support/pages/dataentyrPage.page'
import dataEntryInputs from '../../fixtures/dataEntryInputs.json'
import {myData} from '../../fixtures/data'

it('data entry form - POM', () => {
  cy.visit('https://testautomationpractice.blogspot.com')

  cy.get('[class="titlewrapper"]').should('have.text', '\n\nAutomation Testing Practice\n\n')

  let dataEntryForm = new DataEntryForm()

  dataEntryForm.fillForm(dataEntryInputs)

  cy.get('[class="submit-btn"]').click()
  cy.get('[id="result"]').should('be.visible')
}) 

it('using fixture data - POM', () => {
   cy.visit('https://testautomationpractice.blogspot.com')
    let dataEntryForm1 = new DataEntryForm();
    
    cy.get(dataEntryForm1.name).type(myData.name)
    cy.get(dataEntryForm1.email).type(myData.email)
    cy.get(dataEntryForm1.phone).type(myData.phone);
    cy.get(dataEntryForm1.address).type(myData.address)
    cy.get(dataEntryForm1.gender).check()
    cy.get(dataEntryForm1.day).check()
    cy.get(dataEntryForm1.country).select(myData.country);
    cy.get(dataEntryForm1.color).select(myData.color)
    cy.get(dataEntryForm1.datePicker).type(myData.date1 , { force: true })
    cy.get(dataEntryForm1.startDatePicker).type(myData.startDate, { force: true })
    cy.get(dataEntryForm1.submit).click();
    cy.get(dataEntryForm1.result).should('be.visible');

  })