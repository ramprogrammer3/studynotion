import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa"
import HighlightText from '../components/core/Homepage/HighlightText'
import CTAButton from "../components/core/Homepage/Button"
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/Homepage/CodeBlocks'
import TimeLineSection from '../components/core/Homepage/TimeLineSection'
import LearningLanguageSection from '../components/core/Homepage/LearningLanguageSection'
import InstructorSection from '../components/core/Homepage/InstructorSection'
import Footer from '../components/common/Footer'

const Home = () => {
    return (
        <div>
            {/* section 1  */}

            <div className='relative mx-auto flex flex-col w-11/12 items-center text-white 
            justify-between max-w-maxContent'>
                <Link to={"/signup"}>
                    <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold
                     text-richblack-200 transition-all duration-200 hover:scale-95 w-fit'>
                        <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblack-900'>
                            <p>Become an Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>
                <div className='text-center text-4xl font-semibold mt-6'>
                    Empower Your Future with
                    <HighlightText text=" Coding Skills" />
                </div>

                <div className='w-[90%] text-center text-lg font-bold text-richblack-300 mt-4' >
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a  wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </div>

                <div className='flex flex-row gap-7 mt-8'>
                    <CTAButton active={true} linkto={"/signup"}>
                        Learn More
                    </CTAButton>
                    <CTAButton active={false} linkto={"/login"}>
                        Book a Demo
                    </CTAButton>
                </div>

                <div className='mx-3 my-12  shadow-blue-200/50 shadow-md'>
                    <video muted loop autoPlay>
                        <source src={Banner} type='video/mp4' />
                    </video>
                </div>

                {/* code section 1 */}

                <div>
                    <CodeBlocks

                        position={"lg : flex-row"}
                        heading={
                            <div className='text-4xl font-semibold'>
                                Unlock Your
                                <HighlightText text={" Coding Potential "} />
                                with our online courses
                            </div>

                        }

                        subHeading={
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"
                        }

                        ctabtn1={
                            {
                                btnText: "Try it Yourself",
                                linkto: "/signup",
                                active: true,
                            }
                        }

                        ctabtn2={
                            {
                                btnText: "Learn More",
                                linkto: "/login",
                                active: false
                            }
                        }

                        codeblock={`<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title>\n<linkrel="stylesheet"href="styles.css">\n</head>
                            <body>
                                <h1> <a href="/">Header</a> </h1>
                                <nav>
                                    <a href="/one">One</a>
                                    <a href="/two">Two</a>
                                    <a href="/three">Three</a>
                                    </nav>
                            </body>
                        </head>
                        </html>
                        `}

                    />
                </div>

                {/* code section 2 */}
                <div>
                    <CodeBlocks

                        position={"lg : flex-row-reverse"}
                        heading={
                            <div className='text-4xl font-semibold'>
                                Start
                                <HighlightText text={" Coding in seconds "} />

                            </div>

                        }

                        subHeading={
                            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lession"
                        }

                        ctabtn1={
                            {
                                btnText: "Continue Lession",
                                linkto: "/signup",
                                active: true,
                            }
                        }

                        ctabtn2={
                            {
                                btnText: "Learn More",
                                linkto: "/login",
                                active: false
                            }
                        }

                        codeblock={`<!DOCTYPE html>\n<html>\n<head>\n<title>Example</        title>\n<linkrel="stylesheet"href="styles.css">\n</head>
                            <body>
                                    <h1> <a href="/">Header</a> </h1>
                            <nav>
                                    <a href="/one">One</a>
                                    <a href="/two">Two</a>
                                    <a href="/three">Three</a>
                                    </nav>
                            </body>
                        </head>
                        </html>
                        `}
                    />
                </div>


            </div>

            {/* section 2  */}

            <div className='bg-pure-greys-5 text-richblack-700'>

                <div className='homepage_bg h-[333px]'>

                    <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto'>

                        <div className='h-[100px]'></div>

                        <div className='flex flex-row gap-7 text-white'>

                            <CTAButton active={true} linkto={"/signup"}>
                                <div className='flex gap-3 items-center'>
                                    Explore Full Catalog
                                    <FaArrowRight />
                                </div>
                            </CTAButton>
                            <CTAButton active={false} linkto={"/signup"}>
                                <div>
                                    Learn More
                                </div>
                            </CTAButton>
                        </div>
                    </div>
                </div>

                <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>
                    <div className='flex gap-5 flex-row mb-10 mt-10'>
                        <div className='text-4xl font-semibold w-[45%]'>
                            Get the skills you need for a <HighlightText text={" job that is in demand ."} />
                        </div>
                        <div className='flex flex-col gap-10 w-[40%] items-start'>
                            <div className='text-[16px]'>
                                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </div>
                            <CTAButton active={true} linkto={"/signup"}>
                                Learn More
                            </CTAButton>
                        </div>
                    </div>
                    <TimeLineSection />
                    <LearningLanguageSection />

                </div>
            </div>
            {/* section 3  */}

            <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center gap-8 first-letter: bg-richblack-900 text-white'>

                <InstructorSection />
                <h2 className='text-center text-4xl font-semibold mt-10'> Review from Other Learners </h2>
                {/* Review slider here  */}
            </div>

            {/* footer  */}

            <Footer />

        </div>
    )
}

export default Home