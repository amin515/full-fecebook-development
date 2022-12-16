
/**
 * EMAIL VALIDATOR
 */

export const isEMail = (email) => {
  // return email.toLowerCase().match()
  return /^[^\.-/][a-z0-9-_\.]{1,}@[a-z0-9-]{1,}\.[a-z\.]{2,}$/.test(email)
}

/**
 * Phone validator
 */

export const isMobile = (mobile) => {
  // return email.toLowerCase().match()
  return /^(01|8801|\+8801)[0-9]{9}$/.test(mobile)
}

/**
 * string
 * email validate
 */
 
export const isString = (data) => {
  return /^[a-z@\.]{1,}$/.test(data)
}

/**
 * Phone validate
 * 
 */

export const isNumber = (number) => {
  return /^[0-9\+]{1,}$/.test(number)
}