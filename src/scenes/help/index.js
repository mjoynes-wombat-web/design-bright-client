/* eslint-env browser */
import React from 'react';

import ContactForm from './components/contactForm';
import FAQ from './components/faq';
import { Message } from '../../partials';

import './scss/style.scss';

class Help extends React.Component {
  // Sets up state and props and binds this to the class methods.
  constructor(props) {
    super(props);
    this.state = {
      message: {
        type: '',
        message: '',
      },
      error: {
        type: '',
        message: '',
      },
    };
  }

  render() {
    document.title = 'Help - Design Bright';
    return (
      <main id="help">
        <Message
          error={this.state.error}
          onClearMessage={() => this.setState({ message: { type: '', message: '' } })}
          message={this.state.message}
          onClearError={() => this.setState({ error: { type: '', message: '' } })} />
        <div className="row">
          <div className="small-12 large-6 columns">
            <div className="row">
              <section className="small-12 columns">
                <h1>
                  <span className="underlined">
                    How Can We Help?
                  </span>
                </h1>
                <p>
                  We’d love to help you. Design Bright’s goal is to make your experience simple and
                pleasant. Please view our <a href="#FAQ">Frequently Asked Questions</a> for the most
                common problems that people run into. If those don’t help you feel free
                to <a href="#contact">Contact Us</a> below.
                </p>
              </section>
              <FAQ />
            </div>
          </div>
          <ContactForm
            onNewMessage={message => this.setState({
              message: {
                type: 'help-request',
                message,
              },
            })}
            onNewError={message => this.setState({
              error: {
                type: 'help-request',
                message,
              },
            })} />
        </div>
      </main>
    );
  }
}

export default Help;
