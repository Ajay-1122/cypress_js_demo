// REST API BASICS
// GET, POST, PUT, PATCH, DELETE - CRUD operations - create, read, update, and delete

//REST - Representational state Transfer


describe('API VALIDATION', () => {

    const base_url = 'https://jsonplaceholder.typicode.com/'

    it('GET methods', ()=>{

        cy.request('GET', `${base_url}/posts/1`).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.title).to.include('sunt aut facere repellat provident occaecati excepturi optio reprehenderit')
            expect(response.body.userId).to.eq(1)
        })

    })

    it('POST method', () => {

        cy.request('POST',  `${base_url}/posts`, {
            userId: 2,
            id: 2,
            title: 'Cypress',
            body: 'practice api '
        }).then((response) => {

            expect(response.status).to.eq(201)
            expect(response.body.userId).to.eq(2)
            expect(response.body.title).to.include('Cypress')

        })
    })

    it('PUT method', () => {

        cy.request('PUT', `${base_url}/posts/2`, {
            userId: 3,
            id: 4,
            title: 'Cypress det',
            body: 'practice api '
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.title).to.contains('Cypress det')
        })

    })

    it('PATCH method', () => {

        cy.request('PATCH', `${base_url}/posts/4`, {
            title: 'Cypress det',
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.title).to.contains('Cypress det')
        })
    })


    it('DELETE method', () => {

        cy.request('DELETE', `${base_url}/posts/2`).then((myDeletedResponse) => {
            expect(myDeletedResponse.status).to.eq(200)
        })
    })
})

/*

Header validation

Header are the metadata we sent with api request or returned in the response 

- check whether the response contains the expected headers

ex: content-Type: application/json, Authorization: Bearer token, cache info


Authentication testing

 - it ensures that application endpoints works for valid credentials, on success - 200 , invalid inputs - 401


 Token handling:

 - once obtained token from the endpoint - we will store it and reuse

*/

 const base_url = 'https://simple-grocery-store-api.click'

describe.skip('header validation, authentication testing, token handling', () => {

  const base_url = 'https://simple-grocery-store-api.click'

  let myAccessToken = ''

  before(() => {

    cy.request({method: 'POST', url: `${base_url}/api-clients`, body:{
      clientName: "Postman on Valentin's computer",
      clientEmail: `example${Date.now()}@test.com`
    }}).then((myResponse) => {

      expect(myResponse.status).to.eq(201)
      myAccessToken = myResponse.body.accessToken

      cy.log(`Bearer token : ${myAccessToken}`)

    })
  })

  it('get all the orders', () => {

    cy.request({method: 'GET', url: `${base_url}/orders`, headers : {

      Authorization: `${myAccessToken}`
    }}).then((myResponse) => {

      expect(myResponse.status).to.eq(200)

    })

  })

  it('get all the orders - missing header', () => {

    cy.request({
      method: 'GET',
      url: `${base_url}/orders`,
      failOnStatusCode: false
    }).then((myResponse) => {
      expect(myResponse.status).to.eq(401)
    })

  })
})



describe('header validation, authentication testing, token handling', () => {

  const baseUrl = 'https://simple-grocery-store-api.click'

  let myAccessToken = ''
  let projectId = ''
  let myCart = ''
  let orderId = ''
  let itemID = ''

  before(() => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api-clients`,
      body: {
        clientName: "Postman on Valentin's computer",
        clientEmail: `example${Date.now()}@test.com`
      }
    }).then((myResponse) => {
      expect(myResponse.status).to.eq(201)
      expect(myResponse.body).to.have.property('accessToken')
      myAccessToken = myResponse.body.accessToken
      cy.log(`Bearer token : ${myAccessToken}`)
    })
  })

  it('GET status endpoint', () => {
    cy.request({ method: 'GET', url: `${baseUrl}/status` }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.headers).to.have.property('content-type')
      expect(response.body).to.have.property('status')
    })
  })

  it('GET all products', () => {
    cy.request({ method: 'GET', url: `${baseUrl}/products` }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('array')
      expect(response.body.length).to.be.greaterThan(0)
      projectId = response.body[0].id
      cy.log(`product id : ${projectId}`)
    })
  })

  it('GET orders without auth should return 401', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/orders`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401)
    })
  })

  it('Create a new cart - POST /carts', () => {
    cy.request({ method: 'POST', url: `${baseUrl}/carts` }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('created')
      expect(response.body).to.have.property('cartId')

      myCart = response.body.cartId
      cy.log(`my cart id : ${myCart}`)
    })
  })

  it('Add item to cart - POST /carts/:cartId/items', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/carts/${myCart}/items`,
      body: {
        productId: `${projectId}`
      },
      headers: {
        Authorization: `Bearer ${myAccessToken}`
      }
    }).then((response) => {
      expect(response.status).to.eq(201)
      itemID = response.body.itemId
      cy.log(`item id : ${itemID}`)
    })
  })

  it('Modify the cart item - PATCH /carts/:cartId/items/:itemId', () => {
    cy.request({
      method: 'PATCH',
      url: `${baseUrl}/carts/${myCart}/items/${itemID}`,
      body: {
        quantity: 4
      }
    }).then((response) => {
      expect(response.status).to.eq(204)
    })
  })

  it('Create order - POST /orders', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/orders`,
      body: {
        cartId: `${myCart}`,
        customerName: 'Ajay'
      },
      headers: {
        Authorization: `Bearer ${myAccessToken}`
      }
    }).then((response) => {
      expect(response.status).to.eq(201)
      orderId = response.body.orderId
      cy.log(`order id: ${orderId}`)
    })
  })

  it('Delete order - DELETE /orders/:orderId', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/orders/${orderId}`,
      headers: {
        Authorization: `Bearer ${myAccessToken}`
      }
    }).then((response) => {
      expect(response.status).to.eq(204)
    })
  })
})





  



  











