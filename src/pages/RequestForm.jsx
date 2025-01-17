import React, { useState } from 'react'
import services from '../data/services.json'
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"
import { Icon } from '@iconify/react';




const RequestForm = ({ languageText, language }) => {
    const [quantity, setQuantity] = useState(1);
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()

    const { id } = useParams();
    const serviceId = parseInt(id, 10);
    const service = Object.values(services)

        .flat()
        .find((item) => item.id === serviceId);

    if (!service) {
        return <p>Service not found!</p>;
    }


    const handleChange = (e) => {
        let value = parseInt(e.target.value, 10);
        if (value < 1) value = 1;
        if (value > 5) value = 5;
        setQuantity(value);
    };



    const mainVariant = {
        hidden: {
            y: "100vw",
            opacity: 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                duration: 1,
                ease: "easeInOut",
                delay: 0.1,
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        },
        exit: {
            y: "100vw",
            opacity: 0,
            transition: {
                ease: "easeInOut",
                duration: 0.3,
            }
        }
    }

    const childVariant = {
        hidden: {
            opacity: 0,
            y: -50
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: "easeInOut",
            }
        }
    }




    return (
        <motion.div
            variants={mainVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:py-10 flex flex-col items-center justify-center w-full">

            <div
                className='transitions text-theme bg-bluetheme px-10 py-5 rounded-md flex items-center justify-center mt-10 md:mt-0'>
                <motion.h1
                    variants={childVariant}
                    className='text-4xl text-center font-bold'>Request Form</motion.h1>
            </div>
            <div className='bg-gray-800 dark:bg-gray-200 rounded-md p-2 my-5'>
                <form action="#" className="bg-darktheme dark:bg-theme rounded-md shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] px-8 py-5 flex flex-col">
                    <div class="flex items-center p-3 h-28 bg-white dark:bg-gradient-to-r from-darktheme to-gray-700 rounded-md shadow-lg">
                        <section class="flex justify-center items-center w-14 h-14 rounded-lg shadow-md bg-gradient-to-r from-gray-700 to-darktheme dark:from-gray-200 dark:to-theme hover:from-darktheme hover:to-gray-700 hover:cursor-pointer hover:scale-110 duration-300 text-theme dark:text-darktheme text-2xl">
                            <Icon icon={service.icon} />
                        </section>

                        <section class="block border-l border-gray-300 m-3">
                            <div class="pl-3">
                                <h3 class="text-gray-600 dark:text-gray-50 font-semibold text-sm">{service.price}</h3>
                                <h3 class="bg-clip-text text-transparent bg-gradient-to-l from-bluetheme dark:from-theme to-[#27272A] dark:to-gray-300 text-sm md:text-lg font-bold w-32 md:w-52">{language == "en" ? service.name : service.arabicName}</h3>
                            </div>
                            {/* <div class="flex gap-3 pt-2 pl-3">
                                <svg stroke="currentColor" viewBox="0 0 24 24" class="w-4 hover:scale-125 duration-200 hover:cursor-pointer fill-white stroke-2">
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
                                    </path>
                                </svg>
                                <svg stroke="currentColor" viewBox="0 0 24 24" class="w-4 hover:scale-125 duration-200 hover:cursor-pointer fill-white stroke-2">
                                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z">
                                    </path>
                                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                                </svg>
                                <svg stroke="currentColor" viewBox="0 0 24 24" class="w-4 hover:scale-125 duration-200 hover:cursor-pointer fill-white stroke-2">
                                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z">
                                    </path>
                                </svg>
                                <svg stroke="currentColor" viewBox="0 0 24 24" class="w-4 hover:scale-125 duration-200 hover:cursor-pointer fill-white stroke-2">
                                    <path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"></path>
                                </svg>
                            </div> */}
                        </section>
                    </div>
                    <div className="input flex flex-col w-full static">
                        <label
                            for="input"
                            className="requestLabel"
                        >Name:</label
                        >
                        <input
                            id="name"
                            type="text"
                            placeholder="Name here..."
                            name="input"
                            className="requestInput"
                            onChange={(e) => setName(e.target.value)}

                        />
                    </div>
                    <div className="input flex flex-col w-full static">
                        <label
                            for="input"
                            className="requestLabel"
                        >Email:</label
                        >
                        <input
                            id="email"
                            type="email"
                            placeholder="Email here..."
                            name="input"
                            className="requestInput"
                            onChange={(e) => setEmail(e.target.value)}

                        />
                    </div>
                    <div className="input flex flex-col w-full static">
                        <label
                            for="input"
                            className="requestLabel"
                        >Phone:</label
                        >
                        <input
                            id="number"
                            type="number"
                            placeholder="Phone Number here..."
                            name="input"
                            className="requestInput"
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="input flex flex-col w-full static">
                        <label
                            for="input"
                            className="requestLabel"
                        >Quantity:</label
                        >
                        <input
                            id="quantity"
                            type="number"
                            placeholder="Quantity here..."
                            name="input"
                            className="requestInput"
                            min="1"
                            max="5"
                            value={quantity}
                            onChange={handleChange}
                        />
                    </div>
                </form>
            </div>


        </motion.div>


    )
}

export default RequestForm