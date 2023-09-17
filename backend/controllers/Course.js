const Course = require("../models/Course");
const Tag = require("../models/tags");
const User = require("../models/User");
require("dotenv").config();

const { uploadImageToCloudinary } = require("../utils/imageUploader");

// create course handler function

exports.createCourse = async (req, res) => {
    try {

        // fetch data

        const { courseName, courseDescription, whatYouWillLearn, price, tag } = req.body;

        // get thumbnail
        const thumbnail = req.files.thumbnailImage;

        // validation

        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // check for instructor

        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor details ", instructorDetails);

        // Todo : verify that userId and instructor._id are same or defferent ?

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instructor Details not found ",
            });
        }

        // check given tag is valid or not

        const tagDetails = await Tag.findById(tag);
        if (!tagDetails) {
            return res.status(404).json({
                success: false,
                message: "Tag Details not found ",
            })
        }

        // upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        // create an entry for new Course

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag: tagDetails._id,
            thumbnail: thumbnailImage.secure_url,
        })

        // add the new course to the user schema of Instructor

        await User.findByIdAndUpdate(
            { _id: instructorDetails._id },
            {
                $push: {
                    courses: newCourse._id,
                }
            },
            { new: true },
        );

        // update the Tag ka schema
        // Todo HW

        // return response

        return res.status(200).json({
            success: true,
            message: "Course Created successfully",
            data: newCourse,
        });

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create Couser",
            error: error.message,
        })

    }
}


// getAll course handler function

exports.showAllCourses = async (req, res) => {
    try {
        // Todo change the below statement incremently
        const allCourses = await Course.find({});

        return res.status(200).json({
            success: true,
            message: "Data for all courses fetched successfully",
            data: allCourses,
        })

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Cannot Fetched course data",
            error: error.message,
        })

    }
}



