import React from 'react';
import styled from 'styled-components';

import { colors, screenBreaks, globalStyle } from '../styleConsts';

globalStyle();

const formLabelStyle = props => `
  label, legend {
    color: ${colors.lightGraphite};
    font-size: 1.125rem;
    font-weight: 300;
    margin-bottom: 0.375rem;
    display: block;
  }
  
  .required {
    color: ${colors.mauiOrange};
    font-weight: 400;
  }
  
  @media screen and (min-width: ${screenBreaks.medium}) {
    label, legend {
      font-size: 1.25rem;
    }
  }
  
  ${props.error ?
    `
      .error {
        color: ${colors.errorRed};
        font-size: 0.625rem;
        margin: 0.125rem 0 0 0;
      }
  
      @media screen and (min-width: ${screenBreaks.medium}) {
        .error {
          font-size: 0.75rem;
          margin:  0.25rem 0 0 0;
        }
      }
    `
    : null}
  `;

export const Label = styled(
  ({ className, id, inputLabel, required, error }) => (
    <div className={className}>
      <label htmlFor={id}>
        {inputLabel}: {required
          ? <span className='required'>*</span>
          : null}
      </label>
      {error ? <p className='error'>{error}</p> : null}
    </div>
  ),
) `
${props => formLabelStyle(props)}
${props => (
    props.error
      ? `
      label {
        color: ${colors.errorRed};
        font-weight: 400;
      }
      `
      : null)}
`;

const generalInputStyling = `
input {
  color: ${colors.graphite};
  font-size: 1rem;
  font-weight: 300;
  margin-top: 0.25rem;
}
input:not([type="radio"]):not([type="checkbox"]), select {
  min-width: 15rem;
  border: 0.0625rem solid ${colors.lightGraphite};
  border-radius: 0.1875rem;
  color: ${colors.lightGraphite};
  padding: 0.375rem;
  appearance: none;
  font-weight: 400;
  transition: box-shadow 0.25s ease-in-out;

  :focus {
    outline: none;
    box-shadow: #999 0 0 0.125rem;
  }

  :hover {
    color: ${colors.graphite};
  }
}

@media screen and (min-width: ${screenBreaks.medium}) {
  input {
    font-size: 1.125rem;
    margin-top: 0.375rem;
  }
  input:not(:[type="radio"], :[type="checkbox"]), select {
    min-width: 20rem;
    padding: 0.5rem;
  }
}
`;

export const Input = styled(
  ({ className, id, inputLabel, required, error, onChange }) => (
    <div className={className}>
      {inputLabel
        ? <Label id={id} inputLabel={inputLabel} required={required} error={error} />
        : null}
      <input onChange={onChange} id={id} required={required} />
    </div>
  ),
) `
${generalInputStyling}
`;

export const Select = styled(
  ({ className, id, inputLabel, required, error, onChange, options }) => (
    <div className={className}>
      {inputLabel
        ? <Label id={id} inputLabel={inputLabel} required={required} error={error} />
        : null}
      <select defaultValue="" onChange={onChange} id={id} required={required}>
        <option value="" disabled>Choose an Option</option>
        {options.map(
          (option, i) =>
            <option value={option.value} key={i}>
              {option.name}
            </option>)}
      </select>
    </div>
  ),
) `
${generalInputStyling}

select {
  background-color: white;
  background-image: url(/assets/img/chevron-square-sprite.svg);
  background-position: right 0.625rem top;
  background-repeat: no-repeat;
  background-size: auto 200%;
  cursor: pointer;

  &:hover {
    background-position: right 0.625rem bottom;
  }
}
`;

export const RadioFieldset = styled(
  ({ className, fieldsetName, fieldsetLegend, error, onChange, fields, required }) => (
    <fieldset className={className} id={fieldsetName}>
      <legend>
        {fieldsetLegend}: {required
          ? <span className='required'>*</span>
          : null}
      </legend>
      {error ? <p className='error'>{error}</p> : null}
      {fields.map(
        (field, i) => (
          <label htmlFor={field.id} key={i}>
            <input
              type='radio'
              name={fieldsetName}
              value={field.value}
              id={field.id}
              checked={field.checked}
              onChange={onChange} />
            <span onClick={(e) => {
              console.log('This ran');
              e.preventDefault();
              const target = e.target;
              target.previousSibling.checked = true;
            }}></span>
            {field.children || field.name}
          </label>
        ),
      )}
    </fieldset>
  ),
) `
border: none;
padding: 0;
margin: 0;

legend {
  margin-bottom: 0.375rem;
}

label span {
  display: inline-block;
  width: 1.125rem;
  height: 1.125rem;
  background-repeat: no-repeat;
  position: relative;
  top: .15rem;
  margin-right: .375rem;
  background: url(/assets/img/radio.svg);
  background-size: 100% 200%;
}

label input[type='radio']:checked + span{
  background-size: 100% 200%;
  background-position-y: 100%;
}

input[type='radio'] {
  display: none;
}

${props => formLabelStyle(props)}

${props => (
    props.error
      ? `
      legend {
        color: ${colors.errorRed};
        font-weight: 400;
      }
      `
      : null)}
  
  ${generalInputStyling}
`;

export const Checkbox = styled(
  ({ className, id, onChange, text, required, checked, children }) => (
    <div className={className}>
      <label htmlFor={id}>
        <input type="checkbox" id={id} onChange={onChange} required={required} checked={checked}/>
        <span onClick={(e) => {
          e.preventDefault();
          const target = e.target;
          const input = target.previousSibling;
          if (input.checked) {
            input.checked = false;
          } else {
            input.checked = true;
          }
        }}></span>
        {text || children}
      </label>
    </div>
  ),
)`
label span {
  display: inline-block;
  width: 1.125rem;
  height: 1.125rem;
  background-repeat: no-repeat;
  position: relative;
  top: .15rem;
  margin-right: .375rem;
  background: url(/assets/img/checkbox.svg);
  background-size: 100% 200%;
}

label input[type='checkbox']:checked + span{
  background-size: 100% 200%;
  background-position-y: 100%;
}

input[type='checkbox'] {
  display: none;
}

${props => formLabelStyle(props)}
`;
