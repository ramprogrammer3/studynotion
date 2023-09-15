
const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require('otp-generator');

// send OTP

exports.sendOTP = async (req, res) => {
    try {

        // fetch email from request ki body
        const { email } = req.body;

        // check user if already exits
        const checkUserPresent = await User.findOne({ email });

        // if user already exist, then return a response
        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: "User already registered",
            })
        }

        // generate otp
        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        })

        console.log("OTP generated", otp);

        // check unique otp or not

        let result = await OTP.findOne({ otp: otp });

        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            })
            result = await OTP.findOne({ otp: otp });
        }


        const otpPayload = { email, otp };

        // create an entry for otp
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        // return response successfully

        res.status(200).json({
            success: true,
            message: "OTP Sent successfully",
            otp
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// signUp

// singIn

// changePassword