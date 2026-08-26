export function fillForm(DataEntryInputs){

        cy.get(this.name).focus()
            .clear()
            .type(DataEntryInputs.yourName)

        cy.get(this.email).focus()
            .type(DataEntryInputs.email)

        cy.get(this.phone).focus()
            .type(DataEntryInputs.phone)

        cy.get(this.address).focus()
            .type(DataEntryInputs.address)
        

        cy.get(this.gender).check()

        cy.get(this.day).check()

        cy.get(this.country).select(DataEntryInputs.country)

        cy.get(this.datePicker).type(DataEntryInputs.date1)

        cy.get(this.startDatePicker).type(DataEntryInputs.startDate)
        cy.get(this.endDatePicker).type(DataEntryInputs.endDate)

    }

export function fileUpload(path) {
    
    cy.get('[id="singleFileInput"]').selectFile(path)
    cy.get('[id="singleFileForm"] button').click()
}

export function Login(usareName) {
    cy.get('[id="login"]').should('be.visible')
    cy.get('[id="username"]').focus()
        .type('student')
    cy.get('[id="password"]').focus().type('Password123')

    cy.get('[id="submit"]').click()
}


export function generateRandomEmail() {

    const randomNum = Math.ceil(Math.random() * 1000) // 123.64 - round up to 123, Ceil - rounds above the value
    const dynamicEmail = `example${randomNum}@test.com`
    return dynamicEmail

}