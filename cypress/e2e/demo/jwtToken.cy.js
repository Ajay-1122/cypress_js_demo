describe('handling jwt', () => {
  let accessToken

  beforeEach(() => {

    cy.request({
      method: 'POST',
      url: 'https://dummyjson.com/auth/login',
      body: {
        username: 'emilys',
        password: 'emilyspass',
        expiresInMins: 30
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      accessToken = response.body.accessToken

      cy.window().then((win) => {
        win.localStorage.setItem('jwtToken', accessToken)
      })
    })
  })

  it('stores the token in localStorage and uses it for a protected endpoint', () => {
    cy.window().then((win) => {
      const storedToken = win.localStorage.getItem('jwtToken')
      expect(storedToken).to.eq(accessToken)

      cy.request({
        method: 'GET',
        url: 'https://dummyjson.com/auth/me',
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).then((authenticatedResponse) => {
        expect(authenticatedResponse.status).to.eq(200)
        expect(authenticatedResponse.body.username).to.eq('emilys')
      })
    })
  })
})