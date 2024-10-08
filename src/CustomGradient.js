import React, { useContext } from 'react';
import GradientInfoContext from './GradientInfoContext';
import GradientCanvas from './GradientCanvas';
import ColorPicker from './ColorPicker';
import AddRemoveColor from './AddRemoveColor';
import './CustomGradient.scss';

function CustomGradient() {
  const { gradientInfo } = useContext(GradientInfoContext);
  const gradient = gradientInfo.gradient;

  return (
    <div className="App">
      <AddRemoveColor />

      <div className='CustomGradient__colorPickers'>
        {gradient.map((colorData, i) => {
          return (
          <ColorPicker key={colorData} colorIndex={i} initialColor={colorData} />
          );
        })}
      </div>

      <GradientCanvas gradient={gradient} width={500} height={50} />
    </div>
  );
}

export default CustomGradient;