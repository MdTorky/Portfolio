import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Me from '../img/Torky.png'
import { motion } from "framer-motion"
const home = () => {
    return (
        <div className="md:p-10 md:px-20 flex md:flex-row flex-col items-center justify-center w-full">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 1,
                    transition: { delay: 0.5, duration: 0.4, ease: "easeInOut" }
                }}
                className="md:p-20 mt-5 md:m-20 w-[90%] md:w-3/6 md:order-none order-2 text-center md:text-start"
            >
                <p className="text-bluetheme text-xl md:text-4xl uppercase font-medium">Software Engineer</p>
                <h1 className="text-darktheme dark:text-theme text-5xl md:text-8xl uppercase font-semibold">Mohamed Torky</h1>
                <p className="text-darktheme  dark:text-theme md:text-justify mt-2 " >Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit fugit unde tempore placeat similique. Sint ullam quam consequuntur nobis quod, exercitationem modi, perspiciatis, debitis</p>
                <div className='mt-5 flex gap-x-10 gap-y-5 md:gap-10 flex-wrap justify-center md:justify-normal'>
                    <Link to="https://github.com/MdTorky" className="text-5xl "><Icon icon="mdi:github" className='homeIcons' /></Link>
                    <Link to="https://www.linkedin.com/in/mohamed-torky-243196221/" className="text-5xl "><Icon icon="mdi:linkedin" className='homeIcons' /></Link>
                    <Link to="https://www.instagram.com/mohdtorky/" className="text-5xl "><Icon icon="mdi:instagram" className='homeIcons' /></Link>
                    <Link className="text-2xl"><p className='homeIcons px-10 py-2 md:p-2 flex items-center gap-2'>Download CV <Icon icon="icon-park-outline:download-one" className="text-3xl" /></p></Link>
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 1,
                    transition: { delay: 1, duration: 0.4, ease: "easeInOut" }
                }}
            >
                <div className='w-[298px] h-[298px] xl:w-[498px] xl:h-[498px]  relative md:order-none order-2 mt-10 md:mt-0s'>
                    <img src={Me} alt="" quality={100} fill className="object-contain rounded-full" />
                    <motion.svg
                        className="w-[300px] h-[300px] xl:w-[520px] xl:h-[520px] absolute left-[5px] md:right-0 md:left-0 top-[15px] md:top-0"
                        fill="transparent"
                        viewBox="0 0 520 520"
                        xmlns="https://www.w3.org/2000/svg">
                        <motion.circle
                            cx="253"
                            cy="253"
                            r="250"
                            stroke="#525CEB"
                            strokeWidth="6"
                            strokeLinecap='round'
                            strokeLinejoin="round"
                            initial={{ strokeDasharray: '24 10 0 0' }}
                            animate={{
                                strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
                                rotate: [120, 360]
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        />
                    </motion.svg>
                </div>


            </motion.div>


        </div>
    )
}

export default home
