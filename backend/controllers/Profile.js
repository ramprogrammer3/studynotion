
const Profile = require("../models/Profile");
const User = require("../models/User");

// update profile handler 
exports.updateProfile = async (req, res) => {
    try {
        // get data
        const { dateOfBirth = " ", about = "", contactNumber, gender } = req.body;
        // get user id
        const id = req.user.id;
        // validation
        if (!contactNumber || !gender || !id) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // find profile
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        // update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;

        await profileDetails.save();

        // return response
        return res.status(200).json({
            success: true,
            message: "Profle updated successfully",
            profileDetails,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Unable to update Profile , please try again",
            error: error.message,
        })

    }
}

// delete Account
// Explore how can we schedule this deletion operation
exports.deleteAccount = async (req, res) => {
    try {

        // get id
        const id = req.user.id;
        // validation
        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found ",
            });
        }

        // delete profle
        await Profile.findByIdAndDelete({ _id: userDetails._id });
        // how to unenroll user from all enrolled course
        // delete user
        await User.findByIdAndDelete({ _id: id });

        // return response
        return res.status(200).json({
            success: true,
            message: "User delete Succesfully",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to delete User, please try again",
            error: error.message,
        })
    }
};


// get all User details

exports.getAllUserDetails = async (req, res) => {

    try {
        //get id
        const id = req.user.id;

        //validation and get user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        //return response
        return res.status(200).json({
            success: true,
            message: 'User Data Fetched Successfully',
            data: userDetails,
        });

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}



exports.updateDisplayPicture = async (req, res) => {
    try {
        const displayPicture = req.files.displayPicture
        const userId = req.user.id
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        console.log(image)
        const updatedProfile = await User.findByIdAndUpdate(
            { _id: userId },
            { image: image.secure_url },
            { new: true }
        )
        res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};