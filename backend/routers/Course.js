// import the required modules

const express = require("express");
const router = express.Router();

// import the controllers

// course controller import

const { createCourse, showAllCourses, getCourseDetails } = require("../controllers/Course");

// categories controllers import

const { createCategory, showAllCategory, categoryPageDetails } = require("../controllers/Category");

// section controllers import
const { createSection, updateSection, deleteSection } = require("../controllers/Section");

// sub-Section controller imports

const { createSubSection, updateSubSection, deleteSubSection } = require("../controllers/SubSection");

// rating controllers imports
const { createRating, getAverageRating, getAllRating } = require("../controllers/RatingAndReview");

// importing middlewares

const { auth, isAdmin, isInstructor, isStudent } = require("../middlewares/auth");


/*

***********************************************************************************************
Course Routes
***********************************************************************************************

*/

// Course can only be created by Instructor

router.post("/createCourse", auth, isInstructor, createCourse);
// add a section to a course
router.post("/addSection", auth, isInstructor, createSection);
// update a section
router.post("/updateSection", auth, isInstructor, updateSection);
// delete a section
router.post("/deleteSection", auth, isInstructor, deleteSection);

// edit sub section
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
//delete sub section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);
// add a sub section to a section
router.post("/addSubSection", auth, isInstructor, createSubSection);
// get all registered Course
router.get("/getAllCourses", showAllCourses);
// get Details for a specific Course
router.post("/getCourseDetails", getCourseDetails);

/*

***********************************************************************************************
                        Category routes (only by admin)
***********************************************************************************************

*/

// category can only be created by admin
// Todo put isAdmin middlewre here

router.post("/createCategory",auth,isAdmin,createCategory);
router.get("/showAllCategories" , showAllCategory);
router.post("/getCategoryPageDetails",categoryPageDetails);