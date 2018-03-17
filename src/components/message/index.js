/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';
import styled from 'styled-components';

import screenBreaks from '../../consts/screen-breaks.scss';

import redBrush from '../../assets/img/red-brush.png';
import blueBrush from '../../assets/img/blue-brush.png';

import { CloseIcon } from '../../components/svgs/icons';

// MESSAGE COMPONENT
// This displays errors and messages on the page. It accepts an error object,
// message object, clear error and clear message function.
// Errors are prioritized over messages.
const Message = styled(({
  error,
  message,
  onClearError,
  onClearMessage,
  className,
}) => {
  if (error.message !== '' || message.message !== '') {
    return (
      <section id="message" className={`${className}${error.message !== '' ? ' error' : ''}`}>
      <CloseIcon onClick={error.message !== '' ? onClearError : onClearMessage}/>
        <p>
          {error.message !== '' ? error.message : message.message}</p>
      </section>
    );
  }
  return null;
})`
&#message {
  position: absolute;
  background-image: url(${blueBrush});
  background-position-x: 50%;
  background-position-y: 60%;
  background-size: 140% 110%;
  width: 100%;
  text-align: center;
  z-index: 100;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 0 1rem 0;

  &.error {
    background-image: url(${redBrush});
    background-position-x: 50%;
    background-position-y: 60%;
    background-size: 140% 110%;
  }

  > p {
    color: white;
    font-weight: normal;
    font-size: 1.125rem;
    text-shadow: 0 0 2rem rgba(0, 0, 0, 0.5);
    margin: 0;

    @media screen and (min-width: ${screenBreaks.medium}) {
      font-size: 1.25rem;
      margin: 0;
    }
  }

  > svg {
    width: 1.75rem;
    height: 1.75rem;
    padding-right: 0.375rem;
    cursor: pointer;

    > * {
      fill: white;
    }
  }
}
`;

export default Message;
