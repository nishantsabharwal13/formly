import React from 'react';

import {
View,
Text,
Button,
StyleSheet,
TouchableOpacity,
TextInput
} from 'react-native';
 
import {Navigation} from 'react-native-navigation';
import ActionSheet from 'react-native-actionsheet';
import Colors from '~/constants/colors.js';

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
  picker: { 
    height: 50,
    paddingTop: 16,
    paddingBottom: 16,
    color: 'grey',
    opacity:0.7
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

class TextField extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {
  }
 
  state = {
    id: Math.random(),
    field: "input",
    label: "",
    type: "default",
    placeholder: "",
  }

  handleType = (index) => {
    const fieldType = this.props.currentField.types[index]
    this.setState({ type: fieldType });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sections}>
          <Text>Label</Text>
          <TextInput
            placeholder="Enter Label of Field"
            style={styles.inputField}
            onchange
            onChangeText={(label) => this.setState({ label })}
            />
        </View>

        <View style={styles.sections}>
          <Text>Placeholder</Text>
          <TextInput
            placeholder="Enter Placeholder"
            style={styles.inputField}
            onChangeText={(placeholder) => this.setState({ placeholder })}
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
            onPress={(index) => this.handleType(index)}
          />
        </View>
        <TouchableOpacity style={styles.btn} onPress={() => this.props.saveField(this.state)}>
          <Text style={styles.btnText}>Save Field</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

TextField.defaultProps = {
}

export default TextField;
