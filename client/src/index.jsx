/* eslint-disable import/extensions */
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import JavascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import App from './components/App.jsx';

JavascriptTimeAgo.addLocale(en);

ReactDOM.render(
  <App />,
  document.getElementById('Walker'),
);
