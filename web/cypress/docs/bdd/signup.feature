Feature: User signup

  As a visitor
  I want to create an account
  So that I can access the application

  Background:
    Given I am on the signup page

  Scenario: Register a new user successfully
    When I fill in the signup form with valid name, email, and password
    And I submit the signup form
    Then I should see a success message confirming my account was created

  Scenario: Validate required fields on signup
    When I submit the signup form without filling any fields
    Then I should see a required field message for "Nome"
    And I should see a required field message for "E-mail"
    And I should see a required field message for "Senha"

  Scenario: Do not allow signup with a weak password
    When I fill in the signup form with a password shorter than 6 characters
    And I submit the signup form
    Then I should see a password strength validation message

  Scenario: Validate email format using browser native validation
    When I fill in the signup form with an invalid email format
    And I submit the signup form
    Then the email field should be marked as invalid
    And the browser should display a native email validation message

  Scenario: Do not allow signup with an existing email
    Given an account already exists with the pr
