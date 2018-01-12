/* eslint-env browser */
import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

import states from '../../../../../helpers/states';
import validEmail from '../../../../../helpers/validEmail';
import Message from '../../../../../partials/message';
import isNumber from '../../../../../helpers/isNumber';
import numLength from '../../../../../helpers/numLength';

import colors from '../../../../../consts/colors.scss';

import { Input, RadioFieldset, Select, Checkbox } from '../../../../../components/inputs';
import Button from '../../../../../components/button';
import Line from '../../../../../components/svgs/line';
import Heading from '../../../../../components/heading';

import birdImage from '../../../../../assets/img/bird.jpg';
import stalksImage from '../../../../../assets/img/stalks.jpg';

import CTAText from './cta-text';

import './scss/style.scss';

const doPasswordsMatch = (pass, confPass) => pass === confPass;

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
      const User = ({
        email,
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
        zip,
      }) => ({
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
        User(this.state.inputs),
      )
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
          const { inputs } = this.state;
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
        <section className='main-content'>
          <form onSubmit={this.onSubmit}>
            <Heading type='h1' text='Register' />
            <section className="main-info">
              <CTAText
                fgColor='rgba(245, 232, 211, 0.8)'
                bgColor='#f5e8d3'
                image={birdImage}
                textColor={colors.darkGraphite}
                heading={this.state.inputs.userType === 'donor' ? 'Help a Cause' : 'Get Support'}
                text={this.state.inputs.userType === 'donor'
                ? 'There are many non-profits that need your help supporting their cause. The beauty of crowd funding is that every little bit helps. No matter the donation you can be a part of creating a brighter future.'
                : 'Do you have a vision for a brighter future? Sign up today to get support for your cause. With us you will find people all across the country that are passionate like you and want to help out.'}
                 />
              <div className="form-inputs">
                <fieldset>
                  <Input
                    onChange={this.onChange}
                    type='text'
                    inputLabel='First Name'
                    value={this.state.inputs.firstName}
                    width='16rem'
                    id='firstName'
                    required />
                  <Input
                    onChange={this.onChange}
                    type='text'
                    inputLabel='Last Name'
                    value={this.state.inputs.lastName}
                    width='16rem'
                    id='lastName'
                    required />
                  <Input
                    onChange={this.onChange}
                    type='email'
                    inputLabel='Email'
                    value={this.state.inputs.email}
                    width='20rem'
                    id='email'
                    error={!(this.currentInputValid('email') || this.state.inputs.email.length === 0) ? 'Please enter a valid email address.' : null}
                    // TODO: Make this display error from Auth0 invalid/duplciate email.
                    required />
                </fieldset>
                <Line color={colors.graphite} type='hr' />
                <fieldset>
                  <Input
                    onChange={this.onChange}
                    type='password'
                    inputLabel='Password'
                    value={this.state.inputs.password}
                    width='16rem'
                    id='password'
                    required />
                  <Input
                    onChange={this.onChange}
                    type='password'
                    inputLabel='Confirm Password'
                    value={this.state.inputs.confirmPassword}
                    width='16rem'
                    id='confirmPassword'
                    error={this.currentInputValid('confirmPassword') || this.state.inputs.password.length === 0 ? null : 'Your passwords don\'t match.'}
                    required />
                </fieldset>
                <Line color={colors.graphite} type='hr' />
                <RadioFieldset
                  fieldsetName='userType'
                  fieldsetLegend='Are you a donor or non-profit?'
                  required
                  onChange={this.onChange}
                  checked={this.state.inputs.userType}
                  fields={
                    [
                      {
                        id: 'donor',
                        name: 'Donor',
                        value: 'donor',
                      },
                      {
                        id: 'non-profit',
                        name: 'Non-Profit',
                        value: 'non-profit',
                      },
                    ]
                  }
                />
            </div>
          </section>
          <section className={`non-profit-info ${this.state.inputs.userType === 'non-profit' ? '' : 'hide'}`}>
          <CTAText
                fgColor='rgba(185, 215, 248, 0.8)'
                bgColor='rgb(152, 195, 245)'
                textColor='white'
                image={stalksImage}
                heading='Fund Your Cause'
                text={'Do you have a cause you need help getting off the ground? We can help you find donors who are as passionate as you are. Sign up and get your campaign up today!'}
                 />
            <div className="form-inputs">
              <fieldset>
                <Input
                  onChange={this.onChange}
                  type='text'
                  inputLabel='Position at Non-Profit'
                  value={this.state.inputs.position}
                  width='20rem'
                  id='position'
                  required={this.state.inputs.userType === 'non-profit'} />
                <Input
                  onChange={this.onChange}
                  type='text'
                  inputLabel='Non-Profit Name'
                  value={this.state.inputs.nonProfitName}
                  width='20rem'
                  id='nonProfitName'
                  required={this.state.inputs.userType === 'non-profit'} />
                <Input
                  onChange={this.onChange}
                  type='text'
                  inputLabel='Employer Identification Number (EIN)'
                  value={this.state.inputs.ein}
                  id='ein'
                  error={(this.currentInputValid('ein') || this.state.inputs.ein.length === 0) ? null : 'You entered an invalid EIN.'}
                  required={this.state.inputs.userType === 'non-profit'} />
              </fieldset>
              <Line color={colors.graphite} type='hr' />
              <fieldset>
                <Input
                  onChange={this.onChange}
                  type='text'
                  inputLabel='Address'
                  value={this.state.inputs.address}
                  width='20rem'
                  id='address'
                  required={this.state.inputs.userType === 'non-profit'} />
                <Input
                  onChange={this.onChange}
                  type='text'
                  inputLabel='City'
                  value={this.state.inputs.city}
                  width='16rem'
                  id='city'
                  required={this.state.inputs.userType === 'non-profit'} />
                <Select
                  onChange={this.onChange}
                  type='text'
                  inputLabel='State'
                  value={this.state.inputs.state}
                  width='14rem'
                  id='state'
                  required={this.state.inputs.userType === 'non-profit'}
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
                  value={this.state.inputs.zip}
                  id='zip'
                  error={(this.currentInputValid('zip') || this.state.inputs.zip.length === 0) ? null : 'You entered an invalid Zip Code.'}
                  required={this.state.inputs.userType === 'non-profit'} />
              </fieldset>
            </div>
            <div className="cta-text">
            </div>
          </section>
          <Checkbox
            id={'agreed'}
            onChange={this.onChange}
            className='agreed'
            checked={this.state.inputs.agreed}
            required>
            {this.state.inputs.userType === 'non-profit' ? 'I am authorized to represent the non-profit listed above and' : 'I '} agree to the Design Bright <Link to="/help/terms">terms of service.</Link>
          </Checkbox>
          <Button primary type="submit" disabled={!this.state.valid} error={'Please make sure you\'ve entered all your information.'}>Register User</Button>
        </form>
      </section>
    </main>
    );
  }
}

export default Register;
