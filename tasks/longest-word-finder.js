function longestWord(words) {
  let maxLength = 0
  let longestWords = []

  for (const word of words) {
    if (word.length > maxLength) {
      maxLength = word.length
      longestWords = [word]
    } else if (word.length == maxLength) {
      longestWords.push(word)
    }
  }

  console.log(longestWords.join(', '))
}
