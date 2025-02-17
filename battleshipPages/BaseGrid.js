const Label = require('../framework/Label.js')
const logger = require('../framework/logger.js')
const Timeouts = require('../framework/timeouts.js')

class BaseGrid {
  constructor(grid, gridName) {
    this.grid = grid
    this.gridName = gridName
    this.battleFieldRows = []
    this.battlefieldCells = []
  }

  async initialize() {
    for (let i = 1; i <= 10; i++) {
      this.battleFieldRows.push(new Label(`//div[contains(@class, "${this.grid}")]//tr[${i}]`, `${this.gridName} Battlefield Row ${i}`))
      const cells = new Label(`//div[contains(@class, "${this.grid}")]//tr[${i}]//td`, `${this.gridName} BattleField Cells In Row ${i}`)
      this.battlefieldCells.push(await cells._getElements())
    }
  }

  static async create(grid, gridName) {
    logger.debug(`Creating an instance for ${gridName}`)
    const instance = new this(grid, gridName)
    await instance.initialize()
    return instance
  }

  async selectCellAndClick(row, cell) {
    const randomPosition = await this.getCell(row, cell)
    await randomPosition.waitForClickable()
    await randomPosition.click()
    await browser.waitUntil(
      async () => {
        return (await this.getCellState(row, cell)).includes('empty') == false
      },
      { timeout: Timeouts.EXTRA_SHORT_TIMEOUT, timeoutMsg: 'Cell was empty after timeout' },
    )
  }

  async getRow(rowNumber) {
    logger.debug(`Getting row at ${rowNumber}.`)
    if (rowNumber < 1 || rowNumber > 10) {
      logger.error('Invalid row number. Must be between 1 and 10.')
      throw new Error('Invalid row number. Must be between 1 and 10.')
    }
    return this.battleFieldRows[rowNumber - 1]
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
    await this.initialize()
    logger.debug(`Getting state of cell ${cellIndex} at row ${rowNumber}`)

    return (await this.getCell(rowNumber, cellIndex)).getAttribute('class')
  }

  async getAllCellsState() {
    const statesArray = []
    let row = 0
    let cell = 0
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        statesArray.push(await this.battlefieldCells[row][cell].getAttribute('class'))
        cell++
      }

      row++
      cell = 0
    }
    return statesArray
  }
}

module.exports = BaseGrid
