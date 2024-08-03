import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
const home = () => {
    return (
        <div className="p-10">
            <div className="p-20 m-20">
                <p className="text-bluetheme text-4xl uppercase font-medium">Software Engineer</p>
                <h1 className="text-darktheme text-8xl uppercase font-semibold">Mohamed Torky</h1>
                <p className="text-darktheme w-3/6 text-justify mt-2 " >Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit fugit unde tempore placeat similique. Sint ullam quam consequuntur nobis quod, exercitationem modi, perspiciatis, debitis</p>
                <div className='mt-5 flex gap-10'>
                    <Link className="text-5xl "><Icon icon="mdi:github" className='homeIcons' /></Link>
                    <Link className="text-5xl "><Icon icon="mdi:instagram" className='homeIcons' /></Link>
                    <Link className="text-5xl "><Icon icon="mdi:linkedin" className='homeIcons' /></Link>
                    <Link className="text-2xl"><p className='homeIcons p-2'>Download CV</p></Link>
                </div>
            </div>
        </div>
    )
}

export default home
