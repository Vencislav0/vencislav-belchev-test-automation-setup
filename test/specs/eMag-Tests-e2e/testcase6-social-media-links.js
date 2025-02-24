const HomePage = require('../../../eMagPages/HomePage.js')
const { assert } = require('chai')
const browser = require('../../../framework/Browser.js')
const logger = require('../../../framework/logger.js')
const allure = require('@wdio/allure-reporter')

describe('eMAG Tests e2e', () => {
  const homePage = new HomePage()

  it('Should correctly redirect to the correct social media links', async () => {
    await browser.windowMaximize()
    allure.startStep('Step 1')

    await logger.logStep('Navigating to eMag home page')
    await browser.openUrl('https://www.emag.bg/')

    await logger.logStep('Accept Cookies and close Log In popup if needed')
    await homePage.acceptCookiesIfNeeded()
    await homePage.dissmissAccountLoginPopUpIfNeeded()

    await logger.logStep('Verifying tab title is as expected')
    assert.equal(await browser.getTitle(), 'eMAG.bg - Широка гама продукти', 'Window title should be "eMAG.bg - Широка гама продукти" for home page')

    await logger.logStep('Storing initial window handle for later use')
    const mainWindow = await browser.getWindowHandle()

    allure.endStep()

    allure.startStep('Step 2')

    await logger.logStep('Clicking on Facebook link')
    await homePage.clickFacebookLink()

    await logger.logStep('Getting the number of tabs after clicking on facebook link')
    let windowHandles = await browser.getWindowHandles()

    await logger.logStep('Verifying that the url on the newly opened tab is correct')
    const facebookWindow = windowHandles[windowHandles.length - 1]
    await browser.switchWindow(facebookWindow)
    assert.equal(await browser.getUrl(), 'https://www.facebook.com/eMAGbg', 'Window Url should be the facebook eMAG page')

    allure.endStep()

    allure.startStep('Step 3')

    await logger.logStep('Closing the Facebook tab')
    await browser.closeWindow()

    await logger.logStep('Verifying that the number of tabs is now 1 after closing facebook tab')
    let tabsCount = (await browser.getWindowHandles()).length

    assert.equal(tabsCount, 1, 'There should be only 1 tab after closing facebook tab')

    await logger.logStep('Switching to main window handle')
    await browser.switchWindow(mainWindow)

    allure.endStep()

    allure.startStep('Step 4')

    await logger.logStep('Dismissing account log in popup')
    await homePage.dissmissAccountLoginPopUpIfNeeded()

    await logger.logStep('Clicking on Youtube link')
    await homePage.clickYoutubeLink()

    await logger.logStep('Getting the number of tabs after clicking on youtube link')
    windowHandles = await browser.getWindowHandles()

    await logger.logStep('Switching to youtube tab')
    const youtubeWindow = windowHandles[windowHandles.length - 1]
    await browser.switchWindow(youtubeWindow)

    await logger.logStep('Accept Cookies if needed')
    await homePage.acceptYoutubeCookiesIfNeeded()

    logger.logStep('Verifying that the correct url is displayed')
    assert.equal(await browser.getUrl(), 'https://www.youtube.com/channel/UC5y5r9BY5IiT4MkBrMtZRnA', 'Window Url should be the EMAG youtube channel page')

    allure.endStep()

    allure.startStep('Step 5')

    await logger.logStep('Closing the Youtube tab')
    await browser.closeWindow()

    await logger.logStep('Verifying that the number of tabs is now 1 after closing youtube tab')
    tabsCount = (await browser.getWindowHandles()).length

    assert.equal(tabsCount, 1, 'There should be only 1 tab after closing youtube tab')

    await logger.logStep('Switching to main window handle')
    await browser.switchWindow(mainWindow)

    allure.endStep()

    allure.startStep('Step 6')

    await logger.logStep('Clicking on Instagram link')
    await homePage.clickInstagramLink()

    await logger.logStep('Getting the number of tabs after clicking on instagram link')
    windowHandles = await browser.getWindowHandles()

    await logger.logStep('Verifying that the url on the newly opened tab is correct')
    const instagramWindow = windowHandles[windowHandles.length - 1]
    await browser.switchWindow(instagramWindow)
    assert.equal(await browser.getUrl(), 'https://www.instagram.com/emag.bg_official/', 'Window Url should be the instagram eMAG page')

    allure.endStep()

    allure.startStep('Step 7')

    await logger.logStep('Closing the Instagram tab')
    await browser.closeWindow()

    await logger.logStep('Verifying that the number of tabs is now 1 after closing instagram tab')
    tabsCount = (await browser.getWindowHandles()).length

    assert.equal(tabsCount, 1, 'There should be only 1 tab after closing instagram tab')

    allure.endStep()
  })
})
