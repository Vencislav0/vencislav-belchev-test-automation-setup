const HomePage = require('../../../eMagPages/HomePage.js')
const SearchBoxForm = require('../../../eMagPages/SearchBoxForm.js')
const DronesPage = require('../../../eMagPages/DronesPage.js')
const FavoritesPage = require('../../../eMagPages/FavoritesPage.js')
const { assert } = require('chai')
const browser = require('../../../framework/Browser.js')
const logger = require('../../../framework/logger.js')
const allure = require('@wdio/allure-reporter')

describe('eMAG Tests e2e', () => {
  const homePage = new HomePage()
  const searchBoxForm = new SearchBoxForm()
  const dronesPage = new DronesPage()
  const favoritesPage = new FavoritesPage()

  it('Should correctly perform search on items and favorites page and icons should work as expected', async () => {
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

    await logger.logStep('Clicking on search textbox')
    await searchBoxForm.clickOnSearchTextBox()

    await logger.logStep('Verifying placeholder is as expected')
    assert.equal(await searchBoxForm.getSearchBoxPlaceHolder(), 'Какво търсиш днес?', 'Placeholder text should be "Какво търсиш днес?"')

    await logger.logStep('Verifying that magnifier button and X button are displayed')
    assert.isTrue(await searchBoxForm.isSearchboxXButtonDisplayed(), 'X Button should be displayed on search box')
    assert.isTrue(await searchBoxForm.isSearchBoxMagnifierButtonDisplayed(), 'Magnifier button should be displayed on search box')

    await logger.logStep('Verifying that correct text is on popular search results label and that it is displayed')
    assert.isTrue(await searchBoxForm.isPopularSearchResultsLabelDisplayed(), 'Popular search results text should be displayed')
    assert.equal(
      await searchBoxForm.getPopularSearchResultsText(),
      'Популярни търсения в eMAG',
      'text on popular search results label should be "Популярни търсения в eMAG"',
    )

    allure.endStep()

    allure.startStep('Step 3')

    await logger.logStep('Sending text to search box "dji mini 4 pro"')
    await searchBoxForm.sendTextToTextBox('dji mini 4 pro')

    await logger.logStep('Verifying that the text inside the search box is the one sent')
    assert.equal(await searchBoxForm.getTextInsideSearchBox(), 'dji mini 4 pro', 'Text inside search box should be "dji mini 4 pro" after sending it')

    await logger.logStep('Removing text from search box using X button')
    await searchBoxForm.clickXButton()

    await logger.logStep('Verifying that search box is empty after clicking X button')
    assert.equal(await searchBoxForm.getTextInsideSearchBox(), '', 'Search box should be empty after clicking X button')

    allure.endStep()

    allure.startStep('Step 4')

    await logger.logStep('Sending text to search box "dji mini 4 pro"')
    await searchBoxForm.sendTextToTextBox('dji mini 4 pro')

    await logger.logStep('Verifying that the text inside the search box is the one sent')
    assert.equal(await searchBoxForm.getTextInsideSearchBox(), 'dji mini 4 pro', 'Text inside search box should be "dji mini 4 pro" after sending it')

    await logger.logStep('Clicking the magnifier button')
    await searchBoxForm.clickMagnifierButton()

    await logger.logStep('Verifying header structure and that it contains the search string')
    assert.isTrue(await dronesPage.isHeaderStructureCorrect(), 'Header structure should be correct')
    assert.include(await dronesPage.getPageHeaderText(), 'dji mini 4 pro', 'Page header should contain "dji mini 4 pro"')

    allure.endStep()

    allure.startStep('Step 5')

    await logger.logStep('Sorting items by popularity')
    await dronesPage.sortItemsByPopularity()

    await logger.logStep('Verifying that the first item after sort contains "DJI"')
    assert.include(await dronesPage.getFirstProductTitle(), 'DJI', 'First product title should contain "DJI"')

    allure.endStep()

    allure.startStep('Step 6')

    await logger.logStep('Storing title and price of the two products for later comparison')

    await logger.logStep('Clicking heart icon on the first two items on the page')
    await dronesPage.addFirstProductToFavourites()
    await dronesPage.addSecondProductToFavourites()

    await logger.logStep('Verifying that the icon state for both products is active')
    assert.include(await dronesPage.getFirstProductFavouriteState(), 'active', 'State of first product heart icon should be active after clicking it')
    assert.include(await dronesPage.getSecondProductFavouriteState(), 'active', 'State of second product heart icon should be active after clicking it')

    await logger.logStep('Verifying that the heart icon on header has the number 2 after adding the first two products to favourites')
    assert.equal(await dronesPage.getNumberOnHearIcon(), '2', 'Number on heart icon should be 2 after adding 2 items to favourites')

    allure.endStep()

    allure.startStep('Step 7')

    await logger.logStep('Clicking on favorites menu item in header')
    await dronesPage.clickHeartMenuItem()

    await logger.logStep('Verifying that items from previous step are successfully added to favorites page with correct details')
    assert.equal(
      await dronesPage.getFirstProductTitle(),
      await favoritesPage.getFirstProductTitle(),
      'first product title should be the same as the drones page product title',
    )
    assert.equal(
      await dronesPage.getSecondProductTitle(),
      await favoritesPage.getSecondProductTitle(),
      'second product title should be the same as the drones page product title',
    )

    assert.equal(
      await dronesPage.getFirstProductPrice(),
      await favoritesPage.getFirstProductPrice(),
      'first product price should be the same as the drones page product price',
    )
    assert.equal(
      await dronesPage.getSecondProductPrice(),
      await favoritesPage.getSecondProductPrice(),
      'first product price should be the same as the drones page product price',
    )

    await logger.logStep('Verifying that favorites page header contains the text "Любими 2 Продукта"')
    assert.equal(await favoritesPage.getPageHeaderText(), 'Любими\n2 Продукта', 'Should have 2 products in the favorites tab')

    allure.endStep()

    allure.startStep('Step 8')

    await logger.logStep('Clicking delete button the the second product')
    await favoritesPage.clickSecondProductDeleteButton()

    await logger.logStep('Verify that the second product is no longer in favorites page')
    assert.isFalse(await favoritesPage.isSecondProductDisplayed())

    await logger.logStep('Verify that the page header "Любими 2 Продукта" went down by 1')
    assert.equal(await favoritesPage.getPageHeaderText(), 'Любими\n1 продукт', 'page header should contain "Любими 1 продукт" after deleting 1 product')

    allure.endStep()

    allure.startStep('Step 9')

    await logger.logStep('Clicking delete button the the last product')
    await favoritesPage.clickFirstProductDeleteButton()

    await logger.logStep('Verify that the second product is no longer in favorites page')
    assert.isFalse(await favoritesPage.isFirstProductDisplayed())

    await logger.logStep('Verify that the page header "Любими 1 Продукт" went down to 0')
    assert.equal(await favoritesPage.getPageHeaderText(), 'Любими\n0 Продукта', 'page header should contain "Любими 0 Продукта" after deleting 1 product')

    allure.endStep()
  })
})
