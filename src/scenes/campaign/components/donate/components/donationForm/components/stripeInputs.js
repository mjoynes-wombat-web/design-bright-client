/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';
import { CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement } from 'react-stripe-elements';
import styled from 'styled-components';

import { Label } from '../../../../../../../components/inputs';

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
`;
