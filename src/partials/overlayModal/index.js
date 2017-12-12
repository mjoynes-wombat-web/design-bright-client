/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';

// IMPORT STYLING
import './scss/style.scss';

// OVERLAY MODAL
// This puts it's child component in a modal overlay above all the other page elements.
const OverlayModal = ({ closeAction, children }) => (
  <div className="overlay" id="overlayModal">
    <div className="background">
      <div className="close">
        <span onClick={closeAction}></span>
      </div>
      {children}
    </div>
  </div>
);

export default OverlayModal;
