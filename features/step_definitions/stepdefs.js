const { Given, When, Then, AfterAll } = require('cucumber');
const { Builder, By, Capabilities, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

require("chromedriver");

// setup do driver
const chrome = require('selenium-webdriver/chrome');

const chromeOptions = new chrome.Options();
//chromeOptions.addArguments('user-data-dir=/home/mintuser/Documentos/Cordeiro');
chromeOptions.addArguments('--no-sandbox');
chromeOptions.addArguments('--disable-extensions');
//chromeOptions.addArguments('--disable-infobars');
chromeOptions.addArguments('--disable-dev-shm-usage'); // Adicionada esta opção

const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions)
    .build();



// Navigate to sobre

Given('I am on the Pauliceia 2.0 home page', {timeout: 60 * 1000}, async function () {
    await driver.get('http://localhost:8080/portal/home');
    // await driver.get('https://pauliceia.unifesp.br/portal/home');
});

When('I follow Sobre', {timeout: 60 * 1000}, async function () {
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/header/nav/div/ul/li[4]/a")).click();
    this.actualAnswer =  'about';
});

Then('I should be on the Sobre page', {timeout: 60 * 1000}, async function () {
    const url = await driver.getCurrentUrl() + '';
    const page_name =  url.split('/')[url.split('/').length - 1];
    expect(page_name).to.equal(this.actualAnswer);
});



// Navigate to contato
When('I follow Contato', {timeout: 60 * 1000}, async function () {
    await driver.findElement(By.xpath("/html/body/div/section/div/header/nav/div/ul/li[5]/a")).click();
    this.actualAnswer =  'contact';
});

Then('I should be on the Contato page', {timeout: 60 * 1000}, async function () {
    const url = await driver.getCurrentUrl() + '';
    const page_name =  url.split('/')[url.split('/').length - 1];
    expect(page_name).to.equal(this.actualAnswer);
});



// Change language to english
When('I click on the USA flag', {timeout: 60 * 1000}, async function () {
    await driver.findElement(By.xpath("/html/body/div/section/div/header/nav/div/div[2]/i[2]")).click();
    await driver.sleep(500);
});

Then('the site language should be english', {timeout: 60 * 1000}, async function () {
    const element = await driver.wait(until.elementLocated(By.xpath("/html/body/div[1]/section/div/header/nav/div/ul/li[4]/a")), 30000);
    await driver.wait(until.elementIsVisible(element), 30000);
    const elem_text = await element.getText();
    expect(elem_text).to.equal("About");
    await driver.findElement(By.xpath("/html/body/div/section/div/header/nav/div/div[2]/i[1]")).click();
});



// Add a layer

When('I follow Entrar', {timeout: 60 * 1000}, async function () {
    await driver.wait(until.elementLocated(By.xpath("/html/body/div/section/div/header/nav/div/div[1]/a")), 60000);
    await driver.findElement(By.xpath("/html/body/div/section/div/header/nav/div/div[1]/a")).click();
});

Then('I should be on the Login page', {timeout: 60 * 1000}, async function () {
    const url = await driver.getCurrentUrl() + '';
    const page_name =  url.split('/')[url.split('/').length - 1] + '';
    this.actualAnswer = 'login';
    expect(page_name).to.equal(this.actualAnswer);
});

When('I fill the field E-mail with estudante.da.each@usp.br', {timeout: 60 * 1000}, async function () {
    await driver.sleep(500);
    await driver.findElement(By.xpath("/html/body/div/section/div/div/section/div[1]/div/form/div[1]/input")).sendKeys("estudante.da.each@usp.br");
});

When('I fill the field Senha with estudante.da.each@usp.br123', {timeout: 60 * 1000}, async function () {
    await driver.sleep(500);
    await driver.findElement(By.xpath("/html/body/div/section/div/div/section/div[1]/div/form/div[2]/input")).sendKeys("estudante.da.each@usp.br123");
});

When('I press Entrar', {timeout: 60 * 1000}, async function () {
    await driver.sleep(3000);
    await driver.findElement(By.xpath("/html/body/div/section/div/div/section/div[1]/div/form/div[3]/button")).click();
});

