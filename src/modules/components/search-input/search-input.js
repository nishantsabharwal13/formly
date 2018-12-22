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
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
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
    height: 21,
    backgroundColor: '#fff',
    flex: 1,
    paddingLeft:5,
    fontSize: 15,
    color: Colors.text,
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
