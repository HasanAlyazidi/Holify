import React from 'react';
import { I18nManager, StyleSheet, View, Text } from 'react-native';
import { Updates } from 'expo';

import { Button } from 'react-native-elements';

import { setLanguage, isFirstLaunch } from '../actions/settings';

import Top from '../components/Top';

import t, { isRTL } from '../i18n';

import { Storage } from '../utils/Common';

export default class WelcomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      isFirstLaunch: isFirstLaunch(),
    };
  }

  async saveLanguage(lang) {
    const isRTL = lang !== 'en';

    setLanguage(lang);

    await Storage.multiSet([
      ['lang', lang],
      ['isFirstLaunch', 'yes'],
    ]);

    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);

    // reload if language is changed
    Updates.reload();
  }

  render() {
    return (
      <View style={styles.container}>
        <Top title="" />

        <View style={styles.content}>
          <View style={styles.buttons}>
            <Button
              title="عربي"
              backgroundColor="#8FD460"
              buttonStyle={styles.goToButton}
              containerViewStyle={styles.goToButtonContainer}
              onPress={() => this.saveLanguage('ar')}
              fontSize={22}
            />

            <Button
              title="English"
              backgroundColor="#8FD460"
              buttonStyle={styles.goToButton}
              containerViewStyle={styles.goToButtonContainer}
              onPress={() => this.saveLanguage('en')}
              fontSize={22}
            />

            <Button
              title="اردو"
              backgroundColor="#8FD460"
              buttonStyle={styles.goToButton}
              containerViewStyle={styles.goToButtonContainer}
              onPress={() => this.saveLanguage('ur')}
              fontSize={22}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F8F5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingVertical: 15,
  },
  text: {
    fontSize: 22,
    marginTop: 10,
  },

  buttons: {
    alignSelf: 'stretch',
  },

  goTo: {
    flexDirection: t('style.row'),
  },
  goToButton: {
    height: 50,
    alignSelf: 'stretch',
  },
  goToButtonContainer: {
    marginRight: 0,
    marginLeft: 0,
    marginTop: 10
  },
});
