import React, { useState } from 'react';
import lightLogo from '../img/Light logo.png';
import darkLogo from '../img/Dark Logo.png';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { easeInOut, motion, MotionConfig } from "framer-motion";

const Navbar = ({ toggleDarkMode, darkMode, toggleLanguage, language, languageText }) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const VARIANTS = {
        top: {
            open: {
                rotate: ["0deg", "0deg", "45deg"],
                top: ["35%", "50%", "50%"],
            },
            closed: {
                rotate: ["45deg", "0deg", "0deg"],
                top: ["50%", "50%", "35%"],
            },
        },
        middle: {
            open: {
                rotate: ["0deg", "0deg", "-45deg"],
            },
            closed: {
                rotate: ["-45deg", "0deg", "0deg"],
            },
        },
        bottom: {
            open: {
                rotate: ["0deg", "0deg", "45deg"],
                bottom: ["35%", "50%", "50%"],
                left: "50%",
            },
            closed: {
                rotate: ["45deg", "0deg", "0deg"],
                bottom: ["50%", "50%", "35%"],
                left: "calc(50% + 10px)",
            },
        },
    };

    const itemVariants = {
        open: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 300, damping: 24 }
        },
        closed: { opacity: 0, y: -20, transition: { duration: 0.2 } }
    };



    const navVariant = {
        hidden: {
            y: -100,
        },
        visible: {
            y: 0,
            transition: {
                delay: 0.2,
                type: "spring",
                stiffness: 120,
            }
        }
    }

    const darkVariant = (darkMode) => ({
        hover: {
            scale: 1.2,
            boxShadow: darkMode
                ? '0px 0px 08px 6px rgba(100 116 139,0.7)'
                : '0px 0px 08px 6px rgba(82,92,235,0.7)',
            transition: {
                // type: "spring",
                duration: 1,
                delay: 0,
            }
        }
    });

    const languageVariant = (darkMode) => ({
        hover: {
            scale: 1.2,
            boxShadow: darkMode
                ? '0px 0px 08px 6px rgba(235,179,8,0.7)'
                : '0px 0px 08px 6px rgba(226 232 240,0.7)',
            transition: {
                // type: "spring",
                duration: 1,
                delay: 0,
            }
        }
    });


    const pathVariant = {
        hidden: {
            opacity: 0,
            pathLength: 0
        },
        visible: {
            opacity: 1,
            pathLength: 1,
            transition: {
                duration: 1,
                ease: "easeInOut"
            }
        }
    }

    return (
        <motion.nav
            variants={navVariant}
            initial="hidden"
            animate="visible"
            className="flex px-10  items-center w-full justify-between md:justify-evenly shadow-lg md:shadow-none  bg-theme dark:bg-darktheme  sticky top-0 z-50">
            <Link to="/"><motion.img
                initial={{
                    scale: 1,
                    skew: 0,
                }}
                whileHover={{
                    scale: 2.5,
                    skew: '-4deg,-4deg',
                    transition: {
                        duration: 0.5,
                    }
                }}
                animate={{
                    scale: 1,
                    skew: 0,
                    transition: {
                        duration: 0.5,
                    }
                }}
                src={darkMode ? darkLogo : lightLogo} alt="" className="w-auto h-20 " /></Link>
            <div className="hidden md:flex text-2xl justify-between text-darktheme dark:text-theme gap-5 items-center">
                <Link to="/projects" className={`${location.pathname === "/projects" ? "active" : "navbar-hover"}`}>{languageText.PROJECTS}</Link>
                <Link to="/resume" className={`${location.pathname === "/resume" ? "active" : "navbar-hover"}`}>{languageText.RESUME}</Link>
                <Link to="/services" className={`${location.pathname === "/services" ? "active" : "navbar-hover"}`}>{languageText.SERVICES}</Link>
                <Link to="/about" className={`${location.pathname === "/about" ? "active" : "navbar-hover"}`}>{languageText.ABOUT}</Link>
                <div className="bg-darktheme dark:bg-theme px-3 py-2 flex text-theme text-3xl items-center gap-1 rounded-md">
                    <Link to="https://github.com/MdTorky" className="navbar-hover-icons"><Icon icon="mdi:github" /></Link>
                    <Link to="https://www.linkedin.com/in/mohamed-torky-243196221/" className="navbar-hover-icons"><Icon icon="mdi:linkedin" /></Link>
                    <Link to="https://www.instagram.com/mohdtorky/" className="navbar-hover-icons"><Icon icon="mdi:instagram" /></Link>
                </div>


                <div className="flex gap-1">
                    <motion.button
                        variants={darkVariant(darkMode)}
                        whileHover="hover"
                        className="bg-bluetheme dark:bg-yellow-500 px-3 py-2 flex rounded-md dark:text-theme text-theme text-3xl items-center gap-1 hover:text-darktheme"><Icon icon={`${darkMode ? "bx:sun" : "akar-icons:moon-fill"}`} onClick={toggleDarkMode} />
                    </motion.button>

                    <motion.button
                        variants={languageVariant(darkMode)}
                        whileHover="hover"
                        // className="bg-darktheme dark:bg-yellow-500 px-3 py-2 flex rounded-md dark:text-theme text-theme text-3xl items-center gap-1 "><Icon icon={`${language == "en" ? "iconoir:ar-tag" : "icon-park-outline:english"}`} onClick={toggleLanguage} />
                        className="bg-slate-500 dark:bg-slate-200 px-3 py-2 flex rounded-md dark:text-darktheme text-theme text-3xl items-center gap-1 "><Icon icon={`${language == "en" ? "uil:letter-english-a" : "ri:english-input"}`} onClick={toggleLanguage} />
                    </motion.button>
                </div>
            </div>
            {/* <div className="md:hidden flex items-center">
                <button onClick={toggleMenu} className="focus:outline-none text-3xl text-darktheme dark:text-theme">
                    {!isOpen && (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <motion.path
                            variants={pathVariant}
                            fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 6h10M4 12h16M7 12h13M7 18h10" /></svg>)}
                    {isOpen && (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <motion.path
                            variants={pathVariant}
                            fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" /></svg>)}
                    <Icon icon={`${isOpen ? 'majesticons:minus' : 'tabler:menu-4'}`} className="text-3xl text-darktheme dark:text-theme" />
                </button>
            </div> */}


            <MotionConfig
                transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                }}
            >
                <motion.button
                    initial={false}
                    animate={isOpen ? "open" : "closed"}
                    onClick={() => toggleMenu((pv) => !pv)}
                    className="relative md:hidden h-20 scale-75 transition-colors"
                >
                    <motion.span
                        variants={VARIANTS.top}
                        className="absolute h-1 w-10 dark:bg-theme bg-darktheme"
                        style={{ y: "-50%", left: "50%", x: "-50%", top: "35%" }}
                    />
                    <motion.span
                        variants={VARIANTS.middle}
                        className="absolute h-1 w-10 dark:bg-theme bg-darktheme"
                        style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
                    />
                    <motion.span
                        variants={VARIANTS.bottom}
                        className="absolute h-1 w-5 dark:bg-theme bg-darktheme"
                        style={{
                            x: "-50%",
                            y: "50%",
                            bottom: "35%",
                            left: "calc(50% + 10px)",
                        }}
                    />
                </motion.button>
            </MotionConfig>

            <motion.div
                variants={{
                    open: {
                        clipPath: "inset(0% 0% 0% 0% round 10px)",
                        transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.7,
                            delayChildren: 0.3,
                            staggerChildren: 0.05
                        }
                    },
                    closed: {
                        clipPath: "inset(10% 50% 90% 50% round 10px)",
                        transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.3
                        }
                    }
                }}
                initial={false}
                animate={isOpen ? "open" : "closed"}
                className="absolute top-20 left-0 right-0 w-full mx-auto dark:bg-theme bg-darktheme flex flex-col items-center gap-3 text-theme dark:text-darktheme z-50"
            >



                <Link to="/" onClick={toggleMenu}><motion.img variants={itemVariants} src={!darkMode ? darkLogo : lightLogo} alt="" className="w-auto h-20" /></Link>

                <Link to="/projects" onClick={toggleMenu}><motion.div className={`${location.pathname === "/projects" ? "active" : "navbar-hover"}`} variants={itemVariants}>
                    {languageText.PROJECTS}</motion.div></Link>
                <Link to="/resume" onClick={toggleMenu}><motion.div className={`${location.pathname === "/resume" ? "active" : "navbar-hover"}`} variants={itemVariants}>{languageText.RESUME}</motion.div></Link>
                <Link to="/services" onClick={toggleMenu}><motion.div className={`${location.pathname === "/services" ? "active" : "navbar-hover"}`} variants={itemVariants}>{languageText.SERVICES}</motion.div></Link>
                <Link to="/about" onClick={toggleMenu}><motion.div className={`${location.pathname === "/about" ? "active" : "navbar-hover"}`} variants={itemVariants}>{languageText.ABOUT}</motion.div></Link>
                <motion.div variants={itemVariants} className="flex gap-3 py-2">
                    <Link to="https://github.com/MdTorky" className="text-2xl navbar-hover"><Icon icon="mdi:github" /></Link>
                    <Link to="https://www.linkedin.com/in/mohamed-torky-243196221/" className="text-2xl navbar-hover"><Icon icon="mdi:linkedin" /></Link>
                    <Link to="https://www.instagram.com/mohdtorky/" className="text-2xl navbar-hover"><Icon icon="mdi:instagram" /></Link>
                    <button className='text-2xl navbar-hover text-bluetheme dark:text-yellow-500 hover:text-theme dark:hover:text-darktheme'><Icon icon={`${darkMode ? "bx:sun" : "akar-icons:moon-fill"}`} onClick={toggleDarkMode} /></button>
                    <button className="text-darktheme p-2 bg-theme rounded-md dark:text-theme dark:bg-darktheme text-2xl hover:text-bluetheme"><Icon icon={`${language == "en" ? "uil:letter-english-a" : "ri:english-input"}`} onClick={toggleLanguage} /></button>
                </motion.div>

            </motion.div>

        </motion.nav>
    );
}

export default Navbar;
