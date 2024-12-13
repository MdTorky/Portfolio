import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Icon } from '@iconify/react';

const Education = ({ language }) => {

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
            arabicName: "جامعة التكنولوجيا الماليزية",
            degree: "Computer Science",
            arabicDegree: "علوم الكمبيوتر",
            major: "(Software Engineering) with Honours",
            arabicMajor: "(هندسة البرمجيات) مع مرتبة الشرف",
            date: "Oct 2020 - Nov 2024",
            arabicDate: "أكتوبر 2020 - نوفمبر 2024",
            country: "Malaysia",
            arabicCountry: "ماليزيا",
            city: "Johor Bahru",
            arabicCity: "جوهر بهرو",
            gpa: "3.79",
            icon: "lucide:university",
            img: "https://www.studymalaysiainfo.com/wp-content/uploads/2016/11/UTM-image.jpg",
        },
        {
            id: 2,
            name: "Qimam Elhayat International School",
            arabicName: "مدرسة قمم الحياة العالمية",
            degree: "High School",
            arabicDegree: "المدرسة الثانوية",
            major: "",
            date: "Oct 2017 - Aug 2020",
            arabicDate: "أكتوبر 2017 - أغسطس 2020",
            country: "Saudi Arabia",
            arabicCountry: "السعودية",
            city: "Riyadh",
            arabicCity: "الرياض",
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
                            <p className='text-bluetheme text-lg'>{language === 'en' ? ed.date : ed.arabicDate}</p>
                        </div>
                    </motion.div>
                    <h1 className='transitions mt-2 text-xl dark:text-theme'>{language === 'en' ? ed.name : ed.arabicName}</h1>
                    <h2 className='transitions text-md dark:text-gray-400 text-gray-500'>{language === 'en' ? ed.degree : ed.arabicDegree} {language === 'en' ? ed.major : ed.arabicMajor}</h2>
                    <div className='flex justify-between mt-5 items-center'>
                        <p className='text-theme bg-bluetheme px-2 rounded-sm text-md'>{language === 'en' ? ed.country : ed.arabicCountry} - {language === 'en' ? ed.city : ed.arabicCity}</p>
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
                            <div className="bg-gray-400 relative w-full  rounded-md gradient-color border-gray-300 dark:border-gray-700 border-2">
                                <p className="absolute text-xl xl:text-2xl text-darktheme bg-theme dark:bg-darktheme dark:text-theme z-50  rounded-br-md p-2 border-darktheme dark:border-theme border-r-2 border-b-2 top-0 left-0">{selected.gpa} / 4</p>
                                <div className=' relative w-full h-[150px] xl:h-[250px] dark:border-theme border-2 border-darktheme rounded-sm overflow-hidden bg-gradient-to-tr from-[#69696949] to-[#5555557b] flex items-center'>
                                    <img src={selected.img} alt="" className=" transition duration-500 ease-linear cursor-pointer rounded-md w-full bg-cover  transform hover:scale-125 mix-blend-overlay" />
                                </div>
                                <div className="px-2 xl:px-6">
                                    <div className=" mt-5 flex items-center justify-between">
                                        <h1 className="dark:text-theme text-darktheme text-lg xl:text-2xl">{language === 'en' ? selected.name : selected.arabicName}</h1>
                                        <p className='text-theme bg-bluetheme px-2 rounded-sm text-sm xl:text-md whitespace-nowrap'>{language === 'en' ? selected.country : selected.arabicCountry} - {language === 'en' ? selected.city : selected.arabicCity}</p>
                                    </div>
                                    <p className='dark:text-gray-400 text-gray-600 mt-1'>{language === 'en' ? selected.degree : selected.arabicDegree} {language === 'en' ? selected.major : selected.arabicMajor}</p>
                                    <div className="flex justify-end my-2">
                                        {/* <Link to="https://google.com" className='flex items-center text-xl bg-bluetheme p-2 gap-2 text-theme rounded-md'><Icon icon="cil:link" /> Link</Link> */}
                                        <div className="flex items-center justify-end text-bluetheme">

                                            {/* <div className="flex items-center justify-evenly text-theme bg-bluetheme rounded-md"> <p>Start</p> End</div> */}
                                            {language === 'en' ? selected.date : selected.arabicDate}
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
