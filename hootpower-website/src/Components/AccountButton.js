import React from 'react';


class AccountButton extends React.Component {
  render() {
    return <button type="button" className="btn btn-lg account-btn">{this.props.label}</button>
  }
}

export default AccountButton;