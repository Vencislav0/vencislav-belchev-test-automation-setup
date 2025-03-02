const Label = require('../../framework/Label.js')
const FilterForm = require('./BaseFilterForm.js')
const CheckBox = require('../../framework/Checkbox.js')

class PriceFilterForm extends FilterForm {
  constructor() {
    super('//div[@class="filter filter-default js-filter" and @data-name="Цена"]', 'Price Filter Locator')
    this.priceFrameCheckBox = new CheckBox('//a[@data-filter-id="6412" and text()="Ценова рамка"]', 'Price Frame CheckBox')
    this.leftKnob = new Label('//a[@class="knob left"]', 'Left Knob')
    this.slider = new Label('//div[@class="range-bar"]', 'Prices Slider')
  }

  async moveLeftKnob(moveAmount) {
    await this.leftKnob.moveToElement()
    //check value inside sliderSize when you need to calculate and adjust for your case
    //const sliderSize = await this.slider.getSize()
    await this.leftKnob.dragAndDrop(moveAmount, 0)
  }

  async isPriceFrameCheckBoxChecked() {
    const state = await this.priceFrameCheckBox.getAttribute('class')

    return state.includes('active')
  }
}

module.exports = PriceFilterForm
