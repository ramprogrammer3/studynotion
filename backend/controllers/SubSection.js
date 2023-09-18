
const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
require("dotenv").config();
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// create subsection

exports.createSubSection = async (req, res) => {
    try {
        // fetch data from req body
        const { sectionId, title, timeDuration, description } = req.body;
        // extract file/video
        const video = req.files.videoFile;
        // validation
        if (!sectionId || !title || !timeDuration || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // upload video to cloudinary

        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        // create a sub Section 
        const subSectionDetails = await SubSection.create({
            title: title,
            timeDuration: timeDuration,
            description: description,
            videoUrl: uploadDetails.secure_url
        })

        // update section with this sub section objects
        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
                $push: { subSection: subSectionDetails._id },
            },
            { new: TextTrackCue }
        )

        // HW : log updated section here, after adding populate query 

        // return response

        return res.status(200).json({
            success: true,
            message: "Sub section created successfully",
            updatedSection,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })

    }
}


// HW : update sub section

exports.updateSubSection = async (req, res) => {
    try {

        // data input
        const { title, timeDuration, description, subSectionId } = req.body;
        // extract file / video
        const video = req.files.videoFile;

        // validation
        if (!title || !timeDuration || !description || !subSectionId || !video) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        // upload video to cloudinary

        const updatedVideo = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        const updatedSubSection = await SubSection.findByIdAndUpdate(
            subSectionId,
            {
                title: title,
                timeDuration: timeDuration,
                description: description,
                videoUrl: updatedVideo,
            },
            { new: true }
        )

        // return response
        return res.status(200).json({
            success: true,
            message: "Sub Section updated successfully",
            data: updatedSubSection,
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Facing issue while updating sub section, please try again",
            error: error.message
        })
    }
}

// HW :  delete sub section

exports.deleteSubSection = async (req, res) => {
    try {
        // get ID assuming that we are sending Id in params
        const { subSectionId } = req.params;
        // use findByIdAndDelete
        await SubSection.findByIdAndDelete(subSectionId);

        // Todo , do we need to delete the entry from the course schema ??

        // return response 

        return res.status(200).json({
            success: true,
            message: "Sub Section deleted Successfully",
        })
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Unable to delete sub Section ,please try again ",
            error: error.message,
        })

    }
}