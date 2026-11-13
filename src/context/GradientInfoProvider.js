import React, { useState, useEffect, useRef } from 'react';
import GradientInfoContext from './GradientInfoContext';
import { blackAndWhiteGradient, u2 } from '../constants/defaultGradients';
import defaultImageSrc from '../assets/images/jelena-mirkovic-ibiL1ypRmNI-unsplash.jpg';
import { saveGradientToDB, loadGradientFromDB } from '../utils/indexedDB';

const GradientInfoProvider = ({ children }) => {
	const [gradientInfo, setGradientInfo] = useState({
		gradient: u2,
		// opacity: 1,
		opacity: 0.3,
		newImageSrc: defaultImageSrc,
		blendMode: "normal"
	});
	const isInitialLoad = useRef(true);

	useEffect(() => {
		async function loadGradient() {
			const savedGradient = await loadGradientFromDB();
			if (savedGradient) {
				setGradientInfo(savedGradient);
			}
			isInitialLoad.current = false;
		}
		loadGradient();
	}, []);

	useEffect(() => {
		if (isInitialLoad.current) {
			return;
		}
		saveGradientToDB(gradientInfo);
	}, [gradientInfo]);

	return (
		<GradientInfoContext.Provider
			value={{ gradientInfo, setGradientInfo }}>
			{children}
		</GradientInfoContext.Provider>
	);
};

export default GradientInfoProvider;