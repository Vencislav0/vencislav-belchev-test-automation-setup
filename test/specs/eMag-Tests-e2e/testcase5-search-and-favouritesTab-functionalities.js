const HomePage = require('../../../eMagPages/HomePage.js')
const SearchBoxForm = require('../../../eMagPages/SearchBoxForm.js')
const FavoritesPage = require('../../../eMagPages/FavoritesPage.js')
const Category = require('../../../eMagPages/CategoryPage.js')
const SortForm = require('../../../eMagPages/SortForm.js')
const { assert } = require('chai')
const browser = require('../../../framework/Browser.js')
const logger = require('../../../framework/logger.js')
const allure = require('@wdio/allure-reporter')
const ProductForm = require('../../../eMagPages/ProductForm.js')
const FavoritesProductForm = require('../../../eMagPages/FavoritesProductForm.js')
const Steps = require('../../../eMagPages/Steps.js')

describe('eMAG Tests e2e', () => {
  const homePage = new HomePage()
  const searchBoxForm = new SearchBoxForm()
  const dronesPage = new Category('drones')
  const favoritesPage = new FavoritesPage()
  const sortForm = new SortForm()

  it('Should correctly perform search on items and favorites page and icons should work as expected', async () => {
    await browser.windowMaximize()

    await allure.step('Navigating to eMag home page', async () => {
      await browser.openUrl('https://www.emag.bg/')
    })

    await allure.step('Accept Cookies and close Log In popup if needed', async () => {
      await homePage.acceptCookiesIfNeeded()
      await homePage.dissmissAccountLoginPopUpIfNeeded()
    })

    await allure.step('Verifying that the tab title is as expected', async () => {
      assert.equal(await browser.getTitle(), 'eMAG.bg - Широка гама продукти', 'Window title should be "eMAG.bg - Широка гама продукти" for home page')
    })

    await allure.step('Clicking on search textbox', async () => {
      await searchBoxForm.clickOnSearchTextBox()
    })

    await allure.step('Verifying placeholder is as expected', async () => {
      assert.equal(await searchBoxForm.getSearchBoxPlaceHolder(), 'Какво търсиш днес?', 'Placeholder text should be "Какво търсиш днес?"')
    })

    await allure.step('Verifying that magnifier button and X button are displayed', async () => {
      assert.isTrue(await searchBoxForm.isSearchboxXButtonDisplayed(), 'X Button should be displayed on search box')
      assert.isTrue(await searchBoxForm.isSearchBoxMagnifierButtonDisplayed(), 'Magnifier button should be displayed on search box')
    })

    await allure.step('Verifying that correct text is on popular search results label and that it is displayed', async () => {
      assert.isTrue(await searchBoxForm.isPopularSearchResultsLabelDisplayed(), 'Popular search results text should be displayed')
      assert.equal(
        await searchBoxForm.getPopularSearchResultsText(),
        'Популярни търсения в eMAG',
        'text on popular search results label should be "Популярни търсения в eMAG"',
      )
    })

    await allure.step('Sending text to search box "dji mini 4 pro"', async () => {
      await searchBoxForm.sendTextToTextBox('dji mini 4 pro')
    })

    await allure.step('Verifying that the text inside the search box is the one sent', async () => {
      assert.equal(await searchBoxForm.getTextInsideSearchBox(), 'dji mini 4 pro', 'Text inside search box should be "dji mini 4 pro" after sending it')
    })

    await allure.step('Removing text from search box using X button', async () => {
      await searchBoxForm.clickXButton()
    })

    await allure.step('Verifying that search box is empty after clicking X button', async () => {
      assert.equal(await searchBoxForm.getTextInsideSearchBox(), '', 'Search box should be empty after clicking X button')
    })

    await allure.step('Sending text to search box "dji mini 4 pro"', async () => {
      await searchBoxForm.sendTextToTextBox('dji mini 4 pro')
    })

    await allure.step('Verifying that the text inside the search box is the one sent', async () => {
      assert.equal(await searchBoxForm.getTextInsideSearchBox(), 'dji mini 4 pro', 'Text inside search box should be "dji mini 4 pro" after sending it')
    })

    await allure.step('Clicking the magnifier button', async () => {
      await searchBoxForm.clickMagnifierButton()
    })

    await allure.step('Verifying header structure and that it contains the search string', async () => {
      const header = await dronesPage.getPageHeaderText()
      const patternToFollow = /^\d+\s+резултата\s+.+\s+за\s+"[^"]+"$/

      assert.isTrue(
        patternToFollow.test(header),
        `Header structure should follow this pattern "some_numbers резултата some_text за “search_string”" instead it was ${header}`,
      )
      assert.include(await dronesPage.getPageHeaderText(), 'dji mini 4 pro', 'Page header should contain "dji mini 4 pro"')
    })

    await allure.step('Sorting items by popularity', async () => {
      await sortForm.sortItemsByPopularity()
    })
    await logger.logStep('Initializing the first two products on the page')
    const firstProduct = new ProductForm(1)
    const secondProduct = new ProductForm(2)

    await allure.step('Verifying that the first item after sort contains "DJI"', async () => {
      assert.include(await firstProduct.getProductTitle(), 'DJI', 'First product title should contain "DJI"')
    })

    await allure.step('Clicking heart icon on the first two items on the page', async () => {
      await firstProduct.addProductToFavourites()
      await secondProduct.addProductToFavourites()
      await Steps.waitUntilHeartIconNumberIs2()
    })

    await allure.step('Verifying that the icon state for both products is active', async () => {
      assert.include(await firstProduct.getProductFavouriteState(), 'active', 'State of first product heart icon should be active after clicking it')
      assert.include(await secondProduct.getProductFavouriteState(), 'active', 'State of second product heart icon should be active after clicking it')
    })

    await allure.step('Verifying that the heart icon on header has the number 2 after adding the first two products to favourites', async () => {
      assert.equal(await dronesPage.getNumberOnHeartIcon(), '2', 'Number on heart icon should be 2 after adding 2 items to favourites')
    })

    logger.logStep('Storing price and title of the two products for later comparison')
    const firstProductTitle = await firstProduct.getProductTitle()
    const firstProductPrice = await firstProduct.getProductPrice()

    const secondProductTitle = await secondProduct.getProductTitle()
    const secondProductPrice = await secondProduct.getProductPrice()

    await allure.step('Clicking on favorites menu item in header', async () => {
      await dronesPage.clickHeartMenuItem()
    })

    await logger.logStep('Initializing the first two products on the page')
    const firstFavoritesProduct = new FavoritesProductForm(1)
    const secondFavoritesProduct = new FavoritesProductForm(2)

    await allure.step('Verifying that items from previous step are successfully added to favorites page with correct details', async () => {
      //at the moment there seems to be an issue maybe a bug, when adding product sometimes the price differs and the test fails,
      //i will attach a video of the issue inside Bugs-Recordings file

      const firstFavoritesProductTitle = await firstFavoritesProduct.getProductTitle()
      const firstFavoritesProductPrice = await firstFavoritesProduct.getProductPrice()

      const secondFavoritesProductTitle = await secondFavoritesProduct.getProductTitle()
      const secondFavoritesProductPrice = await secondFavoritesProduct.getProductPrice()

      assert.isTrue(
        firstFavoritesProductTitle === firstProductTitle || secondFavoritesProductTitle === firstProductTitle,
        'product title should be the same as the drones page product title',
      )
      assert.isTrue(
        firstFavoritesProductTitle === secondProductTitle || secondFavoritesProductTitle === secondProductTitle,
        'product title should be the same as the drones page product title',
      )

      assert.isTrue(
        firstFavoritesProductPrice === firstProductPrice || secondFavoritesProductPrice === firstProductPrice,
        'product price should be the same as the drones page product price',
      )

      assert.isTrue(
        firstFavoritesProductPrice === secondProductPrice || secondFavoritesProductPrice === secondProductPrice,
        'product price should be the same as the drones page product price',
      )
    })

    await allure.step('Verifying that favorites page header contains the text "Любими 2 Продукта"', async () => {
      assert.equal(await favoritesPage.getPageHeaderText(), 'Любими\n2 Продукта', 'Should have 2 products in the favorites tab')
    })

    await allure.step('Clicking delete button the the second product', async () => {
      await secondFavoritesProduct.clickProductDeleteButton()
    })

    await allure.step('Verify that the second product is no longer in favorites page', async () => {
      assert.isFalse(await secondFavoritesProduct.isProductDisplayed())
    })

    await allure.step('Verify that the page header "Любими 2 Продукта" went down by 1', async () => {
      assert.equal(await favoritesPage.getPageHeaderText(), 'Любими\n1 продукт', 'page header should contain "Любими 1 продукт" after deleting 1 product')
    })

    await allure.step('Clicking delete button the the last product', async () => {
      await firstFavoritesProduct.clickProductDeleteButton()
    })

    await allure.step('Verify that the second product is no longer in favorites page', async () => {
      assert.isFalse(await firstFavoritesProduct.isProductDisplayed())
    })

    await allure.step('Verify that the page header "Любими 1 Продукт" went down to 0', async () => {
      assert.equal(await favoritesPage.getPageHeaderText(), 'Любими\n0 Продукта', 'page header should contain "Любими 0 Продукта" after deleting 1 product')
    })
  })
})
