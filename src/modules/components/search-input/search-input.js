import React from 'react';
import {
  StyleSheet,
  Platform,
  View,
  TextInput,
} from 'react-native';

import Color from '~/constants/colors';

const styles = StyleSheet.create({
  container: {
    zIndex: Platform.OS === 'android' ? 0 : 1,
    ...Platform.select({
      ios: {
        height: 51,
        padding: 0,
      },
      android: {
        height: 60,
        padding: 0,
      },
    }),
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fff',
    fontSize: 14,
    borderWidth: 1,
    borderColor: 'grey',
    ...Platform.select({
      ios: {
        paddingHorizontal: 10,
        borderRadius: 8,
      },
      android: {
        paddingHorizontal: 16,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'rgba(0, 0, 0, .3)',
        elevation: 4,
        borderRadius: 2,
      },
    }),
  },
});

export default ({
  placeholder = 'Search',
  value = '',
  onChange = () => { },
  leftEle = null,
  rightEle = null,
  ...inputProps
}) => (
    <View style={styles.container}>
      {leftEle}
      <TextInput
        style={styles.input}
        returnKeyType='search'
        value={value}
        placeholder={placeholder}
        clearButtonMode='while-editing'
        underlineColorAndroid='transparent'
        onChangeText={onChange}
        {...inputProps}
      />
      {rightEle}
    </View>
  );
