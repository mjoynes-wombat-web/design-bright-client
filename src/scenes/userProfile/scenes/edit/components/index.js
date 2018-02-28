/* eslint-env browser */
import React from 'react';
import Redirect from 'react-router-dom/Redirect';
import axios from 'axios';

import { states, validEmail } from '../../../../../helpers';
import Message from '../../../../../components/message';
import Heading from '../../../../../components/heading';
import Button from '../../../../../components/button';
import { Input, Select } from '../../../../../components/inputs';
import Line from '../../../../../components/svgs/line';

import colors from '../../../../../consts/colors.scss';

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
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

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
      const User = ({
        email,
        password,
        firstName,
        lastName,
        address,
        city,
        state,
        zip,
      }) =>
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
        data,
      )
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
            <section className='main-content'>
              <form onSubmit={this.onSubmit}>
                  <Heading type='h1' text='Edit Profile' />
                  <div className='inputs'>
                    <fieldset>
                      <Input
                        onChange={this.onChange}
                        type='text'
                        inputLabel='First Name'
                        value={this.state.firstName}
                        width='16rem'
                        id='firstName'
                        required />
                      <Input
                        onChange={this.onChange}
                        type='text'
                        inputLabel='Last Name'
                        value={this.state.lastName}
                        width='16rem'
                        id='lastName'
                        required />
                      <Input
                        onChange={this.onChange}
                        type='email'
                        inputLabel='Email'
                        value={this.state.email}
                        width='20rem'
                        id='email'
                        error = {(validEmail(this.state.email) || this.state.email.length === 0) ? '' : 'Please enter a valid email address.'}
                        required />
                    </fieldset>
                    <Line color={colors.graphite} type='hr' />
                    <fieldset>
                      <p>Leave blank to keep your current password.</p>
                      <Input
                        onChange={this.onChange}
                        type='password'
                        inputLabel='Password'
                        value={this.state.password}
                        width='16rem'
                        id='password'
                        required />
                      <Input
                        onChange={this.onChange}
                        type='password'
                        inputLabel='Confirm Password'
                        value={this.state.confirmPassword}
                        width='16rem'
                        id='confirmPassword'
                        error={doPasswordsMatch(this.state.password, this.state.confirmPassword) ? null : 'Your passwords don\'t match.'}
                        required />
                    </fieldset>
                    <Line color={colors.graphite} type='hr' />
                    {this.state.userType === 'non-profit'
                    ? (
                        <fieldset>
                          <Input
                            onChange={this.onChange}
                            type='text'
                            inputLabel='Address'
                            value={this.state.address}
                            width='20rem'
                            id='address'
                            required />
                          <Input
                            onChange={this.onChange}
                            type='text'
                            inputLabel='City'
                            value={this.state.city}
                            width='16rem'
                            id='city'
                            required />

                          <Select
                            onChange={this.onChange}
                            type='text'
                            inputLabel='State'
                            value={this.state.state}
                            width='14rem'
                            id='state'
                            required
                            options={states.map(state =>
                              ({
                                name: state.name,
                                value: state.abbreviation,
                              }))
                            }
                          />
                          <Input
                            onChange={this.onChange}
                            type='text'
                            inputLabel='Zip'
                            value={this.state.zip}
                            id='zip'
                            error={(isNumber(this.state.zip) && numLength(this.state.zip, 5)) ? null : 'You entered an invalid Zip Code.'}
                            required />
                    </fieldset>
                      )
                    : null}
                  </div>
                  <Button
                    primary
                    type="submit"
                    disabled={!this.state.valid || this.state.profileSaved}
                    error={'Please make sure you\'ve entered all your information.'}>
                      {this.state.profileSaved ? 'No Changes Made' : 'Save Changes'}
                  </Button>
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
