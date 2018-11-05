import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
  Alert,
} from 'reactstrap';

class UserForm extends Component {
  state = { email: '', password: '', errors: {} };

  onSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    const { onSubmit } = this.props;
    const errors = {};

    if(!email) {
      errors.email = 'Cannot be empty';
    }
    if(!password) {
      errors.password = 'Cannot be empty';
    }

    this.setState({ errors });

    if(Object.keys(errors).length === 0) {
      onSubmit(email, password);
    }
  };

  onChangeUpdate = stateField => event => {
    this.setState({ [ stateField ]: event.target.value });
  };

  render() {
    const { title, authError } = this.props;
    const { errors: { email: emailError, password: passwordError } } = this.state;
    return (
      <Row>
        <Col lg={{ size: 4, offset: 4 }}>
          <Form onSubmit={this.onSubmit}>
            <h1>{title}</h1>
            <hr />
            {authError && <Alert color="danger">{authError.message}</Alert>}
            <FormGroup>
              <Label for="email">Email:</Label>
              <Input invalid={!!emailError} type="email" placeholder="user@example.com" onChange={this.onChangeUpdate('email')} />
              {emailError && <FormFeedback>{emailError}</FormFeedback>}
            </FormGroup>
            <FormGroup>
              <Label for="password">Password:</Label>
              <Input invalid={!!passwordError} type="password" placeholder="password" onChange={this.onChangeUpdate('password')} />
              {passwordError && <FormFeedback>{passwordError}</FormFeedback>}
            </FormGroup>
            <Button color="success">{title}</Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default connect((state) => ({
  authError: state.firebase.authError,
}))(UserForm);
