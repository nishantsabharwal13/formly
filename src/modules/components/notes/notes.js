import React from 'react';

import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

import { Navigation } from 'react-native-navigation';
import ActionSheet from 'react-native-actionsheet';
import Colors from '~/constants/colors.js';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  sections: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  inputField: {
    height: 50,
    paddingBottom: 0,
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

class NotesField extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  state = {
    id: Math.random(),
    field: "notes",
    label: "",
    description: "",
  }

  render() {
    return (
      <View style={styles.container}  >
        <View style={styles.sections}>
          <Text>Enter Label</Text>
          <TextInput
            placeholder="Enter label for notes"
            style={styles.inputField}
            value={this.state.label}
            onChangeText={(label) => this.setState({ label })}
          />
        </View>

        <View style={{ flex: 1, borderWidth: 1, marginTop: 20, borderColor: 'grey', height: 150 }}>
          <SketchCanvas
            style={{ flex: 1 }}
            strokeColor={Colors.primary}
            strokeWidth={4}
          />
        </View>
        <View style={styles.sections}>
        </View>
        <TouchableOpacity style={styles.btn} onPress={() => this.props.saveField(this.state)}>
          <Text style={styles.btnText}>Save Field</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

NotesField.defaultProps = {
}

export default NotesField;
