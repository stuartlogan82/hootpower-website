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
    return (<main>
      <section className="section-account">

        <div className="container">

          <div className="row">
            <div className="col-sm-7">

              <div className="card">
                <div className="card-header card-header-primary">
                  <h2>Account Details</h2>
                </div>
                <div className="card-body">
                  {this.state.userInformation != null ? (
                  <table className="table table-condensed">
                    <tr>
                      <th>Name</th>
                      <td>{this.props.userInformation.firstName} {this.props.userInformation.lastName}</td>
                    </tr>
                    <tr>
                      <th>Customer Number</th>
                      <td>{this.props.userInformation.customerId}</td>
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
                  <WebChat firstName={this.props.userInformation.firstName} />
                  {/* <AccountButton label="Submit Meter Reading" />
                  <AccountButton label="Request a call" />
                  <AccountButton label="Change Address" /> */}
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