import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { AppLoading } from 'expo';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { setCustomText } from 'react-native-global-props';

import store from './store';

import RootNavigator, { setInitialScreen, getInitialScreen } from './screens';

import { setLocale, textAlign } from './i18n';

import { Storage, Fonts, isFirstLaunch } from './utils/Common';
import NavigatorService from './utils/navigator';
import { cacheImages, cacheFonts, registerForPushNotificationsAsync } from './utils/expo-helpers';

import { setFirstLaunchStatus } from './actions/settings';

import MyStatusBar from './components/MyStatusBar';

export default class App extends React.Component {
  state = {
    isReady: false,
    isReduxReady: false,
  };

  componentDidMount = () => {
    persistStore(store, null, () => {
      this.setState({ isReduxReady: true });
    });
  };

  onAppLoadingFinish = async () => {
    this.setComponentsDefaultProps();
    this.setState({ isReady: true });
  };

  setComponentsDefaultProps = () => {
    const customFontProps = {
      style: {
        fontFamily: Fonts.normal.name,
        textAlign: textAlign(),
      },
    };

    setCustomText(customFontProps);
  };

  loadAssetsAsync = async () => {
    const imageAssets = cacheImages([
      require('./assets/images/screens/Main/bg.png'),
      require('./assets/images/screens/Main/header-logo.png'),
      require('./assets/images/screens/Main/celebrities.png'),
      require('./assets/images/screens/Main/recent.png'),
      require('./assets/images/flags/KW.png'),
      require('./assets/images/flags/SA.png'),
      require('./assets/images/flags/AE.png'),
      require('./assets/images/flags/QA.png'),
      require('./assets/images/flags/OM.png'),
      require('./assets/images/flags/BH.png'),
    ]);

    const { name: fontName, file: fontFile } = Fonts.normal;

    const fontAssets = cacheFonts([
      {
        [fontName]: fontFile,
      },
    ]);

    await Promise.all([
      ...imageAssets,
      ...fontAssets,
    ]);

    registerForPushNotificationsAsync();

    const lang = await Storage.get('lang');

    if (lang) {
      setLocale(lang);
    }

    const isAppFirstLaunch = await isFirstLaunch();

    if (isAppFirstLaunch) {
      setInitialScreen('Welcome');
    }

    setFirstLaunchStatus(isAppFirstLaunch);

    NavigatorService.setInitialScreen(getInitialScreen());
  };

  render() {
    const { isReady, isReduxReady } = this.state;

    if (!isReady || !isReduxReady) {
      return (
        <AppLoading
          startAsync={this.loadAssetsAsync}
          onFinish={this.onAppLoadingFinish}
          onError={console.warn} // eslint-disable-line no-console
        />
      );
    }

    return (
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <MyStatusBar backgroundColor="#8FD460" />
            <RootNavigator />
          </View>
        </SafeAreaView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
