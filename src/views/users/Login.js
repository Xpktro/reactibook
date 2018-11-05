import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase';
import UserForm from './UserForm';

class Login extends Component {
  onSubmit = (email, password) => {
    const { firebase } = this.props;
    firebase.login({ email, password });
  };

  render() {
    const { auth } = this.props;
    if(!auth.isEmpty) {
      return <Redirect to="/feed" />;
    }
    return (
      <Fragment>
        <UserForm title={'Login'} onSubmit={this.onSubmit} />
        <Row>
          <Col lg={{ size: 4, offset: 4 }}>
            <p>You can also <Link to="/register">register.</Link></p>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default connect(state => ({
  auth: state.firebase.auth,
}))(withFirebase(Login));
