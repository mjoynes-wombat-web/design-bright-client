/* eslint-env browser */
import React from 'react';

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
    <div className="toolbar">
      <div className="row align-justify">
        <select className="small-12 medium-5 columns" onChange={props.onChangeFormat} value={selectValue}>
          <option value="paragraph">Normal</option>
          <option value="header">Header</option>
        </select>
        <div className="inline shrink columns">
          <button data-active={true} className="bold" type="button"onMouseDown={e => props.onClickInline(e, 'bold')}>
            <span className="icon"></span>
          </button>
          <button className="italic" type="button" onMouseDown={e => props.onClickInline(e, 'italic')}>
            <span className="icon"></span>
          </button>
          <button className="underlined" type="button" onMouseDown={e => props.onClickInline(e, 'underlined')}>
            <span className="icon"></span>
          </button>
        </div>
        <div className="list-types shrink columns">
          <button className="numbered" type="button" onMouseDown={e => props.onClickList(e, 'numberedList')}>
            <span className="icon"></span>
          </button>
          <button className="bullet" type="button" onMouseDown={e => props.onClickList(e, 'bulletedList')}>
            <span className="icon"></span>
          </button>
        </div>
        <div className="content-types shrink columns">
          <button className={`link${inlineType === 'link' ? ' active' : ''}`} onMouseDown={props.onNewLink} type="button">
            <span className="icon"></span>
          </button>
          <button className="image" onMouseDown={props.onAddImage} type="button">
            <span className="icon"></span>
          </button>
          {/* <button className="movie" type="button">
            <span className="icon"></span>
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
