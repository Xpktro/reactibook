import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import './App.css';
import Loader from 'views/common/Loader';
import Navbar from 'views/common/Navbar';
import Home from 'views/home/Home';
import Feed from 'views/feed/Feed';
import Login from 'views/users/Login';
import Logout from 'views/users/Logout';
import Register from 'views/users/Register';

class App extends Component {
  render() {
    const { isLoaded } = this.props;
    if(!isLoaded) {
      return <Loader />;
    }
    return (
      <Router>
        <Fragment>
          <Navbar />
          <Container>

            <Route exact path="/" component={Home} />
            <Route path="/feed" component={Feed} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={Register} />
          </Container>
        </Fragment>
      </Router>
    );
  }
}

export default connect(state => ({
  isLoaded: state.firebase.auth.isLoaded,
}))(App);