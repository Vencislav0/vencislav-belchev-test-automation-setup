const HomePage = require('../../../eMagPages/HomePage.js')
const SocialLinksForm = require('../../../eMagPages/SocialLinksForm.js')
const { assert } = require('chai')
const browser = require('../../../framework/Browser.js')
const allure = require('@wdio/allure-reporter')
const YoutubeChannelPage = require('../../../eMagPages/YoutubeChannelPage.js')

describe('eMAG Tests e2e', () => {
  const homePage = new HomePage()
  const socialLinksForm = new SocialLinksForm()
  const youtubeChannelPage = new YoutubeChannelPage()

  it('Should correctly redirect to the correct social media links', async () => {
    await browser.windowMaximize()
    let mainWindow
    let windowHandles
    let facebookWindow
    let tabsCount
    let instagramWindow
    let youtubeWindow

    await allure.step('Navigating to eMag home page', async () => {
      await browser.openUrl('https://www.emag.bg/')
    })

    await allure.step('Accept Cookies and close Log In popup if needed', async () => {
      await homePage.acceptCookiesIfNeeded()
      await homePage.dissmissAccountLoginPopUpIfNeeded()
    })

    await allure.step('Verifying tab title is as expected', async () => {
      assert.equal(await browser.getTitle(), 'eMAG.bg - Широка гама продукти', 'Window title should be "eMAG.bg - Широка гама продукти" for home page')
    })

    await allure.step('Storing initial window handle for later use', async () => {
      mainWindow = await browser.getWindowHandle()
    })

    await allure.step('Clicking on Facebook link', async () => {
      await socialLinksForm.clickFacebookLink()
    })

    await allure.step('Getting the number of tabs after clicking on facebook link', async () => {
      windowHandles = await browser.getWindowHandles()
    })

    await allure.step('Verifying that the url on the newly opened tab is correct', async () => {
      facebookWindow = windowHandles[windowHandles.length - 1]
      await browser.switchWindow(facebookWindow)
      assert.equal(await browser.getUrl(), 'https://www.facebook.com/eMAGbg', 'Window Url should be the facebook eMAG page')
    })

    await allure.step('Closing the Facebook tab', async () => {
      await browser.closeWindow()
    })

    await allure.step('Verifying that the number of tabs is now 1 after closing facebook tab', async () => {
      tabsCount = (await browser.getWindowHandles()).length

      assert.equal(tabsCount, 1, 'There should be only 1 tab after closing facebook tab')
    })

    await allure.step('Switching to main window handle', async () => {
      await browser.switchWindow(mainWindow)
    })

    await allure.step('Dismissing account log in popup', async () => {
      await homePage.dissmissAccountLoginPopUpIfNeeded()
    })

    await allure.step('Clicking on Youtube link', async () => {
      await socialLinksForm.clickYoutubeLink()
    })

    await allure.step('Getting the number of tabs after clicking on youtube link', async () => {
      windowHandles = await browser.getWindowHandles()
    })

    await allure.step('Switching to youtube tab', async () => {
      youtubeWindow = windowHandles[windowHandles.length - 1]
      await browser.switchWindow(youtubeWindow)
    })

    await allure.step('Accept Cookies if needed', async () => {
      await youtubeChannelPage.acceptYoutubeCookiesIfNeeded()
    })

    await allure.step('Verifying that the correct url is displayed', async () => {
      assert.include(await browser.getUrl(), 'https://www.youtube.com/channel/UC5y5r9BY5IiT4MkBrMtZRnA', 'Window Url should be the EMAG youtube channel page')
    })

    await allure.step('Closing the Youtube tab', async () => {
      await browser.closeWindow()
    })

    await allure.step('Verifying that the number of tabs is now 1 after closing youtube tab', async () => {
      tabsCount = (await browser.getWindowHandles()).length
      assert.equal(tabsCount, 1, 'There should be only 1 tab after closing youtube tab')
    })

    await allure.step('Switching to main window handle', async () => {
      await browser.switchWindow(mainWindow)
    })

    await allure.step('Clicking on Instagram link', async () => {
      await socialLinksForm.clickInstagramLink()
    })

    await allure.step('Getting the number of tabs after clicking on instagram link', async () => {
      windowHandles = await browser.getWindowHandles()
    })

    await allure.step('Verifying that the url on the newly opened tab is correct', async () => {
      instagramWindow = windowHandles[windowHandles.length - 1]
      await browser.switchWindow(instagramWindow)
      assert.equal(await browser.getUrl(), 'https://www.instagram.com/emag.bg_official/', 'Window Url should be the instagram eMAG page')
    })

    await allure.step('Closing the Instagram tab', async () => {
      await browser.closeWindow()
    })

    await allure.step('Verifying that the number of tabs is now 1 after closing instagram tab', async () => {
      tabsCount = (await browser.getWindowHandles()).length
      assert.equal(tabsCount, 1, 'There should be only 1 tab after closing instagram tab')
    })
  })
})
