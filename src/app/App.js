import React from 'react';
import './App.css';

import Navbar from '../components/Navbar';

import GradientInfoProvider from '../context/GradientInfoProvider';

import ChooseGradient from '../components/ChooseGradient.jsx';
import ImageUploader from '../components/ImageUploader';
import OpacityControl from '../components/OpacityControl';
import CustomGradient from '../components/CustomGradient';
import BlendModeControl from '../components/BlendModeControl';

function App() {
  return (
    <div className="App">
      <Navbar />
      <section className="panel-app">
          <GradientInfoProvider>
            <div className="layout-top">
              <div className="layout-image">
                <ImageUploader />
              </div>
              <div className="layout-controls">
                <ChooseGradient />
                <OpacityControl />
                <BlendModeControl />
              </div>
            </div>
            <CustomGradient />
          </GradientInfoProvider>
      </section>
    </div>
  );
}

export default App;
