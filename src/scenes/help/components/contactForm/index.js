/* eslint-env browser */
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { validEmail } from '../../../../helpers';

import './scss/style.scss';


class ContactForm extends React.Component {
  // Sets up state and props and binds this to the class methods.
  constructor(props) {
    super(props);
    this.state = {
      inputs: {
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: '',
        agreed: false,
      },
      valid: false,
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
      { inputs, valid: this.validate() },
    );
  }

  currentInputValid(name) {
    switch (name) {
      case 'firstName':
      case 'lastName':
      case 'message':
      case 'subject':
        return (this.state.inputs[name].length > 0);
      case 'email':
        return (this.state.inputs.email.length > 0
          && validEmail(this.state.inputs.email));
      case 'agreed':
        return this.state.inputs.agreed;
      default:
        return false;
    }
  }

  validate() {
    const inputs = Object.keys(this.state.inputs);
    for (let i = 0; i < inputs.length; i += 1) {
      if (!this.currentInputValid(inputs[i])) {
        return false;
      }
    }
    return true;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.valid) {
      const Message = (
        { email,
          firstName,
          lastName,
          subject,
          message }) =>
        (
          {
            email,
            firstName,
            lastName,
            subject,
            message,
          }
        );

      axios.post(
        `https://${window.location.hostname}:3000/api/help`,
        Message(this.state.inputs))
        .then((results) => {
          this.props.onNewMessage(results.data.message);
          const inputs = {
            firstName: '',
            lastName: '',
            email: '',
            subject: '',
            message: '',
            agreed: false,
          };
          this.setState({ inputs, valid: false });
          window.scroll(0, 0);
        })
        .catch((error) => {
          const createAdvisorError = error.response.data;
          this.props.onNewError(createAdvisorError.message);

          window.scroll(0, 0);
        });
    } else {
      this.props.onNewError('You have an invalid or empty field. Please make sure everything is filled out.');

      window.scroll(0, 0);
    }
  }

  render() {
    document.title = 'Help - Design Bright';
    return (
      <section className="main-image small-12 large-6 columns" id="contact">
        <form className="row align-center" onSubmit={this.onSubmit}>
          <h1 className="small-12 columns">
            <span className="underlined">
              Contact Us
            </span>
          </h1>
          <div className="small-12 columns">
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
            <label htmlFor="email" className={`row${(this.currentInputValid('email') || this.state.inputs.email.length === 0) ? '' : ' invalid'}`}>
              <div className="small-12 columns">
                Email: <span className="required">*</span>
              </div>
              <div className=" small-12 columns">
                <span className='error'>Please enter a valid email address.</span>
              </div>
            </label>
            <input
              value={this.state.inputs.email}
              onChange={this.onChange}
              type="email"
              name="email"
              required
              id="email" />
            <label htmlFor="lastName">
              Subject: <span className="required">*</span>
            </label>
            <input
              value={this.state.inputs.subject}
              onChange={this.onChange}
              type="text"
              name="subject"
              id="subject"
              required />
            <label htmlFor="message">
              Message: <span className="required">*</span>
            </label>
            <textarea
              value={this.state.inputs.message}
              onChange={this.onChange}
              name="message"
              id="message"
              required />
          </div>
          <label htmlFor="terms" className="small-12 columns terms">
            <input
              checked={this.state.inputs.agreed}
              onChange={this.onChange}
              type="checkbox"
              name="agreed"
              id="terms"
              required />
            <span></span>I agree to the Design Bright <Link to="/help/terms">terms of
            service.</Link> <span className='required'>*</span>
          </label>
          <button
            className={`primary small-11 medium-10 columns${this.state.valid ? '' : ' disabled'}`}
            disabled={!this.state.valid}
            type="submit">
            Send Message
          </button>
          <span className='error small-12'>
            Please make sure you've entered all your information.
          </span>
        </form>
      </section>
    );
  }
}

export default ContactForm;
