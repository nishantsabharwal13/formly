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
    left: {
      component: {
        name: 'Drawer',
        passProps: {
          text: ''
        },
        options: {
        },
      },
    },
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
  }
});

export const goHome = () => Navigation.setRoot({
  root: {
    sideMenu: {
      openGestureMode: 'entireScreen' | 'bezel',
      left: {
        component: {
          name: 'Drawer',
          id: 'leftSideDrawer',
          passProps: {
            text: 'side menu'
          },
          options: {
          },
        },
      },
      center: {
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
                    ],
                    leftButtons: [
                      {
                        id: 'SideMenu',
                        icon: iconsMap['ios-menu']
                      }
                    ],
                  }
                }
              }
            },
          ],
        }
      }
    }
  }
});

export const goCreateFormPage = (id, newForm) => Navigation.push(id, {
  component: {
    id: 'FormCreate',
    name: 'CreateForm',
    passProps: {
      newForm
    },
    options: {
      topBar: {
        title: {
          text: newForm.formName
        },
        rightButtons: [
          {
            id: 'AddField',
            icon: iconsMap['ios-add']
          }
        ],
      },
    }
  }
});


export const goFieldCustomization = (currentField, createField) => Navigation.showModal({
  stack: {
    children: [{
      component: {
        name: 'CustomizeField',
        passProps: {
          currentField,
          createField
        },
        options: {
          topBar: {
            title: {
              text: currentField.fieldName
            },
            rightButtons: [
              {
                id: 'CloseCustomizeModal',
                icon: iconsMap['ios-close'],
              }
            ],
          },
        }
      }
    }]
  }
});