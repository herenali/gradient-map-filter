import React, { useState } from 'react';
import OpacityContext from './OpacityContext';
 
const OpacityProvider = ({ children }) => {
    const [opacity, setOpacity] = useState(1);
 
    return (
        <OpacityContext.Provider
            value={{ opacity, setOpacity }}>
            {children}
        </OpacityContext.Provider>
    );
};
 
export default OpacityProvider;