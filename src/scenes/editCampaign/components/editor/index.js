/* eslint-env browser */
import { Editor, Block, Raw } from 'slate';
import React from 'react';
import isUrl from 'is-url';
import ifIsImage from 'if-is-image';
import axios from 'axios';

import Images from './images';
import Toolbar from './toolbar';
import CreateLink from './createLink';
import CreateImage from './createImage';

import './scss/style.scss';

const defaultBlock = {
  type: 'paragraph',
  isVoid: false,
  data: {},
};

/**
 * Define a schema.
 *
 * @type {Object}
 */

const schema = {
  nodes: {
    header: props =>
      <h2 {...props.attributes}>
        <span className="underlined">
          {props.children}
        </span>
      </h2>,
    paragraph: props =>
      <p {...props.attributes}>
        {props.children}
      </p>,
    bulletedList: props => <ul>{props.children}</ul>,
    listItem: props => <li>{props.children}</li>,
    numberedList: props => <ol>{props.children}</ol>,
    link: (props) => {
      const url = props.node.data.get('url');
      return <a
        href={url} {...props.attributes}>
        {props.children}
      </a>;
    },
    image: (props) => {
      const { node, state } = props;
      const active = state.isFocused && state.selection.hasEdgeIn(node);
      const src = node.data.get('src');
      const alt = node.data.get('alt');
      const imageType = node.data.get('imageType');
      const className = active ? 'active' : null;
      return (
        <Images
          src={src}
          className={className}
          imageType={imageType}
          attributes={props.attributes}
          alt={alt} />
      );
    },
  },
  marks: {
    bold: {
      fontWeight: 'bold',
    },
    italic: {
      fontStyle: 'italic',
    },
    underlined: {
      textDecoration: 'underline',
    },
  },
  rules: [
    // Rule to insert a paragraph block if the document is empty.
    {
      match: node => node.kind === 'document',
      validate: document => (document.nodes.size ? null : true),
      normalize: (transform, document) => {
        const block = Block.create(defaultBlock);
        transform.insertNodeByKey(document.key, 0, block);
      },
    },
    // Rule to insert a paragraph below a void node (the image) if that node is
    // the last one in the document.
    {
      match: node => node.kind === 'document',
      validate: (document) => {
        const lastNode = document.nodes.last();
        return lastNode && lastNode.isVoid ? true : null;
      },
      normalize: (transform, document) => {
        const block = Block.create(defaultBlock);
        transform.insertNodeByKey(document.key, document.nodes.size, block);
      },
    },
  ],
};

class CampaignEditor extends React.Component {
  // Sets up state and props and binds this to the class methods.
  constructor(props) {
    super(props);

    let initialState;
    if (props.content.length > 0) {
      initialState = { nodes: props.content };
    } else {
      initialState = {
        nodes: [
          {
            kind: 'block',
            type: 'paragraph',
            nodes: [
              {
                kind: 'text',
                text: 'We recommend that you follow the following format for you campaign. This is where you would write your initial introduction for your campaign. This will also serve as the description on the search and browse pages. If you don\'t put the paragraph here the next paragraph will be your description.',
              },
            ],
          },
          {
            kind: 'block',
            type: 'header',
            nodes: [
              {
                kind: 'text',
                text: 'Main Image',
              },
            ],
          },
          {
            kind: 'block',
            type: 'image',
            isVoid: true,
            data: {
              alt: 'Senior veteran at a march.',
              imageType: 'main',
              src: '/assets/img/veteran.jpg',
            },
          },
          {
            kind: 'block',
            type: 'paragraph',
            nodes: [
              {
                kind: 'text',
                text: 'You should delete the image above and replace it with your own. This will serve as the image in the campaign list. If you don\'t put one here we will use the first main image you insert.',
              },
            ],
          },
          {
            kind: 'block',
            type: 'header',
            nodes: [
              {
                kind: 'text',
                text: 'You Can Use Headers to Organize Your Content',
              },
            ],
          },
          {
            kind: 'block',
            type: 'image',
            isVoid: true,
            data: {
              alt: 'A flag on a home.',
              imageType: 'left',
              src: '/assets/img/flag-home.jpg',
            },
          },
          {
            kind: 'block',
            type: 'paragraph',
            nodes: [
              {
                kind: 'text',
                text: 'Images can be inserted so that they flow with your content. These can be on the left or right side.',
              },
            ],
          },
          {
            kind: 'block',
            type: 'paragraph',
            nodes: [
              {
                kind: 'text',
                text: 'You can also use ',
              },
              {
                kind: 'inline',
                text: 'links',
                type: 'link',
                data: { url: 'https://www.designbright.org' },
                nodes: [
                  {
                    kind: 'text',
                    text: 'links',
                  },
                ],
              },
              {
                kind: 'text',
                text: ' in your text to provide a connection to your non-profit\'s information.',
              },
            ],
          },
        ],
      };
    }

    this.state = {
      editorState: Raw.deserialize(initialState, { terse: true }),
      showCreateLink: false,
      newUrl: 'http://',
      newUrlText: '',
      showAddImage: false,
      newSrc: '',
      newAlt: '',
      newImageType: 'main',
      heldEditorState: {},
    };

    this.onChangeEditor = this.onChangeEditor.bind(this);
    this.onAddImage = this.onAddImage.bind(this);
    this.onCreateImage = this.onCreateImage.bind(this);
    this.cancelCreateImage = this.cancelCreateImage.bind(this);
    this.onChangeFormat = this.onChangeFormat.bind(this);
    this.onNewLink = this.onNewLink.bind(this);
    this.isBlock = this.isBlock.bind(this);
    this.isLink = this.isLink.bind(this);
    this.onCreateLink = this.onCreateLink.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.cancelCreateLink = this.cancelCreateLink.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.onClickInline = this.onClickInline.bind(this);
    this.onClickList = this.onClickList.bind(this);
  }