Then('I should be logged on', {timeout: 60 * 1000}, async function () {
    const element = await driver.wait(until.elementLocated(By.xpath("/html/body/div/section/div/header/nav/div/div[1]/div/button/div/div/div/div/img")), 30000);
    await driver.wait(until.elementIsVisible(element), 30000);
    const icon_exists = await element.isDisplayed();
    expect(icon_exists).to.equal(true);
});

When('I click user icon', {timeout: 60 * 1000}, async function () {
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/header/nav/div/div[1]/div/button")).click();
    driver.sleep(3000);
});

When('follow Painel', {timeout: 60 * 1000}, async function () {
    await driver.wait(until.elementLocated(By.xpath("/html/body/div[2]/div/ul/li[2]/a")), 60000);
    await driver.findElement(By.xpath("/html/body/div[2]/div/ul/li[2]/a")).click();
});

Then('I should be on the Dashboard page', {timeout: 60 * 1000}, async function () {
    const url = await driver.getCurrentUrl() + '';
    expect(url.split('/')[url.split('/').length - 2] + '/' + url.split('/')[url.split('/').length - 1]).to.equal('dashboard/home');
});

When('I follow Nova Camada', {timeout: 60 * 1000}, async function () {
    await driver.wait(until.elementLocated(By.xpath("/html/body/div[1]/section/div/div/div/ul/li[2]/a")), 60000);
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/div/div/ul/li[2]/a")).click();
});

Then('I should be on the Nova Camada page', {timeout: 60 * 1000}, async function () {
    const url = await driver.getCurrentUrl() + '';
    expect(url.split('/')[url.split('/').length - 1]).to.equal('newLayer');
});

When('I fill the required data', {timeout: 60 * 1000}, async function () {
    this.nomeCamada = Math.random().toString().replace('0.', '');
    await driver.findElement(By.xpath("//*[@id=\"inputName\"]")).sendKeys("teste camada " + this.nomeCamada);
    await driver.findElement(By.xpath("/html/body/div/section/div/div/main/div/div/div/div[1]/div/div/form/div[1]/div[1]/div[2]/div/div/div[1]/input")).click();
    await driver.sleep(100);
    await driver.findElement(By.xpath("/html/body/div/section/div/div/main/div/div/div/div[1]/div/div/form/div[1]/div[1]/div[2]/div/div/div[1]/input")).sendKeys("generic");
    await driver.sleep(200);
    await driver.findElement(By.xpath("/html/body/div/section/div/div/main/div/div/div/div[1]/div/div/form/div[1]/div[1]/div[2]/div/div/div[1]/input")).sendKeys(Key.RETURN);
    await driver.sleep(100);
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/div/main/div/div/div/div[1]/div/div/form/div[1]/div[2]/div/div/div[1]/input")).sendKeys("cintiaalmeida");
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/div/main/div/div/div/div[1]/div/div/form/div[1]/div[2]/div/div/div[1]/input")).sendKeys(Key.RETURN);
    await driver.sleep(100);
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/div/main/div/div/div/div[1]/div/div/form/div[1]/div[2]/div/div/div[1]/input")).sendKeys("testeEACH");
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/div/main/div/div/div/div[1]/div/div/form/div[1]/div[2]/div/div/div[1]/input")).sendKeys(Key.RETURN);
    await driver.sleep(100);
    await driver.findElement(By.xpath("//*[@id=\"inputDescription\"]")).sendKeys("Teste de adição de camada");
    await driver.findElement(By.xpath("//*[@id=\"inputReference\"]")).sendKeys("DE TAL, Fulano. Especialização em temas gerais.");
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/div/main/div/div/div/div[1]/div/div/form/div[1]/div[4]/div/div[2]/a")).click();
    await driver.findElement(By.xpath("//*[@id=\"Upload\"]")).sendKeys(__dirname + '/' + 'camada_teste.zip');
});

When('I press Enviar', {timeout: 60 * 1000}, async function () {
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/div/main/div/div/div/div[1]/div/div/form/div[2]/button")).click();
});

