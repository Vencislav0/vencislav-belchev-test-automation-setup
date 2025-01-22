const A = require('./classA.js')

class B extends A {
  constructor(name, age, job) {
    super(name, age)
    this.job = job
  }

  displayJob() {
    console.log(`${this.name} is working as a ${this.job}`)
  }

  greet() {
    super.greet()
    console.log(`i work as a ${this.job}`)
  }
}

module.exports = B
