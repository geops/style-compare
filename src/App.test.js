import React from 'react';
import { render } from '@testing-library/react';
import { Provider as ReduxProvider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import OLMap from 'ol/Map';
import thunk from 'redux-thunk';
import App from './App';

const mockStore = configureMockStore([thunk]);

test('renders learn react link', () => {
  const store = mockStore({
    mapLeft: new OLMap({
      controls: [],
    }),
    mapRight: new OLMap({
      controls: [],
    }),
  });
  render(
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>,
  );
});
