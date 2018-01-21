/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';
import { Link } from 'react-router-dom';

// IMPORT COMPONENTS
import Message from '../../../message';
import { Input } from '../../../../components/inputs';
import Heading from '../../../../components/heading';
import Button from '../../../../components/button';

import validEmail from '../../../../helpers/validEmail';

// IMPORT STYLING
import './scss/style.scss';

// LOGIN FORM
class LoginForm extends React.Component {
  // Sets up state and props and binds this to the class methods.
  constructor(props) {
    super(props);
    this.state = {
      inputs: {
        email: '',
        password: '',
      },
      loginAttempted: false,
      message: {
        type: '',
        message: '',
      },
      error: {
        type: '',
        message: '',
      },
    };
    this.onChange = this.onChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.validate = this.validate.bind(this);
    this.currentInputValid = this.currentInputValid.bind(this);
  }

  onChange(e) {
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    const { inputs } = this.state;
    inputs[name] = value;

    this.setState({
      inputs,
      error: {
        type: '',
        message: '',
      },
      valid: this.validate(),
    });
  }

  currentInputValid(name) {
    switch (name) {
      case 'email':
        return (this.state.inputs.email.length > 0
          && validEmail(this.state.inputs.email));
      case 'password':
        return (this.state.inputs.password.length > 0);
      default:
        return false;
    }
  }

  validate() {
    const inputs = Object.keys(this.state.inputs);
    for (let i = 0; i < inputs.length; i += 1) {
      if (this.state.inputs.userType === 'donor' && i === 7) {
        break;
      }
      if (!this.currentInputValid(inputs[i])) {
        return false;
      }
    }
    return true;
  }

  // ON USER LOGIN
  // Runs when user submits form to login.
  onLogin(e) {
    e.preventDefault();
    // Grab the email and password from state.
    const { email, password } = this.state.inputs;
    // Runs the Redux function to login, passing it the email and password.
    this.props.onLogin(
      {
        email,
        password,
      },
      // Callback function that runs if there is an error.
      () => {
        // Clear the password.
        this.setState({
          inputs: {
            email,
            password: '',
          },
          valid: false,
          error: this.props.error,
        });
        // Scroll to the top of the page.
        window.scroll(0, 0);
      },
    );
  }

  render() {
    return (
      <div id="loginForm">
        {/* Message component which displays messages and errors. */}
        <Message
          error={this.state.error}
          onClearMessage={() => this.setState({ message: { type: '', message: '' } })}
          message={this.state.message}
          onClearError={() => this.setState({ error: { type: '', message: '' } })} />
        <section>
          <form onSubmit={this.onLogin}>
            <Heading type='h1' text={this.props.actionName} />
            <p className='register-link'>
              <Link onClick={() => { document.body.style.overflow = ''; }} to="/register">
                Create an Account
              </Link>
            </p>
            <Input
                onChange={this.onChange}
                type='text'
                inputLabel='Email'
                value={this.state.inputs.email}
                width='20rem'
                id='email'
                error={!(this.currentInputValid('email') || this.state.inputs.email.length === 0) ? 'Please enter a valid email address.' : null}
                required />
            <Input
                onChange={this.onChange}
                type='password'
                inputLabel='Password'
                value={this.state.inputs.password}
                width='16rem'
                id='password'
                required />
            <Button primary type="submit" disabled={!this.state.valid} error={'Please make sure you\'ve entered all your information.'}>Login</Button>
          </form>
        </section>
      </div>
    );
  }
}

export default LoginForm;
