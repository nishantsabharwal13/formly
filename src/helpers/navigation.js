import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { iconsMap } from './app-icons';


export const goToAuth = () => Navigation.setRoot({
  root: {
    bottomTabs: {
      id: 'BottomTabsId',
      children: [
        {
          component: {
            name: 'SignIn',
            options: {
              bottomTab: {
                fontSize: 12,
                text: 'Sign In',
                icon: iconsMap['user-check']
              }
            }
          },
        },
        {
          component: {
            name: 'SignUp',
            options: {
              bottomTab: {
                text: 'Sign Up',
                fontSize: 12,
                icon: iconsMap['user-plus']
              }
            }
          },
        },
      ],
    }
  }
});

export const sideMenu = () => Navigation.setRoot({
  sideMenu: {
        id: 'SideMenu',
        center: {
        component: {
          name: 'CreateForm',
            options: {
            topBar: {
              title: {
                text: 'Create Form'
              },
              rightButtons: [
                {
                  id: 'AddField',
                  icon: iconsMap['ios-add']
                }
              ],
            },
          }
        },
      },
      right: {
        component: {
          name: 'AddField',
            passProps: {
            text: ''
          },
          options: {
          },
        },
    }
  }
});

export const goHome = () => Navigation.setRoot({
  root: {
    stack: {
      id: 'App',
      children: [
        {
          component: {
            name: 'FormList',
            options: {
              topBar: {
                title: {
                  text: 'Forms'
                },
                rightButtons: [
                  {
                    id: 'CreateForm',
                    icon: iconsMap['ios-add']
                  }
                ]
              }
            }
          }
        },
      ],
    }
  }
});