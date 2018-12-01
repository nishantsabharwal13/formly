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
})
class DynamicForm extends React.Component {
  state = {

  }

  renderForm = () => {
    let model = this.props.model;

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
              />
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
