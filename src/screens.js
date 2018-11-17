import React from 'react';
import { Navigation } from 'react-native-navigation';
import Drawer from '~/modules/global/drawer';
import Home from '~/modules/appscreens/home';
import SignIn from '~/modules/appscreens/signin';
import SignUp from '~/modules/appscreens/signup';
import Initializing from '~/modules/appscreens/initialization';
import FormList from '~/modules/appscreens/form-list';

const containers = [
  { name: 'Initializing', generator: () => Initializing },
  { name: 'Drawer', generator: () => Drawer },
  { name: 'Home', generator: () => Home },
  { name: 'FormList', generator: () => FormList },
  { name: 'SignIn', generator: () => SignIn },
  { name: 'SignUp', generator: () => SignUp },
]

export default function registerScreens(store, Provider) {
  containers.map(container => registerContainerWithRedux(container.name, container.generator, store, Provider));

}

function registerContainerWithRedux(containerName, generator, store, Provider) {
  const generatorWrapper = function () {
    const InternalComponent = generator();
    return class extends React.Component {
      render() {
        return (
          <Provider store={store}>
            <InternalComponent {...this.props} />
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