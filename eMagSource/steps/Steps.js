const Browser = require('../../framework/Browser.js')
const Timeouts = require('../../framework/timeouts.js')
const ProductForm = require('../pageObjects/product/ProductForm.js')
const SortForm = require('../pageObjects/forms/SortForm.js')
const allure = require('@wdio/allure-reporter')
const { assert } = require('chai')
const CategoryPage = require('../pageObjects/CategoryPage.js')
const logger = require('../../framework/logger.js')
const HomePage = require('../../eMagSource/pageObjects/HomePage.js')

const categoryPage = new CategoryPage('dummyCategory')
const homePage = new HomePage()
const sortForm = new SortForm()

class Steps {
  constructor() {}

  async isValidProduct(productInstance) {
    try {
      return (await productInstance.productTitle.isDisplayed()) && (await productInstance.productPrice.isDisplayed())
    } catch (er) {
      return false
    }
  }

  async getProductNumericValue(priceText) {
    const numericValue = parseFloat(priceText.replace(/[^\d,]/g, '').replace(',', '.'))

    return numericValue
  }

  async waitUntilSectionTitleUpdates() {
    const initialSectionTitle = await categoryPage.getSectionTitleText()
    await browser.waitUntil(
      async () => {
        const newSectionTitle = await categoryPage.getSectionTitleText()
        return newSectionTitle !== initialSectionTitle
      },
      { timeout: Timeouts.SHORT_TIMEOUT, timeoutMsg: 'Couldnt load page after filtering price' },
    )
  }

  async waitUntilHeartIconNumberIs2() {
    await browser.waitUntil(
      async () => {
        return (await homePage.getNumberOnHeartIcon()) === 2
      },
      { timeout: Timeouts.DEFAULT_WAIT_INTERVAL, timeoutMsg: "Number on heart icon didn't update" },
    )
  }

  async waitUntilUrlUpdates() {
    const initialUrl = await browser.getUrl()
    await browser.waitUntil(
      async () => {
        return (await browser.getUrl()) !== initialUrl
      },
      { timeout: Timeouts.SHORT_TIMEOUT, timeoutMsg: 'Couldnt load next product page' },
    )
  }

  async assertProductTitlesInclude(brandName, brandLocalized) {
    const formsCount = await categoryPage.getFormsCount()
    logger.info(`Form count: ${formsCount}`)

    for (let i = 1; i < formsCount; i++) {
      const productForm = new ProductForm(i)
      const isValidProduct = await this.isValidProduct(productForm)

      if (!isValidProduct) {
        assert.isTrue(isValidProduct, `Form ${i} should have a valid title and price`)
      }

      const productTitle = (await productForm.getProductTitle()).toLowerCase()

      if (brandLocalized) {
        assert.isTrue(
          productTitle.includes(brandLocalized.toLowerCase()) || productTitle.includes(brandName.toLowerCase()),
          `Product ${i} title "${productTitle}" should include "${brandLocalized}" or "${brandName}"`,
        )
      } else {
        assert.isTrue(productTitle.includes(brandName.toLowerCase()), `Product ${i} title "${productTitle}" should include "${brandName}"`)
      }
    }
  }

  async checkProductPricesInDescendingOrder() {
    await sortForm.sortPriceInDescendingOrder()

    const formsCount = await categoryPage.getFormsCount()
    logger.info(`Form count: ${formsCount}`)

    for (let i = 1; i < formsCount; i++) {
      const productForm = new ProductForm(i)
      const nextProductForm = new ProductForm(i + 1)
      const isValidProduct = await this.isValidProduct(productForm)
      const isNextValidProduct = await this.isValidProduct(nextProductForm)

      if (!isValidProduct) {
        assert.isTrue(isValidProduct, `Form ${i} should have a valid title and price`)
      }

      if (!isNextValidProduct) {
        assert.isTrue(isNextValidProduct, `Form ${i} should have a valid title and price`)
      }

      let numericValue = await this.getProductNumericValue(await productForm.getProductPrice())
      const nextNumericValue = await this.getProductNumericValue(await nextProductForm.getProductPrice())

      // Special case: If the product is opened ("Разопакован:"), get the price of its new unboxed value
      const productTitle = await productForm.getProductTitle()
      if (productTitle.includes('Разопакован:')) {
        numericValue = await this.getProductNumericValue(await productForm.getOpenedProductPrice())
      }

      assert.isAtLeast(numericValue, nextNumericValue, `Price at current index ${i} should be equal or greater than the price of the following index`)
    }
  }

  async filterProductsByBrand(brand, filterFormInstance, popUpFilterFormInstance) {
    await allure.step(`Navigating to Search filter section and typing in ${brand}`, async () => {
      await filterFormInstance.clickSeeMoreButton()
      await popUpFilterFormInstance.sendTextToSearchBox(brand)
    })

    await allure.step(`Checking ${brand} option checkbox and clicking filter button`, async () => {
      await popUpFilterFormInstance.checkCheckBox(brand)
      await popUpFilterFormInstance.clickFilterButton()
      await this.waitUntilSectionTitleUpdates()
    })
  }

  async navigateToCategory(categoryObject) {
    const categoryInstance = new CategoryPage(categoryObject)

    await allure.step('Verifying tab title is as expected', async () => {
      assert.equal(await Browser.getTitle(), 'eMAG.bg - Широка гама продукти', 'Window title should be "eMAG.bg - Широка гама продукти" for home page')
    })

    await allure.step(`Navigating to ${categoryObject.categoryName} page`, async () => {
      await homePage.hoverOnCategoriesMenu()
      await categoryInstance.hoverOnCategoryLabel()
      await categoryInstance.clickOnItemButton()
    })

    await allure.step(`Verifying updated browser tab contains ${categoryObject.categoryName}`, async () => {
      assert.include(
        await Browser.getTitle(),
        categoryObject.categoryName,
        `Window title should include "${categoryObject.categoryName}" after navigating to section`,
      )
    })

    await allure.step(`Verifying section title is "${categoryObject.categoryName}"`, async () => {
      const actualTitle = await categoryInstance.getSectionTitleText()
      if (categoryObject.categoryShortName) {
        const expectedTitle = categoryObject.categoryShortName.trim()
        assert.equal(actualTitle, expectedTitle, `Section title should be "${categoryObject.categoryShortName}" after navigating to section`)
      } else {
        const expectedTitle = categoryObject.categoryName.trim()
        assert.equal(actualTitle, expectedTitle, `Section title should be "${categoryObject.categoryName}" after navigating to section`)
      }
    })
  }
}

module.exports = new Steps()
