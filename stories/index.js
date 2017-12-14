import React from 'react';
import { MemoryRouter } from 'react-router';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { Provider } from 'react-redux';

import Header from '../src/components/header';
import Footer from '../src/components/footer';
import { Button } from '../src/components/button';
import { Input, Select, RadioFieldset, Checkbox } from '../src/components/inputs';
import Heading from '../src/components/heading';
import Loading from '../src/components/loading';
import store from '../src/store';

storiesOf('Site Layout', module)
  .addDecorator(story => (
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
    </Provider>
  ))
  .add(
    'Header',
    () => <Header />,
  ).add(
    'Footer',
    () => <Footer />,
  );

storiesOf('Buttons', module)
  .add('Primary Button', () => <Button primary onClick={ action('button-click') }>Primary</Button>)
  .add('Primary Button - Disabled', () => <Button primary disabled onClick={ action('button-click') }>Disabled Primary</Button>)
  .add('Secondary Button', () => <Button secondary onClick={ action('button-click') }>Secondary</Button>)
  .add('Secondary Button - Disabled', () => <Button secondary disabled onClick={ action('button-click') }>Disabled Secondary</Button>)
  .add('Cancel Button', () => <Button cancel onClick={ action('button-click') }>Cancel</Button>);

storiesOf('Inputs', module)
  .add(
    'Plain Input',
    () => <Input
      onChange={action('Plain Input Changed')}
      type='text'
      inputLabel='Plain Input'
      id='plainInput'/>,
  )
  .add(
    'Required Input',
    () => <Input
      onChange={action('Required Input Changed')}
      type='text'
      inputLabel='Required Input'
      id='requiredInput'
      required/>,
  )
  .add(
    'Input With Error',
    () => <Input
      onChange={action('Errored Input Changed')}
      type='text'
      inputLabel='Errored Input'
      id='erroredInput'
      required
      error={
        <span>
          There is an error on this input. <a href='#'>You can visit this link for more info.</a>
        </span>
      } />,
  )
  .add(
    'Select List',
    () => <Select
      onChange={action('Select Changed')}
      type='text'
      inputLabel='Select List'
      id='selectList'
      required
      options={
        [
          { name: 'First Item', value: 'first-item' },
          { name: 'Second Item', value: 'second-item' },
        ]
      }
    />,
  )
  .add(
    'Radio Fieldset',
    () => <RadioFieldset
      fieldsetName='radioFieldset'
      fieldsetLegend='Radio Fieldset'
      required
      onChange={action('Radio Fieldset Item Selected')}
      fields={
        [
          {
            id: 'firstItem',
            name: 'First Item',
            value: 'firstItem',
            checked: true,
            children: 'First Item Child',
          },
          {
            id: 'secondItem',
            name: 'Second Item',
            value: 'secondItem',
            checked: false,
          },
        ]
      }
    />,
  )
  .add(
    'Checkbox',
    () => <Checkbox
      id={'checkbox'}
      onChange={action('Checkbox Selected')}
      required
      checked={false}>
        This is a checkbox input.
    </Checkbox>,
  );

storiesOf('Loading', module)
  .add(
    'Component Loading',
    () => <div
      style={
        {
          backgroundColor: 'grey',
          width: '50%',
          height: '200px',
        }
      }>
      <Loading text='Loading Component' component/>
    </div>,
  ).add(
    'Page Loading',
    () => <div
      style={
        {
          backgroundColor: 'grey',
          width: '100%',
          height: '600px',
        }
      }>
      <Loading text='Loading Page' />
    </div>,
  );

storiesOf('Headings', module)
  .add(
    'Heading 1',
    () => <Heading type='h1' text='Heading 1' />,
  ).add(
    'Heading 2',
    () => <Heading type='h2' text='Heading 2' />,
  );
