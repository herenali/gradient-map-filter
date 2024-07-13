import React, { useContext } from 'react';
import OpacityContext from './OpacityContext';
import './OpacityControl.scss';

function OpacityControl() {
  const { opacity, setOpacity } = useContext(OpacityContext);

  function handleChange(e) {
    setOpacity(e.target.value);
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