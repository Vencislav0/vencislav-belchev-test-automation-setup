import { assert } from 'chai'
import { Timeouts } from '../../framework/timeouts'
import * as allure from 'allure-js-commons'
import { HomePage } from '../page_objects/HomePage'
import { CategoryPage } from '../page_objects/category/CategoryPage'
import { ProductForm } from '../page_objects/product/ProductForm'
import logger from '../../framework/logger'
import { Categories } from '../constants/Categories'
import { SortDropdownForm } from '../page_objects/category/SortDropdownForm'
import { waitUntil } from '../../framework/util_functions'

const homePage = new HomePage()
const categoryPage = new CategoryPage(Categories.dummyCategory)
const sortForm = new SortDropdownForm()

class Steps {
  constructor() {}

  async isValidProduct(page, productInstance) {
    try {
      return (await productInstance.productTitle.isVisible(page)) && productInstance.productPrice.isVisible(page)
    } catch (error) {
      return false
    }
  }

  async waitUntilHeartIconIs2(page){
    await waitUntil(async () => {
      return (await homePage.getNumberOnHeartIcon(page)) === '2'
    }, {errorMessage: "Heart Icon didn\n't update in time", timeout: Timeouts.EXTRA_SHORT_TIMEOUT})
  }

  async waitForURLToChange(page) {
    const initialURL = page.url()

    // Wait until the page's URL is different
    await page.waitForFunction(
      (oldURL) => window.location.href !== oldURL,
      {}, // options
      initialURL, // arg passed into the function
    )

    await page.waitForTimeout(200)
  }

  async waitUntilValueChange(initialValue, getNewValue) {
    await waitUntil(
      async () => {
        const currentValue = await getNewValue()
        return initialValue !== currentValue
      },
      { errorMessage: 'Value didnt change in time', timeout: Timeouts.EXTRA_SHORT_TIMEOUT },
    )
  }

  async getProductNumericValue(priceText) {
    const numericValue = parseFloat(priceText.replace(/[^\d,]/g, '').replace(',', '.'))

    return numericValue
  }

  async navigateToCategory(page, categoryObject) {
    const categoryPage = new CategoryPage(categoryObject)
    await allure.step('Verifying page title is as expected', async () => {
      let retries = 3

      for(let i = 0; i <= retries; i++){
        try {
        assert.include(await page.title(), 'Широка гама продукти', 'page title should be eMAG.bg  - Широка гама продукти')
        break
      } catch (error) {

        if(i === retries){
          logger.warn(`Title check failed after ${retries} attempts.`)
          throw error
        }
        logger.warn("Title check failed retrying.. ")
        logger.warn(`Attempt: ${i + 1}`)
        
        await new Promise(res => setTimeout(res, 1000))
      }
      }
      
      
    })

    await allure.step(`Navigating to category ${categoryObject.categoryName}`, async () => {
      await homePage.hoverOnCategoryMenu(page)
      await categoryPage.hoverOnCategoryLabel(page)
      await categoryPage.clickItemButton(page)
      await this.waitForURLToChange(page)
    })

    await allure.step(`Verify that the section title contains ${categoryObject.categoryName} aswell as browser tab`, async () => {
      assert.include(await page.title(), categoryObject.categoryName, `Category section tab should be ${categoryObject.categoryName}`)
      if (categoryObject.categoryShortName) {
        assert.equal(
          await categoryPage.getSectionTitle(page),
          categoryObject.categoryShortName,
          `Category section title should be ${categoryObject.categoryShortName}`,
        )
      } else {
        assert.equal(await categoryPage.getSectionTitle(page), categoryObject.categoryName, `Category section title should be ${categoryObject.categoryName}`)
      }
    })
  }

  async filterProductsByBrand(page, brand, filterForm, popUpFilterForm) {
    await allure.step(`Navigating to search filter section and typing in ${brand.brandName}`, async () => {
      await filterForm.clickSeeMoreButton(page)
      await popUpFilterForm.sendTextToSearchBox(page, brand.brandName)
    })

    await allure.step(`Checking ${brand.brandName} checkbox and clicking filter button`, async () => {
      await popUpFilterForm.checkCheckBox(page, brand.brandName)
      await popUpFilterForm.clickFilterButton(page)
    })

    logger.info(`${brand.brandName.toLowerCase()}`)
    await page.waitForURL(new RegExp(`${brand.brandName}`, 'i'))
  }

  async assertProductTitlesInclude(page, brandName, brandNameLocalized) {
    await allure.step(`Verifying that each title on the page contains ${brandName}`, async () => {
      const formCount = await categoryPage.getFormsCount(page)
      logger.info(`Form count: ${formCount}`)

      for (let i = 1; i <= formCount; i++) {
        const productForm = new ProductForm(i)
        const isValidProduct = this.isValidProduct(productForm)
        if (!isValidProduct) {
          assert.isTrue(isValidProduct, `Product should have visible title and price`)
        }
        const productTitle = (await productForm.getTitle(page)).toLowerCase()

        if (brandNameLocalized) {
          assert.isTrue(
            productTitle.includes(brandNameLocalized.toLowerCase()) || productTitle.includes(brandName.toLowerCase()),
            `Product ${i} title "${productTitle}" should include "${brandName} or ${brandNameLocalized}"`,
          )
        } else {
          assert.include(productTitle, brandName.toLowerCase(), `Product ${i} title "${productTitle}" should include "${brandName}"`)
        }
      }
    })
  }

  async verifyProductPricesInDescendingOrder(page) {
    await allure.step('Sorting prices in descending order', async () => {
      await sortForm.sortPriceInDescendingOrder(page)
      await this.waitForURLToChange(page)
    })

    await allure.step("Verifying each product's price is higher than the next", async () => {
      const formCount = await categoryPage.getFormsCount(page)
      logger.info(`Form count: ${formCount}`)

      for (let i = 1; i < formCount; i++) {
        const product = new ProductForm(i)
        const nextProduct = new ProductForm(i + 1)
        let isValidProduct = await this.isValidProduct(page, product)

        if (!isValidProduct) {
          assert.isTrue(isValidProduct, `Product should have visible title and price`)
        }

        isValidProduct = await this.isValidProduct(page, nextProduct)

        if (!isValidProduct) {
          assert.isTrue(isValidProduct, `Product should have visible title and price`)
        }
        let productPrice = await this.getProductNumericValue(await product.getPrice(page))
        const nextProductPrice = await this.getProductNumericValue(await nextProduct.getPrice(page))

        if ((await product.getTitle(page)).includes('Разопакован:')) {
          productPrice = await this.getProductNumericValue(await product.getOpenedPrice(page))
        }

        assert.isTrue(productPrice >= nextProductPrice, `Product price :${productPrice} should be higher than the following product price: ${nextProductPrice}`)
      }
    })
  }
}

const steps = new Steps()
export default steps
