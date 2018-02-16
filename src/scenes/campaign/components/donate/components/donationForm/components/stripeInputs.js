/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';
import { CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement } from 'react-stripe-elements';
import styled from 'styled-components';

import screenBreaks from '../../../../../../../consts/screen-breaks.scss';
import { Label } from '../../../../../../../components/inputs';

const defaultStyle = props => `
margin: 0.5rem 0;

@media screen and (min-width: ${screenBreaks.medium}) {
  display: inline-block;
  margin: 0.75rem 4rem 0.75rem 0;
}

.StripeElement {
  border: 0.0625rem solid #999999;
  border-radius: 0.1875rem;
  padding: 0.375rem;
  max-width: 100%;
  width: ${props.width};
  
  &.StripeElement--focus {
    border: 1px solid #8a8a8a;
    box-shadow: 0 0 5px #cacaca;
    transition: box-shadow .5s,border-color .25s ease-in-out;
  }
}
`;

export const CardNumberInput = styled(({
  className,
  id,
  inputLabel,
  required,
  error,
  stripeStyle,
  onChange,
}) => (
  <div className={className} id={id}>
    {inputLabel
    ? <Label id={id} inputLabel={inputLabel} required={required} error={error} />
  : null}
    <CardNumberElement
          onChange={e => onChange(e, id)}
          style={stripeStyle} />
  </div>
))`
${props => defaultStyle(props)}
`;

export const CardExpiryInput = styled(({
  className,
  id,
  inputLabel,
  required,
  error,
  stripeStyle,
  onChange,
}) => (
  <div className={className} id={id}>
    {inputLabel
    ? <Label id={id} inputLabel={inputLabel} required={required} error={error} />
  : null}
   <CardExpiryElement
          onChange={e => onChange(e, id)}
          style={stripeStyle} />
  </div>
))`
${props => defaultStyle(props)}
`;

export const CardCVCInput = styled(({
  className,
  id,
  inputLabel,
  required,
  error,
  stripeStyle,
  onChange,
}) => (
  <div className={className} id={id}>
    {inputLabel
    ? <Label id={id} inputLabel={inputLabel} required={required} error={error} />
  : null}
  <CardCVCElement
          onChange={e => onChange(e, id)}
          style={stripeStyle} />
  </div>
))`
${props => defaultStyle(props)}
`;

export const PostalCodeInput = styled(({
  className,
  id,
  inputLabel,
  required,
  error,
  stripeStyle,
  onChange,
}) => (
  <div className={className} id={id}>
    {inputLabel
    ? <Label id={id} inputLabel={inputLabel} required={required} error={error} />
  : null}
  <PostalCodeElement
          onChange={e => onChange(e, id)}
          style={stripeStyle} />
  </div>
))`
${props => defaultStyle(props)}
`;
