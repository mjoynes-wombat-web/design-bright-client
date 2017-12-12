// IMPORT DEPENDENCIES
import React from 'react';
import ReactGA from 'react-ga';

// INITIALIZE REACT GOOGLE ANALYTICS
ReactGA.initialize('UA-105647315-1');

// GOOGLE ANALYTICS TRACKER
const gaTracker = (WrappedComponent) => {
  // TRACK THE PAGE.
  // Tracks the page based on the page url passed.
  const trackPage = (page) => {
    ReactGA.set({ page });
    ReactGA.pageview(page);
  };

  // TRACK AND RETURN
  // Tracks the returns the wrapped component.
  const trackReturn = (props) => {
    const page = props.location.pathname;
    trackPage(page);

    return (
      <WrappedComponent {...props} />
    );
  };

  return trackReturn;
};

export default gaTracker;
