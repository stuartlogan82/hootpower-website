import React from 'react';
import UsageChart from '../Components/UsageChart';
import '@progress/kendo-theme-material/dist/all.css';
import WebChat from './WebChat';
import Configuration from '../Data/Configuration';
import RequestService from '../Data/RequestService';

class LoggedInView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mounted: false
    }
    this.service = new RequestService();

  }


  onLogOut = () => {
    this.props.onLogin(false);
  }


  render() {
    console.log(this.state);
    return (<main>
      <section className="section-account">

        <div className="container u-margin-top-medium">

          <div className="row">
            <div className="col-sm-7">

              <div className="card">
                <div className="card-header card-header-primary">
                  <h2>Account Details</h2>
                </div>
                <div className="card-body">
                  {this.props.userInformation != null ? (
                  <table className="table table-condensed">
                    <tr>
                      <th>Name</th>
                      <td>
                        {this.props.userInformation.firstName} {this.props.userInformation.lastName}<br />
                        {this.props.userInformation.emailAddress}
                      </td>
                    </tr>
                    <tr>
                      <th>Customer Number</th>
                      <td>{this.props.userInformation.customerId}</td>
                    </tr>
                    <tr>
                      <th>Customer Address</th>
                      <td>{this.props.userInformation.address} <br />{this.props.userInformation.postCode}</td>
                    </tr>
                    <tr>
                      <th>Account ID</th>
                      <td>{this.props.userInformation.accountID}</td>
                    </tr>
                    <tr>
                      <th>Sign Out</th>
                      <td><button className="btn btn-xs btn-primary" onClick={this.onLogOut}>Log Out</button></td>
                    </tr>
                  </table>)
                  : (<div>Loading...</div>)

                }
                </div>
              </div>

              <hr />

              <UsageChart />



            </div>

            <div className="col-sm-5">
              <div className="card">
                <div className="card-header card-header-primary">
                  <h2>How can we help?</h2>
                </div>
                <div className="card-body">
                  {this.props.userInformation ? <WebChat firstName={this.props.userInformation.firstName} /> : "Loading Live Chat"}
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>

    </main>);
  }
}

export default LoggedInView