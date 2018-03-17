import React from 'react';

import Button from '../../../../components/button';

const MainImg = props =>
  (
    <div className={props.className} { ...props.attributes }>
      <div className="main-image-wrapper">
        <div className="overlay"></div>
        <div className="main-image">
          <img src={props.src} alt={props.alt} className={`main ${props.className}`} />
        </div>
        <Button secondary>Make a Donation</Button>
      </div>
      <Button primary>Make a Donation</Button>
    </div>
  );

const LeftImg = props =>
  (<img src={props.src} alt={props.alt} className={`left ${props.className}`} { ...props.attributes }/>);

const RightImg = props =>
  (<img src={props.src} alt={props.alt} className={`right ${props.className}`} { ...props.attributes }/>);

const Images = (props) => {
  const {
    src,
    className,
    imageType,
    attributes,
    alt,
  } = props;

  if (imageType === 'main') {
    return <MainImg src={src} alt={alt} className={className} attributes={attributes} />;
  } else if (imageType === 'left') {
    return <LeftImg src={src} alt={alt} className={className} attributes={attributes} />;
  } else if (imageType === 'right') {
    return <RightImg src={src} alt={alt} className={className} attributes={attributes} />;
  }
  return null;
};

export default Images;
