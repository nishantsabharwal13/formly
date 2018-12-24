import React, { PropTypes, Component } from 'react';
import {
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {Navigation} from 'react-native-navigation';
import { goToAuth } from '~/helpers/navigation';
import Colors from '~/constants/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#fff',
    flex: 1,
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
  header: {
    paddingHorizontal: 30,
    paddingVertical: 50,
    padding: Navigation.constants().statusBarHeight,
    backgroundColor: Colors.topBar,
    flexDirection: 'column',
    elevation: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    marginBottom: 10,
  },
  headerText: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 20,
  }
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
            <View style={styles.header}>
              <Text style={styles.headerText}>Form Pro</Text>
            </View>
          </View>
        </View>
    )
  }
};

export default Drawer;
