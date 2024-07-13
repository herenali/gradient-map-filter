import React from 'react';
import ReactLoading from "react-loading";
import './Loading.scss';

function Loading() {
  return (
    <div className='Loading__display'>
      <ReactLoading type="spin" color="#000" height={100} width={50} />
    </div>
  );
}

export default Loading;