import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  AsyncStorage
} from 'react-native'
import { Navigation } from 'react-native-navigation';

import { homeDetails } from '~/actions/home';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { goToAuth } from '~/helpers/navigation'
import { USER_KEY } from '~/config'

class Home extends React.Component {
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Home'
        },
      }
    };
  }
  async componentDidMount() {
    try {
      const res = await this.props.homeDetails();
      console.log({res});
    } catch (err) {
      console.log(err)
    }
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
        <Text style={styles.title}>WELCOME TO FORM</Text>
        <Button
          onPress={() => {
            Navigation.push(this.props.componentId, {
              component: {
                name: 'FirstScreen',
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
};

function mapStateToProps(state) {
  return {
    home: state.home
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    homeDetails: homeDetails
  },dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);


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
