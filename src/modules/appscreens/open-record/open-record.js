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
import DynamicForm from '~/modules/components/dynamic-form';
import Colors from '~/constants/colors.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,

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
}); 
class OpenRecord extends React.Component {
 
  constructor(props){
    super(props);
    Navigation.events().bindComponent(this);
  }

  navigationButtonPressed = ({ buttonId }) => {
    const {componentId, currentForm, currentRecord} = this.props;
    buttonId === 'EditRecord' && goCreateRecordPage(componentId, currentForm, currentRecord)
  }

  state = {
    editRecord: false,
    recordObject: {},
  }

  render() {
    return (
      <View style={styles.container}>
        <DynamicForm
          title="Dynamic Form"
          data={this.props.currentRecord.recordObject}
          model={this.props.currentForm.formArray}
          edit={true}
        />
      </View>
    )
  }
}

OpenRecord.defaultProps = {
}

export default OpenRecord;