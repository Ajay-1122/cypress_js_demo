import {myData} from '../../fixtures/data'

//  ./  - current folder
//  ../ - parent level - one level up

it("data entry form - fixture concept", ()=>{

    cy.visit('https://testautomationpractice.blogspot.com')
    cy.url().should('include', 'testautomationpractice')

    cy.get('[class="titlewrapper"]').should('have.text', '\n\nAutomation Testing Practice\n\n')


    cy.fixture("dataEntryInputs").then((data) => {

        cy.get('[id="name"]').focus()
            .clear()
            .type(data.name)

        cy.get('[id="email"]').focus()
            .type(data.email)

        cy.get('[id="phone"]').focus()
            .type(data.phone)

        cy.get('[id="textarea"]').focus()
            .type(data.address)

        cy.get(`#${data.gender}`).check()

        cy.get(`#${data.day}`).check()

        cy.get('[id="country"]').select(data.country)


        cy.get('input[id="datepicker"]').type(data.date1)

        cy.get('[id="start-date"]').type(data.startDate)
        cy.get('[id="end-date"]').type(data.endDate)

        cy.get('[class="submit-btn"]').click()

    })

}) 

it("test data as const - fixture concept", () => {

    cy.visit('https://testautomationpractice.blogspot.com')
    cy.url().should('include', 'testautomationpractice')


    cy.get('[id="name"]').focus()
            .clear()
            .type(myData.name)

    cy.get('[id="email"]').focus()
            .type(myData.email)

}) 


const users = [
    {
        name: "ajay",
        email: "test123@test.com"
    },
    {
        name: "man",
        email: "tets12@example.com"
    }
]

it('data driven testing - fixture concept', ()=>{

    cy.visit('https://testautomationpractice.blogspot.com')
    cy.url().should('include', 'testautomationpractice')


    users.forEach((user) => {

         cy.get('[id="name"]').focus()
            .clear()
            .type(user.name)

        cy.get('[id="email"]').focus()
            .type(user.email)

    })
})


const users1 = [
    {
        name: "ajay",
        email: "test123@test.com",
        phone: "7882084658"
    },
    {
        name: "ajay",
        email: "test123@test.com",
        phone: "3567856"
    }
]


it('data driven testing - fixture concept', ()=>{

    cy.visit('https://testautomationpractice.blogspot.com')
    cy.url().should('include', 'testautomationpractice')


    users1.forEach((user) => {

         cy.get('[id="name"]').focus()
            .clear()
            .type(user.name)

        cy.get('[id="email"]').focus()
            .type(user.email)

        cy.get('[id="phone"]').focus()
            .type(user.phone)
    })
})



const randomNum = Math.ceil(Math.random() * 1000) // 123.64 - round up to 123, Ceil - rounds above the value
const dynamicEmail = `example${randomNum}@test.com`

it('data driven testing', ()=>{

    cy.visit('https://testautomationpractice.blogspot.com')
    cy.url().should('include', 'testautomationpractice')

    cy.get('[id="name"]').focus()
        .clear()
        .type('ahasy')

    cy.get('[id="email"]').focus()
        .type(dynamicEmail)


})