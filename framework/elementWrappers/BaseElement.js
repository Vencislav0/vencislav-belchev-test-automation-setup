import logger from '../logger'
import { expect } from '@playwright/test'

export class BaseElement {
  constructor(selector, name) {
    this.name = name
    this.selector = selector
  }

  async _getElement(page) {
    return await page.locator(this.selector)
  }

  async click(page) {
    await expect(await this._getElement(page)).toBeEnabled()
    await page.waitForTimeout(200)
    logger.debug(`Clicking on ${this.name}`)
    await (await this._getElement(page)).click()
  }

  async isVisible(page) {
    const element = await this._getElement(page)
    const visible = await element.isVisible()
    logger.debug(`Checked visibility for element: ${this.name} - Visible: ${visible}`)
    return visible
  }

  async hover(page) {
    logger.debug(`Hovering on element: ${this.name}`)
    await (await this._getElement(page)).hover()
  }

  async count(page) {
    logger.debug(`Getting count of element: ${this.name}`)
    const element = await this._getElement(page)
    const count = await element.count()
    logger.debug(`Element count: ${count}`)
    return count
  }

  async doubleClick(page) {
    logger.debug(`double clicking element: ${this.name}`)
    await (await this._getElement(page)).dblClick()
  }

  async dragTo(page, target) {
    logger.debug(`Dragging ${this.name} to ${target.name}`)
    await (await this._getElement(page)).dragTo(await target._getElement(page))
  }

  async boundingBox(page) {
    logger.debug(`Getting size of ${this.name}`)
    const size = await (await this._getElement(page)).boundingBox()
    //logger.debug(`Size: ${size.x}, ${size.y}`)
    return size
  }

  async getAttribute(page, attribute) {
    logger.debug(`Getting attribute ${attribute} from: ${this.name}`)
    return await (await this._getElement(page)).getAttribute(attribute)
  }

  async last(page) {
    await this._getElement(page).last()
  }

  async nth(page, index) {
    logger.debug(`Getting ${this.name} from index: ${index}`)
    await this._getElement(page).nth(index)
  }

  async waitForState(page, state, timeout) {
    logger.debug(`waiting for ${this.name} to be in ${state} state`)
    try {
      await (await this._getElement(page)).waitFor({ state: state, timeout: timeout })
      return true
    } catch (error) {
      return false
    }
  }

  async getText(page) {
    logger.debug(`Getting text from ${this.name}`)
    const text = await (await this._getElement(page)).textContent()
    logger.debug(`Text: ${text}`)
    return text
  }
}
