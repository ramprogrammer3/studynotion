
const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require('otp-generator');
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");

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

exports.signUp = async (req, res) => {
    try {

        // data fetch from req.body
        const { firstName, lastName, email, password, confirmPassword, accountType
            , contactNumber, otp } = req.body;

        // validate data
        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            })
        }

        // 2 password match

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and confirmPassword does not matched, please try again",
            })
        }

        // check user already exist or not
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: fasle,
                message: "User is already registered."
            })
        }

        // find monst reecent otp for the user
        const recentOpt = await OTP.findOne({ email }).sort({ createdAt: -1 }).limit(1);
        console.log(recentOpt);

        // validate otp
        if (recentOpt.length == 0) {
            // otp not found
            return res.status(400).json({
                success: false,
                message: "OTP not found ",
            })
        } else if (otp !== recentOpt.otp) {
            // invalid otp
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            })
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create a profile

        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        })

        // create entry in DB

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastName}`,
        })

        // return response

        return res.status(200).json({
            success: true,
            message: "User is registered successfully",
            user,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registrered. Please try again",
        })
    }
}


// singIn

// changePassword