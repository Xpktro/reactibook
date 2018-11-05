import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Composer from './Composer';
import PostFeed from './PostFeed';

class Feed extends Component {
  render() {
    const { auth: { isEmpty } } = this.props;
    if(isEmpty) {
      return <Redirect to="/login" />;
    }

    return (
      <Fragment>
        <Composer />
        <hr />
        <PostFeed />
      </Fragment>
    );
  }
}

export default connect(state => ({
  auth: state.firebase.auth,
}))(Feed);