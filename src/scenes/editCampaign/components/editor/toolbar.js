/* eslint-env browser */
import React from 'react';
import styled from 'styled-components';

import { BoldIcon, ItalicIcon, UnderlineIcon, OrderedListIcon, UnorderedListIcon, LinkIcon, ImageIcon } from './components/icons';

import screenBreaks from '../../../../consts/screen-breaks.scss';

import OrangeBrush1 from '../../../../assets/img/orange-brush1.png';

const Toolbar = (props) => {
  let selectValue;
  if ('type' in props.selectValue) {
    selectValue = props.selectValue.type;
  }

  let inlineType;
  if (props.inlineType) {
    if ('type' in props.inlineType) {
      inlineType = props.inlineType.type;
    }
  }
  return (
    <div className={`toolbar ${props.className}`}>
        <select
          onChange={props.onChangeFormat}
          value={selectValue}>
          <option value="paragraph">Normal</option>
          <option value="header">Header</option>
        </select>
        <div className="inline">
          <button className="bold" type="button"onMouseDown={e => props.onClickInline(e, 'bold')}>
            <BoldIcon className="icon" />
          </button>
          <button className="italic" type="button" onMouseDown={e => props.onClickInline(e, 'italic')}>
            <ItalicIcon className="icon" />
          </button>
          <button className="underlined" type="button" onMouseDown={e => props.onClickInline(e, 'underlined')}>
            <UnderlineIcon className="icon" />
          </button>
        </div>
        <div className="list-types">
          <button className="numbered" type="button" onMouseDown={e => props.onClickList(e, 'numberedList')}>
            <OrderedListIcon className="icon" />
          </button>
          <button className="bullet" type="button" onMouseDown={e => props.onClickList(e, 'bulletedList')}>
            <UnorderedListIcon className="icon" />
          </button>
        </div>
        <div className="content-types">
          <button className={`link${inlineType === 'link' ? ' active' : ''}`} onMouseDown={props.onNewLink} type="button">
            <LinkIcon className="icon" />
          </button>
          <button className="image" onMouseDown={props.onAddImage} type="button">
            <ImageIcon className="icon" />
          </button>
          {/* <button className="movie" type="button">
            <span className="icon"></span>
          </button> */}
        </div>
    </div>
  );
};

export default styled(Toolbar)`
  &.toolbar {
    line-height: 0;
    display: flex;
    justify-content: space-between;
    background-image: url(${OrangeBrush1});
    padding: 0.5rem;
    background-size: 120% 140%;
    background-position: 50%;
    color: #333333;
    padding: 0.375rem;
    flex-wrap: wrap;

    > div.row {
      margin:0;
    }

  .icon {
      display: inline-block;
      color: #333333;
      height: 1rem;
      padding: 0.625rem 0.75rem;
      border-radius: 0.0675rem;
      text-shadow: 0 0 0.125rem #fffbef;
      min-width: 1rem;
    }

    button.active .icon > * {
      fill: $blue-hydrangea;
    }

    select {
      display: inline-block;
      width: 35%;
      margin: 0;
      background-color: rgba(255, 221, 130, 0.5);
      border: none;
      padding: 0.3125rem 0.5rem 0.4375rem 0.5rem;
      line-height: initial;
      color: #333333;
      font-family: 'Lato', sans-serif;
      font-weight: 300;
      font-size: 1.25rem;
      background-image: url('/assets/img/sort-drk.svg');
      background-position: right 58%;
      background-size: auto 1rem;
      cursor: pointer;
      height: 2.25rem;

      @media screen and (max-width: ${screenBreaks.medium}) {
        min-width: 100%;
        margin-bottom: 0.5rem;
      }

      &:focus {
        outline: none;
        box-shadow: none;
      }
    }
    
    button {
      display: inline-block;
      width: auto;
      margin:  0 0.125rem;
      padding: 0;
      border-radius: 0.375rem;
      background: rgba(255, 221, 130, 0.5);
      border: none;
      line-height: 0;
      cursor: pointer;
    }

    button, select {
      transition: background 0.25s, box-shadow 0.25s;
      transition-timing-function: cubic-bezier(0.17, 0.15, 0.63, 1.45);
      box-shadow: inset 0.125rem 0.125rem 0.125rem rgba(255, 255, 255, 0.4), inset -0.0625rem -0.0625rem 0.0625rem rgba(0, 0, 0, 0.2);
    }

    button:hover, select:hover {
      background-color: rgba(255, 255, 255, 0.2);
      box-shadow: 0.0625rem 0.0625rem 0.0625rem rgba(0, 0, 0, 0.2);
      box-shadow: inset 0.0625rem 0.0625rem 0.125rem rgba(255, 255, 255, 0.6), inset -0.0625rem -0.0625rem 0.0625rem rgba(0, 0, 0, 0.2), 0.0625rem 0.0625rem 0.0625rem rgba(0, 0, 0, 0.4);
    }

    button:hover:active, select:hover:active {
      background-color: rgba(255, 255, 255, 0.1);
      box-shadow: inset 0.0625rem 0.0625rem 0.0625rem rgba(0, 0, 0, 0.2), inset -0.125rem -0.125rem 0.125rem rgba(255, 255, 255, 0.4);
      transition: background 0.0625s, box-shadow 0.0625s;
      transition-timing-function: cubic-bezier(0.17, 0.15, 0.63, 1.45);
    }
  }
`;
