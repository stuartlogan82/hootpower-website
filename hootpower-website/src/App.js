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
  }

  toggleLoginState = (logIn) => {
    this.setState(state => ({
      isLoggedIn: logIn
    }));
  }


  render() {
    return (
      <>
        <Header isLoggedIn={this.state.isLoggedIn} />
        {this.state.isLoggedIn ? 
          ( <LoggedInView onLogin={this.toggleLoginState} userInformation={this.state.userInformation} />) 
          : 
          ( <HomePageView onLogin={this.toggleLoginState} />)
        }
      </>
    );
  }
}

export default App;
