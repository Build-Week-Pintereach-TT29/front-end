import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from 'styled-components';
import Theme from './Theme/Theme'

ReactDOM.render(
<ThemeProvider theme={Theme}>
  <Router>
    <App />
  </Router>
</ThemeProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
