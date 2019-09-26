import React from 'react';
import './App.scss';
import HomePageView from './Components/HomePageView'
import LoggedInView from './Components/LoggedInView'
import Header from './Components/Header'
import Configuration from './Data/Configuration';
import RequestService from './Data/RequestService';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      isLoggedIn: false,
      userInformation: null
    };
    this.service = new RequestService();

  }

  toggleLoginState = (logIn) => {

    if(logIn === true){
      

    
        setTimeout(go => {
          this.service
            .getCustomer("447507340455")
            .then(d => {
              this.setState(
                {
                  isLoggedIn: true,
                  userInformation: { 
                    firstName: d.firstName, 
                    lastName: d.lastName,
                    customerId: d.custID,
                    postCode: d.postCode,
                    address: d.address,
                    emailAddress: d.emailAddress,
                    accountID: d.accountID
                  }
                });
                
            });
          },100);     
    
    }else{
      this.setState(state => ({
        isLoggedIn: false
      }));
    }
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
