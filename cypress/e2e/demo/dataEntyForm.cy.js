/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference types="@4tw/cypress-drag-drop" />

describe('Enter details and filling the form ', () =>{

    before(() => {
        console.log('test suite execution started')
    })

    beforeEach( ()=> {

        // const base_Url = cy.env(baseUrl) || 'https://testautomationpractice.blogspot.com'

        cy.visit('https://testautomationpractice.blogspot.com')
        cy.url().should('include', 'testautomationpractice')
    })

    after(() => {
        console.log('test suite execution completed!')
    })

    afterEach(() => {
        console.log("Useful for teardown steps, resetting the state of the page!")
    })

    it.only("data entry form", ()=>{

        console.log(`test running in: ${Cypress.browser.name}`)
        console.log(`browser version:${Cypress.browser.version} `)
        cy.viewport(550, 750)


        if(Cypress.browser.name === 'chrome') {
            cy.get('[id="name"]').focus()
            .clear()
            .type('Ajay')
        }

        cy.get('[class="titlewrapper"]').should('have.text', '\n\nAutomation Testing Practice\n\n')

        cy.get('[id="name"]').focus()
            .clear()
            .type('Ajay')

        cy.get('[id="name"]').invoke('val').then((nameValue) => {
            assert.equal(nameValue, 'Ajay', 'Name input value is incorrect')
        })

        cy.get('[id="email"]').focus()
            .type('example@test.com')

        cy.get('#email').invoke('val').then((emailValue) => {
            expect(emailValue).to.equal('example@test.com')
            })

        cy.get('[id="phone"]').focus()
            .type(7353847394)

        cy.get('[id="textarea"]').focus()
            .type('my address')

        cy.get('[id="textarea"]').invoke('val').then((textValue) => {
            assert.equal(textValue, 'my address', 'Text area input value is incorrect')
            })
        

        cy.get('[id="male"]').check()

        // cy.reload()

        cy.get('[id="monday"]').check()

        cy.get('[id="country"]').select('India')

        cy.get('select').eq(1).focus()
            .select('Blue')

        cy.get('input[id="datepicker"]').type('05/06/2026')

        cy.get('[id="start-date"]').type('2026-02-25')
        cy.get('[id="end-date"]').type('2026-03-26')

        cy.get('[class="submit-btn"]').click()
        cy.get('[id="result"]').should('be.visible')
        
    }) 

    it("Dynamic Button, alerts, search etc.,", ()=> {

        const initialValue = cy.get('[name="start"]').invoke('text')
        cy.contains('START').click() 

        cy.get('[name="stop"]').should('not.have.text', 'START')
        const finalValue = cy.get('[name="stop"]').invoke('text')
        cy.get('[name="stop"]').should('have.text', 'STOP')

        if(initialValue && finalValue) {
            cy.log(`before click : ${initialValue}`)
            cy.log(`after click : ${finalValue}`)
        }

        cy.get('[ondblclick="myFunction1()"]').dblclick()
        cy.get('input[id="field2"]').should('have.value', 'Hello World!')
    })

    it(' Search,  Tooltips', () => {

        cy.get('[id="Wikipedia1_wikipedia-search-input"]').clear().focus().type('today')
        cy.get('[class="wikipedia-search-button"]').click()
        cy.contains('Search results').should('be.visible')

        cy.get('[class="wikipedia-search-results"] a').each(($element) => {
            cy.wrap($element).invoke('text').then(text => {
                cy.log(text)
                expect(text.toLowerCase().trim()).to.include('today')
            })
        })

        cy.get('[class="dropbtn"]').scrollIntoView().trigger('mouseover')
        cy.get('[class="dropdown-content"]').should('exist').should('include.text', 'Mobiles').and('include.text', 'Laptops')
    })

    it('Alerts & Popups', () => {
        cy.get('[id="HTML9"]').scrollIntoView()

        // simple alert
        cy.window().then((windowObj) => {
            cy.stub(windowObj, 'alert').as('myAlert')
        })

        cy.get('[id="alertBtn"]').click()
        cy.get('@myAlert').should('have.been.calledOnce').and('have.been.calledOnceWith', 'I am an alert box!')


        cy.on('window:alert', (text) => {
            expect(text).to.include('I am an alert box!')
            return true
        })

        cy.get('[id="alertBtn"]').click()


        //confirmation alert

        cy.on('window:confirm', (text) => {
            expect(text).to.include('Press a button!')
            return true
        })

        cy.get('[id="confirmBtn"]').click()

        //prompt alert

         cy.on('window:prompt', (text) => {
            expect(text).to.include('Please enter your name: Harry Potter')
            return true
        })

        cy.get('[id="promptBtn"]').click()


        //new tab

        cy.window().then((myWinObj) => {
            cy.stub(myWinObj, 'open').callsFake((url) => {
                myWinObj.location.href = url
            }).as('myNewTab')
        })

        cy.contains('button', 'New Tab').click()
        cy.get('@myNewTab').should('have.been.called')
        cy.url().should('not.eq', 'https://testautomationpractice.blogspot.com/')
        cy.url().should('eq', 'https://www.pavantestingtools.com/')


    })

    it('Pop up', ()=>{
         //pop up
         cy.window().then((myWinObj) => {
            cy.stub(myWinObj, 'open').as('mypopup')
        })

        cy.get('[id="PopUp"]').click()
        cy.get('@mypopup').should('have.been.called')
    })

    it('handling Static and Dynamic Web Table', () => {

        cy.contains('Static Web Table').scrollIntoView()

        cy.contains('Static Web Table').parent().find('table').as('staticTable')

        cy.get('@staticTable').find('tbody tr').each((row, index) => {
            const rowText = row.text().trim()
            cy.log(`Static row  ${index} : ${rowText}`)
        })

        cy.get('@staticTable').contains('Learn Java').parent('tr').within(() => {
            cy.get('td').eq(0).should('have.text', 'Learn Java')
            cy.get('td').eq(1).should('have.text', 'Mukesh')
            cy.get('td').eq(2).should('have.text', 'Java')
            cy.get('td').eq(3).should('have.text', '500')
        })

        //dynamic table

        cy.get('[id="HTML12"]').find('table').as('dynamicTable')

        cy.get('@dynamicTable').find('tbody tr').each((row, index) => {
            const name = row.find('td').eq(0).text().trim()
            const memory = row.find('td').eq(4).text().trim()
            cy.log(`dynamic table ${index}, name : ${name} and memory : ${memory}`)
        })
    })

    it('cypress x-path' , () => {

        cy.xpath('//input[@id="name"]').type("majs")
    })

    it('handling shadow DOM elements', () =>{

        cy.get('[id="shadow_host"]').as('domEle')

        cy.get('@domEle').scrollIntoView()

        cy.get('@domEle').shadow().find('[id="shadow_content"]').should('have.text', 'Mobiles')
        cy.get('@domEle').shadow().find('[id="nested_shadow_host"]').shadow().contains('Laptops')
        cy.get('@domEle').shadow().find('input[type="text"]').type('fsh')
        
    }) 
    
    it('handling hidden elements', () => {

        cy.contains('Footer Links').scrollIntoView()
        cy.get('[class="widget-content"] li a').contains('Hidden Elements & AJAX').click()
        cy.contains('Hidden Elements & AJAX').should('be.visible')

        cy.get('[id="container"] [id="input2"]').should('not.be.visible')
        cy.get('[id="toggleInput"]').click()
        cy.get('[id="container"] [id="input2"]').should('be.visible').type('afsh')

        cy.get('[id="toggleCheckbox"]').click()
        cy.get('[id="checkbox2"]').should('be.visible').check()
    })

    it('handling drag and drop feature', () =>{

        // cy.get('[id="draggable"]').trigger('mousedown')
        // cy.get('#droppable').trigger('mousemove')
        // cy.get('[id="droppable"]').trigger('mouseup')

        cy.get('[id="draggable"]').drag('[id="droppable"]', {force: true})
        cy.contains('Dropped!').should('be.visible')
    })

    it('handling file upload', () => {

        cy.contains('Upload Files').scrollIntoView()

        cy.get('[id="singleFileInput"]').selectFile('cypress/fixtures/Screenshot.png')
        cy.get('[id="singleFileForm"] button').click()

        cy.get('[id="singleFileStatus"]').should('include.text', 'Single file selected: ')
    })

    it('handling download files', () => {

        cy.contains('Footer Links').scrollIntoView()

        cy.contains('Download Files').should('have.attr', 'href').then((link) => {
            cy.visit(link)
        })

        cy.get('[class="post-body entry-content"]').should('be.visible')
        cy.get('[id="inputText"]').focus().type('this is cypress js')
        cy.get('[id="generateTxt"]').click()
        cy.get('[id="txtDownloadLink"]').should('be.visible').click()

        cy.readFile('cypress/downloads/info.txt').should('exist')


    })

    it('validations', () =>{

        cy.get('[ondblclick="myFunction1()"]').dblclick()
        cy.get('input[id="field2"]').should('have.value', 'Hello World!')

        cy.get('[id="name"]').should('have.attr', 'placeholder')
        cy.get('[id="name"]').should('have.css', 'display', 'block')

        cy.contains('Footer Links').scrollIntoView()
        cy.contains('Download Files').click()
        cy.url().should('eq', 'https://testautomationpractice.blogspot.com/p/download-files_25.html')

        cy.contains('Download Files').eq(0).should('be.visible')

        
    })
})

