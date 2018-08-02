import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ButtonGroup as BaseButtonGroup } from 'react-native-elements';

import { Fonts } from '../utils/Common';

const ButtonGroup = ({ selectedIndex, buttons, onPress }) => (
  <BaseButtonGroup
    onPress={onPress}
    selectedIndex={selectedIndex}
    buttons={buttons}
    containerStyle={styles.buttonGroupContainer}
    selectedTextStyle={{ color: 'white' }}
    selectedButtonStyle={{ backgroundColor: '#E8DAC1' }}
    lastBorderStyle={{ borderColor: 'transparent' }}
    textStyle={styles.buttonGroupText}
    underlayColor="#E2E2E2"
    containerBorderRadius={0}
    innerBorderStyle={{ width: 0, color: 'transparent' }}
    disableSelected
  />
);

const styles = StyleSheet.create({
  buttonGroupContainer: {
    height: 50,
    borderWidth: 0,
    borderRadius: 0,
  },
  buttonGroupText: {
    fontFamily: Fonts.normal.name,
    fontSize: 22,
  },
});

ButtonGroup.propTypes = {
  selectedIndex: PropTypes.number.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      element: PropTypes.func,
    }),
  ])).isRequired,
  onPress: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  selectedIndex: state.welcome[ownProps.state],
});

export default connect(mapStateToProps)(ButtonGroup);
