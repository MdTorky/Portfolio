import React, { useState } from 'react'
import services from '../data/services.json'
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"
import { Icon } from '@iconify/react';




const RequestForm = ({ languageText, language }) => {
    const [quantity, setQuantity] = useState();
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [notes, setNotes] = useState()

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
                    className='text-4xl text-center font-bold'>{languageText.RequestForm}</motion.h1>
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
                        </section>
                    </div>
                    <div className="flex text-theme dark:text-darktheme gap-2 items-center justify-center -mb-4 mt-4 text-lg" >

                        <Icon icon="clarity:exclamation-circle-line" /> {languageText.Required}

                    </div>

                    <div className="requestGroup">
                        <label
                            htmlFor="name"
                            className="requestLabel"
                        >
                            {languageText.Name}:
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder={`${languageText.NameHere}...`}
                            name="name"
                            className="requestInput"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <div className={`requestIcon ${language === 'ar' ? "!left-0" : "!right-0"}`}>
                            <Icon icon="clarity:exclamation-circle-line" />
                        </div>
                    </div>
                    <div className="requestGroup">
                        <label
                            for="input"
                            className="requestLabel"
                        >{languageText.Email}:</label
                        >
                        <input
                            id="email"
                            type="email"
                            placeholder={`${languageText.EmailHere}...`}
                            name="input"
                            className="requestInput"
                            onChange={(e) => setEmail(e.target.value)}
                            required

                        />
                        <div className={`requestIcon ${language === 'ar' ? "!left-0" : "!right-0"}`}>
                            <Icon icon="clarity:exclamation-circle-line" />
                        </div>
                    </div>
                    <div className="requestGroup">
                        <label
                            for="input"
                            className="requestLabel"
                        >{languageText.WhatsappNo}:</label
                        >
                        <input
                            id="number"
                            type="number"
                            placeholder={`${languageText.WhatsappHere}...`}
                            required

                            name="input"
                            className="requestInput"
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <div className={`requestIcon ${language === 'ar' ? "!left-0" : "!right-0"}`}>
                            <Icon icon="clarity:exclamation-circle-line" />
                        </div>
                    </div>
                    <div className="requestGroup">
                        <label
                            for="input"
                            className="requestLabel"
                        >{languageText.Quantity}:</label
                        >
                        <input
                            id="quantity"
                            type="number"
                            placeholder={`${languageText.QuantityHere}...`}
                            required

                            name="input"
                            className="requestInput"
                            min="1"
                            max="5"
                            value={quantity}
                            onChange={handleChange}
                        />
                        <div className={`requestIcon ${language === 'ar' ? "!left-0" : "!right-0"}`}>
                            <Icon icon="clarity:exclamation-circle-line" />
                        </div>
                    </div>
                    <div className="input flex flex-col w-full static">
                        <label
                            for="input"
                            className="requestLabel"
                        >{languageText.AdditionalNotes}:</label
                        >
                        <textarea
                            id="notes"
                            placeholder={`${languageText.AdditionalNotesHere}...`}
                            name="input"
                            className="requestInput"
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>





                    <button className="requestInput mt-5 !bg-bluetheme hover:!bg-theme hover:text-darktheme dark:hover:!bg-darktheme dark:!text-theme transition duration-150 !text-sm">{languageText.Submit}</button>
                </form>
            </div>


        </motion.div>


    )
}

export default RequestForm