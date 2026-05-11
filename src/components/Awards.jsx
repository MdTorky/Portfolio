import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Icon } from '@iconify/react';

const Awards = ({ language }) => {
    const [selected, setSelected] = useState(null);

    const awards = [
        {
            id: 1,
            name: "Champion at Microsoft APAC AI Accessibility Hackathon",
            arabicName: "بطل في هاكاثون إمكانية الوصول للذكاء الاصطناعي في منطقة آسيا والمحيط الهادئ من Microsoft",
            company: "Microsoft",
            arabicCompany: "مايكروسوفت",
            date: "14 June 2023",
            arabicDate: "14 يونيو 2023",
            description: 'Participated in and achieved First place in the prestigious Microsoft APAC AI Hackathon. Our winning project, "A-EYE," was a groundbreaking AI-powered solution designed to empower visually impaired individuals by providing them with real-time auditory cues, thereby enhancing their confidence in navigating urban environments.',
            arabicDescription: 'شاركت وحصلت على المركز الأول في مسابقة Microsoft APAC AI Hackathon المرموقة. كان مشروعنا الفائز "A-EYE" عبارة عن حل رائد مدعوم بالذكاء الاصطناعي مصمم لتمكين الأفراد المكفوفين من خلال تزويدهم بإشارات سمعية في الوقت الفعلي، وبالتالي تعزيز ثقتهم في التنقل في البيئات الحضرية.',
            icon: "mdi:microsoft",
            img: "https://media.licdn.com/dms/image/v2/D5622AQESAChR8CRJMQ/feedshare-shrink_800/feedshare-shrink_800/0/1689043468706?e=1726099200&v=beta&t=wVt-ukKZbzvCe4HS2Lqiy4nelIvUZLiMf8duoz5qKXI",
            link: "https://www.linkedin.com/feed/update/urn:li:activity:7084361783041277953/?utm_source=share&utm_medium=member_desktop"
        },
        {
            id: 2,
            name: "AutoCar & Line-follower Robot Workshop Competition",
            arabicName: "مسابقة ورشة عمل الروبوتات AutoCar و Line-follower",
            company: "ISS Egypt, Yemen, Iraq UTM",
            arabicCompany: "اتحاد الطلبة المصرين واليمنين والعراقين في UTM",
            date: "03 June 2023",
            arabicDate: "03 يونيو 2023",
            description: 'Secured 1st place, demonstrating technical proficiency, problem-solving, and teamwork in designing and programming autonomous robots.',
            arabicDescription: 'حصلت على المركز الأول، وأثبتت كفاءتي الفنية، وحل المشكلات، والعمل الجماعي في تصميم وبرمجة الروبوتات المستقلة.',
            icon: "ci:car-auto",
            img: "",
            link: "https://www.instagram.com/p/CtMVQfsBp23/"
        }
    ];

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
            {awards.map((award) => (
                <motion.div
                    key={award.id}
                    variants={cardVariant}
                    whileHover={{ y: -5 }}
                    className='glass-morphism rounded-2xl p-6 cursor-pointer premium-shadow group transitions'
                    onClick={() => setSelected(award)}
                >
                    <div className='flex items-start justify-between mb-4'>
                        <div className='p-3 rounded-xl bg-bluetheme/10 text-bluetheme group-hover:bg-bluetheme group-hover:text-white transitions'>
                            <Icon icon={award.icon} className="text-2xl" />
                        </div>
                        <span className='text-sm font-semibold text-bluetheme px-3 py-1 bg-bluetheme/10 rounded-full'>
                            {language === 'ar' ? award.arabicDate : award.date}
                        </span>
                    </div>
                    <h3 className='text-xl font-bold mb-1 text-darktheme dark:text-theme group-hover:text-bluetheme transitions'>
                        {language === 'ar' ? award.arabicName : award.name}
                    </h3>
                    <div className='flex items-center gap-2 text-gray-500 dark:text-gray-400'>
                        <span className='w-1.5 h-1.5 rounded-full bg-bluetheme' />
                        <p className='font-medium'>{language === 'ar' ? award.arabicCompany : award.company}</p>
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
                                {selected.img && (
                                    <div className='h-64 w-full relative overflow-hidden'>
                                        <img src={selected.img} alt={selected.name} className='w-full h-full object-cover' />
                                        <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
                                    </div>
                                )}
                                <div className='p-8 md:p-10'>
                                    <div className='flex flex-wrap items-center justify-between gap-4 mb-6'>
                                        <div>
                                            <div className='flex items-center gap-2 mb-1'>
                                                <Icon icon={selected.icon} className="text-bluetheme text-xl" />
                                                <span className='text-bluetheme font-bold uppercase tracking-wider text-sm'>
                                                    {language === 'ar' ? selected.arabicCompany : selected.company}
                                                </span>
                                            </div>
                                            <h2 className='text-2xl md:text-3xl font-bold text-darktheme dark:text-theme'>
                                                {language === 'ar' ? selected.arabicName : selected.name}
                                            </h2>
                                        </div>
                                        <span className='px-4 py-2 bg-bluetheme text-white rounded-xl font-bold text-sm'>
                                            {language === 'ar' ? selected.arabicDate : selected.date}
                                        </span>
                                    </div>
                                    <div className='mb-8'>
                                        <p className='text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-justify'>
                                            {language === 'ar' ? selected.arabicDescription : selected.description}
                                        </p>
                                    </div>
                                    {selected.link && (
                                        <a 
                                            href={selected.link} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className='flex items-center gap-2 px-6 py-3 bg-bluetheme text-white rounded-2xl font-bold transitions hover:scale-105 active:scale-95 inline-flex'
                                        >
                                            <Icon icon="mdi:link" className='text-xl' />
                                            {language === 'ar' ? "رابط الجائزة" : "Award Link"}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Awards
