import _ from 'lodash'
import { faker } from '@faker-js/faker'

describe('Signup', () => {

    beforeEach(() => {
        cy.goToSignup()
        cy.intercept('POST', '/api/users/register', {
            statusCode: 201,
            body: {
                message: 'User registered successfully'
            }
        }).as('postSignup')
    })
    _.times(5, () => {
        it('should register a new user', () => {


            const name = faker.person.fullName()
            const email = faker.internet.email()
            const password = 'pwd123'

            cy.submitSignupForm(name, email, password)
            cy.submitForm('button', 'Criar conta')

            cy.wait('@postSignup')

            // Assert
            cy.contains('Conta criada com sucesso!').should('be.visible')

        })
    })

    it('should validate required fields', () => {
        // Act
        cy.submitForm('button', 'Criar conta')

        // Assert
        cy.shouldShowFieldError(
            'Nome',
            'Opa! Precisamos do seu nome para continuar. 😃'
        )

        cy.shouldShowFieldError(
            'E-mail',
            'Ei! Parece que você esqueceu de digitar seu email. 📩'
        )

        cy.shouldShowFieldError(
            'Senha',
            'Crie uma senha para continuar. 🔐'
        )
    })

    it('should not allow signup with password shorter than 6 characters', () => {
        // Arrange
        const name = faker.person.fullName()
        const email = faker.internet.email()
        const weakPassword = '12345'

        // Act
        cy.submitSignupForm(name, email, weakPassword)
        cy.submitForm('button', 'Criar conta')

        // Assert
        cy.contains(
            'Essa senha está meio fraquinha... que tal uma com pelo menos 6 caracteres? 💪'
        ).should('be.visible')
    })

    it('should show native browser validation for invalid email', () => {
        // Arrange
        const name = faker.person.fullName()
        const invalidEmail = 'email-invalido'
        const password = 'pwd123'

        // Act
        cy.submitSignupForm(name, invalidEmail, password)
        cy.submitForm('button', 'Criar conta')

        // Assert (HTML5 native validation)
        cy.get('input[type="email"]').then($input => {
            expect($input[0].checkValidity()).to.be.false
            expect($input[0].validationMessage).to.contain('@')
        })
    })

    it('should not allow signup with an existing email', () => {
        // Arrange
        const name = faker.person.fullName()
        const email = faker.internet.email()
        const password = 'pwd123'

        cy.intercept('POST', '/api/users/register', {
            statusCode: 409,
            body: {
                message: 'Erro ao criar conta'
            }
        }).as('postSignupError')

        // Act
        cy.submitSignupForm(name, email, password)
        cy.submitForm('button', 'Criar conta')

        cy.wait('@postSignupError')

        // Assert
        cy.contains('Erro ao criar conta')
            .should('be.visible')
    })
})