  componentDidMount() {
    this.onChangeEditor(this.state.editorState, true);
  }

  onChangeEditor(editorState, campaignSaved) {
    this.setState(
      { editorState },
      this.props.onChangeEditorData(Raw.serialize(editorState), campaignSaved),
    );
  }

  onChangeInput(e) {
    const target = e.target;
    const value = () => {
      if (target.type === 'checkbox') {
        return target.checked;
      } else if (target.type === 'file') {
        return target.files[0];
      }
      return target.value;
    };

    const name = target.name;

    this.setState({ [name]: value() });
  }

  onAddImage(e) {
    e.preventDefault();
    // const src = window.prompt('Enter the URL of the image:');
    // const alt = window.prompt('Please enter a description:');
    // const imageType = window.prompt('Please enter the image type:');

    const { editorState } = this.state;

    this.cancelCreateLink();
    this.setState({
      heldEditorState: editorState,
      showAddImage: true,
    });
  }

  onCreateImage(e) {
    e.preventDefault();

    this.setState({ heldState: this.state.editorState });

    const formData = new FormData();
    formData.append('file', this.state.newSrc);
    formData.append('campaignId', this.props.campaignInfo.campaignId);
    formData.append('campaignName', this.props.campaignInfo.name);
    formData.append('nonprofitId', this.props.nonprofitInfo.nonprofitId);
    formData.append('imageType', this.state.newImageType);
    formData.append('imageAlt', this.state.newAlt);

    axios.post(
      `https://${window.location.hostname}:3000/api/campaigns/upload/photo/${this.props.campaignInfo.campaignId}`,
      formData,
      {
        headers:
        { 'Content-Type': 'multipart/form-data' },
      },
    )
      .then(({ data }) => {
        const newImage = data.data;
        const { newAlt, newImageType, heldState } = this.state;
        this.insertImage(newImage.secure_url, newAlt, newImageType, heldState);
      })
      .catch(error => console.log(error));
  }

  cancelCreateImage(e) {
    if (e) {
      e.preventDefault();
    }

    return this.setState({
      heldEditorState: {},
      showAddImage: false,
      newSrc: '',
      newAlt: '',
      newImageType: 'main',
    });
  }

  insertImage(src, alt, imageType, heldState) {
    const transform = heldState.transform();

    const newEditorState = transform
      .insertBlock({
        type: 'image',
        isVoid: true,
        data: {
          src,
          alt,
          imageType,
        },
      })
      .apply();

    this.setState({
      heldEditorState: {},
      showAddImage: false,
      newSrc: '',
      newAlt: '',
      newImageType: 'main',
    },
      this.onChangeEditor(newEditorState));
  }

  onChangeFormat(e) {
    const type = e.target.value;
    const editorState = this.state.editorState;
    const transform = editorState.transform();

    if (this.state.editorState.focusBlock.type !== 'image') {
      const isBlock = this.isBlock(type);
      transform.setBlock(isBlock ? 'paragraph' : type);
      const newEditorState = transform.apply();
      this.onChangeEditor(newEditorState);
    }
  }

  isBlock(type) {
    const { editorState } = this.state;
    let nodeType;
    const test = editorState.blocks.some((node) => {
      if (node.type === 'image') {
        nodeType = node.type;
      }
      return node.type === type;
    });
    if (nodeType) {
      return nodeType;
    }
    return test;
  }

