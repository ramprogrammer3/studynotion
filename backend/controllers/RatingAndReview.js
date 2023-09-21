
const RatingAndReview = require("../models/RatingAndREview");
const Course = require("../models/Course");


// create Rating
exports.createRating = async (req, res) => {
    try {

        // get user id
        const userId = req.user.id;

        // fetch data from req.body;
        const { rating, review, courseId } = req.body;

        // check if user is enrolled or not

        const courseDetails = await Course.findOne(
            {
                _id: courseId,
                studentsEnrolled: { $elemMatch: { $eq: userId } },
            },


        );

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "Student is not enrolled in the course",
            });
        }

        // check if user already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({
            user: userId,
            course: courseId,
        })

        if (alreadyReviewed) {
            return res.status(403).json({
                success: false,
                message: "Course is already reviewed by the user",
            });
        }

        // creating rating and review
        const ratingReview = await RatingAndReview.create({
            rating,
            review,
            course: courseId,
            user: userId,
        })

        // update course with this rating/ review

        const updatedCourseDetails = await Course.findByIdAndUpdate(
            { _id: courseId },
            {
                $push: {
                    ratingAndReviews: ratingReview._id,
                }
            },
            { new: true },
        )

        console.log(updatedCourseDetails);

        return res.status(200).json({
            success: true,
            message: "Rating and Review created successfully",
            ratingReview,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}