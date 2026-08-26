const testData1 = [
    {
        Name : "Gayathri",
        Email : "gayathri@test.com",
        Phone : "987654321",
        Address : "Dubai, UAE",
        Gender : "male",
        Day : "monday",
        Country : "India",
        Colors:"Blue",
        date1:"12/12/1995",
        startdate:"12/12/1996",
        enddate: "12/12/1997"
    },
     {
        Name : "Gayathri 1",
        Email : "gayathri@test1.com",
        Phone : "00000000",
        Address : "Kerala, India    ",
        Gender : "female",
        Day : "tuesday",
        Country : "India",
        Colors:"Blue",
        date1:"12/12/1995",
        startdate:"12/12/1996",
        enddate: "12/12/1997"
    }
  ]
  
 describe("Data driven testcases",()=>{
    it("Fill form test",()=>{
       cy.visit('https://testautomationpractice.blogspot.com/')
       
       testData1.forEach((userData)=> {
            cy.get('[id="name"]').clear().type(userData.Name).should('have.value',userData.Name);
            cy.get('[id="email"]').clear().type(userData.Email).should('have.value',userData.Email)
            cy.get('[id="phone"]').clear().type(userData.Phone);
            cy.get('[id="textarea"]').clear().type(userData.Address).should('have.value',userData.Address);
            cy.get(`#${userData.Gender}`).check()
            cy.get(`#${userData.Day}`).check()
            cy.get('#country').select(userData.Country);
            cy.get('#colors').select(userData.Colors)
            cy.get('[id="datepicker"]').type(userData.date1 , { force: true })
            cy.get('[id="txtDate"]').type(userData.startdate, { force: true })
            cy.get('[id="start-date"]').click();
            cy.contains('button', 'Submit').scrollIntoView().should('be.visible').click();
            cy.get('#result').should('be.visible');
       })
     })
 })