import React, { useState } from "react";
import ImageDownloader from "./ImageDownloader";
import ImageWithFilter from "./ImageWithFilter";
import defaultImageSrc from './images/jelena-mirkovic-ibiL1ypRmNI-unsplash.jpg';
import './ImageUploader.scss';
 
function ImageUploader() {
  const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
 
  return (
    <div className="App">
      <div className="ImageDownloader__buttons">
        <input type="file" onChange={handleChange} />
        <ImageDownloader />
      </div>

      <div className="ImageDownloader__images">
        <img src={file ? file : defaultImageSrc} width={500} alt="Regular version" />
        <ImageWithFilter newImageSrc={file ? file : defaultImageSrc} />
      </div>
    </div>
  );
}
 
export default ImageUploader;