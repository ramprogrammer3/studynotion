
const User = require("../models/User");
const Category = require("../models/Category");


// create tag ka handler function

exports.createCategory = async (req, res) => {
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

        const CategoryDetails = await Category.create({
            name: name,
            description: description
        });

        console.log(CategoryDetails);

        // return respose

        return res.status(200).json({
            success: true,
            message: "Category created successfully"
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

exports.showAllCategory = async (req, res) => {
    try {

        const allCategory = await Category.find({}, { name: true, description: true });

        return res.status(200).json({
            success: true,
            message: "All Category return successfully",
            data: allCategory,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })

    }
}

exports.categoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body;

        // get courses for the specified category
        const selectedCategory = await Category.findById(categoryId).populate("courses").exec();
        console.log(selectedCategory);

        // handle the case when category is not found

        if (!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found ",
            })
        }

        // handle the case when there are no courses

        if (selectedCategory.course.length == 0) {
            return res.status(404).json({
                success: false,
                message: "No courses found  for the selected category ",
            });
        }

        const selectedCourses = selectedCategory.course;

        // Get courses for other category

        const categoriesExceptselected = await Category.find({ _id: { $ne: categoryId } }).populate("courses");

        let differentCourses = [];
        for (const category of categoriesExceptselected) {
            differentCourses.push(...category.courses);
        }

        // Get top-selling courses across all categories
        const allCategories = await Category.find().populate("courses");
        const allCourses = allCategories.flatMap((category) => category.courses);
        const mostSellingCourses = allCourses
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 10);

        res.status(200).json({
            selectedCourses: selectedCourses,
            differentCourses: differentCourses,
            mostSellingCourses: mostSellingCourses,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
}