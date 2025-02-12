const Label = require('../framework/Label.js')
const logger = require('../framework/logger.js')
const Button = require('../framework/Button.js')

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
      const cells = new Label(`//div[contains(@class, "${this.grid}")]//tr[${i}]//td/div`, `${this.gridName} BattleField Cells In Row ${i}`)
      this.battlefieldCells.push(await cells._getElements())
    }
  }

  static async create(grid, gridName) {
    logger.debug(`Creating an instance for ${gridName}`)
    const instance = new BaseGrid(grid, gridName)
    await instance.initialize()
    return instance
  }

  async selectRandomCellAndClick(row, cell) {
    const randomPosition = await this.getCell(row, cell)
    await randomPosition.waitForClickable()
    await randomPosition.click()
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

    if (cellIndex < 0) {
      logger.error('Invalid cell index. Must be between 1 and 10.')
      throw new Error('Invalid cell index. Must be between 1 and 10.')
    }
    return row[cellIndex]
  }
}

module.exports = BaseGrid
