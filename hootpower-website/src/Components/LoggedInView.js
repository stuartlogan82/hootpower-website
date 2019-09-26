import React from 'react';
import UsageChart from '../Components/UsageChart';
import '@progress/kendo-theme-material/dist/all.css';
import Button from './AccountButton'
import AccountButton from './AccountButton';
import WebChat from './WebChat';

class LoggedInView extends React.Component {

  constructor(props) {
    super(props);
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
                  <table className="table table-condensed">
                    <tr>
                      <th>Name</th>
                      <td>{this.props.userInformation.firstName} {this.props.userInformation.lastName}</td>
                    </tr>
                    <tr>
                      <th>Account Number</th>
                      <td>{this.props.userInformation.accountNumber}</td>
                    </tr>
                    <tr>
                      <th>Sign Out</th>
                      <td><button className="btn btn-xs btn-primary" onClick={this.onLogOut}>Log Out</button></td>
                    </tr>
                  </table>
                </div>
              </div>

              <hr />
              
              <UsageChart />

              

            </div>

            <div className="col-sm-5">
              <div className="card">
                <div className="card-header card-header-primary">
                  <h2>Your account</h2>
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