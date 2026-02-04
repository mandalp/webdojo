Feature: CEP search

  As a user
  I want to search for a CEP
  So that I can retrieve address information

  Background:
    Given I am logged into the system
    And I am on the "Consulta de CEP" integration page

  Scenario: Search for a valid CEP
    Given I enter a valid CEP
    When I click the "Buscar" button
    Then the system should retrieve the address successfully
    And the street should be filled correctly
    And the neighborhood should be filled correctly
    And the city should be filled correctly
    And the state should be filled correctly

  Scenario: Search for a non-existent CEP
    Given I enter a non-existent CEP
    When I click the "Buscar" button
    Then the system should display an alert with the message "CEP inválido"

  Scenario: Search for an invalid CEP
    Given I enter an invalid CEP
    When I click the "Buscar" button
    Then the system should display an alert with the message "CEP não encontrado"