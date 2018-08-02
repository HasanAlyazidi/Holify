import React from 'react';
import PropTypes from 'prop-types';

import { List as BaseList, ListItem } from 'react-native-elements';

import t, { textAlign } from '../i18n';

const List = (props) => {
  const chevronIcon = { name: `chevron-${t('style.end')}` };

  const { items } = props;

  return (
    <BaseList containerStyle={{ alignSelf: 'stretch' }}>
      {items.map(item => (
        <ListItem
          key={item.title}
          titleStyle={{ textAlign: textAlign() }}
          title={item.title}
          subtitle={item.subtitle}
          leftIcon={item.icon}
          rightIcon={chevronIcon}
          onPress={item.onPress}
          subtitleNumberOfLines={3}
          badge={item.badge !== undefined ? { value: item.badge } : undefined}
        />
      ))}
    </BaseList>
  );
};

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    icon: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    onPress: PropTypes.func.isRequired,
  })).isRequired,
};

export default List;
