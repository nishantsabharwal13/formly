import React from 'react';

import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';

import { Navigation } from 'react-native-navigation';
import ActionSheet from 'react-native-actionsheet';
import Colors from '~/constants/colors.js';

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

class TitleField extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  state = {
    id: Math.random(),
    field: "title",
    label: "",
    description: "",
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.sections}>
          <Text>Title/Heading</Text>
          <TextInput
            placeholder="Enter Title"
            style={styles.inputField}
            value={this.state.label}
            onChangeText={(label) => this.setState({ label })}
          />
        </View>

        <View style={styles.sections}>
          <Text>Description</Text>
          <TextInput
            placeholder="Enter description"
            style={styles.inputField}
            value={this.state.description}
            onChangeText={(description) => this.setState({ description })}
          />
        </View>

        <TouchableOpacity style={styles.btn} onPress={() => this.props.saveField(this.state)}>
          <Text style={styles.btnText}>Save Field</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

TitleField.defaultProps = {
}

export default TitleField;
