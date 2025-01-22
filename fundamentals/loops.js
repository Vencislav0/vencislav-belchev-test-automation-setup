const userCredentials = {
  username: 'John Doe',
  age: 25,
  email: 'JohnDoe@gmail.com',
}

function printArrayForLoop(array) {
  for (let i = 0; i < array.length; i++) {
    console.log(`Element ${i + 1}: ${array[i]}`)
  }
}

function printArrayForOfLoop(array) {
  let count = 1

  for (const el of array) {
    console.log(`Element ${count}: ${el}`)
    count++
  }
}

function printArrayWhileLoop(array) {
  let i = 0

  while (i < array.length) {
    console.log(`Element ${i + 1}: ${array[i]}`)

    i++
  }
}

function printObjectForInLoop(object) {
  for (const p in object) {
    console.log(`${p}: ${object[p]}`)
  }
}

printObjectForInLoop(userCredentials)
