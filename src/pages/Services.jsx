import React, { useState } from 'react'
import { motion } from "framer-motion"
import servicesData from '../data/services.json'
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom'

const Services = ({ language, languageText }) => {
    const { web, graphic, writing } = servicesData;
    const [hoveredId, setHoveredId] = useState(null);

    const webPackages = web.filter(s => s.features);
    const webStandalone = web.filter(s => !s.features);

    const containerVariant = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.07, duration: 0.4 } },
        exit: { opacity: 0 }
    };
    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
    };

    // ────────────────────────────────────────────────────────────────
    //  PREMIUM PACKAGE CARD  (the 4 web tiers – dark glass, neon border)
    // ────────────────────────────────────────────────────────────────
    const PackageCard = ({ pkg }) => {
        const isPopular = pkg.popular;
        const isHovered = hoveredId === pkg.id;

        const borderColors = {
            'from-purple-600 to-indigo-600': '#7c3aed',
            'from-blue-600 to-cyan-600': '#2563eb',
            'from-teal-500 to-emerald-500': '#10b981',
            'from-orange-500 to-yellow-500': '#f97316',
        };
        const glowColor = borderColors[pkg.color] || '#525ceb';

        return (
            <motion.div
                variants={fadeUp}
                onHoverStart={() => setHoveredId(pkg.id)}
                onHoverEnd={() => setHoveredId(null)}
                className="relative group h-full"
                style={{ perspective: 1000 }}
            >
                {/* Popular badge */}
                {isPopular && (
                    <div className="absolute -top-4 inset-x-0 flex justify-center z-30">
                        <motion.span
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white text-[9px] font-black px-4 py-1 rounded-full uppercase tracking-[0.15em] shadow-lg shadow-emerald-500/30"
                        >
                            ★ {language === 'en' ? 'Most Popular' : 'الأكثر طلباً'}
                        </motion.span>
                    </div>
                )}

                {/* Outer glow ring */}
                <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                    style={{ background: `radial-gradient(ellipse at center, ${glowColor}30, transparent 70%)` }}
                />

                {/* Card shell */}
                <div
                    className="relative h-full rounded-3xl overflow-hidden transition-transform duration-500 group-hover:-translate-y-3"
                    style={{
                        background: 'linear-gradient(135deg, #0d0d1a 0%, #12121f 100%)',
                        border: `1.5px solid ${isHovered ? glowColor + '80' : '#ffffff12'}`,
                        boxShadow: isHovered
                            ? `0 30px 60px -10px ${glowColor}30, inset 0 1px 0 ${glowColor}20`
                            : '0 4px 24px rgba(0,0,0,0.4)',
                        transition: 'border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease'
                    }}
                >
                    {/* Animated background mesh */}
                    <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{
                            backgroundImage: `radial-gradient(circle at 20% 20%, ${glowColor} 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${glowColor} 0%, transparent 50%)`,
                        }}
                    />

                    {/* Top accent line */}
                    <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${pkg.color} opacity-80`} />

                    <div className="relative z-10 p-7 flex flex-col h-full">
                        {/* Icon */}
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${pkg.color} flex items-center justify-center text-white text-xl mb-5 shadow-lg`}
                            style={{ boxShadow: `0 8px 20px ${glowColor}40` }}>
                            <Icon icon={pkg.icon} />
                        </div>

                        {/* Name */}
                        <h3 className="text-lg font-black text-white uppercase tracking-tight mb-2 leading-tight">
                            {language === 'en' ? pkg.name : pkg.arabicName}
                        </h3>

                        {/* Description */}
                        <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider mb-6 leading-relaxed">
                            {language === 'en' ? pkg.description : pkg.arabicDescription}
                        </p>

                        {/* Feature list */}
                        <ul className="space-y-2.5 mb-7 flex-1">
                            {(language === 'en' ? pkg.features : pkg.arabicFeatures)?.map((f, i) => (
                                <li key={i} className="flex items-start gap-2.5 group/item">
                                    <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${pkg.color} flex items-center justify-center flex-shrink-0 mt-0.5`}
                                        style={{ boxShadow: `0 2px 8px ${glowColor}40` }}>
                                        <Icon icon="lucide:check" className="text-white" style={{ fontSize: 9 }} />
                                    </div>
                                    <span className="text-[11px] font-semibold text-gray-400 leading-snug group-hover/item:text-gray-200 transition-colors duration-200">
                                        {f}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {/* Price */}
                        <div className="border-t border-white/5 pt-5 mb-5">
                            <p className="text-gray-600 text-[9px] font-black uppercase tracking-[0.2em] mb-1.5 text-center">
                                {language === 'en' ? 'Starting from' : 'يبدأ من'}
                            </p>
                            <div className="flex items-baseline justify-center gap-1">
                                <span className={`text-3xl font-black bg-gradient-to-r ${pkg.color} bg-clip-text text-transparent`}>
                                    {pkg.price}
                                </span>
                                <span className="text-[10px] text-gray-600 font-bold">USD</span>
                            </div>
                        </div>

                        {/* CTA */}
                        <Link
                            to={`/services/${pkg.id}`}
                            className={`relative block w-full py-3.5 rounded-2xl font-black text-white text-[11px] uppercase tracking-[0.12em] text-center overflow-hidden group/btn transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]`}
                            style={{
                                background: `linear-gradient(135deg, ${glowColor}, ${glowColor}cc)`,
                                boxShadow: isHovered ? `0 12px 30px ${glowColor}50` : `0 4px 15px ${glowColor}30`
                            }}
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {language === 'en' ? 'View Details' : 'عرض التفاصيل'}
                                <Icon icon="lucide:arrow-right" className="text-sm transition-transform duration-300 group-hover/btn:translate-x-1" />
                            </span>
                        </Link>
                    </div>
                </div>
            </motion.div>
        );
    };

    // ────────────────────────────────────────────────────────────────
    //  STANDARD SERVICE CARD  (graphic / writing / extra web services)
    // ────────────────────────────────────────────────────────────────
    const ServiceCard = ({ service, accent = '#525ceb' }) => (
        <motion.div
            variants={fadeUp}
            className="relative group rounded-2xl overflow-hidden transition-all duration-400 hover:-translate-y-1.5 cursor-pointer"
            style={{
                background: 'rgba(255,255,255,0.035)',
                border: '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(12px)',
            }}
        >
            {/* Hover glow */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 30% 30%, ${accent}10, transparent 70%)` }}
            />
            {/* Left accent bar */}
            <div
                className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                style={{ background: `linear-gradient(to bottom, ${accent}, ${accent}50)` }}
            />

            <div className="relative p-5">
                <div className="flex items-start gap-3.5 mb-3.5">
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                        style={{ background: `${accent}15`, color: accent, boxShadow: `0 4px 12px ${accent}20` }}
                    >
                        <Icon icon={service.icon} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-darktheme dark:text-white leading-snug line-clamp-2">
                            {language === 'en' ? service.name : service.arabicName}
                        </h3>
                        <span className="text-xs font-black mt-0.5 inline-block" style={{ color: accent }}>
                            {service.price}
                        </span>
                    </div>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-2">
                    {language === 'en' ? service.description : service.arabicDescription}
                </p>
                <Link
                    to={`/services/${service.id}`}
                    className="flex items-center justify-between w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wide transition-all duration-300 group-hover:pl-5"
                    style={{
                        border: `1px solid ${accent}30`,
                        color: accent,
                        background: `${accent}08`,
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = accent;
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.borderColor = accent;
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = `${accent}08`;
                        e.currentTarget.style.color = accent;
                        e.currentTarget.style.borderColor = `${accent}30`;
                    }}
                >
                    {language === 'en' ? 'View Details' : 'عرض التفاصيل'}
                    <Icon icon="lucide:arrow-right" className="text-sm" />
                </Link>
            </div>
        </motion.div>
    );

    // ────────────────────────────────────────────────────────────────
    //  SECTION HEADER
    // ────────────────────────────────────────────────────────────────
    const SectionLabel = ({ title, color, subtitle }) => (
        <motion.div variants={fadeUp} className="mb-10 md:mb-12">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${color}20` }}>
                    <div className="w-3 h-3 rounded-full" style={{ background: color }} />
                </div>
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight"
                    style={{ color: 'inherit' }}>
                    <span className="text-darktheme dark:text-white">{title}</span>
                </h2>
            </div>
            {subtitle && (
                <p className="text-xs text-gray-400 font-semibold ml-11 uppercase tracking-wider">{subtitle}</p>
            )}
        </motion.div>
    );

    return (
        <motion.div
            variants={containerVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full min-h-screen bg-[#f4f4fa] dark:bg-[#08080f]"
        >
            {/* ── HERO ─────────────────────────────────────────────────── */}
            <div className="relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 pointer-events-none" style={{
                    backgroundImage: `radial-gradient(circle at 20% 50%, rgba(82,92,235,0.08) 0%, transparent 50%),
                                     radial-gradient(circle at 80% 20%, rgba(168,85,247,0.06) 0%, transparent 50%),
                                     radial-gradient(circle at 60% 80%, rgba(20,184,166,0.05) 0%, transparent 50%)`
                }} />
                <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-20"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23525ceb' fill-opacity='0.08'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />
                <div className="max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20 pt-20 pb-24 md:pt-28 md:pb-32">
                    <motion.div variants={fadeUp} className="max-w-3xl">
                        {/* Eyebrow */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-xs font-black uppercase tracking-widest"
                            style={{ background: 'rgba(82,92,235,0.1)', color: '#525ceb', border: '1px solid rgba(82,92,235,0.2)' }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-bluetheme animate-pulse" />
                            {language === 'en' ? 'Available for Hire' : 'متاح للعمل'}
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-darktheme dark:text-white leading-none tracking-tighter mb-5">
                            {language === 'en' ? (
                                <>Premium <span className="text-gradient">Digital</span> Services</>
                            ) : (
                                <>{languageText.AllServices}</>
                            )}
                        </h1>
                        <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed font-medium">
                            {language === 'en'
                                ? 'World-class web development, design, and content services. Built to impress, crafted to convert.'
                                : 'خدمات تطوير ويب وتصميم ومحتوى على مستوى عالمي. مبنية لتثير الإعجاب، ومصممة للتحويل.'}
                        </p>

                        {/* Stats strip */}
                        <div className="flex flex-wrap gap-8 mt-10">
                            {[
                                { num: '30+', label: language === 'en' ? 'Projects Done' : 'مشروع مكتمل' },
                                { num: '4.9★', label: language === 'en' ? 'Client Rating' : 'تقييم العملاء' },
                                { num: '24h', label: language === 'en' ? 'Response Time' : 'وقت الاستجابة' },
                            ].map((s, i) => (
                                <div key={i}>
                                    <div className="text-2xl font-black text-gradient">{s.num}</div>
                                    <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ── MAIN CONTENT ──────────────────────────────────────────── */}
            <div className="max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20 pb-20 md:pb-32">

                {/* ── WEB PACKAGES ───────────────────────────────────────── */}
                <div className="mb-20 md:mb-28">
                    <SectionLabel
                        title={languageText.WebBased}
                        color="#525ceb"
                        subtitle={language === 'en' ? 'Choose the perfect plan for your project' : 'اختر الباقة المثالية لمشروعك'}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6">
                        {webPackages.map(pkg => <PackageCard key={pkg.id} pkg={pkg} />)}
                    </div>

                    {/* "Check our web projects" CTA strip */}
                    <motion.div variants={fadeUp} className="mt-8">
                        <Link to="/projects"
                            className="group flex items-center justify-between w-full px-7 py-4 rounded-2xl transition-all duration-300 hover:scale-[1.01]"
                            style={{
                                background: 'linear-gradient(135deg, rgba(82,92,235,0.08), rgba(168,85,247,0.06))',
                                border: '1px solid rgba(82,92,235,0.2)',
                            }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(82,92,235,0.45)'}
                            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(82,92,235,0.2)'}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                                    style={{ background: 'rgba(82,92,235,0.15)', color: '#525ceb' }}>
                                    <Icon icon="lucide:folder-open" className="text-base" />
                                </div>
                                <div>
                                    <p className="text-xs font-black text-darktheme dark:text-white uppercase tracking-wide">
                                        {language === 'en' ? 'See real projects built with these services' : 'شاهد مشاريع حقيقية تم بناؤها بهذه الخدمات'}
                                    </p>
                                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest mt-0.5">
                                        {language === 'en' ? 'Browse portfolio → Full Stack · Front-End · Design' : 'استعرض المحفظة ← Full Stack · Front-End · Design'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-black text-bluetheme uppercase tracking-wide whitespace-nowrap group-hover:gap-3 transition-all duration-300">
                                {language === 'en' ? 'View Projects' : 'عرض المشاريع'}
                                <Icon icon="lucide:arrow-right" className="text-sm" />
                            </div>
                        </Link>
                    </motion.div>

                    {/* Extra web services as a compact row */}
                    {webStandalone.length > 0 && (
                        <div className="mt-8">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-5 flex items-center gap-2">
                                <span className="w-4 h-px bg-gray-500" />
                                {language === 'en' ? 'Also Available' : 'متاح أيضاً'}
                                <span className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {webStandalone.map(s => <ServiceCard key={s.id} service={s} accent="#525ceb" />)}
                            </div>
                        </div>
                    )}
                </div>

                {/* ── GRAPHIC + CONTENT GRID ─────────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 mb-20 md:mb-28">
                    <div>
                        <SectionLabel title={languageText.GraphicBased} color="#a855f7" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {graphic.map(s => <ServiceCard key={s.id} service={s} accent="#a855f7" />)}
                        </div>
                    </div>
                    <div>
                        <SectionLabel title={languageText.ContentBased} color="#f97316" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {writing.map(s => <ServiceCard key={s.id} service={s} accent="#f97316" />)}
                        </div>
                    </div>
                </div>

                {/* ── BOTTOM CTA BANNER ──────────────────────────────────── */}
                <motion.div
                    variants={fadeUp}
                    className="relative rounded-3xl overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, #0d0d20 0%, #12102a 100%)',
                        border: '1px solid rgba(82,92,235,0.2)',
                        boxShadow: '0 30px 80px rgba(82,92,235,0.15)'
                    }}
                >
                    {/* Background orbs */}
                    <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full opacity-20 blur-3xl"
                        style={{ background: 'radial-gradient(circle, #525ceb, transparent)' }} />
                    <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full opacity-15 blur-3xl"
                        style={{ background: 'radial-gradient(circle, #a855f7, transparent)' }} />
                    <div className="absolute inset-0 opacity-5"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='20' cy='20' r='0.5'/%3E%3C/g%3E%3C/svg%3E")` }} />

                    <div className="relative z-10 py-14 px-8 md:py-20 md:px-16 text-center">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                            {language === 'en' ? (
                                <>Have a <span className="text-gradient">custom project</span> in mind?</>
                            ) : 'هل لديك مشروع مخصص في ذهنك؟'}
                        </h2>
                        <p className="text-gray-400 text-base md:text-lg mb-10 max-w-xl mx-auto font-medium leading-relaxed">
                            {language === 'en'
                                ? "Let's talk. I'll help you bring your vision to life with precision and style."
                                : 'لنتحدث. سأساعدك في إحياء رؤيتك بدقة وأسلوب.'}
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <Link
                                to="/about"
                                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-wide text-white transition-all duration-300 hover:scale-105 active:scale-95"
                                style={{
                                    background: 'linear-gradient(135deg, #525ceb, #a855f7)',
                                    boxShadow: '0 12px 40px rgba(82,92,235,0.4)'
                                }}
                            >
                                <Icon icon="ic:baseline-whatsapp" className="text-xl" />
                                {languageText.ContactMe}
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Services;
