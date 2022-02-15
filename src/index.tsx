// scroll bar
import { Web3ReactProvider } from '@web3-react/core';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
// lightbox
import 'react-image-lightbox/style.css';
import { HashRouter as Router } from 'react-router-dom';
import 'simplebar/src/simplebar.css';
import 'slick-carousel/slick/slick-theme.css';
// slick-carousel
import 'slick-carousel/slick/slick.css';
import { getLibrary } from 'utils/web3React';
//
import App from './App';
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext';
// contexts
import { SettingsProvider } from './contexts/SettingsContext';
import { WalletProvider } from './contexts/WalletContext';
// import i18n
import './locales/i18n';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  <StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <HelmetProvider>
        <SettingsProvider>
          <CollapseDrawerProvider>
            <WalletProvider>
              <Router>
                <App />
              </Router>
            </WalletProvider>
          </CollapseDrawerProvider>
        </SettingsProvider>
      </HelmetProvider>
    </Web3ReactProvider>
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
