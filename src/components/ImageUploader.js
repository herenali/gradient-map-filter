import React, { useState, useContext } from "react";
import ImageWithSvgFilter from "./ImageWithSvgFilter";
import defaultImageSrc from '../assets/images/jelena-mirkovic-ibiL1ypRmNI-unsplash.jpg';
import GradientInfoContext from "../context/GradientInfoContext";
import calcSVGComponentTransferFilter from '../utils/calcGradientMap';
import './ImageUploader.scss';
 
function ImageUploader() {
  const [file, setFile] = useState();
  const { gradientInfo, setGradientInfo } = useContext(GradientInfoContext);

  function handleChange(e) {
    const selectedFile = e.target.files && e.target.files[0];

    if (!selectedFile) {
      return;
    }

    const nextImageSrc = URL.createObjectURL(selectedFile);

    setFile(nextImageSrc);
    setGradientInfo({ ...gradientInfo, newImageSrc: nextImageSrc });
  }

  async function downloadSvg() {
    const imageSrc = file ? file : defaultImageSrc;
    const { gradient, opacity, blendMode } = gradientInfo;
    const gradientMarkup = gradient
      .map((color) => {
        const rgb = `rgb(${color[1][0]}, ${color[1][1]}, ${color[1][2]})`;

        if (color[0] === 0 || color[0] === 1) {
          return rgb;
        }

        return `${rgb} ${color[0]}`;
      })
      .toString();

    const { redTableValues, greenTableValues, blueTableValues, alphaTableValues } =
      calcSVGComponentTransferFilter(gradientMarkup, opacity);

    const imageBlob = await fetch(imageSrc).then((response) => response.blob());

    const imageDataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(imageBlob);
    });

    const svgMarkup = `
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1600 1600">
        <defs>
          <filter id="filter-0" x="-10%" y="-10%" width="120%" height="120%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feColorMatrix type="matrix" values="0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0 0 0 1 0" result="gray" />
            <feComponentTransfer color-interpolation-filters="sRGB">
              <feFuncR type="table" tableValues="${redTableValues}" />
              <feFuncG type="table" tableValues="${greenTableValues}" />
              <feFuncB type="table" tableValues="${blueTableValues}" />
              <feFuncA type="table" tableValues="${alphaTableValues}" />
            </feComponentTransfer>
            <feBlend mode="${blendMode}" in="componentTransfer" in2="SourceGraphic" result="blend" />
          </filter>
        </defs>
        <image x="0%" y="0%" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" href="${imageDataUrl}" filter="url(#filter-0)" />
      </svg>
    `.trim();

    const svgBlob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' });
    const downloadUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement('a');

    downloadLink.href = downloadUrl;
    downloadLink.download = 'gradient-map.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(downloadUrl);
  }

 
  return (
    <div className="App">
      <div className="ImageDownloader__buttons">
        <input type="file" onChange={handleChange} />
        <button type="button" onClick={downloadSvg}>Download SVG</button>
      </div>

      <div className="ImageDownloader__images">
        <ImageWithSvgFilter newImageSrc={file ? file : defaultImageSrc} />
        
        <div className="ImageWithFilter__container">  
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="Playground__svg" viewBox="0 0 1600 1600" height="75vh">
            <image x="0%" y="0%" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" xlinkHref={file ? file : defaultImageSrc}></image>
          </svg>
        </div>
      </div>
    </div>
  );
}
 
export default ImageUploader;