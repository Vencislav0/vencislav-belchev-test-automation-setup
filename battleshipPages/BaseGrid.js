const Label = require('../framework/Label.js')
const logger = require('../framework/logger.js')
const Timeouts = require('../framework/timeouts.js')


class BaseGrid {
  constructor(grid, gridName) {
    this.grid = grid
    this.gridName = gridName
    this.battlefieldCells = []
  }

  async initialize() {
    for (let i = 1; i <= 10; i++) {
      const cells = []
      for (let j = 1; j <= 10; j++) {
        cells.push(new Label(`//div[contains(@class, "${this.grid}")]//tr[${i}]//td[${j}]`, `${this.gridName} Cell (${i}, ${j})`))
      }
      this.battlefieldCells.push(cells)
    }
  }

  static async create(grid, gridName) {
    logger.debug(`Creating an instance for ${gridName}`)
    const instance = new this(grid, gridName)
    await instance.initialize()
    return instance
  }

  async selectCellAndClick(row, cell) {
    try {
      await this.waitForNoOverlay()
    } catch (error) {
      logger.warn('Warning: Overlay did not disappear, likely the game ended, continuing test execution.')
    }
    const randomPosition = await this.getCell(row, cell)
    await randomPosition.waitForClickable()
    await randomPosition.click()
    await browser.waitUntil(
      async () => {
        return (await this.getCellState(row, cell)).includes('empty') === false
      },
      { timeout: Timeouts.EXTRA_SHORT_TIMEOUT, timeoutMsg: 'Cell was empty after timeout' },
    )
  }

  async getCell(rowNumber, cellIndex) {
    logger.debug(`Getting cell at row ${rowNumber}, column ${cellIndex + 1}.`)
    if (rowNumber < 1 || rowNumber > 10) {
      logger.error('Invalid row number. Must be between 1 and 10.')
      throw new Error('Invalid row number. Must be between 1 and 10.')
    }

    const row = this.battlefieldCells[rowNumber - 1]

    logger.debug(`Row lenght: ${row.length}`)

    if (cellIndex < 0 || cellIndex > 9) {
      logger.error('Invalid cell index. Must be between 0 and 9.')
      throw new Error('Invalid cell index. Must be between 0 and 9.')
    }
    return row[cellIndex]
  }

  async getCellState(rowNumber, cellIndex) {
    logger.debug(`Getting state of cell ${cellIndex} at row ${rowNumber}`)

    return (await this.getCell(rowNumber, cellIndex)).getAttribute('class')
  }

  async getAllCellsState() {
    const statesArray = []
    for (let i = 1; i <= 10; i++) {
      for (let j = 0; j < 10; j++) {
        statesArray.push(await this.getCellState(i, j))
      }
    }
    return statesArray
  }

  async waitForNoOverlay() {
    await browser.waitUntil(
      async () => {
        const overlays = new Label('//div[@class="battlefield battlefield__rival battlefield__wait"]/div[@class="battlefield-gap"]', 'Grid Overlay')
        return overlays.length === 0 || !(await overlays.isDisplayed())
      },
      { timeout: Timeouts.DEFAULT_WAIT_TIMEOUT, timeoutMsg: 'Overlays did not disappear in time' },
    )
  }
}

module.exports = BaseGrid
