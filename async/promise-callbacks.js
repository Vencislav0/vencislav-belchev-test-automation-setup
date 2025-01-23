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
  console.log('Operation in progress..')

  return new Promise((resolve, reject) => {
    asyncOperation(3, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
    .then((result) => {
      console.log(result)
    })
    .catch((error) => {
      console.error(error)
    })
}
