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

import DynamicForm from '~/modules/components/dynamic-form';
import { Navigation } from 'react-native-navigation';
import { goFieldCustomization } from '~/helpers/navigation';
import Colors from '~/constants/colors.js';

import { iconsMap } from '~/helpers/app-icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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

  get fields() {
    return this.props.fields.map(item => item.fieldName);
  }

  navigationButtonPressed = ({ buttonId }) => {
    buttonId === 'AddField' ?
      this.ActionSheet.show() : null;
  }

  handleSaveField = () => {
    
  }

  navigateToCustomize = (index) => {
    const field = this.props.fields[index];
    goFieldCustomization(field);
  }

  render() {
    return (
      <View style={styles.container}>
        <DynamicForm
          title="Dynamic Form"
          model={
            [
              {key:"name",label:"Name",type: "default", field: "input",placeholder: "some fucking thing",props: {required:true}}
            ]
          }
        />
        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={'Select a field to add'}
          options={[...this.fields, 'Cancel']}
          cancelButtonIndex={6}
          destructiveButtonIndex={6}
          onPress={index => index!=6 ? this.navigateToCustomize(index) : null}
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
    fields: state.fields
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateForm);
