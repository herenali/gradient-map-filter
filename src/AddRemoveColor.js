import React, { useContext } from 'react';
import GradientContext from './GradientContext';
import './AddRemoveColor.scss';

function AddRemoveColor() {
  const { gradient, setGradient } = useContext(GradientContext);

  const addColor = () => {
    const currLength = gradient.length;
    const step = 1 / (currLength);
    const newGradient = gradient.map((colorData, i) => {
      return [step * i, colorData[1]];
    });
    newGradient.push([1, [255, 255, 255]]);
    setGradient(newGradient);
  };

  const removeColor = () => {
    const currLength = gradient.length;
    if (currLength > 2) {
      const step = 1 / (currLength - 2);
      const newGradient = gradient.map((colorData, i) => {
        return [step * i, colorData[1]];
      });
      newGradient.pop();
      setGradient(newGradient);
    }
  }

  return (
    <div className="App AddRemoveColor__display">
      <button onClick={addColor}>Add Color</button>
      <div id="AddRemoveColor__numColor">Number of Colors: {gradient.length}</div>
      <button onClick={removeColor}>Remove Color</button>
    </div>
  );
}

export default AddRemoveColor;