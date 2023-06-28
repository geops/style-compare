/* eslint-disable no-underscore-dangle */
// Core Dependencies
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import reducers from "./store/reducers";
import "abortcontroller-polyfill/dist/abortcontroller-polyfill-only";

import "./i18n";

// Root Component
import App from "./App";

// Others
import * as serviceWorker from "./serviceWorker";

// Store
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

store.subscribe(() => {});

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
