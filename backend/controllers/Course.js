const Course = require("../models/Course");
const User = require("../models/User");
const Category = require("../models/Category");
require("dotenv").config();

const { uploadImageToCloudinary } = require("../utils/imageUploader");

// create course handler function

exports.createCourse = async (req, res) => {
    try {

        // fetch data
        const userId = req.user.id;

        let { courseName, courseDescription, whatYouWillLearn, price, tag, category, status, instructions } = req.body;

        // get thumbnail
        const thumbnail = req.files.thumbnailImage;

        // validation

        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail || !category) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (!status || status === undefined) {
            status = "Draft";
        }

        // check for instructor

      
        const instructorDetails = await User.findById(userId, { accountType: "Instructor" });
        console.log("Instructor details ", instructorDetails);

        // Todo : verify that userId and instructor._id are same or defferent ?

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instructor Details not found ",
            });
        }

        // check given tag is valid or not

        const CategoryDetails = await Category.findById(category);
        if (!CategoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category Details not found ",
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
            tag: tag,
            category: CategoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            status: status,
            instructions: instructions,
        });

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

        // add new course to the category
        await Category.findByIdAndUpdate(
            { _id: category },
            {
                $push: {
                    course: newCourse._id,
                }
            },
            { new: true }
        );
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
        const allCourses = await Course.find(
            {},
            {
                courseName: true,
                price: true,
                thumbnail: true,
                instructor: true,
                ratingAndReviews: true,
                studentsEnrolled: true,
            }
        ).populate("instructor").exec();

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



// get Course details

exports.getCourseDetails  = async(req,res)=>{
    try {
        // get id
        const {courseId} = req.body;

        // find courseDetails
        const courseDetails = await Course.find(
                                {_id : courseId})
                                .populate(
                                    {
                                        path : "instructor",
                                        populate : {
                                            path : "additionalDetails",
                                        },
                                    }
                                )
                                .populate("category")
                                .populate("ratingAndReviews")
                                .populate({
                                    path : "courseContent",
                                    populate : {
                                        path : "subSection",
                                    }
                                })
                                .exec();

        // validation
        if(!courseDetails){
            return res.status(400).json({
                success : false,
                message : `Could not find the course with ${courseId}`,
            });
        }
        // return response
        
        return res.status(200).json({
            success : false,
            message : "Course Details fetched successfully",
            data : courseDetails,
        });

    } catch (error) {

        return res.status(500).json({
            success : false,
            message : error.message,
        })
        
    }
}



