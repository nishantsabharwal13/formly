import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native'
import { Navigation } from 'react-native-navigation';

export default class Screen1 extends React.Component {
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Screen 1'
        },
      }
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Build Form</Text>
        <Button
          onPress={() => Navigation.pop(this.props.componentId)}
          title="Go Back"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})