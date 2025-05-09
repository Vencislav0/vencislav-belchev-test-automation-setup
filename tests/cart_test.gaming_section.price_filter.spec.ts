import { test, expect } from '../framework/my-setup'
import { assert } from 'chai'
import steps from '../src/steps/Steps.js'
import { Categories } from '../src/constants/Categories.js'
import { CategoryPage } from '../src/page_objects/category/CategoryPage.js'
import { Brands } from '../src/constants/Brands.js'
import { Status } from 'allure-js-commons'
import * as allure from 'allure-js-commons'
import { SidebarForm } from '../src/page_objects/category/filters/SidebarForm.js'
import { ProductForm } from '../src/page_objects/product/ProductForm.js'
import { PriceFilterForm } from '../src/page_objects/category/filters/PriceFilterForm.js'
import logger from '../framework/logger.js'
import { ProductPage } from '../src/page_objects/product/ProductPage.js'
import { ProductModalForm } from '../src/page_objects/product/ProductModalForm.js'
import { CartProductForm } from '../src/page_objects/cart/CartProductForm.js'
import { CartPage } from '../src/page_objects/cart/CartPage.js'

test.describe('eMAG e2e', () => {
  const sidebarForm = new SidebarForm()
  const priceFilter = new PriceFilterForm()
  const categoryPage = new CategoryPage(Categories.dummyCategory)
  const productPage = new ProductPage()
  const modalForm = new ProductModalForm()
  const cartPage = new CartPage()

  test('Should correctly sort based on price checkout to cart and delete from cart', async ({ page }) => {
    await steps.navigateToCategory(page, Categories.gamingConsoles)

    await allure.step('Navigating to "VR Gaming Очила" section from the sidebar', async () => {
      //needed for explicit waiting the change on section title product amount
      const initialProductAmount = await categoryPage.getSectionProductsAmount(page)

      await sidebarForm.clickItemByText(page, 'Hardware и преносими конзоли')
      await steps.waitUntilValueChange(initialProductAmount, async () => await categoryPage.getSectionProductsAmount(page))
    })

    await allure.step(
      'Dragging the price filter knob to the middle and verifying that minimum product price is changed and checkbox price is checked',
      async () => {
        //needed for explicit waiting the change on section title product amount
        const initialProductAmount = await categoryPage.getSectionProductsAmount(page)
        const priceBeforeFilter = await steps.getProductNumericValue(await new ProductForm(1).getPrice(page))

        await priceFilter.moveLeftKnob(page, 115)
        await steps.waitUntilValueChange(initialProductAmount, async () => await categoryPage.getSectionProductsAmount(page))
        const priceAfterFilter = await steps.getProductNumericValue(await new ProductForm(1).getPrice(page))

        assert.notStrictEqual(priceBeforeFilter, priceAfterFilter, `price after filtering should be different than price before`)
        assert.isTrue(priceAfterFilter >= priceBeforeFilter, `price after filter should be higher than before`)
      },
    )

    await allure.step('Clicking on the first product and verifying product page price and name are the same', async () => {
      const firstProduct = new ProductForm(1)
      const firstProductPrice = await steps.getProductNumericValue(await firstProduct.getPrice(page))
      const firstProductTitle = await firstProduct.getTitle(page)

      await firstProduct.clickOnProduct(page)
      const productPagePrice = await steps.getProductNumericValue(await productPage.getPrice(page))
      const productPageTitle = await productPage.getTitle(page)

      assert.equal(
        firstProductPrice,
        productPagePrice,
        `expected first product price: ${firstProductPrice} to be the same as product page price: ${productPagePrice}`,
      )
      assert.equal(
        firstProductTitle,
        productPageTitle.trim(),
        `expected first product title: ${firstProductTitle} to be the same as product page title: ${productPageTitle}`,
      )
    })

    await allure.step('Clicking on "Add To Cart" button verifying visible modal form and expected price and title', async () => {
      const productPagePrice = await steps.getProductNumericValue(await productPage.getPrice(page))
      const productPageTitle = await productPage.getTitle(page)

      await productPage.clickAddToCartButton(page)

      assert.isTrue(await modalForm.isVisible(page), 'Modal Form should be visible after clickind add to cart button')
      assert.equal(productPagePrice, await steps.getProductNumericValue(await modalForm.getPrice(page)), 'modal form price should be the same as product page')
      assert.equal(productPageTitle.trim(), (await modalForm.getTitle(page)).trim(), 'modal form title should be the same as product page')
    })

    await allure.step('Clicking on "Go Cart Button" and verifying navigation and product details', async () => {
      const productPagePrice = await steps.getProductNumericValue(await productPage.getPrice(page))
      const productPageTitle = await productPage.getTitle(page)

      await modalForm.clickGoToCartButton(page)
      const cartProduct = new CartProductForm()

      const cartProductPrice = await steps.getProductNumericValue(await cartProduct.getPrice(page))
      const cartProductTitle = await cartProduct.getTitle(page)

      assert.equal(await cartPage.getHeaderText(page), 'Количка за пазаруване', '"Количка за пазаруване" should be displayed after navigation')
      assert.equal(productPagePrice, cartProductPrice, 'cart product price should be the same as product page price')
      assert.equal(productPageTitle.trim(), cartProductTitle.trim(), 'cart product title should be the same as product page title')
    })

    await allure.step('Increasing product quantity and verifying correct details after', async () => {
      const product = new CartProductForm()
      const priceBeforeIncrease = await steps.getProductNumericValue(await product.getPrice(page))
      let dynamicPrice
      let increaseCount = 1

      while (!(await product.getIncreaseQntyButtonState(page)).includes('pe-none')) {
        dynamicPrice = await steps.getProductNumericValue(await product.getPrice(page))

        logger.info(await product.getIncreaseQntyButtonState(page))
        await product.clickIncreaseQntyButton(page)
        await steps.waitUntilValueChange(dynamicPrice, async () => await steps.getProductNumericValue(await product.getPrice(page)))

        increaseCount++
      }
      assert.equal(
        priceBeforeIncrease * increaseCount,
        await steps.getProductNumericValue(await product.getPrice(page)),
        'price after quantity increase should be double the initial',
      )
    })

    await allure.step('Deleting product and verifying empty cart and empty cart message', async () => {
      const product = new CartProductForm()

      await product.clickRemoveProductButton(page)

      assert.isFalse(await product.isVisible(page))
      assert.equal(
        await cartPage.getEmptyCartMessage(page),
        'Количката за пазаруване е празна. За да добавиш продукти в количката, моля да се върнеш в началото.',
        'Should display correct message on empty cart',
      )
    })
  })
})
