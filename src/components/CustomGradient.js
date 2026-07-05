import React, { useContext } from 'react';
import GradientInfoContext from '../context/GradientInfoContext';
import GradientCanvas from './GradientCanvas';
import ColorPicker from './ColorPicker';
import AddRemoveColor from './AddRemoveColor';
import './CustomGradient.scss';

function CustomGradient() {
  const { gradientInfo } = useContext(GradientInfoContext);
  const gradient = gradientInfo.gradient;

  return (
    <div className="App CustomGradient__display">
      <h2 className="section-title">Custom Gradient</h2>

      <AddRemoveColor />

      <div className='CustomGradient__colorPickers'>
        {gradient.map((colorData, i) => {
          return (
          <ColorPicker key={colorData} colorIndex={i} initialColor={colorData} />
          );
        })}
      </div>

      <div className="CustomGradient__preview">
        <GradientCanvas gradient={gradient} width={500} height={50} />
      </div>
    </div>
  );
}

export default CustomGradient;