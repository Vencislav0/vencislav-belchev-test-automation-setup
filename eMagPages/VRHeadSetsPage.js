const Label = require('../framework/Label.js')
const BaseForm = require('../framework/BaseForm.js')
const Dropdown = require('../framework/Dropdown.js')
const CheckBox = require('../framework/Checkbox.js')
const Timeouts = require('../framework/timeouts.js')

class VRHeadSetsPage extends BaseForm {
  constructor() {
    super('//div[@class="page-container"]', 'VR Head Sets Page Container')
    this.leftKnob = new Label('//a[@class="knob left"]', 'Left Knob')
    this.slider = new Label('//div[@class="range-bar"]', 'Prices Slider')
    this.firstProductTitle = new Label('(//h2[@class="card-v2-title-wrapper"]/a)[1]', 'Title of the first product')
    this.firstProductPrice = new Label('(//p[@class="product-new-price"])[1]', 'Price of the first product')
    this.priceFrameCheckBox = new CheckBox('//a[@data-filter-id="6412" and text()="Ценова рамка"]', 'Price Frame CheckBox')
    this.ascendingOrderOption = new Label('//a[@data-sort-dir="asc" and @data-sort-id="price"]', 'Sort In Ascending Order Option')
    this.sortDropdown = new Dropdown('//div[@class="sort-control-item"]', 'Sorting Dropdown Menu')
  }

  async isPriceFrameCheckBoxChecked() {
    const state = await this.priceFrameCheckBox.getAttribute('class')

    return state.includes('active')
  }

  async clickFirstProductTitle() {
    await this.firstProductTitle.click()
  }

  async getFirstProductTitle() {
    return this.firstProductTitle.getText()
  }

  async moveKnobToMiddleOfSlider() {
    await this.leftKnob.moveToElement()
    const sliderSize = await this.slider.getSize()
    const targetX = parseInt(sliderSize.width / 2)
    await this.leftKnob.dragAndDrop(targetX, 0)

    await browser.waitUntil(
      async () => {
        return (await browser.getUrl()).includes('price,between')
      },
      { timeout: Timeouts.SHORT_TIMEOUT, timeoutMsg: 'Couldnt load page after filtering price' },
    )
  }

  async getFirstProductPrice() {
    const priceText = await this.firstProductPrice.getText()
    const numericValue = parseFloat(priceText.replace(/[^\d,]/g, '').replace(',', '.'))

    return numericValue
  }

  async sortPriceInAscendingOrder() {
    await this.sortDropdown.click()
    await this.ascendingOrderOption.click()
    await browser.waitUntil(
      async () => {
        return (await browser.getUrl()) === 'https://www.emag.bg/vr-gaming-ochila/sort-priceasc/c'
      },
      { timeout: Timeouts.SHORT_TIMEOUT, timeoutMsg: 'Couldnt sort by descending' },
    )
  }
}

module.exports = VRHeadSetsPage
