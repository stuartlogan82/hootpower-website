import React from 'react';


class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="header">
        <div className="header__logo-box">
          <img src="owl.png" alt="Logo" className="header__logo" />
          <h1 className="header__text">Hoot Power <br />
            <small className="header__subtitle">Owl you need is us</small>
          </h1>
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