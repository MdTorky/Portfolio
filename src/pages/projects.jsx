import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import projectsData from '../data/projects.json'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'

// Extracted item fade-up variants for clean grid stagger
const itemVariant = {
    hidden: { y: 30, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
}

// 1. EXTRACTED PROJECT CARD COMPONENT (STABLE ASPECT-RATIO & UNIQUE GRAPHIC STACK)
const ProjectCard = ({ project, language, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const scrollRef = useRef(null);

    const isExternalDemo = project.liveDemo && project.liveDemo.startsWith('http');
    const isGraphicDesign = project.technology === "Graphic Design" || project.id === 9;

    useEffect(() => {
        let interval;
        if (isHovered && scrollRef.current && !isExternalDemo && !isGraphicDesign) {
            const container = scrollRef.current;
            const scrollSpeed = 0.6; // slow premium scroll speed
            interval = setInterval(() => {
                if (container.scrollTop + container.clientHeight >= container.scrollHeight - 1) {
                    clearInterval(interval);
                } else {
                    container.scrollTop += scrollSpeed;
                }
            }, 16);
        } else if (!isHovered && scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
        return () => clearInterval(interval);
    }, [isHovered, isExternalDemo, isGraphicDesign]);

    return (
        <motion.div
            variants={itemVariant}
            whileHover={{ y: -8 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setIframeLoaded(false);
            }}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => {
                // Keep hover state for a moment on mobile to show off the visual
                setTimeout(() => setIsHovered(false), 2000);
            }}
            onClick={onClick}
            className={`group relative flex flex-col overflow-hidden rounded-3xl glass-morphism cursor-pointer w-full bg-white/5 border transition-shadow duration-300 ${isGraphicDesign && isHovered
                ? 'border-purple-500/50 shadow-lg shadow-purple-500/20'
                : 'border-white/10 hover:border-bluetheme/30'
                }`}
        >
            {/* Stable Aspect Ratio Showcase Container (aspect-[16/10] = height stays perfectly locked at ~220px to prevent layout shift) */}
            <div className="relative w-full aspect-[16/10] overflow-hidden select-none bg-[#07070f] border-b border-white/5">
                {isGraphicDesign ? (
                    /* 🎨 UNIQUE CREATIVE ART CANVAS STACK MOCKUP */
                    <div className="relative w-full h-full flex items-center justify-center p-4">
                        {/* Tilted Graphic Layer Left */}
                        <motion.div
                            animate={{
                                rotate: isHovered ? -14 : -5,
                                x: isHovered ? -45 : -8,
                                scale: isHovered ? 0.85 : 0.9
                            }}
                            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                            className="absolute w-[50%] h-[75%] rounded-xl border border-white/10 bg-slate-800 shadow-xl overflow-hidden pointer-events-none opacity-50 z-0"
                        >
                            <img src={project.image} alt="art-back-left" className="w-full h-full object-cover filter brightness-50 saturate-50 blur-[0.5px]" />
                        </motion.div>

                        {/* Tilted Graphic Layer Right */}
                        <motion.div
                            animate={{
                                rotate: isHovered ? 14 : 5,
                                x: isHovered ? 45 : 8,
                                scale: isHovered ? 0.85 : 0.9
                            }}
                            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                            className="absolute w-[50%] h-[75%] rounded-xl border border-white/10 bg-slate-800 shadow-xl overflow-hidden pointer-events-none opacity-50 z-0"
                        >
                            <img src={project.image} alt="art-back-right" className="w-full h-full object-cover filter brightness-50 saturate-50 blur-[0.5px]" />
                        </motion.div>

                        {/* Floating Center Art Canvas */}
                        <motion.div
                            animate={{
                                scale: isHovered ? 1.06 : 0.95,
                                rotate: isHovered ? 0 : -2,
                                y: isHovered ? -6 : 0
                            }}
                            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                            className="relative w-[55%] h-[80%] rounded-xl border border-white/20 shadow-2xl overflow-hidden bg-slate-900 z-10"
                        >
                            <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            {/* Exhibition Badge */}
                            <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[8px] font-black uppercase tracking-widest flex items-center gap-1 shadow-lg">
                                <span className="w-1 h-1 rounded-full bg-white animate-ping" />
                                {language === 'ar' ? 'معرض تصاميم' : 'Art Gallery'}
                            </span>
                        </motion.div>

                        {/* Glow Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-pink-500/10 pointer-events-none" />
                    </div>
                ) : isHovered && isExternalDemo ? (
                    /* 💻 STANDARD INTERACTIVE WEB PREVIEW FRAME */
                    <div className="w-full h-full flex flex-col bg-[#0b0b1a]">
                        {/* Browser Mockup Header Bar */}
                        <div className="w-full bg-black/50 border-b border-white/5 px-4 py-1.5 flex items-center gap-2">
                            <div className="flex gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                                <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                                <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-md text-[9px] text-gray-400 px-3 py-0.5 flex-grow mx-4 text-center truncate font-mono">
                                {project.liveDemo.replace('https://', '').replace('/', '')}
                            </div>
                            <Icon icon="lucide:rotate-cw" className="text-gray-400 text-[10px]" />
                        </div>

                        {/* Live Website Frame (Click disabled so card clicks still register) */}
                        <div className="relative flex-grow w-full bg-white h-[calc(100%-24px)]">
                            {!iframeLoaded && (
                                <div className="absolute inset-0 bg-[#0b0b1a] flex items-center justify-center">
                                    <div className="flex flex-col items-center gap-1.5">
                                        <span className="w-6 h-6 rounded-full border-2 border-bluetheme border-t-transparent animate-spin" />
                                        <span className="text-[8px] text-gray-400 uppercase tracking-widest font-black">
                                            {language === 'ar' ? 'جاري التحميل...' : 'LOADING LIVE SITE...'}
                                        </span>
                                    </div>
                                </div>
                            )}
                            <iframe
                                src={project.liveDemo}
                                title={project.name}
                                onLoad={() => setIframeLoaded(true)}
                                className="w-full h-full border-none pointer-events-none select-none"
                            />
                        </div>
                    </div>
                ) : (
                    /* 🖼️ STATIC COVER IMAGE STATE (Saves bandwidth & is perfectly responsive) */
                    <div ref={scrollRef} className="w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar">
                        <img
                            src={project.image}
                            alt={project.name}
                            className={`w-full ${isHovered ? 'h-auto object-top' : 'h-full object-cover object-top'} transition-all duration-500`}
                        />
                        {!isHovered && (
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                        )}

                        {/* Scroll indicator overlay for standard scrollable images */}
                        <AnimatePresence>
                            {isHovered && !isExternalDemo && !isGraphicDesign && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className='absolute bottom-3 right-3 z-10 px-2.5 py-1 rounded-full bg-bluetheme/90 text-white text-[9px] font-black uppercase tracking-wider flex items-center gap-1 shadow-lg pointer-events-none'
                                >
                                    <span className="w-1 h-1 rounded-full bg-white animate-ping" />
                                    {language === 'ar' ? 'تصفح بالنزول' : 'Scroll down'}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* Core Card Content */}
            <div className="p-5 flex flex-col flex-grow bg-theme dark:bg-darktheme transition-colors duration-300 relative z-10 text-start">
                <div className="flex items-center justify-between mb-2">
                    <span className={`px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-full ${isGraphicDesign
                        ? 'text-purple-400 bg-purple-500/10 border border-purple-500/20'
                        : 'text-bluetheme bg-bluetheme/10 border border-bluetheme/20'
                        }`}>
                        {project.technology}
                    </span>
                </div>
                <h3 className="text-lg font-black mb-2 text-darktheme dark:text-theme group-hover:text-bluetheme transition-colors leading-tight">
                    {language === "ar" ? project.arabicName : project.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-3 mb-4 leading-relaxed font-light">
                    {language === "ar" ? project.arabicDescription : project.description}
                </p>

                {/* Micro Actions Row */}
                <div className="mt-auto flex items-center gap-4 text-darktheme dark:text-theme pt-3 border-t border-black/5 dark:border-white/5">
                    {project.liveDemo && (
                        <Link
                            to={project.liveDemo}
                            onClick={(e) => e.stopPropagation()}
                            className="hover:text-bluetheme transition-colors flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest"
                            target="_blank"
                        >
                            <Icon icon={isGraphicDesign ? "lucide:palette" : "carbon:demo"} className="text-sm text-bluetheme" />
                            {isGraphicDesign ? (language === 'ar' ? 'المعرض' : 'Gallery') : 'Demo'}
                        </Link>
                    )}
                    {project.github && (
                        <Link
                            to={project.github}
                            onClick={(e) => e.stopPropagation()}
                            className="hover:text-bluetheme transition-colors flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest"
                            target="_blank"
                        >
                            <Icon icon="jam:github" className="text-sm" />
                            Code
                        </Link>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

// 2. REDESIGNED ULTRA-PREMIUM DETAIL MODAL COMPONENT (INTERACTIVE DEVICE SIMULATOR & SIDEBAR)
const ProjectDetailModal = ({ project, onClose, language, languageText }) => {
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const [device, setDevice] = useState('desktop'); // 'desktop', 'tablet', 'mobile'

    if (!project) return null;

    const isExternalDemo = project.liveDemo && project.liveDemo.startsWith('http');
    const isGraphicDesign = project.technology === "Graphic Design" || project.id === 9;

    // Parse technology tags into individual badging
    const techTags = project.technology
        ? project.technology.split(/&|,|STACK/).map(t => t.trim()).filter(Boolean)
        : [];

    // Parse features from bullet points in descriptions
    const descText = language === "ar" ? project.arabicDescription : project.description;
    const features = descText
        ? descText.split('\n').map(item => item.replace(/^[•\-\*]\s*/, '').trim()).filter(Boolean)
        : [];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 25 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 25 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-6xl h-[90vh] md:h-[82vh] overflow-hidden glass-morphism rounded-3xl premium-shadow flex flex-col border border-white/10"
            >
                {/* Modal Window Header Bar */}
                <div className="w-full bg-[#0a0a15]/90 border-b border-white/10 px-6 py-4 flex items-center justify-between z-20">
                    <div className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full bg-[#ff5f56] cursor-pointer hover:scale-115 transition-transform" onClick={onClose} />
                        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                        <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                        <span className="text-[10px] text-gray-400 font-mono ml-4 hidden md:inline-block bg-white/5 px-3 py-1 rounded-full border border-white/5 tracking-wider">
                            {isExternalDemo ? project.liveDemo : isGraphicDesign ? 'portfolio://creative/gallery' : 'local://system/static'}
                        </span>
                    </div>

                    {/* DEVICE TOGGLE BAR (Only show if external live site iframe is available) */}
                    {isExternalDemo && !isGraphicDesign && (
                        <div className="flex bg-white/5 border border-white/10 rounded-2xl p-1 items-center gap-1 text-[11px] font-bold">
                            <button
                                onClick={() => { setDevice('desktop'); setIframeLoaded(false); }}
                                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${device === 'desktop' ? 'bg-bluetheme text-white shadow' : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <Icon icon="lucide:monitor" className="text-xs" />
                                <span className="hidden sm:inline">Desktop</span>
                            </button>
                            <button
                                onClick={() => { setDevice('tablet'); setIframeLoaded(false); }}
                                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${device === 'tablet' ? 'bg-bluetheme text-white shadow' : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <Icon icon="lucide:tablet" className="text-xs" />
                                <span className="hidden sm:inline">Tablet</span>
                            </button>
                            <button
                                onClick={() => { setDevice('mobile'); setIframeLoaded(false); }}
                                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${device === 'mobile' ? 'bg-bluetheme text-white shadow' : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <Icon icon="lucide:smartphone" className="text-xs" />
                                <span className="hidden sm:inline">Mobile</span>
                            </button>
                        </div>
                    )}

                    <button
                        onClick={onClose}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-white transition-all border border-white/10 hover:scale-105 active:scale-95"
                    >
                        <Icon icon="mdi:close" className="text-lg" />
                    </button>
                </div>

                {/* Modal Split View */}
                <div className="flex flex-col md:flex-row flex-grow overflow-hidden h-full">

                    {/* LEFT COLUMN: INTERACTIVE DEVICE SIMULATOR CANVAS */}
                    <div className="md:w-[58%] bg-[#08080f] relative h-[40vh] md:h-full flex items-center justify-center p-4 md:p-8 border-r border-white/10 overflow-hidden">

                        {isGraphicDesign ? (
                            /* 🎨 CREATIVE GALLERY CALLOUT & ART COLLAGE */
                            <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
                                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 via-transparent to-pink-900/10 pointer-events-none" />
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="relative w-full max-w-sm aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group bg-slate-950 mb-6"
                                >
                                    <img
                                        src={project.image}
                                        alt={project.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                                    <div className="absolute bottom-5 inset-x-5 flex flex-col items-center">
                                        <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-xl text-purple-400 mb-2">
                                            <Icon icon="lucide:palette" />
                                        </div>
                                        <h4 className="text-white text-base font-black tracking-wide uppercase">
                                            {language === 'ar' ? 'عرض أعمال التصميم الجرافيكي' : 'Graphic Arts Portfolio'}
                                        </h4>
                                    </div>
                                </motion.div>

                                <Link
                                    to="/gallery"
                                    onClick={onClose}
                                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-[1.03] active:scale-[0.97] transition-all shadow-xl shadow-purple-500/20"
                                >
                                    <Icon icon="lucide:gallery-horizontal" className="text-sm" />
                                    {language === 'ar' ? 'دخول المعرض الإبداعي' : 'Open Design Gallery'}
                                </Link>
                            </div>
                        ) : isExternalDemo ? (
                            /* 🖥️ SPRING RESIZING LIVE DEVICE SIMULATOR */
                            <div className="w-full h-full flex items-center justify-center relative">
                                <motion.div
                                    animate={{
                                        width: device === 'desktop' ? '100%' : device === 'tablet' ? '70%' : '320px',
                                        height: device === 'desktop' ? '100%' : device === 'tablet' ? '82%' : '90%',
                                        borderRadius: device === 'desktop' ? '0px' : '24px'
                                    }}
                                    transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                                    className={`relative bg-white overflow-hidden shadow-2xl flex flex-col ${device !== 'desktop'
                                        ? 'border-[10px] border-slate-900 shadow-slate-950/80'
                                        : 'border-none'
                                        }`}
                                >
                                    {/* Mobile/Tablet Notch Indicator */}
                                    {device === 'mobile' && (
                                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-900 rounded-full z-30 flex items-center justify-center">
                                            <span className="w-8 h-1 bg-slate-800 rounded-full" />
                                        </div>
                                    )}

                                    {/* Loading State Spinner */}
                                    {!iframeLoaded && (
                                        <div className="absolute inset-0 bg-[#07070f] flex items-center justify-center z-10">
                                            <div className="flex flex-col items-center gap-3">
                                                <span className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
                                                <span className="text-[9px] text-gray-400 uppercase tracking-widest font-black animate-pulse">
                                                    {language === 'ar' ? 'تحميل المحاكي...' : 'Powering Simulator...'}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    <iframe
                                        src={project.liveDemo}
                                        title={project.name}
                                        onLoad={() => setIframeLoaded(true)}
                                        className={`w-full h-full border-none bg-white ${device === 'mobile' ? 'pt-6' : ''}`}
                                    />

                                    {/* Mobile home handle bar indicator */}
                                    {device === 'mobile' && (
                                        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-slate-900 rounded-full z-30" />
                                    )}
                                </motion.div>
                            </div>
                        ) : (
                            /* 🖼️ STATIC AUTO-SCROLLING FALLBACK MOCKUP */
                            <div className="w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar bg-slate-950 relative rounded-2xl border border-white/5 select-none">
                                <img
                                    src={project.image}
                                    alt={project.name}
                                    className="w-full h-auto object-top"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

                                <div className="absolute bottom-5 right-5 z-20 px-3 py-1.5 rounded-full bg-bluetheme/90 text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                                    {language === 'ar' ? 'تصفح للأسفل لرؤية المزيد' : 'Scroll to see more'}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN: HIGH-CONTRAST NEON GRADIENT GLOW SIDEBAR */}
                    <div className="md:w-[42%] p-6 md:p-8 flex flex-col bg-theme dark:bg-darktheme overflow-y-auto h-full custom-scrollbar text-start relative">

                        {/* Dynamic category badge */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {techTags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="px-2.5 py-0.5 text-[9px] font-black text-bluetheme bg-bluetheme/10 border border-bluetheme/20 rounded-full uppercase tracking-wider shadow-sm"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Glowing gradient heading */}
                        <h2 className="text-2xl md:text-3xl font-black mb-4 text-darktheme dark:text-theme tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-bluetheme to-purple-500">
                            {language === "ar" ? project.arabicName : project.name}
                        </h2>

                        {/* Description Box */}
                        <div className="p-4 rounded-2xl glass-morphism bg-white/5 border border-white/5 mb-6 text-slate-600 dark:text-slate-400 text-xs font-light leading-relaxed">
                            {language === "ar" ? "تفاصيل البناء البرمجي ومقاييس النظام والأدوار الوظيفية المستهدفة." : "Architecture highlights, system metrics, and domain-targeted solutions."}
                        </div>

                        {/* Key Highlights list */}
                        <div className="flex-grow mb-8">
                            <h4 className="text-[10px] font-black uppercase text-gray-400 dark:text-gray-500 tracking-widest mb-4 flex items-center gap-2">
                                <Icon icon="lucide:rocket" className="text-bluetheme text-xs" />
                                {language === "ar" ? "تفاصيل المشروع" : "Project Highlights"}
                            </h4>

                            {features.length > 0 ? (
                                <ul className="space-y-4">
                                    {features.map((feature, index) => (
                                        <motion.li
                                            initial={{ opacity: 0, x: -15 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            key={index}
                                            className="flex items-start gap-3.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-light"
                                        >
                                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-bluetheme/10 border border-bluetheme/20 flex items-center justify-center mt-0.5 shadow-sm">
                                                <Icon icon="lucide:check" className="text-bluetheme text-xs font-black" />
                                            </span>
                                            <span>{feature}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                                    {descText}
                                </p>
                            )}
                        </div>

                        {/* Call to action panel */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-200 dark:border-white/10 mt-auto bg-transparent">
                            {project.liveDemo && (
                                <a
                                    href={project.liveDemo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-grow px-5 py-3.5 bg-gradient-to-r from-bluetheme to-purple-600 hover:from-bluetheme hover:to-purple-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center justify-center gap-2 shadow-lg shadow-bluetheme/30"
                                >
                                    <Icon icon={isGraphicDesign ? "lucide:palette" : "carbon:demo"} className="text-base" />
                                    {isGraphicDesign
                                        ? (language === "ar" ? "استعراض المعرض" : "Explore Designs")
                                        : (language === "ar" ? "زيارة الموقع" : "Launch Website")
                                    }
                                </a>
                            )}
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-5 py-3.5 border border-darktheme/30 dark:border-white/10 text-darktheme dark:text-theme rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-darktheme hover:text-theme dark:hover:bg-white dark:hover:text-darktheme hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center justify-center gap-2"
                                >
                                    <Icon icon="jam:github" className="text-base" />
                                    {language === "ar" ? "كود المصدر" : "Source Code"}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// 3. MAIN PROJECTS PAGE COMPONENT
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
                        <ProjectCard
                            key={project.id}
                            project={project}
                            language={language}
                            onClick={() => setSelectedProject(project)}
                        />
                    ))}
                </motion.div>
            </div>

            {/* Premium Detail Modal Overlay */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectDetailModal
                        project={selectedProject}
                        language={language}
                        languageText={languageText}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default Projects
export { ProjectCard, ProjectDetailModal }
