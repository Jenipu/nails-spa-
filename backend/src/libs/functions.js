import colors from 'colors'

export const logSuccess = (message) => {
  console.log(`${"[+]".green} ${message}`)
}

export const logError = (message) => {
  console.log(`${"[-]".red} ${message}`)
  // throw new Error(`${"[-]".red} ${message}`)
}

export const logInfo = (message) => {
  console.log(`${"[!]".blue} ${message}`)
}