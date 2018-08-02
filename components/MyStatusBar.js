import React from 'react';
import { View, Platform, NativeModules, StatusBar } from 'react-native';
import PropTypes from 'prop-types';

const { StatusBarManager } = NativeModules;

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

const MyStatusBar = ({ backgroundColor }) => (
  <View style={{ height: STATUSBAR_HEIGHT, backgroundColor }}>
    <StatusBar barStyle="light-content" backgroundColor={backgroundColor} />
  </View>
);

MyStatusBar.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
};

export default MyStatusBar;
