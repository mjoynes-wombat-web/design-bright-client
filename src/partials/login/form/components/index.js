/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';
import { Link } from 'react-router-dom';

// IMPORT HELPER FUNCTIONS
import { validEmail } from '../../../../helpers';

// IMPORT COMPONENTS
import { Message } from '../../../';

// IMPORT STYLING
import './scss/style.scss';

// LOGIN FORM
class LoginForm extends React.Component {
  // Sets up state and props and binds this to the class methods.
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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

    this.onChangeInputs = this.onChangeInputs.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  // ON INPUTS CHANGE
  // Change the state when the inputs change.
  onChangeInputs(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  // ON USER LOGIN
  // Runs when user submits form to login.
  onLogin(e) {
    e.preventDefault();
    // Grab the email and password from state.
    const { email, password } = this.state;
    // Runs the Redux function to login, passing it the email and password.
    this.props.onLogin(
      {
        email,
        password,
      },
      // Callback function that runs if there is an error.
      () => {
        // Clear the password.
        this.setState({ password: '' });
        // Set the error message which the Message component displays.
        this.setState({ error: this.props.error });
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
        <section className="row align-center">
          <form className="small-12 large-6 columns" onSubmit={this.onLogin}>
            <div className="row">
              <h1 className="small-12 columns">
                <span className="underlined">
                  {this.props.actionName}
                </span>
              </h1>
              <p className="small-12 columns register-link">
                <Link onClick={() => { document.body.style.overflow = ''; }} to="/register">
                  Need an Account?
                </Link>
              </p>
            </div>
            <div className="row align-center">
              <div className="small-12 columns">
                <label htmlFor="email"
                  className={`row${this.state.error.type === 'login' ? ' invalid' : ''}${(validEmail(this.state.email) || this.state.email.length === 0) ? '' : ' invalid'}`}>
                  <div className="small-12 columns">
                    Email: <span className="required">*</span>
                  </div>
                  <div className="small-12 columns">
                    <span className="error">{this.state.error.type === 'login' ? this.state.error.message : 'Please enter a valid email address.'}</span>
                  </div>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={this.state.email}
                  onChange={this.onChangeInputs}
                  required />
                <label htmlFor="password" className={this.props.userAuth.error ? 'invalid' : ''}>Password: <span className="required">*</span></label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={this.state.password}
                  onChange={this.onChangeInputs}
                  required />
              </div>
            </div>
            <div className="row align-center">
              <button
                className="primary small-11 medium-10 large-10 columns"
                type="submit">
                Login
              </button>
            </div>
          </form>
        </section>
      </div>
    );
  }
}

export default LoginForm;
