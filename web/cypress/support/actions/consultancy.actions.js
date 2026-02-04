Cypress.Commands.add('fillConsultancyForm', (data) => {
  if (data.name && data.email) {
    cy.get('#name').type(data.name)
    cy.get('input[placeholder="Digite seu email"]').type(data.email)
  }

  if (data.phone) {
    const maskedPhone = data.phone.replace(
      /(\d{2})(\d{5})(\d{4})/,
      '($1) $2-$3'
    )

    cy.get('#phone')
      .type(data.phone)
      .should('have.value', maskedPhone)
  }

  if (data.consultancyType) {
    cy.contains('label', 'Tipo de Consultoria')
      .parent()
      .find('select')
      .select(data.consultancyType)
  }

  if (data.personType) {
    cy.contains('span', data.personType)
      .closest('label')
      .find('input[type="radio"]')
      .check()
  }

  if (data.document) {
    const onlyNumbers = data.document.replace(/\D/g, '')
    const masked =
      onlyNumbers.length === 11
        ? onlyNumbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
        : onlyNumbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')

    cy.get('#document')
      .type(data.document)
      .should('have.value', masked)
  }

  if (data.discoveryChannels) {
    data.discoveryChannels.forEach(channel => {
      const channelText =
        typeof channel === 'string' ? channel : channel.label

      cy.contains('label', channelText)
        .find('input')
        .check()
    })
  }

  if (data.documentPath) {
    cy.get('input[type="file"]').selectFile(data.documentPath, { force: true })
  }

  if (data.details) {
    cy.get('#details').type(data.details)
  }

  if (data.technologies) {
    const techs = Array.isArray(data.technologies)
      ? data.technologies
      : [data.technologies]

    techs.forEach(tech => {
      cy.get('#technologies').type(`${tech}{enter}`)
    })
  }

  if (data.terms) {
    cy.contains('label', 'Li e aceito os')
      .find('input[type="checkbox"]')
      .check()
  }
})

Cypress.Commands.add('modalMessageShouldBeVisible', (message) => {
  cy.get('.modal', { timeout: 7000 })
    .should('be.visible')
    .find('.modal-content')
    .should('contain.text', message)
})

Cypress.Commands.add('modalMessageShouldNotBeVisible', (message) => {
  cy.get('.modal', { timeout: 7000 })
    .should('not.exist')
})

