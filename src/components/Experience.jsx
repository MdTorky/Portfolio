import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Icon } from '@iconify/react';

const Experience = ({ language }) => {
    const [selected, setSelected] = useState(null);

    const experiences = [
        {
            id: 1,
            date: 'Sep 2023 - Feb 2024',
            arabicDate: 'سبتمبر 2023 - فبراير 2024',
            title: 'Software Engineer Internship',
            arabicTitle: 'التدريب العملي لمهندس البرمجيات',
            company: 'Mirco Semiconductor Sdn Bhd.',
            icon: 'streamline:office-worker-solid',
            description: '•Conducted functional and performance testing for the "DialysisManager" project, achieving a 30% reduction in load times through meticulous debugging and optimization.\n•Designed and implemented the front-end architecture for the "OnlyCars" project, ensuring high quality standards and smooth user experiences.\n•Developed a secure and efficient CV generator tool for GitMeHired using Laravel, integrating robust features such as testing, optimization, and comprehensive documentation.\n•Gained practical experience in full-stack development while adhering to Agile workflows and maintaining high performance in deliverables.',
            arabicDescription: '•إجراء اختبارات وظيفية وأداء لمشروع "DialysisManager"، مما أدى إلى تقليل أوقات التحميل بنسبة 30% من خلال تصحيح الأخطاء والتحسين الدقيق.\n•تصميم وتنفيذ بنية الواجهة الأمامية لمشروع "OnlyCars"، مما يضمن معايير الجودة العالية و تجارب مستخدم سلسة.\n•تم تطوير أداة آمنة وفعالة لإنشاء السيرة الذاتية لـ GitMeHired باستخدام Laravel، ودمج الميزات القوية مثل الاختبار والتحسين والشاملة التوثيق.\n•اكتسبت خبرة عملية في التطوير الكامل مع الالتزام بسير العمل Agile والحفاظ على الأداء العالي في التسليمات.',
            img: "https://mymagic-central.s3.amazonaws.com/uploads/organization/thumbnail/dbdcfb1a61a2dd8ec146e17304251b5e2d5be796.adaptiveResize.320x320.png"
        },
        {
            id: 2,
            date: 'Jan 2023 - Sep 2023',
            arabicDate: 'يناير 2023 - سبتمبر 2023',
            title: 'Front-End Developer',
            arabicTitle: 'مطور الواجهة الأمامية',
            company: 'IntelliRent',
            icon: 'carbon:user-activity',
            description: '•Collaborated with team members to enhance the user interface of a rental property management system tailored for the Malaysian market.\n•Optimized UI/UX to ensure seamless navigation, increasing user satisfaction through intuitive design and responsiveness by 42%.\n•Utilized modern front-end technologies to deliver scalable and visually appealing web solutions.',
            arabicDescription: '• تعاونت مع أعضاء الفريق لتحسين واجهة المستخدم لنظام إدارة العقارات الإيجارية المصمم خصيصًا للسوق الماليزية.\n• تحسين واجهة المستخدم وتجربة المستخدم لضمان التنقل السلس، وزيادة رضا المستخدم من خلال التصميم البديهي والاستجابة بنسبة 42٪.\n• استخدام تقنيات الواجهة الأمامية الحديثة لتقديم حلول ويب قابلة للتطوير وجذابة بصريًا.',
            img: "https://media.licdn.com/dms/image/D560BAQHa0PovtJRZKA/company-logo_200_200/0/1683204563613?e=2147483647&v=beta&t=9Qi09aalFBn8XPyhKMnfzzy0kQtVl-OFWUs-t3RCQGs"
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
            {experiences.map((exp) => (
                <motion.div
                    key={exp.id}
                    variants={cardVariant}
                    whileHover={{ y: -5 }}
                    className='glass-morphism rounded-2xl p-6 cursor-pointer premium-shadow group transitions'
                    onClick={() => setSelected(exp)}
                >
                    <div className='flex items-start justify-between mb-4'>
                        <div className='p-3 rounded-xl bg-bluetheme/10 text-bluetheme group-hover:bg-bluetheme group-hover:text-white transitions'>
                            <Icon icon={exp.icon} className="text-2xl" />
                        </div>
                        <span className='text-sm font-semibold text-bluetheme px-3 py-1 bg-bluetheme/10 rounded-full'>
                            {language === 'ar' ? exp.arabicDate : exp.date}
                        </span>
                    </div>
                    <h3 className='text-xl font-bold mb-1 text-darktheme dark:text-theme group-hover:text-bluetheme transitions'>
                        {language === 'ar' ? exp.arabicTitle : exp.title}
                    </h3>
                    <div className='flex items-center gap-2 text-gray-500 dark:text-gray-400'>
                        <span className='w-1.5 h-1.5 rounded-full bg-bluetheme' />
                        <p className='font-medium'>{exp.company}</p>
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
                                <div className='h-48 w-full bg-white flex items-center justify-center p-8'>
                                    <img src={selected.img} alt={selected.company} className='max-h-full max-w-full object-contain' />
                                </div>
                                <div className='p-8 md:p-10'>
                                    <div className='flex flex-wrap items-center justify-between gap-4 mb-6'>
                                        <div>
                                            <span className='text-bluetheme font-bold uppercase tracking-wider text-sm'>
                                                {selected.company}
                                            </span>
                                            <h2 className='text-3xl font-bold text-darktheme dark:text-theme mt-1'>
                                                {language === 'ar' ? selected.arabicTitle : selected.title}
                                            </h2>
                                        </div>
                                        <span className='px-4 py-2 bg-bluetheme text-white rounded-xl font-bold text-sm'>
                                            {language === 'ar' ? selected.arabicDate : selected.date}
                                        </span>
                                    </div>
                                    <div className='max-h-60 overflow-y-auto pr-4 custom-scrollbar'>
                                        <p className='text-lg text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed'>
                                            {language === 'ar' ? selected.arabicDescription : selected.description}
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

export default Experience