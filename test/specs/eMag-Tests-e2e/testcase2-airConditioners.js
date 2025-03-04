const HomePage = require('../../../eMagPages/HomePage.js')
const allure = require('@wdio/allure-reporter')
const Category = require('../../../eMagPages/CategoryPage.js')
const ManufacturerFilterForm = require('../../../eMagPages/FilterForms/ManufacturerFilterForm.js')
const Steps = require('../../../eMagPages/Steps.js')
const browser = require('../../../framework/Browser.js')

describe('eMAG Tests e2e', () => {
  const airConditioningPage = new Category('airConditioners')
  const homePage = new HomePage()
  const filterForm = new ManufacturerFilterForm('Manufacturer')

  it('Should correctly sort prices and display relevant search results for air conditioners section', async () => {
    await browser.windowMaximize()
    await Steps.navigateToCategory(airConditioningPage, homePage, 'Климатици')

    await allure.step('Dissmissing account Log In popup', async () => {
      await homePage.dissmissAccountLoginPopUpIfNeeded()
    })

    await Steps.filterProductsByBrand('Daikin', filterForm)

    await allure.step('Verifying all product titles contain Daikin on the first page', async () => {
      await Steps.assertProductTitlesInclude('Daikin', 'Дайкин')
    })

    await allure.step('Verifying all product titles contain Daikin on the second page', async () => {
      await airConditioningPage.clickNextPageButton()
      await Steps.waitUntilUrlUpdates()
      await Steps.assertProductTitlesInclude('Daikin', 'Дайкин')
    })

    await allure.step(
      'Sorting the results by price in descending order and Verifying that product is equal to or higher than the price of the following product.',
      async () => {
        await Steps.checkProductPricesInDescendingOrder()
      },
    )
  })
})
