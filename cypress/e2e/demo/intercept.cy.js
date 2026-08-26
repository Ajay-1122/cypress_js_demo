//To run this test need to run the cypress real world application locally - github repo url to clone: https://github.com/cypress-io/cypress-realworld-app.git  

describe.skip("interception", ()=> {

    beforeEach(() => {

        cy.visit('http://localhost:3000/signin')
        cy.get('[id="username"]').type('CypressPractice')
        cy.get('[id="password"]').type('Password123')
        cy.get('[data-test="signin-submit"]').click()
    })


    it('Simple real API call', () => {

        cy.intercept('GET', '**/notifications').as('getNotification')
        cy.reload()

        cy.wait('@getNotification').then((interception) => {
            expect(interception.request.method).to.contain('GET')
            expect(interception.response.statusCode).to.eq(200)
           
        })

    })


    it('Request mocking', () => {

        cy.intercept('GET', '**/notifications' , (request) => {

            request.headers['cypress-test-header'] = 'demo going on'


        }).as('getNotification')
        cy.reload()

        cy.wait('@getNotification').then((interceptionData) => {

           expect(interceptionData.request.method).to.contain('GET')
            expect(interceptionData.response.statusCode).to.eq(200)
            expect(interceptionData.request.headers).to.have.property('cypress-test-header', 'demo going on')
           
        })
    }) 

    it('Response mocking', () => {

        cy.intercept('GET', '**/notifications' ,  {

            statusCode: 200,
            body: {

                "results": [
                    {
                        "userFullName": "Ajay K N",
                        "id": "kCZ1WTa4Qv",
                        "uuid": "593bcbe4-6f25-409c-9a49-beea7397779c",
                        "userId": "XEPGyu9lA",
                        "transactionId": "JAu1mmeCf",
                        "likeId": "vUSPtl-vl",
                        "isRead": false,
                        "createdAt": "2026-07-25T03:58:02.622Z",
                        "modifiedAt": "2026-07-25T03:58:02.622Z"
                    }
                ]
                
            }

        }).as('mockingResponse')
        cy.reload()

        cy.wait('@mockingResponse').then((interceptionData) => {

            expect(interceptionData.request.method).to.contain('GET')
            expect(interceptionData.response.statusCode).to.eq(200)
            expect(interceptionData.response.body.results[0]).to.have.property('userFullName', 'Ajay K N')
            expect(interceptionData.response.body.results[0]).to.have.property('transactionId', 'JAu1mmeCf')
           
        })
    })

    it('API stubbing' , () => {


        cy.intercept('POST', '/graphql', (request) => {

            const body = request.body || {}
            const query = (body.query || '').toLowerCase()
            const opName = (body.operationName || '')
            const isCreateOp = opName === 'CreateBankAccount' || query.includes('createbankaccount')

            if (isCreateOp) {

                expect(request.body.variables).to.include({
                    bankName: 'Random Bank',
                    routingNumber: '875946254',
                    accountNumber: '97584695365'
                })


                request.reply({
                    statusCode : 200,
                    body: {
                        "data": {
                            "createBankAccount": {
                                "id": "76h3nh_Cx",
                                "uuid": "5b5a2bed-7046-432c-b960-e6a57b0db22c",
                                "userId": "XEPGyu9lA",
                                "bankName": "Random Bank",
                                "accountNumber": "97584695365",
                                "routingNumber": "875946254",
                                "isDeleted": false,
                                "createdAt": "1784952633955"
                            }
                        }
                    }
                })

            }
        }).as('apiStubbing')

        cy.visit('http://localhost:3000/bankaccounts')

        cy.contains('Bank Accounts').click()

        cy.get('[data-test="bankaccount-new"]').click()
        cy.get('[id="bankaccount-bankName-input"]').type('Random Bank')
        cy.get('[id="bankaccount-routingNumber-input"]').type('875946254')
        cy.get('[id="bankaccount-accountNumber-input"]').type('97584695365')
        cy.get('[data-test="bankaccount-submit"]').click()


        cy.wait('@apiStubbing').then((interception) => {

            expect(interception.request.method).to.contain('POST')
            expect(interception.response.statusCode).to.eq(200)
        })

        // Verify the UI shows the mocked bank account
        cy.contains('Random Bank').should('be.visible')
    })
})