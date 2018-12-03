import React from 'react';

import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Switch
} from 'react-native';
import Colors from '~/constants/colors';
import { Navigation } from 'react-native-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
    justifyContent: 'center'
  },
  inputField: {
    height: 50,
    paddingLeft: 10,
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
  addMore: {
    alignItems: 'center',
  },
  addMoreText: {
    color: Colors.primary,
    padding: 20
  },
  radioButtonOuter: {
    width: 30,
    height: 30,
    borderWidth:1,
    borderRadius:20,
    backgroundColor: 'grey', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonInner: {
    width: 25,
    height: 25,
    borderWidth:1,
    borderRadius:20,
    backgroundColor: '#fff', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  switch: {
    marginLeft: 'auto',
    
  }
});

class CheckBoxField extends React.Component {

  constructor(props) {
    super(props)
  }

  state = {
    id: Math.random(),
    field: "radiobuttons",
    label: "",
    type: "default",
    options: [
      { id: Math.random(), label: '', value: 0 },
      { id: Math.random(), label: '', value: 1 },
    ],
    alignment: false,
  }

  checkBoxChange = () => {
    this.setState(prevState => ({
      check: !prevState.check
    }))
  }

  addMore = index => {
    this.setState(prevState => ({
      options: [
        ...prevState.options,
        {
          id: Math.random(),
          label: "",
          value: index,
        }
      ]
    }));
    console.log(this.state)
  };

  onChangeOption = (id, label) => {
    const objIndex = this.state.options.findIndex((obj => obj.id === id));
    let newState = { ...this.state };

    newState.options[objIndex].label = label;
    this.setState(newState);
  }

  onRemove = id => {
    const objIndex = this.state.options.findIndex((obj => obj.id === id));
    if (this.state.options.length >= 3) {
      this.setState((prevState) => ({
        options: [...prevState.options.slice(0, objIndex), ...prevState.options.slice(objIndex + 1)]
      }))
    }
  }

  render() {
    const { options } = this.state;

    const optionsLayout = () => (
      <FlatList
        data={options}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems:'center' }}>
            <View style={styles.radioButtonOuter}>
              <View style={styles.radioButtonInner}></View>
            </View>
            <TextInput
              placeholder="Enter Label of Option"
              style={[styles.inputField, { flex: 1, }]}
              defaultValue={item.label}
              onChangeText={(label) => this.onChangeOption(item.id, label)}
            />
            {
              this.state.options.length >= 2 ? (
                <TouchableOpacity onPress={() => this.onRemove(item.id)}>
                  <Ionicons
                    name="ios-close" size={25} color="grey"
                  />
                </TouchableOpacity>
              ) : null}
          </View>
        )}
        keyExtractor={(item, key) => `${key}`}
      />
    );

    return (
      <View style={styles.container}>
        <View style={styles.sections}>
          <Text>Label</Text>
          <TextInput
            placeholder="Enter Label of Radio Buttons"
            style={styles.inputField}
            onchange
            onChangeText={(label) => this.setState({ label })}
          />
        </View>
        <View style={styles.sections}>
          <Text>Radio Button Options</Text>
          {optionsLayout()}
        </View>
        <TouchableOpacity
          style={styles.addMore} onPress={() => this.addMore(this.state.options.length)}>
          <Text style={styles.addMoreText} t>+ Add Option</Text>
        </TouchableOpacity>
        <View style={{flexDirection:'row'}}>
          <View>
            <Text>Alignment: Horizontal</Text>
            <Text style={{color:'#ccc'}}>Set Aligment of radio buttons</Text>
          </View>
          <Switch 
            style={styles.switch}
            value={this.state.alignment}
            onValueChange={(alignment) => this.setState({alignment : !this.state.alignment})}
          />
        </View>
        <TouchableOpacity style={styles.btn} onPress={() => this.props.saveField(this.state)}>
          <Text style={styles.btnText}>Save Field</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

CheckBoxField.defaultProps = {
}

export default CheckBoxField;
