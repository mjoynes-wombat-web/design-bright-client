/* eslint-env browser */
import React from 'react';
import Link from 'react-router-dom/Link';

import './scss/style.scss';

import colors from '../../consts/colors.scss';

import sunsetMarsh from './img/sunset-marsh.jpg';
import Line from '../../components/svgs/line';
import Heading from '../../components/heading';

const Home = () => {
  document.title = 'Home - Design Bright';
  return (
    <main id='index'>
      <section id='mainImage'>
        <img src={sunsetMarsh} alt='Sunset over the marsh.' />
        <div className='orange-line'>
          <Line color={colors.mauiOrange} scale={3} />
        </div>
        <div className='white-block'></div>
      </section>
      <section className='main-content'>
        <section id='intro'>
          <Heading type='h1' text='Who are We?' />
          <p>
            There are more than&nbsp;
            <a
              href='http://grantspace.org/tools/knowledge-base/Funding-Research/Statistics/number-of-nonprofits-in-the-u.s'
              target='_blank'
              rel='noopener noreferrer'>
              1.5 million non-profits
            </a>
            &nbsp;in the US. The&nbsp;
            <a
              href='https://www.forbes.com/sites/williampbarrett/2016/12/14/the-largest-u-s-charities-for-2016/'
              target='_blank'
              rel='noopener noreferrer'>
              top 100 receive over $100 million
            </a>
            &nbsp;in annual donations. However, very few people can name more than a
          handful. Even fewer can name the most impactful non-profits in their community.
          </p>
          <p>
            Our goal is to help non-profits have a voice. Unlike other crowd funding platforms we
          connect non-profits with marketing advisors to help them from the inception of
          their campaign. This helps the non-profits get off on the right foot from the
          beginning.
          </p>
          <p>
            We connect passionate donors and the non-profits that fight for the causes that
          matters to them.
          </p>
          <p>
            Help us create a voice for the causes that matter to you and design a bright future.
          </p>
        </section>
        <section id='cta'>
          <div>
            <h2><Link to='/campaigns/browse'>Find a Cause</Link></h2>
            <p>
              Want to help out a great cause?
            </p>
            <p>
              Donate today to a cause that matters to you and help give them a voice.
            </p>
          </div>
          <div>
            <h2><Link to='/register'>Start a Campaign</Link></h2>
            <p>
              Are you a nonprofit?
            </p>
            <p>
              Start a campaign today to fund the marketing needed to voice your cause.
            </p>
          </div>
          <div>
            <h2><Link to='/advisor'>Become an Advisor</Link></h2>
            <p>
              Do you have the experience and insight to help spread a cause?
            </p>
            <p>
              Sign up to be an advisor today!
            </p>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Home;
