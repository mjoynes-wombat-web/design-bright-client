/* eslint-env browser */
import React from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';

import { LoginForm, Message } from '../../../../../partials';

class Login extends React.Component {
  // Sets up state and props and binds this to the class methods.
  constructor(props) {
    super(props);
    this.state = {
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

    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {
    const search = queryString.parse(this.props.location.search);

    document.title = 'Login - Design Bright';

    if ('origin' in search) {
      switch (search.origin) {
        case 'secure':
          return this.setState({
            message: {
              type: 'login required',
              message: 'You must be logged in to access this page.',
            },
            error: {
              type: '',
              message: '',
            },
          });
        default:
          return null;
      }
    }
    return null;
  }

  render() {
    if (this.props.onRequireAuth()) {
      if (Object.keys(this.props.userInfo).length > 0) {
        return (
          <Redirect to={{
            pathname: '/user/profile',
            search: '?origin=login',
          }} />
        );
      }
      return (
        <Redirect to={{
          pathname: '/user/profile',
        }} />
      );
    }
    return (
      <main id="login">
        <Message
          error={this.state.error}
          onClearMessage={() => this.setState({ message: { type: '', message: '' } })}
          message={this.state.message}
          onClearError={() => this.setState({ error: { type: '', message: '' } })} />
        <LoginForm
          actionName={'Login'} />
      </main>
    );
  }
}

export default Login;
