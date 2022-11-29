
import jwt from 'jsonwebtoken';



/**
 * create a json web token
 */

export const createToken = (payload, exp) => {
  
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn : exp
    });

    return token;
}

/**
 *  create verify token
 * 
 */

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}