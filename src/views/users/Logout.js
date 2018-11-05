import React from 'react';
import { Redirect } from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase';

const Logout = ({ firebase }) => {
  firebase.logout();
  return <Redirect to="/" />
};

export default withFirebase(Logout);
