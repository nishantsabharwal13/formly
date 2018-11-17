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

import { goToAuth } from '~/helpers/navigation';
import { USER_KEY } from '~/config';

import { iconsMap } from '~/helpers/app-icons';


class Home extends React.Component {

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
        <Text style={styles.title}>WELCOME TO FORMLY</Text>
        <Button
          onPress={() => {
            Navigation.push(this.props.componentId, {
              component: {
                name: 'FormList',
                options: {
                  topBar: {
                    title: {
                      text: 'Forms'
                    },
                    rightButtons: [
                      {
                        id: 'AddForm',
                        icon: iconsMap['ios-add']
                      }
                    ]
                  }
                }
              }
            });
          }}
          title="Manage Forms"
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
});

function mapStateToProps(state) {
  return {
    home: state.home
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    homeDetails: homeDetails
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
