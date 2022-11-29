
/**
 * EMAIL VALIDATOR
 */

export const isEMail = (email) => {
  return email.toLowerCase().match(/^[^\.-/][a-z0-9-_\.]{1,}@[a-z0-9-]{1,}\.[a-z\.]{2,}$/)
}