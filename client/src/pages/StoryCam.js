"use client";
import React, { useRef, useState, useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";
import { MdOutlineFlipCameraIos } from "react-icons/md";
import {useNavigate} from 'react-router-dom'

const StoryCam = () => {
  // Initializing imports
  const navigate=useNavigate()
  // Media Stream
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  // Editing story
  const [scale, setScale] = useState(1); // For zooming
  const [position, setPosition] = useState({ x: 0, y: 0 }); // For dragging
  const [rotation, setRotation] = useState(0); // For rotation
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [initialDistance, setInitialDistance] = useState(0); // For pinch zoom
  const [initialAngle, setInitialAngle] = useState(0); // For rotation
  // ----------------------------------------xxxxxxxxx-------------------------------------
  // USE EFFECTS

  // Use Effect for camera
  useEffect(() => {
    startWebcam();
  }, []);
  // use Effect for story edditing
  useEffect(() => {
    const handleTouchMove = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault(); // Prevent pinch-to-zoom
      }
    };

    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);
    // ----------------------------------------xxxxxxxxx-------------------------------------
  // FUNCTIONS
// Camera Functions
  // Start Camera
  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true },
        video: {
          aspectRatio: 9 / 16,
          frameRate: { ideal: 30 },
        },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setMediaStream(stream);
    } catch (error) {
      console.error("Error accessing webcam", error);
    }
  };

  // Stop Camera
  const stopWebcam = () => {
    if (mediaStream) {
          mediaStream.getTracks().forEach((track) => {
         track.stop();
      });
      setMediaStream(null);
    }
  };

  // Capture Image
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // Set canvas dimensions to match video stream
      if (context && video.videoWidth && video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw video frame onto canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Get image data URL from canvas
        const imageDataUrl = canvas.toDataURL("image/jpeg");

        // Set the captured image
        setCapturedImage(imageDataUrl);

        // Stop the webcam
        stopWebcam();

        // You can do something with the captured image here, like save it to state or send it to a server
      }
    }
  };
  // Back to camera (clear media stream and refs)
  const backToCamera = () => {
    startWebcam(); // Stop the webcam if it's active
    setCapturedImage(null); // Reset captured image
  };
  const leavePage=()=>{
    stopWebcam(); // Stop the webcam if it's active
    setCapturedImage(null); // Reset captured image
    navigate('/')
  }
