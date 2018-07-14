/* eslint-env browser */
import React from 'react';
import Link from 'react-router-dom/Link';
import axios from 'axios';

import { validEmail } from '../../../../helpers';
import { Input, Checkbox, TextArea } from '../../../../components/inputs';
import Button from '../../../../components/button';
import Heading from '../../../../components/heading';
import Loading from '../../../../components/loading';

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
      requestPending: false,
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
    this.setState({ inputs, valid: this.validate() });
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
    this.setState({ requestPending: true });
    e.preventDefault();
    if (this.state.valid) {
      const messageDetails = {
        firstName: this.state.inputs.firstName,
        lastName: this.state.inputs.lastName,
        senderEmail: this.state.inputs.email,
        receiverEmail: 'ssmith@designbright.org',
        subject: `${this.state.inputs.subject} - Design Bright`,
        msg: this.state.inputs.message,
        confirmation: 'Thank you for contacting us. We will get back to you in 24 hours.',
        receptionMsg: 'This message was sent from www.designbright.org',
        receiverName: 'Design Bright',
      };

      axios.post(
        'https://192.168.86.200:7777/api/v1/contact',
        messageDetails,
      )
        .then((results) => {
          this.props.onNewMessage(results.data.msg);
          const inputs = {
            firstName: '',
            lastName: '',
            email: '',
            subject: '',
            message: '',
            agreed: false,
          };
          this.setState({ inputs, valid: false, requestPending: false });
          window.scroll(0, 0);
        })
        .catch((error) => {
          this.setState({ requestPending: false });
          const createAdvisorError = error.response.data;
          this.props.onNewError(createAdvisorError.msg);

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
      <section id="contact" style={this.state.requestPending ? { position: 'relative' } : null}>
        {this.state.requestPending ? <Loading text="Sending Message" component position='absolute'/> : null}
        <form onSubmit={this.onSubmit}>
        <Heading type="h1" text="Contact Us" />
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
              required />

            <Input
              onChange={this.onChange}
              type='text'
              inputLabel='Subject'
              value={this.state.inputs.subject}
              width='20rem'
              id='subject'
              required />
            <TextArea
              onChange={this.onChange}
              inputLabel='Message'
              value={this.state.inputs.message}
              width='100%'
              maxWidth='40rem'
              height='10rem'
              id='message'
              placeholder='Please put any questions or comments that you have here.'
              required />
            <Checkbox
              id={'agreed'}
              onChange={this.onChange}
              className='agreed'
              checked={this.state.inputs.agreed}
              required>
              I agree to the Design Bright <Link to="/help/terms">terms of service.</Link>
            </Checkbox>
            <Button primary type="submit" disabled={!this.state.valid} error={'Please make sure you\'ve entered all your information.'}>Send Message</Button>
        </form>
      </section>
    );
  }
}

export default ContactForm;
