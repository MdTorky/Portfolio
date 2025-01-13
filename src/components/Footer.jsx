import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react';

const Footer = ({ languageText }) => {
    return (
        <div className="text-center bg-darktheme dark:bg-theme p-5 flex flex-col items-center justify-center">
            <h3 className="text-2xl mb-2 bg-theme dark:bg-darktheme px-2 rounded-md text-darktheme dark:text-theme">{languageText.ContactMe}</h3>
            <div className='flex gap-3'>
                <Link to="http://wa.me/201554206775" target="_blank" className="footerIcon "><Icon icon="ic:baseline-whatsapp" /></Link>
                <Link to="mailto:mohamed2003torky@gmail.com" target="_blank" className="footerIcon "><Icon icon="mdi:gmail" /></Link>
                <Link to="https://github.com/MdTorky" className=" footerIcon"><Icon icon="mdi:github" /></Link>
                <Link to="https://www.linkedin.com/in/mohamed-torky-243196221/" className="footerIcon"><Icon icon="mdi:linkedin" /></Link>
                <Link to="https://www.instagram.com/mohdtorky/" className="footerIcon"><Icon icon="mdi:instagram" /></Link>
            </div>
            <div className='flex gap-3 mt-4'>
                <Link to="/" className="footerPage ">{languageText.HOME}</Link>
                <Link to="/projects" className="footerPage ">{languageText.PROJECTS}</Link>
                <Link to="/resume" className="footerPage ">{languageText.RESUME}</Link>
                <Link to="/services" className="footerPage ">{languageText.SERVICES}</Link>
                <Link to="/about" className="footerPage ">{languageText.ABOUT}</Link>
            </div>

            <Link to='/terms' className="footerPage font-bold !text-lg mt-2">Terms & Conditions</Link>
        </div>
    )
}

export default Footer