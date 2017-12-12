/* eslint-env browser */
import React from 'react';

const CreateLink = props => (
  <section id="createLink" >
    {props.editorState.isExpanded
      ? null
      : <div className="row align-middle">
        <div className="columns small-12 medium-2 large-3">
          <label htmlFor="newUrlText">
            Link Text:
          </label>
        </div>
        <div className="columns expand">
          <input
            type="text"
            value={props.newUrlText}
            name="newUrlText"
            id="newUrlText"
            onChange={props.onChange} />
        </div>
      </div>}
    <div className="row align-middle">
      <div className="columns small-12 medium-2 large-3">
        <label htmlFor="newUrl">
          Link Url:
        </label>
      </div>
      <div className="columns expand">
        <input
          type="text"
          value={props.newUrl}
          name="newUrl"
          id="newUrl"
          onChange={props.onChange} />
      </div>
    </div>
    <div className="row align-middle">
      <div className="small-12 columns">
        <div className="row align-center">
          <button
            className="small-11 medium-6 large-8 secondary"
            onClick={props.onCreateLink}
            disabled={!props.validate(props.newUrl)}
            type='button'>
            {props.editorState.isExpanded ? 'Create Link' : 'Insert Link'}
          </button>
          <div className="small-12 columns">
            <button
              className="cancel"
              onClick={props.cancelCreateLink}
              type='button'>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CreateLink;
