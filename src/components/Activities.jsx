import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom'

const Activities = ({ language, languageText }) => {
    const [selected, setSelected] = useState(null)

    const activities = [
        {
            id: 1,
            name: "Head of the Egyptian Academic Committee",
            role: "President",
            organizers: "ISS Egypt UTM",
            date: "Nov 2023 - Dec 2024",
            description: 'Organized academic seminars and revision sessions across university majors, supporting students’ academic success.',
            icon: "solar:square-academic-cap-bold",
            link: "",
            webLink: "https://www.instagram.com/issegypt/",
            arabicName: "رئيس اللجنة الأكاديمية المصرية",
            arabicRole: "رئيس",
            arabicOrganizers: "اتحاد الطلبة المصرين في UTM",
            arabicDate: "نوفمبر 2023 - ديسمبر 2024",
            arabicDescription: 'قمت بتنظيم ندوات أكاديمية وجلسات مراجعة في مختلف التخصصات الجامعية، ودعم النجاح الأكاديمي للطلاب.'
        },
        {
            id: 2,
            name: "Head of the Egyptian Multimedia Committee",
            role: "President",
            organizers: "ISS Egypt UTM",
            date: "Nov 2023 - Dec 2024",
            description: 'Managed content creation, including posters, videos, and social media, and led photography/videography for ISS Egypt events.',
            icon: "pajamas:media-broken",
            link: "",
            webLink: "https://www.instagram.com/issegypt/",
            arabicName: "رئيس اللجنة الاعلامية المصرية",
            arabicRole: "رئيس",
            arabicOrganizers: "اتحاد الطلبة المصرين في UTM",
            arabicDate: "نوفمبر 2023 - ديسمبر 2024",
            arabicDescription: 'قمت بإدارة إنشاء المحتوى، بما في ذلك الملصقات ومقاطع الفيديو ووسائل التواصل الاجتماعي، وقمت بإدارة التصوير الفوتوغرافي وتصوير الفيديو لأحداث ISS مصر.'
        },
        {
            id: 3,
            name: "Head of the ACD Media Committee",
            role: "President",
            organizers: "Arabic Cultural Day 2024",
            date: "Sept 2024 - Dec 2024",
            description: 'Supervised a team of creatives (photographers, designers, writers) executing media coverage for the Arabic Cultural Day event.',
            icon: "mdi:abjad-arabic",
            link: "",
            webLink: "https://www.instagram.com/arabiccultureday/",
            arabicName: "رئيس اللجنة الاعلامية لليوم الثقافي العربي",
            arabicRole: "رئيس",
            arabicOrganizers: "اليوم الثقافي العربي 2024",
            arabicDate: "سبتمبر 2024 - ديسمبر 2024",
            arabicDescription: 'قمت بالإشراف على فريق من المبدعين (مصورين، مصممين، كتاب) الذين قاموا بتنفيذ التغطية الإعلامية لفعاليات اليوم الثقافي العربي.'
        },
        {
            id: 4,
            name: "Education Team",
            role: "Member",
            organizers: "Global Buddies Club",
            date: "Jan 2023 - Jan 2024",
            description: 'Planned events and cultural exchange activities to promote collaboration and community building. In addition, I designed and carried out community service programmes to promote social responsibility and good transformation.',
            icon: "uiw:global",
            link: "https://drive.google.com/file/d/1loMTtJgfoPX__Z0w6VhcEFyrTCau4tlR/view?usp=share_link",
            webLink: "https://www.instagram.com/globalbuddies.utm/",
            arabicName: "فريق التعليم",
            arabicRole: "عضو",
            arabicOrganizers: "نادي Global Buddies",
            arabicDate: "يناير 2023 - يناير 2024",
            arabicDescription: 'لقد خططت لأحداث وأنشطة تبادل ثقافي لتعزيز التعاون وبناء المجتمع. بالإضافة إلى ذلك، قمت بتصميم وتنفيذ برامج الخدمة المجتمعية لتعزيز المسؤولية الاجتماعية والتحول الجيد'
        },
        {
            id: 5,
            name: "Volunteer, Amitabha Malaysia Orphanage",
            role: "Volunteer",
            organizers: "AIESEC in Malaysia",
            date: "Feb 2023 - Mar 2023",
            description: 'Taught children Science, English, and Arts, enhancing instructional skills and adapting to diverse learning needs.',
            icon: "material-symbols-light:volunteer-activism",
            link: "",
            webLink: "https://www.instagram.com/aiesecinmalaysia/",
            arabicName: "متطوع في دار أيتام أميتابها ماليزيا",
            arabicRole: "متطوع",
            arabicOrganizers: "AIESEC في ماليزيا",
            arabicDate: "فبراير 2023 - مارس 2023",
            arabicDescription: 'قمت بتدريس العلوم واللغة الإنجليزية والفنون للأطفال، وتعزيز مهارات التدريس والتكيف مع احتياجات التعلم المتنوعة.'
        },
        {
            id: 6,
            name: "Participant, Southern Leadership Bootcamp",
            role: "Delegate",
            organizers: "AIESEC in Malaysia",
            date: "Jan 2023",
            description: 'Completed an intensive leadership development program focused on personal growth and team management.',
            icon: "iconoir:leaderboard-star",
            link: "https://drive.google.com/file/d/1RrW2la_smD4r2aBBtL0aAYB4nuQ7gw2u/view",
            webLink: "https://www.instagram.com/aiesecinmalaysia/",
            arabicName: "مشارك في معسكر القيادة الجنوبي",
            arabicRole: "مشارك",
            arabicOrganizers: "AIESEC في ماليزيا",
            arabicDate: "يناير 2023",
            arabicDescription: 'أكملت برنامجًا مكثفًا لتنمية القيادة يركز على النمو الشخصي وإدارة الفريق.'
        },
        {
            id: 7,
            name: "Member of the Egyptian Social Committee",
            role: "Member",
            organizers: "ISS Egypt UTM",
            date: "May 2023 - Dec 2023",
            description: 'Assisted in planning and executing cultural events to foster community engagement among international students.',
            icon: "tdesign:member",
            link: "",
            webLink: "https://www.instagram.com/issegypt/",
            arabicName: "عضو اللجنة الاجتماعية المصرية",
            arabicRole: "عضو",
            arabicOrganizers: "اتحاد الطلبة المصرين في UTM",
            arabicDate: "مايو 2023 - ديسمبر 2023",
            arabicDescription: 'المساعدة في التخطيط وتنفيذ الأحداث الثقافية لتعزيز المشاركة المجتمعية بين الطلاب الدوليين.'
        },
        {
            id: 8,
            name: "AutoCar Workshop",
            role: "Participant",
            organizers: "ISS Egypt, Yemen, Iraq UTM",
            date: "May 2023 - June 2023",
            description: 'Workshop focused on designing, building, and programming autonomous robots with sensor integration.',
            icon: "ci:car-auto",
            link: "https://drive.google.com/file/d/17meit4vmLdnBZJbg7qkjbkYilFBe17o5/view?usp=drive_link",
            webLink: "https://www.instagram.com/issegypt/",
            arabicName: "ورشة اوتوكار",
            arabicRole: "مشارك",
            arabicOrganizers: "اتحاد الطلبة المصرين واليمنين والعراقين في UTM",
            arabicDate: "مايو 2023 - يونيو 2023",
            arabicDescription: 'ركزت ورشة العمل على تصميم وبناء وبرمجة الروبوتات المستقلة مع تكامل أجهزة الاستشعار.'
        },
        {
            id: 9,
            name: "Event Organizer, Leaders 2 You Summit",
            role: "Organizer",
            organizers: "AIESEC in Malaysia",
            date: "Jun 2023",
            description: 'Enhanced attendee experiences through creative event planning and innovative engagement strategies.',
            icon: "fluent-mdl2:party-leader",
            link: "https://drive.google.com/file/d/1a3WqjS2Ihpl5hfY8phoKldAsBGn-pja6/view",
            webLink: "https://www.instagram.com/aiesecinmalaysia/",
            arabicName: "منظم الحدث، Leaders 2 You Summit",
            arabicRole: "منظم",
            arabicOrganizers: "AIESEC في ماليزيا",
            arabicDate: "يونيو 2023",
            arabicDescription: 'تعزيز تجارب الحضور من خلال التخطيط الإبداعي للحدث واستراتيجيات المشاركة المبتكرة.'
        },
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
            {activities.map((activ) => (
                <motion.div
                    key={activ.id}
                    variants={cardVariant}
                    whileHover={{ y: -5 }}
                    className='glass-morphism rounded-2xl p-6 cursor-pointer premium-shadow group transitions'
                    onClick={() => setSelected(activ)}
                >
                    <div className='flex items-start justify-between mb-4'>
                        <div className='p-3 rounded-xl bg-bluetheme/10 text-bluetheme group-hover:bg-bluetheme group-hover:text-white transitions'>
                            <Icon icon={activ.icon} className="text-2xl" />
                        </div>
                        <span className='text-sm font-semibold text-bluetheme px-3 py-1 bg-bluetheme/10 rounded-full'>
                            {language === 'en' ? activ.date : activ.arabicDate}
                        </span>
                    </div>
                    <h3 className='text-xl font-bold mb-1 text-darktheme dark:text-theme group-hover:text-bluetheme transitions'>
                        {language === 'en' ? activ.name : activ.arabicName}
                    </h3>
                    <div className='flex items-center gap-2 text-gray-500 dark:text-gray-400'>
                        <span className='w-1.5 h-1.5 rounded-full bg-bluetheme' />
                        <p className='font-medium'>{language === 'en' ? activ.role : activ.arabicRole}</p>
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

                            <div className='p-8 md:p-10'>
                                <div className='flex flex-wrap items-center justify-between gap-4 mb-6'>
                                    <div className='flex-1'>
                                        <div className='flex items-center gap-3 mb-2'>
                                            <div className='p-2 rounded-lg bg-bluetheme text-white'>
                                                <Icon icon={selected.icon} className="text-xl" />
                                            </div>
                                            <span className='text-bluetheme font-bold uppercase tracking-wider text-sm'>
                                                {language === 'en' ? selected.organizers : selected.arabicOrganizers}
                                            </span>
                                        </div>
                                        <h2 className='text-2xl md:text-3xl font-bold text-darktheme dark:text-theme'>
                                            {language === 'en' ? selected.name : selected.arabicName}
                                        </h2>
                                    </div>
                                    <span className='px-4 py-2 bg-bluetheme text-white rounded-xl font-bold text-sm'>
                                        {language === 'en' ? selected.date : selected.arabicDate}
                                    </span>
                                </div>

                                <div className='mb-8'>
                                    <p className='text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-justify'>
                                        {language === 'en' ? selected.description : selected.arabicDescription}
                                    </p>
                                </div>

                                <div className='flex flex-wrap gap-4'>
                                    {selected.link && (
                                        <a href={selected.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-bluetheme text-white rounded-2xl font-bold transitions hover:scale-105 active:scale-95">
                                            <Icon icon="hugeicons:award-02" className='text-xl' />
                                            {languageText.AwardLink}
                                        </a>
                                    )}
                                    {selected.webLink && (
                                        <a href={selected.webLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 border-2 border-bluetheme text-bluetheme dark:text-theme rounded-2xl font-bold transitions hover:bg-bluetheme hover:text-white">
                                            <Icon icon="mdi:web" className='text-xl' />
                                            {languageText.SocialLink}
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

export default Activities
