import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CookiesProvider } from "react-cookie";
import { Provider } from 'react-redux';
import store from './global/redux/store';

import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { ThemeProvider as CustomThemeProvider } from './componants/common/ThemeContext';

import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <CustomThemeProvider>
        <CssBaseline />
        <CookiesProvider>
          <Provider store={store}>
            <UserProvider>
              <CartProvider>
                <App />
              </CartProvider>
            </UserProvider>
          </Provider>
        </CookiesProvider>
      </CustomThemeProvider>
    </MuiThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
