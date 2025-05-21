import { Filters } from '../../../constants/Filters'
import { FilterForm } from './FilterForm'
import { Checkbox } from '../../../../framework/elementWrappers/Checkbox'
import { Label } from '../../../../framework/elementWrappers/Label'

export class PriceFilterForm extends FilterForm {
  constructor() {
    const filterLocator = `//div[@data-filter-id="${Filters.price.filterID}"]`
    super(filterLocator, 'Price Filter Locator')
    this.priceFrameCheckBox = new Checkbox('//a[@data-filter-id="6412" and text()="Ценова рамка"]', 'Price Frame CheckBox')
    this.leftKnob = new Label(`${filterLocator}//a[@class="knob left"]`, 'Left Knob')
    this.slider = new Label(`${filterLocator}//div[@class="range-bar"]`, 'Prices Slider')
  }

  async moveLeftKnob(page, moveAmount) {
    const knobBox = await this.leftKnob.boundingBox(page)
    await this.leftKnob.hover(page)
    if (!knobBox) {
      throw new Error('Left knob not found or not visible')
    }

    const startX = knobBox.x + knobBox.width / 2
    const startY = knobBox.y + knobBox.height / 2

    await page.mouse.down()

    await page.mouse.move(startX + moveAmount, startY, { steps: 10 })
    await page.mouse.up()
  }

  async isPriceFrameChecked(page) {
    const state = await this.priceFrameCheckBox.getAttribute(page, 'class')

    return state.includes('active')
  }
}
