Feature: Login functionality
  Scenario: Login with valid credentials
    Given the user is on the login page
    When the user enters login details
      | username | student |
      | password | Password123 |
    And the user clicks the Login button
    Then the user should see the dashboard
