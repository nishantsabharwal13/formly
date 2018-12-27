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
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
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
  strokeColorButton: {
    marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15,
  },
  strokeWidthButton: {
    marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15,
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#39579A'
  },
  functionButton: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin:10,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: Colors.primary,
    shadowOffset: { height: 0, width: 0 },
    justifyContent: 'space-evenly',
    alignItems: 'center'
  }
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
          <RNSketchCanvas
            containerStyle={{ backgroundColor: '#fff', flex: 1 }}
            canvasStyle={{ backgroundColor: '#fff', flex: 1 }}
            defaultStrokeIndex={0}
            defaultStrokeWidth={5}
            clearComponent={<View style={styles.functionButton}><Text style={{ color: 'black' }}>Clear</Text></View>}
            eraseComponent={<View style={styles.functionButton}><Text style={{ color: 'black' }}>Eraser</Text></View>}
            onStrokeStart={() => this.setState({ scrollEnabled: false },() => console.log('start'))}
            onStrokeEnd={() => this.setState({ scrollEnabled: true }, () => console.log('end'))}
            strokeComponent={color => (
              <View style={[{ backgroundColor: color }, styles.strokeColorButton]} />
            )}
            strokeSelectedComponent={(color, index, changed) => {
              return (
                <View style={[{ backgroundColor: color, borderWidth: 2 }, styles.strokeColorButton]} />
              )
            }}
            strokeWidthComponent={(w) => {
              return (<View style={styles.strokeWidthButton}>
                <View style={{
                  backgroundColor: 'white', marginHorizontal: 2.5,
                  width: Math.sqrt(w / 3) * 10, height: Math.sqrt(w / 3) * 10, borderRadius: Math.sqrt(w / 3) * 10 / 2
                }} />
              </View>
              )
            }}
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
