const HomePage = require('../../../eMagPages/HomePage.js')
const allure = require('@wdio/allure-reporter')
const Category = require('../../../eMagPages/CategoryPage.js')
const ManufacturerFilterForm = require('../../../eMagPages/FilterForms/ManufacturerFilterForm.js')
const Steps = require('../../../eMagPages/Steps.js')

describe('eMAG Tests e2e', () => {
  const electricalRazersPage = new Category('electricalRazers')
  const homePage = new HomePage()
  const filterForm = new ManufacturerFilterForm()

  it('Should correctly sort prices and display relevant search results for electrical razers section', async () => {
    await Steps.navigateToCategory(electricalRazersPage, homePage, 'Електрически самобръсначки')

    await allure.step('Dissmissing account Log In popup', async () => {
      await homePage.dissmissAccountLoginPopUpIfNeeded()
    })

    await Steps.filterProductsByBrand('Braun', filterForm)

    await allure.step('Verifying all results on the first page contain Braun in the title', async () => {
      await Steps.assertProductTitlesInclude('Braun', 'Браун')
    })

    await allure.step('Verifying all results on the second page contain Braun in the title', async () => {
      await electricalRazersPage.clickNextPageButton()
      await Steps.waitUntilUrlUpdates()
      await Steps.assertProductTitlesInclude('Braun', 'Браун')
    })

    await allure.step(
      'Sorting the results by price in descending order and Verifying that product is equal to or higher than the price of the following product.',
      async () => {
        await Steps.checkProductPricesInDescendingOrder()
      },
    )
  })
})
