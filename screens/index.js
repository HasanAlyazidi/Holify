import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createDrawerNavigator, SafeAreaView } from 'react-navigation';

import WelcomeScreen from './WelcomeScreen';
import MainScreen from './MainScreen';
import ScanScreen from './ScanScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import MyAccountScreen from './MyAccountScreen';
import ResetPasswordScreen from './ResetPasswordScreen';
import AboutScreen from './AboutScreen';
import ContactScreen from './ContactScreen';

import Drawer from '../components/Drawer';

import t, { isRTL } from '../i18n';

import NavigatorService from '../utils/navigator';

let initialScreen = 'Home';

const RootNavigator = () => {
  const AppNavigator = createStackNavigator(
    {
      Welcome: { screen: WelcomeScreen },
      Home: { screen: MainScreen },
      Scan: { screen: ScanScreen },
      Login: { screen: LoginScreen },
      Register: { screen: RegisterScreen },
      MyAccount: { screen: MyAccountScreen },
      ResetPassword: { screen: ResetPasswordScreen },
      About: {
        screen: AboutScreen,
        navigationOptions: { title: t('about') },
      },
      Contact: { screen: ContactScreen },
    },
    {
      initialRouteName: initialScreen,
      headerMode: 'screen',
      navigationOptions: {
        title: null,
        headerStyle: { backgroundColor: 'white' },
        headerTintColor: 'black',
        drawerLockMode: 'locked-closed',
      },
    },
  );

  const drawerPosition = Platform.OS === 'ios' && isRTL() ? t('style.end') : t('style.start');

  const ParentNavigator = createDrawerNavigator(
    {
      Home: { screen: AppNavigator },
    },
    {
      drawerWidth: 300,
      drawerPosition,
      contentComponent: props => <Drawer {...props} />,
    },
  );

  return (
    <ParentNavigator
      ref={(navigatorRef) => {
        NavigatorService.setContainer(navigatorRef);
      }}
    />
  );
};

export default RootNavigator;

export const setInitialScreen = (screenName) => {
  initialScreen = screenName;
};

export const getInitialScreen = () => initialScreen;

SafeAreaView.setStatusBarHeight(0);
