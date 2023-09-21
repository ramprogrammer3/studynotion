
const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
    try {

        // fetch data
        const { sectionName, courseId } = req.body;
        // data validation
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: true,
                message: "Missing Properties",
            })
        }

        // create section
        const newSection = await Section.create({ sectionName });

        // update course with Section ObjectID

        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: newSection._id,
                }
            },
            { new: true }
        ).populate({
            path : "courseContent",
            populate : {
                path : "subSection",
            },
        }).exec();

        // return response

        return res.status(200).json({
            success: true,
            message: "Section created successfully",
            updatedCourseDetails,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to create section , please try again",
            error: error.message
        })
    }
}


// update section

exports.updateSection = async (req, res) => {
    try {
        // data input
        const { sectionName, sectionId } = req.body;

        // data validation
        if (!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "Missing Properties",
            });
        }

        // update data
        const section = await Section.findByIdAndUpdate(sectionId, { sectionName }, { new: true });

        // return response
        return res.status(200).json({
            success: true,
            message: "Section updated Successfully",
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to update section , please try again",
            error: error.message,
        })

    }
}

// delete Section

exports.deleteSection = async (req, res) => {
    try {
        // get ID assuming that we are sending Id in params
        const { sectionId } = req.params;
        // use findByIdAndDelete
        await Section.findByIdAndDelete(sectionId);
        // return response 

        return res.status(200).json({
            success: true,
            message: "Section deleted Successfully",
        })
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Unable to delete section, pleae try again",
            error: error.message,
        })
    }
}