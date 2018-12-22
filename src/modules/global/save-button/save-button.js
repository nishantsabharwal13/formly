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
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    borderRadius: 50,
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
        <Text style={styles.btnText}>Save</Text>
      </TouchableOpacity>
    );
  }
}

SaveButton.defaultProps = {
}

export default SaveButton;
