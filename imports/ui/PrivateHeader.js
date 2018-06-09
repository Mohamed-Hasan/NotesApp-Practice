import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';
// const handleLogOut = 

export const PrivateHeader = (props) => {
  return (
    <div className="header">
      <div className="header__content">
        <h1 className="header__title">{props.title}</h1>
        <button className="button button--link-text" onClick={()=> props.handleLogOut()}>Logout</button>
      </div>
    </div>
  );
};

PrivateHeader.propTypes = {
  title: React.PropTypes.string.isRequired,
  handleLogOut: React.PropTypes.func.isRequired
};

export default createContainer(()=> {
  return {
    handleLogOut: () => Accounts.logout()
  }
}, PrivateHeader);
