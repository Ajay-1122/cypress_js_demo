describe.skip('MySQL database testing', () => {

    it('retrieve data with SELECT and LIMIT', () => {
        cy.task('queryDatabase', 'SELECT id, name, role FROM DemoTable ORDER BY id LIMIT 1;').then((result) => {
            expect(result).to.be.an('array')
            expect(result).to.have.length.of.at.least(1)
            expect(result[0]).to.have.property('name', 'John')
        })
    })

    it('filter data with WHERE', () => {
        cy.task('queryDatabase', 'SELECT id, name, role FROM DemoTable WHERE id = 2;').then((result) => {
            expect(result).to.be.an('array')
            expect(result).to.have.length(1)
        })
    })

    it('INSERT new record', () => {

        cy.task('queryDatabase', "INSERT INTO DemoTable (id, name, role) VALUES (4, 'Meera', 'QA Engineer')").then((insertedResult) => {

            expect(insertedResult).to.have.property('affectedRows', 1)

            cy.task('queryDatabase', 'SELECT id, name, role FROM DemoTable WHERE id = 4').then((insertedRow) => {
                expect(insertedRow).to.have.length(1)
                expect(insertedRow[0]).to.have.property('name', 'Meera')
                expect(insertedRow[0]).to.include({
                    id: 4,
                    name: 'Meera',
                    role: 'QA Engineer'
                })
            })
        })
    })

    it('UPDATE row', () => {

        cy.task('queryDatabase', "UPDATE DemoTable SET role = 'Senior Tester' WHERE id = 4").then((result) => {
            expect(result).to.have.property('affectedRows', 1)

            cy.task('queryDatabase', 'SELECT * FROM DemoTable WHERE id = 4').then((updatedResult) => {
                expect(updatedResult[0]).to.have.property('role', 'Senior Tester')
            })
        })
    })

    it('DELETE the row', () => {

        cy.task('queryDatabase', 'DELETE FROM DemoTable WHERE id = 4').then((result) => {
            expect(result).to.have.property('affectedRows', 1)

            cy.task('queryDatabase', 'SELECT * FROM DemoTable WHERE id = 4').then((deletedRow) => {
                expect(deletedRow).to.have.length(0)
            })
        })
    })
})