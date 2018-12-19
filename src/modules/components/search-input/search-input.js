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
    padding: 10,
    backgroundColor: Colors.topBar,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flexDirection: 'row',
    alignItems:'center',
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#fff',
    padding: 10,
    ...Platform.select({
      ios: {
        borderRadius: 8,
      },
      android: {
        borderRadius: 2,
      },
    }),
  },
  input: {
    ...Platform.select({
      ios: {
        height: 41,
      },
      android: {
        height: 60,
      },
    }),
    backgroundColor: '#fff',
    flex: 1,
    paddingLeft:5,
    height: '100%',
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
      <View style={styles.textInput}>
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
    </View>
  );
