import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('the user is on the login page', () => {
  cy.visit('/practice-test-login')
})

When('the user enters login details', (dataTable) => {

  const data = dataTable.rowsHash()

  cy.get('[id="username"]').type(data.username)

  cy.get('[id="password"]').type(data.password)
})

When('the user clicks the Login button', () => {
  cy.get('[id="submit"]').click()
})

Then('the user should see the dashboard', () => {
  cy.url().should('include', 'logged-in-successfully')
})
