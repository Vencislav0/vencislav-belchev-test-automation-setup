const ElectricalRazersPage = require('../../../eMagPages/ElectricalRazersPage.js')
const HomePage = require('../../../eMagPages/HomePage.js')
const { assert } = require('chai')
const browser = require('../../../framework/Browser.js')
const logger = require('../../../framework/logger.js')
const allure = require('@wdio/allure-reporter')

describe('eMAG Tests e2e', () => {
  const electricalRazersPage = new ElectricalRazersPage()
  const homePage = new HomePage()

  it('Should correctly sort prices and display relevant search results for electrical razers section', async () => {
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

    await logger.logStep('Navigating to electrical razers section')
    await homePage.hoverOnCategoriesMenu()
    await homePage.hoverOnBeautyAndHealthLabel()
    await homePage.clickOnElectricalRazersButton()

    await logger.logStep('Verifying that browser tab contains "Електрически самобръсначки"')
    assert.include(
      await browser.getTitle(),
      'Електрически самобръсначки',
      'browser tab should contain "Електрически самобръсначки" after redirecting to electrical razers section',
    )

    await logger.logStep('Verifying that section title is "Ел. самобръсначки"')
    assert.equal(
      await homePage.getSectionTitleText(),
      'Ел. самобръсначки',
      'section title should be "Ел. самобръсначки" after navigating to electrical razers section',
    )

    allure.endStep()

    allure.startStep('Step 3')

    await logger.logStep('Dissmissing account Log In popup')
    await homePage.dissmissAccountLoginPopUpIfNeeded()

    await logger.logStep('Navigating to search filter section and typing in "Braun"')
    await electricalRazersPage.clickSeeMoreButton()
    await electricalRazersPage.sendTextToSearchBox('Braun')

    await logger.logStep('Checking "Braun" checkbox and clicking filter button')
    await electricalRazersPage.checkBraunCheckBox()
    await electricalRazersPage.clickFilterButton()

    await logger.logStep('Verifying all results on the first page contain Braun in the title')

    await electricalRazersPage.initializeTitlesAndPrices()

    const titlesArrayFirstPage = await electricalRazersPage.getAllProductTitles()

    for (const title of titlesArrayFirstPage) {
      assert.include(title.toLowerCase(), 'braun', 'All products on the page should contain "Braun" in their title')
    }

    await logger.logStep('Verifying all results on the second page contain Braun in the title')
    await electricalRazersPage.clickNextPageButton()
    await electricalRazersPage.initializeTitlesAndPrices()

    const titlesArraySecondPage = await electricalRazersPage.getAllProductTitles()

    for (const title of titlesArraySecondPage) {
      assert.isTrue(
        title.toLowerCase().includes('braun') || title.toLowerCase().includes('браун'),
        'All products on the page should contain "Braun" in their title',
      )
    }

    allure.endStep()

    allure.startStep('Step 4')

    await logger.logStep('Sorting the results by price in descending order')
    await electricalRazersPage.sortPriceInDescendingOrder()

    await logger.logStep('Verifying that product is equal to or higher than the price of the following product.')

    await electricalRazersPage.initializeTitlesAndPrices()

    const pricesArray = await electricalRazersPage.getAllProductPrices()

    for (let i = 0; i < pricesArray.length - 1; i++) {
      assert.isAtLeast(pricesArray[i], pricesArray[i + 1], 'current product price should be higher or equal to the following product price')
    }

    allure.endStep()
  })
})