it('login flow', () => {
    cy.visit('https://practicetestautomation.com/practice-test-login/')
    cy.get('[id="login"]').should('be.visible')
    cy.get('[id="username"]').focus()
        .type('student')
    cy.get('[id="password"]').focus().type('Password123')

    cy.get('[id="submit"]').click()
    cy.get('[class="post-title"]').should('be.visible')
        .should('have.text', 'Logged In Successfully')

    cy.contains('Log out').click()
    cy.get('[id="login"]').should('be.visible')


    cy.get('[id="username"]').focus()
        .type('studentaa')
    cy.get('[id="password"]').focus().type('Password123')

    cy.get('[id="submit"]').click()
    cy.get('[id="error"]').should('be.visible').should('have.text', 'Your username is invalid!')

})

it.skip('handling infinite scrolling', () => {

    cy.visit('https://www.airtable.com/videos/categories')

    cy.get('[class^="MediaCarouselCard"]').then((cards) => {
        const initialCardsCount = cards.length
        cy.log(`cards Count : ${initialCardsCount}`)
    })

    cy.contains('Load more').scrollIntoView().click()

    cy.get('[class^="MediaCarouselCard"]').then((cards) => {
        const finalCardsCount = cards.length
        cy.log(`cards Count : ${finalCardsCount}`)
    })

})






