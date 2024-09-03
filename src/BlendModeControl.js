import React, { useContext } from 'react';
import GradientInfoContext from './GradientInfoContext';
import './BlendModeControl.scss';

function BlendModeControl() {
  const { gradientInfo, setGradientInfo } = useContext(GradientInfoContext);

  function handleChange(e) {
    setGradientInfo({ ...gradientInfo, blendMode: e.target.value });
  }

  return (
    <div className="App BlendModeControl__display">
      <label for="blendMode">Blend Mode</label>
			<select name="blendMode" id="blendMode" onChange={handleChange}>
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
  );
}

export default BlendModeControl;