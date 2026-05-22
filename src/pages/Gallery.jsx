import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from '@iconify/react';
import { gapi } from "gapi-script";

// 1. DYNAMIC CATEGORY AND GDRIVE FOLDER SETUP (TRANSLATED LABELS & ICONS)
const CATEGORIES = [
    {
        id: 1,
        title: { en: "Logo Design", ar: "تصميم الشعارات" },
        subTitle: { en: "Brand Identities & Logo Marks", ar: "الهويات البصرية والشعارات المبتكرة" },
        icon: "lucide:palette",
        folders: [
            { name: "Default", label: { en: "All Logos", ar: "كل الشعارات" }, id: "1EKNjMI4vH6mUGmtqOwN1Xtz3h6dYqLXc" }
        ]
    },
    {
        id: 2,
        title: { en: "Poster Design", ar: "تصميم الملصقات" },
        subTitle: { en: "Events, Sessions & Academic Posters", ar: "الملصقات الدعائية، الجلسات والأعمال الأكاديمية" },
        icon: "fluent:image-border-28-regular",
        folders: [
            { name: "Events", label: { en: "Events", ar: "فعاليات" }, id: "1KTPSwY4Rop8c4qUDGUGvgoskgPpzvfKY" },
            { name: "Sessions", label: { en: "Sessions", ar: "جلسات" }, id: "1Un5X_EtmFRSkGZMZ_XW-n009jftXcoU1" },
            { name: "Academic", label: { en: "Academic", ar: "أكاديمي" }, id: "1dl_t30z1_UcGZHedrz4mhaWrtKOj6282" }
        ]
    },
    {
        id: 3,
        title: { en: "Social Media", ar: "وسائل التواصل" },
        subTitle: { en: "Posts, Stories & Instagram Grids", ar: "منشورات مربعة، ستوريز وأشكال انستغرام المكملة" },
        icon: "mdi:instagram",
        folders: [
            { name: "Square Posters", label: { en: "Square Posts", ar: "منشورات مربعة" }, id: "1Jz94ffqHkXhSfkqYcDuwxHpNOLs567iw" },
            { name: "Stories", label: { en: "Stories", ar: "ستوريز" }, id: "1UNcdKpsPFRUnxteWaCSsyXlXcv3jsvTr" },
            { name: "Instagram Grid", label: { en: "Instagram Grid", ar: "شبكة انستغرام" }, id: "13qxJoUhFu6I_EytoCxjwJMGxEkzW5tF0" }
        ]
    },
    {
        id: 4,
        title: { en: "Custom Banners", ar: "بانرات مخصصة" },
        subTitle: { en: "Horizontal & Vertical Showcase Banners", ar: "لوحات إعلانية أفقية ورأسية فائقة الدقة" },
        icon: "material-symbols:planner-banner-ad-pt",
        folders: [
            { name: "Horizontal", label: { en: "Horizontal", ar: "أفقي" }, id: "1BcEoRC9ZMbAtfmrNvOP-A5l9tmalcIU" },
            { name: "Vertical", label: { en: "Vertical", ar: "رأسي" }, id: "1XWO6CIK1IuYOLNhSmoLkB3TGBwAarguW" }
        ]
    },
    {
        id: 5,
        title: { en: "Business Cards", ar: "بطاقات العمل والنشرات" },
        subTitle: { en: "Premium Corporate Cards & Marketing Flyers", ar: "كروت عمل للشركات ونشرات تسويقية احترافية" },
        icon: "radix-icons:id-card",
        folders: [
            { name: "Cards", label: { en: "Business Cards", ar: "بطاقات عمل" }, id: "1ZyBJj4y9nabrWEC4UOw4yVaP-ftGrvsk" },
            { name: "Flyers", label: { en: "Flyers & Brochures", ar: "فلايرات ونشرات" }, id: "1i_wZKzXyyAZsTSLEzJnjvPd2AcgJn0jz" }
        ]
    },
    {
        id: 6,
        title: { en: "T-Shirt Design", ar: "تصميم التيشيرتات" },
        subTitle: { en: "Custom Merch & Typography Tees", ar: "تصميمات أزياء ومنتجات تجارية مخصصة" },
        icon: "mdi:tshirt-crew",
        folders: [
            { name: "Default", label: { en: "All Apparel", ar: "تصاميم الملابس" }, id: "11-qxLSR0LSL_AA2A35qhYQNjsKYXlUwX" }
        ]
    }
];

