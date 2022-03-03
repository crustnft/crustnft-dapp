// scroll bar
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Web3ContextProvider } from 'contexts/Web3Context';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
// lightbox
import 'react-image-lightbox/style.css';
import { Provider as ReduxProvider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import 'simplebar/src/simplebar.css';
import 'slick-carousel/slick/slick-theme.css';
// slick-carousel
import 'slick-carousel/slick/slick.css';
import App from './App';
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext';
import { AuthProvider } from './contexts/JWTContext';
// contexts
import { SettingsProvider } from './contexts/SettingsContext';
import { WalletProvider } from './contexts/WalletContext';
// custom css
import './index.css';
// import i18n
import './locales/i18n';
import { store } from './redux/store';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  <StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <ReduxProvider store={store}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <WalletProvider>
              <Web3ContextProvider>
                <SettingsProvider>
                  <CollapseDrawerProvider>
                    <Router>
                      <App />
                    </Router>
                  </CollapseDrawerProvider>
                </SettingsProvider>
              </Web3ContextProvider>
            </WalletProvider>
          </LocalizationProvider>
        </ReduxProvider>
      </HelmetProvider>
    </AuthProvider>
  </StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
