import React, { useState } from 'react'
import { motion } from "framer-motion"
import { Tabs, Tab, Box, Typography, duration } from '@mui/material'
import { Icon } from '@iconify/react';
import { button } from '@material-tailwind/react';
import Experience from '../components/Experience';

const Resume = () => {

    const [value, setValue] = useState(1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
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

    // const tabVariant = {
    //     hidden: {
    //         y: "-50vw",
    //         opacity: 0,
    //     },
    //     visible: {
    //         opacity: 1,
    //         y: 0,
    //         transition: {
    //             type: 'spring',
    //             duration: 1,
    //             ease: "easeInOut",
    //             delay: 0.1,
    //             when: "beforeChildren",
    //             staggerChildren: 0.3
    //         }
    //     },
    //     exit: {
    //         y: "-50vw",
    //         opacity: 0,
    //         transition: {
    //             ease: "easeInOut",
    //             duration: 0.3,
    //         }
    //     }
    // }


    const ExperienceVariant = {
        hidden: {
            opacity: 0,
            y: -50,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay: 0.3,
                ease: "easeInOut",
                when: "beforeChildren",
                staggerChildren: 0.5,
            }
        }
    }




    const getMotionVariants = () => ({
        open: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                bounce: 0,
                duration: 1,
                delayChildren: 0.3,
                when: "beforeChildren",
                staggerChildren: 0.05,

            }
        },
        closed: {
            opacity: 0,
            scale: 0,
            transition: {
                type: "spring",
                bounce: 0,
                duration: 0.3,
            }
        },
        hidden: {
            false: false
        }


    });





    const titleVariant = {
        hidden: {
            left: 0,
        },
        visible: {
            left: '100%',
            transition: {
                duration: 0.5
            }

        }
    }


    const titleVariant2 = {
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



    // const TabPanel = (props) => {
    //     const { children, value, index, ...other } = props;

    //     return (
    //         <div
    //             role="tabpanel"
    //             hidden={value !== index}
    //             id={`simple-tabpanel-${index}`}
    //             aria-labelledby={`simple-tab-${index}`}
    //             {...other}
    //         >
    //             {value === index && (
    //                 <Box sx={{ p: 3 }}>
    //                     <Typography className="font-oswald">{children}</Typography>
    //                 </Box>
    //             )}
    //         </div>
    //     );
    // };

    const TabButton = (values, text, icon,) => {
        return (
            <button onClick={() => setValue(values)} className={`${value === values ? "tabStyleActive" : ""} tabStyle relative`}>
                <Icon icon={icon} />
                <p className="xl:flex hidden">{text}</p>
            </button>
        )
    }

    return (
        <motion.div
            variants={mainVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className=" xl:py-32 xl:mt-5  text-center 2xl:text-start flex flex-col xl:flex-row md:gap-24 gap-10 justify-center"
        >
            <div>

                <div
                    className='transitions xl:hidden dark:text-theme w-full p-5 dark:bg-gray-800 bg-gray-200 h-52 flex items-center justify-center mb-10'>
                    <motion.h1
                        variants={titleVariant2}
                        className='text-4xl text-center md:text-6xl font-normal'>My Resume </motion.h1>
                </div>
                <h1 className='transitions hidden xl:flex text-6xl text-darktheme dark:text-theme font-light mb-10 relative'>
                    <motion.div
                        variants={titleVariant}
                        className="title">
                    </motion.div>
                    My Resume</h1>
                <div className="flex xl:flex-col   justify-evenly xl:gap-4 text-xl xl:items-normal items-center">


                    {TabButton(1, "Experience", "ic:baseline-work")}
                    {TabButton(2, "Education", "fluent:hat-graduation-16-filled")}
                    {TabButton(3, "Extra-Curricular Activities", "mdi:charity")}
                    {TabButton(4, "Awards", "flowbite:award-outline")}
                    {TabButton(5, "Skills", "mage:star-fill")}
                    {TabButton(6, "Languages", "hugeicons:language-skill")}

                </div>

            </div>


            <div className='mb-10 md:mb-0'>
                <motion.div
                    // variants={getMotionVariants()}
                    variants={ExperienceVariant}
                    initial="hidden"
                    animate={value === 1 ? "visible" : "hidden"}
                    className={`${value != 1 ? "hidden" : "resumeContainer"}`}
                >
                    <h1 className='transitions text-4xl dark:text-theme'>My Experience</h1>
                    <Experience />

                </motion.div>

                <motion.div
                    variants={getMotionVariants()}
                    animate={value === 2 ? "open" : "closed"}
                    className={`${value != 2 ? "hidden" : "resumeContainer"}`}

                >
                    Hello
                </motion.div>
                <motion.div
                    variants={getMotionVariants()}
                    animate={value === 3 ? "open" : "closed"}
                    className={`${value != 3 ? "hidden" : "resumeContainer"}`}

                >
                    Hello
                </motion.div>

            </div>
            {/* <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="none"
                orientation="vertical"
                className="bg-transparent flex-col text-darktheme rounded-md p-5 "
            >
                <Tab
                    label="Education"
                    className={` ${value === 0 ? "tabStyleActive tabStyle" : "tabStyle"}`}
                />
                <Tab
                    label="Experience"
                    className={`tabStyle ${value === 1 ? "tabStyleActive" : ""}`}
                />
                <Tab
                    label="Skills"
                    className={`tabStyle ${value === 2 ? "tabStyleActive" : ""}`}
                />
            </Tabs>

            <TabPanel value={value} index={0}>
                <motion.div
                    variants={tabVariant}
                    className="p-4 bg-white rounded shadow-md !font-oswald">Hello2</motion.div>
            </TabPanel>

            <TabPanel value={value} index={1}>
                <motion.div
                    variants={tabVariant}
                    className="p-4 bg-white rounded shadow-md !font-oswald">Hello3</motion.div>
            </TabPanel>

            <TabPanel value={value} index={2}>
                <motion.div
                    variants={tabVariant}
                    className="p-4 bg-white rounded shadow-md font-oswald">Hello4</motion.div>
            </TabPanel> */}
        </motion.div>
    );
}

export default Resume
