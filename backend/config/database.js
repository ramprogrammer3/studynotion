const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.url;

exports.connect = () => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("DB connected successfully");
    }).catch((error) => {
        console.log("DB Connection failed");
        console.error(error)
        process.exit(1);
    })
}
