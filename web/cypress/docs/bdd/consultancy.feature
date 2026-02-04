Feature: Consultancy Request

  As a system user
  I want to request a consultancy
  So that I can receive professional guidance

  Background:
    Given I am logged into the system
    And I am on the "Consultoria" form page

  Scenario: Request an individual consultation successfully
    When I fill in the consultancy form with valid individual data
    And I submit the form
    Then I should see a success message indicating the form was submitted successfully

  Scenario: Request a company consultation successfully
    When I fill in the consultancy form with valid company data
    And I submit the form
    Then I should see a success message indicating the form was submitted successfully

  Scenario: Validate required fields when submitting an empty form
    When I submit the form without filling any required fields
    Then I should see a required field error for "Nome Completo *"
    And I should see a required field error for "Email *"
    And I should see a terms of use validation message

  Scenario: Do not submit the form without accepting the terms of use
    When I fill in the consultancy form with valid data
    And I do not accept the terms of use
    And I submit the form
    Then I should see a terms of use validation message
    And I should not see a success message

  Scenario: Do not submit the form with an invalid email format
    When I fill in the consultancy form with an invalid email
    And I submit the form
    Then the email field should be marked as invalid
    And the browser should display a native email validation message