/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';

import Button from '../../button';

// IMPORT COMPONENTS
import OverlayModal from '../../overlayModal';
import LoginForm from '../form';

// LOGIN MODAL
// Returns the Login Form component wrapped in a modal overlay to display above the page.
const LoginModal = ({ actionName, closeAction }) => (
  <OverlayModal closeAction={closeAction}>
    <LoginForm actionName={actionName} />
    <Button cancel onClick={closeAction} type="button">Cancel</Button>
  </OverlayModal>
);

export default LoginModal;
