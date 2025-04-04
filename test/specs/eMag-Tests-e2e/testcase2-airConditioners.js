const HomePage = require('../../../eMagSource/pageObjects/HomePage.js')
const Steps = require('../../../eMagSource/steps/Steps.js')
const allure = require('@wdio/allure-reporter')
const { testProductSortingAndFiltering } = require('./templates/category-template.js')
const Categories = require('../../../eMagSource/constants/Categories.js')
const Brands = require('../../../eMagSource/constants/Brands.js')

describe('eMAG Tests e2e', async () => {
  const homePage = new HomePage()
  it(`Should correctly sort prices and display relevant search results for ${Categories.airConditioners.categoryName} section`, async () => {
    await Steps.navigateToCategory(Categories.airConditioners)
    await allure.step('Accept Cookies and close Log In popup if needed', async () => {
      await homePage.acceptCookiesIfNeeded()
      await homePage.dissmissAccountLoginPopUpIfNeeded()
    })
    await testProductSortingAndFiltering(Categories.airConditioners, Brands.daikin)
  })
})
