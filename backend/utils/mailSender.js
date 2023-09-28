const nodemailer = require("nodemailer");
require("dotenv").config()
const mailSender = async (email, title, body) => {
    try {

        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })

        let info = await transporter.sendMail({
            from: `ramkumar`,
            to: email,
            subject: "video uploaded ",
            html: `<h2> software engineer </h2>`
        })

       return info;
 
    } catch (error) {
        
        console.log("line 23")
    }
}
module.exports = mailSender;





// host: process.env.MAIL_HOST,
            // auth: {
            //     user: process.env.MAIL_USER,
            //     pass: process.env.MAIL_PASS,
            // }
            // host :"smtp.gmail.com",
            // auth : {
            //     user : "developer.ramkumar07.gmail.com",
            //     pass : "xdgodxiflqjsmbyj"
            // },