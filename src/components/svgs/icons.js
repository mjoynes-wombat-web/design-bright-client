/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';
import styled from 'styled-components';

export const CloseIcon = styled(({ className, onClick }) => (
  <svg
    className={`${className} closeIcon`}
    onClick={onClick}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 153 153"
    style={{ enableBackground: 'new 0 0 153 153' }}>
    <path className="close" d={'M82.6,76.5l35.4-35.4c1.2-1.2,1.2-3.2,0-4.4l-2.2-2.2c-1.2-1.2-3.2-1.2-4.4,0L76,69.9L40.6,' +
    '34.6c-1.2-1.2-3.2-1.2-4.4,0l-2.2,2.2c-1.2,1.2-1.2,3.2,0,4.4l35.4,35.3l-35.3,35.4c-1.2,1.2-1.2,3.2,0,4.4l2.2,2.2c1.2,1.2,3.2,1.2,4.4,' +
    '0L76,83.1l35.4,35.4c1.2,1.2,3.2,1.2,4.4,0l2.2-2.2c1.2-1.2,1.2-3.2,0-4.4L82.6,76.5z'} />
  </svg>
))`
`;

export const UserIcon = styled(({ className, id, loggedIn }) => (
  <svg
    className={className}
    version="1.1"
    id={id}
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 153 153"
    style={{ enableBackground: 'new 0 0 153 153' }}>
    { loggedIn
    ? <path className="userIcon" d={'M76.5,32.8c15.1,0,27.3,12.2,27.3,27.3S91.6,87.4,76.5,87.4S49.2,' +
    '75.2,49.2,60.1S61.4,32.8,76.5,32.8M107.8,89.8L99,87.6c-2-0.5-4.2-0.2-6,0.9c-4.9,2.9-10.6,4.4-16.5,4.4c-5.9,' +
    '0-11.5-1.6-16.5-4.4c-1.9-1.1-4.1-1.4-6.2-0.9l-8.7,2.2c-7.3,1.8-12.4,8.4-12.4,15.9v6.3c0,4.5,3.7,8.2,8.2,8.2h71c4.5,0,8.2-3.7,' +
    '8.2-8.2v-6.3C120.2,98.2,115.1,91.6,107.8,89.8z'} />
    : <path className="userIcon" d={'M108.8,87l-9-2.6c5.8-5.9,9.2-14,9.2-22.7c0-18-14.6-32.6-32.6-32.6S43.9,43.7,43.9,61.7c0,8.7,3.4,16.8,' +
    '9.2,22.7l-9,2.6c-8.8,2.5-15,10.6-15,19.9v5.1c0,6.5,5.3,11.8,11.8,11.8h71c6.5,0,11.8-5.3,11.8-11.8v-5.1C123.9,97.7,117.8,89.5,108.8,87z' +
    'M49.9,61.7c0-14.7,11.9-26.6,26.6-26.6s26.6,11.9,26.6,26.6c0,14.7-11.9,26.6-26.6,26.6C61.8,88.3,49.9,76.4,49.9,61.7L49.9,61.7z M117.9,' +
    '112c0,3.3-2.6,5.9-5.9,5.9H41c-3.3,0-5.9-2.6-5.9-5.9v-5.1c0-6.6,4.4-12.4,10.7-14.2L58.7,89c5.1,3.3,11.2,5.3,17.8,5.3c6.6,0,12.7-2,' +
    '17.8-5.3l12.9,3.7c6.3,1.8,10.7,7.6,10.7,14.2L117.9,112L117.9,112z'} />
    }
    <CloseIcon />
  </svg>
))`
`;

export const SearchIcon = styled(({ className, id }) => (
  <svg
    id={id}
    className={className}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 180 180"
    style={{ enableBackground: 'new 0 0 180 180' }}>
    <g>
      <rect y="0" className="background" width="180" height="180" />
      <path className="icon" d={'M148,141.8l-29.7-29.7c-0.5-0.5-1.2-0.8-2-0.8h-2.4c7.9-8.5,12.7-19.9,12.7-32.4c0-26.4-21.4-47.8-47.8-47.' +
      '8c-26.4,0-47.8,21.4-47.8,47.8s21.4,47.8,47.8,47.8c12.5,0,23.9-4.8,32.4-12.7v2.3c0,0.7,0.3,1.4,0.8,2l29.7,29.7c1.1,1.1,2.8,1.1,3.9,' +
      '0l2.3-2.3C149.1,144.6,149.1,142.9,148,141.8L148,141.8z M79,119.4c-22.4,0-40.5-18.1-40.5-40.5S56.6,38.5,79,38.5c22.4,0,40.5,18.1,' +
      '40.5,40.5S101.3,119.4,79,119.4z'} />
    </g>
  </svg>
))`
`;

