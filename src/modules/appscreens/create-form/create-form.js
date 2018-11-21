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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,

  },
  btn: {
    backgroundColor: Colors.primary,
    padding: 16,
    alignItems: 'center',
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
      Navigation.push(this.props.componentId, {
        component: {
          name: 'CreateField',
          options: {
            topBar: {
              title: {
                text: 'Create field',
              },
            },
          },
        },
      }) : null;
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