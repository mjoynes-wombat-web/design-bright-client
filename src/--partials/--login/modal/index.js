/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';

// IMPORT COMPONENTS
import { OverlayModal } from '../../';
import LoginForm from '../form';

// LOGIN MODAL
// Returns the Login Form component wrapped in a modal overlay to display above the page.
const LoginModal = ({ actionName, closeAction }) => (
  <OverlayModal closeAction={closeAction}>
    <LoginForm actionName={actionName} />
    <div className="row align-center">
      <button
        className="cancel columns shrink"
        onClick={closeAction}
        type='button'>
        Cancel
      </button>
    </div>
  </OverlayModal>
);

export default LoginModal;
