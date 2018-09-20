import React from 'react';
import { Navigation } from 'react-native-navigation';
import Drawer from './modules/global/drawer';
import Home from './modules/appscreens/home';
import SignIn from './modules/appscreens/signin';
import SignUp from './modules/appscreens/signup';
import Initializing from './modules/appscreens/initialization';
import FirstScreen from './modules/appscreens/first-screen';

export function registerScreens(store, Provider) {
  Navigation.registerComponent('Drawer', () => Drawer);
  Navigation.registerComponent('Home', () => Home, store, Provider);
  Navigation.registerComponent('FirstScreen', () => FirstScreen, store, Provider);
  Navigation.registerComponent('Initializing', () => Initializing, store, Provider);
  Navigation.registerComponent('SignIn', () => SignIn, store, Provider);
  Navigation.registerComponent('SignUp', () => SignUp, store, Provider);
}
