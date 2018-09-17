// SignIn.js
import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  AsyncStorage
} from 'react-native'

import { goHome } from './navigation'
import { USER_KEY } from './config'

export default class SignIn extends React.Component {
  state = {
    username: '', password: ''
  }
  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }
  signIn = async () => {
    const { username, password } = this.state
    try {
      // login with provider
      const user = await AsyncStorage.setItem(USER_KEY, username)
      console.log('user successfully signed in!', user)
      goHome()
    } catch (err) {
      console.log('error:', err)
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Username'
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('username', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          autoCapitalize="none"
          secureTextEntry={true}
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('password', val)}
        />
        <Button
          title='Sign In'
          onPress={this.signIn}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    fontSize: 18,
    fontWeight: '500',
    height: 55,
    backgroundColor: '#e8e8e8',
    margin: 10,
    color: '#333',
    padding: 8,
    borderRadius: 3
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})