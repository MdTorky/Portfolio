import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Icon } from '@iconify/react';

const Education = ({ language }) => {
    const [selected, setSelected] = useState(null);

    const education = [
        {
            id: 3,
            name: "Universiti Teknologi Malaysia (UTM)",
            arabicName: "جامعة التكنولوجيا الماليزية (UTM)",
            degree: "Master's in Data Science",
            arabicDegree: "ماجستير في علم البيانات",
            major: "Specialization in Machine Learning, NLP, and BI analytics",
            arabicMajor: "تخصص في تعلم الآلة، ومعالجة اللغات الطبيعية، وتحليلات ذكاء الأعمال",
            date: "Mar 2025 - Feb 2026",
            arabicDate: "مارس 2025 - فبراير 2026",
            country: "Malaysia",
            arabicCountry: "ماليزيا",
            city: "Johor Bahru",
            arabicCity: "جوهر بهرو",
            gpa: "3.82",
            icon: "lucide:graduation-cap",
            img: "https://www.studymalaysiainfo.com/wp-content/uploads/2016/11/UTM-image.jpg",
        },
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

    useEffect(() => {
        const handleKeyDown = (e) => e.key === 'Escape' && setSelected(null);
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    const cardVariant = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
    };

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {education.map((ed) => (
                <motion.div
                    key={ed.id}
                    variants={cardVariant}
                    whileHover={{ y: -5 }}
                    className='glass-morphism rounded-2xl p-6 cursor-pointer premium-shadow group transitions'
                    onClick={() => setSelected(ed)}
                >
                    <div className='flex items-start justify-between mb-4'>
                        <div className='p-3 rounded-xl bg-bluetheme/10 text-bluetheme group-hover:bg-bluetheme group-hover:text-white transitions'>
                            <Icon icon={ed.icon} className="text-2xl" />
                        </div>
                        <span className='text-sm font-semibold text-bluetheme px-3 py-1 bg-bluetheme/10 rounded-full'>
                            {language === 'en' ? ed.date : ed.arabicDate}
                        </span>
                    </div>
                    <h3 className='text-xl font-bold mb-1 text-darktheme dark:text-theme group-hover:text-bluetheme transitions'>
                        {language === 'en' ? ed.name : ed.arabicName}
                    </h3>
                    <p className='text-gray-500 dark:text-gray-400 font-medium mb-4'>
                        {language === 'en' ? ed.degree : ed.arabicDegree} {language === 'en' ? ed.major : ed.arabicMajor}
                    </p>
                    <div className='flex items-center justify-between mt-auto pt-4 border-t border-gray-200 dark:border-gray-800'>
                        <span className='text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1'>
                            <Icon icon="mdi:location" />
                            {language === 'en' ? ed.city : ed.arabicCity}, {language === 'en' ? ed.country : ed.arabicCountry}
                        </span>
                        <span className='text-sm font-bold text-bluetheme'>
                            GPA {ed.gpa} / 4
                        </span>
                    </div>
                </motion.div>
            ))}

            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelected(null)}
                        className='fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4'
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className='relative w-full max-w-2xl bg-theme dark:bg-darktheme rounded-3xl overflow-hidden premium-shadow'
                        >
                            <button
                                className='absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transitions'
                                onClick={() => setSelected(null)}
                            >
                                <Icon icon="mdi:close" className="text-2xl" />
                            </button>

                            <div className='flex flex-col'>
                                <div className='h-56 w-full relative overflow-hidden'>
                                    <img src={selected.img} alt={selected.name} className='w-full h-full object-cover' />
                                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
                                    <div className='absolute bottom-6 left-8 right-8 flex items-end justify-between'>
                                        <div>
                                            <span className='px-3 py-1 bg-bluetheme text-white text-xs font-bold rounded-full mb-2 inline-block'>
                                                GPA {selected.gpa} / 4
                                            </span>
                                            <h2 className='text-2xl md:text-3xl font-bold text-white leading-tight'>
                                                {language === 'en' ? selected.name : selected.arabicName}
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                                <div className='p-8 md:p-10'>
                                    <div className='flex flex-wrap items-center justify-between gap-4 mb-6'>
                                        <div>
                                            <p className='text-bluetheme font-bold text-lg'>
                                                {language === 'en' ? selected.degree : selected.arabicDegree} {language === 'en' ? selected.major : selected.arabicMajor}
                                            </p>
                                            <span className='text-sm text-gray-500 dark:text-gray-400 font-medium flex items-center gap-1 mt-1'>
                                                <Icon icon="mdi:location" />
                                                {language === 'en' ? selected.city : selected.arabicCity}, {language === 'en' ? selected.country : selected.arabicCountry}
                                            </span>
                                        </div>
                                        <span className='px-4 py-2 bg-bluetheme/10 text-bluetheme rounded-xl font-bold text-sm'>
                                            {language === 'en' ? selected.date : selected.arabicDate}
                                        </span>
                                    </div>
                                    <div className='p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800'>
                                        <p className='text-gray-700 dark:text-gray-300 italic'>
                                            {language === 'en'
                                                ? "Successfully completed the requirements for the mentioned degree with a focus on academic excellence and practical learning."
                                                : "أكملت بنجاح متطلبات الدرجة المذكورة مع التركيز على التميز الأكاديمي والتعلم العملي."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Education
