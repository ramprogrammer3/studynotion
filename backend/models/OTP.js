
const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate")

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
        
        const mailResponse = await mailSender(email, "Verification email from studynotion", emailTemplate(otp));
        console.log("Email send successfully", mailResponse.response);

    } catch (error) {
        console.log("Error occured while sending mail : ", error);
        throw error;
    }
}

// define a post-save hook to send email after the documetn has been save 

OTPSchema.pre("save", async function (next) {
    if (this.isNew) {
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
})

module.exports = mongoose.model("OTP", OTPSchema);