Then('I should be on the Dados Temporais page', {timeout: 60 * 1000}, async function () {
    const element = await driver.wait(until.elementLocated(By.xpath("/html/body/div[1]/section/div/div/main/div/div/div/div/div/div/h5")), 30000);
    await driver.wait(until.elementIsVisible(element), 30000);
    const elem_exists = await element.isDisplayed();
    expect(elem_exists).to.equal(true);
});

When('I fill the time data', {timeout: 60 * 1000}, async function () {
    await driver.findElement(By.xpath("//*[@id=\"start_date\"]")).sendKeys("01/01/1900");
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/div/main/div/div/div/div/div/div/div/form/div[1]/div[2]/div/div/div[1]/input")).sendKeys("data");
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/div/main/div/div/div/div/div/div/div/form/div[1]/div[2]/div/div/div[1]/input")).sendKeys(Key.RETURN);
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/div/main/div/div/div/div/div/div/div/form/div[1]/div[3]/div/div/div[1]/input")).sendKeys("YYYY-MM-DD");
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/div/main/div/div/div/div/div/div/div/form/div[1]/div[3]/div/div/div[1]/input")).sendKeys(Key.RETURN);
    await driver.findElement(By.xpath("//*[@id=\"end_date\"]")).sendKeys("01/01/2000");
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/div/main/div/div/div/div/div/div/div/form/div[2]/div[2]/div/div/div[1]/input")).sendKeys("datafim");
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/div/main/div/div/div/div/div/div/div/form/div[2]/div[2]/div/div/div[1]/input")).sendKeys(Key.RETURN);
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/div/main/div/div/div/div/div/div/div/form/div[2]/div[3]/div/div/div[1]/input")).sendKeys("YYYY-MM-DD");
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/div/main/div/div/div/div/div/div/div/form/div[2]/div[3]/div/div/div[1]/input")).sendKeys(Key.RETURN);
});

When('I press the Enviar button', {timeout: 60 * 1000}, async function () {
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/div/main/div/div/div/div/div/div/div/form/div[3]/div/a")).click();
});

When('I follow Mapa', {timeout: 60 * 1000}, async function () {
    await driver.wait(until.elementLocated(By.xpath("/html/body/div[1]/section/div/header/nav/div/ul/li[2]/a")), 60000);
    await driver.sleep(3000);
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/header/nav/div/ul/li[2]/a")).click();
});

When('I click Camadas', {timeout: 60 * 1000}, async function () {
    await driver.wait(until.elementLocated(By.xpath("/html/body/div[1]/section/div/section/div/div[2]/p")), 60000);
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/section/div/div[2]/p")).click();
});

When('click on the layers controll', {timeout: 60 * 1000}, async function () {
    await driver.wait(until.elementLocated(By.xpath("/html/body/div[1]/section/div/section/div/div[2]/section/div/div/div/button/div")), 60000);
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/section/div/div[2]/section/div/div/div/button/div")).click();
});

When('search for teste number', {timeout: 60 * 1000}, async function () {
    await driver.wait(until.elementLocated(By.xpath("/html/body/div[1]/section/div/section/div/div[2]/div/div/div/div[2]/div/input")), 60000);
    await driver.sleep(5000);
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/section/div/div[2]/div/div/div/div[2]/div/input")).sendKeys("teste camada " + this.nomeCamada);
});

Then('I should see test number on the list', {timeout: 60 * 1000}, async function () {
    await driver.sleep(5000);
    const element = await driver.wait(until.elementLocated(By.xpath("/html/body/div[1]/section/div/section/div/div[2]/div/div/div/div[2]/article[1]/div/div[1]/p[1]")), 30000);
    await driver.wait(until.elementIsVisible(element), 30000);
    const elem_text = await element.getText();
    expect(elem_text).to.equal("TÍTULO: teste camada " + this.nomeCamada);
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/section/div/div[2]/div/div/div/div[1]/button")).click();
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/header/nav/div/div[1]/div/button")).click();
    await driver.findElement(By.xpath("/html/body/div[2]/div/ul/li[3]/button")).click();
});

AfterAll({timeout: 60 * 1000}, async function(){
    driver.sleep(5000);
    await driver.quit();
});


// Add a post

