function asyncOperation(seconds){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(seconds > 0){
                resolve(`Successful operation! Time ${seconds} seconds.`)
            }
            else{
                reject("Operation failed.")
            }
        }, seconds * 1000)
    });

}


async function callOperation(){

    console.log("Calling operation..")
   try{
    let result = await asyncOperation(0)
    console.log(result)
   }
   catch(error){
    console.error("Error:", error)
   }
    
}