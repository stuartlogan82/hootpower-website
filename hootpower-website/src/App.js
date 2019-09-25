import React from 'react';
import './App.scss';

function App() {
  return (
    <div className='bg-videoWrapper'>
      <div className="bg-video">
        <video className="bg-video__content" autoPlay muted loop>
          <source src="Agua-natural.mp4" type="video/mp4" />
          Your browser is not supported!
        </video>
      </div>  

    </div>
    
  );
}

export default App;
