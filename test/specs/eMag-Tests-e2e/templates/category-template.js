const allure = require('@wdio/allure-reporter')
const ManufacturerFilterForm = require('../../../../eMagSource/forms/filterForms/ManufacturerFilterForm.js')
const Steps = require('../../../../eMagSource/steps/Steps.js')
const Category = require('../../../../eMagSource/pageObjects/CategoryPage.js')

async function testProductSortingAndFiltering(categoryObject, brandObject) {
  const categoryPage = new Category(categoryObject)
  const filterForm = new ManufacturerFilterForm()

  await Steps.filterProductsByBrand(brandObject.brandName, filterForm)

  await allure.step(`Verifying all product titles contain ${brandObject.brandName} on the first page`, async () => {
    await Steps.assertProductTitlesInclude(brandObject.brandName, brandObject.brandLocalized)
  })

  await allure.step('Navigating to the second page of products', async () => {
    await categoryPage.clickNextPageButton()
    await Steps.waitUntilUrlUpdates()
  })

  await allure.step(`Verifying all product titles contain ${brandObject.brandName} on the second page`, async () => {
    await Steps.assertProductTitlesInclude(brandObject.brandName, brandObject.brandLocalized)
  })

  await allure.step('Sorting the results by price in descending order and verifying price consistency', async () => {
    await Steps.checkProductPricesInDescendingOrder()
  })
}

module.exports = { testProductSortingAndFiltering }
