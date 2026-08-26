// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillDataEntryForm', (user) => {

   cy.get('[id="name"]').focus()
            .clear()
            .type(user.name)

  cy.get('[id="email"]').focus()
      .type(user.email)

  cy.get('[id="phone"]').focus()
      .type(user.phone)

  cy.get('[id="textarea"]').focus()
      .type(user.address)

  cy.get(`#${user.gender}`).check()

  cy.get(`#${user.day}`).check()

  cy.get('[id="country"]').select(user.country)


  cy.get('input[id="datepicker"]').type(user.date1)

  cy.get('[id="start-date"]').type(user.startDate)
  cy.get('[id="end-date"]').type(user.endDate)

})

Cypress.Commands.add('getIframeBody', (iframeSelector) => {
  return cy
    .get(iframeSelector)
    .its('0.contentDocument.body')
    .should('not.be.empty')
    .then(cy.wrap);
});


Cypress.Commands.add('Login', (usareNmae, password) =>{
  cy.get('[id="login"]').should('be.visible')
    cy.get('[id="username"]').focus()
        .type(usareNmae)
    cy.get('[id="password"]').focus().type(password)

    cy.get('[id="submit"]').click()
})

Cypress.Commands.add('Logout', ()=>{
  cy.contains('Log out').click()
  cy.get('[id="login"]').should('be.visible')
})


Cypress.Commands.add('loginPractice', () => {
   cy.visit('https://practicetestautomation.com/practice-test-login')
    cy.get('[id="login"]').should('be.visible')
    cy.get('[id="username"]').focus()
        .type('student')
    cy.get('[id="password"]').focus().type('Password123')

    cy.get('[id="submit"]').click()
    cy.get('[class="post-title"]').should('be.visible')
        .should('have.text', 'Logged In Successfully')
})

Cypress.Commands.add('loginViaAPI', (username, password) => {
  cy.session(
    [username, password],
    () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:3000/signin', 
        body: {
          username: username,   
          password: password,
        },
      }).then((response) => {
        // Ensure request succeeded
        expect(response.status).to.eq(200);

        const token = response.body.token; 
        window.localStorage.setItem('token', token); 

        // Store in Cypress env so you can use it in API-only tests
        Cypress.env('authToken', token);
      });
    },
    {
      validate() {
        // Optional: Verifies session is still valid by checking the local storage key
        cy.getAllLocalStorage().then((storage) => {
          expect(storage).to.not.be.empty;
        });
      },
    }
  );
});





