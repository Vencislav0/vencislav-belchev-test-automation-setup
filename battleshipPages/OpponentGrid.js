const Label = require('../framework/Label.js')
const BaseGrid = require('./BaseGrid.js')
const Button = require('../framework/Button.js')

class OpponentGrid extends BaseGrid {
  constructor() {
    super('battlefield battlefield__rival', 'Opponent grid')
    this.opponentLabel = new Label('//div[@class="battlefield-label" and text()="Opponent\'s grid"]', 'Opponent Label')
  }

  static async setupOpponentGrid() {
    const opponentGrid = await OpponentGrid.create(this.grid, this.gridName)
    return opponentGrid
  }

  async destroyShip(arr, direction) {
    let cellState
    let huntMode = false
    const lastPosition = arr.length - 1
    //right
    if (arr[lastPosition][1] + 1 < 10 && direction.value == 0) {
      await this.selectCellAndClick(arr[lastPosition][0], arr[lastPosition][1] + 1)

      cellState = await this.getCellState(arr[lastPosition][0], arr[lastPosition][1] + 1)

      if (cellState.includes('hit')) {
        arr.push([arr[lastPosition][0], arr[lastPosition][1] + 1])
      }
      if (cellState.includes('done')) {
        huntMode = true
        arr.length = 0
        direction.value = 0
        return huntMode
      }
      if (!cellState.includes('hit')) {
        direction.value++
        arr.push([arr[0][0], arr[0][1]])
        return huntMode
      }
    } else if (direction.value == 0) {
      direction.value++
    }
    //left
    if (arr[lastPosition][1] - 1 >= 0 && direction.value == 1) {
      await this.selectCellAndClick(arr[lastPosition][0], arr[lastPosition][1] - 1)

      cellState = await this.getCellState(arr[lastPosition][0], arr[lastPosition][1] - 1)

      if (cellState.includes('hit')) {
        arr.push([arr[lastPosition][0], arr[lastPosition][1] - 1])
      }
      if (cellState.includes('done')) {
        huntMode = true
        arr.length = 0
        direction.value = 0
        return huntMode
      }
      if (!cellState.includes('hit')) {
        direction.value++
        arr.push([arr[0][0], arr[0][1]])
        return huntMode
      }
    } else if (direction.value == 1) {
      direction.value++
    }

    //down
    if (arr[lastPosition][0] + 1 <= 10 && direction.value == 2) {
      await this.selectCellAndClick(arr[lastPosition][0] + 1, arr[lastPosition][1])

      cellState = await this.getCellState(arr[lastPosition][0] + 1, arr[lastPosition][1])

      if (cellState.includes('hit')) {
        arr.push([arr[lastPosition][0] + 1, arr[lastPosition][1]])
      }
      if (cellState.includes('done')) {
        huntMode = true
        arr.length = 0
        direction.value = 0
        return huntMode
      }
      if (!cellState.includes('hit')) {
        direction.value++
        arr.push([arr[0][0], arr[0][1]])
        return huntMode
      }
    } else if (direction.value == 2) {
      direction.value++
    }
    //up
    if (arr[lastPosition][0] - 1 > 0 && direction.value == 3) {
      await this.selectCellAndClick(arr[lastPosition][0] - 1, arr[lastPosition][1])

      cellState = await this.getCellState(arr[lastPosition][0] - 1, arr[lastPosition][1])

      if (cellState.includes('hit')) {
        arr.push([arr[lastPosition][0] - 1, arr[lastPosition][1]])
      }
      if (cellState.includes('done')) {
        huntMode = true
        arr.length = 0
        direction.value = 0
        return huntMode
      }
      if (!cellState.includes('hit')) {
        direction.value++
        arr.push([arr[0][0], arr[0][1]])
        return huntMode
      }
    } else if (direction.value == 3) {
      direction.value++
    }

    return huntMode
  }
}

module.exports = OpponentGrid