  isLink() {
    const { editorState } = this.state;
    return editorState.inlines.some(inline => inline.type === 'link');
  }

  onNewLink(e) {
    e.preventDefault();
    const { editorState } = this.state;
    const isLink = this.isLink();
    let newEditorState = editorState;

    this.cancelCreateImage();

    if (this.state.showCreateLink) {
      return this.cancelCreateLink(e);
    }

    if (isLink) {
      newEditorState = editorState
        .transform()
        .unwrapInline('link')
        .apply();

      return this.onChangeEditor(newEditorState);
    }
    return this.setState(
      {
        heldEditorState: newEditorState,
        showCreateLink: true,
      },
      this.onChangeEditor(newEditorState),
    );
  }

  onCreateLink(e) {
    e.preventDefault();
    const editorState = this.state.heldEditorState;

    let newEditorState;
    if (editorState.isExpanded) {
      const url = this.state.newUrl;

      newEditorState = editorState
        .transform()
        .wrapInline({
          type: 'link',
          data: { url },
        })
        .collapseToEnd()
        .apply();
    } else {
      const url = this.state.newUrl;
      const text = this.state.newUrlText;

      newEditorState = editorState
        .transform()
        .insertText(text)
        .extend(0 - text.length)
        .wrapInline({
          type: 'link',
          data: { url },
        })
        .collapseToEnd()
        .apply();
    }

    this.setState(
      {
        showCreateLink: false,
        newUrl: 'http://',
        newUrlText: '',
        heldEditorState: {},
      },
      this.onChangeEditor(newEditorState),
    );
  }

  cancelCreateLink(e) {
    if (e) {
      e.preventDefault();
    }

    return this.setState({
      heldEditorState: {},
      showCreateLink: false,
      newUrl: 'http://',
      newUrlText: '',
    });
  }

  onClickInline(e, type) {
    e.preventDefault();
    const { editorState } = this.state;

    const transform = editorState.transform();
    const isHeader = editorState.blocks.some(
      block => block.type === 'header',
    );
    editorState.marks.forEach(
      mark => (mark.type !== type ? transform.removeMark(mark) : null),
      this,
    );

    if (!isHeader) {
      transform.toggleMark(type);
    }
    const newEditorState = transform.apply();
    return this.onChangeEditor(newEditorState);
  }

  onClickList(e, type) {
    e.preventDefault();
    const { editorState } = this.state;
    let newEditorState = editorState;


    // Handle the extra wrapping required for list buttons.
    const isList = this.isBlock('listItem');
    const isType = editorState.blocks.some(
      block => !!newEditorState.document.getClosest(block.key, parent => parent.type === type),
    );

    if (isList && isType) {
      newEditorState = newEditorState.transform()
        .setBlock(defaultBlock)
        .unwrapBlock('bulletedList')
        .unwrapBlock('numberedList');
    } else if (isList) {
      newEditorState = newEditorState.transform()
        .unwrapBlock(type === 'bulletedList' ? 'numberedList' : 'bulletedList')
        .wrapBlock(type);
    } else {
      newEditorState = newEditorState.transform()
        .setBlock('listItem')
        .wrapBlock(type);
    }

    newEditorState = newEditorState.apply();
    this.onChangeEditor(newEditorState);
  }

  render() {
    return (
      <div id="campaignEditor">
        <Toolbar
          onClickInline={this.onClickInline}
          onClickList={this.onClickList}
          onAddImage={this.onAddImage}
          onNewLink={this.onNewLink}
          onChangeFormat={this.onChangeFormat}
          selectValue={this.state.editorState.focusBlock}
          inlineType={this.state.editorState.focusInline} />
        {this.state.showCreateLink
          ? <CreateLink
            editorState={this.state.heldEditorState}
            onCreateLink={this.onCreateLink}
            cancelCreateLink={this.cancelCreateLink}
            newUrl={this.state.newUrl}
            newUrlText={this.state.newUrlText}
            onChange={this.onChangeInput}
            validate={url => isUrl(url)} />
          : null}
        {this.state.showAddImage
          ? <CreateImage
            editorState={this.state.heldEditorState}
            onCreateImage={this.onCreateImage}
            cancelCreateImage={this.cancelCreateImage}
            onChange={this.onChangeInput}
            newSrc={this.state.newSrc}
            newAlt={this.state.newAlt}
            newImageType={this.state.newImageType}
            validate={src => ifIsImage(src)} />
          : null}
        <div className="grey-line"></div>
        <div className="editor">
          <Editor
            schema={schema}
            state={this.state.editorState}
            onChange={this.onChangeEditor} />
        </div>
      </div >
    );
  }
}

export default CampaignEditor;
