import React from 'react';

import {
Text,
View,
StyleSheet,
} from 'react-native';
import Colors from '~/constants/colors';

const styles =  StyleSheet.create({
  wrapper: {
    flexDirection:'row',
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  title: {
    color: Colors.lightText,
    fontWeight: '700',
    fontSize: 12,
  },
  filter: {
    marginLeft: 'auto',
    color: Colors.blue
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
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          {this.props.text}
        </Text>
        <Text 
          style={styles.filter} 
          onPress={this.props.onPress}
        >
          {this.props.filterText}
        </Text>
      </View>
    )
  }
}

SubText.defaultProps = {
}

export default SubText;
