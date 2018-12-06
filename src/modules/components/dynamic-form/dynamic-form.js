import React from 'react';

import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CheckBox from 'react-native-check-box';
import RadioForm from 'react-native-simple-radio-button';
import { Dropdown } from 'react-native-material-dropdown';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import ImagePicker from 'react-native-image-picker';

import Colors from '~/constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sections: {
    flex:1,
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  icons: {
    position:'absolute',
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

class DynamicForm extends React.Component {

  componentDidMount() {

  }

  state = {
    loading: true,
  }
  
  handleChoosePhoto = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log(response)
    })
  }

  renderForm = () => {
    let {edit,model} = this.props;

    const editField = item => !edit ? (
      <View style={styles.icons}>
        {/* <TouchableOpacity onPress={() => this.props.editField(item)}>
          <MaterialIcons 
            style={[styles.iconEdit, { paddingRight: 10 }]} 
            name="edit" size={25} color='grey' 
          />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => this.props.removeField(item.id)}>
          <MaterialIcons
            style={styles.iconDelete} 
            name="delete-forever" size={25} color='grey' 
          />
        </TouchableOpacity>
      </View>
    ) : null;

    let _renderItem = ({ item }) => {
      switch (item.field) {
        case 'input':
          return (
            <View style={styles.sections}>
              <Text style="styles">{item.label}: </Text>
              <TextInput
                keyboardType={`${item.type}`}
                style={{ height: 50 }}
                placeholder={item.placeholder}
                editable={edit} 
                selectTextOnFocus={edit} 
              />
              {editField(item)}
            </View>
          );
        case 'checkbox':
          return (
            <View style={styles.sections}>
              <Text style="styles">{item.label}: </Text>
              <FlatList
                data={item.options}
                renderItem={({ item }) => (
                  <View style={{ flexDirection: 'row' }}>
                    <CheckBox
                      style={{ paddingVertical: 10, paddingRight: 10 }}
                      disabled={edit}
                      isChecked={false}
                      onClick={() => { }}
                    />
                    <TextInput
                      placeholder="Enter Label of Field"
                      style={[styles.inputField, { flex: 1, }]}
                      value={item.label}
                      editable={edit}
                      selectTextOnFocus={edit} 
                    />
                  </View>
                )}
                keyExtractor={(item, key) => `${key}`}
              />  
              {editField(item)}
            </View>
          );
        case 'dropdown':
          return (
            <View style={styles.sections}>
              <Text style="styles">{item.label}: </Text>
              <Dropdown
                label={item.label}
                data={item.options}
              />
              {editField(item)}
            </View>
          );
        case 'radiobuttons':
          return (
            <View style={styles.sections}>
              <Text style="styles">{item.label}: </Text>
              <View style={{margin:10}}></View>
              <RadioForm
                radio_props={item.options}
                initial={0}
                onPress={(value) => {}}
                buttonColor={'grey'}
                formHorizontal={item.alignment}
              />
              {editField(item)}
            </View>
          );
        case 'datepicker':
          return (
            <View style={styles.sections}>
              <Text style="styles">{item.label}: </Text>
              <View style={{margin:10}}></View>
              <TouchableOpacity 
                onPress={() => {
                  let newState = { ...this.state };
                  newState[item.id] = true;
                  this.setState(newState)

                }}
                style={{
                  padding: 20, alignItems: 'center',
                  borderWidth: 1,
                  borderColor: 'grey',
                  borderRadius: 8
                }} 
              >
                <Text style={{ color: 'grey' }}>
                  {item.currentDate || `DatePicker will show on Click`} </Text>
              </TouchableOpacity>
              <DateTimePicker
                isVisible={this.state[item.id]}
                
                onConfirm={() =>{
                  this.setState({ [item.id]: false }, () => { console.log(this.state) })
                }}
                onCancel={() => this.setState({[item.id]: false})}
              />
              {editField(item)}
            </View>
          );
        case 'notes':
          return (
            <View style={[styles.sections, {borderBottomWidth: 0}]}>
              <Text style="styles">{item.label}: </Text>
              <View style={{ flex: 1, borderWidth: 1,marginTop:20, borderColor: 'grey', height: 150 }}>
                <SketchCanvas
                  style={{flex:1}}
                  strokeColor={Colors.primary}
                  strokeWidth={4}
                />
              </View>
              {editField(item)}
            </View>
          );
        case 'title':
          return (
            <View style={[styles.sections, { alignItems: 'center', borderBottomWidth: 0}]}>
              <Text style={{ fontSize: 25 }}>{item.label}</Text>
              <Text style={{color:'grey',paddingVertical:10}}>{item.description}</Text>
              {editField(item)}
            </View>
          );
        case 'imagepicker':
          return (
            <View style={styles.sections}>
              <Text style="styles">{item.label}: </Text>
              <View style={[styles.sections, { borderBottomWidth: 0, }]}>
                <TouchableOpacity
                  onPress={this.handleChoosePhoto}
                >
                <Image
                  style={{ width: 200,height: 200}}
                  source={require('assets/images/default.jpg')}
                />
                </TouchableOpacity>
              </View>
              {editField(item)}
            </View>
          );
      }
    };

    let _keyExtractor = (item, key) => `${key}`;
    return (
      <FlatList
        data={model}
        renderItem={_renderItem}
        keyExtractor={_keyExtractor}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderForm()}
      </View>
    )
  }
}

DynamicForm.defaultProps = {
}

export default DynamicForm;
