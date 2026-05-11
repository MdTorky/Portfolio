import React from 'react'
import { motion } from "framer-motion"
import { Icon } from '@iconify/react';

const Languages = ({ language }) => {
    const languages = [
        {
            id: 1,
            name: "Arabic",
            level: "Native",
            arabicName: "العربية",
            arabicLevel: "اللغة الأم",
            icon: "emojione:flag-for-palestinian-territories",
        },
        {
            id: 2,
            name: "English",
            level: "Professional",
            arabicName: "الإنجليزية",
            arabicLevel: "محترف",
            icon: "emojione:flag-for-united-states",
        },
        {
            id: 3,
            name: "French",
            level: "Beginner",
            arabicName: "الفرنسية",
            arabicLevel: "مبتدئ",
            icon: "emojione:flag-for-france",
        }
    ];

    const cardVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            {languages.map((lang) => (
                <motion.div
                    key={lang.id}
                    variants={cardVariant}
                    whileHover={{ y: -5 }}
                    className='glass-morphism rounded-2xl p-6 flex items-center gap-6 premium-shadow group transitions'
                >
                    <div className='w-16 h-16 rounded-full overflow-hidden border-4 border-white/10 premium-shadow group-hover:scale-110 transitions flex-shrink-0'>
                        <Icon icon={lang.icon} className="w-full h-full object-cover" />
                    </div>
                    <div className='flex flex-col'>
                        <h3 className='text-xl font-bold text-darktheme dark:text-theme'>
                            {language === 'en' ? lang.name : lang.arabicName}
                        </h3>
                        <span className='text-sm font-bold text-bluetheme uppercase tracking-wider mt-1'>
                            {language === 'en' ? lang.level : lang.arabicLevel}
                        </span>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default Languages
