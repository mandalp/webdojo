Cypress.Commands.add('fillGithubForm', (data) => {
  if (data.name) {
    cy.get('#name').type(data.name)
  }
  if (data.username) {
    cy.get('#username').type(data.username)
  }
  if (data.profile) {
    cy.get('#profile').type(data.profile)
  }
})

Cypress.Commands.add('validateGithubProfileInTable', (username, name, profile) => {
  cy.getGithubProfileRow(username).within(() => {
    cy.contains(name).should('be.visible')
    cy.contains(username).should('be.visible')
    cy.contains(profile).should('be.visible')
  })
})

Cypress.Commands.add('removeGithubProfileFromTable', (username) => {
  cy.getGithubProfileRow(username).find('button[title="Remover perfil"]').click()
})

Cypress.Commands.add('validateGithubProfilenotInTable', (username) => {
  cy.contains('table tbody tr', username).should('not.exist')
})

Cypress.Commands.add('openGithubProfileInNewTab', (username) => {
  cy.getGithubProfileRow(username).find('a').should('have.attr', 'href', 'https://github.com/' + username)
    .and('have.attr', 'target', '_blank')
})

Cypress.Commands.add('getGithubProfileRow', (username) => {
  return cy
    .contains('table tbody td', username)
    .should('exist')
    .closest('tr')
})

Cypress.Commands.add('searchNameOrUsername', (value) => {
  const searchInput = 'input[placeholder="Buscar por nome ou username..."]'

  cy.get(searchInput)
    .clear()
    .type(value)
})

