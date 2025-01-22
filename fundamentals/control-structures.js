function ageVerification() {
  const age = Math.floor(Math.random() * 50) + 1

  if (age >= 18) {
    console.log(`Age:${age}`)
    console.log('You may enter')
  } else {
    console.log(`Age:${age}`)
    console.log('Access denied, must be 18 or above.')
  }
}

function oddOrEven(number) {
  if (number % 2 == 0) {
    console.log(`${number} is even.`)
  } else {
    console.log(`${number} is odd.`)
  }
}

function gradeEvaluation(score) {
  switch (score) {
    case 'A':
      console.log('Excellent Job!')
      break
    case 'B':
      console.log('Good Job!')
      break
    case 'C':
      console.log('Well Done!')
      break
    case 'D':
      console.log('You passed.')
      break

    case 'F':
      console.log('Better luck next time.')
      break

    default:
      console.log('Invalid grade. Available options: A, B, C, D, F')
  }
}