export const MenuIcon = styled(({ className, onMouseOver, onClick }) => (
<svg version="1.1" id="menuIcon"
  xmlns="http://www.w3.org/2000/svg"
  className={className}
  x="0px"
  y="0px"
  viewBox="0 0 306 306"
  style={{ enableBackground: 'new 0 0 306 306' }}
  onMouseOver={onMouseOver}
  onClick={onClick}>
    <path className="bars" d={'M249.8,90H56.2c-1.5,0-2.7-1.2-2.7-2.7V76.6c0-1.5,1.2-2.7,2.7-2.7h193.6c1.5,0,2.7,1.2,2.7,2.7v10.7C252.4,88.8,251.2,90,249.8,90z M249.8,161H56.2c-1.5,0-2.7-1.2-2.7-2.7v-10.6c0-1.5,1.2-2.7,2.7-2.7h193.6c1.5,0,2.7,1.2,2.7,2.7v10.6C252.4,159.8,251.2,161,249.8,161z M249.8,232H56.2c-1.5,0-2.7-1.2-2.7-2.7v-10.7c0-1.5,1.2-2.7,2.7-2.7h193.6c1.5,0,2.7,1.2,2.7,2.7v10.7C252.4,230.8,251.2,232,249.8,232z'} />
    <CloseIcon />
  </svg>
))`
`;

export const ChevronSquareDown = styled(({ className }) => (
<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
  <path d={'M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm16 400c0 8.8-7.2' +
  ' 16-16 16H48c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h352c8.8 0 16 7.2 16 16v352zm-200.5-96.4l-115-115.1c-4.7-4.7-4.7-12.3 ' +
  '0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L224 296l99.5-99.5c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17l-115 115.1c-4.8 4.5-12.4 ' +
  '4.5-17.1-.1z'}/>
</svg>
))`
&:hover {
  > * {
    fill: ${props => props.colorHover};
  }
}
> * {
  fill: ${props => props.color};
  transition: fill 0.5s;
}
`;

export const AngleIcon = styled(({ className }) => (
<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512">
  <path d={'M34.9,377.7c1.5,1.5,3.5,2.4,5.7,2.4s4.2-0.8,5.7-2.4l117.8-116c3.1-3.1,3.1-8.2,0.1-11.4L46.4,134.4c-1.5-1.5-3.6-2.4-5.7-2.4s-4.2,' +
  '0.8-5.7,2.4l-7.1,7.1c-1.5,1.5-2.4,3.5-2.4,5.7s0.8,4.2,2.4,5.7L133,256L27.8,359.3c-1.5,1.5-2.3,3.5-2.3,5.6s0.8,4.2,2.4,5.7L34.9,377.7z'}/>
</svg>
))`
transform: ${(props) => {
    switch (props.rotate) {
      case 'left':
        return 'rotate(180deg);';
      case 'down':
        return 'rotate(90deg);';
      case 'up':
        return 'rotate(270deg);';
      case 'right':
      default:
        return 'rotate(0deg);';
    }
  }}

> * {
  fill: ${props => props.color};
  transition: fill 0.5s;
}

:hover {
  > * {
    fill: ${props => props.colorHover};
  }
}
`;