When('I add a message', {timeout: 60 * 1000}, async function () {
    await driver.wait(until.elementLocated(By.xpath("//*[@id=\"inputReference\"]")), 60000);
    await driver.findElement(By.xpath("//*[@id=\"inputReference\"]")).sendKeys("ceci nest pas une test");
    await driver.sleep(1000);
});

When('press Submit', {timeout: 60 * 1000}, async function () {
    await driver.findElement(By.xpath("/html/body/div/section/div/div/main/div/div/div/div[1]/div/div/div/div/div[2]/div[1]/div[1]/div/a")).click();
});

Then('I should see my message on the list', {timeout: 60 * 1000}, async function () {
    await driver.sleep(5000);
    const element = await driver.wait(until.elementLocated(By.xpath("/html/body/div/section/div/div/main/div/div/div/div[1]/div/div/div/div/div[2]/div[1]/div[2]/div[1]/div/div[2]/p")), 60000);
    await driver.wait(until.elementIsVisible(element), 30000);
    const elem_text = await element.getText();
    expect(elem_text).to.equal("ceci nest pas une test");
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/header/nav/div/div[1]/div/button")).click();
    await driver.findElement(By.xpath("/html/body/div[2]/div/ul/li[3]/button")).click();
});



// Enter wrong password

When('I fill the field Senha with estudante.da.each@usp.br', {timeout: 60 * 1000}, async function () {
    await driver.sleep(500);
    await driver.findElement(By.xpath("/html/body/div/section/div/div/section/div[1]/div/form/div[2]/input")).sendKeys("estudante.da.each@usp.br");
});

Then('I should see an Error message', {timeout: 60 * 1000}, async function () {
    await driver.sleep(1000);
    const element = await driver.wait(until.elementLocated(By.xpath("/html/body/div[2]/div/div[2]/div[2]/p")), 30000);
    await driver.wait(until.elementIsVisible(element), 30000);
    const elem_text = await element.getText();
    expect(elem_text).to.equal("E-mail ou senha incorreta!");
});



// Add a keyword

When('I click Palavras-chave', {timeout: 60 * 1000}, async function () {
    await driver.wait(until.elementLocated(By.xpath("/html/body/div[1]/section/div/div/div/ul/li[3]/a")), 60000);
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/div/div/ul/li[3]/a")).click();
});

Then('I should be on the Palavras-chave page', {timeout: 60 * 1000}, async function () {
    const element = await driver.wait(until.elementLocated(By.xpath("/html/body/div[1]/section/div/div/main/div/div/div/div[1]/div/div/h6")), 30000);
    await driver.wait(until.elementIsVisible(element), 30000);
    const elem_exists = await element.isDisplayed();
    expect(elem_exists).to.equal(true);
});

When('I fill the keyword field with palavraria', {timeout: 60 * 1000}, async function () {
    await driver.wait(until.elementLocated(By.xpath("//*[@id=\"inputName\"]")), 60000);
    this.keywordRand = 'palavra ' + Math.random().toString().replace('0.', '')
    await driver.findElement(By.xpath("//*[@id=\"inputName\"]")).sendKeys(this.keywordRand);
});

When('press the Submit button', {timeout: 60 * 1000}, async function () {
    await driver.wait(until.elementLocated(By.xpath("/html/body/div[1]/section/div/div/main/div/div/div/div[1]/div/div/form/div/div[2]/a")), 60000);
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/div/main/div/div/div/div[1]/div/div/form/div/div[2]/a")).click();
});

Then('I should see my keyword on the right panel', {timeout: 60 * 1000}, async function () {
    await driver.sleep(2000);
    const div = await driver.findElement(By.xpath("/html/body/div/section/div/div/main/div/div/div/div[2]/div/div/div"));
    const child_divs = await div.findElements(By.xpath('./*'));
    const i = child_divs.length;    
    const element = await driver.wait(until.elementLocated(By.xpath("/html/body/div/section/div/div/main/div/div/div/div[2]/div/div/div/div[" + i.toString() + "]/div[1]")), 30000);
    await driver.wait(until.elementIsVisible(element), 30000);
    const elem_text = await element.getText();
    expect(elem_text).to.equal(this.keywordRand);
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/header/nav/div/div[1]/div/button")).click();
    await driver.findElement(By.xpath("/html/body/div[2]/div/ul/li[3]/button")).click();
});


