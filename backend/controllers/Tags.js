
const Tag = require("../models/tags");
const User = require("../models/User");


// create tag ka handler function

exports.createTag = async (req, res) => {
    try {
        // fetch data
        const { name, description } = req.body;

        // validation
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "All fiels are required",
            })
        }

        // create entry in DB

        const TagDetails = await Tag.create({
            name: name,
            description: description
        });

        // return respose

        return res.status(200).json({
            success: true,
            message: "Tag created successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })

    }
}


// get allTags handler function

exports.showAllTags = async (req, res) => {
    try {

        const allTags = await Tag.find({}, { name: true, description: true });

        return res.status(200).json({
            success: true,
            message: "All tags return successfully",
            allTags
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })

    }
}