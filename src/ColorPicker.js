import React, { useState, useEffect, useContext } from 'react';
import reactCSS from 'reactcss';
import GradientContext from './GradientContext';
import { ChromePicker } from 'react-color';
import './ColorPicker.scss';

function ColorPicker(props) {
  const colorIndex = props.colorIndex;

  const { gradient, setGradient } = useContext(GradientContext);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const initialColor = props.initialColor;
  const [color, setColor] = useState({
    r: `${initialColor[1][0]}`,
    g: `${initialColor[1][1]}`,
    b: `${initialColor[1][2]}`,
    a: "1"
  });
  useEffect(() => {
    setColor({
      r: `${initialColor[1][0]}`,
      g: `${initialColor[1][1]}`,
      b: `${initialColor[1][2]}`,
      a: "1"
    });
  }, [initialColor, setColor]);
  const [lastColor, setLastColor] = useState({ ...color });

  const toggleColorPicker = () => {
    setDisplayColorPicker(!displayColorPicker);
  }

  const closeColorPicker = () => {
    setDisplayColorPicker(false);
    console.log(lastColor);
    console.log(color);
    if (!((lastColor.r === color.r) && (lastColor.g === color.g) && (lastColor.b === color.b))) {
      changeGradient();
    }
    console.log(gradient);
  }

  const changeColor = (color) => {
    setColor({ ...color.rgb });
    // const newGradient = gradient.map((colorData, i) => {
    //   if (i === colorIndex) {
    //     return [colorData[0], [color.rgb.r, color.rgb.g, color.rgb.b]];
    //   } else {
    //     return colorData;
    //   }
    // });
    // setGradient(newGradient);
  };

  const changeGradient = () => {
    const newGradient = gradient.map((colorData, i) => {
      if (i === colorIndex) {
        return [colorData[0], [color.r, color.g, color.b]];
      } else {
        return colorData;
      }
    });
    setGradient(newGradient);
    setLastColor({ ...color });
  };

  const styles = reactCSS({
    'default': {
      popover: {
        position: 'absolute',
        left: '50%',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
      color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: `rgba(${ color.r }, ${ color.g }, ${ color.b }, ${ color.a })`,
      },
      swatch: {
        padding: '5px',
        background: '#eee',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
    },  
  });

  return (
    <div className="App ColorPicker__display">
      <div style={styles.swatch} onClick={toggleColorPicker} className='ColorPicker__swatch'>
        <div style={styles.color} />
      </div>
      {displayColorPicker ? (
        <div style={styles.popover}>
          <div style={styles.cover} onClick={closeColorPicker}/>
          <ChromePicker color={color} onChange={changeColor} disableAlpha={true} />
        </div>
      ) : null}
    </div>
  );
}

export default ColorPicker;