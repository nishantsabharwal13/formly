
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  Platform,
  Image,
  ActivityIndicator
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
    width: 200, 
    height: 200
  },
})
export default class Initializing extends Component {
  async componentDidMount() {
    try {
      const user = await AsyncStorage.getItem(USER_KEY)
      
      // if (user) {
      Platform.OS === 'ios' ? goHome() : 
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
      {
        Platform.OS === 'ios' ? (
          <View style={styles.welcome}>
            <ActivityIndicator size="small" color="#333"/>
          </View>
        ) : (
          <Image style={styles.welcome} source={require('assets/images/logo.png')}/>
        )
      }
      </View>
    )
  }
}

