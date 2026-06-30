import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import servicesData from '../data/services.json';
import { SHOW_PRICES } from '../config/priceConfig';

const ServiceDetail = ({ language, languageText, darkMode }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const allServices = [...servicesData.web, ...servicesData.graphic, ...servicesData.writing];
    const service = allServices.find(s => s.id.toString() === id.toString());

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!service) {
            const t = setTimeout(() => navigate('/services'), 200);
            return () => clearTimeout(t);
        }
    }, [service, navigate]);

    if (!service) return (
        <div className="min-h-screen flex items-center justify-center bg-[#f4f4fa] dark:bg-[#08080f]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-t-bluetheme border-gray-200 dark:border-gray-800 animate-spin" />
                <p className="text-sm text-gray-400 font-semibold uppercase tracking-widest">Loading…</p>
            </div>
        </div>
    );

    // Resolve signature colors
    const borderColorMap = {
        'from-purple-600 to-indigo-600': '#7c3aed',
        'from-blue-600 to-cyan-600': '#2563eb',
        'from-teal-500 to-emerald-500': '#10b981',
        'from-orange-500 to-yellow-500': '#f97316',
    };
    const accentColor = service.color ? (borderColorMap[service.color] || '#525ceb') : '#525ceb';
    const gradientClass = service.color || 'from-bluetheme to-purple-500';

    // Framer motion variants
    const pageVariant = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.08 } },
        exit: { opacity: 0 }
    };
    
    const fadeUp = {
        hidden: { opacity: 0, y: 35 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
    };

    const processSteps = [
        { icon: 'lucide:search', en: '1. Discovery & Strategy', ar: '١. البحث والتخطيط', descEn: 'We research your market, define scope, and plan a custom strategy.', descAr: 'ندرس السوق الخاص بك ونحدد النطاق ونخطط لإستراتيجية مخصصة.' },
        { icon: 'lucide:layout-template', en: '2. Wireframing & Design', ar: '٢. التصميم والواجهات', descEn: 'Creating stunning design high-fidelity layouts tailored to your brand.', descAr: 'إنشاء تخطيطات تصميم مذهلة وعالية الجودة مصممة لعلامتك التجارية.' },
        { icon: 'lucide:code-2', en: '3. Clean Development', ar: '٣. البرمجة والتطوير', descEn: 'Writing efficient, fast, responsive code using latest modern frameworks.', descAr: 'كتابة كود برمجي فعال وسريع ومتجاوب باستخدام أحدث الإطارات البرمجية.' },
        { icon: 'lucide:rocket', en: '4. Testing & Launch', ar: '٤. الاختبار والإطلاق', descEn: 'Rigorous optimization, SEO setup, domain config, and live deployment.', descAr: 'تحسين صارم، إعداد السيو (SEO)، إعداد النطاق والبدء الفعلي بالعمل.' },
    ];

    const guarantees = [
        { icon: 'lucide:headphones', en: 'Dedicated Support', ar: 'دعم مخصص' },
        { icon: 'lucide:shield-check', en: 'Quality Guaranteed', ar: 'جودة مضمونة' },
        { icon: 'lucide:clock', en: 'On-Time Delivery', ar: 'تسليم في الموعد' },
        { icon: 'lucide:lock', en: 'Secure Payments', ar: 'دفع آمن' },
    ];

    return (
        <motion.div
            variants={pageVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="min-h-screen bg-[#f8fafc] dark:bg-[#08080f] text-slate-900 dark:text-gray-100 overflow-hidden"
        >
            {/* ── AMBIENT BACKGROUND ORBS ──────────────────────────────── */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[500px] pointer-events-none z-0">
                <div className="absolute top-[-100px] left-[5%] w-96 h-96 rounded-full opacity-35 dark:opacity-20 blur-[120px]"
                    style={{ background: `radial-gradient(circle, ${accentColor}, transparent 70%)` }} />
                <div className="absolute top-[100px] right-[5%] w-[450px] h-[450px] rounded-full opacity-25 dark:opacity-15 blur-[150px]"
                    style={{ background: 'radial-gradient(circle, #a855f7, transparent 70%)' }} />
            </div>

            {/* ── BREADCRUMB / HERO SECTION ────────────────────────────── */}
            <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20 pt-28 pb-12 md:pb-16">
                {/* Breadcrumb */}
                <motion.div variants={fadeUp} className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-8 text-slate-500 dark:text-gray-500">
                    <Link to="/services" className="hover:text-bluetheme transition-colors duration-200 flex items-center gap-1.5">
                        <Icon icon="lucide:arrow-left" className="text-sm" />
                        {language === 'en' ? 'Services' : 'الخدمات'}
                    </Link>
                    <Icon icon="lucide:chevron-right" className="text-xs opacity-50" />
                    <span className="text-slate-800 dark:text-gray-300 truncate max-w-[200px]">
                        {language === 'en' ? service.name : service.arabicName}
                    </span>
                </motion.div>

                {/* Hero row */}
                <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
                    {/* Icon container with pulsing outline glow */}
                    <motion.div
                        variants={fadeUp}
                        className={`w-20 h-20 rounded-[28px] bg-gradient-to-br ${gradientClass} flex items-center justify-center text-white text-4xl flex-shrink-0 relative`}
                        style={{ boxShadow: `0 16px 40px ${accentColor}40` }}
                    >
                        <div className="absolute inset-0 rounded-[28px] bg-white/10 blur-[4px]" />
                        <Icon icon={service.icon} className="relative z-10" />
                    </motion.div>

                    <motion.div variants={fadeUp} className="flex-1">
                        <div className="flex flex-wrap items-center gap-2.5 mb-3.5">
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full"
                                style={{ background: `${accentColor}15`, color: accentColor, border: `1px solid ${accentColor}25` }}>
                                {language === 'en' ? 'Premium Tier' : 'فئة متميزة'}
                            </span>
                            {service.popular && (
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                    {language === 'en' ? '★ Popular' : '★ شائع'}
                                </span>
                            )}
                        </div>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-4 text-slate-900 dark:text-white">
                            {language === 'en' ? service.name : service.arabicName}
                        </h1>
                        <p className="text-base md:text-lg text-slate-600 dark:text-gray-400 leading-relaxed max-w-3xl font-medium">
                            {language === 'en' ? service.description : service.arabicDescription}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* ── MAIN CONTENT GRID ────────────────────────────────────── */}
            <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">

                    {/* ── LEFT & CENTER: Core info ─────────────────────── */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* What's Included */}
                        {service.features && (
                            <motion.div variants={fadeUp} className="rounded-3xl p-6 md:p-8"
                                style={{
                                    background: darkMode ? 'rgba(255,255,255,0.02)' : '#ffffff',
                                    border: darkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)',
                                    boxShadow: darkMode ? 'none' : '0 10px 30px rgba(0,0,0,0.02)'
                                }}>
                                <h2 className="flex items-center gap-2.5 text-lg font-black uppercase tracking-tight mb-6">
                                    <span className="w-8 h-8 rounded-xl flex items-center justify-center text-base"
                                        style={{ background: `${accentColor}15`, color: accentColor }}>
                                        <Icon icon="lucide:sparkles" />
                                    </span>
                                    <span className="text-slate-900 dark:text-white">{language === 'en' ? "What's Included" : 'ما يتضمنه'}</span>
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                    {(language === 'en' ? service.features : service.arabicFeatures)?.map((feature, i) => (
                                        <div
                                            key={i}
                                            className="flex items-start gap-3 p-3.5 rounded-2xl transition-all duration-300"
                                            style={{
                                                background: darkMode ? 'rgba(255,255,255,0.02)' : '#f8fafc',
                                                border: darkMode ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(0,0,0,0.03)'
                                            }}
                                        >
                                            <div className="w-5.5 h-5.5 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-xs text-white"
                                                style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)` }}>
                                                <Icon icon="lucide:check" className="text-white" style={{ fontSize: 10 }} />
                                            </div>
                                            <span className="text-sm font-semibold text-slate-700 dark:text-gray-300 leading-snug">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Detailed Description */}
                        {(service.moreinfo || service.arabicMoreinfo) && (
                            <motion.div variants={fadeUp} className="rounded-3xl p-6 md:p-8"
                                style={{
                                    background: darkMode ? 'rgba(255,255,255,0.02)' : '#ffffff',
                                    border: darkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)',
                                    boxShadow: darkMode ? 'none' : '0 10px 30px rgba(0,0,0,0.02)'
                                }}>
                                <h2 className="flex items-center gap-2.5 text-lg font-black uppercase tracking-tight mb-6">
                                    <span className="w-8 h-8 rounded-xl flex items-center justify-center text-base"
                                        style={{ background: `${accentColor}15`, color: accentColor }}>
                                        <Icon icon="lucide:file-text" />
                                    </span>
                                    <span className="text-slate-900 dark:text-white">{language === 'en' ? 'Overview' : 'نظرة عامة'}</span>
                                </h2>
                                <p className="text-slate-600 dark:text-gray-300 whitespace-pre-wrap leading-relaxed text-sm md:text-base font-medium">
                                    {language === 'en' ? service.moreinfo : service.arabicMoreinfo}
                                </p>
                            </motion.div>
                        )}

                        {/* Process Workflow Section */}
                        <motion.div variants={fadeUp} className="rounded-3xl p-6 md:p-8"
                            style={{
                                background: darkMode ? 'rgba(255,255,255,0.02)' : '#ffffff',
                                border: darkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)',
                                boxShadow: darkMode ? 'none' : '0 10px 30px rgba(0,0,0,0.02)'
                            }}>
                            <h2 className="flex items-center gap-2.5 text-lg font-black uppercase tracking-tight mb-8">
                                <span className="w-8 h-8 rounded-xl flex items-center justify-center text-base"
                                    style={{ background: `${accentColor}15`, color: accentColor }}>
                                    <Icon icon="lucide:git-commit" />
                                </span>
                                <span className="text-slate-900 dark:text-white">{language === 'en' ? 'Execution Workflow' : 'خطوات العمل'}</span>
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                                {processSteps.map((step, i) => (
                                    <div key={i} className="flex gap-4 p-4 rounded-2xl relative"
                                        style={{
                                            background: darkMode ? 'rgba(255,255,255,0.02)' : '#f8fafc',
                                            border: darkMode ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(0,0,0,0.03)'
                                        }}>
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
                                            style={{ background: `${accentColor}15`, color: accentColor }}>
                                            <Icon icon={step.icon} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-1">
                                                {language === 'en' ? step.en : step.ar}
                                            </h4>
                                            <p className="text-xs text-slate-500 dark:text-gray-400 leading-relaxed font-semibold">
                                                {language === 'en' ? step.descEn : step.descAr}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Guarantees grid */}
                        <motion.div variants={fadeUp}>
                            <h2 className="flex items-center gap-2.5 text-lg font-black uppercase tracking-tight mb-6">
                                <span className="w-8 h-8 rounded-xl flex items-center justify-center text-base"
                                    style={{ background: '#10b98115', color: '#10b981' }}>
                                    <Icon icon="lucide:shield-check" />
                                </span>
                                <span className="text-slate-900 dark:text-white">{language === 'en' ? 'Project Guarantees' : 'ضمانات المشروع'}</span>
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {guarantees.map((g, i) => (
                                    <div key={i}
                                        className="p-5 rounded-2xl text-center transition-all duration-300 hover:-translate-y-1"
                                        style={{
                                            background: darkMode ? 'rgba(255,255,255,0.02)' : '#ffffff',
                                            border: darkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)',
                                            boxShadow: darkMode ? 'none' : '0 4px 15px rgba(0,0,0,0.01)'
                                        }}>
                                        <div className="w-10 h-10 rounded-full mx-auto mb-3.5 flex items-center justify-center text-lg"
                                            style={{ background: '#10b98115', color: '#10b981' }}>
                                            <Icon icon={g.icon} />
                                        </div>
                                        <span className="text-xs font-black uppercase tracking-wide text-slate-700 dark:text-gray-300">
                                            {language === 'en' ? g.en : g.ar}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* ── RIGHT: Sticky Booking & Action Card ──────────── */}
                    <motion.div variants={fadeUp} className="lg:sticky lg:top-24 h-fit">
                        <div className="relative rounded-[32px] overflow-hidden"
                            style={{
                                background: darkMode ? 'linear-gradient(135deg, #0d0d1a 0%, #13131f 100%)' : '#ffffff',
                                border: darkMode ? `1.5px solid ${accentColor}30` : '1.5px solid rgba(0,0,0,0.06)',
                                boxShadow: darkMode
                                    ? `0 30px 80px ${accentColor}15`
                                    : '0 20px 50px rgba(0,0,0,0.04)'
                            }}>
                            {/* Top signature gradient strip */}
                            <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${gradientClass}`} />
                            
                            <div className="relative z-10 p-7 md:p-8">
                                {/* Price header */}
                                {SHOW_PRICES ? (
                                    <div className="text-center mb-7">
                                        <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 dark:text-gray-600 mb-2">
                                            {language === 'en' ? 'Investment' : 'التكلفة'}
                                        </p>
                                        <div className={`text-5xl font-black bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent leading-none mb-1.5`}>
                                            {service.price}
                                        </div>
                                        <p className="text-[10px] text-slate-500 dark:text-gray-600 font-black uppercase tracking-widest">USD</p>
                                        <div className="border-t mt-6" style={{ borderColor: darkMode ? `${accentColor}15` : 'rgba(0,0,0,0.05)' }} />
                                    </div>
                                ) : (
                                    <div className="text-center mb-6">
                                        <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 dark:text-gray-500 mb-1.5">
                                            {language === 'en' ? 'Pricing Structure' : 'هيكل الأسعار'}
                                        </p>
                                        <div className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                            {language === 'en' ? 'Custom Quote' : 'تسعير مخصص'}
                                        </div>
                                        <div className="border-t mt-5" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }} />
                                    </div>
                                )}

                                {/* Perks checklist */}
                                <div className="space-y-3.5 mb-8">
                                    {[
                                        { icon: 'lucide:message-square-code', en: '1-on-1 Consultation', ar: 'استشارة مخصصة' },
                                        { icon: 'lucide:git-compare', en: 'Milestone Tracking', ar: 'متابعة مراحل المشروع' },
                                        { icon: 'lucide:award', en: 'Premium Code Quality', ar: 'جودة أكواد ممتازة' },
                                        { icon: 'lucide:shield-alert', en: 'Full Security Audit', ar: 'فحص أمان كامل' },
                                    ].map((perk, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs"
                                                style={{ background: `${accentColor}15`, color: accentColor }}>
                                                <Icon icon={perk.icon} />
                                            </div>
                                            <span className="text-[13px] font-semibold text-slate-600 dark:text-gray-300">
                                                {language === 'en' ? perk.en : perk.ar}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Order / CTA link */}
                                <Link
                                    to={`/requestform/${service.id}`}
                                    className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl font-black text-sm uppercase tracking-wide text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] mb-3"
                                    style={{
                                        background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
                                        boxShadow: `0 12px 40px ${accentColor}30`
                                    }}
                                >
                                    <Icon icon="lucide:send" className="text-base" />
                                    {language === 'en' ? 'Get Started Now' : 'ابدأ المشروع الآن'}
                                </Link>

                                {/* WhatsApp shortcut */}
                                <Link
                                    to="http://wa.me/201554206775"
                                    target="_blank"
                                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wide transition-all duration-300"
                                    style={{
                                        border: darkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)',
                                        color: darkMode ? '#9ca3af' : '#4b5563',
                                        background: darkMode ? 'rgba(255,255,255,0.02)' : '#f8fafc'
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.borderColor = `${accentColor}50`;
                                        e.currentTarget.style.color = darkMode ? 'white' : 'black';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.borderColor = darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
                                        e.currentTarget.style.color = darkMode ? '#9ca3af' : '#4b5563';
                                    }}
                                >
                                    <Icon icon="ic:baseline-whatsapp" className="text-base" />
                                    {languageText.ContactMe}
                                </Link>

                                {/* Safety statement */}
                                <p className="text-center text-[10px] text-slate-400 dark:text-gray-600 font-semibold mt-5 uppercase tracking-wider">
                                    {language === 'en' ? '🔒 100% secure · No hidden fees' : '🔒 آمن 100٪ · لا رسوم مخفية'}
                                </p>
                            </div>
                        </div>

                        {/* Back to services trigger */}
                        <Link to="/services"
                            className="flex items-center justify-center gap-2 mt-4 text-xs font-bold text-slate-500 hover:text-slate-800 dark:text-gray-400 dark:hover:text-white transition-colors duration-200 uppercase tracking-wider py-3"
                        >
                            <Icon icon="lucide:grid" />
                            {language === 'en' ? 'Browse all services' : 'تصفح جميع الخدمات'}
                        </Link>
                    </motion.div>

                </div>
            </div>
        </motion.div>
    );
};

export default ServiceDetail;
