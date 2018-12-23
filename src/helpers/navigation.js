import { Navigation } from 'react-native-navigation';
import { iconsMap } from './app-icons';
import Colors from '../constants/colors';
import {Platform} from 'react-native';

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

export const goHome = () => {
  
  Navigation.setDefaultOptions({
    layout: {
      backgroundColor: Colors.lightGrey,
      topMargin: Navigation.constants().statusBarHeight,
    },
    topBar: {
      buttonColor: '#fff', // iOS
      backButton: {
        color: Colors.primary,
        visible: true
      },
      elevation:0,
      title: {
        color: Colors.primary,
      },
      subtitle: {
        color: Colors.primary,
      },
      background: {
        color: Colors.topBar
      }
    },
  });

  Navigation.setRoot({
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
                    topBar: {
                      noBorder: true,
                      title: {
                        text: 'Form Pro',
                      },
                      rightButtons: [
                        {
                          id: 'CreateForm',
                          icon: iconsMap['ios-add'],
                          color: Colors.primary
                        }
                      ],
                      leftButtons: [
                        {
                          id: 'SideMenu',
                          icon: iconsMap['ios-menu'],
                          color: Colors.primary
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
}

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
        elevation: 5,
        rightButtons: [
          {
            id: 'AddField',
            icon: iconsMap['ios-add'],
            color: Colors.primary
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
            elevation: 5,
            rightButtons: [
              {
                id: 'CloseCustomizeModal',
                icon: iconsMap['ios-close'],
                color: Colors.primary
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
        noBorder: true,
        title: {
          text: currentForm.formName
        },
        rightButtons: [
          {
            id: 'AddRecord',
            icon: iconsMap['ios-add'],
            color: Colors.primary
          },
          {
            id:'EditForm',
            icon: iconsMap['edit-2'],
            color: Colors.primary
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
        elevation: 5,
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
        elevation: 2,
        rightButtons: [
          {
            id: 'ShareRecord',
            icon: Platform.OS === 'ios' ? iconsMap['ios-share'] : iconsMap['share-2'],
            color: Colors.primary
          },
          {
            id: 'EditRecord',
            icon: iconsMap['edit-2'],
            color: Colors.primary
          },
        ],
      },
    }
  }
});

