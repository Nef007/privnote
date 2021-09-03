import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from "./redux/redux-store";
import { CookiesProvider } from 'react-cookie';

// настройки плагина
import './i18n';

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <CookiesProvider>
          <Suspense fallback={<div>Loading...</div>}>
          <App />
          </Suspense>
          </CookiesProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
