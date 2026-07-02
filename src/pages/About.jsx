import React, { useState } from 'react'
import fullImage from '../img/Torky.png'
import { motion, AnimatePresence } from "framer-motion"
import { Icon } from '@iconify/react'
import timelineData from '../data/timeLineData.json'
import { Link } from 'react-router-dom'

const About = ({ language, languageText }) => {

    const [activeEvent, setActiveEvent] = useState(null);

    const pageVariant = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.08 } },
        exit: { opacity: 0, transition: { duration: 0.2 } }
    };
    const fadeUp = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
    };

    const contacts = [
        {
            icon: 'mdi:email',
            label: language === 'en' ? 'Email' : 'البريد',
            value: 'mohamed2003torky@gmail.com',
            href: 'mailto:mohamed2003torky@gmail.com',
            color: '#ea4335'
        },
        {
            icon: 'ic:baseline-whatsapp',
            label: language === 'en' ? 'WhatsApp' : 'واتساب',
            value: '+20 155 420 6775',
            href: 'http://wa.me/201554206775',
            color: '#25d366'
        },
        {
            icon: 'mdi:linkedin',
            label: 'LinkedIn',
            value: 'Mohamed Torky',
            href: 'https://www.linkedin.com/in/mohamed-torky-243196221/',
            color: '#0a66c2'
        },
    ];

    const stats = [
        { num: '3.79', sub: language === 'en' ? 'GPA · BSc CS' : 'معدل تراكمي', icon: 'lucide:graduation-cap' },
        { num: '3.82', sub: language === 'en' ? 'GPA · MSc DS' : 'معدل دراسات عليا', icon: 'lucide:brain' },
        { num: '10+', sub: language === 'en' ? 'Projects Built' : 'مشروع مكتمل', icon: 'lucide:folder-code' },
        { num: '1st', sub: language === 'en' ? 'Microsoft Hackathon' : 'هاكاثون مايكروسوفت', icon: 'lucide:trophy' },
    ];

    return (
        <motion.div
            variants={pageVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full min-h-screen bg-[#f4f4fa] dark:bg-[#08080f]"
        >
            {/* ── HERO ─────────────────────────────────────────────────── */}
            <div className="relative overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, #0a0a18 0%, #0e0e22 60%, #121220 100%)',
                    minHeight: 520
                }}>
                {/* Orbs */}
                <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-15 blur-[120px] pointer-events-none"
                    style={{ background: 'radial-gradient(circle, #525ceb, transparent)' }} />
                <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full opacity-10 blur-[120px] pointer-events-none"
                    style={{ background: 'radial-gradient(circle, #a855f7, transparent)' }} />
                {/* Dot grid */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Ccircle cx='30' cy='30' r='0.8'/%3E%3C/g%3E%3C/svg%3E")` }} />

                <div className="max-w-6xl mx-auto px-4 md:px-10 lg:px-20 py-16 md:py-24 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

                        {/* Photo */}
                        <motion.div variants={fadeUp} className="flex-shrink-0">
                            <div className="relative w-52 h-52 md:w-64 md:h-64">
                                {/* Animated ring */}
                                <div className="absolute inset-0 rounded-3xl"
                                    style={{
                                        background: 'linear-gradient(135deg, #525ceb, #a855f7, #10b981)',
                                        padding: 3,
                                        borderRadius: 28,
                                    }}>
                                    <div className="w-full h-full rounded-[22px] overflow-hidden bg-gray-900">
                                        <img src={fullImage} alt="Mohamed Torky"
                                            className="w-full h-full object-cover object-top mix-blend-luminosity opacity-90 hover:opacity-100 hover:mix-blend-normal transition-all duration-500" />
                                    </div>
                                </div>
                                {/* Status badge */}
                                <div className="absolute -bottom-3 -right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white"
                                    style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)', boxShadow: '0 8px 20px rgba(16,185,129,0.4)' }}>
                                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                    {language === 'en' ? 'Available' : 'متاح'}
                                </div>
                            </div>
                        </motion.div>

                        {/* Text */}
                        <div className="flex-1 text-center lg:text-left">
                            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-5"
                                style={{ background: 'rgba(82,92,235,0.15)', color: '#525ceb', border: '1px solid rgba(82,92,235,0.3)' }}>
                                <Icon icon="lucide:user" />
                                {language === 'en' ? 'About Me' : 'من أنا'}
                            </motion.div>

                            <motion.h1 variants={fadeUp}
                                className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-4">
                                Mohamed <span className="text-gradient">Torky</span>
                            </motion.h1>

                            <motion.p variants={fadeUp}
                                className="text-base md:text-lg text-gray-400 leading-relaxed mb-6 max-w-xl mx-auto lg:mx-0 font-medium">
                                {language === 'en'
                                    ? "Full-Stack Developer & Data Scientist based in Egypt. I craft high-performance web applications, beautiful user interfaces, and AI-powered solutions. Recently I finished my Master's in Data Science at UTM."
                                    : 'مطور ويب متكامل وعالم بيانات من مصر. أبني تطبيقات ويب عالية الأداء، وواجهات مستخدم جميلة، وحلولاً مدعومة بالذكاء الاصطناعي. مؤخرًا انتهيت من دراسة الماجستير في علم البيانات في جامعة UTM.'}
                            </motion.p>

                            {/* Contact links */}
                            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
                                {contacts.map((c, i) => (
                                    <Link key={i} to={c.href} target="_blank"
                                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide text-white transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
                                        style={{
                                            background: `${c.color}20`,
                                            border: `1px solid ${c.color}30`,
                                            color: c.color
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.background = c.color; e.currentTarget.style.color = 'white'; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = `${c.color}20`; e.currentTarget.style.color = c.color; }}
                                    >
                                        <Icon icon={c.icon} className="text-base" />
                                        {c.label}
                                    </Link>
                                ))}
                            </motion.div>

                            {/* CTA buttons */}
                            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center lg:justify-start">
                                <Link to="/services"
                                    className="flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-wide text-white transition-all duration-300 hover:scale-105 active:scale-95"
                                    style={{ background: 'linear-gradient(135deg, #525ceb, #a855f7)', boxShadow: '0 12px 40px rgba(82,92,235,0.35)' }}>
                                    <Icon icon="lucide:briefcase" />
                                    {language === 'en' ? 'Hire Me' : 'وظفني'}
                                </Link>
                                <Link to="/projects"
                                    className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm uppercase tracking-wide text-white transition-all duration-300 hover:scale-105 active:scale-95"
                                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                                >
                                    <Icon icon="lucide:folder-open" />
                                    {language === 'en' ? 'View Work' : 'عرض الأعمال'}
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── STATS STRIP ──────────────────────────────────────────── */}
            <div className="border-b border-gray-100 dark:border-white/5"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="max-w-6xl mx-auto px-4 md:px-10 lg:px-20">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100 dark:divide-white/5">
                        {stats.map((s, i) => (
                            <motion.div key={i} variants={fadeUp}
                                className="flex flex-col items-center py-8 px-4 text-center">
                                <div className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center"
                                    style={{ background: 'rgba(82,92,235,0.1)', color: '#525ceb' }}>
                                    <Icon icon={s.icon} className="text-lg" />
                                </div>
                                <div className="text-2xl md:text-3xl font-black text-gradient mb-1">{s.num}</div>
                                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-snug">{s.sub}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── TIMELINE ─────────────────────────────────────────────── */}
            <div className="max-w-6xl mx-auto px-4 md:px-10 lg:px-20 py-16 md:py-24">
                <motion.div variants={fadeUp} className="mb-12 md:mb-16">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                            style={{ background: 'rgba(82,92,235,0.1)', color: '#525ceb' }}>
                            <Icon icon="lucide:milestone" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-darktheme dark:text-white uppercase tracking-tight">
                            {language === 'en' ? 'My Journey' : 'رحلتي'}
                        </h2>
                    </div>
                    <p className="text-sm text-gray-400 font-semibold ml-11 uppercase tracking-wider">
                        {language === 'en' ? 'Key milestones that shaped who I am' : 'المحطات الرئيسية التي شكّلت شخصيتي'}
                    </p>
                </motion.div>

                {/* Timeline Grid */}
                <div className="relative">
                    {/* Center line on desktop */}
                    <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2"
                        style={{ background: 'linear-gradient(to bottom, #525ceb, #a855f7, #10b981)' }} />

                    <div className="space-y-8 lg:space-y-0">
                        {timelineData.map((item, index) => {
                            const isLeft = index % 2 === 0;
                            const isActive = activeEvent === index;
                            return (
                                <motion.div
                                    key={index}
                                    variants={fadeUp}
                                    className={`lg:grid lg:grid-cols-2 lg:gap-10 items-center mb-8`}
                                >
                                    {/* Card */}
                                    <div className={`${isLeft ? 'lg:col-start-1' : 'lg:col-start-2'} relative`}>
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            onClick={() => setActiveEvent(isActive ? null : index)}
                                            className="relative p-6 rounded-3xl cursor-pointer transition-all duration-300"
                                            style={{
                                                background: isActive
                                                    ? 'linear-gradient(135deg, rgba(82,92,235,0.15), rgba(168,85,247,0.1))'
                                                    : 'rgba(255,255,255,0.03)',
                                                border: isActive
                                                    ? '1px solid rgba(82,92,235,0.4)'
                                                    : '1px solid rgba(255,255,255,0.06)',
                                                boxShadow: isActive ? '0 20px 60px rgba(82,92,235,0.15)' : 'none'
                                            }}
                                        >
                                            {/* Connector dot to center line */}
                                            <div className={`hidden lg:block absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white z-20
                                                ${isLeft ? '-right-[calc(2.5rem+2px)]' : '-left-[calc(2.5rem+2px)]'}`}
                                                style={{ background: 'linear-gradient(135deg, #525ceb, #a855f7)' }} />

                                            <div className="flex items-start gap-4">
                                                <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 text-white text-xl"
                                                    style={{ background: 'linear-gradient(135deg, #525ceb, #a855f7)', boxShadow: '0 8px 20px rgba(82,92,235,0.3)' }}>
                                                    <Icon icon={item.icon} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between gap-2 mb-1">
                                                        <span className="text-[10px] font-black text-gradient uppercase tracking-widest">
                                                            {language === 'en' ? item.date : item.arabicDate}
                                                        </span>
                                                        <Icon icon={isActive ? 'lucide:chevron-up' : 'lucide:chevron-down'}
                                                            className="text-gray-500 text-sm flex-shrink-0" />
                                                    </div>
                                                    <h3 className="text-base font-black text-darktheme dark:text-white leading-tight">
                                                        {language === 'en' ? item.title : item.arabicTitle}
                                                    </h3>
                                                    <AnimatePresence>
                                                        {isActive && (
                                                            <motion.p
                                                                initial={{ opacity: 0, height: 0 }}
                                                                animate={{ opacity: 1, height: 'auto' }}
                                                                exit={{ opacity: 0, height: 0 }}
                                                                className="text-sm text-gray-400 leading-relaxed mt-3 overflow-hidden"
                                                            >
                                                                {language === 'en' ? item.description : item.arabicDescription}
                                                            </motion.p>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Empty col for alternating layout */}
                                    {!isLeft && <div className="hidden lg:block lg:col-start-1 lg:row-start-auto" />}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ── CONTACT BOTTOM CTA ────────────────────────────────────── */}
            <div className="max-w-6xl mx-auto px-4 md:px-10 lg:px-20 pb-20 md:pb-28">
                <motion.div
                    variants={fadeUp}
                    className="relative rounded-3xl overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, #0d0d20, #12102a)',
                        border: '1px solid rgba(82,92,235,0.2)',
                        boxShadow: '0 30px 80px rgba(82,92,235,0.1)'
                    }}
                >
                    <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
                        style={{ background: 'radial-gradient(circle, #525ceb, transparent)' }} />
                    <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full opacity-15 blur-3xl pointer-events-none"
                        style={{ background: 'radial-gradient(circle, #10b981, transparent)' }} />

                    <div className="relative z-10 py-14 px-8 md:py-20 md:px-16">
                        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
                            {/* Text */}
                            <div className="flex-1 text-center md:text-left">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-3"
                                    style={{ color: '#525ceb' }}>
                                    {language === 'en' ? 'Get in Touch' : 'تواصل معي'}
                                </p>
                                <h2 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
                                    {language === 'en' ? (
                                        <>Let's build something <span className="text-gradient">amazing</span> together</>
                                    ) : 'دعنا نبني شيئاً مذهلاً معاً'}
                                </h2>
                                <p className="text-gray-400 text-sm md:text-base font-medium leading-relaxed max-w-md">
                                    {language === 'en'
                                        ? "Whether it's a website, a design, or a data project — I'm here to help you succeed."
                                        : 'سواء كان موقعًا إلكترونيًا أو تصميمًا أو مشروع بيانات — أنا هنا لمساعدتك على النجاح.'}
                                </p>
                            </div>

                            {/* Contact cards */}
                            <div className="flex flex-col gap-3 w-full md:w-auto md:min-w-[260px]">
                                {contacts.map((c, i) => (
                                    <Link key={i} to={c.href} target="_blank"
                                        className="flex items-center gap-3 px-5 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5"
                                        style={{
                                            background: `${c.color}12`,
                                            border: `1px solid ${c.color}25`,
                                            color: c.color
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.background = `${c.color}25`; e.currentTarget.style.borderColor = `${c.color}50`; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = `${c.color}12`; e.currentTarget.style.borderColor = `${c.color}25`; }}
                                    >
                                        <Icon icon={c.icon} className="text-xl flex-shrink-0" />
                                        <div>
                                            <div className="text-[10px] font-black uppercase tracking-wider opacity-60">{c.label}</div>
                                            <div className="text-xs font-semibold text-white">{c.value}</div>
                                        </div>
                                        <Icon icon="lucide:external-link" className="text-xs ml-auto opacity-40" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default About;
