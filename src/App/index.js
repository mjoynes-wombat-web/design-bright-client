/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';

// IMPORT COMPONENTS
import Header from '../components/header';
import Routes from './routes';
import Footer from '../components/footer';

// IMPORT CSS STYLING
import './scss/style.scss';

// MAIN REACT COMPONENT
// The main stateless react component which returns the header, footer and component
// based on the route.
const App = (props) => {
  // Runs the component did mount function passed form the parent.
  props.onComponentDidMount();
  return (
    <div>
      <Header />
      <Routes />
      <Footer />
    </div>
  );
};

export default App;
