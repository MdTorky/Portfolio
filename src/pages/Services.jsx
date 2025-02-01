import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import servicesData from '../data/services.json'
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom'

var web = servicesData.web
var graphic = servicesData.graphic
var writing = servicesData.writing
const Services = ({ language, languageText }) => {

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
                <h2 className='text-2xl font-semibold text-bluetheme  transitions mt-14 text-center uppercase'>{language == "en" ? service.name : service.arabicName}</h2>
                <p className='box-border text-md my-3 text-darktheme dark:text-theme transitions mb-10 text-center whitespace-pre-wrap'>{language == "en" ? service.description : service.arabicDescription}</p>

                <Link
                    onClick={(e) => {
                        e.preventDefault(); // Prevent the default behavior
                        setSelected(service); // Update the selected service
                    }}
                >
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
                        className=' serviceButton left-0 rounded-bl-md !bg-red-700 dark:text-theme'
                    >
                        {languageText.MoreInfo}

                    </motion.div>
                </Link>

                <Link to={`/requestform/${service.id}`}>
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
                        className=' serviceButton  right-0 rounded-br-md'
                    >
                        {languageText.Request}

                    </motion.div>
                </Link>
                <Link onClick={() => window.open(service.link, "_blank")} className="absolute top-0 left-0 rounded-tl-md  bg-darktheme dark:bg-theme text-sm text-theme dark:text-darktheme px-2 py-2 hover:scale-110 transition duration-300">{service.price}</Link>
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
                className='transitions dark:text-theme w-full p-5 md:p-20 md:px-52 dark:bg-gray-800 bg-gray-200 h-52 md:h-96 flex flex-col items-center md:items-start justify-center md:justify-center'>
                <motion.h1
                    variants={childVariant}
                    className='text-4xl text-center md:text-6xl font-bold'>{languageText.AllServices}</motion.h1>

                <motion.button onClick={() => window.open("https://www.paypal.com/ncp/payment/D9JBJEVR2K28A", "_blank")} variants={childVariant} className='bg-bluetheme px-4 py-2 w-52 flex justify-center text-theme rounded-md mt-3 hover:scale-105 transition duration-150'>{languageText.ChooseService}</motion.button>
            </div>

            <motion.h1
                variants={projectVariant}
                className='bg-darktheme dark:bg-theme text-theme dark:text-darktheme w-80 my-4 p-2 text-center text-3xl rounded-md'
            >{languageText.WebBased}
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
            >{languageText.GraphicBased}
            </motion.h1>
            <motion.div

                variants={projectVariant}
                // ref={ref}
                className='my-10 flex flex-wrap justify-center gap-14 md:gap-20 md:p-0 w-[80%]'>
                {graphic.map((service) => (
                    (serviceCard(service))
                ))}
            </motion.div>

            <motion.h1
                variants={projectVariant}
                className='bg-bluetheme dark:bg-bluetheme text-theme w-100 my-4 p-2 text-center text-3xl rounded-md'
            >{languageText.ContentBased}
            </motion.h1>
            <motion.div

                variants={projectVariant}
                // ref={ref}
                className='my-10 flex flex-wrap justify-center gap-14 md:gap-20 md:p-0 w-[80%]'>
                {writing.map((service) => (
                    (serviceCard(service))
                ))}

                <AnimatePresence>
                    {selected && (
                        <motion.div
                            onClick={() => setSelected(null)}

                            className="fixed top-36 md:top-0 inset-0 z-40 md:bg-black/70 p-5 flex md:items-center justify-center ">

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
                                className="bg-theme dark:bg-darktheme p-4 w-[800px] rounded-md relative md:overflow-none overflow-y-auto">
                                <button
                                    className={`${language === 'en' ? 'right-6' : 'left-6'} absolute top-6  text-3xl text-red-800 hover:text-bluetheme transitions z-50`}
                                    onClick={() => setSelected(null)}
                                >
                                    <Icon icon="zondicons:close-outline" />
                                </button>
                                <div className="bg-gray-400 relative w-full rounded-md gradient-color border-gray-300 dark:border-gray-700 border-2">
                                    <div className="px-2 xl:px-6 py-3 flex items-center gap-2">
                                        <div className='flex flex-col gap-1 justify-center items-center'>
                                            <div className='px-4 py-3 rounded-lg bg-darktheme dark:bg-theme w-fit text-xl text-theme dark:text-darktheme'><Icon icon={selected.icon} /></div>
                                            <p className='text-theme bg-bluetheme px-2 rounded-sm text-sm xl:text-md whitespace-nowrap w-fit'>{selected.price}</p>
                                        </div>
                                        <h1 className="dark:text-theme text-darktheme text-lg xl:text-2xl w-[70%]">{language === 'en' ? selected.name : selected.arabicName}</h1>
                                    </div>
                                    <p className="p-4 whitespace-pre-wrap text-darktheme dark:text-theme">{language === 'en' ? selected.moreinfo : selected.arabicMoreinfo}</p>
                                </div>

                            </motion.div>

                        </motion.div>
                    )

                    }
                </AnimatePresence>
            </motion.div>

        </motion.div>


    )
}

export default Services
