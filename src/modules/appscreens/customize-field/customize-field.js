import React from 'react';

import {
View,
Text,
Button,
StyleSheet,
TouchableOpacity,
TextInput
} from 'react-native';
 
import {Navigation} from 'react-native-navigation';
import Colors from '~/constants/colors.js';

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:10,
  },
  sections: {
    paddingTop:5,
    paddingBottom:5
  },
  inputField: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,1)',
    paddingBottom:0
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
})
 
class CustomizeField extends React.Component {
  constructor(props){
   super(props);
    Navigation.events().bindComponent(this);

  }

  navigationButtonPressed = ({ buttonId }) => {
    buttonId === 'CloseCustomizeModal' ?
      Navigation.dismissModal(this.props.componentId)
      : null;
  }

  handleSaveField = () => {
    Navigation.dismissAllModals();

  }

 
  state = {

  }

  render() {
    return (
      <View style={styles.container}>
        <View styles={styles.sections}>
          <Text>LABEL</Text>
          <TextInput
            style={styles.inputField}
            />
        </View>
        <View>
        
        </View>
        <TouchableOpacity style={styles.btn} onPress={this.handleSaveField}>
          <Text style={styles.btnText}>Save Field</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

CustomizeField.defaultProps = {
}

export default CustomizeField;
