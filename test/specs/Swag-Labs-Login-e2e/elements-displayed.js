const { assert } = require('chai')
const browser = require('../../../framework/Browser.js')
const logger = require('../../../framework/logger.js')
const LoginPage = require('../../../pages/LoginPage.js')



describe('Swag Labs Login e2e', () => {  
    const loginPage = new LoginPage()

    it('Should display all required page elements', async () => {
        await browser.openUrl('https://www.saucedemo.com/')
        
        await logger.logStep('Verifying URL is correct') 
        assert.equal(await browser.getUrl(), 'https://www.saucedemo.com/', 'should be on the login page')
        
        await logger.logStep('Verifying login form is visible')
        assert.isTrue(await loginPage.isVisible(), "Login form should be visible")
        
        await logger.logStep('Verifying Swag Labs header is displayed')
        assert.isTrue(await loginPage.isHeaderDisplayed(), 'Swag Labs header should be displayed')
    
        await logger.logStep('Verifying text of Swag Labs header')
        assert.equal(await loginPage.getHeaderText(), 'Swag Labs', 'Header text should be "Swag Labs"')
    
        await logger.logStep('Verifying that the username field is displayed')
        assert.isTrue(await loginPage.isUsernameFieldDisplayed(), 'username input field should be displayed')
        
        await logger.logStep('Verifying that the password field is displayed')
        assert.isTrue(await loginPage.isPasswordFieldDisplayed(), 'password input field should be displayed')
    
        await logger.logStep('Verifying that the login button is displayed')
        assert.isTrue(await loginPage.isLoginButtonDisplayed(), 'login button should be displayed')
    
        await logger.logStep('Verifying that the login button is enabled')
        assert.isTrue(await loginPage.isLoginButtonEnabled(), 'login button should be enabled')
        
        await logger.logStep('Verifying that the Credentials block is displayed')
        assert.isTrue(await loginPage.isCredentialsBlockDisplayed(), 'block containing the valid credentials should be displayed')
        
        await logger.logStep('Checking all elements complete')
      })
      
    })
  

