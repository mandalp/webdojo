import { personal, company } from '../fixtures/consultancy.json'

describe('consulting form', () => {
    beforeEach(() => {
        // Arrange
        cy.login()
        cy.goTo('Formulários', 'Consultoria')
    })

    it('should request individual consultation', () => {
        // Act
        cy.fillConsultancyForm(personal)
        cy.submitForm('button', 'Enviar formulário')

        // Assert
        cy.modalMessageShouldBeVisible('com sucesso!')
    })

    it('should request company consultation', () => {
        // Act
        cy.fillConsultancyForm(company)
        cy.submitForm('button', 'Enviar formulário')

        // Assert
        cy.modalMessageShouldBeVisible('com sucesso!')
    })

    it('should verify required fields validation', () => {
        // Act
        cy.submitForm('button', 'Enviar formulário')

        // Assert
        const requiredFields = [
            { field: 'Nome Completo *', message: 'Campo obrigatório' },
            { field: 'Email *', message: 'Campo obrigatório' },
            { field: 'termos de uso *', message: 'Você precisa aceitar os termos de uso' }
        ]
        requiredFields.forEach(({ field, message }) => {
            cy.shouldShowFieldError(field, message)
        })
    })

    it('should not submit the form without accepting terms of use', () => {
        // Act
        const dataWithoutTerms = {
            ...personal,
            terms: false
        }
        cy.fillConsultancyForm(dataWithoutTerms)
        cy.submitForm('button', 'Enviar formulário')

        // Assert
        cy.shouldShowFieldError(
            'termos de uso *',
            'Você precisa aceitar os termos de uso'
        )
        cy.modalMessageShouldNotBeVisible('com sucesso!')
    })

    it('should not submit the form with invalid email', () => {
        // Arrange
        const invalidEmailData = {
            ...personal,
            email: 'email-invalido'
        }

        // Act
        cy.fillConsultancyForm(invalidEmailData)
        cy.submitForm('button', 'Enviar formulário')

        // Assert
        cy.get('input[placeholder="Digite seu email"]')
            .then($input => {
                expect($input[0].checkValidity()).to.be.false
                expect($input[0].validationMessage)
                    .to.contain('@')
            })
    })

})