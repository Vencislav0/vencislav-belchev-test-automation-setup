const HomePage = require('../../../eMagSource/pageObjects/HomePage.js')
const Steps = require('../../../eMagSource/steps/Steps.js')
const allure = require('@wdio/allure-reporter')
const { testProductSortingAndFiltering } = require('./templates/category-template.js')
const Categories = require('../../../eMagSource/constants/Categories.js')
const Brands = require('../../../eMagSource/constants/Brands.js')

// The first page of the Braun brand sometimes displays 62 products instead of 60.
// This issue is documented under Bugs-Recordings (see screenshots):
// - InconsistentProductCountLoggerSS
// - InconsistentProductCountDevTools
// I can reproduce this issue roughly every 2 to 3 test runs.

describe('eMAG Tests e2e', async () => {
  const homePage = new HomePage()
  it(`Should correctly sort prices and display relevant search results for ${Categories.electricalRazers.categoryName} section`, async () => {
    await Steps.navigateToCategory(Categories.electricalRazers)
    await allure.step('Accept Cookies and close Log In popup if needed', async () => {
      await homePage.acceptCookiesIfNeeded()
      await homePage.dissmissAccountLoginPopUpIfNeeded()
    })
    await testProductSortingAndFiltering(Categories.electricalRazers, Brands.braun)
  })
})