export const RadioIcon = styled(({ className }) => (
  <svg className={className} version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path className="circle" d={'M256,8C119,8,8,119,8,256s111,248,248,248s248-111,248-248S393,8,256,8z M416,415.5c-42.7,42.8-99.5,66.4-160,66.4c-60.2,0-116.8-23.4-159.5-65.9c-42.8-42.7-66.4-99.5-66.4-160c0-60.2,23.4-116.8,65.9-159.5c42.7-42.8,99.5-66.4,160-66.4c60.2,0,116.8,23.4,159.5,65.9c42.8,42.7,66.4,99.5,66.4,160C481.9,316.2,458.5,372.8,416,415.5z'}/>
    <path className="dot" d={'M256,379.2c-67.9,0-123.2-55.3-123.2-123.2S188.1,132.8,256,132.8S379.2,188.1,379.2,256S323.9,379.2,256,379.2z'}/>
  </svg>
))`
pointer-events: none;

.circle {
  fill: ${props => props.circleColor};
}

.dot {
  fill: ${props => (props.checked ? props.dotColor : 'transparent')};
  transition: fill 0.5s;
}
`;

export const CheckIcon = styled(({ className }) => (
  <svg className={className} version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 306 306">
  <path className="box" d={'M273.3,0H32.9C14.8,0,0.1,14.7,0.1,32.8v240.4c0,18.1,14.7,32.8,32.8,32.8h240.4c18.1,0,32.8-14.7,32.8-32.8  V32.8C306.1,14.7,291.4,0,273.3,0L273.3,0z M291.1,273.3c0,9.8-8,17.8-17.8,17.8H32.9c-9.8,0-17.8-8-17.8-17.8V32.8  c0-9.8,8-17.8,17.8-17.8h240.4c9.8,0,17.8,8,17.8,17.8V273.3z'}/>
  <path className="white-outline" d={'M285.5-0.5c-10.4,0-20.1,4-27.5,11.4L113.2,154.4L63,103.9l0,0l0,0c-7.4-7.4-17.2-11.5-27.6-11.5  c-10.4,0-20.1,4-27.5,11.4l-8.5,8.4l0,0l0,0c-7.3,7.3-11.4,17.1-11.5,27.4c-0.1,10.5,4,20.3,11.4,27.7l86.1,86.8l0,0l0,0  c7.4,7.4,17.2,11.5,27.7,11.5c10.4,0,20.1-4,27.4-11.3l181-179.6l0,0l0,0c7.4-7.4,11.4-17.1,11.5-27.5c0-10.3-3.9-20-11.1-27.4  l-0.1-0.1l-0.1-0.1l-8.5-8.5l0,0l0,0C305.7,3.5,295.9-0.5,285.5-0.5L285.5-0.5z'}/>
  <path className="check" d={'M302.5,38.6l-8.5-8.5c-4.7-4.7-12.3-4.8-17-0.1L113,192.6l-69.2-69.7c-4.7-4.7-12.3-4.8-17-0.1l-8.5,8.5  c-4.7,4.7-4.8,12.3-0.1,17l86.2,86.9c4.7,4.7,12.3,4.8,17,0.1l181-179.6C307.2,50.9,307.2,43.3,302.5,38.6L302.5,38.6z'}/>
  </svg>
))`
pointer-events: none;

.box {
  fill: ${props => props.boxColor};
}

.check {
  fill: ${props => (props.checked ? props.checkColor : 'transparent')};
  transition: fill 0.5s;
}

.white-outline {
  fill: ${props => (props.checked ? 'white' : 'transparent')};
  transition: fill 0.5s;
}
`;

export const EditIcon = styled(({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
    <path d="M417.8 315.5l20-20c3.8-3.8 10.2-1.1 10.2 4.2V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h292.3c5.3 0 8 6.5 4.2 10.2l-20 20c-1.1 1.1-2.7 1.8-4.2 1.8H48c-8.8 0-16 7.2-16 16v352c0 8.8 7.2 16 16 16h352c8.8 0 16-7.2 16-16V319.7c0-1.6.6-3.1 1.8-4.2zm145.9-191.2L251.2 436.8l-99.9 11.1c-13.4 1.5-24.7-9.8-23.2-23.2l11.1-99.9L451.7 12.3c16.4-16.4 43-16.4 59.4 0l52.6 52.6c16.4 16.4 16.4 43 0 59.4zm-93.6 48.4L403.4 106 169.8 339.5l-8.3 75.1 75.1-8.3 233.5-233.6zm71-85.2l-52.6-52.6c-3.8-3.8-10.2-4-14.1 0L426 83.3l66.7 66.7 48.4-48.4c3.9-3.8 3.9-10.2 0-14.1z"/>
  </svg>
))`
`;
