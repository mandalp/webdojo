import {validUser, invalidUsers} from '../fixtures/users.json'

describe('Login Test', () => {
  beforeEach(() => {
    // Arrange
    cy.start()
  })

  it('should log in successfully with valid credentials', () => {
    // Act
    cy.submitLoginForm(validUser.email, validUser.password)
    
    // Assert
    cy.validateSuccessfulLogin(validUser)
  })

  invalidUsers.forEach(({ scenario, email, password }) => {
    it(`should show error message with ${scenario}`, () => {
      // Act
      cy.submitLoginForm(email, password)

      // Assert
      cy.contains('Acesso negado! Tente novamente')
        .should('be.visible')
    })
  })
})