import React from 'react';
import './App.css';

import Navbar from './Navbar';

import GradientInfoProvider from './GradientInfoProvider';

import ChooseGradient from './ChooseGradient';
import ImageUploader from './ImageUploader';
import OpacityControl from './OpacityControl';
import CustomGradient from './CustomGradient';
import BlendModeControl from './BlendModeControl';

function App() {
  return (
    <div className="App">
      <Navbar />
      <section class="panel-app">
          <GradientInfoProvider>
            <ChooseGradient />
            <OpacityControl />
            <BlendModeControl />
            <CustomGradient />
            <ImageUploader />
          </GradientInfoProvider>
      </section>
    </div>
  );
}

export default App;
