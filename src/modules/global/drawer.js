import React, { PropTypes, Component } from 'react';
import {
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {Navigation} from 'react-native-navigation';
import { goToAuth } from '~/helpers/navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 25,
    paddingTop: 30,
  },
  drawerList: {

  },
  drawerListIcon: {
    width: 27
  },
  drawerListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 23
  },
  drawerListItemText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    paddingLeft: 15,
    flex: 1
  },
});
class Drawer extends Component {
  showAlert(event) {
    this.toggleDrawer();
    ToastAndroid.show('Coming Soon!', ToastAndroid.SHORT);
  }
  toggleDrawer() {
    // this.props.navigator.toggleDrawer({
    //   to: 'closed',
    //   side: 'left',
    //   animated: true
    // });
  }
  goToHome(event) {
    this.toggleDrawer();
    goToAuth();
    // this.props.navigator.popToRoot({
    //   screen: 'Home'
    // });
  }
  openFirstPage(event) {
    this.toggleDrawer();
    // this.props.navigator.showModal({
    //   screen: 'FirstScreen',
    //   title: 'FirstScreen'
    // });
  }
  render() {
    const iconHome = (<Icon name="ios-home" size={26} color="#9F9F9F" style={[styles.drawerListIcon, { paddingLeft: 2 }]} />);
    const iconMovies = (<Icon name="md-film" size={26} color="#9F9F9F" style={[styles.drawerListIcon, { paddingLeft: 3 }]} />);
    const iconTV = (<Icon name="ios-desktop" size={26} color="#9F9F9F" style={styles.drawerListIcon} />);

    return (
        <View style={styles.container}>
          <View style={styles.drawerList}>
            <TouchableOpacity onPress={(event) => this.goToHome(event)}>
              <View style={styles.drawerListItem}>
                {iconHome}
                <Text style={styles.drawerListItemText}>
                  Home
								</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={(event) => this.openFirstPage(event)}>
              <View style={styles.drawerListItem}>
                {iconTV}
                <Text style={styles.drawerListItemText}>
                  Screen1
								</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.drawerListItem}>
              {iconTV}
              <Text style={styles.drawerListItemText} onPress={(event) => this.showAlert(event)}>
                Screen2
							</Text>
            </View>
          </View>
        </View>
    )
  }
};

export default Drawer;
