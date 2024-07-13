import React, { useRef, useEffect } from 'react';

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

  return (
    <div className="App">
      <canvas width={props.width} height={props.height} ref={canvasRef} {...props}/>
    </div>
  );
}

export default GradientCanvas;