import React, { useContext } from "react";
import NewImageSrcContext from "./NewImageSrcContext";

function ImageDownloader() {
  const { newImageSrc } = useContext(NewImageSrcContext);

  async function downloadImage(imageSrc) {
    const image = await fetch(imageSrc);
    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);
      
    const link = document.createElement('a');
    link.href = imageURL;
    link.download = "gradient-map-image";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function download() {
    downloadImage(newImageSrc);
  }

  return (
    <button onClick={download}>Download Image</button>
  );
}


export default ImageDownloader