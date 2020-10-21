import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from 'styled-components';
import Theme from './Theme/Theme'

ReactDOM.render(
<ThemeProvider theme={Theme}>
    <App />
</ThemeProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
