const Label = require('../framework/Label.js')
const BaseGrid = require('./BaseGrid.js')
const Button = require('../framework/Button.js')

class OpponentGrid extends BaseGrid {
  constructor(grid, gridName) {
    super(grid, gridName)
    this.opponentLabel = new Label('//div[@class="battlefield-label" and text()="Opponent\'s grid"]', 'Opponent Label')
  }

  static async setupOpponentGrid() {
    const opponentGrid = await OpponentGrid.create('battlefield battlefield__rival', 'Opponent grid')
    return opponentGrid
  }
}

module.exports = OpponentGrid
