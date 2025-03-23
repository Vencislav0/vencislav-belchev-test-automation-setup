const allure = require('@wdio/allure-reporter')
const PopUpFilterForm = require('../../../../eMagSource/pageObjects/forms/filterForms/PopUpFilterForm.js')
const FilterForm = require('../../../../eMagSource/pageObjects/forms/filterForms/FilterForm.js')
const Filters = require('../../../../eMagSource/constants/Filters.js')
const Steps = require('../../../../eMagSource/steps/Steps.js')
const CategoryPage = require('../../../../eMagSource/pageObjects/CategoryPage.js')

async function testProductSortingAndFiltering(categoryObject, brandObject) {
  const categoryPage = new CategoryPage(categoryObject)
  const popupfilterForm = new PopUpFilterForm(Filters.manufacturer)
  const filterForm = new FilterForm(Filters.manufacturer)

  await Steps.filterProductsByBrand(brandObject.brandName, filterForm, popupfilterForm)

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
