import React, { useRef, useEffect } from 'react'
import { motion, useInView, useAnimation } from "framer-motion"
import projectsData from '../data/projects.json'
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom'

const Projects = ({ languageText, language }) => {



    const mainVariant = {
        hidden: {
            y: "100vw",
            opacity: 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                duration: 1,
                ease: "easeInOut",
                delay: 0.1,
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        },
        exit: {
            y: "100vw",
            opacity: 0,
            transition: {
                ease: "easeInOut",
                duration: 0.3,
            }
        }
    }


    const childVariant = {
        hidden: {
            opacity: 0,
            x: -50
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 1,
                ease: "easeInOut",
            }
        }
    }

    const projectVariant = {
        hidden: {
            opacity: 0,
            y: 100
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.4,
                ease: "easeInOut",
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    }



    const projectCard = (project) => {
        return (
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
                viewport={{ once: true, margin: "-10px" }}
                className=' overflow-hidden w-min rounded-xl p-2'>
                <motion.div
                    className='relative w-[350px] h-[250px] md:w-[400px] md:h-[300px] overflow-hidden hover:blur-xs rounded-sm'
                >
                    <motion.img
                        src={project.image}
                        alt=""
                        className='w-full h-full bg-cover cursor-pointer transform m-auto rounded-sm'
                        initial={{
                            scale: 1,
                        }}
                        whileHover={{
                            scale: 1.2,
                            transition: {
                                type: "spring",
                                duration: 2,
                                ease: 'easeInOut'
                            },
                        }}
                        animate={{
                            scale: 1,
                            transition: {
                                duration: 1,
                                ease: "easeInOut",
                            },
                        }}

                    />
                </motion.div>
                <div className='my-2 flex w-full justify-between items-center'>
                    <p className='p-1 bg-[#c8cae5] w-max text-bluetheme rounded-sm'>{project.technology}</p>
                    <div className='flex gap-2 p-1 text-xl'>
                        <Link to={project.liveDemo} className='homeIcons !rounded-md p-1 flex items-center gap-2'><Icon icon="carbon:demo" /></Link>
                        {/* <Link to={project.liveDemo} className='homeIcons p-1 flex items-center gap-2'>Live Demo<Icon icon="carbon:demo" /></Link> */}
                        {/* <Link to={project.githubFrontEnd} className='homeIcons p-1 flex items-center gap-2'>GitHub<Icon icon="jam:github" /></Link> */}
                        <Link to={project.github} className='homeIcons !rounded-md p-1 flex items-center gap-2'><Icon icon="jam:github" /></Link>
                    </div>
                </div>
                <h2 className='text-2xl font-semibold text-darktheme dark:text-theme transitions'>{language == "ar" ? project.arabicName : project.name}</h2>
                <p className='box-border text-lg my-3 text-darktheme dark:text-theme transitions whitespace-pre-wrap'>{language == "ar" ? project.arabicDescription : project.description}</p>

                <Link to={project.websiteLink} >
                    {/* <motion.div
                        initial={{
                            x: 0,
                            gap: "2px",
                        }}
                        whileHover={{
                            x: 10,
                            gap: "10px",
                            transition: {
                                duration: 0.3,
                                ease: "linear",
                            },
                        }}
                        animate={{
                            x: 0,
                            gap: "2px",
                            transition: {
                                duration: 0.3,
                                ease: "linear",
                            },
                        }}
                        className='py-2 flex items-center text-xl gap-2 font-normal text-darktheme dark:text-theme transitions'
                    >
                        Read More<Icon className="mt-1 text-lg" icon="ep:arrow-right-bold" />

                    </motion.div> */}
                </Link>

            </motion.div>
        )
    }

    return (
        <motion.div
            variants={mainVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:py-10 flex flex-col items-center justify-center w-full">

            <div
                className='transitions dark:text-theme w-full p-5 md:p-20 md:px-52 dark:bg-gray-800 bg-gray-200 h-52 md:h-96 flex items-center justify-center md:justify-normal'>
                <motion.h1
                    variants={childVariant}
                    className='text-4xl text-center md:text-6xl font-normal'>{languageText.FindProjects} </motion.h1>
            </div>


            <motion.div

                variants={projectVariant}
                // ref={ref}
                className='my-10 flex flex-wrap justify-center gap-5 md:gap-20 md:p-0'>
                {projectsData.map((project) => (
                    (projectCard(project))
                ))}
            </motion.div>


        </motion.div>
    )
}

export default Projects



{/* <motion.div
                className='flex items-center justify-between bg-theme p-10 rounded-xl w-[70%] border-gray-300 border-2 mt-5'
            >
                <div className="w-[498px] rounded-md  ">
                    <img src={test} alt="" className="rounded-md" />
                </div>
                <div className='h-full w-[50%] flex flex-col gap-6'>
                    <h1 className="uppercase text-darktheme font-semibold text-4xl">Project Title</h1>
                    <p className='text-darktheme'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui repellat necessitatibus aliquam libero vitae animi harum molestiae dolore aspernatur delectus!</p>
                    <div>CSS JAVASCRIPT</div>
                    <hr />
                    <div>
                        <button>GITHUB</button>
                        <button>LIVE DEMO</button>
                    </div>
                </div>
            </motion.div>
            <button>next</button>
            <button>previous</button> */}