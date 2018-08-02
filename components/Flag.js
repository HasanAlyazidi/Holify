import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';

export default class Flag extends React.PureComponent {
  static defaultProps = {
    width: 28,
    height: 28,
  };

  render() {
    const { image, width, height } = this.props;
    return <Image source={image} fadeDuration={0} style={{ width, height }} />;
  }
}

Flag.propTypes = {
  image: PropTypes.number.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};
