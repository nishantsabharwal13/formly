import React from 'react';

import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
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
  }
});

class DropDownField extends React.Component {

  constructor(props) {
    super(props)
  }

  state = {
    id: Math.round(new Date().getTime() * Math.random()),
    field: "dropdown",
    label: "",
    type: "default",
    options: [
      { id: Math.round(new Date().getTime() * Math.random()), label: '', value: 0 },
      { id: Math.round(new Date().getTime() * Math.random()), label: '', value: 1 },
    ],
  }

  addMore = index => {
    this.setState(prevState => ({
      options: [
        ...prevState.options,
        {
          id: Math.round(new Date().getTime() * Math.random()),
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
          <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'center' }}>
            <Ionicons name="ios-arrow-dropdown" color="grey" size={25}/>
            <TextInput
              placeholder="Enter Label of DropDown"
              style={[styles.inputField, { flex: 1, }]}
              defaultValue={item.label}
              onChangeText={(label) => this.onChangeOption(item.id, label)}
            />
            {
              this.state.options.length >= 3 ? (
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
      <ScrollView style={styles.container} contentContainerStyle={[{ flex: 1, justifyContent: 'space-between' }]} >
        <View style={styles.sections}>
          <Text>Label</Text>
          <TextInput
            placeholder="Enter Label of Drop Down"
            style={styles.inputField}
            onchange
            onChangeText={(label) => this.setState({ label })}
          />
        </View>
        <View style={styles.sections}>
          <Text>Drop Down Options</Text>
          {optionsLayout()}
        </View>
        <TouchableOpacity
          style={styles.addMore} onPress={() => this.addMore(this.state.options.length)}>
          <Text style={styles.addMoreText} t>+ Add Option</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => this.props.saveField(this.state)}>
          <Text style={styles.btnText}>Save Field</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

DropDownField.defaultProps = {
}

export default DropDownField;
