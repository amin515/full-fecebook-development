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
import { sendOTP } from '../utility/sendSms.js';
import {
    isEMail,
    isMobile
} from '../utility/validator.js';

let checkEmail ;
let checkMobile;




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
            auth,
            password,
            birth_date,
            birth_month,
            birth_year,
            gender
        } = req.body;


        // validator
        if (!first_name || !sur_name || !auth || !password) {
            next(customError(400, "All fields are required"))
        }

        // initial auth value

        let mobileData = null;
        let emailData = null;



        if (isEMail(auth)) {
            emailData = auth;
            const checkEmail = await User.findOne({
                email: auth
            })
            if (checkEmail) {
                next(customError(400, "Email already exist"));
                return;
            }
        } else if (isMobile(auth)) {
            mobileData = auth;
            const checkMobile = await User.findOne({
                cell: auth
            })
            if (checkMobile) {
                next(customError(400, "Phone number already exist"));
                return;
            }
        } else {
            next(customError(400, 'Invalid email or Phone'));
            return
        }

        // create access token
        let accessCode = getRandom(10000, 99999)

        // check code

        const checkCode = await User.findOne({
            access_token: accessCode
        })

        if (checkCode) {
            accessCode = getRandom(10000, 99999);
        }

        // create user 
        const user = await User.create({
            first_name,
            sur_name,
            email: emailData,
            cell: mobileData,
            password: hashPassword(password),
            birth_date,
            birth_month,
            birth_year,
            gender,
            access_token: accessCode
        });


        if (user) {

            // if verificaton by email
            if (emailData) {
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

                res.status(200).cookie('otp', user.email, {
                    expires: new Date(Date.now() + 1000 * 60 * 15)
                }).json({
                    message: "User create successful",
                    user: user,
                    token: activationToken
                })
            }

            // if verification by phone

            if(mobileData){
            // sent link to active account
           sendOTP(user.cell, `Hi, ${user.first_name} ${user.sur_name} Your OTP code is ${accessCode}`)

            res.status(200).cookie('otp', user.cell, {
                expires: new Date(Date.now() + 1000 * 60 * 15)
            }).json({
                message: "User create successful",
                user: user,
            }) 
            }



        }


    } catch (error) {
        next(error)
    }

}








