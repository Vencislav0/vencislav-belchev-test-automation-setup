const HomePage = require('../../../eMagPages/HomePage.js')
const ProductPage = require('../../../eMagPages/ProductPage.js')
const CartPage = require('../../../eMagPages/CartPage.js')
const ModalForm = require('../../../eMagPages/ModalForm.js')
const { assert } = require('chai')
const browser = require('../../../framework/Browser.js')
const logger = require('../../../framework/logger.js')
const allure = require('@wdio/allure-reporter')
const Category = require('../../../eMagPages/CategoryPage.js')
const PriceFilterForm = require('../../../eMagPages/FilterForms/PriceFilterForm.js')
const SortForm = require('../../../eMagPages/SortForm.js')
const ProductForm = require('../../../eMagPages/ProductForm.js')
const CartProductForm = require('../../../eMagPages/CartProductForm.js')
const Steps = require('../../../eMagPages/Steps.js')

describe('eMAG Tests e2e', () => {
  const homePage = new HomePage()
  const vrHeadSetsPage = new Category('vrHeadSets')
  const filterForm = new PriceFilterForm()
  const productPage = new ProductPage()
  const modalForm = new ModalForm()
  const cartPage = new CartPage()
  const sortForm = new SortForm()

  it('Should correctly filter prices and add products to cart aswell as increase the quantity', async () => {
    //await browser.windowMaximize()

    await allure.step('Navigating to eMag home page', async () => {
      await browser.openUrl('https://www.emag.bg/')
    })

    await allure.step('Accept Cookies and close Log In popup if needed', async () => {
      await homePage.acceptCookiesIfNeeded()
      await homePage.dissmissAccountLoginPopUpIfNeeded()
    })

    await allure.step('Verifying that the tab title is as expected', async () => {
      assert.equal(await browser.getTitle(), 'eMAG.bg - Широка гама продукти', 'Window title should be "eMAG.bg - Широка гама продукти" for home page')
    })

    await allure.step('Navigating to gaming consoles section', async () => {
      await homePage.hoverOnCategoriesMenu()
      await vrHeadSetsPage.hoverOnCategoryLabel()
      await new Category('gamingConsoles').clickOnCategoryNavigationButton()
    })

    await allure.step('Dissmissing account Log In popup', async () => {
      await homePage.dissmissAccountLoginPopUpIfNeeded()
    })

    await allure.step('Verifying that the browser tab contains "Гейминг конзоли"', async () => {
      assert.include(await browser.getTitle(), 'Гейминг конзоли', 'Browser tab should include "Гейминг конзоли" after redirection')
    })

    await allure.step('Verifying that the section title is "Гейминг конзоли"', async () => {
      assert.equal(await vrHeadSetsPage.getSectionTitleText(), 'Гейминг конзоли', 'Section title should be Гейминг конзоли on gaming consoles page')
    })

    await allure.step('Navigating to var headsets section', async () => {
      await homePage.hoverOnCategoriesMenu()
      await vrHeadSetsPage.hoverOnCategoryLabel()
      await vrHeadSetsPage.clickOnCategoryNavigationButton()
    })

    await logger.logStep('Defining product price before filter and after for later use')
    let productPriceAfterFilter
    let initialProductPrice
    let productTitleAfterFilter
    await logger.logStep('Defining product inside cart page')
    let cartProductTitle
    let cartProductPrice

    await allure.step('Dissmissing account Log In popup', async () => {
      await homePage.dissmissAccountLoginPopUpIfNeeded()
    })

    await allure.step('Verifying that the section title contains "VR Gaming Очила"', async () => {
      assert.equal(await vrHeadSetsPage.getSectionTitleText(), 'VR Gaming Очила', 'Section title should be "VR Gaming Очила" after redirecting')
    })

    await allure.step('Sorting prices in ascending order', async () => {
      await sortForm.sortPriceInAscendingOrder()
    })

    await allure.step('Storing initial price of the first product', async () => {
      const product = new ProductForm(1)
      const priceText = await product.getProductPrice(1)
      const numericValue = parseFloat(priceText.replace(/[^\d,]/g, '').replace(',', '.'))

      initialProductPrice = numericValue
    })

    await allure.step('Dragging the knob to the middle of the price range', async () => {
      await filterForm.moveLeftKnob(128)
      await Steps.waitUntilUrlUpdates()
    })

    await allure.step('Storing product price after price filter', async () => {
      const product = new ProductForm(1)

      productPriceAfterFilter = await Steps.getProductNumericValue(product)
    })

    await allure.step('Storing product title after price filter', async () => {
      const product = new ProductForm(1)

      productTitleAfterFilter = await product.getProductTitle()
    })

    await allure.step('Verifying that the minimum price is higher than the initial and that the price frame is checked', async () => {
      assert.isTrue(initialProductPrice < productPriceAfterFilter, 'Minimum product price should change after price filtering')
      assert.isTrue(await filterForm.isPriceFrameCheckBoxChecked(), 'Price frame checkbox should be checked after price filtering')
    })

    await logger.logStep('Getting the text and price of the first product for later comparison')
    const productTitle = productTitleAfterFilter
    const productPrice = productPriceAfterFilter

    await allure.step('Clicking the title of the first product on the page', async () => {
      await vrHeadSetsPage.clickProduct(1)
    })

    await allure.step('Verifying that the product title and price on VR headset page is the same as in the product page', async () => {
      const productPagePrice = await Steps.getProductNumericValue(productPage)
      const productPageTitle = await productPage.getProductTitle()
      assert.equal(productTitle, productPageTitle, 'Product title should be the same as the product title on the vr headset page')
      assert.equal(productPrice, productPagePrice, 'Product price should be the same as the product title on the vr headset page')
    })

    await allure.step('Clicking "Add To Cart" button', async () => {
      await productPage.clickAddToCartButton()
    })

    await allure.step('Verifying that the Modal Form is visible', async () => {
      assert.isTrue(await modalForm.isVisible(), 'Modal Form should be visible after clicking add to cart button')
    })

    await allure.step('Verifying that Modal Form title is "Продуктът e добавен в количката"', async () => {
      assert.equal(await modalForm.getModalFormTitle(), 'Продуктът е добавен в количката', 'Modal Form title should be "Продуктът е добавен в количката"')
    })

    await allure.step('Verifying that the price and product are correct by comparing them to the initial title and price', async () => {
      const modalFormPrice = await Steps.getProductNumericValue(modalForm)
      const modalFormTitle = await modalForm.getProductTitle()
      assert.equal(productTitle, modalFormTitle, 'Title should be the same as the initial product title')
      assert.equal(productPrice, modalFormPrice, 'Price should be the same as the initial product price')
    })

    await allure.step('Clicking on "See Cart" Button', async () => {
      await modalForm.clickSeeCartButton()
    })

    await logger.logStep('Initializing product object inside cart page and getting price and title')
    const cartProduct = new CartProductForm(1)

    cartProductPrice = await Steps.getProductNumericValue(cartProduct)
    cartProductTitle = await cartProduct.getProductTitle()

    await allure.step('Verifying that the correct product is displayed and page header is "Количка за пазаруване"', async () => {
      assert.equal(await cartPage.getCartPageHeaderText(), 'Количка за пазаруване', '"Количка за пазаруване" should be the header text')
      assert.equal(productTitle, cartProductTitle, 'Product title on cart page should be the same as initial product title before checkout')
      assert.equal(productPrice, cartProductPrice, 'Product price on cart page should be the same as initial product price before checkout')
    })

    await logger.logStep('Storing Quantity for comparison')
    const initialQuantity = await cartProduct.getQuantity()

    await allure.step('Clicking the + button', async () => {
      //products have only a select number of available products i will keep this at 1 for now we can discuss it
      //because sometimes it can fail because lets say there are 3 products and it cant go beyond that and test fails
      //keeping it at 1 still should verify that the price is multiplied by 2
      await cartProduct.clickOnIncreaseQntyButton()
    })

    await allure.step('Verifying that the quantity and price are correct after increasing by 1', async () => {
      const cartProduct = new CartProductForm(1)
      const productPriceAfterQntyIncrease = await Steps.getProductNumericValue(cartProduct)

      assert.equal(await cartProduct.getQuantity(), initialQuantity + 1, 'Quantity should be increased by 1 after clicking + once')
      assert.equal(cartProductPrice * 2, productPriceAfterQntyIncrease, 'Price should be double after clicking on + once')
    })

    await allure.step('Clicking on delete product button', async () => {
      await cartProduct.clickDeleteProductButton()
    })

    await allure.step('Verifying that the cart is empty by checking if product title is displayed and that empty cart message is displayed', async () => {
      assert.isFalse(await cartProduct.isProductTitleDisplayed(), 'Product shouldnt be in the cart after deletion')
      assert.isTrue(await cartPage.isEmptyCartMessageDisplayed(), 'Empty cart message should be displayed')
      assert.equal(
        await cartPage.getEmptyCartMessageText(),
        'Количката за пазаруване е празна. За да добавиш продукти в количката, моля да се върнеш в началото.',
        'Empty cart message should be correct',
      )
    })
  })
})
