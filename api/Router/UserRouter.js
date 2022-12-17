import express from 'express';
import { loggedInUser, login, register, accontActivation, activationByCode, forgotPassword, resetPasswordLink, resendActivationLink, findUserAccount} from '../Controllers/UserControllers.js';




// create student router
const router = express.Router();

// use auth router


router.post('/login', login);
router.post('/register', register);
router.get('/me', loggedInUser);
router.get('/activation/:token', accontActivation);
router.post('/code-activate', activationByCode);
router.post('/resend-link', resendActivationLink);
router.post('/forgot-password/', forgotPassword);
router.post('/forgot-password/:token', resetPasswordLink);
router.post('/find-user-account', findUserAccount);

// exporting router
export default router;
