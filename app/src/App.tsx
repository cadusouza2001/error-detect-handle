import React, { useState } from 'react';
import EncodingComponent from './components/encoding';
import DecodingComponent from './components/decoding';
import './App.css';

function App() {
  const [isEncoding, setIsEncoding] = useState(true);

  const toggleComponent = () => {
    setIsEncoding(!isEncoding);
  };

  return (
    <div className='App'>
      {/* <button onClick={toggleComponent}>
        {isEncoding ? 'Ir para decoder' : 'Ir para encoder'}
      </button> */}
      {isEncoding ? <EncodingComponent /> : <DecodingComponent />}
    </div>
  );
}

export default App;
