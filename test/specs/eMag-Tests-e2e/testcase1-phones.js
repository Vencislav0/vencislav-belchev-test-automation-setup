const HomePage = require('../../../eMagSource/pageObjects/HomePage.js')
const Steps = require('../../../eMagSource/steps/Steps.js')
const { testProductSortingAndFiltering } = require('./templates/category-template.js')
const Categories = require('../../../eMagSource/constants/Categories.js')
const Brands = require('../../../eMagSource/constants/Brands.js')

describe('eMAG Tests e2e', async () => {
  const homePage = new HomePage()
  it(`Should correctly sort prices and display relevant search results for ${Categories.phones.categoryName} section`, async () => {
    await Steps.navigateToCategory(Categories.phones, homePage)
    await testProductSortingAndFiltering(Categories.phones, Brands.samsung)
  })
})
