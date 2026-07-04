import React, { useRef, useEffect } from 'react';
import reactCSS from 'reactcss';

function GradientCanvas(props) {
  const gradient = props.gradient;
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const grad = ctx.createLinearGradient(0, 0, props.width, 0);
    for (const color of gradient) {
      grad.addColorStop(color[0], `rgb(${color[1][0]}, ${color[1][1]}, ${color[1][2]})`);
    }
    // console.log(gradient);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, props.width, props.height)
  }, [gradient, props.width, props.height])


  const styles = reactCSS({
    'default': {
      canvas: {
        width: `100%`,
        height: `${props.height}px`,
        maxWidth: `${props.width}px`,
      },
    },  
  });

  return (
    <div className="App">
      <canvas width={props.width} height={props.height} style={styles.canvas} ref={canvasRef} {...props}/>
    </div>
  );
}

export default GradientCanvas;