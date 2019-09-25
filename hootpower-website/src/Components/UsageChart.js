import React from 'react';


class UsageChart extends React.Component {
    render() {
        return <div className="card">
        <div className="card-header card-header-primary">
          <h2>Energy Usage</h2>
        </div>
        <div className="card-body">
          <p className="description"></p>
        </div>
      </div>;
    }
}

export default UsageChart;