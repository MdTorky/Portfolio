import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Icon } from '@iconify/react';
const Experience = ({ language }) => {


    const [selected, setSelected] = useState(null);

    // const handleCardClick = (experience) => {
    //     setSelectedExperience(experience);
    // };
    // const handleClose = () => {
    //     setSelectedExperience(null);
    // };

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

    return (
        <div className='mt-10 flex justify-center gap-10 flex-wrap'>
            {experiences.map((exp) => (
                <motion.div
                    key={exp.id}
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
                    onClick={() => setSelected(exp)}
                >
                    <motion.div
                        className='flex items-center justify-between'>
                        <div className='transitions bg-gray-300 dark:bg-gray-900 p-2 rounded-md'>
                            <Icon icon={exp.icon} className="transitions dark:text-theme text-darktheme text-2xl" />
                        </div>
                        <p className='text-bluetheme'>{language === 'ar' ? exp.arabicDate : exp.date}</p>
                    </motion.div>
                    <h1 className='transitions mt-2 text-xl dark:text-theme'>{language === 'ar' ? exp.arabicTitle : exp.title}</h1>
                    <div className='flex justify-end mt-5 items-center gap-2'>
                        <p className='text-bluetheme text-lg'>•</p>
                        <p className='text-gray-500 text-lg'>{exp.company}</p>
                    </div>
                </motion.div>
            ))}


            <AnimatePresence>
                {selected && (

                    <motion.div

                        onClick={() => setSelected(null)}

                        className='fixed inset-0 bg-black/70 flex items-center justify-center z-50'
                    >

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
                            // layoutId={`card-${selected.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className='gradient-color rounded-md p-3 flex  flex-col w-[600px] cursor-pointer relative gap-2'
                        >
                            <button
                                className='absolute top-2 right-2 text-3xl text-darktheme dark:text-theme hover:text-bluetheme transitions'
                                onClick={() => setSelected(null)}
                            >
                                <Icon icon="zondicons:close-outline" />
                            </button>
                            <div className='rounded-md m-auto mb-5  bg-white '>
                                <img src={selected.img} alt="" className='rounded-md w-[200px]' />
                            </div>
                            <div className='flex justify-between -mb-2'>
                                <h1 className='xl:text-2xl text-xl dark:text-theme'>{language === 'ar' ? selected.arabicTitle : selected.title}</h1>
                                <p className='text-theme bg-bluetheme px-1 flex items-center rounded-sm'>{language === 'ar' ? selected.arabicDate : selected.date}</p>

                            </div>
                            <p className='text-bluetheme text-start'>{selected.company}</p>
                            <p className='mt-4 dark:text-theme text-justify whitespace-pre-wrap'>{language === 'ar' ? selected.arabicDescription : selected.description}</p>
                        </motion.div>
                    </motion.div>

                )}
            </AnimatePresence>

        </div>
    );
};

export default Experience






{/* <button
                                className='absolute top-2 right-2 text-3xl text-theme hover:text-bluetheme transitions'
                                onClick={() => setSelected(null)}
                            >
                                <Icon icon="zondicons:close-outline" />
                            </button>
                            <img src={selected.img} alt="" className='bg-white rounded-md w-[200px] h-[200px] xl:w-[100px] xl:h-[100px]' />
                            <div className='flex  flex-col justify-between'>
                                <div className='flex items-center justify-between xl:w-[90%]'>
                                    <h1 className='xl:text-2xl dark:text-theme'>{selected.title}</h1>
                                    <p className='text-theme bg-bluetheme px-1 flex items-center rounded-sm'>{selected.date}</p>

                                </div>

                                <p className='text-bluetheme text-start'>{selected.company}</p>
                                <p className='mt-4 dark:text-theme text-justify'>{selected.description}</p>
                            </div>
                        </motion.div> */}