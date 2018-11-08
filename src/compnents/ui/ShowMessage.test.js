import React from 'react';
import ReactDOM from 'react-dom';
import ShowMessage from './ShowMessage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ShowMessage />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders message', () => {
  const div = document.createElement('div');
  const msg = 'hello word'
  ReactDOM.render(<ShowMessage  msg={msg}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
