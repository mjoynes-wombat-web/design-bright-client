/* eslint-env browser */
import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

import states from '../../../../../helpers/states';
import validEmail from '../../../../../helpers/validEmail';
import Message from '../../../../../partials/message';

import './scss/style.scss';

const doPasswordsMatch = (pass, confPass) => pass === confPass;
const isNumber = (num) => {
  const numbers = num.match('[0-9]+');
  if (numbers) {
    return numbers[0] === num;
  }
  return false;
};
const numLength = (num, length) => String(num).length === length;

class Register extends React.Component {
  // Sets up state and props and binds this to the class methods.
  constructor(props) {
    super(props);
    this.state = {
      inputs: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        userType: 'donor',
        agreed: false,
        position: '',
        nonProfitName: '',
        ein: '',
        address: '',
        city: '',
        state: '',
        zip: '',
      },
      valid: false,
      userPostResults: {},
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
    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.currentInputValid = this.currentInputValid.bind(this);
  }

  onChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const inputs = this.state.inputs;
    inputs[name] = value;

    this.setState(
      {
        inputs,
        error: {
          type: '',
          message: '',
        },
        valid: this.validate(),
      },
    );
  }

  currentInputValid(name) {
    switch (name) {
      case 'firstName':
      case 'lastName':
      case 'position':
      case 'nonProfitName':
      case 'address':
      case 'city':
        return (this.state.inputs[name].length > 0);
      case 'email':
        return (this.state.inputs.email.length > 0
          && validEmail(this.state.inputs.email));
      case 'password':
      case 'confirmPassword':
        return (doPasswordsMatch(this.state.inputs.password, this.state.inputs.confirmPassword)
          && this.state.inputs.password.length > 0);
      case 'userType':
        return (['donor', 'non-profit'].includes(this.state.inputs.userType));
      case 'ein':
        return (isNumber(this.state.inputs.ein)
          && numLength(this.state.inputs.ein, 9));
      case 'state':
        return (this.state.inputs.state.length === 2);
      case 'zip':
        return (isNumber(this.state.inputs.zip)
          && numLength(this.state.inputs.zip, 5));
      case 'agreed':
        return this.state.inputs.agreed;
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

  onSubmit(e) {
    e.preventDefault();
    if (this.state.valid) {
      const User = (
        { email,
          password,
          firstName,
          lastName,
          userType,
          position,
          nonProfitName,
          ein,
          address,
          city,
          state,
          zip }) => ({
        userInfo: {
          email,
          password,
          user_metadata: {
            firstName,
            lastName,
            passwordDate: new Date(),
            position,
          },
          app_metadata: {
            userType,
          },
        },
        nonProfitInfo: {
          name: nonProfitName,
          ein,
          address,
          city,
          state,
          zip,
        },
      });

      axios.post(
        `https://${window.location.hostname}:3000/api/users/create`,
        User(this.state.inputs))
        .then((results) => {
          const createUserResults = results.data;
          this.setState({
            message: {
              type: 'register',
              message: `Congratulations, your have created an account for ${createUserResults.data.email}.`,
            },
            error: {
              type: '',
              message: '',
            },
          });
          this.setState({ userPostResults: createUserResults });

          window.scroll(0, 0);
        })
        .catch((error) => {
          const createUserError = error.response.data;
          if (createUserError.message === 'The user already exists.') {
            createUserError.message = `${createUserError.data.email.charAt(0).toUpperCase()}${createUserError.data.email.slice(1)} is already in use.`;
          }
          const inputs = this.state.inputs;
          inputs.email = '';
          this.setState({
            inputs,
            error: {
              type: 'register',
              message: createUserError.message,
            },
            message: {
              type: '',
              message: '',
            },
          });
          this.setState({ userPostResults: createUserError });

          window.scroll(0, 0);
        });
    } else {
      this.setState({
        error: {
          type: 'register',
          message: 'You have an invalid or empty field. Please make sure everything is filled out.',
        },
        message: {
          type: '',
          message: '',
        },
      });

      window.scroll(0, 0);
    }
  }

  render() {
    document.title = 'Register User - Design Bright';
    if (this.props.onRequireAuth()) {
      return (
        <Redirect to={{
          pathname: '/user/profile',
          search: '?origin=register',
        }} />
      );
    }
    return (
      <main id="register">
        <Message
          error={this.state.error}
          onClearMessage={() => this.setState({ message: { type: '', message: '' } })}
          message={this.state.message}
          onClearError={() => this.setState({ error: { type: '', message: '' } })} />
        <section className="row align-center">
          <form className="small-12 columns" onSubmit={this.onSubmit}>
            <div className="row">
              <h1 className="small-12 columns"><span className="underlined">Register</span></h1>
            </div>
            <div className="row align-center">
              <div className="small-12 large-4 columns">
                <fieldset>
                  <label htmlFor="firstName">
                    First Name: <span className="required">*</span>
                  </label>
                  <input
                    value={this.state.inputs.firstName}
                    onChange={this.onChange}
                    type="text"
                    name="firstName"
                    id="firstName"
                    required />
                  <label htmlFor="lastName">
                    Last Name: <span className="required">*</span>
                  </label>
                  <input
                    value={this.state.inputs.lastName}
                    onChange={this.onChange}
                    type="text"
                    name="lastName"
                    id="lastName"
                    required />
                  <label htmlFor="email" className={`row${this.state.error.type === 'register' ? ' invalid' : ''}${(this.currentInputValid('email') || this.state.inputs.email.length === 0) ? '' : ' invalid'}`}>
                    <div className="small-12 columns">
                      Email: <span className="required">*</span>
                    </div>
                    <div className=" small-12 columns">
                      <span className='error'>{this.state.error.type === 'register' ? this.state.error.message : 'Please enter a valid email address.'}</span>
                    </div>
                  </label>
                  <input
                    value={this.state.inputs.email}
                    onChange={this.onChange}
                    type="email"
                    name="email"
                    required
                    id="email" />
                </fieldset>
                <hr />
                <label htmlFor="password">
                  Password: <span className="required">*</span>
                </label>
                <input
                  value={this.state.inputs.password}
                  onChange={this.onChange}
                  type="password"
                  name="password"
                  id="password"
                  required />
                <label htmlFor="confirmPassword" className={`row${(this.currentInputValid('confirmPassword') || this.state.inputs.password.length === 0) ? '' : ' invalid'}`}>
                  <div className="small-12 columns">
                    Confirm Password: <span className="required">*</span>
                  </div>
                  <div className=" small-12 columns">
                    <span className='error'>Your passwords don't match.</span>
                  </div>
                </label>
                <input
                  value={this.state.inputs.confirmPassword}
                  onChange={this.onChange}
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  required />
                <hr className="hide-for-large" />
              </div>
              <div className="small-12 large-4 columns">
                <fieldset className="userType">
                  <legend>
                    Are you a donor or non-profit? <span className="required">*</span>
                  </legend>
                  <label htmlFor="donor">
                    <input
                      onChange={this.onChange}
                      type="radio"
                      checked={this.state.inputs.userType === 'donor'}
                      name="userType"
                      value="donor"
                      id="donor" />
                    <span></span>
                    Donor
                  </label>
                  <label htmlFor="non-profit">
                    <input
                      onChange={this.onChange}
                      checked={this.state.inputs.userType === 'non-profit'}
                      type="radio"
                      name="userType"
                      value="non-profit"
                      id="non-profit" />
                    <span></span>
                    Non-Profit
                  </label>
                </fieldset>
                <div className={this.state.inputs.userType === 'non-profit' ? '' : 'hide'}>
                  <label htmlFor="position">
                    Position at Non-Profit: <span className="required">*</span>
                  </label>
                  <input
                    value={this.state.inputs.position}
                    onChange={this.onChange}
                    type="text"
                    name="position"
                    id="position"
                    required={this.state.inputs.userType === 'non-profit'} />
                  <label htmlFor="nonProfitName">
                    Non-Profit Name: <span className="required">*</span>
                  </label>
                  <input
                    value={this.state.inputs.nonProfitName}
                    onChange={this.onChange}
                    type="text"
                    name="nonProfitName"
                    id="nonProfitName"
                    required={this.state.inputs.userType === 'non-profit'} />
                  <label
                    htmlFor="ein"
                    className={`row align-bottom${(this.currentInputValid('ein') || this.state.inputs.ein.length === 0) ? '' : ' invalid'}${numLength(this.state.inputs.ein, 0) ? ' empty' : ''}`}>
                    <div className="small-12 columns">
                      Employer Identification Number (EIN): <span className="required">*</span>
                    </div>
                    <div className="small-12 columns">
                      <span className='error'>You entered an invalid EIN.</span>
                    </div>
                  </label>
                  <input
                    value={this.state.inputs.ein}
                    onChange={this.onChange}
                    type="text"
                    name="ein"
                    id="ein"
                    required={this.state.inputs.userType === 'non-profit'} />
                  <hr className="hide-for-large" />
                </div>
              </div>
              <div className='small-12 large-4 columns'>
                <div className={this.state.inputs.userType === 'non-profit' ? '' : 'hide'}>
                  <label htmlFor="address">
                    Address: <span className="required">*</span>
                  </label>
                  <input
                    value={this.state.inputs.address}
                    onChange={this.onChange}
                    type="text"
                    name="address"
                    id="address"
                    required={this.state.inputs.userType === 'non-profit'} />
                  <label htmlFor="city">
                    City: <span className="required">*</span>
                  </label>
                  <input
                    value={this.state.inputs.city}
                    onChange={this.onChange}
                    type="text"
                    name="city"
                    id="city"
                    required={this.state.inputs.userType === 'non-profit'} />
                  <label htmlFor="state">
                    State: <span className="required">*</span>
                  </label>
                  <select
                    value={this.state.inputs.state}
                    onChange={this.onChange}
                    name="state"
                    id="state"
                    required={this.state.inputs.userType === 'non-profit'} >
                    <option value="" disabled>Choose Your State</option>
                    {states.map(
                      (state, i) =>
                        <option value={state.abbreviation} key={i}>
                          {state.name}
                        </option>)}
                  </select>
                  <label htmlFor="zip" className={`row ${(this.currentInputValid('zip') || this.state.inputs.zip.length === 0) ? '' : 'invalid'}${numLength(this.state.inputs.zip, 0) ? ' empty' : ''}`}>
                    <div className="small-12 columns">
                      Zip: <span className="required">*</span>
                    </div>
                    <div className="small-12 columns">
                      <span className='error'>You entered an invalid Zip Code.</span>
                    </div>
                  </label>
                  <input
                    value={this.state.inputs.zip}
                    onChange={this.onChange}
                    type="text"
                    name="zip"
                    id="zip"
                    required={this.state.inputs.userType === 'non-profit'} />
                </div>
              </div>
            </div>
            <div className="row align-center">
              <label htmlFor="terms" className="small-12 columns terms">
                <input
                  checked={this.state.inputs.agreed}
                  onChange={this.onChange}
                  type="checkbox"
                  name="agreed"
                  id="terms"
                  required />
                <span></span> {this.state.inputs.userType === 'non-profit' ? 'I am authorized to represent the non-profit listed above and' : 'I '} agree to the Design Bright <Link to="/help/terms">terms of
            service.</Link> <span className='required'>*</span>
              </label>
              <button
                className={`primary small-11 medium-10 large-8 columns${this.state.valid ? '' : ' disabled'}`}
                disabled={!this.state.valid}
                type="submit">
                Submit Request
              </button>
              <span className='error small-12'>
                Please make sure you've entered all your information.
              </span>
            </div>
          </form>
        </section>
      </main>
    );
  }
}

export default Register;
