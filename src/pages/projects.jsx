import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import projectsData from '../data/projects.json'
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom'

const Projects = ({ languageText, language }) => {
    const [selectedProject, setSelectedProject] = useState(null);

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

    const itemVariant = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    }


    const ProjectCard = ({ project }) => {
        return (
            <motion.div
                variants={itemVariant}
                whileHover={{ y: -10 }}
                className='group relative flex flex-col overflow-hidden rounded-2xl glass-morphism card-hover-effect cursor-pointer w-full max-w-sm md:max-w-none'
                onClick={() => setSelectedProject(project)}
            >
                {/* Image Container */}
                <div className='relative h-64 w-full overflow-hidden'>
                    <motion.img
                        src={project.image}
                        alt={project.name}
                        className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-110'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center'>
                        <span className='px-6 py-2 bg-bluetheme text-white rounded-full font-semibold transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0'>
                            {language === "ar" ? "عرض التفاصيل" : "View Details"}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className='p-6 flex flex-col flex-grow'>
                    <div className='flex items-center justify-between mb-2'>
                        <span className='px-3 py-1 text-xs font-medium text-bluetheme bg-bluetheme/10 rounded-full'>
                            {project.technology}
                        </span>
                    </div>
                    <h3 className='text-xl font-bold mb-2 text-darktheme dark:text-theme group-hover:text-bluetheme transitions'>
                        {language === "ar" ? project.arabicName : project.name}
                    </h3>
                    <p className='text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4'>
                        {language === "ar" ? project.arabicDescription : project.description}
                    </p>
                    
                    <div className='mt-auto flex items-center gap-4 text-darktheme dark:text-theme'>
                        {project.liveDemo && (
                            <Link 
                                to={project.liveDemo} 
                                onClick={(e) => e.stopPropagation()}
                                className='hover:text-bluetheme transitions'
                                target="_blank"
                            >
                                <Icon icon="carbon:demo" className="text-2xl" />
                            </Link>
                        )}
                        {project.github && (
                            <Link 
                                to={project.github} 
                                onClick={(e) => e.stopPropagation()}
                                className='hover:text-bluetheme transitions'
                                target="_blank"
                            >
                                <Icon icon="jam:github" className="text-2xl" />
                            </Link>
                        )}
                    </div>
                </div>
            </motion.div>
        )
    }

    const ProjectDetailModal = ({ project, onClose }) => {
        if (!project) return null;

        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm'
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className='relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-morphism rounded-3xl premium-shadow'
                >
                    {/* Close Button */}
                    <button 
                        onClick={onClose}
                        className='absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transitions'
                    >
                        <Icon icon="mdi:close" className="text-2xl" />
                    </button>

                    <div className='flex flex-col md:flex-row h-full'>
                        {/* Left: Image Section */}
                        <div className='md:w-1/2 h-64 md:h-auto'>
                            <img 
                                src={project.image} 
                                alt={project.name} 
                                className='w-full h-full object-cover'
                            />
                        </div>

                        {/* Right: Content Section */}
                        <div className='md:w-1/2 p-8 md:p-12 flex flex-col bg-theme dark:bg-darktheme'>
                            <span className='text-bluetheme font-semibold mb-2'>
                                {project.technology}
                            </span>
                            <h2 className='text-3xl md:text-4xl font-bold mb-6 text-darktheme dark:text-theme'>
                                {language === "ar" ? project.arabicName : project.name}
                            </h2>
                            
                            <div className='flex-grow overflow-y-auto mb-8 pr-4 custom-scrollbar'>
                                <p className='text-lg text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed'>
                                    {language === "ar" ? project.arabicDescription : project.description}
                                </p>
                            </div>

                            <div className='flex flex-wrap gap-4'>
                                {project.liveDemo && (
                                    <a 
                                        href={project.liveDemo} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className='px-8 py-3 bg-bluetheme text-white rounded-xl font-bold hover:scale-105 active:scale-95 transitions flex items-center gap-2'
                                    >
                                        <Icon icon="carbon:demo" />
                                        {language === "ar" ? "مشاهدة حية" : "Live Demo"}
                                    </a>
                                )}
                                {project.github && (
                                    <a 
                                        href={project.github} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className='px-8 py-3 border-2 border-darktheme dark:border-theme text-darktheme dark:text-theme rounded-xl font-bold hover:bg-darktheme hover:text-theme dark:hover:bg-theme dark:hover:text-darktheme transitions flex items-center gap-2'
                                    >
                                        <Icon icon="jam:github" />
                                        {language === "ar" ? "كود المصدر" : "Source Code"}
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )
    }

    return (
        <motion.div 
            variants={mainVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full min-h-screen bg-theme dark:bg-darktheme"
        >
            {/* Header Section */}
            <div className='relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden'>
                <div className='absolute inset-0 bg-gradient-to-b from-bluetheme/20 to-transparent dark:from-bluetheme/10' />
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='relative z-10 text-center px-4'
                >
                    <h1 className='text-5xl md:text-8xl font-black mb-4 text-darktheme dark:text-theme tracking-tight'>
                        {languageText.FindProjects.split(' ').map((word, i) => (
                            <span key={i} className={i === 1 ? 'text-gradient' : ''}>{word} </span>
                        ))}
                    </h1>
                    <p className='text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light'>
                        {language === "ar" 
                            ? "استكشف مجموعة من المشاريع المبتكرة التي تم بناؤها بأحدث التقنيات." 
                            : "Explore a collection of innovative projects built with modern technologies."}
                    </p>
                </motion.div>
            </div>

            {/* Grid Section */}
            <div className='max-w-[1400px] mx-auto px-6 pb-20'>
                <motion.div
                    variants={mainVariant}
                    initial="hidden"
                    animate="visible"
                    className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12'
                >
                    {projectsData.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </motion.div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectDetailModal 
                        project={selectedProject} 
                        onClose={() => setSelectedProject(null)} 
                    />
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default Projects



