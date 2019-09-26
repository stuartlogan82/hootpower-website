import React from 'react';
import './App.scss';
import HomePageView from './Components/HomePageView'
import LoggedInView from './Components/LoggedInView'
import Header from './Components/Header'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      isLoggedIn: false,
      userInformation: {
        firstName: "Jeff",
        lastName: "Lawson",
        accountNumber: "JLAW11111"
      }
    };

    this.toggleLoginState = this.toggleLoginState.bind(this);

  }

  toggleLoginState() {
    this.setState(state => ({
      isLoggedIn: !state.isLoggedIn
    }));
  }

  render() {
    return (
      <>
        <button className="btn btn-default" onClick={this.toggleLoginState}>Toggle Login State</button>
        <Header isLoggedIn={this.state.isLoggedIn} />
        {this.state.isLoggedIn ? (<LoggedInView userInformation={this.state.userInformation} />) : (<HomePageView />)}
      </>
    );
  }
}

export default App;
