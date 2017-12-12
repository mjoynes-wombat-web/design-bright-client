/* eslint-env browser */
import React from 'react';

const CreateImage = props => (
  <section id="createImage" >
    <div className="row align-middle img-src">
      <div className="columns small-12 medium-3 large-3">
        <label htmlFor="newSrc">
          Image Src:
        </label>
      </div>
      <div className="columns small-12 medium-9 large-9">
        <input
          type="file"
          name="newSrc"
          id="newSrc"
          onChange={props.onChange} />
      </div>
    </div>
    <div className="row align-middle img-description">
      <div className="columns small-12 medium-3 large-3">
        <label htmlFor="newAlt">
          Description:
        </label>
      </div>
      <div className="columns small-12 medium-9 large-9">
        <input
          type="text"
          value={props.newAlt}
          name="newAlt"
          id="newAlt"
          onChange={props.onChange} />
      </div>
    </div>
    <div className="row align-middle img-type">
      <div className="columns small-12 medium-3 large-3">
        <legend>Image Type:</legend>
      </div>
      <div className="columns small-12 medium-9 large-9">
        <label htmlFor="imageType1">
          <input
            type="radio"
            id="imageType1"
            name="newImageType"
            onChange={props.onChange}
            checked={props.newImageType === 'main'}
            value="main" />
          <span></span>
          Main Image
        </label>
        <label htmlFor="imageType2">
          <input
            type="radio"
            id="imageType2"
            name="newImageType"
            onChange={props.onChange}
            checked={props.newImageType === 'left'}
            value="left" />
          <span></span>
          Left Image
        </label>
        <label htmlFor="imageType3">
          <input
            type="radio"
            id="imageType3"
            name="newImageType"
            onChange={props.onChange}
            checked={props.newImageType === 'right'}
            value="right" />
          <span></span>
          Right Image
        </label>
      </div>
    </div>
    <div className="row align-middle">
      <div className="small-12 columns">
        <div className="row align-center">
          <button
            className="small-11 medium-6 large-8 secondary"
            onClick={props.onCreateImage}
            disabled={!props.validate(props.newSrc !== '' ? props.newSrc.name : '')}
            type='button'>
            Add Image
          </button>
          <div className="small-12 columns">
            <button
              className="cancel"
              onClick={props.cancelCreateImage}
              type='button'>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CreateImage;
