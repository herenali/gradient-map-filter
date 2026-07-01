// import React, { useContext } from 'react';
// import GradientInfoContext from '../context/GradientInfoContext';
// import gradients from '../constants/defaultGradients';
// import GradientCanvas from './GradientCanvas';
// import './ChooseGradient.scss';

// const swatchStyle = {
//   padding: '5px',
//   paddingBottom: '3px',
//   background: '#eee',
//   borderRadius: '1px',
//   boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
//   display: 'inline-block',
//   cursor: 'pointer',
// };

// function ChooseGradient() {
//   const { gradientInfo, setGradientInfo } = useContext(GradientInfoContext);

//   return (
//     <div className="App">
//       {gradients.map((gradient, index) => {
//         const setGradientOption = () => {
//           setGradientInfo({ ...gradientInfo, gradient });
//         };

//         return (
//           <div
//             style={swatchStyle}
//             className="ChooseGradient__div"
//             onClick={setGradientOption}
//             key={index}
//           >
//             <GradientCanvas gradient={gradient} width={250} height={25} />
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default ChooseGradient;