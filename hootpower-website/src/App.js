import React from 'react';
import './App.scss';
import HomePageView from './Components/HomePageView'
import LoggedInView from './Components/LoggedInView'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
  }

  render() {
    return (
      <>
        <header className="header">
          <div className="header__logo-box">
            <img src="owl.png" alt="Logo" className="header__logo" />
          </div>


          <div className="bg-video">
            <video className="bg-video__content" autoPlay muted loop>
              <source src="windfarm.mp4" type="video/mp4" />
              Your browser is not supported!
            </video>
          </div>

        </header>


        {this.state.isLoggedIn ? (<LoggedInView />) : (<HomePageView />)}


      </>
    );
  }
}

export default App;
