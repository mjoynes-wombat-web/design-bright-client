/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';

// IMPORT STYLING
import './scss/style.scss';

// MESSAGE COMPONENT
// This displays errors and messages on the page. It accepts an error object,
// message object, clear error and clear message function. 
// Errors are prioritized over messages.
const Message = ({ error, message, onClearError, onClearMessage }) => {
  if (error.message !== '' || message.message !== '') {
    return (
      <section id="message" className={`small-12 columns${error.message !== '' ? ' error' : ''}`}>
        <p><a onClick={error.message !== '' ? onClearError : onClearMessage}></a>{error.message !== '' ? error.message : message.message}</p>
      </section>
    );
  }
  return null;
};

export default Message;
