import React, { Component, Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { Row, Col, Button, ButtonGroup } from 'reactstrap';
import Loader from 'views/common/Loader';
import Post from './Post';

class PostFeed extends Component {
  state = { visibilityFilter: 'public' };

  getPosts() {
    const { posts } = this.props;
    const { visibilityFilter } = this.state;
    return posts.filter(post => post.value.visibility === visibilityFilter).reverse();
  }

  updateVisibility = to => () => this.setState({ visibilityFilter: to });

  render() {
    const { posts, users } = this.props;
    const { visibilityFilter } = this.state;
    if(!isLoaded(posts) || !isLoaded(users)) {
      return <Loader />;
    }

    if(isEmpty(posts)) {
      return <Col className="text-center">No posts yet.</Col>;
    }

    return <Fragment>
      <Row>
        <Col lg={{ offset: 3 }} className="filters">
          <ButtonGroup>
            <Button
              color="secondary"
              size="sm"
              outline active={visibilityFilter === 'public'}
              onClick={this.updateVisibility('public')}>
              Public
            </Button>

            <Button
              color="secondary"
              size="sm"
              outline active={visibilityFilter === 'friends'}
              onClick={this.updateVisibility('friends')}>
              Friends
            </Button>
          </ButtonGroup>
        </Col>
      </Row>

      <Row>
        {this.getPosts().map(post =>
          <Col key={post.key} lg={{ size: 6, offset: 3 }}>
            <Post id={post.key} post={post.value} user={users[ post.value.user ]} />
          </Col>,
        )}
      </Row>
    </Fragment>;
  }
}

export default compose(
  firebaseConnect([ 'posts#orderByChild=createdAt', 'users' ]),
  connect(state => ({
    auth: state.firebase.auth,
    posts: state.firebase.ordered.posts,
    users: state.firebase.data.users,
  })),
)(PostFeed);