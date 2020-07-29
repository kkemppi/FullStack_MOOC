const { iteratee } = require("lodash")

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'testname',
      passwordHash: 'testpassword',
      username: "testusername"
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testusername')
      cy.get('#password').type('testpassword')
      cy.get('#login-button').click()

      cy.contains('testname logged in')
    })
    it('fails with wrong credentials', function() {
      cy.get('#username').type('wrongusername')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'wrong username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', 'testname logged in')
    })
  })

  describe.only('When logged in', function () {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'testusername', password: 'testpassword'
      }).then(response => {
          localStorage.setItem('loggedUser', JSON.stringify(response.body))
          cy.visit('http://localhost:3000')
        })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('testTitle')
      cy.get('#author').type('testAuthor')
      cy.get('#url').type('testUrl')
      cy.get('#create').click()
      cy.contains('testTitle')
    })

    it('A blog can be liked', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('testTitle')
      cy.get('#author').type('testAuthor')
      cy.get('#url').type('testUrl')
      cy.get('#create').click()

      cy.contains('view').click()
      cy.contains('likes 0')
      cy.get('#like').click()
      cy.contains('likes 1')
    })

    it('A blog can be removed', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('testTitle')
      cy.get('#author').type('testAuthor')
      cy.get('#url').type('testUrl')
      cy.get('#create').click()
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.on('window:confirm', () => true)
      cy.get('html').should('not.contain', 'testTitle')
    })

    it.only('Blogs are sorted by likes', function() {
      cy.createBlog({
        title: 'testTitle1',
        author: 'testAuthor1',
        url: 'testUrl1',
        likes: 1
      })
      cy.createBlog({
        title: 'testTitle2',
        author: 'testAuthor2',
        url: 'testUrl2',
        likes: 2
      })
      cy.createBlog({
        title: 'testTitle3',
        author: 'testAuthor3',
        url: 'testUrl3',
        likes: 3
      })

      cy.get("button:contains(view)").click({multiple: true})
      const i = 0
      cy.get('.blogStyle').eq(i).contains('likes 3')
      cy.get('.blogStyle').eq(i+1).contains('likes 2')
      cy.get('.blogStyle').eq(i+2).contains('likes 1')

    })
  })
})