import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icon } from '@iconify/react'
import darkLogo from '../img/Dark Logo.png'

const NAV_LINKS = [
    { path: '/', key: 'HOME', icon: 'lucide:home' },
    { path: '/projects', key: 'PROJECTS', icon: 'lucide:folder-code' },
    { path: '/resume', key: 'RESUME', icon: 'lucide:file-text' },
    { path: '/services', key: 'SERVICES', icon: 'lucide:briefcase' },
    { path: '/about', key: 'ABOUT', icon: 'lucide:user' },
]

const SOCIAL = [
    { href: 'http://wa.me/201554206775', icon: 'ic:baseline-whatsapp', label: 'WhatsApp', color: '#25d366' },
    { href: 'mailto:mohamed2003torky@gmail.com', icon: 'mdi:gmail', label: 'Email', color: '#ea4335' },
    { href: 'https://github.com/MdTorky', icon: 'mdi:github', label: 'GitHub', color: '#e2e8f0' },
    { href: 'https://www.linkedin.com/in/mohamed-torky-243196221/', icon: 'mdi:linkedin', label: 'LinkedIn', color: '#0a66c2' },
    { href: 'https://www.instagram.com/mohdtorky/', icon: 'mdi:instagram', label: 'Instagram', color: '#e1306c' },
]

const SERVICE_LINKS = [
    { to: '/services/web-landing', label: 'Landing Page' },
    { to: '/services/web-starter', label: 'Starter Package' },
    { to: '/services/web-professional', label: 'Professional' },
    { to: '/services/web-premium', label: 'Premium Package' },
    { to: '/services', label: 'All Services →' },
]

const Footer = ({ languageText, language }) => {
    const location = useLocation()
    const year = new Date().getFullYear()
    const isActive = (path) =>
        path === '/' ? location.pathname === '/' : location.pathname === path || location.pathname.startsWith(path + '/')

    return (
        <footer style={{
            background: 'linear-gradient(180deg,#090912 0%,#0c0c18 100%)',
            borderTop: '1px solid rgba(82,92,235,0.15)',
        }}>
            {/* ── MAIN GRID ───────────────────────────────────────── */}
            <div className="max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20 py-14 md:py-20">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

                    {/* Brand */}
                    <div className="lg:max-w-[260px]">
                        <Link to="/" className="inline-block mb-5">
                            <img src={darkLogo} alt="Mohamed Torky" className="h-11 w-auto" />
                        </Link>
                        <p className="text-sm text-gray-500 leading-relaxed font-medium mb-5">
                            {language === 'en'
                                ? 'Full-Stack Developer & Data Scientist crafting premium digital experiences.'
                                : 'مطور ويب متكامل وعالم بيانات يصنع تجارب رقمية متميزة.'}
                        </p>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
                            style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#10b981' }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            {language === 'en' ? 'Available for freelance' : 'متاح للعمل الحر'}
                        </div>
                    </div>

                    {/* Link columns */}
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8">
                        {/* Pages */}
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-5" style={{ fontFamily: 'monospace' }}>
                                {language === 'en' ? '// pages' : '// الصفحات'}
                            </p>
                            <ul className="space-y-3">
                                {NAV_LINKS.map(({ path, key, icon }) => (
                                    <li key={path}>
                                        <Link to={path}
                                            className="flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
                                            style={{ color: isActive(path) ? '#525ceb' : 'rgba(180,180,210,0.55)' }}
                                            onMouseEnter={e => e.currentTarget.style.color = isActive(path) ? '#525ceb' : '#ffffff'}
                                            onMouseLeave={e => e.currentTarget.style.color = isActive(path) ? '#525ceb' : 'rgba(180,180,210,0.55)'}
                                        >
                                            <Icon icon={icon} className="text-sm opacity-50" />
                                            {languageText[key]}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Services */}
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-5" style={{ fontFamily: 'monospace' }}>
                                {language === 'en' ? '// services' : '// الخدمات'}
                            </p>
                            <ul className="space-y-3">
                                {SERVICE_LINKS.map(({ to, label }) => (
                                    <li key={to}>
                                        <Link to={to}
                                            className="text-sm font-semibold transition-colors duration-200"
                                            style={{ color: 'rgba(180,180,210,0.55)' }}
                                            onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                                            onMouseLeave={e => e.currentTarget.style.color = 'rgba(180,180,210,0.55)'}
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-5" style={{ fontFamily: 'monospace' }}>
                                {language === 'en' ? '// contact' : '// التواصل'}
                            </p>
                            <ul className="space-y-3">
                                {SOCIAL.map(({ href, icon, label, color }) => (
                                    <li key={href}>
                                        <Link to={href} target="_blank"
                                            className="flex items-center gap-2.5 text-sm font-semibold transition-colors duration-200"
                                            style={{ color: 'rgba(180,180,210,0.55)' }}
                                            onMouseEnter={e => e.currentTarget.style.color = color}
                                            onMouseLeave={e => e.currentTarget.style.color = 'rgba(180,180,210,0.55)'}
                                        >
                                            <Icon icon={icon} className="text-base flex-shrink-0" />
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── BOTTOM BAR ──────────────────────────────────────── */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                <div className="max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-gray-600 font-semibold" style={{ fontFamily: 'monospace' }}>
                        <span style={{ color: '#525ceb' }}>©</span> {year} Mohamed Torky · All rights reserved
                    </p>
                    <div className="flex items-center gap-4">
                        <Link to="/terms" className="text-xs font-bold text-gray-600 uppercase tracking-wide transition-colors duration-200"
                            onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = ''}>
                            {languageText.Terms}
                        </Link>
                        <span className="w-px h-3" style={{ background: 'rgba(255,255,255,0.1)' }} />
                        <Link to="/privacy" className="text-xs font-bold text-gray-600 uppercase tracking-wide transition-colors duration-200"
                            onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = ''}>
                            {languageText.Privacy}
                        </Link>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-700 text-[10px]" style={{ fontFamily: 'monospace' }}>
                        <span>Built with</span>
                        <Icon icon="logos:react" className="text-sm" />
                        <span>&amp;</span>
                        <Icon icon="logos:framer" className="text-sm" />
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer