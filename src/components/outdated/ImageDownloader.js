import React from "react";
import * as htmlToImage from 'html-to-image';

function ImageDownloader() {
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
    const svgElem = document.querySelector('.Playground__svg');

    htmlToImage.toPng(svgElem)
      .then(function (dataUrl) {
        downloadImage(dataUrl);
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  }

  return (
    <button onClick={download}>Download Image</button>
  );
}


export default ImageDownloader