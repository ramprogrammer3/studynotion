
const jwt = require("jsonwebtoken");
require("dotenv").config();


// auth
exports.auth = async (req, res, next) => {
    try {
        // extract token
        const token = req.cookies.token
            || req.body.token
            || req.header("Authorisation").replace("Bearer ","");


        // if token missing , then return response

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is  missing",
            })
        }

        // verify the token

        try {
            const decode = jwt.verify(token, process.env.JWt_SECRED);
            console.log(decode);
            req.user = decode;
        } catch (error) {
            // verification isssue
            return res.status(401).json({
                success: false,
                message: "token is invalid",
            });
        }
        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Something went wrong while validating the token"
        });
    }
}


// isStudent

exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Students only",
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified, please try again",
        })
    }
}

// isAdmin

exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Admin only",
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified, please try again",
        })

    }
}

// instructor

exports.isInstructor = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success: false,
                message: "This is a procted route for instructor only",
            })
        }
        next();
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "User role cannot be verified, please try again"
        })

    }
}