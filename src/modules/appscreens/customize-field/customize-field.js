import React from 'react';

import {
View,
Text,
Button,
StyleSheet,
TouchableOpacity,
TextInput,
Picker
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';

import {Navigation} from 'react-native-navigation';
import Colors from '~/constants/colors.js';

import { iconsMap } from '~/helpers/app-icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:10,
  },
  sections: {
    marginTop:10,
    marginBottom:10,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  inputField: {
    height: 50,
    paddingBottom:0,
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
  picker: { 
    height: 50,
    paddingTop: 16,
    paddingBottom: 16,
    color: 'grey',
    opacity:0.7
  }
})
 
class CustomizeField extends React.Component {
  constructor(props){
   super(props);
    Navigation.events().bindComponent(this);
  }

  async componentDidMount() {

  }

  navigationButtonPressed = ({ buttonId }) => {
    buttonId === 'CloseCustomizeModal' ?
      Navigation.dismissModal(this.props.componentId)
      : null;
  };

  handleType = (index) => {
    const fieldType = this.props.currentField.types[index]
    this.setState({ type: fieldType });
  };

  handleSaveField = () => {
    Navigation.dismissAllModals();

  }

 
  state = {
    type: 'default'
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.sections}>
          <Text>Label</Text>
          <TextInput
            placeholder="Enter Label of Field"
            style={styles.inputField}
            />
        </View>

        <View style={styles.sections}>
          <Text>Placeholder</Text>
          <TextInput
            placeholder="Enter Placeholder"
            style={styles.inputField}
            />
        </View>

        <View style={styles.sections}>
          <Text>Select Type</Text>
          <TouchableOpacity 
            onPress={() => this.ActionSheet.show()}
            >
            <Text style={styles.picker}>{this.state.type || 'Select Type of Field'}</Text>
          </TouchableOpacity>
          <ActionSheet
            ref={o => this.ActionSheet = o}
            title={'Select a type of field'}
            options={[...this.props.currentField.types, 'Cancel']}
            cancelButtonIndex={3}
            destructiveButtonIndex={3}
            onPress={(index) => this.handleType(index)}
          />
        </View>

        <View styles={styles.sections}>

        </View>

        <TouchableOpacity style={styles.btn} onPress={this.handleSaveField}>
          <Text style={styles.btnText}>Save Field</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    fields: state.fields
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomizeField);
