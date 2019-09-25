import React from 'react';


class Header extends React.Component {
  render() {
    return (
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
    );
  }
}

export default Header;