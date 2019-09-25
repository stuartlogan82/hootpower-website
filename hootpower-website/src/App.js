import React from 'react';
import './App.scss';

function App() {
  return (
    <header className="header">
      <div class="header__logo-box">
        <img src="owl.png" alt="Logo" class="header__logo" />
      </div>

      <div className='bg-videoWrapper'>
        <div className="bg-video">
          <video className="bg-video__content" autoPlay muted loop>
            <source src="windfarm.mp4" type="video/mp4" />
            Your browser is not supported!
        </video>
        </div>
      </div>
    </header>
  );
}

export default App;
