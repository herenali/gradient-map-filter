import React, { useEffect, useState, useContext } from 'react';
import GradientInfoContext from './GradientInfoContext';
import calcSVGComponentTransferFilter from './calcGradientMap';
import './ImageUploader.scss';

function ImageWithSvgFilter(props) {
	const [red, setRed] = useState("0 1");
	const [green, setGreen] = useState("0 1");
	const [blue, setBlue] = useState("0 1");
	const [alpha, setAlpha] = useState("0 1");

	const { gradientInfo, setGradientInfo } = useContext(GradientInfoContext);
	const gradient = gradientInfo.gradient;
	const opacity = gradientInfo.opacity;
	const blendMode = gradientInfo.blendMode;

	useEffect(() => {
		let strGradient = "black, white";

		const arrayGradient = gradient.map((color) => {
			if (color[0] === 0 || color[0] === 1) {
				return `rgb(${color[1][0]}, ${color[1][1]}, ${color[1][2]})`
			} else {
				return `rgb(${color[1][0]}, ${color[1][1]}, ${color[1][2]}) ${color[0]}`
			}
		});

		strGradient = arrayGradient.toString();

	const { redTableValues, greenTableValues, blueTableValues, alphaTableValues } = calcSVGComponentTransferFilter(strGradient, opacity);
		setRed(redTableValues);
		setGreen(greenTableValues);
		setBlue(blueTableValues);
		setAlpha(alphaTableValues);

		const src = props.newImageSrc;
		setGradientInfo({ ...gradientInfo, newImageSrc: src });
	}, [gradient, opacity, setRed, setGreen, setBlue, setAlpha, gradientInfo, setGradientInfo, props.newImageSrc]);

  return (
		<div className="ImageWithFilter__container">
			<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" class="Playground__svg" viewBox="0 0 1600 1600" height="75vh">
				<defs>
					<filter id="filter-0" x="-10%" y="-10%" width="120%" height="120%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
						<feColorMatrix type="matrix" values="0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0 0 0 1 0" result="gray"></feColorMatrix>
						<feComponentTransfer color-interpolation-filters="sRGB">
							<feFuncR type="table" tableValues={red}></feFuncR>
							<feFuncG type="table" tableValues={green}></feFuncG>
							<feFuncB type="table" tableValues={blue}></feFuncB>
							<feFuncA type="table" tableValues={alpha}></feFuncA>
						</feComponentTransfer>
						<feBlend mode={blendMode} in="componentTransfer" in2="SourceGraphic" result="blend"/> 
					</filter>
				</defs>
				<g>
					<image x="0%" y="0%" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" xlinkHref={props.newImageSrc}></image>
					<image x="0%" y="0%" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" xlinkHref={props.newImageSrc} filter="url(#filter-0)"></image>
				</g>
			</svg>
			{/* <svg version="1.1" width="0" height="0">
				<filter id="filter-0">
					<feColorMatrix type="matrix" values="0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0 0 0 1 0" result="gray"></feColorMatrix>
					<feComponentTransfer color-interpolation-filters="sRGB">
						<feFuncR type="table" tableValues={red}></feFuncR>
						<feFuncG type="table" tableValues={green}></feFuncG>
						<feFuncB type="table" tableValues={blue}></feFuncB>
						<feFuncA type="table" tableValues={alpha}></feFuncA>
					</feComponentTransfer>
				</filter>
			</svg> */}
			{/* <img className="ImageWithFilter__originalImage" src={props.newImageSrc} width={500} alt="Filtered version" />
			<img className="ImageWithFilter__newImage" src={props.newImageSrc} width={500} alt="Filtered version" data-gradientmap-filter="filter-0" style={{filter: 'url(#filter-0)'}} /> */}
		</div>
  );
}

export default ImageWithSvgFilter;