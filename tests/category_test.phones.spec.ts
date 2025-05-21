import { test, expect } from '../framework/my-setup.js'
import steps from '../src/steps/Steps.js'
import { Categories } from '../src/constants/Categories.js'
import { Brands } from '../src/constants/Brands.js'

import { testProductsSortingAndFiltering } from './templates/category.js'

test.describe('eMAG e2e', () => {
  test(`Should correctly sort prices and display relevant search results for ${Categories.phones.categoryName} section`, async ({ page }) => {
    await steps.navigateToCategory(page, Categories.phones)
    await testProductsSortingAndFiltering(page, Brands.samsung, Categories.phones)
  })
})
