import React ,{useRef,useState} from 'react'

const StoryCam = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [mediaStream, setMediaStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          aspectRatio: 9 / 16,
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

  // Function to stop the webcam
  const stopWebcam = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
      setMediaStream(null);
    }
  };

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
  // Function to reset state (clear media stream and refs)
  const resetState = () => {
    stopWebcam(); // Stop the webcam if it's active
    setCapturedImage(null); // Reset captured image
  };

  
  return (
    <div className="max-w-7xl h-dvh relative flex justify-center items-center">
    <div className="container relative max-w-96 aspect-9/16 bg-gray-200">
      {
        capturedImage?
        <>
        <img src={capturedImage} alt="Captured" className="w-full h-full"/>
        <button onClick={()=>{resetState()}} className="absolute text-white bg-orange-400 p-2 bottom-0">Reset</button>
        </>:<>
        <video ref={videoRef} className="w-full h-full" autoPlay muted></video>
        <canvas ref={canvasRef} className="hidden"></canvas>
        {!videoRef.current?<>
          <button onClick={()=>{startWebcam()}} className="absolute text-white bg-orange-400 p-2 bottom-0">Start Webcam</button>
        </>:<>
        <button onClick={()=>{captureImage()}} className="absolute text-white bg-orange-400 p-2 bottom-0">Capture Image</button></>}
        
        </>
      }
    </div>
  </div>
  )
}

export default StoryCam
