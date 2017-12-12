/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';

// Returns the inline content of a block based on it's marks attributes.
const formatInline = (range, i) => {
  if (range.marks.length > 0) {
    switch (range.marks[0].type) {
      case 'bold':
        return <strong key={i}>{range.text}</strong>;
      case 'italic':
        return <em key={i}>{range.text}</em>;
      case 'underlined':
        return <span className={range.marks[0].type} key={i}>{range.text}</span>;
      default:
        return <span key={i}>{range.text}</span>;
    }
  }
  return <span key={i}>{range.text}</span>;
};

// Returns the list items of a node.
const formatListItem = (node, i) => {
  if ('type' in node) {
    switch (node.type) {
      case 'listItem':
        return (
          <li key={i}>
            {node.nodes.map((nestNode, ii) => {
              if ('type' in nestNode) {
                switch (nestNode.type) {
                  case 'link':
                    return (
                      <a key={ii} href={nestNode.data.url}>
                        {nestNode.nodes[0].ranges.map((range, iii) => formatInline(range, iii))}
                      </a>
                    );
                  default:
                    return <span key={ii}>{nestNode.nodes[0].ranges[0].text}</span>;
                }
              }
              return nestNode.ranges.map((range, iii) => formatInline(range, iii));
            })}
          </li>
        );
      default:
        return null;
    }
  }
  return null;
};

// CAMPAIGN BLOCKS
// Returns the various block elements of a campaign.
const CampaignBlocks = ({ buttonAction, content, isEnded }) => {
  switch (content.type) {
    case 'paragraph':
      return (
        <p>
          {content.nodes.map((node, i) => {
            if ('type' in node) {
              switch (node.type) {
                case 'link':
                  return (
                    <a key={i} href={node.data.url}>
                      {node.nodes[0].ranges.map((range, ii) => formatInline(range, ii))}
                    </a>
                  );
                default:
                  return <span key={i}>{node.nodes[0].ranges[0].text}</span>;
              }
            }
            return node.ranges.map((range, ii) => formatInline(range, ii));
          })}
        </p>
      );
    case 'header':
      return (
        <h2>
          <span className="underlined">{content.nodes[0].ranges[0].text}</span>
        </h2>
      );
    case 'bulletedList':
      return (
        <ul>
          {content.nodes.map((node, i) => formatListItem(node, i))}
        </ul>
      );
    case 'numberedList':
      return (
        <ol>
          {content.nodes.map((node, i) => formatListItem(node, i))}
        </ol>
      );
    case 'image':
      switch (content.data.imageType) {
        case 'main':
          return (
            <div>
              <div className="main-image-wrapper">
                {isEnded()
                  ? null
                  : <div className="overlay"></div>}
                <div className="main-image">
                  <img
                    src={content.data.src}
                    alt={content.data.alt}
                    className={content.data.imageType} />
                </div>
                {isEnded()
                  ? null
                  : <button className="secondary" onClick={buttonAction}>Make a Donation</button>}
              </div>
              {isEnded()
                ? null
                : (
                  <button className="primary mobile" onClick={buttonAction}>
                    Make a Donation
                  </button>
                )}
            </div>
          );
        case 'left':
          return (
            <img
              src={content.data.src}
              alt={content.data.alt}
              className={content.data.imageType} />
          );
        case 'right':
          return (
            <img
              src={content.data.src}
              alt={content.data.alt}
              className={content.data.imageType} />
          );
        default:
          return null;
      }
    default:
      return null;
  }
};

export default CampaignBlocks;
