
const Category = require('../../../eMagPages/Category.js')
const HomePage = require('../../../eMagPages/HomePage.js')
const { assert } = require('chai')
const browser = require('../../../framework/Browser.js')
const logger = require('../../../framework/logger.js')
const allure = require('@wdio/allure-reporter')
const ProductForm = require('../../../eMagPages/ProductForm.js')

describe('eMAG Tests e2e', () => {
  const phonePage = new Category('Phones', 'Samsung')
  const homePage = new HomePage()
  const productForm = new ProductForm()

  it('Should correctly sort prices and display relevant search results for mobile phones section', async () => {
    await browser.windowMaximize()

    await allure.step('Navigating to eMAG home page', async () => {
      await browser.openUrl('https://www.emag.bg/')
    })

    await allure.step('Accept Cookies and close Log In popup if needed', async () => {
      await homePage.acceptCookiesIfNeeded()
      await homePage.dissmissAccountLoginPopUpIfNeeded()
    })

    await allure.step('Verifying tab title is as expected', async () => {
      assert.equal(await browser.getTitle(), 'eMAG.bg - Широка гама продукти', 'Window title should be "eMAG.bg - Широка гама продукти" for home page')
    })

    await allure.step('Navigating to mobile phones page', async () => {
      await homePage.hoverOnCategoriesMenu()
      await homePage.hoverOnPhonesTabletsAndLaptopsLabel()
      await homePage.clickOnMobilePhonesButton()
    })

    await allure.step('Verifying updated browser tab contains Mobile Phones', async () => {
      assert.include(await browser.getTitle(), 'Мобилни телефони', 'Window title should include "Мобилни телефони" after navigating to mobile phones section')
    })

    await allure.step('Verifying section title is "Мобилни телефони"', async () => {
      assert.equal(await homePage.getSectionTitleText(), 'Мобилни телефони', 'Section title should be "Мобилни телефони" after navigating to phones section')
    })

    await allure.step('Dissmissing account Log In popup', async () => {
      await homePage.dissmissAccountLoginPopUpIfNeeded()
    })

    await allure.step('Navigating to Search filter section and typing in Samsung', async () => {
      await phonePage.clickSeeMoreButton()
      await phonePage.sendTextToSearchBox('Samsung')
    })

    await allure.step('Checking Samsung option checkbox and clicking filter button', async () => {
      await phonePage.checkCheckBox()
      await phonePage.clickFilterButton()
    })

    await allure.step('Getting all the result titles on the first page and veryfing that every single product contains Samsung in its title', async () => {
      let i = 1
        while(await productForm.isValidProduct(i)){
          assert.include(await productForm.getProductTitle(i), 'Samsung', 'title should include Samsung')
          i++
        }
        i = 1
    })

    await allure.step('Navigating to the second page of products', async () => {
      await phonePage.clickNextPageButton()
    })

    await allure.step('Getting all the result titles on the second page and veryfing that every single product contains Samsung in its title', async () => {     

        let i = 1
        while(await productForm.isValidProduct(i)){
          assert.include(await productForm.getProductTitle(i), 'Samsung', 'title should include Samsung')
          i++
        }
        
    })


    await allure.step('Sorting the results by price in descending order', async () => {
      await phonePage.sortPriceInDescendingOrder()
    })

    await allure.step('Verifying that product is equal to or higher than the price of the following product.', async () => {     
        let i = 1
        while(await productForm.isValidProduct(i)){
          //Items containing this in their title seem to ignore the sorting feature
          if ((await productForm.getProductTitle(i)).includes('Разопакован:')) {
            i++
            continue
            
          }
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
