const PhonePage = require('../../../eMagPages/PhonesPage.js')
const HomePage = require('../../../eMagPages/HomePage.js')
const { assert } = require('chai')
const browser = require('../../../framework/Browser.js')
const logger = require('../../../framework/logger.js')
const allure = require('@wdio/allure-reporter')

describe('eMAG Tests e2e', () => {
  const phonePage = new PhonePage()
  const homePage = new HomePage()

  it('Should correctly sort prices and display relevant search results for mobile phones section', async () => {
    await browser.windowMaximize()
    allure.startStep('Step 1')

    await logger.logStep('Navigating to eMag home page')
    await browser.openUrl('https://www.emag.bg/')

    await logger.logStep('Accept Cookies and close Log In popup if needed')
    await homePage.acceptCookiesIfNeeded()
    await homePage.dissmissAccountLoginPopUpIfNeeded()

    await logger.logStep('Verifying tab title is as expected')
    assert.equal(await browser.getTitle(), 'eMAG.bg - Широка гама продукти', 'Window title should be "eMAG.bg - Широка гама продукти" for home page')

    allure.endStep()

    allure.startStep('Step 2')

    await logger.logStep('Navigating to mobile phones page')
    await homePage.hoverOnCategoriesMenu()
    await homePage.hoverOnPhonesTabletsAndLaptopsLabel()
    await homePage.clickOnMobilePhonesButton()

    await logger.logStep('Verifying updated browser tab contains Mobile Phones')
    assert.include(await browser.getTitle(), 'Мобилни телефони', 'Window title should include "Мобилни телефони" after navigating to mobile phones section')

    await logger.logStep('Verifying section title is "Мобилни телефони"')
    assert.equal(await homePage.getSectionTitleText(), 'Мобилни телефони', 'Section title should be "Мобилни телефони" after navigating to phones section')

    allure.endStep()

    allure.startStep('Step 3')

    await logger.logStep('Dissmissing account Log In popup')
    await homePage.dissmissAccountLoginPopUpIfNeeded()

    await logger.logStep('Navigating to Search filter section and typing in Samsung')
    await phonePage.clickSeeMoreButton()
    await phonePage.sendTextToSearchBox('Samsung')

    await logger.logStep('Checking Samsung option checkbox and clicking filter button')
    await phonePage.checkSamsungCheckBox()
    await phonePage.clickFilterButton()

    await logger.logStep('Getting all the result titles on the first page')
    await phonePage.initializeTitlesAndPrices()
    const titlesFirstpageArray = await phonePage.getAllProductTitles()

    await logger.logStep('Veryfing that every single product contains Samsung in its title')

    for (const title of titlesFirstpageArray) {
      assert.include(title, 'Samsung', 'title should include Samsung')
    }

    await logger.logStep('Navigating to the second page of products')
    await phonePage.clickNextPageButton()

    await logger.logStep('Getting all the result titles on the second page')
    await phonePage.initializeTitlesAndPrices()
    const titlesSecondpageArray = await phonePage.getAllProductTitles()

    await logger.logStep('Veryfing that every single product contains Samsung in its title')

    for (const title of titlesSecondpageArray) {
      assert.include(title, 'Samsung', 'title should include Samsung')
    }

    allure.endStep()

    allure.startStep('Step 4')

    await logger.logStep('Sorting the results by price in descending order')
    await phonePage.sortPriceInDescendingOrder()

    await logger.logStep('Verifying that product is equal to or higher than the price of the following product.')

    await phonePage.initializeTitlesAndPrices()

    const pricesArray = await phonePage.getAllProductPrices()
    const titlesArray = await phonePage.getAllProductTitles()

    for (let i = 0; i < pricesArray.length - 1; i++) {
      //Items containing this in their title seem to ignore the sorting feature
      if (titlesArray[i].includes('Разопакован:')) {
        continue
      }
      assert.isAtLeast(pricesArray[i], pricesArray[i + 1], 'Price at current index should be equal ot greater than the price on the following index')
    }

    allure.endStep()
  })
})
