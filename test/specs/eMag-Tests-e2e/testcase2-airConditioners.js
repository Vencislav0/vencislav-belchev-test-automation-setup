const AirConditioningPage = require('../../../eMagPages/AirConditionersPage.js')
const HomePage = require('../../../eMagPages/HomePage.js')
const { assert } = require('chai')
const browser = require('../../../framework/Browser.js')
const logger = require('../../../framework/logger.js')
const allure = require('@wdio/allure-reporter')

describe('eMAG Tests e2e', () => {
  const airConditioningPage = new AirConditioningPage()
  const homePage = new HomePage()

  it('Should correctly sort prices and display relevant search results for air conditioners section', async () => {
    await browser.windowMaximize()
    allure.startStep('Step 1')

    await logger.logStep('Navigating to eMag home page')
    await browser.openUrl('https://www.emag.bg/')

    await logger.logStep('Accept Cookies and close Log In popup if needed')
    await homePage.acceptCookiesIfNeeded()
    await homePage.dissmissAccountLoginPopUpIfNeeded()

    await logger.logStep('Verifying that the tab title is as expected')
    assert.equal(await browser.getTitle(), 'eMAG.bg - Широка гама продукти', 'Window title should be "eMAG.bg - Широка гама продукти" for home page')

    allure.endStep()

    allure.startStep('Step 2')

    await logger.logStep('Navigating to air conditioners section')
    await homePage.hoverOnCategoriesMenu()
    await homePage.hoverOnBigElectricalAppliancesLabel()
    await homePage.clickOnAirConditionersButton()

    await logger.logStep('Verifying updated browser tab contains air conditioners')
    assert.include(await browser.getTitle(), 'Климатици', 'Page tab should contain "Климатици" afte navigating to air conditioners section')

    await logger.logStep('Verifying section title is "Климатици"')
    assert.equal(await homePage.getSectionTitleText(), 'Климатици', 'Section title should be "Климатици" after navigating to phones section')

    allure.endStep()

    allure.startStep('Step 3')

    await logger.logStep('Dissmissing account Log In popup')
    await homePage.dissmissAccountLoginPopUpIfNeeded()

    await logger.logStep('Navigating to search filter section and typing in "Daikin"')
    await airConditioningPage.clickSeeMoreButton()
    await airConditioningPage.sendTextToSearchBox('Daikin')

    await logger.logStep('Checking "Daking" checkbox and clicking filter button')
    await airConditioningPage.checkDaikinCheckbox()
    await airConditioningPage.clickFilterButton()

    await logger.logStep('Verifying all product titles contain Daikin on the first page')

    await airConditioningPage.initializeTitlesAndPrices()

    const titlesArrayFirstPage = await airConditioningPage.getAllProductTitles()

    for (const title of titlesArrayFirstPage) {
      assert.include(title.toLowerCase(), 'daikin', 'title should include daikin')
    }

    await logger.logStep('Verifying all product titles contain Daikin on the second page')
    await airConditioningPage.clickNextPageButton()

    await airConditioningPage.initializeTitlesAndPrices()

    const titlesArraySecondPage = await airConditioningPage.getAllProductTitles()

    for (const title of titlesArraySecondPage) {
      assert.include(title.toLowerCase(), 'daikin', 'title should include daikin')
    }

    allure.endStep()

    allure.startStep('Step 4')

    await logger.logStep('Sorting the results by price in descending order')
    await airConditioningPage.sortPriceInDescendingOrder()

    await logger.logStep('Verifying that product is equal to or higher than the price of the following product.')

    await airConditioningPage.initializeTitlesAndPrices()

    const pricesArray = await airConditioningPage.getAllProductPrices()

    for (let i = 0; i < pricesArray.length - 1; i++) {
      assert.isAtLeast(pricesArray[i], pricesArray[i + 1], 'current product price should be higher or equal to the following product price')
    }

    allure.endStep()
  })
})
