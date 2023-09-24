// import the requred modules
const express = require("express");
const router = express.Router();

// import the required controllers and middleware function
const { login, signUp, sendOTP, changePassword } = require("../controllers/Auth");

const { auth } = require("../middlewares/auth");

const { resetPasswordToken, resetPassword } = require("../controllers/ResetPassword");

// router for login, signup, and authentication

/*
***********************************************************************************************
                                    Authentication Routes
***********************************************************************************************
*/

// routes for user login
router.post("/login", login);

// routes for user signup
router.post("/signup", signUp);

// router for sending otp to the user's email
router.post("/sendotp", sendOTP);

// router for changing the password
router.post("/changepassword", auth, changePassword);


/*
***********************************************************************************************
                                    Reset password
***********************************************************************************************
*/

// router for genetating a reset password token
router.post("/reset-password-token", resetPasswordToken);

// route for restting user's password after verification
router.post("/reset-password", resetPassword);

// export the router for use in the main application

module.exports = router;
