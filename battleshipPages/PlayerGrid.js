const Label = require('../framework/Label.js')
const BaseGrid = require('./BaseGrid.js')

class PlayerGrid extends BaseGrid {
  constructor() {
    super('battlefield battlefield__self', 'Player grid')
    this.playerGridLabel = new Label('//div[@class="battlefield-label" and text()="Your grid"]', 'Player Grid Label')
  }

  static async setupPlayerGrid() {
    const playerGrid = await PlayerGrid.create(this.grid, this.gridName)
    return playerGrid
  }
}

module.exports = PlayerGrid
