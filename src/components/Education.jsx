import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom'

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


    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setSelected(null)
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

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
            icon: "lucide:university",
            img: "https://www.studymalaysiainfo.com/wp-content/uploads/2016/11/UTM-image.jpg",
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
            icon: "lucide:school",
            img: "https://lh3.googleusercontent.com/p/AF1QipMYyUTTkYFTbmtjKr9vz-azFuOVIXjmfaaAZCso=s680-w680-h510"
        }
    ]

    return (
        <div className='mt-10 flex justify-center gap-10 flex-wrap'>
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
                    className='gradient-color rounded-md p-3 flex flex-col w-96 cursor-pointer shadows'
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
                    <h2 className='transitions text-md dark:text-gray-400 text-gray-500'>{ed.degree} {ed.major}</h2>
                    <div className='flex justify-between mt-5 items-center'>
                        <p className='text-theme bg-bluetheme px-2 rounded-sm text-md'>{ed.country} - {ed.city}</p>
                        <div className='flex justify-end  items-center gap-2'>
                            <p className='text-bluetheme text-lg'>•</p>
                            <p className='text-gray-500 text-lg'>GPA {ed.gpa} / 4</p>
                        </div>
                    </div>
                </motion.div>
            ))}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        onClick={() => setSelected(null)}

                        className="fixed inset-0 z-40 bg-black/70 flex items-center justify-center">

                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                                opacity: 1, scale: 1,
                                transition: {
                                    duration: 1,
                                    type: 'spring',
                                    stiffness: 80,
                                }
                            }}
                            exit={{
                                opacity: 0, scale: 0, transition: {
                                    duration: 0.5,
                                }
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-theme dark:bg-darktheme p-4 w-[600px] rounded-md relative">
                            <button
                                className='absolute top-6 right-6 text-3xl text-darktheme dark:text-theme hover:text-bluetheme transitions z-50'
                                onClick={() => setSelected(null)}
                            >
                                <Icon icon="zondicons:close-outline" />
                            </button>
                            <p className="absolute text-xl xl:text-2xl text-darktheme bg-theme dark:bg-darktheme dark:text-theme z-50 rounded-tl-md rounded-br-md p-2 border-darktheme dark:border-theme border-r-2 border-b-2 top-4 left-4">{selected.gpa} / 4</p>
                            <div className="bg-gray-400 relative w-full  rounded-md gradient-color border-gray-700 border-2 ">
                                <div className=' relative w-full h-[150px] xl:h-[250px] border-theme border-2 rounded-sm overflow-hidden bg-gradient-to-tr from-[#69696949] to-[#5555557b]'>
                                    <img src={selected.img} alt="" className=" transition duration-500 ease-linear cursor-pointer rounded-md w-full bg-cover  transform hover:scale-125 mix-blend-overlay" />
                                </div>
                                <div className="px-2 xl:px-6">
                                    <div className=" mt-5 flex items-center justify-between">
                                        <h1 className="dark:text-theme text-darktheme text-lg xl:text-2xl">{selected.name}</h1>
                                        <p className='text-theme bg-bluetheme px-2 rounded-sm text-sm xl:text-md whitespace-nowrap'>{selected.country} - {selected.city}</p>
                                    </div>
                                    <p className='dark:text-gray-400 text-gray-600 mt-1'>{selected.degree} {selected.major}</p>
                                    <div className="flex justify-end my-2">
                                        {/* <Link to="https://google.com" className='flex items-center text-xl bg-bluetheme p-2 gap-2 text-theme rounded-md'><Icon icon="cil:link" /> Link</Link> */}
                                        <div className="flex items-center justify-end text-bluetheme">

                                            {/* <div className="flex items-center justify-evenly text-theme bg-bluetheme rounded-md"> <p>Start</p> End</div> */}
                                            {selected.date}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </motion.div>

                    </motion.div>
                )

                }
            </AnimatePresence>
        </div>
    )
}

export default Education
