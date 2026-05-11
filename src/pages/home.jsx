import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import Me from '../img/Torky.png'
import { motion } from 'framer-motion'
import pdf from '../data/resume.pdf'
import projectsData from '../data/projects.json'
import servicesData from '../data/services.json'

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay } }
})

const TECH = ['React', 'Node.js', 'Python', 'MongoDB', 'Next.js', 'AWS', 'TailwindCSS', 'Firebase', 'PowerBI', 'Git']

const FloatingOrb = ({ style }) => (
  <motion.div
    animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: style.delay || 0 }}
    className="absolute rounded-full pointer-events-none"
    style={style}
  />
)

const Home = ({ language, languageText }) => {
  const handleDownload = () => {
    const a = document.createElement('a')
    a.href = pdf; a.download = 'CV.pdf'
    document.body.appendChild(a); a.click(); document.body.removeChild(a)
  }

  const webPackages = servicesData.web.filter(s => s.features).slice(0, 3)
  const featuredProjects = projectsData.slice(0, 3)

  const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }

  return (
    <motion.div exit={{ opacity: 0, transition: { duration: 0.2 } }} className="w-full overflow-hidden">

      {/* ═══ HERO ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center" style={{ background: 'linear-gradient(135deg,#07070f 0%,#0b0b1a 60%,#0e0a1e 100%)' }}>
        <FloatingOrb style={{ width: 500, height: 500, top: '-10%', left: '-10%', background: 'radial-gradient(circle,rgba(82,92,235,0.18),transparent 70%)', delay: 0 }} />
        <FloatingOrb style={{ width: 400, height: 400, bottom: '-5%', right: '-5%', background: 'radial-gradient(circle,rgba(168,85,247,0.14),transparent 70%)', delay: 2 }} />
        <FloatingOrb style={{ width: 300, height: 300, top: '30%', right: '20%', background: 'radial-gradient(circle,rgba(16,185,129,0.1),transparent 70%)', delay: 4 }} />

        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='0.8' fill='%23ffffff'/%3E%3C/svg%3E\")" }} />

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20 w-full py-24 md:py-0">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            {/* Left content */}
            <motion.div variants={container} initial="hidden" animate="visible" className="flex-1 text-center lg:text-start">
              <motion.div variants={fadeUp(0)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6"
                style={{ background: 'rgba(82,92,235,0.12)', color: '#525ceb', border: '1px solid rgba(82,92,235,0.25)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-bluetheme animate-pulse" />
                {language === 'en' ? 'Available for hire' : 'متاح للتوظيف'}
              </motion.div>

              <motion.h1 variants={fadeUp(0.1)} className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tighter mb-4">
                {language === 'en' ? <>Mohamed<br /><span className="text-gradient">Torky</span></> : languageText.MyName}
              </motion.h1>

              <motion.p variants={fadeUp(0.2)} className="text-lg md:text-xl font-bold mb-3" style={{ color: '#525ceb' }}>
                {language === 'en' ? 'Full-Stack Engineer & Data Scientist' : languageText.SoftwareEngineer || 'مهندس برمجيات'}
              </motion.p>

              <motion.p variants={fadeUp(0.3)} className="text-base text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
                {language === 'en'
                  ? "I build blazing-fast web apps, beautiful UIs, and AI-powered solutions. Based in Egypt, working globally."
                  : "أقوم ببناء تطبيقات ويب فائقة السرعة، وواجهات مستخدم جذابة، وحلول تعتمد على الذكاء الاصطناعي. مقري في مصر وأعمل مع عملاء من جميع أنحاء العالم."}
              </motion.p>

              <motion.div variants={fadeUp(0.4)} className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
                <Link to="/services"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-black text-sm text-white uppercase tracking-wide hover:scale-105 active:scale-95 transition-transform"
                  style={{ background: 'linear-gradient(135deg,#525ceb,#a855f7)', boxShadow: '0 12px 40px rgba(82,92,235,0.35)' }}>
                  <Icon icon="lucide:briefcase" /> {language === 'en' ? 'Hire Me' : 'وظفني'}
                </Link>
                <button onClick={handleDownload}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm text-white uppercase tracking-wide hover:scale-105 active:scale-95 transition-all"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <Icon icon="lucide:download" /> {languageText.DownloadCV}
                </button>
              </motion.div>

              <motion.div variants={fadeUp(0.5)} className="flex gap-4 justify-center lg:justify-start">
                {[
                  { href: 'mailto:mohamed2003torky@gmail.com', icon: 'mdi:gmail', color: '#ea4335' },
                  { href: 'https://github.com/MdTorky', icon: 'mdi:github', color: '#e2e8f0' },
                  { href: 'https://www.linkedin.com/in/mohamed-torky-243196221/', icon: 'mdi:linkedin', color: '#0a66c2' },
                  { href: 'http://wa.me/201554206775', icon: 'ic:baseline-whatsapp', color: '#25d366' },
                ].map(({ href, icon, color }) => (
                  <Link key={href} to={href} target="_blank"
                    className="w-10 h-10 flex items-center justify-center rounded-xl text-lg transition-all duration-200 hover:scale-110"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(200,200,220,0.7)' }}
                    onMouseEnter={e => { e.currentTarget.style.color = color; e.currentTarget.style.borderColor = color + '50'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(200,200,220,0.7)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}>
                    <Icon icon={icon} />
                  </Link>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — photo + orbiting ring */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex-shrink-0 flex items-center justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[420px] lg:h-[420px]">
                {/* Gradient ring */}
                <div className="absolute inset-0 rounded-full p-1" style={{ background: 'linear-gradient(135deg,#525ceb,#a855f7,#10b981,#525ceb)', animation: 'spin 8s linear infinite' }}>
                  <div className="w-full h-full rounded-full" style={{ background: '#0b0b1a' }} />
                </div>
                <img src={Me} alt="Mohamed Torky" className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] object-cover object-top rounded-full" style={{ mixBlendMode: 'luminosity' }} />

                {/* Floating stat chips */}
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 px-3 py-2 rounded-xl text-xs font-black text-white"
                  style={{ background: 'linear-gradient(135deg,#525ceb,#7c3aed)', boxShadow: '0 8px 24px rgba(82,92,235,0.4)' }}>
                  {language === 'en' ? "🏆 Hackathon Winner" : "🏆 فائز في الهكاثون"}
                </motion.div>
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-4 -left-4 px-3 py-2 rounded-xl text-xs font-black text-white"
                  style={{ background: 'linear-gradient(135deg,#10b981,#06b6d4)', boxShadow: '0 8px 24px rgba(16,185,129,0.4)' }}>
                  {language === 'en' ? "✦ GPA 3.82/4.0" : "✦ معدل تراكمي 3.82"}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-600">
          <span className="text-[10px] uppercase tracking-widest font-bold">{language === 'en' ? 'Scroll' : 'مرر للأسفل'}</span>
          <Icon icon="lucide:chevron-down" className="text-sm" />
        </motion.div>
      </section>

      {/* ═══ TECH TICKER ════════════════════════════════════════════ */}
      <div className="py-5 overflow-hidden" style={{ background: 'rgba(82,92,235,0.06)', borderTop: '1px solid rgba(82,92,235,0.15)', borderBottom: '1px solid rgba(82,92,235,0.15)' }}>
        <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="flex gap-10 whitespace-nowrap">
          {[...TECH, ...TECH].map((t, i) => (
            <span key={i} className="text-xs font-black uppercase tracking-widest text-gray-500 flex items-center gap-3">
              <span className="w-1 h-1 rounded-full bg-bluetheme" />{t}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ═══ STATS ══════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20" style={{ background: '#08080f' }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: '3.82', label: language === 'en' ? "Master's GPA" : "تقدير الماجستير", icon: 'lucide:brain', color: '#a855f7' },
              { num: '30+', label: language === 'en' ? 'Projects Built' : "المشاريع المكتملة", icon: 'lucide:folder-code', color: '#525ceb' },
              { num: '1st', label: language === 'en' ? 'Microsoft Hackathon' : "المركز الأول في مسابقة مايكروسوفت", icon: 'lucide:trophy', color: '#f59e0b' },
              { num: '4.9★', label: language === 'en' ? 'Client Rating' : "تقييم العملاء", icon: 'lucide:star', color: '#10b981' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                className="flex flex-col items-center text-center p-6 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 text-lg"
                  style={{ background: s.color + '15', color: s.color }}>
                  <Icon icon={s.icon} />
                </div>
                <div className="text-3xl font-black text-white mb-1" style={{ color: s.color }}>{s.num}</div>
                <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES PREVIEW ═══════════════════════════════════════ */}
      <section className="py-16 md:py-24" style={{ background: 'linear-gradient(180deg,#08080f,#0a0a15)' }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-end justify-between mb-10 flex-wrap gap-4 text-start">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2" style={{ color: '#525ceb', fontFamily: 'monospace' }}>{'// services'}</p>
              <h2 className="text-3xl md:text-4xl font-black text-white">{language === 'en' ? 'What I Build' : 'ما أبنيه'}</h2>
            </div>
            <Link to="/services" className="flex items-center gap-2 text-sm font-black uppercase tracking-wide transition-colors duration-200 hover:text-white"
              style={{ color: '#525ceb' }}>
              {language === 'en' ? 'All Services' : 'جميع الخدمات'} <Icon icon="lucide:arrow-right" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {webPackages.map((pkg, i) => {
              const colors = { 'from-purple-600 to-indigo-600': '#7c3aed', 'from-blue-600 to-cyan-600': '#2563eb', 'from-teal-500 to-emerald-500': '#10b981', 'from-orange-500 to-yellow-500': '#f97316' }
              const c = colors[pkg.color] || '#525ceb'
              return (
                <motion.div key={pkg.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -6 }}
                  className="relative p-6 rounded-3xl overflow-hidden group"
                  style={{ background: '#0d0d1a', border: `1px solid rgba(255,255,255,0.07)` }}>
                  <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${pkg.color}`} />
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl text-white mb-4"
                    style={{ background: `linear-gradient(135deg,${c},${c}aa)`, boxShadow: `0 6px 20px ${c}30` }}>
                    <Icon icon={pkg.icon} />
                  </div>
                  <h3 className="text-base font-black text-white uppercase tracking-tight mb-2">{language === 'en' ? pkg.name : pkg.arabicName}</h3>
                  <p className="text-xs text-gray-500 mb-5 leading-relaxed line-clamp-2">{language === 'en' ? pkg.description : pkg.arabicDescription}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-black" style={{ color: c }}>{pkg.price}</span>
                    <Link to={`/services/${pkg.id}`} className="flex items-center gap-1 text-xs font-black uppercase tracking-wide transition-all duration-200 group-hover:gap-2"
                      style={{ color: c }}>
                      {language === 'en' ? 'Details' : 'تفاصيل'} <Icon icon="lucide:arrow-right" className="text-sm" />
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ FEATURED PROJECTS ══════════════════════════════════════ */}
      <section className="py-16 md:py-24" style={{ background: '#0a0a15' }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-end justify-between mb-10 flex-wrap gap-4 text-start">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2" style={{ color: '#a855f7', fontFamily: 'monospace' }}>{'// projects'}</p>
              <h2 className="text-3xl md:text-4xl font-black text-white">{language === 'en' ? 'Featured Work' : 'أبرز أعمالي'}</h2>
            </div>
            <Link to="/projects" className="flex items-center gap-2 text-sm font-black uppercase tracking-wide" style={{ color: '#a855f7' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = '#a855f7'}>
              {language === 'en' ? 'All Projects' : 'جميع المشاريع'} <Icon icon="lucide:arrow-right" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl overflow-hidden"
                style={{ background: '#0d0d1a', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="h-48 overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 h-48 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full mb-3 inline-block"
                    style={{ background: 'rgba(168,85,247,0.15)', color: '#a855f7' }}>{p.technology}</span>
                  <h3 className="text-sm font-black text-white mb-2 leading-tight">{language === 'ar' ? p.arabicName : p.name}</h3>
                  <div className="flex gap-3 mt-3">
                    {p.liveDemo && <Link to={p.liveDemo} target="_blank" className="text-xs font-bold text-gray-400 hover:text-white flex items-center gap-1 transition-colors"><Icon icon="lucide:external-link" /> Demo</Link>}
                    {p.github && <Link to={p.github} target="_blank" className="text-xs font-bold text-gray-400 hover:text-white flex items-center gap-1 transition-colors"><Icon icon="mdi:github" /> Code</Link>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24" style={{ background: '#08080f' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 blur-3xl opacity-30 rounded-full" style={{ background: 'radial-gradient(circle,#525ceb,#a855f7)' }} />
              <h2 className="relative text-4xl md:text-6xl font-black text-white leading-tight">
                {language === 'en' ? <>Let's build something <span className="text-gradient">incredible</span></> : <>لنقم ببناء شيء <span className="text-gradient">مذهل</span></>}
              </h2>
            </div>
            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              {language === 'en' ? "Have a project in mind? Let's turn your vision into reality." : "هل لديك مشروع في ذهنك؟ لنحول رؤيتك إلى واقع ملموس."}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/services" className="flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-sm text-white uppercase tracking-wide hover:scale-105 transition-transform"
                style={{ background: 'linear-gradient(135deg,#525ceb,#a855f7)', boxShadow: '0 12px 40px rgba(82,92,235,0.35)' }}>
                <Icon icon="lucide:briefcase" /> {language === 'en' ? 'View Services' : 'الخدمات'}
              </Link>
              <Link to="/about" className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm text-white uppercase tracking-wide hover:scale-105 transition-all"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <Icon icon="lucide:user" /> {language === 'en' ? 'About Me' : 'من أنا'}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default Home
