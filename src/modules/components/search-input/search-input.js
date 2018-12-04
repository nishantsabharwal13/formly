import React from 'react';
import {
  StyleSheet,
  Platform,
  View,
  TextInput,
} from 'react-native';

import Colors from '~/constants/colors';

const styles = StyleSheet.create({
  container: {
    zIndex: Platform.OS === 'android' ? 0 : 1,
    ...Platform.select({
      ios: {
        height: 41,
        padding: 10,
      },
      android: {
        height: 60,
        padding: 10,
      },
    }),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'grey',
    ...Platform.select({
      ios: {
        paddingHorizontal: 10,
        borderRadius: 8,
      },
      android: {
        paddingHorizontal: 14,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'rgba(0, 0, 0, .3)',
        elevation: 4,
        borderRadius: 2,
      },
    }),
  },
  input: {
    flex: 1,
    paddingLeft:5,
    height: '100%',
    backgroundColor: '#fff',
    fontSize: 15,
    color: Colors.primary,
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
