
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage
} from 'react-native';

import { goToAuth, goHome } from '~/helpers/navigation';
import Colors from '~/constants/colors';

import { USER_KEY } from '~/config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.topBar
  },
  welcome: {
    fontSize: 28,
    color: '#fff'
  },
})
export default class Initializing extends Component {
  async componentDidMount() {
    try {
      const user = await AsyncStorage.getItem(USER_KEY)
      
      // if (user) {
        setTimeout(() => {
          goHome();
        }, 2000);
      // } else {
      //   goToAuth()
      //   console.log('auth')

      // }
    } catch (err) {
      console.log('error: ', err)
      goToAuth()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Form Pro</Text>
      </View>
    )
  }
}

