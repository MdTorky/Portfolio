import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion"
import { Icon } from '@iconify/react';
import LogoDesign from '../components/LogoDesign';
import Posters from '../components/Posters';
import SquareSocialMedia from '../components/SquareSocialMedia';
import Stories from '../components/Stories';


const Gallery = ({ language, languageText }) => {

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


    const MiniTabButton = (values, text, icon,) => {
        return (
            <motion.button
                // variants={titleVariant2}
                onClick={() => setGallery(values)} className={`${gallery === values ? "tabStyleActive" : ""} miniTabStyle relative`}>
                <Icon icon={icon} />
                <p className="xl:flex hidden">{text}</p>
            </motion.button>
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
                        className='text-5xl text-center md:text-6xl font-semibold text-darktheme dark:text-theme'>{languageText.MyWork} </motion.h1>
                </div>
                <h1 className=' hidden xl:flex text-6xl text-darktheme dark:text-theme font-normal mb-10 relative'>
                    <motion.div
                        variants={titleVariant}
                        className="title">
                    </motion.div>
                    {languageText.MyWork}</h1>
                <div className="flex xl:flex-col justify-around xl:gap-4 gap-3 text-xl xl:items-normal items-end flex-wrap">

                    {/* {graphic.map((service) => (
                        TabButton(service.id, service.name, service.icon)
                    ))} */}

                    {TabButton(1, languageText.LogoDesign, "carbon:logo-react")}
                    {TabButton(2, languageText.PosterDesign, "fluent:image-border-28-regular")}
                    {gallery !== 3.1 && gallery !== 3.2 && gallery !== 3.3 && TabButton(3, languageText.SocialMedia, "mdi:instagram")}

                    {(gallery === 3 || gallery === 3.1 || gallery === 3.2 || gallery === 3.3) && MiniTabButton(3.1, languageText.SquarePosters, "tabler:square")}
                    {(gallery === 3 || gallery === 3.1 || gallery === 3.2 || gallery === 3.3) && MiniTabButton(3.2, languageText.Stories, "material-symbols:web-stories-outline")}
                    {(gallery === 3 || gallery === 3.1 || gallery === 3.2 || gallery === 3.3) && MiniTabButton(3.3, languageText.InstagramGrid, "ri:grid-fill")}
                    {TabButton(4, languageText.CustomBanners, "material-symbols:planner-banner-ad-pt")}
                    {TabButton(5, languageText.BusinessCard, "radix-icons:id-card")}
                    {TabButton(6, languageText.TShirtDesign, "mdi:tshirt-crew")}
                    {TabButton(7, languageText.PresentationDesign, "icon-park-outline:slide")}
                </div>

            </div>


            <div className='mb-10 md:mb-0'>
                <motion.div
                    // variants={getMotionVariants()}
                    variants={ExperienceVariant}
                    initial="hidden"
                    animate={gallery === 1 ? "visible" : "hidden"}
                    className={`${gallery !== 1 ? "hidden" : "resumeContainer"}`}
                >
                    <h1 className='transitions text-4xl dark:text-theme'>{languageText.LogoDesign}</h1>
                    <LogoDesign languageText={languageText} language={language} />

                </motion.div>
                <motion.div
                    // variants={getMotionVariants()}
                    variants={ExperienceVariant}
                    initial="hidden"
                    animate={gallery === 2 ? "visible" : "hidden"}
                    className={`${gallery !== 2 ? "hidden" : "resumeContainer"}`}
                >
                    <h1 className='transitions text-4xl dark:text-theme'>{languageText.Posters}</h1>
                    <Posters languageText={languageText} language={language} />

                </motion.div>
                <motion.div
                    // variants={getMotionVariants()}
                    variants={ExperienceVariant}
                    initial="hidden"
                    animate={gallery === 3.1 ? "visible" : "hidden"}
                    className={`${gallery !== 3.1 ? "hidden" : "resumeContainer"}`}
                >
                    <h1 className='transitions text-4xl dark:text-theme'>{languageText.SquareSocialMediaPosters}</h1>
                    <SquareSocialMedia languageText={languageText} language={language} />

                </motion.div>

                <motion.div
                    // variants={getMotionVariants()}
                    variants={ExperienceVariant}
                    initial="hidden"
                    animate={gallery === 3.2 ? "visible" : "hidden"}
                    className={`${gallery !== 3.2 ? "hidden" : "resumeContainer"}`}
                >
                    <h1 className='transitions text-4xl dark:text-theme'>{languageText.Stories}</h1>
                    <Stories languageText={languageText} language={language} />

                </motion.div>



            </div>
        </motion.div>
    );
};

export default Gallery
