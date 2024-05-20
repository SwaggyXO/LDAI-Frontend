import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faCamera, faVideoSlash, faVideo, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import './ocr.css';

const OCR = () => {
    const webcamRef = useRef<Webcam>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [isWebcamOpen, setIsWebcamOpen] = useState<boolean>(true);
    const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');

    const capture = () => {
        if (isWebcamOpen) {
            const imageSrc = webcamRef.current?.getScreenshot();
            if (imageSrc) {
                // sendImageToServer(imageSrc);
                setCapturedImage(imageSrc);
                setIsWebcamOpen(!isWebcamOpen);
            }
        } else {
            setIsWebcamOpen(!isWebcamOpen);
        }
    };

    const reset = () => {
        setCapturedImage(null);
        setIsWebcamOpen(true);
    };

    const toggleFacingMode = () => {
        setFacingMode((prevFacingMode) => (prevFacingMode === 'user' ? 'environment' : 'user'));
    };
    
    const toggleWebcam = () => {
        setIsWebcamOpen((prevIsWebcamOpen) => !prevIsWebcamOpen);
    };

    const sendImageToServer = async (imageSrc: string) => {
        try {
            const response = await fetch('http://your-backend-server/api/upload', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: imageSrc }),
            });
            if (response.ok) {
                console.log('Image sent successfully');
            } else {
                console.error('Failed to send image');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="webcam-container">
            {isWebcamOpen && (
                <div className="webcam-wrapper">
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={{ facingMode }}
                        className="webcam"
                    />
                    <div className="overlay">
                        <p>PLEASE KEEP <b>YOUR ANSWER</b> IN FOCUS</p>
                    </div>
                    <div className="overlay-b">
                        <button onClick={toggleFacingMode} className="overlay-button">
                            <FontAwesomeIcon icon={faSync} />
                        </button>
                    </div>
                </div>
            )}
            <div className="buttons">
                <button onClick={capture} disabled={!isWebcamOpen}>
                <FontAwesomeIcon icon={faCamera} /> Capture photo
                </button>
                {capturedImage && (
                    <div>
                        <h2>Captured Image:</h2>
                        <img src={capturedImage} alt="Captured" />
                        <button onClick={reset}>
                            <FontAwesomeIcon icon={faSyncAlt} color='white' /> Reset photo
                        </button>
                    </div>
                )}
                <button onClick={toggleFacingMode}>
                Switch to {facingMode === 'user' ? 'Back' : 'Front'} Camera
                </button>
                <button onClick={toggleWebcam}>
                {isWebcamOpen ? (
                    <>
                    <FontAwesomeIcon icon={faVideoSlash} /> Turn Off Webcam
                    </>
                ) : (
                    <>
                    <FontAwesomeIcon icon={faVideo} /> Turn On Webcam
                    </>
                )}
                </button>
            </div>
        </div>
    );
}

export default OCR