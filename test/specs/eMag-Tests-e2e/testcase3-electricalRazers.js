
const HomePage = require('../../../eMagPages/HomePage.js')
const { assert } = require('chai')
const browser = require('../../../framework/Browser.js')
const logger = require('../../../framework/logger.js')
const allure = require('@wdio/allure-reporter')
const Category = require('../../../eMagPages/Category.js')
const ProductForm = require('../../../eMagPages/ProductForm.js')

describe('eMAG Tests e2e', () => {
  const electricalRazersPage = new Category('ElectricalRazers', 'Braun')
  const homePage = new HomePage()
  const productForm = new ProductForm()

  it('Should correctly sort prices and display relevant search results for electrical razers section', async () => {
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

    await allure.step('Navigating to electrical razers section', async () => {
      await homePage.hoverOnCategoriesMenu()
      await homePage.hoverOnBeautyAndHealthLabel()
      await homePage.clickOnElectricalRazersButton()
    })

    await allure.step('Verifying that browser tab contains "Електрически самобръсначки"', async () => {
      assert.include(
        await browser.getTitle(),
        'Електрически самобръсначки',
        'browser tab should contain "Електрически самобръсначки" after redirecting to electrical razers section',
      )
    })

    await allure.step('Verifying that section title is "Ел. самобръсначки"', async () => {
      assert.equal(
        await homePage.getSectionTitleText(),
        'Ел. самобръсначки',
        'section title should be "Ел. самобръсначки" after navigating to electrical razers section',
      )
    })

    await allure.step('Dissmissing account Log In popup', async () => {
      await homePage.dissmissAccountLoginPopUpIfNeeded()
    })

    await allure.step('Navigating to search filter section and typing in "Braun"', async () => {
      await electricalRazersPage.clickSeeMoreButton()
      await electricalRazersPage.sendTextToSearchBox('Braun')
    })

    await allure.step('Checking "Braun" checkbox and clicking filter button', async () => {
      await electricalRazersPage.checkCheckBox()
      await electricalRazersPage.clickFilterButton()
    })

    await allure.step('Verifying all results on the first page contain Braun in the title', async () => {
      let i = 1
        while(await productForm.isValidProduct(i)){
          assert.isTrue((await productForm.getProductTitle(i)).toLowerCase().includes('braun') || (await productForm.getProductTitle(i)).toLowerCase().includes('браун'), 'title should include Braun')
          i++
        }
        i = 1
    })

    await allure.step('Verifying all results on the second page contain Braun in the title', async () => {
      await electricalRazersPage.clickNextPageButton()      
      let i = 1
        while(await productForm.isValidProduct(i)){
          assert.isTrue((await productForm.getProductTitle(i)).toLowerCase().includes('braun') || (await productForm.getProductTitle(i)).toLowerCase().includes('браун'), 'title should include Braun')
          i++
        }
        i = 1
    })

    await allure.step('Sorting the results by price in descending order', async () => {
      await electricalRazersPage.sortPriceInDescendingOrder()
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
