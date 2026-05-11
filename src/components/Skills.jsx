import React from 'react'
import { motion } from "framer-motion"
import { Icon } from '@iconify/react';

const Skills = () => {
    const skills = [
        { id: 1, name: 'ReactJs', icon: "logos:react" },
        { id: 19, name: 'NextJs', icon: "logos:nextjs-icon" },
        { id: 6, name: 'JavaScript', icon: "skill-icons:javascript" },
        { id: 21, name: 'Python', icon: "logos:python" },
        { id: 2, name: 'NodeJs', icon: "logos:nodejs-icon" },
        { id: 4, name: 'ExpressJs', icon: "skill-icons:expressjs-dark" },
        { id: 3, name: 'MongoDB', icon: "vscode-icons:file-type-mongo" },
        { id: 12, name: 'MySQL', icon: "logos:mysql" },
        { id: 22, name: 'AWS', icon: "logos:aws" },
        { id: 23, name: 'Firebase', icon: "logos:firebase" },
        { id: 24, name: 'Cloudflare R2', icon: "logos:cloudflare-icon" },
        { id: 20, name: 'PowerBI', icon: "logos:microsoft-power-bi" },
        { id: 25, name: 'Git', icon: "logos:git-icon" },
        { id: 26, name: 'Github', icon: "logos:github-icon" },
        { id: 18, name: 'Tailwind', icon: "devicon:tailwindcss" },
        { id: 5, name: 'HTML, CSS', icon: "vscode-icons:file-type-html" },
        { id: 8, name: 'Laravel', icon: "logos:laravel" },
        { id: 7, name: 'PHP', icon: "logos:php" },
        { id: 9, name: 'C++', icon: "logos:c-plusplus" },
        { id: 10, name: 'Java', icon: "logos:java" },
        { id: 11, name: 'Flutter', icon: "logos:flutter" },
        { id: 13, name: 'Figma', icon: "logos:figma" },
        { id: 15, name: 'Photoshop', icon: "devicon:photoshop" },
        { id: 16, name: 'Premiere', icon: "skill-icons:premiere" },
        { id: 17, name: 'Canva', icon: "lineicons:canva" },
    ];

    const containerVariant = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const itemVariant = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 }
    };

    return (
        <motion.div
            variants={containerVariant}
            initial="hidden"
            animate="visible"
            className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'
        >
            {skills.map((skill) => (
                <motion.div
                    key={skill.id}
                    variants={itemVariant}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className='glass-morphism rounded-2xl p-4 flex flex-col items-center justify-center gap-3 premium-shadow transitions group'
                >
                    <div className='p-3 rounded-xl bg-white/5 dark:bg-black/20 group-hover:bg-bluetheme/10 transitions'>
                        <Icon icon={skill.icon} className="text-3xl md:text-4xl" />
                    </div>
                    <span className='font-bold text-sm md:text-base text-darktheme dark:text-theme text-center'>
                        {skill.name}
                    </span>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default Skills