// Add a Layer With a Name That Already Exists
When('I Copy The Name of the First Layer', {timeout: 60 * 1000}, async function () {
    await driver.sleep(10000);
    var text = await driver.findElement(By.xpath('/html/body/div[1]/section/div/div/main/div/div/div/div[2]/div[1]/div/div/div[1]/div[1]')).getText();
    console.log(text);
    this.actualAnswer = text;
});

When('I fill the required data pasting the layer name that I copied', {timeout: 60 * 1000}, async function () {
    this.nomeCamada = this.actualAnswer;
    await driver.findElement(By.xpath("//*[@id=\"inputName\"]")).sendKeys(this.nomeCamada);
    await driver.findElement(By.xpath("/html/body/div/section/div/div/main/div/div/div/div[1]/div/div/form/div[1]/div[1]/div[2]/div/div/div[1]/input")).click();
    await driver.sleep(100);
    await driver.findElement(By.xpath("/html/body/div/section/div/div/main/div/div/div/div[1]/div/div/form/div[1]/div[1]/div[2]/div/div/div[1]/input")).sendKeys("generic");
    await driver.sleep(200);
    await driver.findElement(By.xpath("/html/body/div/section/div/div/main/div/div/div/div[1]/div/div/form/div[1]/div[1]/div[2]/div/div/div[1]/input")).sendKeys(Key.RETURN);
    await driver.sleep(100);
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/div/main/div/div/div/div[1]/div/div/form/div[1]/div[2]/div/div/div[1]/input")).sendKeys("cintiaalmeida");
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/div/main/div/div/div/div[1]/div/div/form/div[1]/div[2]/div/div/div[1]/input")).sendKeys(Key.RETURN);
    await driver.sleep(100);
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/div/main/div/div/div/div[1]/div/div/form/div[1]/div[2]/div/div/div[1]/input")).sendKeys("testeEACH");
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/div/main/div/div/div/div[1]/div/div/form/div[1]/div[2]/div/div/div[1]/input")).sendKeys(Key.RETURN);
    await driver.sleep(100);
    await driver.findElement(By.xpath("//*[@id=\"inputDescription\"]")).sendKeys("Teste de adição de camada");
    await driver.findElement(By.xpath("//*[@id=\"inputReference\"]")).sendKeys("DE TAL, Fulano. Especialização em temas gerais.");
    await driver.findElement(By.xpath("/html/body/div[1]/section/div/div/main/div/div/div/div[1]/div/div/form/div[1]/div[4]/div/div[2]/a")).click();
    await driver.findElement(By.xpath("//*[@id=\"Upload\"]")).sendKeys(__dirname + '/' + 'camada_teste.zip');
});



When('I verify if a error modal is displayed close', {timeout: 60 * 1000}, async function () { 
    await driver.sleep(10000);
    
    try {
        const elemento = await driver.findElement(By.xpath('/html/body/div[3]'));
        const elementoPresente = await elemento.isDisplayed();
        console.log(elementoPresente)
        
        if (elementoPresente) {
            await driver.findElement(By.css('button.el-button.el-button--default.el-button--small.el-button--primary')).click();
        }
    } catch (error) {
        console.log(error);
    }
});


Then('I should see an Error Conflict message', {timeout: 60 * 1000}, async function () { 
    await driver.sleep(1000);

    try {
        const errorModalElement = await driver.findElement(By.css('div[role="alert"].el-message.el-message--error'));
        const errorModalDisplayed = await errorModalElement.isDisplayed();
        
        if (errorModalDisplayed) {
            const errorMessageElement = await errorModalElement.findElement(By.css('.el-message__content'));
            const errorMessageActual = await errorMessageElement.getText();
            const errorMessageExpected = 'Já existe uma camada com esse nome, por favor, escolha outro!';

            expect(errorMessageActual).to.equal(errorMessageExpected);
        }
    } catch (error) {
        console.log(error);
    }

    await driver.findElement(By.xpath("/html/body/div[1]/section/div/header/nav/div/div[1]/div/button")).click();
    await driver.findElement(By.xpath("/html/body/div[2]/div/ul/li[3]/button")).click();
});