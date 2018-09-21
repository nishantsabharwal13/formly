import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import registerScreens from '~/screens';
import configureStore from '~/store';

const store = configureStore();

registerScreens(store, Provider);

const navigatorStyle = {
  statusBarColor: 'black',
  statusBarTextColorScheme: 'light',
  navigationBarColor: 'black',
  navBarBackgroundColor: '#0a0a0a',
  navBarTextColor: 'white',
  navBarButtonColor: 'white',
  tabBarButtonColor: 'red',
  tabBarSelectedButtonColor: 'red',
  tabBarBackgroundColor: 'white',
  topBarElevationShadowEnabled: false,
  navBarHideOnScroll: true,
  tabBarHidden: false,
  drawUnderTabBar: true
};

// Navigation.startSingleScreenApp({
// 	screen: {
//     screen: 'Initializing',
// 		title: 'Form Builder App',
// 		navigatorStyle:navigatorStyle,
// 		leftButtons: [
// 			{
// 				id: 'sideMenu'
// 			}
// 		]
// 	},
// 	drawer: {
// 		left: {
// 			screen: 'Drawer'
// 		}
// 	}
// });
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'Initializing'
      }
    },
  });
});