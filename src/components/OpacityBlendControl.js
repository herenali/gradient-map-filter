import React, { useContext } from 'react';
import GradientInfoContext from '../context/GradientInfoContext';
import './OpacityBlendControl.scss';

function OpacityBlendControl() {
  const { gradientInfo, setGradientInfo } = useContext(GradientInfoContext);
  const opacity = gradientInfo.opacity;
  const blendMode = gradientInfo.blendMode;

  function handleOpacityChange(e) {
    setGradientInfo({ ...gradientInfo, opacity: e.target.value });
  }

  function handleBlendModeChange(e) {
    setGradientInfo({ ...gradientInfo, blendMode: e.target.value });
  }

  return (
    <div className="App OpacityBlendControl__display">
      <div className="OpacityBlendControl__opacity">
        <label htmlFor="opacitySlider">Opacity</label>
        <div className="OpacityBlendControl__opacity-inputs">
          <input
            id="opacitySlider"
            value={opacity}
            type="range"
            min="0"
            max="1"
            step=".1"
            onChange={handleOpacityChange}
          />
          <input
            value={opacity}
            type="number"
            min="0"
            max="1"
            step=".1"
            onChange={handleOpacityChange}
          />
        </div>
      </div>
      <div className="OpacityBlendControl__blend">
        <label htmlFor="blendMode">Blend Mode</label>
        <select name="blendMode" id="blendMode" onChange={handleBlendModeChange}>
          <option value="normal">Normal</option>
          <option value="multiply">Multiply</option>
          <option value="darken">Darken</option>
          <option value="color-burn">Color Burn</option>
          <option value="lighten">Lighten</option>
          <option value="screen">Screen</option>
          <option value="color-dodge">Color Dodge</option>
          <option value="overlay">Overlay</option>
          <option value="soft-light">Soft Light</option>
          <option value="hard-light">Hard Light</option>
          <option value="difference">Difference</option>
          <option value="exclusion">Exclusion</option>
          <option value="hue">Hue</option>
          <option value="saturation">Saturation</option>
          <option value="color">Color</option>
          <option value="luminosity">Luminosity</option>
        </select>
      </div>
    </div>
  );
}

export default OpacityBlendControl;
