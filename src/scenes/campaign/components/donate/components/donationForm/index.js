/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';
import { CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement } from 'react-stripe-elements';

// IMPORT HELPERS
import { validEmail } from '../../../../../../helpers';

// DONATION FORM
// Accepts the makeDonation function, inputs state, onChangeInptus function,
// Stripe.JS styling, cancelDonations function, and valid variable.
const DonationForm = ({
  makeDonation,
  inputs,
  onChangeInputs,
  stripeStyle,
  cancelDonation,
  valid,
}) => (
  <div className="small-12 medium-10 large-8 columns">
    <h2>
      <span className="underlined">
        How Much Would You Like to Donate?
      </span>
    </h2>
    <form
      onSubmit={makeDonation}>
      <div className="row align-middle align-center">
        <div className="small-12 columns">
          <label
            className={`row ${parseInt(inputs.donation, 10) >= 50 ? '' : ' invalid'}`}
            htmlFor="cardHolder">
            <div className="small-12 columns">
              Donation: <span className="required">*</span>
            </div>
            <div className=" small-12 columns">
              <span className='error'>You must enter at least $0.50.</span>
            </div>
          </label>
          <input
            value={`$${(inputs.donation.slice(0, inputs.donation.length - 2))}.${inputs.donation.slice(-2)}`}
            onChange={onChangeInputs}
            name="donation"
            id="donation"
            type="text"
            required />
          <label
            className={`row ${(inputs.cardHolder.split(' ').length >= 2 && inputs.cardHolder.split(' ')[1] !== '') || inputs.cardHolder.length === 0 ? '' : ' invalid'}`}
            htmlFor="cardHolder">
            <div className="small-12 columns">
              Name on Card: <span className="required">*</span>
            </div>
            <div className=" small-12 columns">
              <span className='error'>You must enter at least a first and last name.</span>
            </div>
          </label>
          <input
            value={inputs.cardHolder}
            onChange={onChangeInputs}
            name="cardHolder"
            id="cardHolder"
            type="text"
            required />
          <label
            className="row"
            htmlFor="paymentCard">
            <div className="small-12 columns">
              Payment Card: <span className="required">*</span>
            </div>
            <div className=" small-12 columns">
              <span className='error'>Please enter a valid card number.</span>
            </div>
          </label>
          <CardNumberElement
            onChange={onChangeInputs}
            style={stripeStyle}
            id="paymentCard" />
          <label
            className="row"
            htmlFor="cardExpiration">
            <div className="small-12 columns">
              Card Expiration: <span className="required">*</span>
            </div>
            <div className=" small-12 columns">
              <span className='error'>Please enter a valid expiration date.</span>
            </div>
          </label>
          <CardExpiryElement
            onChange={onChangeInputs}
            style={stripeStyle}
            id="cardExpiration" />
          <label
            className="row"
            htmlFor="CVC">
            <div className="small-12 columns">
              Security Code (CVC): <span className="required">*</span>
            </div>
            <div className=" small-12 columns">
              <span className='error'>Please enter a valid security code (CVC).</span>
            </div>
          </label>
          <CardCVCElement
            onChange={onChangeInputs}
            style={stripeStyle}
            id="CVC" />
          <label
            className="row"
            htmlFor="billingZip">
            <div className="small-12 columns">
              Billing Zip: <span className="required">*</span>
            </div>
            <div className=" small-12 columns">
              <span className='error'>Please enter a valid zip code.</span>
            </div>
          </label>
          <PostalCodeElement
            onChange={onChangeInputs}
            style={stripeStyle}
            id="billingZip" />
          <label htmlFor="email" className={`row ${validEmail(inputs.email) || inputs.email.length === 0 ? '' : ' invalid'}`}>
            <div className="small-12 columns">
              Email for Receipt:
            </div>
            <div className=" small-12 columns">
              <span className='error'>Please enter a valid email address.</span>
            </div>
          </label>
          <input
            value={inputs.email}
            onChange={onChangeInputs}
            name="email"
            id="email"
            type="email" />
        </div>
        <button
          className={`primary columns small-10${valid ? '' : ' disabled'}`}
          type="submit"
          disabled={!valid}>
          Make Donation
        </button>
        <span className='error small-12'>
          Please make sure you've entered all your information.
        </span>
      </div>
    </form>
    <div className="row align-center">
      <button
        className="cancel columns shrink"
        onClick={cancelDonation}
        type='button'>
        Cancel
      </button>
    </div>
  </div>
);

export default DonationForm;
