function url(value: string) {
  const message = 'URL is invalid'

  try {
    return Boolean(new URL(value)) || message
  } catch(e){
    return message
  }
}

function notEmpty(value: string) {
  return value && value.length > 0 || 'May not be empty'
}

function numerical(value: number) {
  return !isNaN(value) || 'Must be numerical'
}

function positive(value: string) {
  return parseInt(value) > 0 || 'Must be positive number'
}

export default {
  url, notEmpty, numerical, positive
}
