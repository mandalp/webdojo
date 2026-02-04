import { faker } from '@faker-js/faker'
import _ from 'lodash'

describe('Expert', () => {

    beforeEach(() => {
        cy.start()
    })

    it('should manipulate the attributes of a element', () => {
        cy.log('todo')

        cy.get('#email').invoke('val', 'teste@teste.com')
        //cy.get('#password').invoke('attr', 'name', 'senha')
        cy.get('#password').invoke('removeAttr', 'class')
        cy.get('#password').invoke('attr', 'type', 'text')
            .type('senha123')

        cy.contains('button', 'Entrar')
            .invoke('hide')
            .should('not.be.visible')

        cy.contains('button', 'Entrar')
            .invoke('show')
            .should('be.visible')
    })

    it('validate toast element and simulate ENTER tab using {Enter}', () => {
        // Act
        cy.get('#email').type('papito@webdojo.com')
        cy.get('#password').type('katana321{Enter}')

        //cy.document().then((doc) => {
        //    cy.writeFile('cypress/downloads/page.html', doc.documentElement.outerHTML)
        //})

        // Assert
        cy.get('[data-sonner-toaster=true] div[class=title]')
            .should('be.visible')
            .as('toast')

        cy.get('@toast')
            .should('have.text', 'Acesso negado! Tente novamente.')


        cy.wait(5000)

        cy.get('@toast')
            .should('not.exist')
    })

    // good to use for accessibility tests!
    it('Simulate TAB using cy.press()', () => {
        cy.get('body').press('Tab')
        cy.focused().should('have.attr', 'id', 'email')
        cy.get('#email').press('Tab')
        cy.focused().should('have.attr', 'id', 'password')
    })

    it('perform fake test load', () => {
        _.times(5, () => {
            const name = faker.person.fullName()
            const email = faker.internet.email()
            const password = 'pwd123'
            cy.log(name)
            cy.log(email)
            cy.log(password)

        })

    })

})