import React from 'react'
import { motion } from "framer-motion"
import { Icon } from '@iconify/react';
const Experience = () => {

    const childVariant = {
        hidden: {
            opacity: 0,
            y: -100,
            // scale: 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            // scale: 1,
            transition: {
                duration: 0.5,
                type: "spring",
            }
        }
    }

    return (
        <div

            className='mt-10 flex justify-center gap-10 flex-wrap'>


            <motion.div
                variants={childVariant}

                className='transitions bg-gray-200 dark:bg-gray-800 rounded-md p-3 flex flex-col w-72'>
                <div className='flex items-center justify-between'>
                    <div className='transitions bg-gray-300 dark:bg-gray-900 p-2 rounded-md'>
                        <Icon icon="streamline:office-worker-solid" className="transitions dark:text-theme text-darktheme text-2xl" />
                    </div>
                    <p className='text-bluetheme'>Sep 2023 - Feb 2024</p>
                </div>
                <h1 className='transitions mt-2 text-xl dark:text-theme'>Software Engineer Internship</h1>
                <div className='flex justify-end mt-5 items-center gap-2'>
                    <p className='text-bluetheme text-lg'>•</p>
                    <p className='text-gray-500 text-lg'>Mirco Semiconductor Sdn Bhd.</p>
                </div>
            </motion.div>



            <motion.div
                variants={childVariant}
                className='transitions bg-gray-200 dark:bg-gray-800 rounded-md p-3 flex flex-col w-72'>
                <div className='flex items-center justify-between'>
                    <div className='transitions bg-gray-300 dark:bg-gray-900 p-2 rounded-md'>
                        <Icon icon="carbon:user-activity" className="transitions dark:text-theme text-darktheme text-2xl" />
                    </div>
                    <p className='text-bluetheme'>Jan 2023 - Sep 2023</p>
                </div>
                <h1 className='transitions mt-2 text-xl dark:text-theme'>Front-End Developer</h1>
                <div className='flex justify-end mt-5 items-center gap-2'>
                    <p className='text-bluetheme text-lg'>•</p>
                    <p className='text-gray-500 text-lg'>IntelliRent</p>
                </div>
            </motion.div>


        </div>
    )
}

export default Experience
