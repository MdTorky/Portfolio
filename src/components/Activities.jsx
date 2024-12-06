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
            name: "Head of the Egyptian Academic Committee",
            role: "President",
            organizers: "ISS Egypt UTM",
            date: "Nov 2023 - Dec 2024",
            description: 'Organized academic seminars and revision sessions across university majors, supporting students’ academic success.',
            icon: "solar:square-academic-cap-bold",
            link: "",
            webLink: "https://www.instagram.com/issegypt/"
        },
        {
            id: 2,
            name: "Head of the Egyptian Multimedia Committee",
            role: "President",
            organizers: "ISS Egypt UTM",
            date: "Nov 2023 - Dec 2024",
            description: 'Managed content creation, including posters, videos, and social media, and led photography/videography for ISS Egypt events.',
            icon: "pajamas:media-broken",
            link: "",
            webLink: "https://www.instagram.com/issegypt/"
        },
        {
            id: 3,
            name: "Head of the Media Committee",
            role: "President",
            organizers: "Arabic Cultural Day 2024",
            date: "Sept 2024 - Dec 2024",
            description: 'Supervised a team of creatives (photographers, designers, writers) to execute media coverage for the Arabic Cultural Day event.',
            icon: "mdi:abjad-arabic",
            link: "",
            webLink: "https://www.instagram.com/arabiccultureday/"
        },
        {
            id: 4,
            name: "Education Team",
            role: "Member",
            organizers: "Global Buddies Club",
            date: "Jan 2023 - Jan 2024",
            description: 'Planned events and cultural exchange activities to promote collaboration and community building. In addition, I designed and carried out community service programmes to promote social responsibility and good transformation.',
            icon: "uiw:global",
            link: "https://drive.google.com/file/d/1loMTtJgfoPX__Z0w6VhcEFyrTCau4tlR/view?usp=share_link",
            webLink: "https://www.instagram.com/globalbuddies.utm/"

        },
        {
            id: 5,
            name: "Volunteer, Amitabha Malaysia Orphanage",
            role: "Volunteer",
            organizers: "AIESEC in Malaysia",
            date: "Feb 2023 - Mar 2023",
            description: 'Taught Science, English, and Arts to children, enhancing instructional skills and adapting to diverse learning needs.',
            icon: "material-symbols-light:volunteer-activism",
            link: "",
            webLink: "https://www.instagram.com/aiesecinmalaysia/"

        },
        {
            id: 6,
            name: "Participant, Southern Leadership Bootcamp",
            role: "Delegate",
            organizers: "AIESEC in Malaysia",
            date: "Jan 2023",
            description: 'Completed an intensive leadership development program focused on personal growth and team management.',
            icon: "iconoir:leaderboard-star",
            link: "https://drive.google.com/file/d/1RrW2la_smD4r2aBBtL0aAYB4nuQ7gw2u/view",
            webLink: "https://www.instagram.com/aiesecinmalaysia/"

        },
        {
            id: 7,
            name: "Member of the Egyptian Social Committee",
            role: "Member",
            organizers: "ISS Egypt UTM",
            date: "May 2023 - Dec 2023",
            description: 'Assisted in planning and executing cultural events to foster community engagement among international students.',
            icon: "tdesign:member",
            link: "",
            webLink: "https://www.instagram.com/issegypt/"
        },
        {
            id: 8,
            name: "AutoCar Workshop",
            role: "Participant",
            organizers: "ISS Egypt, Yemen, Iraq UTM",
            date: "May 2023 - Jun 2023",
            description: 'Workshop focused on designing, building, and programming autonomous robots with sensor integration.',
            icon: "ci:car-auto",
            link: "https://drive.google.com/file/d/17meit4vmLdnBZJbg7qkjbkYilFBe17o5/view?usp=drive_link",
            webLink: "https://www.instagram.com/issegypt/"
        },
        {
            id: 9,
            name: "Event Organizer, Leaders 2 You Summit",
            role: "Organizer",
            organizers: "AIESEC in Malaysia",
            date: "Jun 2023",
            description: '•Enhanced attendee experiences through creative event planning and innovative engagement strategies.',
            icon: "fluent-mdl2:party-leader",
            link: "https://drive.google.com/file/d/1a3WqjS2Ihpl5hfY8phoKldAsBGn-pja6/view",
            webLink: "https://www.instagram.com/aiesecinmalaysia/"

        },


    ]
    return (
        <div className='mt-10 flex justify-center xl:w-[850px] h-[380px] overflow-y-auto xl:py-5 gap-10 flex-wrap '>
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


            <AnimatePresence>
                {selected && (
                    <div
                        onClick={() => setSelected(null)}
                        className='fixed inset-0 bg-black/70 flex items-center justify-center z-50'
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                                opacity: 1, scale: 1,
                                transition: {
                                    duration: 1,
                                    type: 'spring',
                                    stiffness: 80,
                                }
                            }}
                            exit={{
                                opacity: 0, scale: 0, transition: {
                                    duration: 0.5,
                                }
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className='gradient-color rounded-md p-3 flex  flex-col w-[600px] cursor-pointer relative gap-2'
                        >
                            <button
                                className='absolute top-2 right-2 text-3xl text-darktheme dark:text-theme hover:text-bluetheme transitions'
                                onClick={() => setSelected(null)}
                            >
                                <Icon icon="zondicons:close-outline" />
                            </button>
                            <div className='rounded-md m-auto mb-5  bg-white '>
                                <img src={selected.img} alt="" className='rounded-md w-[200px]' />
                            </div>
                            <div className='flex justify-between -mb-2'>
                                <h1 className='xl:text-2xl text-start text-xl dark:text-theme'>{selected.name}</h1>
                                <p className='text-theme bg-bluetheme px-1 flex items-center rounded-sm'>{selected.date}</p>

                            </div>
                            <p className='text-bluetheme text-start'>{selected.organizers} - <span className="bg-bluetheme px-1 rounded-sm text-theme font-medium">{selected.role}</span></p>
                            <p className='mt-4 dark:text-theme text-justify '>{selected.description}</p>

                            <div className='flex  gap-4 flex-wrap justify-center 2xl:justify-end'>
                                {selected.link && <Link to={selected.link} className="homeIcons flex items-center px-2 !rounded-lg"><Icon icon="hugeicons:award-02" className='text-xl' />Award Link</Link>}
                                {selected.webLink && <Link to={selected.webLink} className="homeIcons flex items-center px-2 !rounded-lg"><Icon icon="mdi:web" className='text-xl' />Social Link</Link>}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Activities
