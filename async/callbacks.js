function asyncOperation(seconds, callback) {
  setTimeout(() => {
    if (seconds > 0) {
      callback(null, `Operation complete in ${seconds} seconds.`)
    } else {
      callback('Operation failed')
    }
  }, seconds * 1000)
}

function callOperation() {
  console.log('Calling operation..')
  asyncOperation(3, (error, result) => {
    if (error) {
      console.error(error)
    } else {
      console.log(result)
    }
  })
}
