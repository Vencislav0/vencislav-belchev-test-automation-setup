const Label = require('../framework/Label.js')
const Browser = require('../framework/Browser.js')
const Timeouts = require('../framework/timeouts.js')
const ProductForm = require('./ProductForm.js')
const SortForm = require('./SortForm.js')
const allure = require('@wdio/allure-reporter')
const { assert } = require('chai')
const Category = require('./CategoryPage.js')

const categoryPage = new Category('dummyCategory')
const sortForm = new SortForm()

class Steps {
  constructor() {
    this.categoryProductLocator = new Label('//div[@id="card_grid"]//div[@class="card-v2"]', 'Locator For Forms Inside Categories')
  }

  async getFormsCount() {
    const count = await this.categoryProductLocator._getElements()

    return count.length
  }

  async isValidProduct(productInstance) {
    try {
      return (await productInstance.productTitle.isDisplayed()) && (await productInstance.productPrice.isDisplayed())
    } catch (er) {
      return false
    }
  }

  async getProductNumericValue(product) {
    const priceText = await product.getProductPrice()
    const numericValue = parseFloat(priceText.replace(/[^\d,]/g, '').replace(',', '.'))

    return numericValue
  }

  async getNumericValueOfOpenedProduct(product) {
    const priceText = await product.getOpenedProductPrice()
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
        return (await categoryPage.getNumberOnHeartIcon()) === 2
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
    const formsCount = await this.getFormsCount()

    for (let i = 1; i < formsCount; i++) {
      const productForm = new ProductForm(i)

      if (!(await this.isValidProduct(productForm))) {
        assert.fail('valid product', 'invalid product', `Form ${i} should have a valid title and price`)
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

    const formsCount = await this.getFormsCount()

    for (let i = 1; i < formsCount; i++) {
      const productForm = new ProductForm(i)
      const nextProductForm = new ProductForm(i + 1)

      if (!(await this.isValidProduct(productForm))) {
        assert.fail(`Form ${i} should have a valid title and price`)
      }

      if (!(await this.isValidProduct(nextProductForm))) {
        continue
      }

      let numericValue = await this.getProductNumericValue(productForm)
      const nextNumericValue = await this.getProductNumericValue(nextProductForm)

      // Special case: If the product is opened ("Разопакован:"), get the price of its new unboxed value
      const productTitle = await productForm.getProductTitle()
      if (productTitle.includes('Разопакован:')) {
        numericValue = await this.getNumericValueOfOpenedProduct(productForm)
      }

      assert.isAtLeast(numericValue, nextNumericValue, `Price at current index ${i} should be equal or greater than the price of the following index`)
    }
  }

  async filterProductsByBrand(brand, filterFormInstance) {
    await allure.step(`Navigating to Search filter section and typing in ${brand}`, async () => {
      await filterFormInstance.clickSeeMoreButton()
      await filterFormInstance.sendTextToSearchBox(brand)
    })

    await allure.step(`Checking ${brand} option checkbox and clicking filter button`, async () => {
      await filterFormInstance.checkCheckBox(brand)
      await filterFormInstance.clickFilterButton()
      await this.waitUntilSectionTitleUpdates()
    })
  }

  async navigateToCategory(categoryInstance, homePageInstance, categoryName, shortCategoryName) {
    await allure.step('Navigating to eMAG home page', async () => {
      await Browser.openUrl('https://www.emag.bg/')
    })

    await allure.step('Accept Cookies and close Log In popup if needed', async () => {
      await homePageInstance.acceptCookiesIfNeeded()
      await homePageInstance.dissmissAccountLoginPopUpIfNeeded()
    })

    await allure.step('Verifying tab title is as expected', async () => {
      assert.equal(await Browser.getTitle(), 'eMAG.bg - Широка гама продукти', 'Window title should be "eMAG.bg - Широка гама продукти" for home page')
    })

    await allure.step(`Navigating to ${categoryName} page`, async () => {
      await homePageInstance.hoverOnCategoriesMenu()
      await categoryInstance.hoverOnCategoryLabel()
      await categoryInstance.clickOnItemButton()
    })

    await allure.step(`Verifying updated browser tab contains ${categoryName}`, async () => {
      assert.include(await Browser.getTitle(), categoryName, `Window title should include "${categoryName}" after navigating to section`)
    })

    await allure.step(`Verifying section title is "${categoryName}"`, async () => {
      const actualTitle = await categoryInstance.getSectionTitleText()
      if (shortCategoryName) {
        const expectedTitle = shortCategoryName.trim()
        assert.equal(actualTitle, expectedTitle, `Section title should be "${shortCategoryName}" after navigating to section`)
      } else {
        const expectedTitle = categoryName.trim()
        assert.equal(actualTitle, expectedTitle, `Section title should be "${categoryName}" after navigating to section`)
      }
    })
  }
}

module.exports = new Steps()
