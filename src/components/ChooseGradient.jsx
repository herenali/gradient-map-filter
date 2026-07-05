import React, { useContext } from 'react';
import GradientInfoContext from '../context/GradientInfoContext';
import gradients from '../constants/defaultGradients';
import GradientCanvas from './GradientCanvas';
import './ChooseGradient.scss';

function ChooseGradient() {
  const { gradientInfo, setGradientInfo } = useContext(GradientInfoContext);

  return (
    <div className="App ChooseGradient__display">
      <h2 className="section-title">Preset Gradients</h2>
      <div className="ChooseGradient__grid">
        {gradients.map((gradient, index) => {
          const setGradientOption = () => {
            setGradientInfo({ ...gradientInfo, gradient });
          };

          return (
            <button
              type="button"
              className="ChooseGradient__swatch"
              onClick={setGradientOption}
              key={index}
            >
              <GradientCanvas gradient={gradient} width={250} height={25} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ChooseGradient;