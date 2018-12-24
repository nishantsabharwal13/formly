import React from 'react';

import {
View,
Text,
Button,
StyleSheet,
TouchableOpacity,
TextInput,
FlatList,
ScrollView
} from 'react-native';
import Colors from '~/constants/colors';
import {Navigation} from 'react-native-navigation';
import CheckBox from 'react-native-check-box';
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
  },
  inputField: {
    height: 50,
    paddingLeft:10,
    paddingBottom: 0,
  },
  addMore: {
    alignItems: 'center',     
  },
  addMoreText: {
    color: Colors.topBar,
    padding:20
  }
});

class CheckBoxField extends React.Component {

  constructor(props){
  super(props)
  }
  
  state = {
    id: Math.round(new Date().getTime() * Math.random()),
    field: "checkbox",
    label: "",
    type: "default",
    options: [
      { id: Math.round(new Date().getTime() * Math.random()), label: "", value: false },
    ]
  }

  addMore = () => {
    this.setState(prevState => ({
      options:[
        ...prevState.options, 
        {
          id: Math.round(new Date().getTime() * Math.random()),
          label: "",
          value: false
        }
      ]
    }));
  };

  onChangeOption = (id,label) => {
    const objIndex = this.state.options.findIndex((obj => obj.id === id));
    let newState = {...this.state};

    newState.options[objIndex].label = label;
    this.setState(newState);
  }

  onRemove = id => {
    const objIndex = this.state.options.findIndex((obj => obj.id === id));
    if(this.state.options.length >=2) {
      this.setState((prevState) => ({
        options: [...prevState.options.slice(0, objIndex), ...prevState.options.slice(objIndex + 1)]
      }))
    }
  }

  render() {
    const {options} = this.state;

    const optionsLayout = () => (
        <FlatList
          data={options}
          renderItem={({ item }) => (                
          <View style={{ flexDirection: 'row' }}>
            <CheckBox
              style={{ paddingVertical: 10, paddingRight: 10 }}
              disabled={true}
              isChecked={false}
              onClick={() => {}}
            />
            <TextInput
              placeholder="Enter Label of Field"
              style={[styles.inputField, { flex: 1,}]}
              defaultValue={item.label}
              onChangeText={(label) => this.onChangeOption(item.id,label)}
            />
            {
              this.state.options.length >=2 ? (
                <TouchableOpacity onPress={() => this.onRemove(item.id)}>
                  <Ionicons 
                    name="ios-close" size={25} color="grey"
                  />
                </TouchableOpacity>
              ) : null }
          </View>
          )}
          keyExtractor={(item,key) => `${key}`}
        />
    );

    return (
      <ScrollView style={styles.container} contentContainerStyle={[{ flex: 1, justifyContent: 'space-between' }]} >
        <View style={styles.sections}>
          <Text>Label</Text>
          <TextInput
            placeholder="Enter Label of CheckBox"
            style={styles.inputField}
            onchange
            onChangeText={(label) => this.setState({ label })}
          />
        </View>
        <View style={styles.sections}>
          <Text>CheckBox Options</Text>
          {optionsLayout()}
        </View>
          <TouchableOpacity
            style={styles.addMore} onPress={this.addMore}>
            <Text style={styles.addMoreText}t>+ Add Option</Text>
          </TouchableOpacity>
        <SaveButton onPress={() => this.props.saveField(this.state)}/>
      </ScrollView>
    );
  }
}

CheckBoxField.defaultProps = {
}

export default CheckBoxField;
