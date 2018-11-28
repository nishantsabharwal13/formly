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
import { goFieldCustomization } from '~/helpers/navigation';
import Colors from '~/constants/colors.js';

import { iconsMap } from '~/helpers/app-icons';
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
});

class CreateForm extends React.Component {
  
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  state = {
    formArray: [
      { 
        key: "name", 
        label: "Name", 
        type: "default", 
        field: "input", 
        placeholder: "some fucking thing", 
        props: { 
          required: true 
        } 
      }
    ]
  }
  

  componentDidAppear() {
  }

  get fields() {
    return this.props.fields.map(item => item.fieldName);
  }

  navigationButtonPressed = ({ buttonId }) => {
    buttonId === 'AddField' ?
      this.ActionSheet.show() : null;
  }

  
  navigateToCustomize = (index) => {
    const field = this.props.fields[index];
    goFieldCustomization(field);
  }

  handleSaveField = () => {
    Navigation.pop(this.props.componentId);
  }

  render() {
    return (
      <View style={styles.container}>
        <DynamicForm
          title="Dynamic Form"
          model={this.state.formArray}
        />
        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={'Select a field to add'}
          options={[...this.fields, 'Cancel']}
          cancelButtonIndex={8}
          destructiveButtonIndex={7}
          onPress={index => index!=8 ? this.navigateToCustomize(index) : null}
        />
        <TouchableOpacity style={styles.btn} onPress={this.handleSaveField}>
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
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateForm);
