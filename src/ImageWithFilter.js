import React, { useEffect, useState, useContext } from 'react';
import GradientContext from './GradientContext';
import OpacityContext from './OpacityContext';
import NewImageSrcContext from './NewImageSrcContext';
import gradientMapEffect from './gradientMap';
import greyscaleDefaultImageSrc from './images/greyscale-jelena-mirkovic-ibiL1ypRmNI-unsplash.jpg';

function ImageWithFilter(props) {
  const [firstRender, setFirstRender] = useState(true);

  const { newImageSrc, setNewImageSrc } = useContext(NewImageSrcContext);
	const { gradient } = useContext(GradientContext);
	const { opacity } = useContext(OpacityContext);

	const getNewImageSrc = async () => {
		const newImageSrc = await gradientMapEffect(props.newImageSrc, gradient, opacity);
		setNewImageSrc(newImageSrc);
	}

  useEffect(() => {
    getNewImageSrc();
	});
	
  useEffect(() => {
    if (firstRender) {
      setNewImageSrc(greyscaleDefaultImageSrc);
      setFirstRender(false);
    }
  }, [firstRender, setNewImageSrc]);
	useEffect(() => {
    if (!firstRender) {
      getNewImageSrc();
    }
	});

  return (
	<img className="ImageWithFilter__newImage" src={newImageSrc} width={500} alt="Filtered version" />
  );
}

export default ImageWithFilter;