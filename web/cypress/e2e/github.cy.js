import profilesData from "../fixtures/githubProfiles.json"

describe('Management of GitHub repositories', () => {

    beforeEach(() => {
        // Arrange
        cy.login()
        cy.goTo('Tabela', 'Perfis do GitHub')
    })

    context('Profile creation', () => {
        it('should add new GitHub profiles successfully', () => {
            profilesData.valid.profiles.forEach(profile => {
                // Act
                cy.fillGithubForm(profile)
                cy.submitForm('button', 'Adicionar Perfil')

                // Assert
                cy.validateGithubProfileInTable(profile.username, profile.name, profile.profile)
            })
        })
    })

    context('Profile removal', () => {
        it('should delete a GitHub profile', () => {
            const profile = profilesData.valid.profiles[1]
            // Act
            cy.fillGithubForm(profile)
            cy.submitForm('button', 'Adicionar Perfil')

            cy.removeGithubProfileFromTable(profile.username)

            // Assert
            cy.validateGithubProfilenotInTable(profile.username)

        })
    })

    context('Profile access', () => {
        it('should verify if a GitHub profile is opened in a new tab', () => {
            const profiles = profilesData.valid.profiles

            const randomIndex = Math.floor(Math.random() * profiles.length)
            const profile = profiles[randomIndex]

            // Act
            cy.fillGithubForm(profile)
            cy.submitForm('button', 'Adicionar Perfil')

            // Assert
            cy.openGithubProfileInNewTab(profile.username)
        })
    })

    context('Required fields validation', () => {
        profilesData.requiredFields.forEach(
            ({ scenario, data, expectedError }) => {

                it(`should show required field error when ${scenario}`, () => {
                    // Act
                    cy.fillGithubForm(data)
                    cy.submitForm('button', 'Adicionar Perfil')

                    // Assert
                    cy.shouldShowFieldError(
                        expectedError.field,
                        expectedError.message
                    )
                })
            })
    })

    context('Profile search', () => {
        it('should search GitHub profile by username', () => {

            const profile = profilesData.valid.profiles[0]

            // Arrange 
            cy.fillGithubForm(profile)
            cy.submitForm('button', 'Adicionar Perfil')

            // Act 
            cy.searchNameOrUsername(profile.username)

            // Assert 
            cy.validateGithubProfileInTable(
                profile.username,
                profile.name,
                profile.profile
            )
        })

        it('should search GitHub profile by name', () => {

            const profile = profilesData.valid.profiles[0]

            // Arrange 
            cy.fillGithubForm(profile)
            cy.submitForm('button', 'Adicionar Perfil')

            // Act 
            cy.searchNameOrUsername(profile.name)

            // Assert 
            cy.validateGithubProfileInTable(
                profile.username,
                profile.name,
                profile.profile
            )
        })

        it('should show empty state message when searching for a non existing profile', () => {
            // Act
            cy.searchNameOrUsername('perfil-inexistente')

            // Assert
            cy.contains('Nenhum perfil encontrado.')
                .should('be.visible')
        })
    })
})
