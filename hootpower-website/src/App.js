import React from 'react';
import './App.scss';

function App() {
  return (
    <>
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

      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <p><strong>Customer: </strong>firstName lastName</p>
            <p><strong>Account ID: </strong>accountId</p>
            <p><strong>Address: </strong> address</p>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <div className="card">
              <div className="card-header card-header-primary">
                <h2>Energy Usage</h2>
              </div>
              <div className="card-body">
                <p className="description">Hello World</p>
              </div>
            </div>
          </div>

          <div className="col-sm-6">
            <div className="card">
              <div className="card-header card-header-primary">
                <h2>Managing your account</h2>
              </div>
              <div className="card-body">
                <p className="description">Give us a call!</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
