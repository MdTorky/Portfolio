import React, { useState } from 'react';
import lightLogo from '../../img/Light logo.png';
import darkLogo from '../../img/Dark Logo.png';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { motion } from "framer-motion";

const Navbar = ({ toggleDarkMode, darkMode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="flex px-10 items-center w-full justify-between md:justify-evenly shadow-lg md:shadow-none ">
            <Link to="/"><img src={darkMode ? darkLogo : lightLogo} alt="" className="w-auto h-20" /></Link>
            <div className="hidden md:flex text-2xl justify-between text-darktheme dark:text-theme gap-5 items-center">
                <Link to="/projects" className={`${location.pathname === "/projects" ? "active" : "navbar-hover"}`}>PROJECTS</Link>
                <Link to="/resume" className={`${location.pathname === "/resume" ? "active" : "navbar-hover"}`}>RESUME</Link>
                <Link to="/about" className={`${location.pathname === "/about" ? "active" : "navbar-hover"}`}>ABOUT</Link>
                <div className="bg-darktheme dark:bg-theme px-3 py-2 flex text-theme text-3xl items-center gap-1 rounded-md">
                    <Link to="https://github.com/MdTorky" className="navbar-hover-icons"><Icon icon="mdi:github" /></Link>
                    <Link to="https://www.linkedin.com/in/mohamed-torky-243196221/" className="navbar-hover-icons"><Icon icon="mdi:linkedin" /></Link>
                    <Link to="https://www.instagram.com/mohdtorky/" className="navbar-hover-icons"><Icon icon="mdi:instagram" /></Link>
                </div>

                <button className="transition bg-bluetheme dark:bg-yellow-500 px-3 py-2 flex rounded-md dark:text-theme text-theme text-3xl items-center gap-1 hover:text-darktheme"><Icon icon={`${darkMode ? "bx:sun" : "akar-icons:moon-fill"}`} onClick={toggleDarkMode} /></button>

            </div>
            <div className="md:hidden flex items-center">
                <button onClick={toggleMenu} className="focus:outline-none">
                    <Icon icon={`${isOpen ? 'majesticons:minus' : 'tabler:menu-4'}`} className="text-3xl text-darktheme dark:text-theme" />
                </button>
            </div>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="absolute top-20 left-0 right-0 w-full mx-auto dark:bg-theme bg-darktheme flex flex-col items-center gap-3 text-theme dark:text-darktheme z-50"
                >
                    <Link to="/"><img src={!darkMode ? darkLogo : lightLogo} alt="" className="w-auto h-20" /></Link>

                    <Link to="/projects" className={`${location.pathname === "/projects" ? "active" : "navbar-hover"}`} onClick={toggleMenu}>PROJECTS</Link>
                    <Link to="/resume" className={`${location.pathname === "/resume" ? "active" : "navbar-hover"}`} onClick={toggleMenu}>RESUME</Link>
                    <Link to="/about" className={`${location.pathname === "/about" ? "active" : "navbar-hover"}`} onClick={toggleMenu}>ABOUT</Link>
                    <div className="flex gap-3 py-2">
                        <Link to="https://github.com/MdTorky" className="text-2xl navbar-hover"><Icon icon="mdi:github" /></Link>
                        <Link to="https://www.linkedin.com/in/mohamed-torky-243196221/" className="text-2xl navbar-hover"><Icon icon="mdi:linkedin" /></Link>
                        <Link to="https://www.instagram.com/mohdtorky/" className="text-2xl navbar-hover"><Icon icon="mdi:instagram" /></Link>
                        <button className='text-2xl'><Icon icon={`${darkMode ? "bx:sun" : "akar-icons:moon-fill"}`} onClick={toggleDarkMode} /></button>
                    </div>

                </motion.div>
            )}
        </nav>
    );
}

export default Navbar;
