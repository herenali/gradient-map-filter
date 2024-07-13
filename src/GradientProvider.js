import React, { useState } from 'react';
import GradientContext from './GradientContext';
import { blackAndWhiteGradient } from './defaultGradients';
 
const GradientProvider = ({ children }) => {
    const [gradient, setGradient] = useState(blackAndWhiteGradient);
 
    return (
        <GradientContext.Provider
            value={{ gradient, setGradient }}>
            {children}
        </GradientContext.Provider>
    );
};
 
export default GradientProvider;