import React, { useState } from "react";
import ImageDownloader from "./ImageDownloader";
import CssImageDownloader from "./CssImageDownloader";
import ImageWithFilter from "./ImageWithFilter";
import ImageWithSvgFilter from "./ImageWithSvgFilter";
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
        {/* <CssImageDownloader /> */}
        {/* <ImageDownloader /> */}
      </div>

      <div className="ImageDownloader__images">
        <ImageWithSvgFilter newImageSrc={file ? file : defaultImageSrc} />
        {/* <ImageWithFilter newImageSrc={file ? file : defaultImageSrc} /> */}
        
        <div className="ImageWithFilter__container">  
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" class="Playground__svg" viewBox="0 0 1600 1600" height="75vh">
            <image x="0%" y="0%" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" xlinkHref={file ? file : defaultImageSrc}></image>
          </svg>
        </div>
        {/* <img src={file ? file : defaultImageSrc} width={500} alt="Regular version" /> */}
      </div>
    </div>
  );
}
 
export default ImageUploader;