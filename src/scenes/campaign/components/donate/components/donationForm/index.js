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
  // stripeValid,
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
        <CardNumberInput
          id="paymentCard"
          inputLabel="Payment Card"
          required
          // error={ !stripeValid.paymentCard
          //   ? 'Please enter a valid card number.'
          //   : null }
          stripeStyle={stripeStyle}
          onChange={onChangeInputs} />
        <CardExpiryInput
          id="cardExpiration"
          inputLabel="Card Expiration"
          required
          // error={ !stripeValid.cardExpiration
          //   ? 'Please enter a valid expiration'
          //   : null }
          stripeStyle={stripeStyle}
          onChange={onChangeInputs} />
        <CardCVCInput
          id="CVC"
          inputLabel="Security Code (CVC)"
          required
          // error={ !stripeValid.CVC
          //   ? 'Please enter a valid security code (CVC).'
          //   : null }
          stripeStyle={stripeStyle}
          onChange={onChangeInputs} />
        <PostalCodeInput
          id="billingZip"
          inputLabel="Billing Zip"
          required
          // error={ !stripeValid.billingZip
          //   ? 'Please enter a valid zip code.'
          //   : null }
          stripeStyle={stripeStyle}
          onChange={onChangeInputs} />
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
