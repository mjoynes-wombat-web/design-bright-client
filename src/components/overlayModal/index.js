/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';

import { CloseIcon } from '../svgs/icons';

// IMPORT STYLING
import './scss/style.scss';

// OVERLAY MODAL
// This puts it's child component in a modal overlay above all the other page elements.
const OverlayModal = ({ closeAction, children }) => (
  <div className="overlay" id="overlayModal">
    <div className="background">
      <CloseIcon onClick={closeAction} />
      {children}
    </div>
  </div>
);

export default OverlayModal;
