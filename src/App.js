import React from 'react';
import './App.css';
import ImageUploader from './ImageUploader';
import ChooseGradient from './ChooseGradient';
import GradientProvider from './GradientProvider';
import OpacityProvider from './OpacityProvider';
import NewImageSrcProvider from './NewImageSrcProvider';
import LoadingProvider from './LoadingProvider';
import OpacityControl from './OpacityControl';
import CustomGradient from './CustomGradient';

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
