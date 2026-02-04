Cypress.Commands.add('goToSignup', () => {
    cy.start()
    cy.get('a[href="/register"]')
        .should('be.visible')
        .click()

    cy.contains('h2', 'Crie sua conta')
        .should('be.visible')
})

Cypress.Commands.add('submitSignupForm', (name, email, password) => {
    cy.get('#name').type(name)
    cy.get('#email').type(email)
    cy.get('#password').type(password)
})