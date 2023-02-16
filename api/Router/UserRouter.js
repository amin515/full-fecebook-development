import express from 'express';
import { loggedInUser, 
    login, 
    register, 
    accontActivation, 
    activationByCode, 
    forgotPassword, 
    resetPasswordLink, 
    resendActivationLink, 
    findUserAccount,  
    sendPasswordResetOtp, 
    checkResetPasswordOtp, 
    resetPassword, 
    // userProfileUpdate,
    userProfileUpdater
  }
  from '../Controllers/UserControllers.js';




// create student router
const router = express.Router();

// use auth router


router.post('/login', login);
router.post('/register', register);
router.get('/me', loggedInUser);
router.put('/profile-updater/:id', userProfileUpdater);
// router.put('/profile-update/:id', userProfileUpdate);
router.get('/activation/:token', accontActivation);
router.post('/code-activate', activationByCode);
router.post('/resend-link', resendActivationLink);
router.post('/forgot-password/', forgotPassword);
router.post('/forgot-password/:token', resetPasswordLink);
router.post('/find-user-account', findUserAccount);
// if forgot password then send verification link
router.post('/send-password-link-otp', sendPasswordResetOtp);
// check otp for reset password valid user or not
router.post('/check-password-link-otp', checkResetPasswordOtp);
router.post('/user-reset-password', resetPassword);


 
// exporting router
export default router;
