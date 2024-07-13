import React, { useState } from 'react';
import NewImageSrcContext from './NewImageSrcContext';
 
const NewImageSrcProvider = ({ children }) => {
  const [newImageSrc, setNewImageSrc] = useState('');

  return (
    <NewImageSrcContext.Provider
      value={{ newImageSrc, setNewImageSrc }}>
      {children}
    </NewImageSrcContext.Provider>
  );
};
 
export default NewImageSrcProvider;