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
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateRecord } from '~/actions/records';
import SaveButton from '~/modules/global/save-button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,

  },
}); 
class OpenRecord extends React.Component {
 
  constructor(props){
    super(props);
    Navigation.events().bindComponent(this);
  }


  navigationButtonPressed = ({ buttonId }) => {
    const {componentId, currentForm, currentRecord} = this.props;
    buttonId === 'EditRecord' && this.setState({ editRecord: !this.state.editRecord})
  }

  updateRecord = (recordProperty) => {
    this.setState(prevState => ({
      recordObject: {
        ...prevState.recordObject,
        ...recordProperty
      }
    }));
  }

  handleEditForm = () => {
    const { id } = this.props.currentRecord;
    const { recordObject } = this.state;
    
    this.props.updateRecord({ recordObject, id });
    this.setState({ editRecord: false });
  }

  state = {
    editRecord: false,
    recordObject: {}
  }

  render() {
    return (
      <View style={styles.container}>
        <DynamicForm
          title="Dynamic Form"
          data={this.props.currentRecord.recordObject}
          model={this.props.currentForm.formArray}
          edit={true}
          editRecord={this.state.editRecord}
          updateRecord={this.updateRecord}
        />
        {
          this.state.editRecord ? (
            <SaveButton onPress={this.handleEditForm}/>
          ) : null
        }
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    records: state.records,
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateRecord
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenRecord);
