import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import registerScreens from './src/screens';
import configureStore from './src/store';

const store = configureStore();

registerScreens(store, Provider);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'Initializing'
      }
    },
  });
});
