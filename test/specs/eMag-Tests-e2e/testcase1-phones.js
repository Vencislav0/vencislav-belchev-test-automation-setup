const Category = require('../../../eMagPages/CategoryPage.js')
const HomePage = require('../../../eMagPages/HomePage.js')
const allure = require('@wdio/allure-reporter')
const ManufacturerFilterForm = require('../../../eMagPages/FilterForms/ManufacturerFilterForm.js')
const Steps = require('../../../eMagPages/Steps.js')

describe('eMAG Tests e2e', () => {
  const phonePage = new Category('phones')
  const homePage = new HomePage()
  const filterForm = new ManufacturerFilterForm()

  it('Should correctly sort prices and display relevant search results for mobile phones section', async () => {
    await Steps.navigateToCategory(phonePage, homePage, 'Мобилни телефони')

    await allure.step('Dissmissing account Log In popup', async () => {
      await homePage.dissmissAccountLoginPopUpIfNeeded()
    })

    await Steps.filterProductsByBrand('Samsung', filterForm)

    await allure.step('Getting all the result titles on the first page and veryfing that every single product contains Samsung in its title', async () => {
      await Steps.assertProductTitlesInclude('Samsung', 'Самсунг')
    })

    await allure.step('Navigating to the second page of products', async () => {
      await phonePage.clickNextPageButton()
      await Steps.waitUntilUrlUpdates()
    })

    await allure.step('Getting all the result titles on the second page and veryfing that every single product contains Samsung in its title', async () => {
      await Steps.assertProductTitlesInclude('Samsung', 'Самсунг')
    })

    await allure.step(
      'Sorting the results by price in descending order and Verifying that product is equal to or higher than the price of the following product.',
      async () => {
        await Steps.checkProductPricesInDescendingOrder()
      },
    )
  })
})
