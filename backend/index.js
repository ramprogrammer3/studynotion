
const express = require('express');
const app = express();

const userRoutes = require("./routers/User");
const profileRoutes = require("./routers/Profile");
const paymentRoutes = require("./routers/Payments");
const courseRoutes = require("./routers/Course");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require('express-fileupload');
require("dotenv").config();

const PORT = process.env.PORT || 4000;

// database connect
database.connect();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
)

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/'
    })
)

// cloudinary connection
cloudinaryConnect();

// routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);


// default routes
app.get("/",(req,res)=>{
    return res.json({
        success : true,
        message : "Your server is up and running",
    })
})

// activate server
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})