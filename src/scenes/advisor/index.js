/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// IMPORT HELPER FUNCTIONS
import { validEmail } from '../../helpers';

// IMPORT PARTIAL COMPONENTS
import { Message } from '../../partials';

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
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const inputs = this.state.inputs;
    inputs[name] = value;
    this.setState(
      { inputs, valid: this.validate() },
    );
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
      const newAdvisor = (
        { email,
          firstName,
          lastName,
          position,
          yearsExperience }) =>
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
        newAdvisor(this.state.inputs))
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
            const inputs = this.state.inputs;
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
        <section className="row align-center">
          <form className="small-12 medium-10 large-8 columns" onSubmit={this.onSubmit}>
            <div className="row">
              <h1 className="small-12 columns">
                <span className="underlined">
                  Become an Advisor
                </span>
              </h1>
            </div>
            <div className="row align-center">
              <div className="small-12 columns">
                <label htmlFor="firstName">
                  First Name: <span className="required">*</span>
                </label>
                <input
                  value={this.state.inputs.firstName}
                  onChange={this.onChangeInputs}
                  type="text"
                  name="firstName"
                  id="firstName"
                  required />
                <label htmlFor="lastName">
                  Last Name: <span className="required">*</span>
                </label>
                <input
                  value={this.state.inputs.lastName}
                  onChange={this.onChangeInputs}
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
                  onChange={this.onChangeInputs}
                  type="email"
                  name="email"
                  required
                  id="email" />
                <label htmlFor="position">
                  Current Position: <span className="required">*</span>
                </label>
                <input
                  value={this.state.inputs.position}
                  onChange={this.onChangeInputs}
                  type="text"
                  name="position"
                  id="position"
                  required />
                <label htmlFor="yearsExperience">
                  Years of Experience: <span className="required">*</span>
                </label>
                <input
                  value={this.state.inputs.yearsExperience}
                  onChange={this.onChangeInputs}
                  type="number"
                  name="yearsExperience"
                  id="yearsExperience"
                  required />
              </div>
            </div>
            <div className="row align-center">
              <label htmlFor="terms" className="small-12 columns terms">
                <input
                  checked={this.state.inputs.agreed}
                  onChange={this.onChangeInputs}
                  type="checkbox"
                  name="agreed"
                  id="terms"
                  required />
                <span></span>I agree to the Design Bright <Link to="/help/terms">terms of
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

export default Advisor;
