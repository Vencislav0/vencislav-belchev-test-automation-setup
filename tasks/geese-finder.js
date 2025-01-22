function geeseFinder(types) {
  const acceptableTypes = ['African', 'Roman Tufted', 'Toulouse', 'Pilgrim', 'Steinbacher']

  const result = types.filter((el) => !acceptableTypes.includes(el))

  console.log(result)
}
