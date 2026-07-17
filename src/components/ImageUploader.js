import React, { useEffect, useRef, useState, useContext } from "react";
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
const downloadFormats = {
  svg: 'SVG',
  png: 'PNG',
};

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
  const [downloadFormat, setDownloadFormat] = useState('png');
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);
  const downloadMenuRef = useRef(null);
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

  useEffect(() => {
    function handleDocumentClick(event) {
      if (downloadMenuRef.current && !downloadMenuRef.current.contains(event.target)) {
        setIsDownloadMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleDocumentClick);

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    const icons = [eyeIcon, eyeCrossedIcon, circleHalfStrokeIcon, circleOverlapIcon];
    icons.forEach(icon => {
      const img = new Image();
      img.src = icon;
    });
  }, []);

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

  function getGradientMarkup() {
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

    return { blendMode, redTableValues, greenTableValues, blueTableValues, alphaTableValues };
  }

  async function createSvgMarkup() {
    const { blendMode, redTableValues, greenTableValues, blueTableValues, alphaTableValues } = getGradientMarkup();
    const imageBlob = await fetch(imageSrc).then((response) => response.blob());

    const imageDataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(imageBlob);
    });

    return `
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
  }

  async function downloadAsSvg() {
    const svgMarkup = await createSvgMarkup();

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

  async function downloadAsPng() {
    const svgMarkup = await createSvgMarkup();
    const svgBlob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);

    try {
      const image = new Image();
      image.decoding = 'async';
      image.src = svgUrl;

      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
      });

      const canvas = document.createElement('canvas');
      canvas.width = 1600;
      canvas.height = 1600;

      const context = canvas.getContext('2d');

      if (!context) {
        throw new Error('Could not create canvas context');
      }

      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      const pngBlob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));

      if (!pngBlob) {
        throw new Error('Could not create PNG blob');
      }

      const downloadUrl = URL.createObjectURL(pngBlob);
      const downloadLink = document.createElement('a');

      downloadLink.href = downloadUrl;
      downloadLink.download = 'gradient-map.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(downloadUrl);
    } finally {
      URL.revokeObjectURL(svgUrl);
    }
  }

  async function downloadSelectedFormat() {
    if (downloadFormat === 'png') {
      await downloadAsPng();
      return;
    }

    await downloadAsSvg();
  }

  function chooseDownloadFormat(format) {
    setDownloadFormat(format);
    setIsDownloadMenuOpen(false);
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
          <div className="ImageUploader__download" ref={downloadMenuRef}>
            <button type="button" onClick={downloadSelectedFormat} className="ImageUploader__download-main"
              title={`Download as ${downloadFormats[downloadFormat]}`}>
              Download {downloadFormats[downloadFormat]}
            </button>
            <button
              type="button"
              className="ImageUploader__download-arrow"
              onClick={() => setIsDownloadMenuOpen((currentValue) => !currentValue)}
              aria-haspopup="menu"
              aria-expanded={isDownloadMenuOpen}
              title="Choose download format"
            >
              ▼
            </button>
            {isDownloadMenuOpen ? (
              <div className="ImageUploader__download-menu" role="menu">
                <button type="button" role="menuitem" onClick={() => chooseDownloadFormat('png')}
                  title="Download as PNG">
                  .png
                </button>
                <button type="button" role="menuitem" onClick={() => chooseDownloadFormat('svg')}
                  title="Download as SVG">
                  .svg
                </button>
              </div>
            ) : null}
          </div>
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