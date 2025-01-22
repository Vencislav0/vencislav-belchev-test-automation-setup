function asyncOperation(seconds){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(seconds > 0){
                resolve(`Operation complete. Time: ${seconds} seconds. `)
            }
            else{
                reject("Operation Failed.")
            }
        })
    })
}

function callOperation(){
    console.log("Calling operation..")
    asyncOperation(3)
    .then(result => {
        console.log(result)
    })
    .catch(error => {
        console.error("Error:", error)
    })
}