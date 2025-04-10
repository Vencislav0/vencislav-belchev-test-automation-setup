const Label = require('../../../../framework//elementWrappers/Label.js')
const FilterForm = require('./FilterForm.js')
const CheckBox = require('../../../../framework/elementWrappers/Checkbox.js')

class PriceFilterForm extends FilterForm {
  constructor(filter) {
    if (!filter) {
      throw new Error('category not found, or still not implemented')
    }
    const filterLocator = `//div[@data-filter-id="${filter.filterID}"]`
    super(filterLocator, 'Price Filter Locator')
    this.priceFrameCheckBox = new CheckBox('//a[@data-filter-id="6412" and text()="Ценова рамка"]', 'Price Frame CheckBox')
    this.leftKnob = new Label(`${filterLocator}//a[@class="knob left"]`, 'Left Knob')
    this.slider = new Label(`${filterLocator}//div[@class="range-bar"]`, 'Prices Slider')
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
