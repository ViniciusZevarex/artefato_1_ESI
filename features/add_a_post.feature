Feature: User can manually add a post on the dashboard
  Scenario: Add a post
    Given I am on the Pauliceia 2.0 home page
    When I follow Entrar
    Then I should be on the Login page
    When I fill the field E-mail with estudante.da.each@usp.br
    And I fill the field Senha with estudante.da.each@usp.br123
    And I press Entrar
    Then I should be logged on
    When I verify if a error modal is displayed close
    And I click user icon
    And follow Painel
    Then I should be on the Dashboard page
    When I add a message
    And press Submit
    Then I should see my message on the list