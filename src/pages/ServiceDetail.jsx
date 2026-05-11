import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import servicesData from '../data/services.json';

const ServiceDetail = ({ language, languageText }) => {
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

    // Resolve the glow/accent color from the gradient string
    const borderColorMap = {
        'from-purple-600 to-indigo-600': '#7c3aed',
        'from-blue-600 to-cyan-600': '#2563eb',
        'from-teal-500 to-emerald-500': '#10b981',
        'from-orange-500 to-yellow-500': '#f97316',
    };
    const accentColor = service.color ? (borderColorMap[service.color] || '#525ceb') : '#525ceb';
    const gradientClass = service.color || 'from-bluetheme to-purple-500';

    const pageVariant = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.4, staggerChildren: 0.08 } },
        exit: { opacity: 0, transition: { duration: 0.2 } }
    };
    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }
    };

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
            className="min-h-screen bg-[#f4f4fa] dark:bg-[#08080f]"
        >
            {/* ── HERO BANNER ─────────────────────────────────────────── */}
            <div className="relative overflow-hidden"
                style={{
                    background: `linear-gradient(135deg, #0a0a18 0%, #0e0e22 100%)`,
                    borderBottom: `1px solid rgba(255,255,255,0.05)`
                }}>
                {/* Ambient orbs */}
                <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 blur-[100px] pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${accentColor}, transparent)` }} />
                <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-10 blur-[100px] pointer-events-none"
                    style={{ background: `radial-gradient(circle, #a855f7, transparent)` }} />
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='0.8'/%3E%3C/g%3E%3C/svg%3E")` }} />

                <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-10 lg:px-20 pt-12 pb-16 md:pt-16 md:pb-20">
                    {/* Breadcrumb */}
                    <motion.div variants={fadeUp} className="flex items-center gap-2 text-xs text-gray-500 mb-8">
                        <Link to="/services" className="hover:text-white transition-colors duration-200 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                            <Icon icon="lucide:arrow-left" className="text-sm" />
                            {language === 'en' ? 'Services' : 'الخدمات'}
                        </Link>
                        <Icon icon="lucide:chevron-right" className="text-gray-700 text-xs" />
                        <span className="text-gray-400 font-semibold uppercase tracking-wider truncate max-w-[180px]">
                            {language === 'en' ? service.name : service.arabicName}
                        </span>
                    </motion.div>

                    <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-10">
                        {/* Icon */}
                        <motion.div
                            variants={fadeUp}
                            className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${gradientClass} flex items-center justify-center text-white text-4xl flex-shrink-0`}
                            style={{ boxShadow: `0 20px 60px ${accentColor}50` }}
                        >
                            <Icon icon={service.icon} />
                        </motion.div>

                        <motion.div variants={fadeUp} className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full"
                                    style={{ background: `${accentColor}20`, color: accentColor, border: `1px solid ${accentColor}30` }}>
                                    {language === 'en' ? 'Service' : 'خدمة'}
                                </span>
                                {service.popular && (
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                        {language === 'en' ? '★ Popular' : '★ شائع'}
                                    </span>
                                )}
                            </div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-3">
                                {language === 'en' ? service.name : service.arabicName}
                            </h1>
                            <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl font-medium">
                                {language === 'en' ? service.description : service.arabicDescription}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* ── BODY ────────────────────────────────────────────────── */}
            <div className="max-w-6xl mx-auto px-4 md:px-10 lg:px-20 py-12 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">

                    {/* ── LEFT: Main Content ───────────────────────────── */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* Features Grid */}
                        {service.features && (
                            <motion.div variants={fadeUp}>
                                <h2 className="flex items-center gap-2.5 text-lg font-black text-darktheme dark:text-white uppercase tracking-tight mb-5">
                                    <span className="w-7 h-7 rounded-xl flex items-center justify-center text-sm"
                                        style={{ background: `${accentColor}15`, color: accentColor }}>
                                        <Icon icon="lucide:sparkles" />
                                    </span>
                                    {language === 'en' ? "What's Included" : 'ما يتضمنه'}
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {(language === 'en' ? service.features : service.arabicFeatures)?.map((feature, i) => (
                                        <motion.div
                                            key={i}
                                            variants={fadeUp}
                                            className="flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 cursor-default"
                                            style={{
                                                background: 'rgba(255,255,255,0.04)',
                                                border: '1px solid rgba(255,255,255,0.06)',
                                            }}
                                        >
                                            <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                                                style={{ background: `${accentColor}20`, color: accentColor }}>
                                                <Icon icon="lucide:check" style={{ fontSize: 11 }} />
                                            </div>
                                            <span className="text-sm font-semibold text-darktheme dark:text-gray-200">{feature}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* More Info (e.g. SEO article detail) */}
                        {(service.moreinfo || service.arabicMoreinfo) && (
                            <motion.div variants={fadeUp}>
                                <h2 className="flex items-center gap-2.5 text-lg font-black text-darktheme dark:text-white uppercase tracking-tight mb-5">
                                    <span className="w-7 h-7 rounded-xl flex items-center justify-center text-sm"
                                        style={{ background: `${accentColor}15`, color: accentColor }}>
                                        <Icon icon="lucide:file-text" />
                                    </span>
                                    {language === 'en' ? 'Service Details' : 'تفاصيل الخدمة'}
                                </h2>
                                <div className="p-6 md:p-8 rounded-3xl"
                                    style={{
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid rgba(255,255,255,0.06)'
                                    }}>
                                    <p className="text-gray-500 dark:text-gray-300 whitespace-pre-wrap leading-relaxed text-sm md:text-base">
                                        {language === 'en' ? service.moreinfo : service.arabicMoreinfo}
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {/* Guarantees */}
                        <motion.div variants={fadeUp}>
                            <h2 className="flex items-center gap-2.5 text-lg font-black text-darktheme dark:text-white uppercase tracking-tight mb-5">
                                <span className="w-7 h-7 rounded-xl flex items-center justify-center text-sm"
                                    style={{ background: '#10b98115', color: '#10b981' }}>
                                    <Icon icon="lucide:shield" />
                                </span>
                                {language === 'en' ? 'Our Guarantees' : 'ضماناتنا'}
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {guarantees.map((g, i) => (
                                    <div key={i}
                                        className="p-4 rounded-2xl text-center transition-all duration-300 hover:-translate-y-1"
                                        style={{
                                            background: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(255,255,255,0.06)'
                                        }}>
                                        <div className="w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center text-lg"
                                            style={{ background: '#10b98115', color: '#10b981' }}>
                                            <Icon icon={g.icon} />
                                        </div>
                                        <span className="text-xs font-bold text-darktheme dark:text-gray-300">
                                            {language === 'en' ? g.en : g.ar}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* ── RIGHT: Sticky Pricing Card ──────────────────────── */}
                    <motion.div variants={fadeUp} className="lg:sticky lg:top-24 h-fit">
                        <div className="relative rounded-3xl overflow-hidden"
                            style={{
                                background: 'linear-gradient(135deg, #0d0d1a 0%, #13131f 100%)',
                                border: `1.5px solid ${accentColor}30`,
                                boxShadow: `0 30px 80px ${accentColor}15, 0 0 0 1px rgba(255,255,255,0.03)`
                            }}>
                            {/* Top gradient line */}
                            <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${gradientClass}`} />
                            {/* Ambient glow */}
                            <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-10 blur-3xl pointer-events-none"
                                style={{ background: `radial-gradient(circle, ${accentColor}, transparent)` }} />

                            <div className="relative z-10 p-7 md:p-8">
                                {/* Price */}
                                <div className="text-center mb-6">
                                    <p className="text-[9px] font-black uppercase tracking-[0.25em] text-gray-600 mb-3">
                                        {language === 'en' ? 'Investment' : 'التكلفة'}
                                    </p>
                                    <div className={`text-5xl font-black bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent leading-none mb-1`}>
                                        {service.price}
                                    </div>
                                    <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">USD</p>
                                </div>

                                {/* Divider */}
                                <div className="border-t mb-6" style={{ borderColor: `${accentColor}15` }} />

                                {/* Perks */}
                                <div className="space-y-3 mb-7">
                                    {[
                                        { icon: 'lucide:message-circle', en: 'Free Consultation', ar: 'استشارة مجانية' },
                                        { icon: 'lucide:refresh-cw', en: 'Revisions Included', ar: 'تعديلات مشمولة' },
                                        { icon: 'lucide:zap', en: 'Fast Turnaround', ar: 'إنجاز سريع' },
                                        { icon: 'lucide:lock', en: 'Secure Process', ar: 'عملية آمنة' },
                                    ].map((perk, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs"
                                                style={{ background: `${accentColor}15`, color: accentColor }}>
                                                <Icon icon={perk.icon} />
                                            </div>
                                            <span className="text-sm font-semibold text-gray-300">
                                                {language === 'en' ? perk.en : perk.ar}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Primary CTA → Request Form */}
                                <Link
                                    to={`/requestform/${service.id}`}
                                    className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl font-black text-sm uppercase tracking-wide text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] mb-3"
                                    style={{
                                        background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
                                        boxShadow: `0 12px 40px ${accentColor}40`
                                    }}
                                >
                                    <Icon icon="lucide:send" className="text-base" />
                                    {language === 'en' ? 'Request This Service' : 'اطلب هذه الخدمة'}
                                </Link>

                                {/* Secondary CTA → Contact */}
                                <Link
                                    to="/about"
                                    className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl font-bold text-xs uppercase tracking-wide transition-all duration-300"
                                    style={{
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        color: '#9ca3af',
                                        background: 'rgba(255,255,255,0.03)'
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.borderColor = `${accentColor}50`;
                                        e.currentTarget.style.color = 'white';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                                        e.currentTarget.style.color = '#9ca3af';
                                    }}
                                >
                                    <Icon icon="ic:baseline-whatsapp" className="text-base" />
                                    {languageText.ContactMe}
                                </Link>

                                {/* Trust note */}
                                <p className="text-center text-[10px] text-gray-600 font-semibold mt-5 uppercase tracking-wider">
                                    {language === 'en' ? '🔒 100% secure · No hidden fees' : '🔒 آمن 100٪ · لا رسوم مخفية'}
                                </p>
                            </div>
                        </div>

                        {/* Related: back to all services */}
                        <Link to="/services"
                            className="flex items-center justify-center gap-2 mt-4 text-xs font-bold text-gray-400 hover:text-white transition-colors duration-200 uppercase tracking-wider py-3"
                        >
                            <Icon icon="lucide:grid-2x2" />
                            {language === 'en' ? 'Browse all services' : 'تصفح جميع الخدمات'}
                        </Link>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default ServiceDetail;
