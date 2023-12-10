Feature: Navigate to "Contato" page 
  Scenario: From Home to Contato
    Given I am on the Pauliceia 2.0 home page
    When I follow Contato
    Then I should be on the Contato page