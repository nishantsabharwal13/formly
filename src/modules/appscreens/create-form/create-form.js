import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  AsyncStorage,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import DynamicForm from '~/modules/components/dynamic-form';
import { Navigation } from 'react-native-navigation';
import Colors from '~/constants/colors.js';

import { iconsMap } from '~/helpers/app-icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,

  },
  btn: {
    backgroundColor: Colors.primary,
    padding: 16,
    alignItems: 'center',
    marginTop: 'auto',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

class CreateForm extends React.Component {
  
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  navigationButtonPressed = ({ buttonId }) => {
    buttonId === 'AddField' ?
      Navigation.showModal({  
      stack: {
        children: [{
          component: {
            name: 'AddField',
            passProps: {
              text: ''
            },
            options: {
              topBar: {
                title: {
                  text: 'Select Field'
                },
                rightButtons: [
                  {
                    id: 'CloseModal',
                    icon: iconsMap['ios-close'],
                  }
                ],
              },
            }
          }
        }]
      }
    }): null;
  }
  handleSaveField = () => {
    
  }

  render() {
    return (
      <View style={styles.container}>
        <DynamicForm
          title="Dynamic Form "
          model={
            [
              {key:"name",label:"Name",type: "default", field: "input",placeholder: "some fucking thing",props: {required:true}}
            ]
          }
        />
        <TouchableOpacity style={styles.btn} onPress={this.handleSaveField}>
          <Text style={styles.btnText}>Save Form</Text>
        </TouchableOpacity>
      </View>
    )
  }
};

export default CreateForm;