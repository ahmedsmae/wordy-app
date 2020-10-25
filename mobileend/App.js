import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { LogBox } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { createStructuredSelector } from 'reselect';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { enableScreens } from 'react-native-screens';

import store from './redux/store';
import appTheme from './app.theme';

import { createRootNavigator } from './navigation/root-navigator';

import { selectCurrentUser } from './redux/current-user/current-user.selectors';
import { loadingUserStart } from './redux/current-user/current-user.actions';

// enableScreens()
// Supress unnecessary warnings
LogBox.ignoreLogs([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);

const App = ({ loadingUserStart, currentUser }) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [wizardDisplayed, setWizardDisplayed] = useState(false);

  useEffect(() => {
    // AsyncStorage.removeItem('WIZARD_DISPLAYED');
    // AsyncStorage.removeItem('BASIC_TOKEN');
    // AsyncStorage.removeItem('FACEBOOK_TOKEN');
    // AsyncStorage.removeItem('GOOGLE_TOKEN');
    // AsyncStorage.removeItem('NOTIFICATION_TOKEN');
    loadingUserStart(err => {
      if (err) console.log(err);
      Font.loadAsync({
        'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf'),
        'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf')
      })
        .then(() => {
          AsyncStorage.getItem('WIZARD_DISPLAYED')
            .then(result => {
              setWizardDisplayed(result);
              setDataLoaded(true);
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    });
  }, []);

  const Layout = createRootNavigator(currentUser, wizardDisplayed);

  return dataLoaded ? <Layout /> : <AppLoading />;
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  loadingUserStart: callback => dispatch(loadingUserStart(callback))
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default () => (
  <StoreProvider store={store}>
    <PaperProvider theme={appTheme}>
      <AppContainer />
    </PaperProvider>
  </StoreProvider>
);
