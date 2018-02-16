/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';

// IMPORT HELPERS
import { validEmail } from '../../../../../../helpers';
import Heading from '../../../../../../components/heading';
import Button from '../../../../../../components/button';
import { Input } from '../../../../../../components/inputs';
import { CardNumberInput, CardExpiryInput, CardCVCInput, PostalCodeInput } from './components/stripeInputs';

// DONATION FORM
// Accepts the makeDonation function, inputs state, onChangeInptus function,
// Stripe.JS styling, cancelDonations function, and valid variable.
const DonationForm = ({
  makeDonation,
  inputs,
  onChangeInputs,
  stripeStyle,
  cancelDonation,
  stripeErrors,
  valid,
}) => (
  <div id='donationForm'>
    <Heading type='h2' text='How Much Would You Like to Donate?' />
    <form
      onSubmit={makeDonation}>
        <Input
              onChange={onChangeInputs}
              type='text'
              inputLabel='Donation'
              value={`$${(inputs.donation.slice(0, inputs.donation.length - 2))}.${inputs.donation.slice(-2)}`}
              width='10rem'
              id='donation'
              error={parseInt(inputs.donation, 10) >= 50 ? null : 'You must enter at least $0.50.'}
              required />
        <CardNumberInput
          id="paymentCard"
          inputLabel="Payment Card"
          width='14rem'
          required
          error={ stripeErrors.paymentCard }
          stripeStyle={stripeStyle}
          onChange={onChangeInputs} />
        <CardExpiryInput
          id="cardExpiration"
          inputLabel="Card Expiration"
          width='5rem'
          required
          error={ stripeErrors.cardExpiration }
          stripeStyle={stripeStyle}
          onChange={onChangeInputs} />
        <Input
              onChange={onChangeInputs}
              type='text'
              inputLabel='Name on Card'
              value={inputs.cardHolder}
              placeholder='Cardholder Name'
              width='20rem'
              id='cardHolder'
              error={(inputs.cardHolder.split(' ').length >= 2 && inputs.cardHolder.split(' ')[1] !== '') || inputs.cardHolder.length === 0 ? null : 'You must enter a first and last name.'}
              required />
        <CardCVCInput
          id="CVC"
          inputLabel="Security Code (CVC)"
          width='5rem'
          required
          error={ stripeErrors.CVC }
          stripeStyle={stripeStyle}
          onChange={onChangeInputs} />
        <PostalCodeInput
          id="billingZip"
          inputLabel="Billing Zip"
          width='5rem'
          required
          error={ stripeErrors.billingZip }
          stripeStyle={stripeStyle}
          onChange={onChangeInputs} />
        <Input
            onChange={onChangeInputs}
            type='email'
            inputLabel='Email for Receipt'
            placeholder='john@designbright.org'
            value={inputs.email}
            width='20rem'
            id='email'
            error={validEmail(inputs.email) || inputs.email.length === 0 ? null : 'Please enter a valid email address.'} />
        <Button primary type="submit" disabled={!valid} error={'Please make sure you\'ve entered all your information.'}>Make Donation</Button>
    </form>
    <Button cancel onClick={cancelDonation} type="button">Cancel</Button>
  </div>
);

export default DonationForm;
