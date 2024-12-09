import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion"
import { Icon } from '@iconify/react';
import { button } from '@material-tailwind/react';
import LogoDesign from '../components/LogoDesign';
import servicesData from '../data/services.json'

var graphic = servicesData.graphic

const Gallery = () => {

    const [gallery, setGallery] = useState(() => {
        const savedValue = localStorage.getItem('galleryValue')
        return savedValue ? JSON.parse(savedValue) : 1

    });

    useEffect(() => {
        localStorage.setItem('galleryValue', JSON.stringify(gallery))
    }, [gallery])

    const handleChange = (event, newValue) => {
        setGallery(newValue);
    };





    // <div className="p-4">
    //     <h1 className="text-2xl font-bold text-center mb-4">Resume Folder Images</h1>
    //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    //         {images.map((file) => (
    //             <div key={file.id} className="border rounded overflow-hidden shadow-lg">
    //                 <img
    //                     src={file.thumbnailLink}
    //                     alt={file.name}
    //                     className="w-full h-48 object-cover"
    //                 />
    //                 <p className="p-2 text-center">{file.name}</p>
    //             </div>
    //         ))}
    //     </div>
    // </div>



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

    const titleVariant = {
        hidden: {
            left: 0,
        },
        visible: {
            left: '100%',
            transition: {
                duration: 0.2
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

    const TabButton = (values, text, icon,) => {
        return (
            <button onClick={() => setGallery(values)} className={`${gallery === values ? "tabStyleActive" : ""} tabStyle relative`}>
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
                        className='text-4xl text-center md:text-6xl font-normal'>My Work </motion.h1>
                </div>
                <h1 className=' hidden xl:flex text-6xl text-darktheme dark:text-theme font-normal mb-10 relative'>
                    <motion.div
                        variants={titleVariant}
                        className="title">
                    </motion.div>
                    My Work</h1>
                <div className="flex xl:flex-col   justify-evenly xl:gap-4 text-xl xl:items-normal items-center">

                    {graphic.map((service) => (
                        TabButton(service.id, service.name, service.icon)
                    ))}
                </div>

            </div>


            <div className='mb-10 md:mb-0'>
                <motion.div
                    // variants={getMotionVariants()}
                    variants={ExperienceVariant}
                    initial="hidden"
                    animate={gallery === 1 ? "visible" : "hidden"}
                    className={`${gallery != 1 ? "hidden" : "resumeContainer"}`}
                >
                    <h1 className='transitions text-4xl dark:text-theme'>Logo Designs</h1>
                    <LogoDesign />

                </motion.div>
            </div>
        </motion.div>
    );
};

export default Gallery
