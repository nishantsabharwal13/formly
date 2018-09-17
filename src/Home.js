import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  AsyncStorage
} from 'react-native'
import { goToAuth } from './navigation'
import { Navigation } from 'react-native-navigation';

import { USER_KEY } from './config'

export default class Home extends React.Component {
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Home'
        },
      }
    };
  }
  logout = async () => {
    try {
      await AsyncStorage.removeItem(USER_KEY)
      goToAuth()
    } catch (err) {
      console.log('error signing out...: ', err)
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.flexContainer}></View>
        <Text style={styles.title}>WELCOME TO FORMLY</Text>
        <Button
          onPress={() => {
            Navigation.push(this.props.componentId, {
              component: {
                name: 'FormBuilder',
              }
            });
          }}
          title="Build Form"
        />
        <View style={styles.flexContainer}></View>
        <Button
          onPress={this.logout}
          title="Sign Out"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'column'
  },
  title: {
    fontSize: 20
  },
  flexContainer: {
    flex:1
  }
})
