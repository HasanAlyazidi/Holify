import React from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import BusyIndicator from 'react-native-busy-indicator';

import t from '../../i18n';

import NavigatorService from '../../utils/navigator';

import Top from '../../components/Top';

const dimWidth = Dimensions.get('window').width;

export default class AccountScreen extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    submitButtonTitle: PropTypes.string.isRequired,
    submitButtonCode: PropTypes.func.isRequired,
    leftButtonTitle: PropTypes.string,
    leftButtonCode: PropTypes.func,
    centerButtonTitle: PropTypes.string,
    centerButtonCode: PropTypes.func,
  };

  static defaultProps = {
    centerButtonTitle: null,
    centerButtonCode: null,
    leftButtonTitle: null,
    leftButtonCode: null,
  };

  render() {
    const {
      title,
      submitButtonTitle,
      submitButtonCode,
      leftButtonTitle,
      leftButtonCode,
      centerButtonTitle,
      centerButtonCode,
    } = this.props;

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Top title={title} />

            <View>
              {this.props.children}

              <View style={styles.gotoButtonsContainer}>
                <Button
                  small
                  title={t('account.back')}
                  color="#CBCBCB"
                  backgroundColor="transparent"
                  buttonStyle={styles.gotoButtonNoPadding}
                  containerViewStyle={styles.gotoButton}
                  onPress={() => {
                    NavigatorService.goBack();
                  }}
                />

                {centerButtonTitle && (
                  <Button
                    small
                    title={centerButtonTitle}
                    color="#CBCBCB"
                    backgroundColor="transparent"
                    buttonStyle={styles.gotoButtonNoPadding}
                    containerViewStyle={styles.gotoButton}
                    onPress={() => centerButtonCode()}
                  />
                )}

                {leftButtonTitle && (
                  <Button
                    small
                    title={leftButtonTitle}
                    color="#CBCBCB"
                    backgroundColor="transparent"
                    buttonStyle={styles.gotoButtonNoPadding}
                    containerViewStyle={styles.gotoButton}
                    onPress={() => leftButtonCode()}
                  />
                )}
              </View>
            </View>

            <Button
              large
              title={submitButtonTitle}
              backgroundColor="#EBC061"
              containerViewStyle={styles.submitButton}
              onPress={() => submitButtonCode()}
            />

            <BusyIndicator size="large" overlayHeight={120} text={title} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  gotoButtonsContainer: {
    width: dimWidth * 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gotoButton: {
    marginLeft: 0,
    marginRight: 0,
  },
  gotoButtonNoPadding: {
    paddingRight: 0,
    paddingLeft: 0,
  },
  submitButton: {
    width: dimWidth,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
});
