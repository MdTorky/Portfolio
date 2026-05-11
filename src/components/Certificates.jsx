import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Icon } from '@iconify/react';

const Certificates = ({ language }) => {
    const [selected, setSelected] = useState(null);

    const certificates = [
        {
            id: 2,
            name: "AWS Academy Graduate - AWS Academy Data Engineering",
            arabicName: "خريج أكاديمية AWS - هندسة بيانات أكاديمية AWS",
            company: "Amazon Web Services Training and Certification",
            arabicCompany: "تدريب وشهادات أمازون ويب سيرفيسز",
            date: "31 May 2025",
            arabicDate: "31 مايو 2025",
            description: "Gained expertise in data engineering on AWS, including data collection, storage, processing, analysis, and visualization. Mastered the use of AWS services like Glue, Athena, Redshift, and EMR to build robust data pipelines and analytical solutions.",
            arabicDescription: "اكتسبت خبرة في هندسة البيانات على AWS، بما في ذلك جمع البيانات وتخزينها ومعالجتها وتحليلها وتصورها. أتقنت استخدام خدمات AWS مثل Glue و Athena و Redshift و EMR لبناء خطوط بيانات قوية وحلول تحليلية.",
            icon: "mdi:aws",

            img: "https://images.credly.com/size/340x340/images/8a28a66c-151d-4f2d-b021-ca7d3e146437/blob",
            link: "https://www.credly.com/badges/513de1f9-0c84-47a6-81f1-a3a96f9afdf0/public_url"
        },
        {
            id: 3,
            name: "AWS Academy Graduate - Machine Learning Foundation",
            arabicName: "خريج أكاديمية AWS - أساسيات تعلم الآلة",
            company: "Amazon Web Services Training and Certification",
            arabicCompany: "تدريب وشهادات أمازون ويب سيرفيسز",
            date: "19 Nov 2025",
            arabicDate: "19 نوفمبر 2025",
            description: "Developed a foundational understanding of machine learning concepts and AWS ML services. Explored the ML pipeline, including problem definition, data preparation, model training, evaluation, and deployment using Amazon SageMaker and other AWS AI services.",
            arabicDescription: "طورت فهماً أساسياً لمفاهيم تعلم الآلة وخدمات AWS ML. استكشفت خط أنابيب ML، بما في ذلك تعريف المشكلة، وإعداد البيانات، وتدريب النموذج، والتقييم، والنشر باستخدام Amazon SageMaker وخدمات AWS AI الأخرى.",
            icon: "mdi:aws",
            img: "https://images.credly.com/size/340x340/images/727c2754-d727-4e27-a1aa-3de2425ce239/blob",
            link: "https://www.credly.com/badges/6189ff23-de5b-4a36-9cdf-c03df624659e/public_url"
        },
        {
            id: 1,
            name: "AWS Academy Graduate - AWS Academy Cloud Foundations",
            arabicName: "خريج أكاديمية AWS - أساسيات سحابة أكاديمية AWS",
            company: "Amazon Web Services Training and Certification",
            arabicCompany: "تدريب وشهادات أمازون ويب سيرفيسز",
            date: "30 Apr 2025",
            arabicDate: "30 أبريل 2025",
            description: "Completed the AWS Academy Cloud Foundations course, covering cloud computing concepts, AWS core services, security, architecture, pricing, and support. Developed a solid understanding of how to leverage AWS to build scalable and secure cloud solutions.",
            arabicDescription: "أكملت دورة أساسيات سحابة أكاديمية AWS، والتي تغطي مفاهيم الحوسبة السحابية، وخدمات AWS الأساسية، والأمن، والهندسة المعمارية، والتسعير، والدعم. اكتسبت فهماً قوياً لكيفية الاستفادة من AWS لبناء حلول سحابية قابلة للتطوير وآمنة.",
            icon: "mdi:aws",
            img: "https://images.credly.com/size/340x340/images/e3541a0c-dd4a-4820-8052-5001006efc85/blob",
            link: "https://www.credly.com/go/yrDeYgDe"
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
            {certificates.map((cert) => (
                <motion.div
                    key={cert.id}
                    variants={cardVariant}
                    whileHover={{ y: -5 }}
                    className='glass-morphism rounded-2xl p-6 cursor-pointer premium-shadow group transitions'
                    onClick={() => setSelected(cert)}
                >
                    <div className='flex items-start justify-between mb-4'>
                        <div className='p-3 rounded-xl bg-bluetheme/10 text-bluetheme group-hover:bg-bluetheme group-hover:text-white transitions'>
                            <Icon icon={cert.icon} className="text-2xl" />
                        </div>
                        <span className='text-sm font-semibold text-bluetheme px-3 py-1 bg-bluetheme/10 rounded-full'>
                            {language === 'ar' ? cert.arabicDate : cert.date}
                        </span>
                    </div>
                    <h3 className='text-xl font-bold mb-1 text-darktheme dark:text-theme group-hover:text-bluetheme transitions'>
                        {language === 'ar' ? cert.arabicName : cert.name}
                    </h3>
                    <div className='flex items-center gap-2 text-gray-500 dark:text-gray-400'>
                        <span className='w-1.5 h-1.5 rounded-full bg-bluetheme' />
                        <p className='font-medium'>{language === 'ar' ? cert.arabicCompany : cert.company}</p>
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
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
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
                                    <div className='h-64 w-full relative overflow-hidden bg-white flex items-center justify-center p-8'>
                                        <img src={selected.img} alt={selected.name} className='max-h-full max-w-full object-contain' />
                                        <div className='absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none' />
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
                                            <Icon icon="mdi:certificate" className='text-xl' />
                                            {language === 'ar' ? "رابط الشهادة" : "Certificate Link"}
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

export default Certificates
