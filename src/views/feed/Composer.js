import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form, FormGroup, Button, Input } from 'reactstrap';
import { withFirebase } from 'react-redux-firebase';

class Composer extends Component {
  state = { content: '', visibility: 'public' };

  onSubmit = event => {
    event.preventDefault();
    const { firebase, auth: { uid: userId } } = this.props;
    const { content, visibility } = this.state;
    firebase.push(
      '/posts',
      {
        user: userId,
        type: 'text',
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        content,
        visibility,
      },
    ).then(() => this.setState({ content: '' }));
  };

  onChangeUpdate = stateField => event => {
    this.setState({ [ stateField ]: event.target.value });
  };

  render() {
    const { content } = this.state;
    return (
      <Row>
        <Col lg={{ size: 6, offset: 3 }}>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Input type="textarea" placeholder="What's happening?" value={content} onChange={this.onChangeUpdate('content')} />
            </FormGroup>
            <Row form className="d-flex align-items-end justify-content-end">
              <Col xs="3">
                <Input type="select" onChange={this.onChangeUpdate('visibility')}>
                  <option value="public">Public</option>
                  <option value="friends">Friends</option>
                </Input>
              </Col>
              <Col xs="2">
                <Button disabled={!content}>Publish</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default connect((state) => ({
  auth: state.firebase.auth,
}))(withFirebase(Composer));