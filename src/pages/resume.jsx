import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Icon } from '@iconify/react';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Activities from '../components/Activities';
import Awards from '../components/Awards';
import Skills from '../components/Skills';
import Languages from '../components/Languages';

import Certificates from '../components/Certificates';

const Resume = ({ language, languageText }) => {
    const [value, setValue] = useState(() => {
        const savedValue = localStorage.getItem('resumeValue')
        return savedValue ? JSON.parse(savedValue) : 1
    });

    useEffect(() => {
        localStorage.setItem('resumeValue', JSON.stringify(value))
    }, [value])

    const mainVariant = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut",
                staggerChildren: 0.05
            }
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.2 }
        }
    }

    const contentVariant = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        transition: { duration: 0.2, ease: "easeInOut" }
    }

    const sections = [
        { id: 1, label: languageText.Experience, icon: "ic:baseline-work", component: Experience },
        { id: 2, label: languageText.Education, icon: "fluent:hat-graduation-16-filled", component: Education },
        { id: 7, label: languageText.Certificates, icon: "mdi:certificate", component: Certificates },
        { id: 4, label: languageText.Awards, icon: "flowbite:award-outline", component: Awards },
        { id: 5, label: languageText.Skills, icon: "mage:star-fill", component: Skills },
        { id: 3, label: languageText.Activities, icon: "mdi:charity", component: Activities },
        { id: 6, label: languageText.Languages, icon: "hugeicons:language-skill", component: Languages },
    ];

    const ActiveComponent = sections.find(s => s.id === value)?.component || Experience;

    return (
        <motion.div
            variants={mainVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full min-h-screen bg-theme dark:bg-darktheme px-4 md:px-10 lg:px-20 py-10 md:py-20"
        >
            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

                    {/* Sidebar / Navigation */}
                    <div className="lg:w-1/4">
                        <div className="sticky top-24">
                            <h1 className="text-4xl md:text-6xl font-black mb-8 text-darktheme dark:text-theme tracking-tight text-center lg:text-start">
                                {languageText.MyResume.split(' ').map((word, i) => (
                                    <span key={i} className={i === 1 ? 'text-gradient' : ''}>{word} </span>
                                ))}
                            </h1>

                            {/* Desktop Nav */}
                            <div className="hidden lg:flex flex-col gap-3 p-4 glass-morphism rounded-3xl premium-shadow">
                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => setValue(section.id)}
                                        className={`flex items-center gap-4 px-6 py-4 rounded-2xl transitions group ${value === section.id
                                            ? "bg-bluetheme text-white shadow-lg shadow-bluetheme/30"
                                            : "hover:bg-white/10 dark:hover:bg-black/10 text-darktheme dark:text-theme"
                                            }`}
                                    >
                                        <Icon
                                            icon={section.icon}
                                            className={`text-2xl ${value === section.id ? "text-white" : "text-bluetheme"}`}
                                        />
                                        <span className="font-bold text-lg">{section.label}</span>
                                        {value === section.id && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="ml-auto w-2 h-2 rounded-full bg-white"
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Mobile Nav */}
                            <div className="lg:hidden flex overflow-x-auto gap-4 pb-4 no-scrollbar">
                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => setValue(section.id)}
                                        className={`flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-full transitions whitespace-nowrap ${value === section.id
                                            ? "bg-bluetheme text-white"
                                            : "glass-morphism text-darktheme dark:text-theme"
                                            }`}
                                    >
                                        <Icon icon={section.icon} />
                                        <span className="font-bold">{section.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="lg:w-3/4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={value}
                                variants={contentVariant}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                className="min-h-[600px]"
                            >
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-1 rounded-full bg-bluetheme" />
                                    <h2 className="text-3xl font-bold text-darktheme dark:text-theme">
                                        {sections.find(s => s.id === value)?.label}
                                    </h2>
                                </div>
                                <ActiveComponent languageText={languageText} language={language} />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default Resume
