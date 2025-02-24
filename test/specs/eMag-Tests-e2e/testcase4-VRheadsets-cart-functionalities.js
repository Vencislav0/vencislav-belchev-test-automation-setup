const HomePage = require('../../../eMagPages/HomePage.js')
const VRHeadSetsPage = require('../../../eMagPages/VRHeadSetsPage.js')
const ProductPage = require('../../../eMagPages/ProductPage.js')
const CartPage = require('../../../eMagPages/CartPage.js')
const ModalForm = require('../../../eMagPages/ModalForm.js')
const { assert } = require('chai')
const browser = require('../../../framework/Browser.js')
const logger = require('../../../framework/logger.js')
const allure = require('@wdio/allure-reporter')

describe('eMAG Tests e2e', () => {
  const homePage = new HomePage()
  const vrHeadSetsPage = new VRHeadSetsPage()
  const productPage = new ProductPage()
  const modalForm = new ModalForm()
  const cartPage = new CartPage()

  it('Should correctly filter prices and add products to cart aswell as increase the quantity', async () => {
    await browser.windowMaximize()
    allure.startStep('Step 1')

    await logger.logStep('Navigating to eMag home page')
    await browser.openUrl('https://www.emag.bg/')

    await logger.logStep('Accept Cookies and close Log In popup if needed')
    await homePage.acceptCookiesIfNeeded()
    await homePage.dissmissAccountLoginPopUpIfNeeded()

    await logger.logStep('Verifying that the tab title is as expected')
    assert.equal(await browser.getTitle(), 'eMAG.bg - Широка гама продукти', 'Window title should be "eMAG.bg - Широка гама продукти" for home page')

    allure.endStep()

    allure.startStep('Step 2')

    await logger.logStep('Navigating to gaming consoles section')
    await homePage.hoverOnCategoriesMenu()
    await homePage.hoverOnGamingLabel()
    await homePage.clickOnGamingConsoleButton()

    await logger.logStep('Dissmissing account Log In popup')
    await homePage.dissmissAccountLoginPopUpIfNeeded()

    await logger.logStep('Verifying that the browser tab contains "Гейминг конзоли"')
    assert.include(await browser.getTitle(), 'Гейминг конзоли', 'Browser tab should include "Гейминг конзоли" after redirection')

    await logger.logStep('Verifying that the section title is "Гейминг конзоли"')
    assert.equal(await homePage.getSectionTitleText(), 'Гейминг конзоли', 'Section title should be Гейминг конзоли on gaming consoles page')

    allure.endStep()

    allure.startStep('Step 3')

    await logger.logStep('Navigating to var headsets section')
    await homePage.hoverOnCategoriesMenu()
    await homePage.hoverOnGamingLabel()
    await homePage.clickOnVRHeadSetsButton()

    await logger.logStep('Dissmissing account Log In popup')
    await homePage.dissmissAccountLoginPopUpIfNeeded()

    await logger.logStep('Verifying that the section title contains "VR Gaming Очила"')
    assert.equal(await homePage.getSectionTitleText(), 'VR Gaming Очила', 'Section title should be "VR Gaming Очила" after redirecting')

    allure.endStep()

    allure.startStep('Step 4')

    await logger.logStep('Sorting prices in ascending order')

    await vrHeadSetsPage.sortPriceInAscendingOrder()

    await logger.logStep('Storing initial price of the first product')

    const initialProductPrice = await vrHeadSetsPage.getFirstProductPrice()

    await logger.logStep('Dragging the knob to the middle of the price range')
    await vrHeadSetsPage.moveKnobToMiddleOfSlider()

    await logger.logStep('Storing product price after price filter')

    const productPriceAfterFilter = await vrHeadSetsPage.getFirstProductPrice()

    await logger.logStep('Verifying that the minimum price is higher than the initial and that the price frame is checked')
    assert.isTrue(initialProductPrice < productPriceAfterFilter, 'Minimum product price should change after price filtering')
    assert.isTrue(await vrHeadSetsPage.isPriceFrameCheckBoxChecked(), 'Price frame checkbox should be checked after price filtering')

    allure.endStep()

    allure.startStep('Step 5')

    await logger.logStep('Getting the text and price of the first product for later comparison')
    const productTitle = await vrHeadSetsPage.getFirstProductTitle()
    const productPrice = await vrHeadSetsPage.getFirstProductPrice()

    await logger.logStep('Clicking the title of the first product on the page')
    await vrHeadSetsPage.clickFirstProductTitle()

    await logger.logStep('Verifying that the product title and price on VR headset page is the same as in the product page')
    assert.equal(productTitle, await productPage.getProductTitle(), 'Product title should be the same as the product title on the vr headset page')
    assert.equal(productPrice, await productPage.getProductPrice(), 'Product price should be the same as the product title on the vr headset page')

    allure.endStep()

    allure.startStep('Step 6')

    await logger.logStep('Clicking "Add To Cart" button')

    await productPage.clickAddToCartButton()

    await logger.logStep('Verifying that the Modal Form is visible')
    assert.isTrue(await modalForm.isVisible(), 'Modal Form should be visible after clicking add to cart button')

    await logger.logStep('Verifying that Modal Form title is "Продуктът e добавен в количката"')
    assert.equal(await modalForm.getModalFormTitle(), 'Продуктът е добавен в количката', 'Modal Form title should be "Продуктът е добавен в количката"')

    await logger.logStep('Verifying that the price and product are correct by comparing them to the initial title and price')
    assert.equal(productTitle, await modalForm.getModalFormProductTitle(), 'Title should be the same as the initial product title')
    assert.equal(productPrice, await modalForm.getModalFormProductPrice(), 'Price should be the same as the initial product price')

    allure.endStep()

    allure.startStep('Step 7')

    await logger.logStep('Clicking on "See Cart" Button')
    await modalForm.clickSeeCartButton()

    await logger.logStep('Verifying that the correct product is displayed and page header is "Количка за пазаруване"')
    assert.equal(await cartPage.getCartPageHeaderText(), 'Количка за пазаруване', '"Количка за пазаруване" should be the header text')
    assert.equal(productTitle, await cartPage.getProductTitle(), 'Product title on cart page should be the same as initial product title before checkout')
    assert.equal(productPrice, await cartPage.getProductPrice(), 'Product price on cart page should be the same as initial product price before checkout')

    allure.endStep()

    allure.startStep('Step 8')

    await logger.logStep('Storing Quantity for comparison')

    const initialQuantity = await cartPage.getQuantityOfProduct()

    await logger.logStep('Clicking the + button')
    //for some reason it won't let me click it more than once, maybe i am missing something, we can discuss it.
    await cartPage.clickOnIncreaseQntyButton()

    await logger.logStep('Verifying that the quantity and price are correct after increasing by 1')
    assert.equal(await cartPage.getQuantityOfProduct(), initialQuantity + 1, 'Quantity should be increased by 1 after clicking + once')
    assert.equal(productPrice * 2, await cartPage.getProductPrice(), 'Price should be double after clicking on + once')

    allure.endStep()

    allure.startStep('Step 9')

    logger.logStep('Clicking on delete product button')
    await cartPage.clickDeleteProductButton()

    logger.logStep('Verifying that the cart is empty by checking if product title is displayed and that empty cart message is displayed')

    assert.isFalse(await cartPage.isProductTitleDisplayed(), 'Product shouldnt be in the cart after deletion')
    assert.isTrue(await cartPage.isEmptyCartMessageDisplayed(), 'Empty cart message should be displayed')
    assert.equal(
      await cartPage.getEmptyCartMessageText(),
      'Количката за пазаруване е празна. За да добавиш продукти в количката, моля да се върнеш в началото.',
      'Empty cart message should be correct',
    )

    allure.endStep()
  })
})
