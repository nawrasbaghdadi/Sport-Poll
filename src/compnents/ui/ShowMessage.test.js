import React from 'react';
import ReactDOM from 'react-dom';
import ShowMessage from './ShowMessage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ShowMessage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
