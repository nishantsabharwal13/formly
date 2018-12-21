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

class TitleField extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  state = {
    id: Math.round(new Date().getTime() * Math.random()),
    field: "title",
    label: "",
    description: "",
  }

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={[{ flex: 1, justifyContent: 'space-between' }]} >
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

        <SaveButton onPress={() => this.props.saveField(this.state)}/>
      </ScrollView>
    );
  }
}

TitleField.defaultProps = {
}

export default TitleField;
