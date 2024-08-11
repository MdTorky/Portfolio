import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Icon } from '@iconify/react';

const Languages = () => {

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

    const languages = [
        {
            id: 1,
            name: "Arabic",
            level: "Native",
            icon: "emojione:flag-for-palestinian-territories",
        },
        {
            id: 2,
            name: "English",
            level: "Professional",
            icon: "emojione:flag-for-united-states",
        },
        {
            id: 3,
            name: "French",
            level: "Beginner",
            icon: "emojione:flag-for-france",
        }
    ]
    return (
        <div className='mt-10 flex justify-center gap-10 flex-wrap'>
            {languages.map((lang) => (
                <motion.div
                    key={lang.id}
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
                    className='gradient-color rounded-md p-3 flex flex-col w-52 cursor-pointer shadows'
                    onClick={() => setSelected(lang)}
                >
                    <motion.div
                        className='flex items-center justify-between'>
                        <div className='transitions  p-2 rounded-md'>
                            <Icon icon={lang.icon} className="transitions dark:text-theme text-darktheme text-2xl" />
                        </div>
                        {/* <p className='text-bluetheme'>{lang.level}</p> */}
                        <p className='text-theme bg-bluetheme px-2 rounded-sm text-lg'>{lang.level}</p>

                    </motion.div>
                    <h1 className='transitions mt-2 text-xl dark:text-theme'>{lang.name}</h1>

                </motion.div>
            ))}

        </div>
    )
}

export default Languages
