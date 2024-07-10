import { createContext, useEffect, useState } from "react";

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext();

function CloudinaryUploadWidget({ uwConfig, onUploadSuccess, label}) {
  const [loaded, setLoaded] = useState(false);
  const [uploaded, setUploaded] = useState(false); // State to track if the file is uploaded

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      var myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (!error && result && result.event === "success") {
            const fileInfo = {
              publicId: result.info.public_id,
              url: result.info.secure_url,
              fileName: result.info.original_filename

            };
            onUploadSuccess(fileInfo);
            setUploaded(true); // Set the uploaded state to true
          }
        }
      );

      document.getElementById("upload_widget").addEventListener(
        "click",
        function () {
          myWidget.open();
        },
        false
      );
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      {!uploaded && (
        <div className="items-center place-content-center">
          <div className="flex justify-between items-center">
            <div className="text-white py-2 font-semibold">Select your {label} here : </div>
            <div className="">
            <button
              id="upload_widget"
              className="bg-orange-400 font-semibold p-2 rounded-full hover:bg-cyan-500"
              onClick={initializeCloudinaryWidget}
            >
              Select here
            </button>
            </div>
          </div>
        </div>
      )}
    </CloudinaryScriptContext.Provider>
  );
}

export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };
