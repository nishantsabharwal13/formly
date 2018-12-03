import React from 'react';

import {
View,
Text,
Button,
StyleSheet,
TouchableOpacity,
FlatList,
TextInput,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CheckBox from 'react-native-check-box';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sections: {
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

  state = {

  }

  renderForm = () => {
    let {edit,model} = this.props;
    const editField = () => !edit ? (
      <View style={styles.icons}>
        <MaterialIcons style={[styles.iconEdit, { paddingRight: 10 }]} name="edit" size={25} color='grey' />
        <MaterialIcons style={styles.iconDelete} name="delete-forever" size={25} color='grey' />
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
              {editField()}
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
              {editField()}
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
              {editField()}
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
      <View style="this.styles.container">
        {this.renderForm()}
      </View>
    )
  }
}

DynamicForm.defaultProps = {
}

export default DynamicForm;
