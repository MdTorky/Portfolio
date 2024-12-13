import React from 'react'
import fullImage from '../img/Full-Image.jpg'
import { motion, AnimatePresence } from "framer-motion"
import Stairs from '../components/Stairs';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Icon } from '@iconify/react';
import timelineData from '../data/timeLineData.json'
import { Link, useLocation } from 'react-router-dom';


const About = ({ language, languageText }) => {

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


    const timeLine = {
        hidden: {
            height: 0,
            opacity: 0,
        },
        visible: {
            height: "100%",
            opacity: 1,

            transition: {
                duration: 2,
                // delay: 0.2,
                ease: "easeInOut",
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        }
    }


    const timeLineChild = {
        hidden: {
            x: window.innerWidth < 1000 ? "100px" : "-100px",
            opacity: 0,
        },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 2,
            },
        },
    };

    const timeLineChildRight = {
        hidden: {
            x: "100px",
            opacity: 0,
        },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 2,
            },
        },
    };

    // const Timeline = () => {
    //     return (
    //         <VerticalTimeline>
    //             {timelineData.map((item, index) => (
    //                 <VerticalTimelineElement
    //                     key={index}
    //                     date={item.date}
    //                     dateClassName="text-darktheme"
    //                     className="vertical-timeline-element--work first:flex gap-96 "
    //                     contentStyle={{ background: "var(--bluetheme)", color: '#fff' }}
    //                     contentArrowStyle={{ borderRight: `7px solid var(--bluetheme)` }}
    //                     iconStyle={{ background: 'var(--bluetheme)', color: '#fff' }}
    //                     icon={<Icon icon={item.icon} />}
    //                 >
    //                     <h3 className="vertical-timeline-element-title">{item.title}</h3>
    //                     {item.location && (
    //                         <h4 className="vertical-timeline-element-subtitle">{item.location}</h4>
    //                     )}
    //                     <p>{item.description}</p>
    //                 </VerticalTimelineElement>
    //             ))}
    //         </VerticalTimeline>
    //     );
    // };


    const Timeline = () => {
        return (
            <motion.div
                variants={timeLine}
                className="relative max-w-[1200px] xl:m-auto after:content-[''] after:absolute after:w-[6px] after:h-[100%] after:bg-bluetheme after:top-0 xl:left-0 left-10 xl:after:left-[50%] xl:after:ml-[-5px] after:z-10 after:rounded-full">
                {timelineData.map((item, index) => (
                    <motion.div
                        variants={index % 2 == 0 ? timeLineChild : timeLineChildRight}
                        key={index} className={`py-[10px] px-[50px] relative xl:w-[500px] left-0 ${index % 2 === 0 ? 'xl:-left-[50%]' : 'xl:left-[50%]'}`}>

                        <div className={`absolute text-4xl rounded-full top-[30px] z-30 text-bluetheme bg-bluetheme p-2  ${index % 2 === 0 ? 'xl:left-[472px] left-[-23px] ' : 'xl:left-[-28px] left-[-23px]'}`}>
                            <Icon
                                icon={item.icon}
                                className='dark:bg-darktheme bg-theme rounded-full p-2'
                            />
                        </div>
                        <div className='py-[20px] px-[30px] relative bg-bluetheme text-theme rounded-md text-xl'>
                            <h2 className="text-2xl xl:text-3xl">{language === 'ar' ? item.arabicTitle : item.title}</h2>
                            <small className="text-sm xl:text-md text-gray-300">{language === 'ar' ? item.arabicDate : item.date}</small>
                            {/* <p className="text-xs xl:text-sm text-justify ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, voluptas. Reprehenderit commodi ab non quaerat odio? Consequatur facilis ipsa quibusdam.</p> */}
                            <p className="text-xs xl:text-sm text-justify ">{language === 'ar' ? item.arabicDescription : item.description}</p>
                            {index % 2 === 0 ?
                                <span className=' absolute top-[20px] xl:left-[377px] -left-[25px]  text-5xl text-bluetheme'><Icon icon="eva:arrow-right-fill" className='hidden xl:flex' /><Icon icon="eva:arrow-left-fill" className='xl:hidden flex' /></span>
                                :
                                <span className='absolute top-[20px] xl:-left-[25px] -left-[25px]  text-5xl text-bluetheme'><Icon icon="eva:arrow-left-fill" /></span>
                            }
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        )
    }

    // left-[inherit] xl:left-[94%] right-[92%] xl:right-[inherit]
    // xl:right-[94%] right-[92%]
    return (
        <motion.div
            variants={mainVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:py-10 flex flex-col items-center justify-center w-full">

            <div className='transitions dark:text-theme w-full p-5 xl:p-20 xl:px-52 dark:bg-gray-800 bg-gray-200 h-64 xl:h-[800px] flex items-center gap-10 relative'>

                <AnimatePresence mode='wait'>
                    <div className="hidden xl:flex xl:w-[500px] h-fit relative z-20 overflow-hidden bg-gray-500 dark:bg-gray-700" >
                        <img src={fullImage} alt="Full View" className="mix-blend-soft-light" />
                        <div
                            className='h-full w-full absolute top-0 left-0 right-0 pointer-events-none z-40 flex'>
                            <Stairs />
                        </div>
                        {/* <p className=' bg-gray-200 text-2xl p-2 pt-12'>Mohamed Tarek Torky</p> */}
                    </div>
                </AnimatePresence>

                <motion.div
                    variants={childVariant}
                    className="flex flex-col xl:m-0 m-auto">
                    <h1 className='text-5xl  xl:text-start text-center md:text-8xl font-normal z-10'>{languageText.About}</h1>
                    <p className='text-3xl md:text-5xl'>{languageText.WhereStarted}</p>
                    <p className='flex mt-5 justify-center text-2xl bg-bluetheme px-2 w-[225px] rounded-md text-theme uppercase '>{languageText.ContactMe}</p>
                    <div className='mt-2 flex gap-x-10 gap-y-5 md:gap-10 flex-wrap justify-start'>
                        <Link to="mailto:mohamed2003torky@gmail.com" target="_blank" className="text-5xl "><Icon icon="mdi:email" className='homeIcons' /></Link>
                        <Link to="http://wa.me/201554206775" target="_blank" className="text-5xl "><Icon icon="ph:phone-fill" className='homeIcons' /></Link>
                        {/* <Link to="https://www.instagram.com/mohdtorky/" className="text-5xl "><Icon icon="mdi:instagram" className='homeIcons' /></Link> */}
                        <Link to="https://www.linkedin.com/in/mohamed-torky-243196221/" className="text-5xl "><Icon icon="mdi:linkedin" className='homeIcons' /></Link>

                    </div>
                </motion.div>
            </div>

            <motion.div
                className='my-10 flex flex-wrap justify-center gap-5 md:gap-20 md:p-0'
            >
                <motion.div variants={projectVariant}>
                    {Timeline()}
                </motion.div>
            </motion.div>


            {/* <div className='transitions dark:text-theme w-full p-5 xl:p-20 xl:px-52 dark:bg-gray-800 bg-gray-200 h-52 xl:h-[200px] flex items-center gap-10 relative'>
                Contact Me
            </div> */}
        </motion.div>
    )
}

export default About
