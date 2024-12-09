import React, { useRef, useEffect } from 'react'
import { motion, useInView, useAnimation } from "framer-motion"
import servicesData from '../data/services.json'
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom'

var web = servicesData.web
var graphic = servicesData.graphic
const Services = () => {

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


    const serviceCard = (service) => {
        return (
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
                viewport={{ once: true, margin: "-10px" }}
                className=' w-[300px] rounded-xl p-2 px-4 bg-gray-200 dark:bg-gray-800 relative'>
                <div className=' w-min p-4 left-[40%] absolute -top-6 bg-darktheme dark:bg-theme text-4xl text-theme dark:text-darktheme rounded-xl '><Icon icon={service.icon} /></div>
                {/* <div className='my-2 flex w-full justify-between items-center'>
                    <p className='p-1 bg-[#c8cae5] w-max text-bluetheme rounded-sm'>{project.technology}</p>
                    <div className='flex gap-2 p-1 text-xl'>
                        <Link to={project.liveDemo} className='homeIcons !rounded-md p-1 flex items-center gap-2'><Icon icon="carbon:demo" /></Link>
                        <Link to={project.github} className='homeIcons !rounded-md p-1 flex items-center gap-2'><Icon icon="jam:github" /></Link>
                    </div>
                </div> */}
                <h2 className='text-2xl font-semibold text-darktheme dark:text-theme transitions mt-14 text-center uppercase'>{service.name}</h2>
                <p className='box-border text-lg my-3 text-darktheme dark:text-theme transitions mb-10 text-center'>{service.description}</p>

                <Link to={service.link} className=''>
                    <motion.div
                        initial={{
                            y: 0,
                            letterSpacing: '0px'
                        }}
                        whileHover={{
                            y: 10,
                            letterSpacing: '1px',
                            transition: {
                                duration: 0.5,
                                ease: "easeInOut",
                            },
                        }}
                        animate={{
                            y: 0,
                            letterSpacing: '0px',
                            transition: {
                                duration: 0.3,
                                ease: "linear",
                            },
                        }}
                        className=' p-2 px-4 font-normal uppercase transitions bg-darktheme dark:bg-theme text-xl text-theme dark:text-darktheme rounded-b-md text-center w-full -bottom-2 left-0 absolute m-auto'
                    >
                        Examples

                    </motion.div>
                </Link>
                <div className="absolute top-0 left-0 rounded-tl-md  bg-darktheme dark:bg-theme text-sm text-theme dark:text-darktheme px-2 py-2">{service.price}</div>
                <Link to="/about" className="absolute top-0 right-0 rounded-tr-md  bg-bluetheme  text-xl text-theme  px-2 py-2 hover:scale-110 transition duration-300 "><Icon icon="ic:baseline-contact-phone" /></Link>
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
                    className='text-4xl text-center md:text-6xl font-bold'>All of my Services</motion.h1>
            </div>

            <motion.h1
                variants={projectVariant}
                className='bg-darktheme dark:bg-theme text-theme dark:text-darktheme w-80 my-4 p-2 text-center text-3xl rounded-md'
            >Web-Based Services
            </motion.h1>
            <motion.div

                variants={projectVariant}
                // ref={ref}
                className='my-10 flex flex-wrap justify-center gap-14 md:gap-20 md:p-0'>
                {web.map((service) => (
                    (serviceCard(service))
                ))}
            </motion.div>




            <motion.h1
                variants={projectVariant}
                className='bg-bluetheme dark:bg-bluetheme text-theme w-80 my-4 p-2 text-center text-3xl rounded-md'
            >Graphic Design Services
            </motion.h1>
            <motion.div

                variants={projectVariant}
                // ref={ref}
                className='my-10 flex flex-wrap justify-center gap-14 md:gap-20 md:p-0 w-[80%]'>
                {graphic.map((service) => (
                    (serviceCard(service))
                ))}
            </motion.div>

        </motion.div>
    )
}

export default Services
