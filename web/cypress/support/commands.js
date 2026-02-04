// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-real-events';
import './actions/consultancy.actions'
import './actions/github.actions'
import './actions/cep.actions'
import './actions/login.actions'
import './actions/signup.actions'
import '../pages/loginPage'

import {validUser} from '../fixtures/users.json'
import { getTodayFormatted } from './utils';


Cypress.Commands.add('start', () => {
    cy.visit('/')
})

Cypress.Commands.add('goTo', (buttonName, pageTitle) => {
    cy.contains('button', buttonName)
        .should('be.visible')
        .click()

    cy.contains('h1', pageTitle)
        .should('be.visible')
})

Cypress.Commands.add('shouldShowFieldError', (field, message) => {
  cy.contains('label', field)
    .parent()
    .find('p')
    .should('be.visible')
    .and('have.text', message)
    .and('have.class', 'text-red-400')
    .and('have.css', 'color', 'rgb(248, 113, 113)')
})

Cypress.Commands.add('login', (ui = false) => {
    if (ui === true) {
        cy.start()
        cy.submitLoginForm(validUser.email, validUser.password)
    } else {
        const token = 'e1033d63a53fe66c0fd3451c7fd8f617'
        const loginDate = getTodayFormatted()

        cy.setCookie('login_date', loginDate)

        cy.visit('/dashboard', {
            onBeforeLoad(win) {
                win.localStorage.setItem('token', token)
            }
        })
    }
    
})

Cypress.Commands.add('submitForm', (locator, name) => {
  cy.contains(locator, name).click()
})

