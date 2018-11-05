import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase';
import UserForm from './UserForm';

class Register extends Component {
  onSubmit = (email, password) => {
    const { firebase } = this.props;
    firebase.createUser({ email, password });
  };

  render() {
    const { auth } = this.props;
    if(!auth.isEmpty) {
      return <Redirect to="/feed" />;
    }
    return <UserForm title={'Register'} onSubmit={this.onSubmit} />;
  }
}

export default connect(state => ({
  auth: state.firebase.auth,
}))(withFirebase(Register));