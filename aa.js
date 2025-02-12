require('dotenv').config()

console.log(require('./framework/logger.js'))
console.log('Browser Name:', process.env.BROWSER_NAME)
