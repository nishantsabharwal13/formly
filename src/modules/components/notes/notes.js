import React from 'react';

import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';

import { Navigation } from 'react-native-navigation';
import ActionSheet from 'react-native-actionsheet';
import Colors from '~/constants/colors.js';
import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';
import SaveButton from '~/modules/global/save-button';

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
});

class NotesField extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  state = {
    id: Math.round(new Date().getTime() * Math.random()),
    field: "notes",
    label: "",
    description: "",
    scrollEnabled:true,
    behavior: 'position',
  }

  render() {
    return (
      <ScrollView style={styles.container} scrollEnabled={this.state.scrollEnabled} contentContainerStyle={{ flex: 1 }}>
        <View style={styles.sections}>
          <Text>Enter Label</Text>
            <TextInput
              placeholder="Enter label for notes"
              style={styles.inputField}
              value={this.state.label}
              onChangeText={(label) => this.setState({ label })}
            />
        </View>

        <View style={{ flex: 1, height: 400, borderWidth: 1, marginTop: 20, borderColor: 'grey', flexDirection: 'row' }}>
          <SketchCanvas
            style={{ flex: 1 }}
            strokeColor={'#333'}
            strokeWidth={5}
          />
        </View>
        <View style={styles.sections}>
        </View>
        <SaveButton onPress={() => this.props.saveField(this.state)}/>
      </ScrollView>
    );
  }
}

NotesField.defaultProps = {
}

export default NotesField;
