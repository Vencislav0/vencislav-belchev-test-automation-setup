class RandomCellGenerator {
  constructor(rows = 10, cols = 10) {
    this.rows = rows
    this.cols = cols
    this.cellStack = new Set()
    this.randomRow
    this.randomCell
    this.cellKey
  }

  generateUniqueCell() {
    const useCheckerboard = this.cellStack.size < Math.ceil((this.rows * this.cols) / 2)

    while (true) {
      do {
        this.randomRow = Math.floor(Math.random() * this.rows) + 1
        this.randomCell = Math.floor(Math.random() * this.cols)
        this.cellKey = `${this.randomRow},${this.randomCell}`
      } while (useCheckerboard && (this.randomRow + this.randomCell) % 2 != 0)

      if (!this.cellStack.has(this.cellKey)) {
        this.cellStack.add(this.cellKey)
        return [this.randomRow, this.randomCell]
      }
    }
  }
}

module.exports = new RandomCellGenerator()
