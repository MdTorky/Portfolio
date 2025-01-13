import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Icon } from '@iconify/react';
import { gapi } from "gapi-script";

const FOLDER_ID = "1EKNjMI4vH6mUGmtqOwN1Xtz3h6dYqLXc";
const LogoDesign = () => {
    const [images, setImages] = useState([]);

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
        function start() {
            gapi.client
                .init({
                    apiKey: process.env.REACT_APP_API_KEY,
                    clientId: process.env.REACT_CLIENT_ID,
                    scope: process.env.REACT_APP_SCOPES,
                    discoveryDocs: [
                        "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
                    ],
                })
                .then(() => {
                    listImagesInFolder();
                });
        }

        gapi.load("client:auth2", start);
    }, []);


    const listImagesInFolder = async () => {
        const response = await gapi.client.drive.files.list({
            q: `'${FOLDER_ID}' in parents and mimeType contains 'image/'`,
            pageSize: 100, // Adjust if needed
            fields: "files(id, name, webViewLink, thumbnailLink)",
        });

        const files = response.result.files || [];

        files.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));


        setImages(files);
    };

    return (
        // <div className='mt-10 flex justify-center gap-10 flex-wrap w-[40%]'>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center ">


            {images.map((file) => (
                <motion.div
                    key={file.id}

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
                    className='gradient-color rounded-md p-3 flex flex-col cursor-pointer shadows'
                // onClick={() => setSelected(exp)}
                >
                    {/* <motion.div
                    className='flex items-center justify-between'>
                    <div className='transitions bg-gray-300 dark:bg-gray-900 p-2 rounded-md'>
                        <Icon icon={exp.icon} className="transitions dark:text-theme text-darktheme text-2xl" />
                    </div>
                    <p className='text-bluetheme'>{exp.date}</p>
                </motion.div>
                <h1 className='transitions mt-2 text-xl dark:text-theme'>{exp.title}</h1>
                <div className='flex justify-end mt-5 items-center gap-2'>
                    <p className='text-bluetheme text-lg'>•</p>
                    <p className='text-gray-500 text-lg'>{exp.company}</p>
                </div> */}
                    <img
                        src={file.thumbnailLink}
                        alt={file.name}
                        className="w-full object-cover bg-white"
                    />
                    <p className="p-2 text-center bg-darktheme dark:bg-gray-700 text-theme rounded-b-md">{file.name.replace(/\.png$/, '')}</p>
                </motion.div>
            ))}

        </div>
    )
}

export default LogoDesign
