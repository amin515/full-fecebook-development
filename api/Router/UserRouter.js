import express from "express";

import {
  loggedInUser,
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
  userProfileUpdater,
  featuredSlider,
  userProfilePhotoUpdater,
  userProfileCoverPhotoUpdater,
  getAllUser,
  addFriendRequest
} from "../Controllers/UserControllers.js";

// create student router
const router = express.Router();

import path from "path";
import multer from "multer";

// resolve
const __dirname = path.resolve();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    if (file.fieldname === "slider") {
      cb(null, path.join(__dirname, "api/public/slider"));

    } else if (file.fieldname === "profile") {
      cb(null, path.join(__dirname, "api/public/profile"));

    } else if (file.fieldname === "cover") {
      cb(null, path.join(__dirname, "api/public/cover"));
    }
    
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const sliderFetured = multer({ storage }).array("slider", 20);
const profilePhoto = multer({ storage }).single("profile");
const coverPhoto = multer({ storage }).single("cover");
// use auth router

router.post("/login", login);
router.post("/register", register);
router.get("/me", loggedInUser);

router.get("/get-all-user/:id", getAllUser);
router.get("/add-friends/:sender/:receiver", addFriendRequest);

router.put("/profile-updater/:id", userProfileUpdater);
router.put("/profile-photo-update/:id", profilePhoto, userProfilePhotoUpdater);
router.put(
  "/profile-cover-photo-update/:id",
  coverPhoto,
  userProfileCoverPhotoUpdater
);
router.post("/featured-slider/:id", sliderFetured, featuredSlider);
// router.put('/profile-update/:id', userProfileUpdate);
router.get("/activation/:token", accontActivation);
router.post("/code-activate", activationByCode);
router.post("/resend-link", resendActivationLink);
router.post("/forgot-password/", forgotPassword);
router.post("/forgot-password/:token", resetPasswordLink);
router.post("/find-user-account", findUserAccount);
// if forgot password then send verification link
router.post("/send-password-link-otp", sendPasswordResetOtp);
// check otp for reset password valid user or not
router.post("/check-password-link-otp", checkResetPasswordOtp);
router.post("/user-reset-password", resetPassword);

// exporting router
export default router;
