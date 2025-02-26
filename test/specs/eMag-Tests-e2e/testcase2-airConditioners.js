
const HomePage = require('../../../eMagPages/HomePage.js')
const { assert } = require('chai')
const browser = require('../../../framework/Browser.js')
const logger = require('../../../framework/logger.js')
const allure = require('@wdio/allure-reporter')
const Category = require('../../../eMagPages/Category.js')
const ProductForm = require('../../../eMagPages/ProductForm.js')

describe('eMAG Tests e2e', () => {
  const airConditioningPage = new Category('AirConditioners', 'Daikin')
  const homePage = new HomePage()
  const productForm = new ProductForm()

  it('Should correctly sort prices and display relevant search results for air conditioners section', async () => {
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

    await allure.step('Navigating to air conditioners section', async () => {
      await homePage.hoverOnCategoriesMenu()
      await homePage.hoverOnBigElectricalAppliancesLabel()
      await homePage.clickOnAirConditionersButton()
    })

    await allure.step('Verifying updated browser tab contains air conditioners', async () => {
      assert.include(await browser.getTitle(), 'Климатици', 'Page tab should contain "Климатици" afte navigating to air conditioners section')
    })

    await allure.step('Verifying section title is "Климатици"', async () => {
      assert.equal(await homePage.getSectionTitleText(), 'Климатици', 'Section title should be "Климатици" after navigating to phones section')
    })

    await allure.step('Dissmissing account Log In popup', async () => {
      await homePage.dissmissAccountLoginPopUpIfNeeded()
    })

    await allure.step('Navigating to search filter section and typing in "Daikin"', async () => {
      await airConditioningPage.clickSeeMoreButton()
      await airConditioningPage.sendTextToSearchBox('Daikin')
    })

    await allure.step('Checking "Daking" checkbox and clicking filter button', async () => {
      await airConditioningPage.checkCheckBox()
      await airConditioningPage.clickFilterButton()
    })

    await allure.step('Verifying all product titles contain Daikin on the first page', async () => {
      let i = 1
        while(await productForm.isValidProduct(i)){
          assert.include((await productForm.getProductTitle(i)).toLowerCase(), 'daikin', 'title should include Daikin')
          i++
        }
        i = 1
    })

    await allure.step('Verifying all product titles contain Daikin on the second page', async () => {
      await airConditioningPage.clickNextPageButton()
      let i = 1
        while(await productForm.isValidProduct(i)){
          assert.include((await productForm.getProductTitle(i)).toLowerCase(), 'daikin', 'title should include Daikin')
          i++
        }
        i = 1
    })

    await allure.step('Sorting the results by price in descending order', async () => {
      await airConditioningPage.sortPriceInDescendingOrder()
    })

    await allure.step('Verifying that product is equal to or higher than the price of the following product.', async () => {
      let i = 1
      while(await productForm.isValidProduct(i)){
               
        if(await productForm.isValidProduct(i + 1)){
          assert.isAtLeast(await productForm.getProductPrice(i),await productForm.getProductPrice(i + 1), 'Price at current index should be equal ot greater than the price on the following index')
        i++
        }
        else{
          i++
          continue            
        }          
      }

    })
  })
})
