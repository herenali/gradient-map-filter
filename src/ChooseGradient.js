import React, { useContext } from 'react';
import reactCSS from 'reactcss';
import GradientContext from './GradientContext';
import gradients from './defaultGradients';
import GradientCanvas from './GradientCanvas';
import './ChooseGradient.scss';

function ChooseGradient() {
	const { setGradient } = useContext(GradientContext);

  const styles = reactCSS({
    'default': {
      swatch: {
        padding: '5px',
        paddingBottom: '3px',
        // margin: '5px 2.5px',
        background: '#eee',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
    },
  });

  return (
    <div className="App">
      {gradients.map(gradient => {
        const setGradientOption = () => {
          setGradient(gradient);
        };

        return (<div style={styles.swatch} className="ChooseGradient__div" onClick={setGradientOption} key={gradient}>
          <GradientCanvas gradient={gradient} width={250} height={25} />
        </div>);
      })}
    </div>
  );
}

export default ChooseGradient;