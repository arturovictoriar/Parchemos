// Import libraries
import React from 'react';
import ReactDOM from 'react-dom';
// Import modules
import './styles/index.css';
import App from './components/App';
import registerServiceWorker from './utils/registerServiceWorker';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
// Call the register Service Worker
registerServiceWorker();
