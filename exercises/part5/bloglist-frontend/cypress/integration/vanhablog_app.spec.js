describe('Blog app', function() {
  beforeEach(function() {
    // cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Kiira Kailas',
      username: 'kiira',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login').click()
  })

  it('user can login', function () {
    cy.contains('login').click()
    cy.get('#username').type('kiira')
    cy.get('#password').type('salasana')
    cy.get('#login-button').click()

    cy.contains('Kiira Kailas logged in')
  })


//   describe('when logged in', function() {
//     beforeEach(function() {
//     //   cy.visit('http://localhost:3000')
//       cy.get('#username').type('kiira')
//       cy.get('#password').type('salasana')
//       cy.get('#login-button').click()
//     })

//     it('a new blog can be created', function() {
//       cy.contains('create new').click()
//       cy.get('#title').type('otsikko')
//       cy.get('#author').type('kirjoittaja')
//       cy.get('#url').type('https://yle.fi/')
//       cy.contains('add').click()

//     })
//   })
})

