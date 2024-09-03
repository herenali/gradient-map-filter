import React, { useContext } from 'react';
import GradientInfoContext from './GradientInfoContext';
import './OpacityControl.scss';

function OpacityControl() {
  const { gradientInfo, setGradientInfo } = useContext(GradientInfoContext);
  const opacity = gradientInfo.opacity;

  function handleChange(e) {
    setGradientInfo({ ...gradientInfo, opacity: e.target.value });
  }

  return (
    <div className="App OpacityControl__display">
      <label htmlFor="opacitySlider">Opacity</label>
      <input 
        id="opacitySlider"
        value={opacity}
        type="range"
        min="0" 
        max="1" 
        step=".1" 
        onChange={handleChange} 
      />
      <input 
        value={opacity} 
        type="number" 
        min="0" 
        max="1" 
        step=".1"
        onChange={handleChange} 
      />
    </div>
  );
}

export default OpacityControl;