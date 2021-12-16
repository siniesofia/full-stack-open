describe('Blog app ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Mirka Mirkas',
      username: 'mirka',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

  })
  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login').click()
  })

  it('user cant login with incorrect credentials', function () {
    cy.contains('login').click()
    cy.get('#username').type('msdfirka')
    cy.get('#password').type('salasasdfdana')
    cy.get('#login-button').click()
    cy.contains('wrong username or password')
  })

  it('user can login with correct credentials', function () {
    cy.visit('http://localhost:3000')
    cy.contains('login').click()
    cy.get('#username').type('mirka')
    cy.get('#password').type('salasana')
    cy.get('#login-button').click()
    cy.contains('Mirka Mirkas logged in')
  })


  it('a new blog can be created', function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Mirka Mirkas',
      username: 'mirka',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3000')
    cy.contains('login').click()
    cy.get('#username').type('mirka')
    cy.get('#password').type('salasana')
    cy.get('#login-button').click()

    cy.contains('Mirka Mirkas logged in')
    cy.contains('create new').click()
    cy.get('#title').type('otsikko')
    cy.get('#author').type('kirjoittaja')
    cy.get('#url').type('https://yle.fi/')
    cy.contains('add').click()
    cy.get('#add-button').click()
  })

  it('a new blog can be removed', function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Mirka Mirkas',
      username: 'mirka',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3000')
    cy.contains('login').click()
    cy.get('#username').type('mirka')
    cy.get('#password').type('salasana')
    cy.get('#login-button').click()

    cy.contains('Mirka Mirkas logged in')
    cy.contains('create new').click()
    cy.get('#title').type('otsikko')
    cy.get('#author').type('kirjoittaja')
    cy.get('#url').type('https://yle.fi/')
    cy.contains('add').click()
    cy.get('#add-button').click()
    cy.visit('http://localhost:3000')
    cy.contains('view').click()
    cy.contains('remove').click()
    cy.visit('http://localhost:3000')

    // cy.get('#view-button').click()
  })

})