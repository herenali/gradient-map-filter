import React, { useState } from 'react';
import NewImageSrcContext from './NewImageSrcContext';
import defaultImageSrc from './images/jelena-mirkovic-ibiL1ypRmNI-unsplash.jpg';
 
const NewImageSrcProvider = ({ children }) => {
  // const [newImageSrc, setNewImageSrc] = useState('');
  const [newImageSrc, setNewImageSrc] = useState(defaultImageSrc);

  return (
    <NewImageSrcContext.Provider
      value={{ newImageSrc, setNewImageSrc }}>
      {children}
    </NewImageSrcContext.Provider>
  );
};
 
export default NewImageSrcProvider;