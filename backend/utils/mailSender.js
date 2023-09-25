
const nodemailer = require("nodemailer");
require("dotenv").config()

const mailSender = async (email, title, body) => {
    try {
        
        let transporter = nodemailer.createTransport({
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
            host :"smtp.gmail.com",
            auth : {
                user : "developer.rammaniyari@gmail.com",
                pass : "ltab uejf xbew dbcf"
            },
        })
        
        let info = await transporter.sendMail({
            from: "StudyNotion - ram kumar",
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        })

        console.log("info ", info);
        console.log("ram kumar")

        return info;
    } catch (error) {
        console.log(error.message);
    }
}


module.exports = mailSender;