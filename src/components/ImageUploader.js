import React, { useEffect, useState, useContext } from "react";
import ImageWithSvgFilter from "./ImageWithSvgFilter";
import defaultImageSrc from '../assets/images/jelena-mirkovic-ibiL1ypRmNI-unsplash.jpg';
import GradientInfoContext from "../context/GradientInfoContext";
import calcSVGComponentTransferFilter from '../utils/calcGradientMap';
import { saveImageToDB, loadImageFromDB } from '../utils/indexedDB';
import './ImageUploader.scss';
import eyeIcon from '../assets/icons/eye.svg';
import eyeCrossedIcon from '../assets/icons/eye-crossed.svg';
import circleHalfStrokeIcon from '../assets/icons/circle-half-stroke.svg';
import circleOverlapIcon from '../assets/icons/circle-overlap.svg';

const desktopModeQuery = '(min-width: 768px)';

function getInitialDisplayMode() {
  if (typeof window === 'undefined') {
    return 'compare';
  }

  return window.matchMedia(desktopModeQuery).matches ? 'compare' : 'filtered';
}
 
function ImageUploader() {
  const [file, setFile] = useState();
  const [displayMode, setDisplayMode] = useState(getInitialDisplayMode);
  const [showFilter, setShowFilter] = useState(true);
  const { gradientInfo, setGradientInfo } = useContext(GradientInfoContext);
  const imageSrc = file ? file : defaultImageSrc;

  useEffect(() => {
    if (displayMode === 'filtered') {
      setShowFilter(true);
    }
  }, [displayMode]);

  useEffect(() => {
    async function loadImage() {
      const savedImage = await loadImageFromDB();
      if (savedImage) {
        setFile(savedImage);
        setGradientInfo(prev => ({ ...prev, newImageSrc: savedImage }));
      }
    }
    loadImage();
  }, [setGradientInfo]);

  async function handleChange(e) {
    const selectedFile = e.target.files && e.target.files[0];

    if (!selectedFile) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const dataUrl = reader.result;
      try {
        await saveImageToDB(dataUrl);
      } catch (error) {
        console.error('Failed to save image to IndexedDB:', error);
      }
      setFile(dataUrl);
      setGradientInfo({ ...gradientInfo, newImageSrc: dataUrl });
    };
    reader.readAsDataURL(selectedFile);
  }

  function toggleDisplayMode() {
    setDisplayMode((currentMode) => (currentMode === 'compare' ? 'filtered' : 'compare'));
  }

  function toggleFilterVisibility() {
    setShowFilter((currentVisibility) => !currentVisibility);
  }

  async function downloadSvg() {
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
    <div className="App ImageUploader__display">
      <h2 className="section-title">Image</h2>
      <div className="ImageDownloader__buttons">
        <input type="file" onChange={handleChange} />
        <div className="ImageUploader__actions">
          {displayMode === 'filtered' ? (
            <button type="button" onClick={toggleFilterVisibility} className="icon-button" title={showFilter ? 'Hide filter' : 'Show filter'}>
              <img src={showFilter ? eyeCrossedIcon : eyeIcon} alt={showFilter ? 'Hide filter' : 'Show filter'} />
            </button>
          ) : null}
          <button type="button" onClick={toggleDisplayMode} className="icon-button" title={displayMode === 'compare' ? 'Show filtered only' : 'Show comparison'}>
            <img src={displayMode === 'compare' ? circleHalfStrokeIcon : circleOverlapIcon} alt={displayMode === 'compare' ? 'Show filtered only' : 'Show comparison'} />
          </button>
          <button type="button" onClick={downloadSvg}>Download SVG</button>
        </div>
      </div>

      <div className={`ImageDownloader__images ${displayMode === 'filtered' ? 'ImageDownloader__images--single' : ''}`}>
        <ImageWithSvgFilter newImageSrc={imageSrc} showFilter={displayMode === 'compare' ? true : showFilter} />

        {displayMode === 'compare' ? (
          <div className="ImageWithFilter__container">  
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="Playground__svg" viewBox="0 0 1600 1600" height="75vh">
              <image x="0%" y="0%" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" xlinkHref={imageSrc}></image>
            </svg>
          </div>
        ) : null}
      </div>
    </div>
  );
}
 
export default ImageUploader;