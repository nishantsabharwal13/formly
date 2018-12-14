import React from 'react';

import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
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
  defaultImage: {
    width:200,
    height:200

  }
});

class ImagePicker extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  state = {
    id: Math.round(new Date().getTime() * Math.random()),
    field: "imagepicker",
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
        <View style={[styles.sections,{ borderBottomWidth: 0,}]}>
          <Image
            style={styles.defaultImage}
            source={require('assets/images/default.jpg')}
          />
        </View>

        <TouchableOpacity style={styles.btn} onPress={() => this.props.saveField(this.state)}>
          <Text style={styles.btnText}>Save Field</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

ImagePicker.defaultProps = {
}

export default ImagePicker;
