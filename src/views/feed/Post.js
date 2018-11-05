import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardFooter,
  Badge,
  Input,
} from 'reactstrap';
import moment from 'moment';

class Post extends Component {
  state = { content: '', editing: false };
  updatePost = () => {
    const { id, firebase } = this.props;
    const { content } = this.state;
    firebase.update(`/posts/${id}`, { content }).then(() => this.setState({ editing: false }));
  };

  removePost = () => {
    const { id, firebase } = this.props;
    firebase.remove(`/posts/${id}`);
  };

  updateContent = (event) => this.setState({ content: event.target.value });
  enableEditing = () => this.setState({
    editing: true,
    content: this.props.post.content,
  });

  render() {
    const { post, user, auth } = this.props;
    const { content, editing } = this.state;
    return (
      <Card>
        <CardBody>
          <CardTitle>
            {editing
             ? <Input type="textarea" value={content} onChange={this.updateContent} />
             : post.content}
          </CardTitle>
          {auth.email === user.email &&
          <CardSubtitle>
            {editing
             ? <Badge color="dark" href="#" onClick={this.updatePost}>Save</Badge>
             : <Badge color="dark" href="#" onClick={this.enableEditing}>Edit</Badge>}
            <Badge color="dark" href="#" onClick={this.removePost}>Delete</Badge>
          </CardSubtitle>}
          <CardFooter>
            {user.email} - {moment(post.createdAt).format('LLL')}
          </CardFooter>
        </CardBody>
      </Card>
    );
  }
}

export default connect(state => ({
  auth: state.firebase.auth,
}))(withFirebase(Post));