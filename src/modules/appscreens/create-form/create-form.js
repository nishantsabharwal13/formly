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
import ActionSheet from 'react-native-actionsheet'

import { Navigation } from 'react-native-navigation';
import { updateForm } from '~/actions/forms';

import { goFieldCustomization } from '~/helpers/navigation';
import Colors from '~/constants/colors.js';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DynamicForm from '~/modules/components/dynamic-form';

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
  fallbackText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

class CreateForm extends React.Component {
  
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  state = {
    formArray: [
      { 
        id: "name", 
        label: "Name", 
        type: "default", 
        field: "input",
        fieldId:"1",
        placeholder: "some fucking thing", 
        props: { 
          required: true 
        } 
      }
    ]
  }
  
  componentDidMount() {
    this.setState(this.props.newForm);
  }

  get fields() {
    return this.props.fields.map(item => item.fieldName);
  }

  navigationButtonPressed = ({ buttonId }) => {
    buttonId === 'AddField' ?
      this.ActionSheet.show() : null;
  }

  createField = data => {
    this.setState(prevState => ({
      formArray: [...prevState.formArray, data]
    }));
  }


  removeField = id => {
    const objIndex = this.state.formArray.findIndex((obj => obj.id === id));
      this.setState((prevState) => ({
        formArray: [...prevState.formArray.slice(0, objIndex), ...prevState.formArray.slice(objIndex + 1)]
      }),() => {
        console.log(this.state);
      })
  }

  navigateToCustomize = (index) => {
    const currentField = this.props.fields[index];
    goFieldCustomization(currentField, this.createField);
  }

  handleSaveForm = () => {
    const {formName, id} = this.props.newForm;
    const {formArray} = this.state;

    this.props.updateForm({ formArray, id});
    Navigation.pop(this.props.componentId);
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.formArray ? (
            <DynamicForm
              title="Dynamic Form"
              model={this.state.formArray}
              edit={false}
              removeField={this.removeField}
            />
          ): (
            <View style={styles.fallbackText}>
              <Text>No Fields Created Yet</Text>
            </View>
          )
        }
        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={'Select a field to add'}
          options={[...this.fields, 'Cancel']}
          cancelButtonIndex={8}
          onPress={index => index!=8 ? this.navigateToCustomize(index) : null}
        />
        <TouchableOpacity style={styles.btn} onPress={this.handleSaveForm}>
          <Text style={styles.btnText}>Save Form</Text>
        </TouchableOpacity>
      </View>
    )
  }
};

function mapStateToProps(state) {
  return {
    forms: state.forms,
    fields: state.fields
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateForm
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateForm);
