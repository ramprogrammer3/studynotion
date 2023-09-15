
const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
    },

    otp: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60,
    }

})

// a function to send mail

async function sendVerificationEmail(email, otp) {
    try {

        const mailResponse = await mailSender(email, "Verification email from studynotion", otp);
        console.log("Email send successfully", mailResponse);

    } catch (error) {
        console.log("Error occured while sending mail : ", error);
        throw error;
    }
}

module.exports = mongoose.model("OTP", OTPSchema);