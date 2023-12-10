Feature: User changes the language to english
  Scenario: Change language
    Given I am on the Pauliceia 2.0 home page
    When I click on the USA flag
    Then the site language should be english