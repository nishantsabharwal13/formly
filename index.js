import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import registerScreens from './src/screens';
import configureStore from './src/store';
import Fields from './src/data/fields';

const initialState = {
  fields: Fields
};

const store = configureStore(initialState);


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
