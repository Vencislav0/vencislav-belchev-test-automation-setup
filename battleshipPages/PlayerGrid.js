const Label = require('../framework/Label.js')
const logger = require('../framework/logger.js')
const BaseGrid = require('./BaseGrid.js')
const Button = require('../framework/Button.js')

class PlayerGrid extends BaseGrid {
  constructor(grid, gridName) {
    super(grid, gridName)
    this.playerGridLabel = new Label('//div[@class="battlefield-label" and text()="Your grid"]', 'Player Grid Label')
  }

  static async setupPlayerGrid() {
    const playerGrid = await PlayerGrid.create('battlefield battlefield__self', 'Player grid')
    return playerGrid
  }
}

module.exports = PlayerGrid
