import React, { useState, useContext, useEffect } from "react";
import NewImageSrcContext from "./NewImageSrcContext";
import { createSVGElement } from "./calcGradientMap";
import defaultImageSrc from './images/jelena-mirkovic-ibiL1ypRmNI-unsplash.jpg';

function ImageDownloader() {
  const [url, setUrl] = useState('');

  const { newImageSrc } = useContext(NewImageSrcContext);

  // async function downloadImg() {
  //   const {image} = this.props;

  //   const xml = new XMLSerializer().serializeToString(this.svgElem);
  //   const svg64 = btoa(xml);
  //   const b64Start = 'data:image/svg+xml;base64,';
  //   const image64 = b64Start + svg64;
  //   const setName = this.getSetName();
  //   const ext = image.type.split('/')[1];

  //   const imgObj = new Image();
  //   imgObj.src = image64;
  //   imgObj.width = image.width;
  //   imgObj.height = image.height;

  //   imgObj.addEventListener('load', () => {
  //     this.canvas.width = image.width;
  //     this.canvas.height = image.height;
  //     this.ctx.drawImage(imgObj, 0, 0, this.canvas.width, this.canvas.height);

  //     this.canvas.toBlob((blob) => {
  //       let URLObj = window.URL || window.webkitURL;
  //       this.link.href = URLObj.createObjectURL(blob, image.type, 1);
  //       this.link.download = `${image.name}__${setName}.${ext}`;
  //     });

  //   }, false);
  // }

  async function getURL($svg) {
    // Data header for a svg image: 
    const dataHeader = 'data:image/svg+xml;charset=utf-8'
  
    // Serialize it as xml string:
    const serializeAsXML = $e => (new XMLSerializer()).serializeToString($e)
  
    // Encode URI data as UTF8 data:
    const encodeAsUTF8 = s => `${dataHeader},${encodeURIComponent(s)}`
  
    // Select the element:
    // const $svg = document.getElementById('svg-container').querySelector('svg')
  
    // Encode it as a data string:
    const svgData = encodeAsUTF8(serializeAsXML($svg))
    console.log(svgData);
  
    // This function returns a Promise whenever the $img is loaded
    const loadImage = async url => {
      const $img = document.createElement('img');
      $img.crossOrigin = "anonymous";
      $img.src = url;
      return new Promise((resolve, reject) => {
          console.log("test");
          $img.onload = () => {
            console.log($img);
            resolve($img);
          };
          $img.onerror = reject;
          $img.src = url;
      })
    }

    // try {
    //   const img = await loadImage("https://static.zenpop.jp/images/Hello%20Kitty%20with%20Apples.png")
    //   console.log(img);
    // } catch(e) {
    //   console.log(e);
    // }
    const img = await loadImage(defaultImageSrc);
      console.log(img);

    // const $canvas = document.createElement('canvas')
    // $canvas.width = $svg.clientWidth
    // $canvas.height = $svg.clientHeight
    // $canvas.getContext('2d').drawImage(img, 0, 0, $svg.clientWidth, $svg.clientHeight)
    
    // const dataURL = $canvas.toDataURL(`image/png`, 1.0);
    // document.body.appendChild($canvas);

    let canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
  
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    document.body.appendChild(canvas);

    const dataURL = canvas.toDataURL("image/png");

    return new Promise((resolve) => {
      resolve(dataURL);
  })

    // const newImage = new Image();
    // newImage.crossOrigin = "anonymous";
    // newImage.src = svgData;

    // return new Promise(resolve => {
    //   newImage.onload = () => {
      
    //     let canvas = document.createElement("canvas");
    //     canvas.width = newImage.width;
    //     canvas.height = newImage.height;
      
    //     let ctx = canvas.getContext("2d");
    //     ctx.drawImage(newImage, 0, 0);

    //     document.body.appendChild(canvas);

    //     const newImgUrl = canvas.toDataURL("image/png");
    //     console.log(newImgUrl);
      
    //     resolve(newImgUrl);
    //   }
    // })


  }

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

  const getNewUrl = async () => {
    console.log(createSVGElement(newImageSrc));
    document.body.appendChild(createSVGElement(newImageSrc));
    
    try {
      const newUrl = await getURL(createSVGElement(newImageSrc));
      setUrl(newUrl);
      console.log(newUrl); 
    } catch(e) {
      console.log(e);
    }
  }

  function download() {
    // downloadImage(newImageSrc);

    getNewUrl();
    // console.log(url);
    downloadImage(url);
  }

  return (
    <button onClick={download}>Download Image</button>
  );
}


export default ImageDownloader