/**
 * @access public
 * @method post
 * @route /api/use/resend link
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const resendActivationLink = async (req, res, next) => {

    // get email
    const {
        auth_1
    } = req.body;

  
    // eikhane kaj korte hobe

    // initial auth value

    let mobileData = null;
    let emailData = null;



    if (isEMail(auth_1)) {
        emailData = auth_1;
         checkEmail = await User.findOne(
            { email : auth_1 }
            ).and([{ isActivate : false}])
        if (!checkEmail) {
            next(customError(400, "Email user not found"));
            return;
        }
        if(checkEmail.isActivate){
            next(customError(400, "This email user already activate"));
        }


    } else if (isMobile(auth_1)) {
        mobileData = auth_1;
        checkMobile = await User.findOne({
            cell: auth_1
        }).and([{isActivate : false}])
        if (!checkMobile) {
            next(customError(400, "Mobile user not found"));
            return;
        }

        if(checkMobile.isActivate){
            next(customError(400, "This Mobile user already activate"));
        }
    } else {
        next(customError(400, 'Invalid email or Phone'));
        return
    }



    // check email exist or not
    // const userEmail = await User.findOne({
    //     email: email
    // }).and([{
    //     isActivate: false
    // }]);

    // create access token
    let accessCode = getRandom(10000, 99999)

    // check code
    const checkCode = await User.findOne({
        access_token: accessCode
    })

    if (checkCode) {
        accessCode = getRandom(10000, 99999);
    }


    // resend OTP

    if(mobileData){
        // sent link to active account
       sendOTP(checkMobile.cell, `Hi, ${checkMobile.first_name} ${checkMobile.sur_name} Your OTP code is ${accessCode}`)

        // update otp code
        await User.findByIdAndUpdate(checkMobile._id, {
            access_token: accessCode
        })

        res.status(200).cookie('otp', checkMobile.cell, {
            expires: new Date(Date.now() + 1000 * 60 * 15)
        }).json({
            message: "resend OTP successful",
         
        }) 
        }




    // if valid then send link
    if (emailData) {
        // create token
        const activationToken = createToken({
            id: checkEmail._id
        }, '30d')
        // sent link to active account
        sentActivationLink(checkEmail.email, {
            name: checkEmail.first_name + ' ' + checkEmail.sur_name,
            link: `${process.env.APP_URL +':'+ process.env.SERVER_PORT}/api/v1/user/activation/${activationToken}`,
            code: accessCode,
            mail: checkEmail.email

        });

        // update otp code
        await User.findByIdAndUpdate(checkEmail._id, {
            access_token: accessCode
        })

        // send response
        res.status(200).cookie('otp', checkEmail.email, {
            expires: new Date(Date.now() + 1000 * 60 * 15)
        }).json({
            message: "Activation link send",
        })
    }

    try {

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

        if (!auth_token) {
            next(customError(400, 'Token not found'))
        }

        // if get valid token
        if (auth_token) {
            const token = auth_token.split(' ')[1];
            const user = verifyToken(token);

            if (!user) {
                next(customError(400, 'Invalid token'))
            }

            if (user) {
                const loggedInUser = await User.findById(user.id);

                if (!loggedInUser) {
                    next(customError(400, 'User data not match'))
                } else {
                    res.status(200).json({
                        message: "User data stable",
                        user: loggedInUser
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
                        access_token: ''
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

        const {
            code,
            email
        } = req.body;

        const user = await User.findOne().or([{email : email}, {cell : email }])

        if (!user) {
            next(customError(404, "Activation user not found"))
        } else {
            if (user.isActivate == true) {
                next(customError(404, "User already activate"))
            } else {
                if (user.access_token != code) {
                    next(customError(404, "OTP not match"))
                } else {
                    if (user) {
                        await User.findByIdAndUpdate(user._id, {
                            isActivate: true,
                            access_token: ""
                        })
                        res.status(200).json({
                            message: "Account activate succesful"
                        })
                    }
                }
            }
        }
    } catch (error) {
        next(error)
    }
}

export const forgotPassword = async (req, res, next) => {

    try {
        //get email
        const {
            email
        } = req.body;
        // check user exist or not
        const user = await User.findOne({
            email: email
        });

        // create access token code
        let accessCode = getRandom(10000, 99999)
        // make access code if there are similar code at the same time
        const checkCode = await User.findOne({
            access_token: accessCode
        })
        if (checkCode) {
            accessCode = getRandom(10000, 99999);
        }

        if (!user) {
            next(customError(400, "User not found"));
        }

        if (user) {
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
        const {
            password
        } = req.body;
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

                if (!user) {
                    next(customError(400, "User data not found"))
                }
                if (user) {
                    await User.findByIdAndUpdate(user._id, {
                        password: hashPassword(password),
                        access_token: ''
                    })
                }
            }
        }
        res.status(200).json({
            message: "Password change successful"
        })

    } catch (error) {
        next(error)
    }

}


/**
 * Find use account
 */

export const findUserAccount = async (req, res, next) => {

    const { auth } = req.body;

    try {
        
        let mobileData = null;
        let emailData = null;



        if (isEMail(auth)) {
            emailData = auth;
            const checkEmail = await User.findOne({
                email: auth
            })
            if (!checkEmail) {
                next(customError(400, "Email user not found"));
                return;
            }else{
                res.status(200).cookie('findAccount', JSON.stringify({
                    name : checkEmail.first_name + ' ' + checkEmail.sur_name,
                    photo : checkEmail.profile_photo,
                    email : checkEmail.email
                }), {
                    expires: new Date(Date.now() + 1000 * 60 * 15)}).json({
                    user : checkEmail
                })
            }

        } else if (isMobile(auth)) {
            mobileData = auth;
            const checkMobile = await User.findOne({
                cell: auth
            })
            if (!checkMobile) {
                next(customError(400, "Phone user not found"));
                return;
            }else{
                res.status(200).cookie('findAccount', JSON.stringify({
                    name : checkMobile.first_name + ' ' + checkMobile.sur_name,
                    photo : checkMobile.profile_photo,
                    cell : checkMobile.cell
                }), {
                    expires: new Date(Date.now() + 1000 * 60 * 15)}).json({
                    user : checkMobile
                })
            }
        } else {
            next(customError(400, 'Invalid email or Phone'));
            return
        }


    } catch (error) {
        next(error)
    }
}

