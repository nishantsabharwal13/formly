import React from 'react';

import {
View,
Text,
Button,
StyleSheet,
TouchableOpacity,
} from 'react-native';
 
import {Navigation} from 'react-native-navigation';
import { goCreateRecordPage } from '~/helpers/navigation';
class RecordList extends React.Component {

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  state = {

  }

  navigationButtonPressed = ({ buttonId }) => {
    buttonId === 'AddRecord' ?
      goCreateRecordPage(this.props.componentId, this.props.currentForm)
      : null;
  }

  render() {
    return (
      <View>
        <Text>Let us RecordList</Text>
      </View>
    );
  }
}

RecordList.defaultProps = {
}

export default RecordList;
