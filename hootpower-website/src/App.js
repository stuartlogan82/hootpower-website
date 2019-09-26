import React from 'react';
import './App.scss';
import HomePageView from './Components/HomePageView'
import LoggedInView from './Components/LoggedInView'
import Header from './Components/Header'
import Configuration from './Data/Configuration';
import RequestService from './Data/RequestService';

const fetchCustomerData = (phoneNumber) => {
  const service = new RequestService()
  return service
    .getCustomer(phoneNumber)
    .then(d => {
      console.log("customer data")
      return {
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
      }

    });
}
class App extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userInformation: null
    };
    this.service = new RequestService();

  }

  onAddressUpdate(address, postCode) {
    console.log("On address update")
    console.log(postCode, address)
    this.setState({ postCode: postCode, address: address })
  }

  toggleLoginState = (logIn) => {

    if (logIn === true) {
      fetchCustomerData("447507340455").then(data => {
        console.log("State set")
        console.log(data);
        this.setState(data)
      });


      // setTimeout(go => {
      //   this.service
      //     .getCustomer("447507340455")
      //     .then(d => {
      //       this.setState(
      //         {
      //           isLoggedIn: true,
      //           userInformation: {
      //             firstName: d.firstName,
      //             lastName: d.lastName,
      //             customerId: d.custID,
      //             postCode: d.postCode,
      //             address: d.address,
      //             emailAddress: d.emailAddress,
      //             accountID: d.accountID
      //           }
      //         });

      //     });
      //   },100);

    } else {
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
          (<LoggedInView onLogin={this.toggleLoginState} userInformation={this.state.userInformation} fetchCustomerData={fetchCustomerData} onAddressUpdate={this.onAddressUpdate.bind(this)} />)
          :
          (<HomePageView onLogin={this.toggleLoginState} />)
        }
      </>
    );
  }
}

export default App;
