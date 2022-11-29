
import bcrypt from 'bcryptjs';
/**
 *  create a hash password
 */


export const hashPassword = (password) => {

    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(password, salt)
    return hash;
}


/**
 * password macth
 * @param {*} password 
 * @returns 
 */
export const pwordVerify = (password, hash) => {

    return bcrypt.compareSync(password, hash)
}