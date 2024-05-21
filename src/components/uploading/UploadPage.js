// Import necessary dependencies and components
import './UploadPage.css';
import DropFileInput from '../drop-file-input/DropFileInput';
import UploadButton from '../upload-button/UploadButton';
import { storage, db } from '../../firebase/firebase';
import { useState, useEffect } from "react";
import Modal from 'react-modal';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

function UploadPage() {
    // State to hold the selected file
    const [file, setFile] = useState(null);
    const [refresh, setRefresh] = useState(false); // State for refresh trigger
    const [progress, setProgress] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false); // State for modal visibility
    const [modalMessage, setModalMessage] = useState(''); // State for modal message
    // New state variables for name and category
    const [videoName, setVideoName] = useState('');
    const [videoCategory, setVideoCategory] = useState('');

    // Handler for file input change
    const onFileChange = (files) => {
        // Check if a file is selected
        if (files.length === 0) return;

        // Get the first selected file
        const currentFile = files[0];

        // Check if the file is an MP4
        if (currentFile.type !== 'video/mp4') {
            // Display an error message if the file is not an MP4
            setModalMessage('Please select an MP4 video file.');
            setModalIsOpen(true);
            return; // Exit the function if the file is not an MP4
        }

        // If the file is an MP4, proceed with setting it as the current file
        setFile(currentFile);
        console.log(files);
    };

    // Function to upload the selected file to Firebase Storage
    const handleClick = () => {
        // Ensure a file is selected
        if (file === null) return;
        // Create a reference to the Firebase Storage location
        const fileRef = ref(storage, `videos/${file.name}`);
        // Start the upload process
        const uploadTask = uploadBytesResumable(fileRef, file);

        // Monitor the upload progress
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // Update progress state
                setProgress(progress);
                console.log(progress);
            },
            (error) => {
                console.log("Upload error:", error);
                // Display error message
                setModalMessage('Upload failed. Please try again.');
                setModalIsOpen(true);
            },
            () => {
                console.log("Upload success!");
                // After upload, get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    uploadToDatabase(downloadURL, videoName, videoCategory); // Upload URL to Firestore
                    console.log(downloadURL);
                    // Display success message
                    setModalMessage('Upload successful!');
                    setModalIsOpen(true);
                });
            }
        );
    };

    // Function to store the download URL in Firestore
    const uploadToDatabase = (url, name, category) => {
        // Generate a unique identifier for the video
        const videoId = Date.now().toString(); // Simple timestamp-based ID

        // Prepare the video metadata
        let docData = {
            url: url,
            name: name, // Include the name
            category: category, // Include the category
            username: "cosmah", // Assuming this is a constant for now
            // Add any other metadata you want to store, like title, description, etc.
        };

        // Create a reference to a new Firestore document with a unique ID
        const videoRef = doc(db, "videos", videoId);

        // Update the document with the new data
        setDoc(videoRef, docData)
            .then(() => {
                console.log("Successfully updated Firestore with new video document");
            })
            .catch((error) => {
                console.log("Error updating Firestore:", error);
                // Optionally, display an error message here as well
            });
    };

    // Use useEffect to listen for changes in refresh state
    useEffect(() => {
        // Reset the file state
        setFile(null);
        console.log("View refresh triggered");
    }, [refresh]); // Depend on the refresh state to trigger re-render

    // Render the component
    return (
        <div className="box">
            <h2 className="header">React drop files input</h2>
            {/* DropFileInput component for file selection */}
            <DropFileInput file={file} onFileChange={(files) => onFileChange(files)} />
            <br></br>
            {/* Input fields for name and category */}
            <input type="text" placeholder="Video Name" value={videoName} onChange={(e) => setVideoName(e.target.value)} />
            <input type="text" placeholder="Category" value={videoCategory} onChange={(e) => setVideoCategory(e.target.value)} />
            <br></br>
            {/* UploadButton component to trigger the upload */}
            <UploadButton onClick={() => handleClick()}> </UploadButton>

            {/* Progress bar */}
            <div className="progress">
                <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: progress + "%" }}
                    aria-valuenow={progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                >
                    {progress}%
                </div>
            </div>

            {/* Modal for displaying messages */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => {
                    setModalIsOpen(false);
                    setRefresh(prevRefresh => !prevRefresh); // Toggle the refresh state on modal close
                }}
                contentLabel="Modal Message"
                className="custom-modal" 
            >
                <h2>{modalMessage}</h2>
                <button onClick={() => {
                    setModalIsOpen(false);
                    setRefresh(prevRefresh => !prevRefresh); // Toggle the refresh state on modal close
                }}>Close</button>
            </Modal>
        </div>
    );
}

// Export the App component
export default UploadPage;