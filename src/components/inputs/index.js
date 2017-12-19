import React from 'react';
import styled from 'styled-components';

import colors from '../../consts/colors.scss';
import screenBreaks from '../../consts/screen-breaks.scss';

import { RadioIcon, CheckIcon } from '../svgs/icons';

import selectChevron from '../../assets/img/select-chevron.svg';

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

export const Label = styled(({
  className,
  id,
  inputLabel,
  required,
  error,
}) => (
  <div className={className}>
    <label htmlFor={id}>
      {inputLabel}: {required
        ? <span className='required'>*</span>
        : null}
    </label>
    {error ? <p className='error'>{error}</p> : null}
  </div>
))`
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
input, select {
  color: ${colors.graphite};
  font-size: 1rem;
  font-weight: 300;
  margin-top: 0.125rem;
  margin-bottom: 0.5rem;
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
  input, select {
    font-size: 1.125rem;
    margin-bottom: 1rem;
  }
  input:not(:[type="radio"], :[type="checkbox"]), select {
    min-width: 20rem;
    padding: 0.5rem;
  }
}
`;

export const Input = styled(({
  className,
  id,
  type,
  inputLabel,
  required,
  error,
  value,
  onChange,
}) => (
  <div className={className}>
    {inputLabel
      ? <Label id={id} inputLabel={inputLabel} required={required} error={error} />
      : null}
    <input onChange={onChange} id={id} required={required} value={value} name={id} type={type} />
  </div>
))`
${generalInputStyling}
`;

export const Select = styled(({
  className,
  id,
  inputLabel,
  required,
  error,
  onChange,
  options,
  value,
}) => (
  <div className={className}>
    {inputLabel
      ? <Label id={id} inputLabel={inputLabel} required={required} error={error} />
      : null}
    <select onChange={onChange} id={id} required={required} value={value} name={id}>
      <option value="" disabled>Choose an Option</option>
      {options.map((option, i) =>
          <option value={option.value} key={i}>
            {option.name}
          </option>)}
    </select>
  </div>
))`
${generalInputStyling}

select {
  background-color: white;
  background-image: url(${selectChevron});
  background-position: right 0.625rem top;
  background-repeat: no-repeat;
  background-size: auto 200%;
  cursor: pointer;

  &:hover {
    background-position: right 0.625rem bottom;
  }
}
`;

export const RadioFieldset = styled(({
  className,
  fieldsetName,
  fieldsetLegend,
  error,
  checked,
  onChange,
  fields,
  required,
}) => (
    <fieldset className={className} id={fieldsetName}>
      <legend>
        {fieldsetLegend}: {required
          ? <span className='required'>*</span>
          : null}
      </legend>
      {error ? <p className='error'>{error}</p> : null}
      {fields.map((field, i) => (
          <label htmlFor={field.id} key={i}>
            <input
              type='radio'
              name={fieldsetName}
              value={field.value}
              id={field.id}
              onChange={e => onChange(e)} />
            <span onClick={(e) => {
              e.preventDefault();
              const { target } = e;
              target.previousSibling.click();
            }}>
              <RadioIcon
                checked={checked === field.value}
                circleColor={colors.lightGraphite}
                dotColor={colors.mauiOrange} />
            </span>
            {field.children || field.name}
          </label>
        ))}
    </fieldset>
))`
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
  position: relative;
  top: .15rem;
  margin-right: .375rem;
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

export const Checkbox = styled(({
  className,
  id,
  onChange,
  text,
  required,
  checked,
  children,
}) => (
  <div className={className}>
    <label htmlFor={id}>
      <input
        type="checkbox"
        id={id}
        onChange={onChange}
        required={required}
        checked={checked}
        name={id}/>
      <span onClick={(e) => {
        console.log(e);
        e.preventDefault();
        const { target } = e;
        console.log(target.previousSibling);
        target.previousSibling.click();
      }}>
        <CheckIcon
          boxColor={colors.graphite}
          checkColor={colors.mauiOrange}
          checked={checked}/>
      </span>
      {text || children} {required
        ? <span className='required'>*</span>
        : null}
    </label>
  </div>
))`
> label {
  font-size: 1.125rem;
}

label span {
  display: inline-block;
  width: 1.125rem;
  height: 1.125rem;
  position: relative;
  top: .15rem;
  margin-right: .375rem;
}

input[type='checkbox'] {
  display: none;
}

${props => formLabelStyle(props)}
`;
