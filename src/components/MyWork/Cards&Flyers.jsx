import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { gapi } from "gapi-script";



const FOLDER_IDS = {
    Cards: "1ZyBJj4y9nabrWEC4UOw4yVaP-ftGrvsk",
    Flyers: "1i_wZKzXyyAZsTSLEzJnjvPd2AcgJn0jz",
};
const Cards = () => {
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
                    listImagesFromAllFolders();
                });
        }

        gapi.load("client:auth2", start);
    }, []);


    const listImagesFromFolder = async (folderId) => {
        const response = await gapi.client.drive.files.list({
            q: `'${folderId}' in parents and mimeType contains 'image/'`,
            pageSize: 100,
            fields: "files(id, name, thumbnailLink)",
        });
        const files = response.result.files || [];

        files.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));

        return files;
    };

    const listImagesFromAllFolders = async () => {
        const allImages = {};
        for (const [folderName, folderId] of Object.entries(FOLDER_IDS)) {
            const folderImages = await listImagesFromFolder(folderId);
            allImages[folderName] = folderImages;
        }
        setImages(allImages);
    };

    return (
        <div className='mt-10 flex justify-center gap-10 flex-wrap'>

            {Object.keys(images).map((folderName) => (
                <motion.div variants={childVariant} key={folderName} className="m-0 flex flex-col gap-2">
                    <h2 className="text-xl font-semibold mb-4 text-bluetheme text-center uppercase">{folderName}</h2>

                    {images[folderName].map((file) => (
                        <motion.div
                            key={file.id}


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
                        >
                            <img
                                src={file.thumbnailLink}
                                alt={file.name}
                                className="w-full object-cover bg-white"
                            />
                            <p className="p-2 text-center bg-darktheme dark:bg-gray-700 text-theme rounded-b-md">{file.name.replace(/\.png$/, '')}</p>
                        </motion.div>
                    ))}
                </motion.div>
            ))}
        </div>
    )
}

export default Cards
