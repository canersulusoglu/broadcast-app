import React from 'react'
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import Routes from '@App/@configs/routesConfig';
import AppContext from '@App/AppContext'
import history from '@App/history';
import store from '@App/@store';
import { Authorization, Layout } from '@App/@components';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

import "@App/@assets/themes/lightTheme.less";
import "@App/@assets/themes/darkTheme.less";

const App = () : JSX.Element => {
  return (
    <I18nextProvider i18n={ i18n }>
      <AppContext.Provider
        value={{
          routes: Routes
        }}
      >
        <Provider store={store}>
          <Router history={history}>
            <Authorization>
              <Layout/>
            </Authorization>
          </Router>
        </Provider>
      </AppContext.Provider>
    </I18nextProvider>
  );
}

export default App;
