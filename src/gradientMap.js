const getBrightness = (r, g, b) => {
  const brightness = (r + g + b) / 3
  return brightness
}


const _gradient = (pos, startColor, endColor) => {
  let r = startColor[0] + (endColor[0] - startColor[0]) * pos;
  let g = startColor[1] + (endColor[1] - startColor[1]) * pos;
  let b = startColor[2] + (endColor[2] - startColor[2]) * pos;
  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);
  return [r, g, b];
}


const gradient = (position, colors) => {
  if (position <= 0) {
    return colors[0][1];
  }
  if (position >= 1) {
    return colors[colors.length - 1][1];
  }

  const positions = [];
  for (const color of colors) {
    positions.push(color[0]);
  }

  const rightIndex = bisectLeft(positions, position);
  const leftIndex = rightIndex - 1;
  const leftColor = colors[leftIndex];
  const rightColor = colors[rightIndex];

  return _gradient(
    (position - leftColor[0]) / (rightColor[0] - leftColor[0]),
    leftColor[1],
    rightColor[1]
  );
}


function bisectLeft(arr, value, lo=0, hi=arr.length) {
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] < value) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }
  return lo;
}


const gradientMap = (imageData, colors, ctx, opacity = 1) => {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const position = getBrightness(data[i], data[i + 1], data[i + 2]) / 255;
    const newColor = gradient(position, colors);
    data[i] = (data[i] / 255 * (1 - opacity) + newColor[0] / 255 * opacity) * 255;
    data[i + 1] = (data[i + 1] / 255 * (1 - opacity) + newColor[1] / 255 * opacity) * 255;
    data[i + 2] = (data[i + 2] / 255 * (1 - opacity) + newColor[2] / 255 * opacity) * 255;
  }
  ctx.putImageData(imageData, 0, 0)
}


const gradientMapEffect = (imgSrc, colors, opacity = 1) => {
  const newImage = new Image();
  newImage.crossOrigin = "anonymous";
  newImage.src = imgSrc;

  return new Promise(resolve => {
    newImage.onload = () => {
    
      let canvas = document.createElement("canvas");
      canvas.width = newImage.width;
      canvas.height = newImage.height;
    
      let ctx = canvas.getContext("2d");
      ctx.drawImage(newImage, 0, 0);
      const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
      
      gradientMap(imageData, colors, ctx, opacity);
      const newImgUrl = canvas.toDataURL("image/png");
    
      resolve(newImgUrl);
    }
  })
}


// const generateGradient = (colors, n) => {
//   const gradient = [];
//   for (let i = 0; i < n; i++) {
//     const newColor = gradient(i, colors)
//     gradient.push(newColor);
//   }
// }


export default gradientMapEffect;