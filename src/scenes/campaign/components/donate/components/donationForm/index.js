/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';
import { CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement } from 'react-stripe-elements';

// IMPORT HELPERS
import { validEmail } from '../../../../../../helpers';
import Heading from '../../../../../../components/heading';
import Button from '../../../../../../components/button';
import { Input } from '../../../../../../components/inputs';

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
    <Heading type='h2' text='How Much Would You Like to Donate?' />
    <form
      onSubmit={makeDonation}>
        <Input
              onChange={onChangeInputs}
              type='text'
              inputLabel='Donation'
              value={`$${(inputs.donation.slice(0, inputs.donation.length - 2))}.${inputs.donation.slice(-2)}`}
              width='20rem'
              id='donation'
              error={parseInt(inputs.donation, 10) >= 50 ? null : 'You must enter at least $0.50.'}
              required />
        <Input
              onChange={onChangeInputs}
              type='text'
              inputLabel='Name on Card'
              value={inputs.cardHolder}
              width='30rem'
              id='cardHolder'
              error={(inputs.cardHolder.split(' ').length >= 2 && inputs.cardHolder.split(' ')[1] !== '') || inputs.cardHolder.length === 0 ? null : 'You must enter a first and last name.'}
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
        <Input
            onChange={onChangeInputs}
            type='email'
            inputLabel='Email for Receipt'
            value={inputs.email}
            width='30rem'
            id='email'
            error={validEmail(inputs.email) || inputs.email.length === 0 ? null : 'Please enter a valid email address.'} />
        <Button primary type="submit" disabled={!valid} error={'Please make sure you\'ve entered all your information.'}>Make Donation</Button>
    </form>
    <Button cancel onClick={cancelDonation} type="button">Cancel</Button>
  </div>
);

export default DonationForm;
