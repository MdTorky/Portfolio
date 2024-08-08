import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom'

const Activities = () => {
    const [selected, setSelected] = useState(null)

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


    const activities = [
        {
            id: 1,
            name: "Head of the Academic Committee",
            role: "President",
            organizers: "ISS Egypt UTM",
            date: "Nov 2023 - Present",
            description: 'Responsible for organizing and managing all the workshops and revision classes which will help the students in their academic curriculum',
            icon: "solar:square-academic-cap-bold",
            link: ""
        },
        {
            id: 2,
            name: "Education Team",
            role: "Member",
            organizers: "Global Buddies Club",
            date: "Jan 2023 - Jan 2024",
            description: 'Planned events and cultural exchange activities to promote collaboration and community building. In addition, I designed and carried out community service programmes to promote social responsibility and good transformation.',
            icon: "uiw:global",
            link: "https://drive.google.com/file/d/1loMTtJgfoPX__Z0w6VhcEFyrTCau4tlR/view?usp=share_link"

        },
        {
            id: 3,
            name: "Amitabha Malaysia Orphanage Volunteer",
            role: "Volunteer",
            organizers: "AIESEC in Malaysia",
            date: "Feb 2023 - Mar 2023",
            description: 'I volunteered with AIESEC Malaysia at the Amitabha Orphanage, where I committed my time and abilities to teaching children. My primary responsibility was to provide instructional help in various topics, including Science, English, and the Arts. This experience enabled me to build excellent teaching tactics and communication skills while modifying my approach to fit the children\'\s various learning requirements.',
            icon: "material-symbols-light:volunteer-activism",
            link: ""

        },
        {
            id: 4,
            name: "Southern Leadership Bootcamp",
            role: "Delegate",
            organizers: "AIESEC in Malaysia",
            date: "Jan 2023",
            description: 'I participated in "Southern Leadership Bootcamp," a program organized by AIESEC. This experience was a pivotal moment in my personal and leadership development journey. Throughout the program, I engaged in a series of immersive activities and workshops designed to cultivate leadership skills and global awareness.',
            icon: "iconoir:leaderboard-star",
            link: "https://drive.google.com/file/d/1RrW2la_smD4r2aBBtL0aAYB4nuQ7gw2u/view"

        },
        {
            id: 5,
            name: "Social Committee Member",
            role: "Member",
            organizers: "ISS Egypt UTM",
            date: "May 2023 - Dec 2023",
            description: 'I proudly served as a Social Committee Member within the UTM International Student Society (ISS) Egypt. In this role, I actively contributed to the vibrant international student community by organizing and participating in a wide range of social and cultural activities.',
            icon: "tdesign:member",
            link: ""

        },
        {
            id: 6,
            name: "AutoCar Workshop",
            role: "Participant",
            organizers: "ISS Egypt, Yemen, Iraq UTM",
            date: "May 2023 - Jun 2023",
            description: 'Workshop focused on designing, building, and programming autonomous robots with sensor integration.',
            icon: "ci:car-autor",
            link: "https://drive.google.com/file/d/17meit4vmLdnBZJbg7qkjbkYilFBe17o5/view?usp=drive_link"

        },
        {
            id: 7,
            name: "Leader 2 You Summit",
            role: "Organizer",
            organizers: "AIESEC in Malaysia",
            date: "Jun 2023",
            description: 'Served as an Organizing Committee Member in the Special Events Team for the Leader 2 You Summit. In this role, I played a pivotal part in enhancing the overall attendee experience at various special events. My responsibilities encompassed developing and implementing innovative engagement tactics to ensure that participants remained actively involved and connected throughout each event.',
            icon: "fluent-mdl2:party-leader",
            link: "https://drive.google.com/file/d/1a3WqjS2Ihpl5hfY8phoKldAsBGn-pja6/view"

        },


    ]
    return (
        <div className='mt-10 flex justify-center xl:w-[850px]  xl:h-[380px] xl:overflow-y-auto xl:py-5 gap-10 flex-wrap '>
            {activities.map((activ) => (
                <motion.div
                    key={activ.id}

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
                    className='gradient-color rounded-md p-3 flex flex-col w-96 cursor-pointer shadows'
                    onClick={() => setSelected(activ)}
                >
                    <motion.div
                        className='flex items-center justify-between'>
                        <div className='transitions bg-gray-300 dark:bg-gray-900 p-2 rounded-md'>
                            <Icon icon={activ.icon} className="transitions dark:text-theme text-darktheme text-2xl" />
                        </div>
                        <div>
                            <p className='text-bluetheme text-lg'>{activ.date}</p>
                        </div>
                    </motion.div>
                    <h1 className='transitions mt-2 text-xl dark:text-theme'>{activ.name}</h1>
                    {/* <h2 className='transitions text-md dark:text-gray-300 text-gray-500'>{activ.description}</h2> */}
                    <div className='flex justify-between mt-5 items-center'>
                        <p className='text-theme bg-bluetheme px-2 rounded-sm text-md'>{activ.organizers}</p>
                        <div className='flex justify-end  items-center gap-2'>
                            <p className='text-bluetheme text-lg'>•</p>
                            <p className='text-gray-500 text-lg'>{activ.role}</p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}

export default Activities
