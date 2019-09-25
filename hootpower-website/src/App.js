import React from 'react';
import './App.scss';
import HomePageView from './Components/HomePageView'
import LoggedInView from './Components/LoggedInView'
import Header from './Components/Header'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
  }

  render() {
    return (
      <>
        <Header />
        {this.state.isLoggedIn ? (<LoggedInView />) : (<HomePageView />)}
      </>
    );
  }
}

export default App;
