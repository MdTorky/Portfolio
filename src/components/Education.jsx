import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Icon } from '@iconify/react';

const Education = () => {

    const [selected, setSelected] = useState(null);
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
                duration: 1,
                type: "spring",
                stiffness: 120,
            }
        }
    }

    const education = [
        {
            id: 1,
            name: "Universiti Teknologi Malaysia",
            degree: "Computer Science",
            major: "(Software Engineering)",
            date: "Oct 2020 - Jul 2024",
            country: "Malaysia",
            city: "Johor Bahru",
            gpa: "3.78",
            icon: "lucide:university"
        },
        {
            id: 2,
            name: "Qimam Elhayat International School",
            degree: "High School",
            major: "",
            date: "Oct 2017 - Aug 2020",
            country: "Saudi Arabia",
            city: "Riyadh",
            gpa: "4",
            icon: "lucide:school"
        }
    ]

    return (
        <div className='mt-10 flex justify-center gap-10 flex-wrap'>
            {/* {experiences.map((exp) => ( */}
            {education.map((ed) => (


                <motion.div
                    key={ed.id}
                    // layoutId={`card-${exp.id}`}

                    variants={childVariant}
                    whileHover={{
                        scale: 1.05,
                        transition: {
                            duration: 0.5,
                        }
                    }}
                    whileTap={{
                        scale: 0,
                        transition: {
                            duration: 1
                        }
                    }}
                    className='bg-gray-200 dark:bg-gray-800 rounded-md p-3 flex flex-col w-96 cursor-pointer'
                    onClick={() => setSelected(ed)}
                >
                    <motion.div
                        className='flex items-center justify-between'>
                        <div className='transitions bg-gray-300 dark:bg-gray-900 p-2 rounded-md'>
                            <Icon icon={ed.icon} className="transitions dark:text-theme text-darktheme text-2xl" />
                        </div>
                        <div>
                            <p className='text-bluetheme text-lg'>{ed.date}</p>
                        </div>
                    </motion.div>
                    <h1 className='transitions mt-2 text-xl dark:text-theme'>{ed.name}</h1>
                    <h2 className='transitions text-md dark:text-gray-400'>{ed.degree} {ed.major}</h2>
                    <div className='flex justify-between mt-5 items-center'>
                        <p className='text-theme bg-bluetheme px-2 rounded-sm text-md'>{ed.country} - {ed.city}</p>
                        <div className='flex justify-end  items-center gap-2'>
                            <p className='text-bluetheme text-lg'>•</p>
                            <p className='text-gray-500 text-lg'>GPA {ed.gpa} / 4</p>
                        </div>
                    </div>
                </motion.div>
            ))}

        </div>
    )
}

export default Education
