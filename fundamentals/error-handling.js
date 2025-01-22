function tryParseJSON(input) {
  try {
    const parsedData = JSON.parse(input)
    console.log('Success!')
  } catch (er) {
    console.error('Couldnt parse to JSON.', er.message)
  } finally {
    console.log('Attemp complete.')
  }
}

async function fetchData() {
  try {
    response = await fetch('https://example.com/')

    if (!response.ok) {
      throw new Error(`Request failed. Status Code: ${response.status}`)
    }

    console.log(`Success. Status code: ${response.status}`)
  } catch (error) {
    console.log(`Error: ${error.message}`)
  } finally {
    console.log('Request Complete.')
  }
}
