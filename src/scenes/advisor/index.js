/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';
import Link from 'react-router-dom/Link';
import axios from 'axios';

// IMPORT HELPER FUNCTIONS
import { validEmail } from '../../helpers';

// IMPORT PARTIAL COMPONENTS
import Message from '../../components/message';
import Heading from '../../components/heading';
import { Input, Checkbox } from '../../components/inputs';
import Button from '../../components/button';

// IMPORT STYLING
import './scss/style.scss';

// ADVISOR COMPONENT
// The advisor component for the advisor page.
class Advisor extends React.Component {
  // Sets up state and props and binds this to the class methods.
  constructor(props) {
    super(props);
    this.state = {
      inputs: {
        firstName: '',
        lastName: '',
        email: '',
        position: '',
        yearsExperience: '',
        agreed: false,
      },
      message: {
        type: '',
        message: '',
      },
      error: {
        type: '',
        message: '',
      },
      valid: false,
    };

    this.onChangeInputs = this.onChangeInputs.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.currentInputValid = this.currentInputValid.bind(this);
  }

  // Makes changes to state when inputs change.
  onChangeInputs(e) {
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    const { inputs } = this.state;
    inputs[name] = value;
    this.setState({ inputs, valid: this.validate() });
  }

  // Checks if the input passed is valid based on the name.
  currentInputValid(name) {
    switch (name) {
      case 'firstName':
      case 'lastName':
        return (this.state.inputs[name].length > 0);
      case 'position':
        return (this.state.inputs[name].length > 0);
      case 'email':
        return (this.state.inputs.email.length > 0
          && validEmail(this.state.inputs.email));
      case 'yearsExperience':
        return (
          Number.isInteger(parseInt(this.state.inputs.yearsExperience, 10))
          && this.state.inputs.yearsExperience > 0);
      case 'agreed':
        return this.state.inputs.agreed;
      default:
        return false;
    }
  }

  // Loops through the inputs and validates each one.
  validate() {
    const inputs = Object.keys(this.state.inputs);
    for (let i = 0; i < inputs.length; i += 1) {
      if (!this.currentInputValid(inputs[i])) {
        return false;
      }
    }
    return true;
  }

  // Sends the form info to the database and returns an error or success message to the uers.
  onSubmit(e) {
    e.preventDefault();
    if (this.state.valid) {
      const newAdvisor = ({
        email,
        firstName,
        lastName,
        position,
        yearsExperience,
      }) =>
        (
          {
            email,
            firstName,
            lastName,
            position,
            yearsExperience,
          }
        );

      axios.post(
        `https://${window.location.hostname}:3000/api/advisor/create`,
        newAdvisor(this.state.inputs),
      )
        .then((results) => {
          this.setState({
            message: {
              type: 'create advisor',
              message: results.data.message,
            },
            error: {
              type: '',
              message: '',
            },
          });
          const inputs = {
            firstName: '',
            lastName: '',
            email: '',
            position: '',
            yearsExperience: '',
            agreed: false,
          };
          this.setState({ inputs, valid: false });
          window.scroll(0, 0);
        })
        .catch((error) => {
          const createAdvisorError = error.response.data;
          this.setState({
            error: {
              type: 'create advisor',
              message: createAdvisorError.message,
            },
            message: {
              type: '',
              message: '',
            },
          });

          if (createAdvisorError.statusCode === 409) {
            const { inputs } = this.state;
            inputs.email = '';
            this.setState({ inputs });
          }

          window.scroll(0, 0);
        });
    } else {
      this.setState({
        error: {
          type: 'submit advisor',
          message: 'You have an invalid or empty field. Please make sure everything is filled out.',
        },
      });

      window.scroll(0, 0);
    }
  }

  // Renders the advisor form.
  render() {
    document.title = 'Become an Advisor - Design Bright';
    return (
      <main id="advisor">
        <Message
          error={this.state.error}
          onClearMessage={() => this.setState({ message: { type: '', message: '' } })}
          message={this.state.message}
          onClearError={() => this.setState({ error: { type: '', message: '' } })} />
        <section className='main-content'>
          <form onSubmit={this.onSubmit}>
            <Heading type="h1" text="Become an Advisor" />
            <Input
              onChange={this.onChangeInputs}
              type='text'
              inputLabel='First Name'
              value={this.state.inputs.firstName}
              width='16rem'
              id='firstName'
              required />
            <Input
              onChange={this.onChangeInputs}
              type='text'
              inputLabel='Last Name'
              value={this.state.inputs.lastName}
              width='16rem'
              id='lastName'
              required />
            <Input
              onChange={this.onChangeInputs}
              type='email'
              inputLabel='Email'
              value={this.state.inputs.email}
              width='20rem'
              id='email'
              error={!(this.currentInputValid('email') || this.state.inputs.email.length === 0) ? 'Please enter a valid email address.' : null}
              required />
            <Input
              onChange={this.onChangeInputs}
              type='text'
              inputLabel='Current Position'
              value={this.state.inputs.position}
              width='22rem'
              id='position'
              required />
            <Input
              onChange={this.onChangeInputs}
              type='number'
              inputLabel='Years of Experience:'
              value={this.state.inputs.yearsExperience}
              width='5rem'
              id='yearsExperience'
              required />

            <Checkbox
              id={'agreed'}
              onChange={this.onChangeInputs}
              className='agreed'
              checked={this.state.inputs.agreed}
              required>
              I agree to the Design Bright <Link to="/help/terms">terms of service.</Link>
            </Checkbox>
            <Button primary type="submit" disabled={!this.state.valid} error={'Please make sure you\'ve entered all your information.'}>Submit Request</Button>
          </form>
        </section>
      </main>
    );
  }
}

export default Advisor;
