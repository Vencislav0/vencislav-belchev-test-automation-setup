const Label = require('../framework/Label.js')
const BaseGrid = require('./BaseGrid.js')
const Button = require('../framework/Button.js')

class OpponentGrid extends BaseGrid {
  constructor() {
    super('battlefield battlefield__rival', 'Opponent grid')
    this.opponentLabel = new Label('//div[@class="battlefield-label" and text()="Opponent\'s grid"]', 'Opponent Label')     
  }

  static Direction =  {
    Right: 0,
    Left: 1,
    Down: 2,
    Up: 3
    
  }


  static async setupOpponentGrid() {
    const opponentGrid = await OpponentGrid.create(this.grid, this.gridName)
    return opponentGrid
  }

  async destroyShip(arr, direction) {   
    let huntMode = false;
          
    if(direction.value === OpponentGrid.Direction.Right){
        huntMode = await this.processRightMove(arr, direction, huntMode)
      }

    

      if(direction.value === OpponentGrid.Direction.Left){
        huntMode = await this.processLeftMove(arr, direction, huntMode)
      }
  
    

      if(direction.value === OpponentGrid.Direction.Down){
        huntMode = await this.processDownMove(arr, direction, huntMode)
      }
  
    

    if(direction.value === OpponentGrid.Direction.Up){
      huntMode = await this.processUpMove(arr, direction, huntMode)
    }

    return huntMode
  }


  async processRightMove(arr, direction, huntMode){ 
    const lastPosition = arr.length - 1;

    if (arr[lastPosition][1] + 1 < 10 ) {      
        await this.selectCellAndClick(arr[lastPosition][0], arr[lastPosition][1] + 1);
        let cellState = await this.getCellState(arr[lastPosition][0], arr[lastPosition][1] + 1)
          
        if (cellState.includes('hit')) {
          arr.push([arr[lastPosition][0], arr[lastPosition][1] + 1]);
        } 
        if (cellState.includes('done')) {
          huntMode = true;
          arr.length = 0;
          direction.value = OpponentGrid.Direction.Right; 
          return huntMode;
        }
        if (!cellState.includes('hit')) {
          direction.value = OpponentGrid.Direction.Left; 
          arr.push([arr[0][0], arr[0][1]]);
          return huntMode;
        }
      } else if (direction.value === OpponentGrid.Direction.Right) {
        direction.value = OpponentGrid.Direction.Left; 
      }

      return huntMode
}

async processLeftMove(arr, direction, huntMode){
  const lastPosition = arr.length - 1;

  if (arr[lastPosition][1] - 1 >= 0) {
    await this.selectCellAndClick(arr[lastPosition][0], arr[lastPosition][1] - 1);
    let cellState = await this.getCellState(arr[lastPosition][0], arr[lastPosition][1] - 1);

    if (cellState.includes('hit')) {
      arr.push([arr[lastPosition][0], arr[lastPosition][1] - 1]);
    }
    if (cellState.includes('done')) {
      huntMode = true;
      arr.length = 0;
      direction.value = OpponentGrid.Direction.Right; 
      return huntMode;
    }
    if (!cellState.includes('hit')) {
      direction.value = OpponentGrid.Direction.Down; 
      arr.push([arr[0][0], arr[0][1]]);
      return huntMode;
    }
  } else if (direction.value === OpponentGrid.Direction.Left) {
    direction.value = OpponentGrid.Direction.Down; 
  }

  return huntMode
}
async processDownMove(arr, direction, huntMode){
  const lastPosition = arr.length - 1;

  if (arr[lastPosition][0] + 1 <= 10) {
    await this.selectCellAndClick(arr[lastPosition][0] + 1, arr[lastPosition][1]);

    let cellState = await this.getCellState(arr[lastPosition][0] + 1, arr[lastPosition][1]);

    if (cellState.includes('hit')) {
      arr.push([arr[lastPosition][0] + 1, arr[lastPosition][1]]);
    }
    if (cellState.includes('done')) {
      huntMode = true;
      arr.length = 0;
      direction.value = OpponentGrid.Direction.Right; 
      return huntMode;
    }
    if (!cellState.includes('hit')) {
      direction.value = OpponentGrid.Direction.Up; 
      arr.push([arr[0][0], arr[0][1]]);
      return huntMode;
    }
  } else if (direction.value === OpponentGrid.Direction.Down) {
    direction.value = OpponentGrid.Direction.Up; 
  }

  return huntMode
}

async processUpMove(arr, direction, huntMode){
  const lastPosition = arr.length - 1;

  if (arr[lastPosition][0] - 1 >= 0) {
    await this.selectCellAndClick(arr[lastPosition][0] - 1, arr[lastPosition][1]);

    let cellState = await this.getCellState(arr[lastPosition][0] - 1, arr[lastPosition][1]);

    if (cellState.includes('hit')) {
      arr.push([arr[lastPosition][0] - 1, arr[lastPosition][1]]);
    }
    if (cellState.includes('done')) {
      huntMode = true;
      arr.length = 0;
      direction.value = OpponentGrid.Direction.Right; 
      return huntMode;
    }
    if (!cellState.includes('hit')) {
      direction.value = OpponentGrid.Direction.Down; 
      arr.push([arr[0][0], arr[0][1]]);
      return huntMode;
    }
  } else if (direction.value === OpponentGrid.Direction.Up) {
    direction.value = OpponentGrid.Direction.Right; 
  }

  return huntMode
}

}



module.exports = OpponentGrid
