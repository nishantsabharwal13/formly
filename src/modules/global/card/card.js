import React from 'react';

import {
View,
Text,
Button,
StyleSheet,
TouchableOpacity,
TouchableWithoutFeedback
} from 'react-native';
 
import {Navigation} from 'react-native-navigation';
import Colors from '~/constants/colors';
import formatDate from '~/helpers/date-format';
import Feather from 'react-native-vector-icons/Feather';

const styles = StyleSheet.create({
  sections: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {

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
 
  state= {
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.edit ? () => {} : this.props.onPress} style={styles.sections}>
        <View style={styles.iconLeft}>
        {this.props.leftEle}
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.name}>{this.props.name}</Text>
          <Text style={styles.description}>{this.props.description}</Text>
        </View>
        <View style={styles.iconRight}>
          {
            this.props.edit ? (
              <View style={{flexDirection:'row'}}>
                <TouchableWithoutFeedback onPress={this.props.editEntry}>
                <Feather 
                  style={{paddingRight: 15}} 
                  color={Colors.lightText} 
                  name="edit-2" 
                  size={20} 
                />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.props.deleteEntry}>
                <Feather 
                  color={Colors.lightText} 
                  name="trash" 
                  size={20}
                />
                </TouchableWithoutFeedback>
              </View>
            ): (
                <Feather color={Colors.lightText} name="chevron-right" size={30} />
            )
          }
        </View>
      </TouchableOpacity>
    )
  }
}

Card.defaultProps = {
}

export default Card;
