import React from 'react';
import UsageChart from '../Components/UsageChart'
import Button from './AccountButton'
import AccountButton from './AccountButton';

class LoggedInView extends React.Component {
  render() {
    return (<main>
      <section className="section-account">
        <div className="u-center-text u-margin-bottom-medium">
          <h2 className="heading-secondary">
            Welcome, Customer Name
          </h2>
        </div>
        <div className="container">

          <div className="row">
            <div className="col-sm-6">
              <UsageChart />
            </div>

            <div className="col-sm-6">
              <div className="card">
                <div className="card-header card-header-primary">
                  <h2>Managing your account</h2>
                </div>
                <div className="card-body">
                  <AccountButton label="Submit Meter Reading" />
                  <AccountButton label="Request a call" />
                  <AccountButton label="Change Address" />
                  <p className="description">Give us a call!</p>
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