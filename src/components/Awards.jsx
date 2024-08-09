import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom'


const Awards = () => {

    const [selected, setSelected] = useState(null);
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

    const awards = [
        {
            id: 1,
            name: "Champion at Microsoft APAC AI Accessibility Hackathon",
            company: "Microsoft",
            date: "14 Jun 2023",
            description: 'Participated in and achieved First place in the prestigious Microsoft APAC AI Hackathon. Our winning project, "A-EYE," was a groundbreaking AI-powered solution designed to empower visually impaired individuals by providing them with real-time auditory cues, thereby enhancing their confidence in navigating urban environments.',
            icon: "mdi:microsoft",
            img: "https://media.licdn.com/dms/image/v2/D5622AQESAChR8CRJMQ/feedshare-shrink_800/feedshare-shrink_800/0/1689043468706?e=1726099200&v=beta&t=wVt-ukKZbzvCe4HS2Lqiy4nelIvUZLiMf8duoz5qKXI",
            link: "https://www.linkedin.com/feed/update/urn:li:activity:7084361783041277953/?utm_source=share&utm_medium=member_desktop"

        },
        {
            id: 2,
            name: "AutoCar & Line-follower Robot Workshop Competition",
            company: "ISS Egypt, Yemen, Iraq UTM",
            date: "03 Jun 2023",
            description: 'Secured First place at the Auto Car Line Follower Robot Workshop Competition, showcasing exceptional problem-solving, technical skills, teamwork ability, dedication to mastering engineering challenges, and commitment to continuous learning in robotics.',
            icon: "ci:car-auto",
            img: "",
            link: "https://www.instagram.com/p/CtMVQfsBp23/"

        }
    ]

    return (
        <div className='mt-10 flex justify-center gap-10 flex-wrap'>
            {awards.map((award) => (
                <motion.div
                    key={award.id}
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
                    onClick={() => setSelected(award)}
                >
                    <motion.div
                        className='flex items-center justify-between'>
                        <div className='transitions bg-gray-300 dark:bg-gray-900 p-2 rounded-md'>
                            <Icon icon={award.icon} className="transitions dark:text-theme text-darktheme text-2xl" />
                        </div>
                        <p className='text-bluetheme'>{award.date}</p>
                    </motion.div>
                    <h1 className='transitions mt-2 text-xl dark:text-theme'>{award.name}</h1>

                    <div className='flex mt-5 items-center gap-2'>
                        <p className='text-theme bg-bluetheme px-2 rounded-sm text-lg'>{award.company}</p>

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
                            <div className="bg-gray-400 relative w-full rounded-md gradient-color border-gray-300 dark:border-gray-700 border-2 ">
                                {selected.img && <div className=' relative w-full h-[150px] xl:h-[250px] rounded-sm overflow-hidden bg-gradient-to-tr from-[#69696949] to-[#5555557b] flex items-end'>
                                    <img src={selected.img} alt="" className=" transition duration-500 ease-linear cursor-pointer rounded-md w-full  object-center transform hover:scale-125 mix-blend-overlay" />
                                </div>}
                                <div className={`px-2 xl:px-6 ${!selected.img ? "mt-14" : ""}`}>
                                    <div className=" mt-5 flex items-center justify-between">
                                        <h1 className="dark:text-theme text-darktheme text-lg xl:text-2xl">{selected.name}</h1>
                                        <Link to={selected.link} className="homeIcons flex items-center p-2 !rounded-lg"><Icon icon="fa-solid:link" /></Link>
                                    </div>
                                    <p className='dark:text-gray-400 text-gray-600 xl:text-justify mt-1'>{selected.description}</p>
                                    <div className="flex justify-end my-2">
                                        <div className="flex items-center justify-between text-bluetheme w-full">
                                            {/* <p className='dark:text-gray-400 text-gray-600 mt-1'>{selected.company}</p> */}
                                            <p className='text-theme bg-bluetheme px-2 rounded-sm text-sm xl:text-lg whitespace-nowrap'>{selected.company}</p>
                                            <p className='text-lg'>{selected.date}</p>
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

export default Awards
