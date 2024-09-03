import React, { useState } from 'react';
import GradientInfoContext from './GradientInfoContext';
import { blackAndWhiteGradient } from './defaultGradients';
import defaultImageSrc from './images/jelena-mirkovic-ibiL1ypRmNI-unsplash.jpg';
 
const GradientInfoProvider = ({ children }) => {
	const [gradientInfo, setGradientInfo] = useState({
		gradient: blackAndWhiteGradient,
		opacity: 1,
		newImageSrc: defaultImageSrc,
		blendMode: "normal"
	});
 
	return (
		<GradientInfoContext.Provider
			value={{ gradientInfo, setGradientInfo }}>
			{children}
		</GradientInfoContext.Provider>
	);
};

export default GradientInfoProvider;