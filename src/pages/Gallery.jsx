import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";

const FOLDER_ID = "1q1WXMQW_luQWPgzTMLrhVRvKNH3-_9eA";
const Gallery = () => {

    const [images, setImages] = useState([]);

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
        setImages(response.result.files);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Resume Folder Images</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((file) => (
                    <div key={file.id} className="border rounded overflow-hidden shadow-lg">
                        <img
                            src={file.thumbnailLink}
                            alt={file.name}
                            className="w-full h-48 object-cover"
                        />
                        <p className="p-2 text-center">{file.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery
