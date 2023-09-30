import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import CTAButton from "../Homepage/Button"
import { FaArrowRight } from 'react-icons/fa'

const InstructorSection = () => {
    return (
        <div className='mt-16 mb-16'>

            <div className='flex flex-row gap-20 items-center flex-wrap md:flex-nowrap '>
                <div className='md:shadowInstructor shadowInstructor md:w-[50%] w-full md:ml-0 ml-5 '>
                    <img src={Instructor} alt="instructors image" />
                </div>

                <div className='md:w-[50%] w-full flex flex-col gap-5 md:ml-0 ml-5 '>
                    <div className='text-4xl font-semibold md:w-[50%] w-full'>
                        Become an <span className='instructorGradient'>Instructor</span>
                    </div>

                    <p className='font-medium text-[16px] w-[80%] text-richblack-300'>
                        Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                    </p>

                    <div className='w-fit mt-10'>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className='flex flex-row gap-2 items-center'>
                                Start Learning Today
                                <FaArrowRight />
                            </div>
                        </CTAButton>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default InstructorSection