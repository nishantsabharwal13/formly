import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Navigation } from 'react-native-navigation';
import registerScreens from './src/screens';

registerScreens(Provider, PersistGate);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'Initializing'
      }
    },
  });
});
