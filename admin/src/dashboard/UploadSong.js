import { useState } from "react";
import CloudinaryUploadWidget from "../utils/CloudinaryServer";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";

export default function UploadTrack({ value, setValue }) {
  const [publicId, setPublicId] = useState("");
  const [cloudName] = useState("dtur9xepq");
  const [uploadPreset] = useState("trackupload");

  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    // cropping: true, //add a cropping step
    // showAdvancedOptions: true,  //add advanced options (public_id and tag)
    sources: ["local"], // restrict the upload sources to URL and local files
    multiple: false,
    // folder: "user_images", //upload files to the specified folder
    // tags: ["users", "profile"], //add the given tags to the uploaded files
    // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
    // clientAllowedFormats: ["images"], //restrict uploading to image files only
    // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
    // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
    // theme: "purple", //change to a purple theme
  });


  const cld = new Cloudinary({
    cloud: {
      cloudName
    }
  });

  const myImage = cld.image(publicId);

  const [fileUrl, setFileUrl] = useState("");
  const [originalName, setOriginalName] = useState("");

  const handleUploadSuccess = (fileInfo) => {
    setFileUrl(fileInfo.url);
    setOriginalName(fileInfo.fileName);
    setValue(fileInfo.url);

  }

  return (
    <div className="flex flex-col justify-between items-center">
      <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} onUploadSuccess={handleUploadSuccess} label={"Track"} />
      <div style={{ width: "800px" }}>
        <AdvancedImage
          style={{ maxWidth: "100%" }}
          cldImg={myImage}
          plugins={[responsive(), placeholder()]}
        />
      </div>

      {fileUrl && (
        <div className="flex flex-row justify-center items-center">
          <div className="text-white font-semibold">Uploaded thumbnail : </div>
          <div className="text-cyan-600 text-xl">{originalName}</div>
        </div>
      
  )
}
    </div >
  );
}
