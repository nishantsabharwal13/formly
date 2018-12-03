import React from 'react';
import { Navigation } from 'react-native-navigation';

import Drawer from '~/modules/global/drawer';
import Home from '~/modules/appscreens/home';
import SignIn from '~/modules/appscreens/signin';
import SignUp from '~/modules/appscreens/signup';
import Initializing from '~/modules/appscreens/initialization';
import FormList from '~/modules/appscreens/form-list';
import CreateForm from '~/modules/appscreens/create-form';
import CustomizeField from '~/modules/appscreens/customize-field';

import { store, persistor } from '~/store';

const containers = [
  { name: 'Initializing', generator: () => Initializing },
  { name: 'Drawer', generator: () => Drawer },
  { name: 'Home', generator: () => Home },
  { name: 'FormList', generator: () => FormList },
  { name: 'SignIn', generator: () => SignIn },
  { name: 'SignUp', generator: () => SignUp },
  { name: 'CreateForm', generator: () => CreateForm },
  { name: 'CustomizeField', generator: () => CustomizeField },
]

export default function registerScreens(Provider, PersistGate) {
  containers.map(container => registerContainerWithRedux(container.name, container.generator, Provider, PersistGate));
}

function registerContainerWithRedux(containerName, generator, Provider, PersistGate) {
  const generatorWrapper = function () {
    const InternalComponent = generator();
    return class extends React.Component {
      renderLoading = () => {
        
      };
      
      render() {
        return (
          <Provider store={store}>
            <PersistGate persistor={persistor} loading={this.renderLoading()}>
              <InternalComponent {...this.props} />
            </PersistGate>
          </Provider>
        );
      }
    }
  };

  registerContainer(containerName, generatorWrapper);
  return generatorWrapper;
}

function registerContainer(containerName, generator) {
  Navigation.registerComponent(containerName, generator);
}