module.exports = class Page {
  async open() {
    await browser.maximizeWindow()
    return await browser.url('https://www.saucedemo.com/')
  }
}

//SWAG_LABS_HEADER:  $('.login_logo'),
// USERNAME_FIELD:  $('//input[@data-test="username"]'),
//PASSWORD_FIELD:  $('//input[@data-test="password"]'),
//LOGIN_BUTTON:  $('//input[@data-test="login-button"]'),
//CREDENTIALS_BLOCK: $('//div[@data-test="login-credentials-container"]')
