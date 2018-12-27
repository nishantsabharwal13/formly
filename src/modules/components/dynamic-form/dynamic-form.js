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
  Platform,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import CheckBox from 'react-native-check-box';
import { SegmentedControls } from 'react-native-radio-buttons'
import { Dropdown } from 'react-native-material-dropdown';
import DateTimePicker from 'react-native-modal-datetime-picker';
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import ImagePicker from 'react-native-image-picker';
import formatDate from '~/helpers/date-format';

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
    borderColor: 'rgba(0,0,0,0.2)',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  icons: {
    position:'absolute',
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
    margin: 10,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: Colors.primary,
    shadowOffset: { height: 0, width: 0 },
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  notes: { 
    flex: 1, 
    height: 400, 
    borderWidth: 1, 
    marginTop: 20, 
    borderColor: 'grey', 
    flexDirection: 'row',
    backgroundColor: '#fff',
  }
});

class DynamicForm extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    index: 0,
    edit: this.props.edit,
    scrollEnabled: true
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log({ nextProps, prevState})
    if(nextProps.edit !== prevState.edit) {
      return {
        ...prevState,
        index: prevState.index + 1,
        edit: nextProps.edit
      }
    } else {
      return {
        ...prevState
      }
    }
  }

  componentDidMount() {
    if (this.props.data && Object.keys(this.props.data).length) {
      this.setState({
        ...this.props.data
      });
    };
  }

  onChange = (value='', key='', type = 'single') => {
    switch(type) {
      case 'single': 
        this.setState({
          [key]: value,
          index: this.state.index + 1
        });
        break;
      case 'multiple': 
        let found = this.state[key];

        if (found) {
          this.setState({
            [key]: !found
          });
        } else {
          this.setState({ [key]: value });
        }
        break;
      case 'date': 
        this.setState({
          [key]: value,
          [`date${key}`]: false,
        });
        break;
      case 'image':
        let options = {
          title: 'Select Image',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.showImagePicker(options, response => {
          this.setState({
            [key]: response.uri,
            index: this.state.index+1
          },() => {
            this.props.updateRecord(this.state);
          });
        });
        break;
    }

    this.setState(prevState => ({
      index: prevState.index + 1
    }),() => {
      this.props.updateRecord(this.state);
    });
  }

  renderForm = () => {
    const { editForm, model} = this.props;
    const {edit} = this.state;
    
    const editField = item => editForm ? (
      <View style={styles.icons}>
        {/* <TouchableOpacity onPress={() => this.props.editField(item)}>
          <MaterialIcons 
            style={[styles.iconEdit, { paddingRight: 10 }]} 
            name="edit" size={25} color='grey' 
          />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => this.props.removeField(item.id)}>
          <Feather
            color={Colors.lightText}
            name="trash"
            size={20}
          />
        </TouchableOpacity>
      </View>
    ) : null;

    let _renderItem = ({ item }) => {
      switch (item.field) {
        case 'input':
          return (
            <View style={styles.sections}>
              <Text style={styles.label}>{item.label}: </Text>
              <TextInput
                keyboardType={`${item.type}`}
                style={{ height: 50 }}
                placeholder={item.placeholder}
                editable={edit}
                value={this.state[item.id]}
                selectTextOnFocus={edit} 
                onChangeText={value => { this.onChange(value, item.id) }}
              />
              {editField(item)}
            </View>
          );
        case 'checkbox':
          return (
            <View style={styles.sections}>
              <Text style={styles.label}>{item.label}: </Text>
              <FlatList
                data={item.options}
                extraData={this.state.index}
                renderItem={({ item }) => (
                  <View style={{ flexDirection: 'row' }}>
                    <CheckBox
                      style={{ paddingVertical: 10, paddingRight: 10 }}
                      disabled={!edit}
                      onClick={() => this.onChange(true, item.id, "multiple")}
                      isChecked={this.state[item.id]}
                    />
                    <TextInput
                      placeholder="Enter Label of Field"
                      style={[styles.inputField, { flex: 1, }]}
                      value={item.label}
                      editable={!edit}
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
            <View style={[styles.sections, {borderBottomWidth: 0}]}>
              <Text style={styles.label}>{item.label}: </Text>
              <Dropdown
                label={item.label}
                data={item.options}
                value={(this.state[item.id] && item.options[this.state[item.id]].label)}
                onChangeText={!edit ? () => { } : (value,index,data) => this.onChange(value,item.id)  }
              />
              {editField(item)}
            </View>
          );
        case 'radiobuttons':

          return (
            <View style={styles.sections}>
              <Text style={styles.label}>{item.label}</Text>
              <View style={{margin:10}}></View>
              <SegmentedControls
                options={item.options.map(i => i.label)}
                style={{flexDirection: 'column'}}
                onSelection={!edit ? () => {} : value => this.onChange(value, item.id) }
                selectedOption={this.state[item.id] || 0}
                containerStyle={{ flexDirection: item.alignment ? 'column' : 'row', pointerEvents: 'none'}}
                containerStyle={{ flexDirection: item.alignment ? 'column' : 'row', pointerEvents: 'none'}}
              />
              {editField(item)}
            </View>
          );
        case 'datepicker':
          return (
            <View style={styles.sections}>
              <Text style={styles.label}>{item.label}: </Text>
              <View style={{margin:10}}></View>
              <TouchableOpacity 
                onPress={() => this.setState({ [`date${item.id}`]: true,index: this.state.index+1 })}
                disabled={!edit}
                style={{
                  padding: 20, alignItems: 'center',
                  borderWidth: 1,
                  borderColor: 'grey',
                  backgroundColor: '#fff',
                  borderRadius: 8
                }} 
              >
              <Text style={{ color: 'grey' }}>
                  {this.state[item.id] || item.currentDate || `DatePicker`} </Text>
              </TouchableOpacity>
              <DateTimePicker
                date={new Date(item.currentDate) || new Date()}
                isVisible={this.state[`date${item.id}`]}
                onConfirm={(date) => {this.onChange(formatDate(date),item.id,'date')}}
                onCancel={() => this.setState({ [`date${item.id}`]: false, index: this.state.index + 1})}
            />
              {editField(item)}
            </View>
          );
        case 'notes':
          return (
            <View style={[styles.sections, {borderBottomWidth: 0}]}>
              <Text style={styles.label}>{item.label}: </Text> 
              {
                this.state[item.id] && !edit ? (
                  <View>
                    <Image
                      style={{ flex: 1, height: 400, borderWidth: 1, marginTop: 20, borderColor: 'grey', flexDirection: 'row' }}
                      source={{ uri: Platform.OS === 'android' ? `file://${this.state[item.id]}` : this.state[item.id] }}
                    />
                  </View>
                ) : (
                  
                  <View style={styles.notes}>
                    {
                      this.state[item.id] || edit ? (
                        <RNSketchCanvas
                          containerStyle={{ backgroundColor: '#fff', flex: 1 }}
                          canvasStyle={{ backgroundColor: '#fff', flex: 1 }}
                          defaultStrokeIndex={0}
                          defaultStrokeWidth={5}
                          onSketchSaved={(success, filepath) => this.onChange(filepath,item.id)}
                          clearComponent={<View style={styles.functionButton}><Text style={{ color: 'black' }}>Clear</Text></View>}
                          eraseComponent={<View style={styles.functionButton}><Text style={{ color: 'black' }}>Eraser</Text></View>}
                          saveComponent={<View style={styles.functionButton}><Text style={{ color: 'black' }}>Save</Text></View>}
                          localSourceImage={{filename: this.state[item.id] || ''}}
                          onStrokeStart={() => this.setState({ scrollEnabled: false }, () => console.log('start'))}
                          onStrokeEnd={() => this.setState({ scrollEnabled: true }, () => console.log('end'))}
                          strokeComponent={color => (
                            <View style={[{ backgroundColor: color }, styles.strokeColorButton]} />
                          )}
                          strokeSelectedComponent={(color, index, changed) => {
                            return (
                              <View style={[{ backgroundColor: color, borderWidth: 2 }, styles.strokeColorButton]} />
                            )
                          }}
                          savePreference={() => {
                            return {
                              folder: 'RNSketchCanvas',
                              filename: String(Math.ceil(Math.random() * 100000000)),
                              transparent: false,
                              imageType: 'png'
                            }
                          }}
                        />
                      ) : null
                    }
                  </View>
                )
              }
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
            <View style={[styles.sections, { borderBottomWidth: 0 }]}>
              <Text style={styles.label}>{item.label}: </Text>
              <View style={[styles.sections, { borderBottomWidth: 0, }]}>
                <TouchableOpacity
                  onPress={() => this.onChange('',item.id,'image')}
                  disabled={!edit}
                >
                {
                  this.state[item.id] ? (
                    <Image
                      style={{ width: 200, height: 200 }}
                      source={{ uri: this.state[item.id]}}
                    />
                  ) : (
                    <Image
                      style={{ width: 200,height: 200}}
                      source={require('assets/images/default.jpg')}
                    />
                  )
                }
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
        extraData={this.state.index}
        scrollEnabled={this.state.scrollEnabled}
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
