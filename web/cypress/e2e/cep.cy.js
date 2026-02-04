import { valid, invalid, nonexistent } from '../fixtures/cep.json'

describe('CEP form', () => {

    beforeEach(() => {
        // Arrange
        cy.login()
        cy.goTo('Integração', 'Consulta de CEP')
    })

    it('should search for a valid CEP', () => {
        // Act 
        cy.intercept('GET', `https://viacep.com.br/ws/${valid.cep}/json/`, {
            statusCode: 200,
            body: {
                logradouro: valid.street,
                bairro: valid.neighborhood,
                localidade: valid.city,
                uf: valid.state
            }
        }).as('getCep') // mock informations

        cy.fillCep(valid.cep)
        cy.submitForm('button', 'Buscar')

        cy.wait('@getCep')

        // Assert
        cy.validateAddressFromCep(valid)
    })

    it('should search for a non existent CEP', () => {
        // Act 
        cy.intercept('GET', `https://viacep.com.br/ws/${nonexistent.cep}/json/`, {
            statusCode: 200,
            body: {
                logradouro: nonexistent.street,
                bairro: nonexistent.neighborhood,
                localidade: nonexistent.city,
                uf: nonexistent.state
            }
        }).as('getCep') // mock informations

        cy.fillCep(nonexistent.cep)
        cy.submitForm('button', 'Buscar')

        // Assert
        cy.on('window:alert', (str) => {
            expect(str).to.equal('CEP inválido')
        })
    })

        it('should search for a invalid CEP', () => {
        // Act 
        cy.intercept('GET', `https://viacep.com.br/ws/${invalid.cep}/json/`, {
            statusCode: 200,
            body: {
                logradouro: invalid.street,
                bairro: invalid.neighborhood,
                localidade: invalid.city,
                uf: invalid.state
            }
        }).as('getCep') // mock informations

        cy.fillCep(invalid.cep)
        cy.submitForm('button', 'Buscar')

        // Assert
        cy.on('window:alert', (str) => {
            expect(str).to.equal('CEP não encontrado')
        })
    })
})