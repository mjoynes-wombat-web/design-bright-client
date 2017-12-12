/* eslint-env browser */
import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { states, validEmail } from '../../../../../helpers';
import { Message } from '../../../../../partials';

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

class EditProfile extends React.Component {
  // Sets up state and props and binds this to the class methods.
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.userInfo.firstName,
      lastName: this.props.userInfo.lastName,
      email: this.props.userInfo.email,
      password: '',
      confirmPassword: '',
      address: this.props.userInfo.address,
      city: this.props.userInfo.city,
      state: this.props.userInfo.state,
      userType: this.props.userInfo.userType,
      zip: String(this.props.userInfo.zip),
      valid: true,
      profileSaved: true,
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
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {
    document.title = this.props.userInfo.userType === 'non-profit'
      ? `Edit ${this.props.userInfo.nonProfitName}'s Profile - Design Bright`
      : `Edit ${this.props.userInfo.firstName} ${this.props.userInfo.lastName}'s Profile - Design Bright`;
  }

  onChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(
      {
        [name]: value,
        profileSaved: false,
      },
      () => {
        if (this.validate()) {
          this.setState({ valid: true });
        } else {
          this.setState({ valid: false });
        }
      },
    );
  }

  validate() {
    if (
      this.state.firstName.length > 0
      && this.state.lastName.length > 0
      && (this.state.email.length > 0
        && validEmail(this.state.email))
      && (
        this.state.password.length === 0
        || (doPasswordsMatch(this.state.password, this.state.confirmPassword)
          && this.state.password.length > 0)
      )
      && (
        this.state.userType === 'donor'
        || (
          this.state.address.length > 0
          && this.state.city.length > 0
          && this.state.state.length === 2
          && (isNumber(this.state.zip)
            && numLength(this.state.zip, 5))
        )
      )
    ) {
      return true;
    }
    return false;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.valid) {
      const User = (
        { email,
          password,
          firstName,
          lastName,
          address,
          city,
          state,
          zip }) =>
        ({
          userInfo: {
            email,
            password,
            user_metadata: {
              firstName,
              lastName,
              passwordDate: new Date(),
            },
          },
          nonProfitInfo: {
            address,
            city,
            state,
            zip,
          },
        }
        );

      const data = {
        editData: User(this.state),
        accessToken: this.props.userAuth.accessToken,
      };

      axios.patch(
        `https://${window.location.hostname}:3000/api/users/edit`,
        data)
        .then((editUserResults) => {
          this.setState({
            password: '',
            confirmPassword: '',
            message: {
              type: 'edit user',
              message: editUserResults.data.message,
            },
            error: {
              type: '',
              message: '',
            },
          });
          this.props.onGetUserInfo();
          window.scroll(0, 0);
        })
        .catch((editUserErr) => {
          if (editUserErr.response.data.statusCode === 409) {
            this.setState({ email: this.props.userInfo.email });
          }
          this.setState({
            password: '',
            confirmPassword: '',
            error: {
              type: 'edit user',
              message: editUserErr.response.data.message,
            },
            message: {
              type: '',
              message: '',
            },
          });
          window.scroll(0, 0);
        });
    } else {
      this.setState({
        error: {
          type: 'empty field',
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
    if (this.props.onRequireAuth()) {
      if (Object.keys(this.props.userInfo).length > 0) {
        return (
          <main id="editProfile">
            <Message
              error={this.state.error}
              onClearMessage={() => this.setState({ message: { type: '', message: '' } })}
              message={this.state.message}
              onClearError={() => this.setState({ error: { type: '', message: '' } })} />
            <section className="row align-center">
              <form className="small-12 columns" onSubmit={this.onSubmit}>
                <div className="row">
                  <h1 className="small-12 columns">
                    <span className="underlined">
                      Edit Profile
                    </span>
                  </h1>
                </div>
                <div className="row align-center">
                  <div className="small-12 large-4 columns">
                    <fieldset>
                      <label htmlFor="first-name">
                        First Name: <span className="required">*</span>
                      </label>
                      <input
                        value={this.state.firstName}
                        onChange={this.onChange}
                        type="text"
                        name="firstName"
                        id="first-name"
                        required />
                      <label htmlFor="last-name">
                        Last Name: <span className="required">*</span>
                      </label>
                      <input
                        value={this.state.lastName}
                        onChange={this.onChange}
                        type="text"
                        name="lastName"
                        id="last-name"
                        required />
                      <label htmlFor="email" className={`row${(validEmail(this.state.email) || this.state.email.length === 0) ? '' : ' invalid'}`}>
                        <div className="small-12 columns">
                          Email: <span className="required">*</span>
                        </div>
                        <div className=" small-12 columns">
                          <span className='error'>Please enter a valid email address.</span>
                        </div>
                      </label>
                      <input
                        value={this.state.email}
                        onChange={this.onChange}
                        type="email"
                        name="email"
                        required
                        id="email" />
                    </fieldset>
                  </div>
                  <div className="small-12 large-4 columns">
                    <hr className="hide-for-large" />
                    <div className="small-12 columns"></div>
                    <label htmlFor="password" className="row align-bottom align-justify">
                      <div className="small-4 columns">
                        Password:
                      </div>
                      <div className="columns shrink">
                        <span className="detail">Leave blank to keep your current password.</span>
                      </div>
                    </label>
                    <input
                      value={this.state.password}
                      onChange={this.onChange}
                      type="password"
                      name="password"
                      id="password" />
                    <label htmlFor="confirm-password" className={`row${doPasswordsMatch(this.state.password, this.state.confirmPassword) ? '' : ' invalid'}`}>
                      <div className="small-12 columns">
                        Confirm Password:
                      </div>
                      <div className=" small-12 columns">
                        <span className='error'>Your passwords don't match.</span>
                      </div>
                    </label>
                    <input
                      value={this.state.confirmPassword}
                      onChange={this.onChange}
                      type="password"
                      name="confirmPassword"
                      id="confirm-password" />
                  </div>
                  <div className='small-12 large-4 columns'>
                    <div className={this.state.userType === 'non-profit' ? '' : 'hide'}>
                      <hr className="hide-for-large" />
                      <label htmlFor="address">
                        Address: <span className="required">*</span>
                      </label>
                      <input
                        value={this.state.address}
                        onChange={this.onChange}
                        type="text"
                        name="address"
                        id="address"
                        required={this.state.userType === 'non-profit'} />
                      <label htmlFor="city">
                        City: <span className="required">*</span>
                      </label>
                      <input
                        value={this.state.city}
                        onChange={this.onChange}
                        type="text"
                        name="city"
                        id="city"
                        required={this.state.userType === 'non-profit'} />
                      <label htmlFor="state">
                        State: <span className="required">*</span>
                      </label>
                      <select
                        value={this.state.state}
                        onChange={this.onChange}
                        name="state"
                        id="state"
                        required={this.state.userType === 'non-profit'} >
                        <option value="" disabled>Choose Your State</option>
                        {states.map(
                          (state, i) =>
                            <option value={state.abbreviation} key={i}>
                              {state.name}
                            </option>)}
                      </select>
                      <label htmlFor="zip" className={`row ${(isNumber(this.state.zip) && numLength(this.state.zip, 5)) ? '' : 'invalid'}${numLength(this.state.zip, 0) ? ' empty' : ''}`}>
                        <div className="small-12 columns">
                          Zip: <span className="required">*</span>
                        </div>
                        <div className="small-12 columns">
                          <span className='error'>You entered an invalid Zip Code.</span>
                        </div>
                      </label>
                      <input
                        value={this.state.zip}
                        onChange={this.onChange}
                        type="text"
                        name="zip"
                        id="zip"
                        required={this.state.userType === 'non-profit'} />
                    </div>
                  </div>
                </div>
                <div className="row align-center">
                  <button
                    className={`primary small-11 medium-10 large-8 columns${this.state.valid ? '' : ' disabled'}${this.state.profileSaved ? ' disabled' : ''}`}
                    disabled={!this.state.valid || this.state.profileSaved}
                    type="submit">
                    {this.state.profileSaved ? 'No Changes Made' : 'Save Changes'}
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
    return (
      <Redirect to={{
        pathname: '/login',
        search: '?origin=secure',
      }} />
    );
  }
}

export default EditProfile;
