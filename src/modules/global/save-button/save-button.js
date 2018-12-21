import React from 'react';

import {
View,
Text,
StyleSheet,
TouchableOpacity,
} from 'react-native';
 
import {Navigation} from 'react-native-navigation';
import Colors from '~/constants/colors';

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.topBar,
    padding: 16,
    alignItems: 'center',
    marginTop: 'auto',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 

class SaveButton extends React.Component {
 
 constructor(props){
  super(props)
 }
 
  state = {

  }

  render() {
    return (
      <TouchableOpacity style={styles.btn} onPress={this.props.onPress}>
        <Text style={styles.btnText}>Save Form</Text>
      </TouchableOpacity>
    );
  }
}

SaveButton.defaultProps = {
}

export default SaveButton;