// Clean file names for premium layout presentation
const cleanFileName = (name) => {
    return name
        .replace(/\.[^/.]+$/, "") // remove extension
        .replace(/[_-]/g, " ")     // replace dashes and underscores with spaces
        .replace(/\b\w/g, c => c.toUpperCase()); // capitalize words
};

const Gallery = ({ language, languageText }) => {
    // 2. CENTRAL STATE & LOCALSTORAGE PERSISTENCE
    const [activeCategory, setActiveCategory] = useState(() => {
        const saved = localStorage.getItem('galleryActiveCategory');
        if (saved) {
            const parsed = parseInt(saved, 10);
            return CATEGORIES.find(c => c.id === parsed) || CATEGORIES[0];
        }
        return CATEGORIES[0];
    });

    const [activeSubFolder, setActiveSubFolder] = useState("All");
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isGapiInitialized, setIsGapiInitialized] = useState(false);

    // Cache to eliminate redundant network roundtrips on tab switching
    const [imagesCache, setImagesCache] = useState({});

    // Lightbox overlays state
    const [activeImageIndex, setActiveImageIndex] = useState(null);
    const [zoom, setZoom] = useState(1);
    const [copied, setCopied] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    // Persist category selection
    useEffect(() => {
        localStorage.setItem('galleryActiveCategory', activeCategory.id.toString());
        setActiveSubFolder("All");
    }, [activeCategory]);

    // 3. INITIALIZE GOOGLE DRIVE API ONCE ON CONSOLE MOUNT
    useEffect(() => {
        let mounted = true;

        const initGapi = () => {
            if (window.gapi && window.gapi.client) {
                window.gapi.client
                    .init({
                        apiKey: process.env.REACT_APP_API_KEY,
                        clientId: process.env.REACT_CLIENT_ID,
                        scope: process.env.REACT_APP_SCOPES,
                        discoveryDocs: [
                            "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
                        ],
                    })
                    .then(() => {
                        if (mounted) {
                            setIsGapiInitialized(true);
                        }
                    })
                    .catch(err => {
                        console.error("GAPI Init Error:", err);
                        if (mounted) {
                            setError(language === 'ar' ? "خطأ في تهيئة النظام الفني. يرجى تحديث الصفحة." : "GAPI initialization error. Please refresh the page.");
                        }
                    });
            }
        };

        if (window.gapi) {
            gapi.load("client:auth2", initGapi);
        } else {
            setError(language === 'ar' ? "فشل تحميل خدمة Google API. يرجى التحقق من اتصالك." : "Google API Script failed to load. Please check your connection.");
        }

        return () => {
            mounted = false;
        };
    }, [language]);

    // 4. CENTRALIZED FETCHER ENGINE
    useEffect(() => {
        if (!isGapiInitialized) return;

        const loadCategoryData = async () => {
            // Check cache first for rapid instant-render
            if (imagesCache[activeCategory.id]) {
                setImages(imagesCache[activeCategory.id]);
                return;
            }

            setLoading(true);
            setError(null);
            try {
                const listImagesFromFolder = async (folderId, folderName) => {
                    const response = await window.gapi.client.drive.files.list({
                        q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
                        pageSize: 100,
                        fields: "files(id, name, thumbnailLink)",
                    });
                    const files = response.result.files || [];
                    // Sort alphanumerically
                    files.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base', numeric: true }));
                    
                    return files.map(f => ({
                        ...f,
                        folderName,
                        // Pristine original high-res direct viewing URL bypassing fuzzy Drive thumbnails
                        streamUrl: `https://docs.google.com/uc?export=view&id=${f.id}`,
                        downloadUrl: `https://docs.google.com/uc?export=download&id=${f.id}`
                    }));
                };

                const promises = activeCategory.folders.map(folder =>
                    listImagesFromFolder(folder.id, folder.name)
                );

                const results = await Promise.all(promises);
                const flattened = results.flat();

                // Save to cache memory
                setImagesCache(prev => ({
                    ...prev,
                    [activeCategory.id]: flattened
                }));

                setImages(flattened);
            } catch (err) {
                console.error("GDrive Fetch Error:", err);
                setError(language === 'ar' ? "فشل تحميل المجموعات الفنية. يرجى التحقق من اتصال الإنترنت." : "Could not fetch artwork. Please check your internet connection.");
            } finally {
                setLoading(false);
            }
        };

        loadCategoryData();
    }, [activeCategory, isGapiInitialized, imagesCache, language]);

    // Filtered image stream matching selected sub-tab
    const filteredImages = activeSubFolder === "All"
        ? images
        : images.filter(img => img.folderName === activeSubFolder);

    // 5. LIGHTBOX HUD CONTROLS ACTIONS
    const handlePrev = () => {
        setZoom(1);
        setActiveImageIndex(prev => (prev === 0 ? filteredImages.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setZoom(1);
        setActiveImageIndex(prev => (prev === filteredImages.length - 1 ? 0 : prev + 1));
    };

    const handleCloseLightbox = () => {
        setActiveImageIndex(null);
        setZoom(1);
        setIsPlaying(false);
    };

    // Keyboard navigation triggers
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (activeImageIndex === null) return;
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "ArrowRight") handleNext();
            if (e.key === "Escape") handleCloseLightbox();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activeImageIndex, filteredImages]);

    // Slideshow interval engine
    useEffect(() => {
        let interval;
        if (isPlaying && activeImageIndex !== null) {
            interval = setInterval(() => {
                handleNext();
            }, 4000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, activeImageIndex]);

    const handleCopyLink = (url) => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Framer motion layout transitions
    const sidebarVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 120, damping: 18 } }
    };

    const gridContainerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
    };

    const gridItemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
    };

    return (
        <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transitions">
            
            {/* STUNNING HEADER BLOCK WITH GRADIENT GLOW */}
            <div className="relative text-center mb-16 z-10">
                <div className="absolute inset-0 -top-12 flex items-center justify-center filter blur-3xl opacity-30 select-none pointer-events-none">
                    <span className="w-[30%] aspect-square bg-gradient-to-tr from-bluetheme to-purple-500 rounded-full" />
                </div>
                
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl sm:text-6xl font-black text-slate-800 dark:text-white uppercase tracking-tight leading-tight"
                >
                    {language === 'ar' ? languageText.MyWork : "Artistic Canvas"}
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="mt-3 text-xs sm:text-sm text-slate-500 dark:text-gray-400 font-light uppercase tracking-widest max-w-xl mx-auto"
                >
                    {language === 'ar' 
                        ? "استكشف مجموعتي المتنوعة من تصاميم الجرافيك المذهلة والهويات البصرية الحديثة" 
                        : "Discover modern visual identities, creative layouts, and custom illustrations"}
                </motion.p>
            </div>

            {/* SPLIT SCREEN CANVAS VIEW */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative items-start">
                
                {/* 🧭 DESKTOP GLASSMORPHIC SIDEBAR */}
                <motion.aside 
                    variants={sidebarVariants}
                    initial="hidden"
                    animate="visible"
                    className="hidden lg:flex flex-col w-80 sticky top-32 glass-morphism bg-white/40 dark:bg-slate-900/30 border border-slate-200/50 dark:border-white/5 rounded-3xl p-6 shadow-2xl z-20"
                >
                    <div className="flex items-center gap-3.5 mb-8 pb-4 border-b border-slate-200 dark:border-white/5">
                        <div className="w-10 h-10 rounded-2xl bg-bluetheme/10 border border-bluetheme/20 flex items-center justify-center text-bluetheme text-lg">
                            <Icon icon="lucide:palette" className="animate-pulse" />
                        </div>
                        <div className="text-start">
                            <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">
                                {language === 'ar' ? "معرض التصاميم" : "Creative Hub"}
                            </h3>
                            <span className="text-[9px] text-gray-500 dark:text-gray-400 font-mono tracking-widest uppercase">
                                {images.length} {language === 'ar' ? "عمل تصميمي" : "Rendered Arts"}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-3.5 text-start">
                        {CATEGORIES.map(category => {
                            const isActive = activeCategory.id === category.id;
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category)}
                                    className={`w-full group px-4 py-3.5 rounded-2xl flex items-center gap-4 transition-all duration-300 relative border ${
                                        isActive
                                            ? 'bg-bluetheme border-bluetheme text-white shadow-xl shadow-bluetheme/25 scale-[1.02]'
                                            : 'bg-white/10 dark:bg-white/5 border-slate-200/40 dark:border-white/5 text-slate-600 dark:text-gray-400 hover:border-bluetheme/30 dark:hover:border-bluetheme/20 hover:text-slate-800 dark:hover:text-white'
                                    }`}
                                >
                                    <Icon icon={category.icon} className={`text-xl ${isActive ? 'text-white' : 'text-bluetheme'}`} />
                                    <div className="flex flex-col">
                                        <span className="text-[13px] font-black uppercase tracking-wide">
                                            {language === 'ar' ? category.title.ar : category.title.en}
                                        </span>
                                        <span className={`text-[8px] mt-0.5 tracking-tight line-clamp-1 font-light ${isActive ? 'text-white/80' : 'text-slate-400 dark:text-slate-500'}`}>
                                            {language === 'ar' ? category.subTitle.ar : category.subTitle.en}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </motion.aside>

                {/* 📱 MOBILE STICKY HORIZONTAL SWIPING TABS */}
                <div className="lg:hidden w-full sticky top-20 bg-theme/80 dark:bg-darktheme/80 backdrop-blur-xl z-20 py-4 border-b border-slate-200 dark:border-white/5 -mx-4 px-4 overflow-x-auto scrollbar-none flex gap-3 select-none">
                    {CATEGORIES.map(category => {
                        const isActive = activeCategory.id === category.id;
                        return (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category)}
                                className={`flex-shrink-0 px-4 py-2.5 rounded-2xl flex items-center gap-2 border text-xs font-black uppercase tracking-wider transition-all ${
                                    isActive
                                        ? 'bg-bluetheme border-bluetheme text-white shadow-lg'
                                        : 'bg-white/30 dark:bg-slate-900/30 border-slate-200/50 dark:border-white/5 text-slate-700 dark:text-gray-400'
                                }`}
                            >
                                <Icon icon={category.icon} />
                                {language === 'ar' ? category.title.ar : category.title.en}
                            </button>
                        );
                    })}
                </div>

                {/* 🎨 GALLERY CANVAS GRID */}
                <main className="flex-grow w-full">
                    
                    {/* Header Info Banner & Subfolder Filters */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200 dark:border-white/5 text-start">
                        <div>
                            <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white uppercase tracking-wide">
                                {language === 'ar' ? activeCategory.title.ar : activeCategory.title.en}
                            </h2>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-xl font-light">
                                {language === 'ar' ? activeCategory.subTitle.ar : activeCategory.subTitle.en}
                            </p>
                        </div>

                        {/* SUBFOLDER TOGGLES (Rendering if Category has multiple subfolders) */}
                        {activeCategory.folders.length > 1 && (
                            <div className="flex bg-slate-200/60 dark:bg-slate-950/40 p-1 border border-slate-200 dark:border-white/5 rounded-2xl gap-1 overflow-x-auto self-start md:self-auto scrollbar-none">
                                <button
                                    onClick={() => setActiveSubFolder("All")}
                                    className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex-shrink-0 ${
                                        activeSubFolder === "All"
                                            ? 'bg-bluetheme text-white'
                                            : 'text-slate-500 hover:text-slate-800 dark:text-gray-400 hover:dark:text-white'
                                    }`}
                                >
                                    {language === 'ar' ? "الكل" : "All"}
                                </button>
                                {activeCategory.folders.map(folder => (
                                    <button
                                        key={folder.id}
                                        onClick={() => setActiveSubFolder(folder.name)}
                                        className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex-shrink-0 ${
                                            activeSubFolder === folder.name
                                                ? 'bg-bluetheme text-white'
                                                : 'text-slate-500 hover:text-slate-800 dark:text-gray-400 hover:dark:text-white'
                                        }`}
                                    >
                                        {language === 'ar' ? folder.label.ar : folder.label.en}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* SKELETON SCREEN PULSE SHIMMERING (LOADING STATE) */}
                    {loading ? (
                        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="break-inside-avoid w-full rounded-3xl bg-white/40 dark:bg-slate-900/30 border border-slate-200/50 dark:border-white/5 p-4 flex flex-col gap-3 shadow-md animate-pulse">
                                    <div className={`w-full bg-slate-300 dark:bg-slate-800 rounded-2xl ${
                                        i % 3 === 0 ? 'aspect-[4/5]' : i % 3 === 1 ? 'aspect-[1/1]' : 'aspect-[16/10]'
                                    }`} />
                                    <div className="h-4 bg-slate-300 dark:bg-slate-800 rounded-lg w-[70%]" />
                                    <div className="h-3 bg-slate-300 dark:bg-slate-800 rounded-lg w-[40%]" />
                                </div>
                            ))}
                        </div>
                    ) : error ? (
                        /* ERROR CONTEXT */
                        <div className="flex flex-col items-center justify-center text-center py-20 bg-red-500/5 border border-red-500/10 rounded-3xl p-8 max-w-lg mx-auto">
                            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 text-xl mb-4">
                                <Icon icon="lucide:cloud-lightning" />
                            </div>
                            <h4 className="text-sm font-bold text-slate-800 dark:text-white uppercase mb-2">
                                {language === 'ar' ? "فشل الاتصال البرمجي" : "Cloud Connection Timeout"}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 font-light">{error}</p>
                            <button 
                                onClick={() => window.location.reload()}
                                className="px-5 py-2.5 bg-bluetheme text-white font-black text-xs uppercase tracking-widest rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg"
                            >
                                {language === 'ar' ? "إعادة المحاولة" : "Retry Connection"}
                            </button>
                        </div>
                    ) : filteredImages.length === 0 ? (
                        /* EMPTY STATE */
                        <div className="flex flex-col items-center justify-center text-center py-24 bg-white/10 dark:bg-slate-900/10 border border-slate-200 dark:border-white/5 rounded-3xl p-8">
                            <Icon icon="lucide:image-off" className="text-5xl text-gray-400 dark:text-gray-600 mb-4" />
                            <h3 className="text-base font-black text-slate-800 dark:text-white uppercase">
                                {language === 'ar' ? "لا توجد أعمال فنية فاعلة" : "No artwork active"}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-light">
                                {language === 'ar' ? "لم يتم العثور على صور في هذا القسم حالياً." : "No visual elements discovered inside this directory currently."}
                            </p>
                        </div>
                    ) : (
                        /* 📱 MASONRY COLUMNS DISPLAY */
                        <motion.div 
                            variants={gridContainerVariants}
                            initial="hidden"
                            animate="visible"
                            className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
                        >
                            {filteredImages.map((file, idx) => (
                                <motion.div
                                    key={file.id}
                                    variants={gridItemVariants}
                                    onClick={() => {
                                        setActiveImageIndex(idx);
                                        setZoom(1);
                                    }}
                                    className="break-inside-avoid w-full group relative rounded-3xl overflow-hidden cursor-pointer bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-md hover:shadow-2xl hover:border-bluetheme/30 dark:hover:border-bluetheme/30 transition-all duration-300"
                                >
                                    {/* Preview container */}
                                    <div className="relative overflow-hidden w-full bg-[#07070f] select-none">
                                        <img 
                                            src={file.thumbnailLink.replace(/=s220$/, "=s600")} // Request slightly higher res preview for grid layout
                                            alt={file.name} 
                                            className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        
                                        {/* HOVER GLASS OVERLAY */}
                                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[4px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <motion.div 
                                                whileHover={{ scale: 1.1 }}
                                                className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 backdrop-blur-md flex items-center justify-center text-white text-xl shadow-lg"
                                            >
                                                <Icon icon="lucide:maximize-2" className="animate-pulse" />
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Caption detail */}
                                    <div className="p-4 bg-white dark:bg-slate-900/60 flex items-center justify-between border-t border-slate-50 dark:border-white/5 text-start">
                                        <div className="truncate max-w-[80%]">
                                            <h4 className="text-[13px] font-black text-slate-800 dark:text-white truncate">
                                                {cleanFileName(file.name)}
                                            </h4>
                                            {activeCategory.folders.length > 1 && (
                                                <span className="text-[9px] text-bluetheme uppercase tracking-wider font-mono">
                                                    {file.folderName}
                                                </span>
                                            )}
                                        </div>
                                        <div className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 dark:text-gray-500 group-hover:text-bluetheme group-hover:bg-bluetheme/10 transition-colors">
                                            <Icon icon="lucide:arrow-up-right" className="text-xs" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </main>
            </div>

            {/* 🎥 BREATHTAKING LIGHTBOX MODAL WITH ZOOM & SLIDESHOW ENGINES */}
            <AnimatePresence>
                {activeImageIndex !== null && filteredImages[activeImageIndex] && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 backdrop-blur-2xl bg-black/95 flex flex-col justify-between p-4 sm:p-6 overflow-hidden select-none"
                    >
                        {/* A. LIGHTBOX HEADER BAR */}
                        <div className="w-full flex items-center justify-between gap-4 py-2 border-b border-white/10 z-30">
                            <div className="text-start">
                                <h2 className="text-white text-sm sm:text-base font-black tracking-wide truncate max-w-[200px] sm:max-w-md">
                                    {cleanFileName(filteredImages[activeImageIndex].name)}
                                </h2>
                                <span className="text-[9px] text-bluetheme uppercase tracking-widest font-bold">
                                    {language === 'ar' ? activeCategory.title.ar : activeCategory.title.en} {activeCategory.folders.length > 1 && `// ${filteredImages[activeImageIndex].folderName}`}
                                </span>
                            </div>

                            {/* Monospaced Count Tracker HUD */}
                            <div className="text-xs font-mono font-bold bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-gray-400">
                                {String(activeImageIndex + 1).padStart(2, '0')} <span className="text-white/20">/</span> {String(filteredImages.length).padStart(2, '0')}
                            </div>

                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={handleCloseLightbox}
                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white/15 hover:scale-105 active:scale-95 transition-all"
                                >
                                    <Icon icon="lucide:x" className="text-lg" />
                                </button>
                            </div>
                        </div>

                        {/* B. LIGHTBOX CANVAS STAGE (ZOOM & PAN ENABLED VIA DRAG GESTURES) */}
                        <div className="flex-grow w-full relative flex items-center justify-center overflow-hidden py-4">
                            
                            {/* Backdrop watermark category symbol */}
                            <div className="absolute inset-0 flex items-center justify-center filter blur-3xl opacity-10 pointer-events-none select-none">
                                <Icon icon={activeCategory.icon} className="text-[40vh] text-white" />
                            </div>

                            {/* Interactive Zoomable Slide Container */}
                            <div className="relative w-full h-full flex items-center justify-center">
                                <motion.div 
                                    key={activeImageIndex}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="relative max-w-full max-h-[75vh]"
                                >
                                    <motion.img
                                        src={filteredImages[activeImageIndex].streamUrl}
                                        alt={filteredImages[activeImageIndex].name}
                                        drag={zoom > 1}
                                        dragConstraints={{
                                            left: -200 * (zoom - 1),
                                            right: 200 * (zoom - 1),
                                            top: -150 * (zoom - 1),
                                            bottom: 150 * (zoom - 1)
                                        }}
                                        animate={{ scale: zoom }}
                                        transition={{ type: "spring", stiffness: 280, damping: 24 }}
                                        className={`max-w-full max-h-[72vh] object-contain rounded-2xl shadow-2xl ${
                                            zoom > 1 ? 'cursor-grab active:cursor-grabbing' : ''
                                        }`}
                                    />
                                </motion.div>
                            </div>

                            {/* Floating side navigations on Desktop */}
                            <button
                                onClick={handlePrev}
                                className="hidden sm:flex absolute left-4 w-12 h-20 rounded-2xl bg-white/5 border border-white/5 text-white items-center justify-center hover:bg-white/15 active:scale-95 transition-all z-20"
                            >
                                <Icon icon="lucide:chevron-left" className="text-2xl" />
                            </button>
                            <button
                                onClick={handleNext}
                                className="hidden sm:flex absolute right-4 w-12 h-20 rounded-2xl bg-white/5 border border-white/5 text-white items-center justify-center hover:bg-white/15 active:scale-95 transition-all z-20"
                            >
                                <Icon icon="lucide:chevron-right" className="text-2xl" />
                            </button>
                        </div>

                        {/* C. LIGHTBOX FOOTER ACTION HUD */}
                        <div className="w-full flex flex-col gap-4 sm:flex-row items-center justify-between py-3 border-t border-white/10 z-30">
                            
                            {/* Slideshow and Share triggers */}
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all ${
                                        isPlaying 
                                            ? 'bg-purple-600 text-white shadow-lg animate-pulse'
                                            : 'bg-white/5 border border-white/10 text-white hover:bg-white/15'
                                    }`}
                                >
                                    <Icon icon={isPlaying ? "lucide:pause-circle" : "lucide:play-circle"} className="text-base" />
                                    {isPlaying ? (language === 'ar' ? "إيقاف العرض" : "Pause Slides") : (language === 'ar' ? "بدء العرض" : "Play Slides")}
                                </button>
                                
                                <button
                                    onClick={() => handleCopyLink(filteredImages[activeImageIndex].streamUrl)}
                                    className="px-4 py-2 rounded-xl text-xs bg-white/5 border border-white/10 text-white hover:bg-white/15 transition-all flex items-center gap-2 relative"
                                >
                                    <Icon icon="lucide:link-2" />
                                    {copied ? (language === 'ar' ? "تم النسخ!" : "Copied!") : (language === 'ar' ? "نسخ الرابط" : "Share Link")}
                                    
                                    <AnimatePresence>
                                        {copied && (
                                            <motion.span 
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: -24 }}
                                                exit={{ opacity: 0 }}
                                                className="absolute left-1/2 -translate-x-1/2 bg-bluetheme text-white text-[9px] font-black px-2 py-0.5 rounded shadow-lg uppercase"
                                            >
                                                {language === 'ar' ? "جاهز!" : "Ready!"}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </button>
                            </div>

                            {/* Center Active Zoom Controller Bar */}
                            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full z-40">
                                <button 
                                    onClick={() => setZoom(prev => Math.max(1, prev - 0.25))}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <Icon icon="lucide:zoom-out" />
                                </button>
                                <input 
                                    type="range"
                                    min="1"
                                    max="3"
                                    step="0.1"
                                    value={zoom}
                                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                                    className="w-24 h-1 bg-white/20 rounded-full appearance-none outline-none accent-bluetheme cursor-pointer"
                                />
                                <button 
                                    onClick={() => setZoom(prev => Math.min(3, prev + 0.25))}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <Icon icon="lucide:zoom-in" />
                                </button>
                                <span className="text-[10px] font-mono text-gray-400 w-8 text-center">{Math.round(zoom * 100)}%</span>
                            </div>

                            {/* Download CTAs */}
                            <a
                                href={filteredImages[activeImageIndex].downloadUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-5 py-2.5 bg-gradient-to-r from-bluetheme to-purple-600 hover:from-bluetheme hover:to-purple-700 text-white rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-[1.03] active:scale-[0.97] transition-all shadow-lg"
                            >
                                <Icon icon="lucide:download-cloud" className="text-base animate-bounce" />
                                {language === 'ar' ? "تحميل عالي الدقة" : "Download Ultra HD"}
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default Gallery;
