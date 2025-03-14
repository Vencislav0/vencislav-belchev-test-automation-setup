const HomePage = require('../../../eMagPages/HomePage.js')
const allure = require('@wdio/allure-reporter')
const ManufacturerFilterForm = require('../../../eMagPages/FilterForms/ManufacturerFilterForm.js')
const Steps = require('../../../eMagPages/Steps.js')
const browser = require('../../../framework/Browser.js')

async function testProductSortingAndFiltering(categoryPage, categoryName, brandName, brandLocalized, categoryShortName) {
  describe('eMAG Tests e2e', () => {
    const homePage = new HomePage()
    const filterForm = new ManufacturerFilterForm()
    it(`Should correctly sort prices and display relevant search results for ${categoryName} section`, async () => {
      await browser.windowMaximize()
      if (categoryShortName) {
        await Steps.navigateToCategory(categoryPage, homePage, categoryName, categoryShortName)
      } else {
        await Steps.navigateToCategory(categoryPage, homePage, categoryName)
      }

      await allure.step('Dismissing account Log In popup', async () => {
        await homePage.dissmissAccountLoginPopUpIfNeeded()
      })

      await Steps.filterProductsByBrand(brandName, filterForm)

      await allure.step(`Verifying all product titles contain ${brandName} on the first page`, async () => {
        await Steps.assertProductTitlesInclude(brandName, brandLocalized)
      })

      await allure.step('Navigating to the second page of products', async () => {
        await categoryPage.clickNextPageButton()
        await Steps.waitUntilUrlUpdates()
      })

      await allure.step(`Verifying all product titles contain ${brandName} on the second page`, async () => {
        await Steps.assertProductTitlesInclude(brandName, brandLocalized)
      })

      await allure.step('Sorting the results by price in descending order and verifying price consistency', async () => {
        await Steps.checkProductPricesInDescendingOrder()
      })
    })
  })
}

module.exports = { testProductSortingAndFiltering }
