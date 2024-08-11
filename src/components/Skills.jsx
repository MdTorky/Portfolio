import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Icon } from '@iconify/react';


const Skills = () => {

    const [selected, setSelected] = useState(null);
    const childVariant = {
        hidden: {
            opacity: 0,
            y: -100,
            // scale: 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            // scale: 1,
            transition: {
                duration: 1,
                type: "spring",
                stiffness: 120,
            }
        }
    }


    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setSelected(null)
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const skills = [
        {
            id: 1,
            name: 'ReactJs',
            icon: "logos:react"
        },
        {
            id: 2,
            name: 'NodeJs',
            icon: "logos:nodejs-icon"
        },
        {
            id: 3,
            name: 'MongoDB',
            icon: "vscode-icons:file-type-mongo"
        },
        {
            id: 4,
            name: 'ExpressJs',
            icon: "skill-icons:expressjs-dark"
        },
        {
            id: 5,
            name: 'HTML, CSS',
            icon: "vscode-icons:file-type-html"
        },
        {
            id: 6,
            name: 'JavaScript',
            icon: "skill-icons:javascript"
        },
        {
            id: 7,
            name: 'PHP',
            icon: "logos:php"
        },
        {
            id: 8,
            name: 'Laravel',
            icon: "logos:laravel"
        },
        {
            id: 9,
            name: 'C++',
            icon: "logos:c-plusplus"
        },
        {
            id: 10,
            name: 'Java',
            icon: "logos:java"
        },
        {
            id: 11,
            name: 'Flutter',
            icon: "logos:flutter"
        },
        {
            id: 12,
            name: 'MySQL',
            icon: "logos:mysql"
        },
        {
            id: 13,
            name: 'Figma',
            icon: "logos:figma"
        },
        {
            id: 14,
            name: 'JSON',
            icon: "vscode-icons:file-type-json"
        },
        {
            id: 15,
            name: 'Photoshop',
            icon: "devicon:photoshop"
        },
        {
            id: 16,
            name: 'Video Editor',
            icon: "skill-icons:premiere"
        },
    ]
    return (
        <div className='mt-10 flex justify-center xl:w-[850px] xl:h-[360px] xl:border-2 dark:xl:border-gray-800 xl:border-gray-200 xl:rounded-md xl:overflow-y-auto xl:py-5 gap-10 flex-wrap'>
            {skills.map((skill) => (


                <motion.div
                    key={skill.id}
                    // layoutId={`card-${exp.id}`}

                    variants={childVariant}
                    whileHover={{
                        scale: 1.05,
                        transition: {
                            duration: 0.5,
                        }
                    }}
                    whileTap={{
                        scale: 0,
                        transition: {
                            duration: 1
                        }
                    }}
                    className='gradient-color rounded-md p-3 flex flex-col w-40 xl:w-52 cursor-pointer shadows'
                    onClick={() => setSelected(skill)}
                >
                    <div
                        className='flex justify-evenly items-center'>
                        <div className='transitions bg-gray-300 w-20  dark:bg-gray-900 p-2 rounded-md'>
                            <Icon icon={skill.icon} className="transitions m-auto dark:text-theme text-darktheme text-2xl" />
                        </div>
                        <h1 className='bg-bluetheme ml-2 w-full text-center text-theme p-1 rounded-md transitions text-sm xl:text-xl'>{skill.name}</h1>
                    </div>

                </motion.div>
            ))}
        </div>
    )
}

export default Skills
