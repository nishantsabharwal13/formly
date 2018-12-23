import React from 'react';

import {
Text,
StyleSheet,
} from 'react-native';
import Colors from '~/constants/colors';

const styles =  StyleSheet.create({
  title: {
    color: Colors.lightText,
    fontWeight: '700',
    fontSize: 12,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: Colors.primary,
  }
})
class SubText extends React.Component {
 
 constructor(props){
  super(props)
 }
 
  state = {

  }

  render() {
    return (
      <Text style={styles.title}>
        {this.props.text}
        </Text>
    )
  }
}

SubText.defaultProps = {
}

export default SubText;
