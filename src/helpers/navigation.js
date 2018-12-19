import { Navigation } from 'react-native-navigation';
import { iconsMap } from './app-icons';
import Colors from '~/constants/colors';

Navigation.setDefaultOptions({
  layout: {
    backgroundColor: Colors.lightGrey,
  },
  topBar: {
    headerTintColor:Colors.primary,
    backButton: { // android
      color: Colors.primary,
    },
    buttonColor: Colors.primary, // iOS
    title: {
      color: Colors.primary,
    },
    rightButtons:  {
    color: Colors.primary
    },
    leftButtons: {
      color: Colors.primary
    },
  },
});

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
                    sideMenu: {
                    left: {
                      enabled: false,
                      visible: false
                    }
                  },
                  buttonColor: 'red',
                  topBar: {
                    title: {
                      text: 'Forms',
                    },
                    rightButtons: [
                      {
                        id: 'CreateForm',
                        icon: iconsMap['ios-add'],
                      }
                    ],
                    leftButtons: [
                      {
                        id: 'SideMenu',
                        icon: iconsMap['ios-menu'],
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
      buttonColor: 'red',
      topBar: {
        buttonColor: 'red',
        title: {
          text: newForm.formName
        },
        rightButtons: [
          {
            id: 'AddField',
            icon: iconsMap['ios-add'],
          }
        ],
      },
    }
  }
});

export const goFieldCustomization = (currentField={}, createField={}, editField={}) => Navigation.showModal({
  stack: {
    children: [{
      component: {
        name: 'CustomizeField',
        passProps: {
          currentField,
          createField,
          editField
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

export const goRecordsPage = (id, currentForm) => Navigation.push(id, {
  component: {
    id: 'RecordList',
    name: 'RecordList',
    passProps: {
      currentForm,
    },
    options: {
      topBar: {
        title: {
          text: currentForm.formName
        },
        rightButtons: [
          {
            id: 'AddRecord',
            icon: iconsMap['ios-add'],
          },
          {
            id:'EditForm',
            icon: iconsMap['edit-2'],
          }
        ],
      },
    }
  }
});

export const goCreateRecordPage = (id, currentForm,currentRecord) => Navigation.push(id, {
  component: {
    id: 'CreateRecord',
    name: 'CreateRecord',
    passProps: {
      currentForm,
      currentRecord
    },
    options: {
      topBar: {
        title: {
          text: currentRecord.recordName
        },
      },
    }
  }
});

export const goOpenRecord = (id, currentForm, currentRecord) => Navigation.push(id, {
  component: {
    id: 'OpenRecord',
    name: 'OpenRecord',
    passProps: {
      currentForm,
      currentRecord
    },
    options: {
      topBar: {
        title: {
          text: currentRecord.recordName
        },
        rightButtons: [
          {
            id: 'ShareRecord',
            icon: iconsMap['ios-share'],
          },
          {
            id: 'EditRecord',
            icon: iconsMap['edit-2'],
          },
        ],
      },
    }
  }
});

