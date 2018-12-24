import React from 'react';

import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Switch,
  ScrollView,
} from 'react-native';
import Colors from '~/constants/colors';
import { Navigation } from 'react-native-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
    justifyContent: 'center'
  },
  inputField: {
    height: 50,
    paddingLeft: 10,
    paddingBottom: 0,
  },
  addMore: {
    alignItems: 'center',
  },
  addMoreText: {
    color: Colors.topBar,
    padding: 20
  },
  radioButtonOuter: {
    width: 20,
    height: 20,
    borderWidth:1,
    borderRadius:20,
    backgroundColor: 'grey', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonInner: {
    width: 15,
    height: 15,
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

class RadioButtonsField extends React.Component {

  constructor(props) {
    super(props)
  }

  state = {
    id: Math.round(new Date().getTime() * Math.random()),
    field: "radiobuttons",
    label: "",
    type: "default",
    options: [
      { id: Math.round(new Date().getTime() * Math.random()), label: '', value: 0 },
      { id: Math.round(new Date().getTime() * Math.random()), label: '', value: 1 },
    ],
    alignment: false,
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
            placeholder="Enter Label of Selective List"
            style={styles.inputField}
            onchange
            onChangeText={(label) => this.setState({ label })}
          />
        </View>
        <View style={styles.sections}>
          <Text>Selective List Options</Text>
          {optionsLayout()}
        </View>
        <TouchableOpacity
          style={styles.addMore} onPress={() => this.addMore(this.state.options.length)}>
          <Text style={styles.addMoreText} t>+ Add Option</Text>
        </TouchableOpacity>
        <View style={{flexDirection:'row'}}>
          <View>
            <Text>Alignment: Veritical</Text>
            <Text style={{color:'#ccc'}}>Set Aligment of Selective List</Text>
          </View>
          <Switch 
            style={styles.switch}
            value={this.state.alignment}
            onValueChange={(alignment) => this.setState({alignment : !this.state.alignment})}
          />
        </View>
        <SaveButton onPress={() => this.props.saveField(this.state)}/>
      </ScrollView>
    );
  }
}

RadioButtonsField.defaultProps = {
}

export default RadioButtonsField;
