
export class DataEntryForm {

    constructor() {

        this.heading = '[class="titlewrapper"]',
        this.name = '[id="name"]',
        this.email = '[id="email"]',
        this.phone = '[id="phone"]',
        this.address = '[id="textarea"]',
        this.gender = '[id="male"]',
        this.day = '[id="monday"]',
        this.country = '[id="country"]',
        this.color = '[id="colors"]',
        this.datePicker = 'input[id="datepicker"]',
        this.startDatePicker = '[id="start-date"]',
        this.endDatePicker = '[id="end-date"]',
        this.submit = '[class="submit-btn"]'

    }


    fillForm(DataEntryInputs){

        cy.get(this.name).focus()
            .clear()
            .type(DataEntryInputs.name)

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

}


// export default new DataEntryForm()