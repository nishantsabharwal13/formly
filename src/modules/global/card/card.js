import React from 'react';

import {
View,
Text,
Button,
StyleSheet,
TouchableOpacity,
} from 'react-native';
 
import {Navigation} from 'react-native-navigation';
import Colors from '~/constants/colors';
import formatDate from '~/helpers/date-format';

const styles = StyleSheet.create({
  sections: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 16,
    textTransform: 'capitalize',
    color: Colors.text,
  },
  description: {
    fontSize: 10,
    color: Colors.lightText,
  },
  iconLeft: {
    paddingHorizontal: 10,
  },
  iconRight: {
    paddingHorizontal: 10,
    marginLeft: 'auto',
  }
});
class Card extends React.Component {
 
 constructor(props){
  super(props)
 }
 
  state = {

  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={styles.sections}>
        <View style={styles.iconLeft}>
        {this.props.leftEle}
        </View>
        <View>
          <Text style={styles.name}>{this.props.name}</Text>
          <Text style={styles.description}>{this.props.description}</Text>
        </View>
        <View style={styles.iconRight}>
          {this.props.rightEle}
        </View>
      </TouchableOpacity>
    )
  }
}

Card.defaultProps = {
}

export default Card;
