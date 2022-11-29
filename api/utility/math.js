

/**
 * create random number for activate link
 * @param {*} min 
 * @param {*} max 
 * @returns 
 */
export const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min) ) + min;
  }