import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import stores from './app/store';
// import 'antd/dist/antd.css';
// import './index.css'; // Ensure this file exists in the src directory
ReactDOM.render(
  <Router>
    <Provider store={stores}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);
