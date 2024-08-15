import React from 'react';
import './App.css';

import Navbar from './Navbar';

import LoadingProvider from './LoadingProvider';
import GradientProvider from './GradientProvider';
import OpacityProvider from './OpacityProvider';
import NewImageSrcProvider from './NewImageSrcProvider';

import ChooseGradient from './ChooseGradient';
import ImageUploader from './ImageUploader';
import OpacityControl from './OpacityControl';
import CustomGradient from './CustomGradient';

function App() {
  return (
    <div className="App">
      <Navbar />
      <section class="panel-app">
        <LoadingProvider>
          <GradientProvider>
            <OpacityProvider>
              <NewImageSrcProvider>
                <ChooseGradient />
                <OpacityControl />
                <CustomGradient />
                <ImageUploader />
              </NewImageSrcProvider>
            </OpacityProvider>
          </GradientProvider>
        </LoadingProvider>
      </section>
    </div>
  );
}

export default App;
