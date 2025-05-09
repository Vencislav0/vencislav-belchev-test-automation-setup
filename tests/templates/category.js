import steps from '../../src/steps/Steps'
import { FilterForm } from '../../src/page_objects/category/filters/FilterForm'
import { PopUpFilterForm } from '../../src/page_objects/category/filters/PopUpFilterForm'
import { HomePage } from '../../src/page_objects/HomePage'
import { Filters } from '../../src/constants/Filters.js'
import { CategoryPage } from '../../src/page_objects/category/CategoryPage'
import * as allure from 'allure-js-commons'
import { Categories } from '../../src/constants/Categories.js'

export async function testProductsSortingAndFiltering(page, brandObject, CategoryObject) {
  const manufacturerFilter = new FilterForm(Filters.manufacturer)
  const popUpFilter = new PopUpFilterForm(Filters.manufacturer)
  const categoryPage = new CategoryPage(CategoryObject)
  await steps.filterProductsByBrand(page, brandObject, manufacturerFilter, popUpFilter)
  await steps.assertProductTitlesInclude(page, brandObject.brandName, brandObject.brandLocalized)

  await allure.step('Navigating to the second page', async () => {
    await categoryPage.clickSecondPageButton(page)
    await steps.assertProductTitlesInclude(page, brandObject.brandName, brandObject.brandLocalized)
    await steps.verifyProductPricesInDescendingOrder(page)
  })
}