// --------------------------xxxxxxxxxxxxxxxxxxxxx-------------------------------
  // DRAGGABLE Component Functions
  // Mouse Events (for dragging)
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch Events (for dragging)
  const handleTouchStart = (e) => {
    const touch = e.touches[0]; // Get the first touch point
    setIsDragging(true);
    setStartPos({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    });
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    if (isDragging && e.touches.length === 1) {
      const touch = e.touches[0];
      setPosition({
        x: touch.clientX - startPos.x,
        y: touch.clientY - startPos.y,
      });
    }
    if (e.touches.length === 2) {
      e.preventDefault(); // Prevent document zoom
      const currentDistance = getDistance(e.touches);
      const currentAngle = getAngle(e.touches);

      // Zoom logic
      if (initialDistance === 0) {
        setInitialDistance(currentDistance); // Set initial distance
      } else {
        const scaleChange = currentDistance / initialDistance;
        setScale((prevScale) => prevScale * scaleChange); // Adjust scale
        setInitialDistance(currentDistance); // Update for next calculation
      }

      // Rotation logic
      if (initialAngle === 0) {
        setInitialAngle(currentAngle); // Set initial angle
      } else {
        const rotationChange = currentAngle - initialAngle;
        setRotation((prevRotation) => prevRotation + rotationChange); // Adjust rotation
        setInitialAngle(currentAngle); // Update for next calculation
      }
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setInitialDistance(0); // Reset after pinch zoom ends
    setInitialAngle(0); // Reset rotation after pinch ends
  };

  // Pinch Zoom & Rotation (for touch)
  const getDistance = (touches) => {
    const [touch1, touch2] = [touches[0], touches[1]];
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  };

  const getAngle = (touches) => {
    const [touch1, touch2] = [touches[0], touches[1]];
    const deltaX = touch2.clientX - touch1.clientX;
    const deltaY = touch2.clientY - touch1.clientY;
    return Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  };

  // Scroll Zoom (Ctrl + scroll)
  const handleWheelZoom = (e) => {
    if (e.ctrlKey) {
      e.preventDefault();
      setScale((prevScale) => Math.max(0.1, prevScale - e.deltaY * 0.01)); // Zoom in/out
    }
  };
  // ---------------------xxxxxxxxxx------------------------------
  return (
    <div className="max-w-7xl h-dvh relative flex justify-center items-center">
      <div className="container relative max-w-96 aspect-9/16">
        {capturedImage ? (
          <div className="w-full h-full relative">
            <img
              src={capturedImage}
              alt="Captured"
              className="w-full h-full -scale-x-100"
            />
            {/* <div  className="gray h-20 bg-gradient-to-b from-black to-transparent w-full flex justify-center items-center gap-4 pl-3 relative">
            <p className="text-xl font-bold text-white ">Text</p>
            <p className="text-xl font-bold text-white ">Stickers</p>
            <p className="text-xl font-bold text-white ">Gifs</p>
            </div> */}
            <div
              className="p-3 rounded-xl shadow-lg"
              style={{
                width: "300px",
                aspectRatio: "32/9",
                backgroundColor: "lightblue",
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotation}deg)`,
                cursor: isDragging ? "grabbing" : "grab",
                position: "relative",
                touchAction: "none", // Disable default touch actions (scroll, zoom)`
                boxShadow: "10px 10px 20px rgba(247, 71, 73,1)",
              }}
              // Mouse events for dragging
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp} // Stop drag if mouse leaves element
              // Touch events for dragging
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              // Touch events for pinch zoom and rotation

              // Scroll zoom event (Ctrl + scroll)
              onWheel={handleWheelZoom}
            >
              <h1 className="font-bold text-2xl">Hurray !!!</h1>
              <br />
              <h1 className="text-xl">Achived this and that 💃💃</h1>
            </div>
            <div className="footer w-full h-20 bg-gradient-to-t from-black to-transparent flex justify-between items-center gap-4 px-3 absolute bottom-0">
              <button
                onClick={() => {
                  backToCamera();
                }}
                className="text-white  font-bold rounded-lg p-3 bottom-0"
              >
                <IoArrowBack className="scale-200 stroke-white" />
              </button>
              <button
                onClick={() => {
                  backToCamera();
                }}
                className=" text-white font-bold rounded-lg  bg-main p-2 bottom-0"
              >
                Add story
              </button>
            </div>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              className="w-full h-full -scale-x-100"
              autoPlay
              muted
            ></video>
            <canvas ref={canvasRef} className="hidden"></canvas>
            {!videoRef.current ? (
              <>
                {/* <button onClick={()=>{startWebcam()}} className="absolute text-white bg-main p-2 bottom-0">Start Webcam</button> */}
              </>
            ) : (
              <div className="absolute h-20 w-full  transfom -translate-y-full flex justify-between px-3 items-center">
                  <button
                onClick={() => {
                 leavePage()
                }}
                className="text-white  font-bold rounded-lg p-3 bottom-0"
              >
                <IoArrowBack className="scale-200 stroke-white" />
              </button>
                <button
                  onClick={() => {
                    captureImage();
                  }}
                  className="text-white bg-white p-2 bottom-0 w-20 h-20 rounded-full border-4 border-main"
                ></button>
                <button
                onClick={async() => {
                  leavePage()
                }}
                className="text-white  font-bold rounded-lg p-3 bottom-0"
              >
                <MdOutlineFlipCameraIos className="scale-200 stroke-white mx-auto"/>
              </button>
              </div>
                
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StoryCam;
