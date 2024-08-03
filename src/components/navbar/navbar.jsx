import React from 'react'
import logo from '../../img/Logo2.png'
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Navbar = () => {
    const location = useLocation();

    return (
        <div>
            <nav className="flex px-10 items-center w-full justify-evenly">
                <Link to="/"><img src={logo} alt="" className="w-20 h-20" /></Link>
                <div className='text-2xl flex justify-between text-darktheme gap-5 items-center'>
                    <Link className={`${location.pathname === "/projects" ? "active" : "navbar-hover"}`}>PROJECTS</Link>
                    <Link className={`${location.pathname === "/resume" ? "active" : "navbar-hover"}`}>RESUME</Link>
                    <Link className={`${location.pathname === "/about" ? "active" : "navbar-hover"}`}>ABOUT</Link>
                    <div className="bg-darktheme px-3 py-2 flex text-theme text-3xl items-center gap-1 rounded-md">
                        <Link className="navbar-hover"><Icon icon="mdi:github" /></Link>
                        <Link className="navbar-hover"><Icon icon="mdi:instagram" /></Link>
                        <Link className="navbar-hover"><Icon icon="mdi:linkedin" /></Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
