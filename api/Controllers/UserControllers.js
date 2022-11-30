import User from '../Models/UserModels.js'
import customError from '../utility/createError.js';
import {
    hashPassword,
    pwordVerify
} from '../utility/hash.js';
import {
    createToken,
    verifyToken
} from '../utility/jsonWebToken.js';
import {
    getRandom
} from '../utility/math.js';
import {
    passwordResetLink,
    sentActivationLink
} from '../utility/sendMail.js';
import {
    isEMail
} from '../utility/validator.js';




/**
 * @access public
 * @method post 
 * @status post
 * @route /api/User/register
 */
export const register = async (req, res, next) => {

    try {

        // distructure data from body
        const {
            first_name,
            sur_name,
            email,
            password,
            birth_date,
            birth_month,
            birth_year,
            gender
        } = req.body;

        // validator
        if (!first_name || !sur_name || !email || !password) {
            next(customError(400, "All fields are required"))
        }
        if (!isEMail(email)) {
            next(customError(400, "Invalid Email"))
        }

        // check email exist or not
        const userEmail = await User.findOne({
            email: email
        })

        if (userEmail) {
            next(customError(400, "Email already exist"))
        }

        // create access token
        let accessCode = getRandom(10000, 99999)
        
        // check code

        const checkCode = await User.findOne({ access_token : accessCode})

        if(checkCode){
            accessCode = getRandom(10000, 99999); 
        }

        // create user 
        const user = await User.create({
            first_name,
            sur_name,
            email,
            password: hashPassword(password),
            birth_date,
            birth_month,
            birth_year,
            gender,
            access_token: accessCode
        });


        if (user) {
            // create token
            const activationToken = createToken({
                id: user._id
            }, '30d')
            // sent link to active account
            sentActivationLink(user.email, {
                name: user.first_name + ' ' + user.sur_name,
                link: `${process.env.APP_URL +':'+ process.env.SERVER_PORT}/api/v1/user/activation/${activationToken}`,
                code: accessCode,
                mail: user.email

            });

            res.status(200).json({
                message: "User create successful",
                user: user,
                token: activationToken
            })
        }


    } catch (error) {
        next(error)
    }

}



/**
 * @access public
 * @method post 
 * @status post
 * @route /api/User/login
 */
export const login = async (req, res, next) => {

    try {

        // data distructure

        const {
            email,
            password
        } = req.body;

        // validator
        if (!email || !password) {
            next(customError(400, "All fields are required"));
        }

        if (!isEMail(email)) {
            next(customError(400, "Invalid Email"))
        }

        // check email exist or not
        const loginUser = await User.findOne({
            email: email
        })

        if (!loginUser) {
            next(customError(400, "Input valid email to go"))
        } else {


            // verify password
            if (!pwordVerify(password, loginUser.password)) {
                next(customError(400, "wrong password"))
            } else {

                // create token
                const token = createToken({
                    id: loginUser._id
                }, '30d')
                // finaly sent responce 
                res.status(200).cookie('authToken', token).json({
                    message: "User login successful",
                    user: loginUser,
                    token: token
                })
            }

        }



    } catch (error) {
        next(error)
    }

}



/**
 * @access public
 * @method GET 
 * @status ME
 * @route /api/User/loggedInUser
 */
export const loggedInUser = async (req, res, next) => {

    try {
        
        // get token
        const auth_token = req.headers.authorization;
        
        if(!auth_token){
          next(customError(400, 'Token not found'))
        }

        // if get valid token
        if(auth_token){
          const token = auth_token.split(' ')[1];
          const user = verifyToken(token);

          if(!user){
            next(customError(400, 'Invalid token'))
          }

          if(user){
            const loggedInUser = await User.findById(user.id);

            if(!loggedInUser){
                next(customError(400, 'User data not match')) 
            }else{
              res.status(200).json({
                message : "User data stable",
                user : loggedInUser
              })
            }
          }
        }


    } catch (error) {
        next(error)
    }

}

/**
 * activate account by email
 * @access public
 * @method GET
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const accontActivation = async (req, res, next) => {

    try {

        // get token
        const {
            token
        } = req.params;

        // check token
        if (!token) {
            next(customError(400, "Invalid Activate url"))
        } else {
            // verify token
            const tokenData = verifyToken(token);
            if (!tokenData) {
                next(customError(400, "Inavlid token"))
            }
            // now activate account
            if (tokenData) {

                const account = await User.findById(tokenData.id);
                console.log(account)
                if (account.isActivate == true) {
                    next(customError(400, "Account already activate"))
                   
                } else {
                    await User.findByIdAndUpdate(tokenData.id, {
                        isActivate: true,
                        access_token : ''
                    })
                    res.status(200).json({
                        message: "Account Activate succesful"
                    })
                    
                }
            }
        }

    } catch (error) {
        next(error)
    }

}


/**
 * @access public
 * @method post
 * @status account activation by code
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const activationByCode = async (req, res, next) => {

    try {
        
     const { code } = req.body;
     
     const user = await User.findOne().and([{access_token : code}, {isActivate : false}])
    
     if(!user){
        next(customError(400, "Activation user not found"))
     }

     if( user ){
      await User.findByIdAndUpdate(user._id, {
        isActivate : true,
        access_token : ""
      })
      res.status(200).json({
        message : "Account activate succesful"
      })
     }
    } catch (error) {
        next(error)
    }
}

export const forgotPassword = async (req, res, next) => {
  
    try {
        //get email
        const { email } = req.body;
        // check user exist or not
        const user = await User.findOne({ email : email});

          // create access token
          let accessCode = getRandom(10000, 99999)
        // make access code if there are similar code at the same time
        const checkCode = await User.findOne({ access_token : accessCode})
        if(checkCode){
            accessCode = getRandom(10000, 99999); 
        }

        if(!user){
           next(customError(400, "User not found"));
        }

        if(user){
            // create token
            const passwordResetToken = createToken({
                id: user._id
            }, '30m')
            // sent link for reset password !
            passwordResetLink(user.email, {
                name: user.first_name + ' ' + user.sur_name,
                link: `${process.env.APP_URL +':'+ process.env.SERVER_PORT}/api/v1/user/forgot-password/${passwordResetToken}`,
                code: accessCode,
                mail: user.email
            });

            
            res.status(200).json({
                message: "Password reset link sent to your account",
            })
        }

    } catch (error) {
        next(error)
    }
}

export const resetPasswordLink = async (req, res, next) => {

    try {

        // get token
        const {
            token
        } = req.params;
        const { password } = req.body;
        // check token
        if (!token) {
            next(customError(400, "Invalid password url"))
        } else {
            // verify token
            const tokenData = verifyToken(token);
            if (!tokenData) {
                next(customError(400, "Inavlid token"))
            }
            // now activate account
            if (tokenData) {

                const user = await User.findById(tokenData.id);
                
                if(!user){
                    next(customError(400, "User data not found"))
                }
                if(user){
                   await User.findByIdAndUpdate(user._id, {
                    password : hashPassword(password),
                    access_token : ''
                   }) 
                }
            }
        }
        res.status(200).json({
            message : "Password change successful"
        })

    } catch (error) {
        next(error)
    }

}
