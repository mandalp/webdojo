Feature: GitHub profile management

  As a user
  I want to manage GitHub profiles
  So that I can organize and access repository owners easily

  Background:
    Given I am logged into the system
    And I am on the "Perfis do GitHub" page

  # =========================
  # Profile creation
  # =========================

  Scenario: Add GitHub profiles successfully
    When I add a new GitHub profile with valid data
    Then the profile should be displayed in the table

  # =========================
  # Profile removal
  # =========================

  Scenario: Remove a GitHub profile
    Given a GitHub profile is already added
    When I remove the GitHub profile
    Then the profile should no longer be displayed in the table

  # =========================
  # Profile access
  # =========================

  Scenario: Open GitHub profile in a new tab
    Given a GitHub profile is already added
    When I click to open the GitHub profile
    Then the profile should be opened in a new browser tab

  # =========================
  # Required fields validation
  # =========================

  Scenario Outline: Validate required fields when creating a GitHub profile
    When I try to add a GitHub profile with missing required information
    Then I should see a required field error message

    Examples:
      | scenario           |
      | without name       |
      | without username   |
      | without profile    |

  # =========================
  # Profile search
  # =========================

  Scenario: Search GitHub profile by username
    Given a GitHub profile is already added
    When I search for the profile by username
    Then the matching GitHub profile should be displayed in the table

  Scenario: Search GitHub profile by name
    Given a GitHub profile is already added
    When I search for the profile by name
    Then the matching GitHub profile should be displayed in the table

  Scenario: Search for a non existing GitHub profile
    When I search for a profile that does not exist
    Then I should see an empty state message indicating no profiles were found